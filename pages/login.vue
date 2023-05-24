<template>
  <v-card color="black" dark elevation="0" height="100%" class="d-flex rounded-0 justify-center align-center">
    <v-card color="transparent" elevation="0" :max-width="($vuetify.breakpoint.mdAndUp) ? '500' : ''">
      <v-row class="justify-center align-center">
        <v-col cols="12" class="text-center py-0">
          <span class="font-weight-black" style="font-size: 2rem;">PelisFarma</span>
        </v-col>
        <img style="max-width: 250px" :src="bottomlogo">
        <v-col cols="12" class="text-center py-0 mb-n2 mt-2">
          <span class="font-weight-thin" style="font-size: 1.5rem; color: #5335EC">VideoClub online</span>
        </v-col>

        <v-col cols="12">
          <UserAuthForm buttonText="Acceder" :submitForm="handleLogin" :isName="false" :loading="loading"/>
        </v-col>

        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import UserAuthForm from "@/components/forms/UserAuthForm";
import { loginDummy } from '@/services/dummyBackend.js';
//import { mapState } from "vuex";
import { mapMutations } from 'vuex';

export default {
  layout: "authLayout",
  middleware: ["auth"],
  data() {
    return {
      drawer: false,
      searchFilm: '',
      showSearch: true,
      errorMessage: null,
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/"
        },
        {
          icon: "mdi-television-classic",
          title: "series",
          to: "/series"
        },
        {
          icon: "mdi-drama-masks",
          title: "Item 1",
          to: "/notFound1"
        },
        {
          icon: "mdi-filmstrip",
          title: "Item 2",
          to: "/notFound2"
        },
        {
          icon: "mdi-music",
          title: "Item 3",
          to: "/notFound3"
        }
      ],
      loading: false,
      bottomlogo: require('~/assets/img/bottom.png'),
    };
  },
  components: {
    UserAuthForm
  },
  methods: {
    ...mapMutations('authentication', ['SET_AUTHENTICATED']),
    async handleLogin(userInfo) {
      this.loading = true;
      try {
        const { email, password } = userInfo;
        const response = await loginDummy(email, password);
        if (response.success) {
          this.SET_AUTHENTICATED(true);
          this.$router.push('/');
        } else {
          console.log("error");
          throw new Error("Error");
        }
      } catch (error) {
        console.log(error);
        this.errorMessage = "No se ha podido loguear correctamente"
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
