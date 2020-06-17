import Vue from "vue";
import home from "./home";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import io from "socket.io-client";

// tiptapVuetify plugin
import "./plugins/tiptap-vuetify";

import "@babel/polyfill";

Vue.config.productionTip = false;
//Prototype is used for global variables which we can use throughout the project. Refer to the EditorFile . No need to declare socketio again use this.$socket
Vue.prototype.$socket = io(`http://localhost:8000/`);

export const bus = new Vue({});

/* eslint-disable no-new */
new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(home),
}).$mount("#app");
