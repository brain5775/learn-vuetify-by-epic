import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
  },
  getters: {},
  mutations: {
    set_token(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    POST_TOKEN({ commit }, token) {
      commit("set_token", token);
    },
  },
});
