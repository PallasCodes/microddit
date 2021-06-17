import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import axios from "axios";

//const url = "http://127.0.0.1:8000"
const url = 'https://microddit-api.herokuapp.com/'

axios.defaults.baseURL = url

createApp(App).use(store).use(router, axios).mount("#app");