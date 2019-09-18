<template>
  <v-container>
    <v-layout column>
      <h1>Inscrieri pentru Duminica</h1>
      <v-button color="warning">INCHIDE INSCRIERILE</v-button>
      <v-list two-line>
        <v-subheader>Persoane Inscrise</v-subheader>

        <v-list-tile
          v-for="volunteer in enrolledVolunteers"
          :key="volunteer.uid"
          avatar
        >
          <v-list-tile-avatar>
            <img
              :src="volunteer.profilePictureUrl"
              :alt="volunteer.name"
            >
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ volunteer.name }}</v-list-tile-title>
            <v-list-tile-sub-title v-if="volunteer.defaultRole">
              {{ volunteer.defaultRole }}
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon>
              <v-icon>remove_circle</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider />

        <v-subheader>Persoane Disponibile</v-subheader>

        <v-list-tile
          v-for="volunteer in availableVolunteers"
          :key="volunteer.uid"
          avatar
        >
          <v-list-tile-avatar>
            <img
              :src="volunteer.profilePictureUrl"
              :alt="volunteer.name"
            >
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ volunteer.name }}</v-list-tile-title>
            <v-list-tile-sub-title v-if="volunteer.defaultRole">
              {{ volunteer.defaultRole }}
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon>
              <v-icon>add_circle</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-layout>
  </v-container>
</template>
