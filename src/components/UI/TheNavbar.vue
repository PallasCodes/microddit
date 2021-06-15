<template>
  <header class="bg-gray-800 text-white sticky top-0 z-10">
    <nav class="flex items-center py-2 justify-between px-2 md:px-0">
      <router-link to="/">
        <img src="/assets/img/logo.svg" alt="Logo Microddit" class="h-auto w-28 md:w-40" />
      </router-link>

      <form @submit.prevent="search" class="flex items-center rounded overflow-hidden w-80">
        <input type="text" class="p-1 text-gray-700 h-6 md:h-auto md:w-full" v-model="query" />
        <button class="bg-primary hover:bg-primary-dark p-1" id="searchBtn">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      <div v-if="!isAuthenticated" class="hidden md:flex">
        <router-link to="/login" class="btn btn-outline-secondary mr-3 text-sm flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Iniciar Sesión
        </router-link>
        <router-link to="/register" class="btn btn-secondary text-sm flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Registrarme
        </router-link>
      </div>

      <div class="items-center hidden md:flex" v-if="isAuthenticated">
        <div class="flex gap-2 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-white transition-all ease delay-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-white transition-all ease delay-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <a href="" @click.prevent="logout" class="hover:text-white transition-all ease delay-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </a>
        </div>
        <router-link :to="`/user/${getUsername}`" class="flex ml-6">
          <div class="w-10 h-10 rounded overflow-hidden mr-2">
            <img :src="profileImage" alt="avatar" />
          </div>
          <div>
            <span class="
                bold
                text-md text-gray-200
                hover:text-white
                transition-all
                ease
                delay-100
              ">{{ getUsername }}</span>
            <span class="block text-gray-400 text-xs">Ver perfil</span>
          </div>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheNavbar",
  data() {
    return {
      username: "",
      query: ''
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    getUsername() {
      return this.$store.getters.username
    },
    profileImage() {
      return this.$store.getters.profileImage
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    search() {
      this.$router.push(`/search/${this.query}`)
    }
  },
};
</script>

<style scoped>
nav {
  max-width: 1300px;
  margin: 0 auto;
}

#searchBtn:hover {
  background-color: #e03b51;
  transition: background-color ease-in 150ms;
}
</style>