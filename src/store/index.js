import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import document from "./modules/document";
export default new Vuex.Store({
  modules: {
    document,
  },
});
