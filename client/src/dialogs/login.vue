       <template>
  <v-dialog v-model="loginDialog" max-width="300">
    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <v-text-field label="Email" prepend-icon="mdi-email-open"></v-text-field>
      <v-text-field label="Password" prepend-icon="mdi-google"></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>

        <v-btn color="green darken-1" text @click="dialog = false">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>