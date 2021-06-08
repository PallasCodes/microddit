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
  async beforeCreate() {
    this.$store.commit('autoLogin')
    if (this.$store.getters.isAuthenticated) {
      axios.defaults.headers.common['Authorization'] = "Token " + this.$store.getters.token

      await axios
        .get("api/v1/users/me/")
        .then((res) => {
          this.$store.commit("setUsername", res.data.username);
        })
        .catch((error) => console.error(error));
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
};
</script>

<style scoped>
#feed {
  max-width: 1100px;
  margin: 0 auto;
}
</style>