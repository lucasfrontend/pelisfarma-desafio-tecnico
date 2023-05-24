<template>
  <v-card width="400" class="mx-auto mt-6" color="black">
    <v-card-text class="pt-12 pb-12">
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="userInfo.name"
              label="Nombre"
              prepend-icon="mdi-account-circle"
              :rules="[required('nombre o alias'),  minLength('name', 4), maxLength('name', 30)]"
              v-if="isName"
              outlined
            />
          </v-col>
        </v-row>
  
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="userInfo.email"
              label="Correo"
              prepend-icon="mdi-email"
              :rules="[required('correo'), emailFormat()]"
              outlined
            />
          </v-col>
        </v-row>
  
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="userInfo.password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-key"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              counter="true"
              :rules="[required('password'), minLength('password', 4), maxLength('password', 30)]"
              outlined
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>

    <v-card-actions class="pa-6">
      <v-spacer></v-spacer>
      <v-btn large block :loading="loading" color="#5335EC" @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
    </v-card-actions>
    
    <v-row>
      <v-col cols="12" class="text-center mt-2">
        <span style="font-size: 0.8rem;">
          {{ isName ? '¿Ya tienes una cuenta?' : '¿Aún no estás registrado?' }}
          <nuxt-link :to="isName ? '/login' : '/register'">
            {{ isName ? 'Ingresá acá' : 'Regístrate aquí' }}
          </nuxt-link>
        </span>
      </v-col>
    </v-row>
  </v-card>
</template>

  
<script>
import validations from "@/utils/validations";

export default {
  props: ["submitForm", "buttonText", "isName", "loading"],
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        name: '',
        email: '',
        password: ''
      },
      ...validations
    };
  }
};
</script>
