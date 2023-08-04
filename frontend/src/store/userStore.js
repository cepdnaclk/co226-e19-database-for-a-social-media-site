import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    isAuthenticated: false,
    token: "",
    user: Object,
    currentSignupUser: "",
  },
  mutations: {
    setLogin(state, payload) {
      state.token = payload.token;
      state.isAuthenticated = true;
      state.user = payload.user;
      axios.defaults.headers = { Authorization: payload.token };
    },
  },
});
