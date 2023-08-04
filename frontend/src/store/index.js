import { createStore } from "vuex";

export default createStore({
  state: {
    sucList: [],
    errList: [],
    isAuthenticated: false,
    token: "",
    user: Object,
    currentSignupUser: "",
  },
  getters: {},
  mutations: {
    addSuccess(state, msg) {
      state.sucList.push(msg);
      setTimeout(() => {
        state.sucList.splice(0, 1);
      }, 2000);
    },
    addError(state, msg) {
      state.errList.push(msg);
      setTimeout(() => {
        state.errList.splice(0, 1);
      }, 2000);
    },
    setLogin(state, payload) {
      state.token = payload.token;
      state.isAuthenticated = true;
      state.user = payload.user;
      axios.defaults.headers = { Authorization: payload.token };
    },
  },
  actions: {},
  modules: {},
});
