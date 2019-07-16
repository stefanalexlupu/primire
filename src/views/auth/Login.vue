<template>
  <v-container>
    <v-layout row align-center fill-height>
      <v-flex xs12 sm10 md8 lg6 xl2 offset-sm1 offset-md2 offset-lg3 offset-xl4>
        <v-container mb-2 pa-0>
          <h1 class="font-weight-regular">
            Bine ai venit!
          </h1>
          <h2 class="font-weight-regular">
            Intră în cont
          </h2>
        </v-container>
        <v-container mb-4 pa-0>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="email"
              name="username"
              :rules="emailRules"
              label="Email"
              required
              solo
            />
            <v-text-field
              v-model="password"
              name="password"
              :rules="passwordRules"
              label="Password"
              required
              :append-icon="show ? 'visibility' : 'visibility_off'"
              :type="show ? 'text' : 'password'"
              solo
              @click:append="show = !show"
            />
            <v-btn color="info" @click="onLogin" :loading="loading">LOGIN</v-btn>
          </v-form>
        </v-container>
        <p>Ești nou în echipă? <router-link to="register">Creează contul tău acum.</router-link></p>
        <v-alert v-if="error" value="true" color="warning" icon="warning" outline>
          {{ error }}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { auth } from '../../firebaseInit';

export default {
  data() {
    return {
      show: false,
      // form data
      email: '',
      password: '',
      // form rules
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'Adresa de e-mail nu este validă!',
      ],
      passwordRules: [
        v => v.length >= 8 || 'Parola trebuie sa fie mai lunga de 8 caractere',
      ],
      // UI
      loading: false,
      error: '',
    };
  },

  methods: {
    onLogin() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/');
        }, (error) => {
          this.loading = false;
          this.error = error.message;
        })
        .catch((error) => {
          this.loading = false;
          console.error(error);
        });
    },
  },
};
</script>
