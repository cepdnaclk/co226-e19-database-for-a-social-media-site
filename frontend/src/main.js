import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import userStore from "./store/userStore";

createApp(App).use(store).use(userStore).use(router).mount("#app");
