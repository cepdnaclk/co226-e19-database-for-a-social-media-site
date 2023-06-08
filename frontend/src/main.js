import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import userStore from "./store/userStore";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3010";
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
};

createApp(App).use(store).use(userStore).use(router).mount("#app");
