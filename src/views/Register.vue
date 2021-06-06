<template>
  <section class="card max-w-md mx-auto">
    <h2 class="font-bold text-2xl text-center text-gray-800 mb-10">Registro</h2>
    <form @submit.prevent="register" class="px-4" autocomplete="off">
      <div class="mb-4">
        <label for="username" class="block">Nombre de usuario</label>
        <input type="text" name="username" class="input" v-model="username" />
      </div>
      <div class="mb-4">
        <label for="email" class="block">Correo</label>
        <input type="email" name="email" class="input" v-model="email" />
      </div>
      <div class="mb-4">
        <label for="password" class="block">Contraseña</label>
        <input
          type="password"
          name="password"
          class="input"
          v-model="password"
        />
      </div>
      <div class="mb-6">
        <label for="repeat_password" class="block">Repetir contraseña</label>
        <input
          type="password"
          name="repeat_password"
          class="input"
          v-model="repeatPassword"
        />
      </div>
      <button class="btn btn-primary w-full mb-4">Registrarme</button>
    </form>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
    };
  },
  methods: {
    register() {
      const formData = {
        username: this.username,
        password: this.password,
        email: this.email,
      };

      axios
        .post("/api/v1/users/", formData)
        .then((res) => {
          this.$router.push("/");
          console.log(res.data);
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>
