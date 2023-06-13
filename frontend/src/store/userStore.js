import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: false,
    token: "",
    user: Object,
  },
  mutations: {
    setLogin(state, payload) {
      state.token = payload.token;
      state.isAuthenticated = true;
      state.user = payload.user;
    },
  },
});
