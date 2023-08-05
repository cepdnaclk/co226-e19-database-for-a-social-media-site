import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3010";

axios.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.commit("setLogout");
      axios.defaults.headers = "";
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

createApp(App).use(store).use(router).mount("#app");
