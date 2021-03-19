import vuetify from "./vuetify";
import Vue from "vue";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
// don't forget to import styles
import "tiptap-vuetify/dist/main.css";

// you don't need it. this is for example purposes
const iconsGroup = localStorage.getItem("current_icons_group") || "mdi";

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  // "md" (default), "fa", "mdi"
  iconsGroup, // same as "iconsGroup: iconsGroup"
});
