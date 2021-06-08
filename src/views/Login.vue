<template>
  <section class="card max-w-md mx-auto">
    <h2 class="font-bold text-2xl text-center text-gray-800 mb-10">
      Inicio de sesión
    </h2>
    <form @submit.prevent="login" class="px-4" autocomplete="off">
      <div class="mb-4">
        <label for="username" class="block">Nombre de usuario</label>
        <input type="text" name="username" class="input" v-model="username" />
      </div>
      <div class="mb-4">
        <label for="password" class="block">Contraseña</label>
        <input type="password" name="password" class="input" v-model="password" />
      </div>
      <button class="btn btn-primary w-full mb-4">Iniciar Sesión</button>
    </form>
  </section>
</template>


<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");

      const formData = {
        username: this.username,
        password: this.password,
      };

      await axios
        .post("/api/v1/token/login/", formData)
        .then((res) => {
          const token = res.data.auth_token;
          this.$store.commit("setToken", token);
          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);
          const toPath = this.$route.query.to || "/";
          this.$router.push(toPath);
        })
        .catch((error) => console.error(error));

      if (this.$store.getters.isAuthenticated) {
        await axios
          .get("api/v1/users/me/")
          .then((res) => {
            this.$store.commit("setUsername", res.data.username);
          })
          .catch((error) => console.error(error));
      }
    },
  },
};
</script>