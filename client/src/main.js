import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import io from "socket.io-client";

// tiptapVuetify plugin
import "./plugins/tiptap-vuetify";

import "@babel/polyfill";

Vue.config.productionTip = false;
Vue.prototype.$socket = io(`http://localhost:8000`);
/* eslint-disable no-new */
new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
