<template>
  <v-container>
    <v-layout row align-center fill-height>
      <v-flex xs12 sm10 md8 lg6 xl2 offset-sm1 offset-md2 offset-lg3 offset-xl4>
        <v-container mb-2 pa-0 tag="section">
          <h1 class="font-weight-regular">
            Bine ai venit!
          </h1>
          <h2 class="font-weight-regular">
            Creează un cont:
          </h2>
        </v-container>
        <v-container mb-4 pa-0>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-container mt-2 pb-0>
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
            </v-container>

            <v-divider />

            <v-container my-2>
              <v-text-field
                v-model="name"
                name="name"
                :rules="nameRules"
                label="Numele tău"
                required
                solo
              />

              <v-checkbox v-model="isPrayerTeam" label="Echipa de rugaciune" />

              <v-checkbox
                v-model="agreeToGdpr"
                :rules="agreeToGdprRules"
                label="Sunt de acord ca datele mele sa fie procesate de
                  departamentul de primire de la Betel Centru"
              />
            </v-container>

            <v-btn color="info" :loading="loading" @click="onRegister">SIGN UP</v-btn>
          </v-form>
        </v-container>
        <p>Ai deja un cont? <router-link to="login">Intră in contul tău acum.</router-link></p>
        <v-alert v-if="error" value="true" color="warning" icon="warning" outline>
          {{ error }}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { auth, db } from '../../firebaseInit';

export default {
  data() {
    return {
      show: false,
      // form data
      email: '',
      password: '',
      name: '',
      isPrayerTeam: false,
      agreeToGdpr: false,
      // form rules
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'Adresa de e-mail nu este validă!',
      ],
      passwordRules: [
        v => v.length >= 8 || 'Parola trebuie sa fie mai lunga de 8 caractere',
      ],
      nameRules: [
        v => !!v || 'Spune-ne cum te cheama',
      ],
      agreeToGdprRules: [
        v => v || 'Trebuie sa fi de acord ca sa continui.',
      ],
      // UI
      loading: false,
      error: '',
      uid: '',
    };
  },

  methods: {
    onRegister() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;

      auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(({ user }) => {
          this.uid = user.uid;
          return user.updateProfile({
            displayName: this.name,
          });
        }, (error) => {
          this.error = error.message;
        })
        .then(() => db.collection('volunteers').add(this.makeVolunteer(this.uid)))
        .then(() => {
          this.$router.push('/');
        })
        .catch((reason) => {
          console.error(reason);
        });
    },
    makeVolunteer(uid) {
      const volunteer = {
        uid,
        name: this.name,
        sinceParter: 100,
        sincePrimire: 100,
        sinceSectoare: 100,
        sinceRugaciune: 100,
      };

      if (this.isPrayerTeam) {
        volunteer.defaultRole = 'rugaciune';
      }
      return volunteer;
    },
  },
};
</script>
