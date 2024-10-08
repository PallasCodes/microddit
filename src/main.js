import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import axios from "axios";


axios.defaults.baseURL = 'https://microddit-api.onrender.com'

createApp(App).use(store).use(router, axios).mount("#app");