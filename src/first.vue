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
  methods: {
    ...mapActions(["addDocu"]),
    //Saving the document as soon as the save button is pressed .Using the addDocu action to make a post request on the backend witht the document object to save the file
    createDocument() {
      const nameofDocument = this.name;
      this.addDocu(nameofDocument, "", true);
    }
  },

  mounted() {
    //Subscrbing to the mutation where our document changes its properties. This allows us to know when a change has been made
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case "addDocument": {
          const status = state.document;
          if (status.document.status === "sucess") {
            //as soon as out document status changes to sucess we use router to push to a new route with documentID as the query which is the documentId of our document which has been saved.This unique documentID is the id of the rooom that we will join
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