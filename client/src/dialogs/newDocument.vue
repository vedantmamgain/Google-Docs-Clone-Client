<template>
  <v-dialog max-width="300">
    <v-card>
      <v-card-title class="headline">New Document</v-card-title>
      <v-text-field></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

        <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>