<template>
  <v-layout>
    <v-flex>
      <h2 v-if="isAuthenticated" class="pl-3">Hola Lucas!</h2>
      <h2 v-else-if="newUsername" class="pl-3">Hola {{ formatName(newUsername) }}!</h2>

      
      <v-container fluid>
        <v-row>
          <v-col v-for="movie in movies" :key="movie.imdbID" xs="12" sm="6" md="4" lg="3">
            <movie-card :movie="movie" />
          </v-col>
        </v-row>
      </v-container>

      <v-flex align-center justify-center v-if="loading">
        <custom-progress-circular size='50' color="#5335EC"></custom-progress-circular>
      </v-flex>
    </v-flex>
  </v-layout>
</template>
  
<script>  
import CustomProgressCircular from '~/components/CustomProgressCircular.vue';
import MovieCard from '~/components/MovieCard.vue';

export default {
  components: {
    MovieCard,
    CustomProgressCircular
  },
  data () {
    return {
      loading: false,
      movies: [],
      buttons: [
        {
          title: "beer",
          icon: "mdi-beer",
          action: "Gestión de morosos",
          path: "/beer",
          description: "Cervezas",
          id: 1,
          rol: 3,
        },
        {
          title: "tandas",
          icon: "mdi-parachute",
          action: "Gestión de plegados",
          path: "/tablepackers",
          description: "Plegados",
          id: 2,
          rol: 3,
        },
        {
          title: "Total",
          icon: "mdi-chart-pie",
          action: "Total de plegados",
          path: "/total",
          description: "Total",
          id: 3,
          rol: 3
        },
        {
          title: "Combus",
          icon: "mdi-gas-station",
          action: "Carga de combustible",
          path: "pilots/combus",
          description: "Total",
          id: 3,
          rol: 4
        },
        {
          title: "Peso",
          icon: "mdi-calculator",
          action: "calculo de pesos y carga alar",
          path: "/manifest/weight",
          description: "Calcular Peso",
          id: 3,
          rol: 1
        },
        {
          title: "Otro",
          icon: "mdi-television-classic",
          action: "Pantalla tandas",
          path: "/home",
          description: "Pantalla tandas",
          id: 3,
          rol: 1
        }
      ]
    }
  },
  created () {
    this.getMovies()
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.authentication.isAuthenticated;
    },
    newUsername() {
      return this.$store.state.authentication.newUserName;
    }
  },
  methods: {
    async getMovies() {
      try {
        this.loading = true;
        const apiKey = process.env.API_KEY;
        const apiUrl = `?apikey=${apiKey}&s=movie&type=movie&page=1`;
        const response = await this.$axios.get(apiUrl);
        if (response.data.Response === 'True') {
          this.movies = response.data.Search;
        } else {
          this.movies = [];
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        this.$store.dispatch("snackbar/create", {
          color: "red",
          text: "Error al cargar los datos"
        });
      } finally {
        this.loading = false;
      }
    },
    formatName(name) {
      if (name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      }
      return '';
    }
  }
}
</script>
