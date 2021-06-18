<template>
  <section class="card max-w-md mx-auto mt-4 md:mt-10">
    <h2 class="font-bold text-2xl text-center text-gray-800 mb-6 md:mb-10">
      Inicio de sesión
    </h2>
    <form @submit.prevent="login" class="px-4" autocomplete="off">
      <div class="mb-4">
        <label for="username" class="block">Nombre de usuario</label>
        <input type="text" name="username" class="input" v-model="username" autofocus ref="username" />
      </div>
      <div class="mb-4">
        <label for="password" class="block">Contraseña</label>
        <input type="password" name="password" class="input" v-model="password" ref="password" />
      </div>
      <button class="btn btn-primary w-full mb-4">Iniciar Sesión</button>
      <p class="text-center mt-2 mb-2">{{ errorMessage }}</p>
    </form>
  </section>
</template>


<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  mounted() {
    this.errorMessage = ''

    window.document.title = 'Iniciar sesión | Microddit'
  },
  methods: {
    async login() {
      if (this.username === '' || this.password === '') {
        this.errorMessage = '*Introduce tu usuario y contraseña para iniciar sesión'
      } else {

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
          .catch((error) => {
            if (error.response.data.non_field_errors) {
              this.errorMessage = '*Nombre de usuario y/o contraseña incorrectos'
            } else {
              console.error(error)
            }
          })

        if (this.$store.getters.isAuthenticated) {
          await axios
            .get("api/v1/users/me/")
            .then((res) => {
              this.$store.commit("setUsername", res.data.username);
              this.$store.commit("setUserId", res.data.id);
            })
            .catch((error) => console.error(error));

          await axios
            .get(`api/v1/user/${this.$store.getters.username}/`)
            .then(res => {
              this.$store.commit('setProfileImage', res.data.get_profile_image)
            })
            .catch(error => console.error(error))

          await axios
            .get('api/v1/user/get-followed/')
            .then(res => {
              let users = []
              res.data.forEach(user => users.push(user.id))
              this.$store.commit('setFollowedUsers', users)
            })
            .catch(error => console.error(error))

          await axios
            .get(`api/v1/communities/joined/${this.$store.getters.username}/`)
            .then(res => {
              this.$store.commit('setCommunities', res.data)
            })
            .catch(error => console.error(error))
        }
      }
    }
  },
};
</script>