import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import axios from "axios";

//const local = "http://localhost:8000"
const production = 'https://microddit-api.herokuapp.com/'

axios.defaults.baseURL = production

createApp(App).use(store).use(router, axios).mount("#app");