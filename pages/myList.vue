<template>
  <v-container fluid>
    <h2 class="pb-8">{{ getNameList }}</h2>

    <v-row>
      <v-col cols="12" v-if="getList.length > 0">
        <v-text-field
          v-model="search"
          label="Buscar en mis favoritas"
          prepend-icon="mdi-magnify"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="getList"
      :search="search"
      :items-per-page="10"
      class="elevation-1"
      no-data-text="Aún no agregaste películas"
      :no-results-text="notPeli"
      :footer-props="{
        'items-per-page-text': itemsPerPageText
      }"
    >

      <template v-slot:item.actions="{ item }">
        <v-btn small color="error" @click="showDialog = true">
          <v-icon small class="mr-1">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-col cols="12" v-if="getList.length === 0" class="text-center pt-5 pb-5 mb-auto">
      <nuxt-link to="/" class="text-decoration-none">
        <v-col cols="12" class="text-center">
          <span class="font-weight-thin" style="font-size: 1.5rem; color: #5335EC">Vamos, agrega una película!</span>
        </v-col>
        <img :src="bottomLogo" alt="Tabla vacía" style="width: 20%; height: 20%;">
      </nuxt-link>
    </v-col>
    <!--Modal eliminar peli de MyList-->
    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Eliminar película</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar la película de su lista?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="removePeli">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Mis pelis',
          value: 'content.Title',
        },
        {
          text: 'Eliminar',
          value: 'actions',
          sortable: false,
        },
      ],
      notPeli: "No se encontró película con ese nombre",
      itemsPerPageText: "Cantidad de pelis",
      bottomLogo: require('~/assets/img/bottom.png'),
      showDialog: false
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.authentication.isAuthenticated;
    },
    newUsername() {
      return this.$store.state.authentication.newUserName;
    },
    getNameList() {
      if (this.isAuthenticated) {
        return 'Mi Lista - Lucas';
      } else if (this.newUsername) {
        return `Mi Lista - ${this.formatName(this.newUsername)}`;
      } else {
        return 'Mi lista';
      }
    },
    getList() {
      if (this.isAuthenticated) {
        return this.$store.state.list.authenticatedList;
      } else if (this.newUsername) {
        return this.$store.state.list.listNewUser;
      } else {
        return [];
      }
    }
  },
  methods: {
    ...mapMutations('list', ['REMOVE_PELI_NEW_USER',  'REMOVE_PELI_AUTHENTICATED']),
    removePeli(movie) {
      if (this.isAuthenticated) {
        this.REMOVE_PELI_AUTHENTICATED(movie);
      } else if (this.newUsername) {
        this.REMOVE_PELI_NEW_USER(movie);
      }
      this.showDialog = false
    },
    formatName(name) {
      if (name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      }
      return '';
    }
  },
  /*
  goToFilmDetail(imdbID) {
    this.$router.push({
      path: '/filmDetail',
      query: { id: imdbID },
    });
  }
  */
};
</script>