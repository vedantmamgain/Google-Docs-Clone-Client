import Vue from "vue";
import home from "./home";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";

// tiptapVuetify plugin
import "./plugins/tiptap-vuetify";

import "core-js/stable";

Vue.config.productionTip = false;

// Frontend-only: Create a mock socket object that doesn't require backend
// This allows the code to work without breaking existing socket.io calls
const createMockSocket = () => {
  let updateCallbacks = [];
  
  // Listen for storage events (cross-tab updates)
  window.addEventListener("storage", (e) => {
    if (e.key === "documents" && e.newValue) {
      try {
        const documents = JSON.parse(e.newValue);
        // Notify all update callbacks
        updateCallbacks.forEach(callback => {
          // Get current route from Vue instance if available
          const currentRoute = router?.currentRoute || router?.history?.current;
          if (currentRoute?.query?.documentID) {
            const documentId = currentRoute.query.documentID;
            if (documents[documentId]) {
              callback(documents[documentId].content);
            }
          }
        });
      } catch (err) {
        console.error("Error parsing storage event:", err);
      }
    }
  });
  
  return {
    emit: (event, data) => {
      console.log(`[Mock Socket] Emit: ${event}`, data);
      // Store content updates in localStorage for persistence
      if (event === "send" && data) {
        // The content watcher in EditorFile will handle the update
        // This is just for logging
      }
    },
    on: (event, callback) => {
      console.log(`[Mock Socket] Listening to: ${event}`);
      if (event === "update") {
        updateCallbacks.push(callback);
      }
    },
    connected: true,
    disconnect: () => {
      updateCallbacks = [];
    },
  };
};

// Use mock socket for frontend-only mode
Vue.prototype.$socket = createMockSocket();

export const bus = new Vue({});

/* eslint-disable no-new */
new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(home),
}).$mount("#app");
