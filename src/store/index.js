import { createStore } from "vuex";
import auth from "./modules/auth";
import communities from "./modules/communities";

export default createStore({
  state: {
    username: '',
    profileImage: '',
    followedUsers: [],
    userId: null
  },
  mutations: {
    setUsername(state, username) {
      state.username = username
    },
    setUserId(state, userId) {
      state.userId = userId
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
    userId(state) {
      return state.userId
    },
  },
  modules: {
    auth,
    communities
  },
});