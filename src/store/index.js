import { createStore } from "vuex";
import auth from "./modules/auth";
import communities from "./modules/communities";

export default createStore({
  state: {
    username: '',
    profileImage: '',
    followedUsers: [],
  },
  mutations: {
    setUsername(state, username) {
      state.username = username
    },
    setProfileImage(state, image) {
      state.profileImage = image
    },
    setFollowedUsers(state, users) {
      state.followedUsers = users
    }
  },
  actions: {},
  getters: {
    username(state) {
      return state.username
    },
    profileImage(state) {
      return state.profileImage
    },
    followedUsers(state) {
      return state.followedUsers
    },
  },
  modules: {
    auth,
    communities
  },
});