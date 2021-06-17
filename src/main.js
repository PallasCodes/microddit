import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import axios from "axios";

//const local = "http://127.0.0.1:8000"
const production = 'https://microddit-api.herokuapp.com/'

axios.defaults.baseURL = local

createApp(App).use(store).use(router, axios).mount("#app");