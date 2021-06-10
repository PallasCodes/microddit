import { createStore } from "vuex";
import auth from "./modules/auth";
import communities from "./modules/communities";

export default createStore({
  state: {
    username: ''
  },
  mutations: {
    setUsername(state, username) {
      state.username = username
    }
  },
  actions: {},
  getters: {
    username(state) {
      return state.username
    }
  },
  modules: {
    auth,
    communities
  },
});