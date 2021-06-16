<template>
  <section class="card max-w-md mx-auto mt-10">
    <h2 class="font-bold text-2xl text-center text-gray-800 mb-10">Registro</h2>
    <form @submit.prevent="register" class="px-4" autocomplete="off" novalidate>
      <div class="mb-4">
        <label for="username" class="block">Nombre de usuario</label>
        <input type="text" name="username" class="input" v-model="username" />
        <p class="text-sm">{{ errors.username }}</p>
      </div>
      <div class="mb-4">
        <label for="email" class="block">Correo</label>
        <input type="email" name="email" class="input" v-model="email" />
        <p class="text-sm">{{ errors.email }}</p>
      </div>
      <div class="mb-4">
        <label for="password" class="block">Contraseña</label>
        <input type="password" name="password" class="input" v-model="password" />
        <p class="text-sm">{{ errors.password }}</p>
      </div>
      <div class="mb-6">
        <label for="repeat_password" class="block">Repetir contraseña</label>
        <input type="password" name="repeat_password" class="input" v-model="repeatPassword" />
        <p class="text-sm">{{ errors.repeatPassword }}</p>
      </div>
      <button class="btn btn-primary w-full mb-4">Registrarme</button>
      <p class="my-2">{{ errorMessage }}</p>
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
      errorMessage: '',
      errors: {
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
      }
    };
  },
  mounted() {
    this.errorMessage = ''

    window.document.title = 'Registro | Microddit'
  },
  methods: {
    validateForm() {
      this.errors.username = ''
      this.errors.email = ''
      this.errors.password = ''
      this.errors.repeatPassword = ''
      this.errorMessage = ''

      if (this.username === '' || this.email === '' ||
        this.password === '' || this.repeatPassword === '') {
        this.errorMessage = '*Llena todos los campos del formulario'
        return false
      }

      if (this.password !== this.repeatPassword) {
        this.errors.repeatPassword = 'Las contraseñas no coinciden'
        return false
      }

      if (this.password.length < 8) {
        this.errors.password = 'La contraseña debe tener al menos 8 caracteres'
        return false
      }

      if (!isNaN(this.password)) {
        this.errors.password = 'La contraseña no puede ser completamente númerica'
        return false
      }

      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
        this.errors.email = 'Format de correo no válido'
        return false
      }

      return true
    },
    async register() {
      if (this.validateForm()) {
        const formData = {
          username: this.username,
          password: this.password,
          email: this.email,
        };

        await axios
          .post("/api/v1/users/", formData)
          .then(() => {
            this.getToken()
            this.$router.push("/")
          })
          .catch(error => {
            if (error.response.data.username) {
              this.errors.username = 'Este nombre de usuario ya está en uso o no es valido'
            } else if (error.response.data) {
              this.errorMessage = '*Datos no validos'
            } else {
              console.error(error)
            }
          })
      }
    },
    async getToken() {
      await axios
        .post("/api/v1/token/login/", {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          this.createProfile(res.data.auth_token);
        })
        .catch((error) => console.error(error));
    },
    async createProfile(token) {
      axios.defaults.headers.common["Authorization"] = 'Token ' + token

      await axios
        .post('api/v1/profile/create/', {
          username: this.username
        })
        .then(res => {
          console.log(res.data)
        })
        .catch(error => console.error(error))
    },
    async setProfile(token) {
      axios.defaults.headers.common["Authorization"] = 'Token ' + token

      await axios
        .get(`api/v1/user/${this.username}/`)
        .then(res => {
          console.log(res.data)
          this.$store.commit('setProfileImage', res.data.get_profile_image)
        })
        .catch(error => console.error(error))
    }
  },

};
</script>