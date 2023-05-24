<template>
    <v-footer>
    <v-container>
        <v-row>
        <v-col cols="12" md="3">
            <h3 class="white--text">Nosotros</h3>
            <p class="white--text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo laborum nisi deserunt laudantium sit est incidunt quis.</p>
        </v-col>
        <v-col cols="12" md="3">
            <h3 class="white--text">Terms of Use</h3>
            <a class="white--text" href="#">Términos y condiciones</a>
            <a class="white--text" href="#">Acceptable Use Policy</a>
        </v-col>
        <v-col cols="12" md="3">
            <h3 class="white--text">Políticas de Privacidad</h3>
            <a class="white--text" href="#">Protección de datos</a>
            <a class="white--text" href="#">Política de cookies</a>
        </v-col>
        <v-col cols="12" md="3">
            <h3 class="white--text">FAQ</h3>
            <a class="white--text" href="#">Preguntas frecuentes</a>
            <a class="white--text" href="#">Soporte</a>
        </v-col>
        </v-row>
    </v-container>
    <v-container>
        <v-row>
        <v-col cols="12" class="text-right">
            <div>Verifarma &copy; {{ new Date().getFullYear() }}</div>
            <img :src="bottomLogo" alt="Verifarma"> 
        </v-col>
        </v-row>
    </v-container>
    </v-footer>
</template>

<script>
export default {
  data() {
    return {
      bottomLogo: require('~/assets/img/verif_peque.png'),
    };
  }
};
</script>