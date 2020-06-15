<template>
  <v-app id="inspire">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Create a New Document</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn :href="source" icon large target="_blank" v-on="on">
                    <v-icon>mdi-file</v-icon>
                  </v-btn>
                </template>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Document Name"
                  prepend-icon="mdi-file"
                  type="text"
                  v-model="name"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="createDocument">Create</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    name: "",
    stat: ""
  }),
  props: {
    source: String
  },
  created() {},
  methods: {
    ...mapActions(["addDocu"]),
    createDocument() {
      const nameofDocument = this.name;
      this.addDocu(nameofDocument, "", true);
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case "addDocument": {
          const status = state.document;
          if (status.document.status === "sucess") {
            this.$router.push({
              name: "editor",
              query: { documentID: status.document.document._id }
            });
          }
          break;
        }
      }
    });
  }
};
</script>