<template>
  <v-card color="black" dark elevation="0" height="100%" class="d-flex rounded-0 justify-center align-center">
    <v-card color="transparent" elevation="0" :max-width="($vuetify.breakpoint.mdAndUp) ? '500' : ''">
      <v-row class="justify-center align-center">
        <v-col cols="12" class="text-center py-0">
          <span class="font-weight-black" style="font-size: 2rem;">PelisFarma</span>
        </v-col>
        <img style="max-width: 250px" :src="bottomlogo">

        <v-col cols="12">
          <UserAuthForm buttonText="Registrarse" :submitForm="handleRegister" :isName="true" :loading="loading"/>
        </v-col>

        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
      </v-row>
    </v-card>
  </v-card>
</template>
  
<script>
import UserAuthForm from "@/components/forms/UserAuthForm";
import { loginDummy } from '@/services/dummyBackend.js';
import { mapMutations } from 'vuex';

export default {
  layout: "authLayout",
  data() {
    return {
      loading: false,
      errorMessage: false,
      horrorMovie: require('~/assets/img/horror_movie.svg'),
      bottomlogo: require('~/assets/img/bottom.png'),
    };
  },
  components: {
    UserAuthForm
  },
  methods: {
    ...mapMutations('authentication', ['SET_NEW_USER']),
    async handleRegister(userInfo) {
      this.loading = true;
      try {
        const { email, name } = userInfo;
        const response = await loginDummy(email, name);
        if (response.success) {
          console.log("response.success", response.success);
          this.SET_NEW_USER(name);
          this.$router.push('/');
        } else {
          console.log("error");
          throw new Error("Error");
        }
      } catch (error) {
        console.log(error);
        this.errorMessage = "No se ha podido registrar en PelisFarma"
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>

  