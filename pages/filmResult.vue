<template>
  <v-flex>
    <v-container fluid>
      <v-row>
        <v-col v-for="movie in movies" :key="movie.imdbID" xs="12" sm="6" md="4" lg="3">
          <movie-card :movie="movie" />
        </v-col>
      </v-row>
    </v-container>
    
    <v-flex align-center justify-center v-if="loading">
      <CustomProgressCircular size='50' color="#5335EC"></CustomProgressCircular>
    </v-flex>
  </v-flex>
</template>
  
<script>
import CustomProgressCircular from '~/components/CustomProgressCircular.vue';
import MovieCard from '~/components/MovieCard.vue';
import { mapMutations } from 'vuex';

export default {
  components: {
    MovieCard,
    CustomProgressCircular
  },
  data() {
    return {
      movies: [],
      loading: false,
      searchFilm: '',
      notMovieImg: require('~/assets/img/not_film.png'),
    };
  },
  created() {
    this.searchMovie = this.$store.state.search.searchMovie;
    if (this.searchMovie) {
      this.getMovie(this.searchMovie);
    }
  },
  watch: {
  '$store.state.search.searchMovie': {
    immediate: true,
    handler(newSearchMovie) {
      this.searchMovie = newSearchMovie;
      this.getMovie();
    }
  }
},
  methods: {
    ...mapMutations('search', ['RESET_SEARCH_MOVIE']),
    async getMovie() {
      try {
        this.loading = true;
        const apiKey = process.env.API_KEY;
        const apiUrl = `?apikey=${apiKey}&s=${encodeURIComponent(this.searchMovie)}&page=1`;
        const response = await this.$axios.get(apiUrl);
        if (response.data.Response === 'True') {
          this.movies = response.data.Search;
          this.RESET_SEARCH_MOVIE();
        } else {
          this.$store.dispatch("snackbar/create", {
            color: "red",
            text: 'Error al cargar los datos'
          });
          this.$router.push('/');
        }
      } catch (error) {
        this.$store.dispatch("snackbar/create", {
          color: "red",
          text: 'Error al cargar los datos'
        });
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>