import colors from 'vuetify/es5/util/colors';
import process from 'process';

export default {
  head: {
    titleTemplate: 'PelisFarma',
    title: 'Plataforma de pelis',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/base.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  manifest: {
    theme_color: '#5335EC'
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.BASE_URL
  }, 
  /*
  ** vuetify module configuration
  */
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: null,
    publicPath: 'dist'
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    timing: false
  }
};
