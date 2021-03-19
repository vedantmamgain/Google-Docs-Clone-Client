import axios from "axios";

const state = {
  //This is the variable we wish to load the data into
  document: {},
};
const getters = {
  getResponse: (state) => state.document,
};
const actions = {
  //In actions we write the function to get the data. here we are make a post request usins axios to our backend to save our document. update and delete hasn't been written rn
  async addDocu({ commit }, name, content, editableProperty) {
    const response = await axios.post("http://localhost:8000/api/v1/docu/", {
      name: name,
      content: content,
      editableProperty: editableProperty,
    });
    //we commit these changes to our mutations where we actually change our data with the data we have recieved in out actions
    //one parameter is the name of the mutations and the other is the data we have recieved in our actions
    commit("addDocument", response.data);
  },
};
const mutations = {
  //finally changing the state paramenter . We can write complex functions as well but we just dumped the data here in this case
  addDocument: (state, responseData) => (state.document = responseData),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
