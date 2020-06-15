import axios from "axios";

const state = {
  document: {},
};
const getters = {
  getResponse: (state) => state.document,
};
const actions = {
  async addDocu({ commit }, name, content, editableProperty) {
    const response = await axios.post("http://localhost:8000/api/v1/docu/", {
      name: name,
      content: content,
      editableProperty: editableProperty,
    });

    commit("addDocument", response.data);
  },
};
const mutations = {
  addDocument: (state, responseData) => (state.document = responseData),
};
export default {
  state,
  getters,
  actions,
  mutations,
};
