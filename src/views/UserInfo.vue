<template>
  <v-container>
    <v-layout row align-center fill-height>
      <v-flex xs12 sm10 md8 lg6 xl2 offset-sm1 offset-md2 offset-lg3 offset-xl4>
        <v-container mb-2 px-3 tag="section">
          <h1 class="font-weight-regular">
            Cateva detalii despre tine:
          </h1>
        </v-container>
        <v-container mb-4 pa-0>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-container my-2>
              <v-text-field
                v-model="name"
                name="name"
                :rules="nameRules"
                label="Numele tău"
                required
                solo
              />

              <p>Sunt:</p>
              <v-radio-group v-model="gender" :rules="genderRules" mandatory>
                <v-radio label="Baiat" value="M" />
                <v-radio label="Fata" value="F" />
              </v-radio-group>

              <v-checkbox v-model="isPrayerTeam" label="Echipa de rugaciune" />
            </v-container>

            <v-btn color="info" :loading="loading" @click="onSubmit">SUBMIT</v-btn>
          </v-form>
        </v-container>
        <v-alert v-if="error" value="true" color="warning" icon="warning" outline>
          {{ error }}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import status from '../util/status';
import { roles } from '../util/roles';

export default {
  data() {
    return {
      // form data
      name: '',
      gender: '',
      isPrayerTeam: false,
      agreeToGdpr: false,
      // form rules
      valid: true,
      nameRules: [
        v => !!v || 'Spune-ne cum te cheama',
      ],
      genderRules: [
        v => !!v || 'Esti baiat sau fata?',
      ],
      // UI
      loading: false,
      error: '',
      uid: '',
    };
  },

  methods: {
    onSubmit() {
      this.loading = true;

      if (!this.$refs.form.validate()) {
        return;
      }

      // TODO: if user is not a new user, make sure to merge with existing data
      // in order not to lose history.
      this.$firestore().collection('volunteers').doc(this.$auth().currentUser.uid).set(this.makeVolunteer())
        .then(() => {
          this.$router.push('/');
        })
        .catch((reason) => {
          this.loading = false;
          console.error(reason);
        });
    },
    makeVolunteer() {
      const volunteer = {
        name: this.name,
        gender: this.gender,
        profilePictureUrl: '',
        status: status.NOT_REGISTERED,
        history: [],
      };

      if (this.isPrayerTeam) {
        volunteer.defaultRole = roles.RUGACIUNE;
      }

      // Try get the facebook profile picture at 250px;
      const fbProvider = this.$auth().currentUser.providerData.find(profile => profile.providerId === 'facebook.com');
      if (fbProvider) {
        volunteer.profilePictureUrl = `https://graph.facebook.com/${fbProvider.uid}/picture?height=200`;
      }

      return volunteer;
    },
  },
};
</script>
