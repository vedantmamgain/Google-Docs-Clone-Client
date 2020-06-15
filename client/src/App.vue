<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="white" dense>
      <v-spacer />
      <v-spacer />
      <v-row align="center">
        <v-icon large color="blue-grey darken-2">mdi-call-split</v-icon>
        <v-toolbar-title class="mr-12 align-center">
          <span class="title">OpenSourceEditor</span>
        </v-toolbar-title>
      </v-row>
      <v-spacer></v-spacer>
      <v-btn icon>
        <div class="text-center">
          <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
            <template v-slot:activator="{ on, attrs }">
              <v-icon dark v-bind="attrs" v-on="on">mdi-account-circle</v-icon>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Vedant Mamgain</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="message" color="purple"></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Dark Mode</v-list-item-title>
                </v-list-item>

                <v-list-item>About</v-list-item>
              </v-list>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text @click="menu = false">Register</v-btn>
                <v-btn color="primary" text @click="loginDialog = true">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-toolbar color="black" dark>
        <v-toolbar-title>{{documentName}}</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon @click="fullscreenEditor">
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-account-switch</v-icon>
        </v-btn>

        <v-btn icon @click="printDocument">
          <v-icon>mdi-printer</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
      <EditorFile />
    </v-content>

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
  </v-app>
</template>



<script>
import { bus } from "./main";
import screenfull from "screenfull";
import EditorFile from "./components/EditorFile";

export default {
  name: "App",
  data: () => ({
    editorContent: "",
    documentName: "Document 1",
    loginDialog: false
  }),
  components: { EditorFile },
  created() {
    this.$vuetify.theme.dark = false; //isse hum dark aur light theme mein switch karenge
    bus.$on("Content", data => {
      this.editorContent = data;
    });
  },
  methods: {
    fullscreenEditor() {
      if (screenfull.isEnabled) {
        screenfull.request(this.EditorFile);
      }
    },
    printDocument() {
      bus.$emit("updateContent", this.editorContent);
      var mywindow = window.open("", "my div", "height=400,width=600");
      mywindow.document.write("<html><head><title>my div</title>"); //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
      /*optional stylesheet*/ mywindow.document.write("</head><body >");
      mywindow.document.write(this.editorContent);
      mywindow.document.write("</body></html>");

      mywindow.print();
      mywindow.close();

      return true;
    }
  }
};
</script>