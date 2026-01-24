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
                  :disabled="loading"
                ></v-text-field>
                <v-alert v-if="errorMessage" type="error" dismissible @input="errorMessage = ''" class="mt-3">
                  {{ errorMessage }}
                </v-alert>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="createDocument" :loading="loading" :disabled="loading || !name.trim()">
                Create
              </v-btn>
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
    stat: "",
    loading: false,
    errorMessage: ""
  }),
  props: {
    source: String
  },
  methods: {
    ...mapActions(["addDocu"]),
    //Saving the document as soon as the save button is pressed .Using the addDocu action to make a post request on the backend witht the document object to save the file
    async createDocument() {
      if (!this.name.trim()) {
        this.errorMessage = "Please enter a document name";
        return;
      }
      
      this.loading = true;
      this.errorMessage = "";
      
      try {
        const nameofDocument = this.name;
        const result = await this.addDocu({ name: nameofDocument, content: "", editableProperty: true });
        
        console.log("Document creation result:", result);
        
        // Check if document was created successfully
        if (result && result.document) {
          const docStatus = result.document.status;
          const docData = result.document.document;
          
          if (docStatus === "sucess" && docData && docData._id) {
            // Reset loading state
            this.loading = false;
            // Navigate immediately
            this.$router.push({
              name: "editor",
              query: { documentID: docData._id }
            });
          } else {
            throw new Error("Invalid response structure");
          }
        } else {
          throw new Error("No document data received");
        }
      } catch (error) {
        console.error("Error in createDocument:", error);
        this.errorMessage = error.message || "Failed to create document. Please try again.";
        this.loading = false;
      }
    }
  },

  mounted() {
    //Subscrbing to the mutation where our document changes its properties. This allows us to know when a change has been made
    // Note: Navigation is now handled directly in createDocument, but we keep this as a backup
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case "addDocument": {
          const status = state.document;
          
          if (status && status.document && status.document.status === "error") {
            // Handle error state from store
            this.errorMessage = status.document.error || "Failed to create document";
            this.loading = false;
          }
          break;
        }
      }
    });
  }
};
</script>