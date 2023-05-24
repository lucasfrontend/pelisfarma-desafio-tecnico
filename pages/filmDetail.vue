<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-flex v-if="loading">
            <CustomProgressCircular size='100' color="#5335EC"></CustomProgressCircular>
          </v-flex>
          <v-img :src="movie.Poster" aspect-ratio="1" style="border-radius: 1%;" height="600"></v-img>
          <div class="overlay image-overlay pl-2 pb-2">
            <h4 style="font-size: 28px;">{{ movie.Title }}</h4>
            <v-col cols="12">
            <v-divider color="white"></v-divider>
          </v-col>
            <v-btn color="white">
              <v-icon color="black">mdi-play</v-icon>
              <span class="black--text">Reproducir</span>
            </v-btn>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" transparent-dark @click="addPeli(movie)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Agregar a mi lista</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" transparent-dark @click="toggleLike(movie)">
                  <v-icon :color="isLiked ? 'blue' : ''">mdi-thumb-up</v-icon>
                </v-btn>
              </template>
              <span>Me gusta</span>
            </v-tooltip>
          </div>
        </v-card>
      </v-col>
      
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            {{ movie.Title }}
            <div class="ml-auto">
              <div class="d-flex flex-column">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <span v-on="on" class="ml-auto">{{ movie.imdbRating }}</span>
                  </template>
                  <span>Puntuación</span>
                </v-tooltip>
                <v-rating :value="parseImdbRating(movie.imdbRating)" :half-increments="true" :readonly="true" icon="mdi-star" color="yellow"></v-rating>
              </div>
            </div>
          </v-card-title>


          <v-col cols="12">
            <v-divider color="white"></v-divider>
          </v-col>

          <v-card-text class="d-flex">
            <div class="d-flex align-center">
              <div>
                <p>Año: <span class="white--text">{{ movie.Year }}</span></p>
                <p>Lenguaje: <span class="white--text">{{ movie.Language }}</span></p>
                <p>Duración: <span class="white--text">{{ movie.Runtime }}</span></p>
                <p>Award: <span class="white--text">{{ movie.Awards }}</span></p>
                <p>Director: <span class="white--text">{{ movie.Director }}</span></p>
                <p>Actores: <span class="white--text">{{ movie.Actors }}</span></p>
                <p>Escrita por: <span class="white--text">{{ movie.Writer }}</span></p>
                <p>Ratings:</p>
                  <ul>
                    <li v-for="rating in movie.Ratings" :key="rating.Source">
                      {{ rating.Source }}: {{ rating.Value }}
                    </li>
                  </ul>

              </div>
            </div>
          </v-card-text>
            <div class="overlay custom-overlay">
              <div class="">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <div v-on="on" class="">
                      <v-icon>mdi-vote</v-icon>
                      <span>{{ movie.imdbVotes }}</span>
                    </div>
                  </template>
                  <span>{{ movie.imdbVotes }} votos</span>
                </v-tooltip>
              </div>
            </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CustomProgressCircular from '~/components/CustomProgressCircular.vue';
import { mapMutations } from 'vuex';
export default {
  components: {
    CustomProgressCircular
  },
  data() {
    return {
      movie: {},
      loading: false,
      errorMessage: null,
      isLiked: false,
      newPeli: null
    };
  },
  created() {
    try {
      const imdbID = this.$route.query.id;
      this.getDataFilm(imdbID);
    } catch (error) {
      this.$store.dispatch("snackbar/create", {
        color: "red",
        text: 'Error al cargar los datos'
      });
    }
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
    ...mapMutations('list', ['ADD_PELI_NEW_USER', 'ADD_PELI_AUTHENTICATED']),
    async getDataFilm(imdbID) {
      try {
        this.loading = true;
        const apiKey = process.env.API_KEY;
        const apiUrl = `?apikey=${apiKey}&i=${imdbID}`;
        const response = await this.$axios.get(apiUrl);
        if (response.data.Response === 'True') {
          this.movie = response.data;
        } else {
          this.$store.dispatch("snackbar/create", {
            color: "red",
            text: 'Error al cargar los datos'
          });
        }
      } catch (error) {
        this.$store.dispatch("snackbar/create", {
          color: "red",
          text: 'Error al cargar los datos'
        });
      } finally {
        this.loading = false;
      }
    },
    parseImdbRating(imdbRating) {
      return Math.round(imdbRating / 2);
    },
    toggleLike(movie) {
      if (!this.isLiked) {
        this.$store.dispatch("snackbar/create", {
          color: "blue",
          text: `Te gusta "${movie.Title}"`
        });
      }
      this.isLiked = !this.isLiked;
    },
    addPeli(movie) {
      console.log(movie.Title, "movie 0" )
      if (this.isAuthenticated && movie.Title !== undefined) {
        this.ADD_PELI_AUTHENTICATED(movie);
        this.$store.dispatch("snackbar/create", {
        color: "green",
        text: `"${movie.Title}" fue agregada con éxito a tu lista`
      });
      } else if (this.newUsername && movie.Title !== undefined) {
        this.ADD_PELI_NEW_USER(movie);
        this.$store.dispatch("snackbar/create", {
        color: "green",
        text: `"${movie.Title}" fue agregada con éxito a tu lista`
      });
      } else if (movie.Title == undefined) {
        this.$store.dispatch("snackbar/create", {
          color: "red",
          text: `Error al agregar "${movie.Title}"`
        });
      }
    }
  }
};
</script>