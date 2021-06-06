<template>
  <TheNavbar />
  <div id="feed" class="py-4">
    <router-view />
  </div>
  <TheBottomNavbar />
</template>

<script>
import TheNavbar from "@/components/UI/TheNavbar.vue";
import TheBottomNavbar from "@/components/UI/TheBottomNavbar.vue";
import axios from 'axios'

export default {
  components: {
    TheNavbar,
    TheBottomNavbar,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  beforeCreate() {
    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }

    this.$store.commit('autoLogin')
  }
};
</script>

<style scoped>
#feed {
  max-width: 1100px;
  margin: 0 auto;
}
</style>