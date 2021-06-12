<template>
  <TheNavbar />
  <router-view />
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

      let username = ''

      await axios
        .get("api/v1/users/me/")
        .then((res) => {
          username = res.data.username
          this.$store.commit("setUsername", res.data.username);
        })
        .catch((error) => console.error(error));

      await axios
        .get(`api/v1/communities/joined/${username}`)
        .then(res => {
          this.$store.commit('setCommunities', res.data)
        })
        .catch(error => console.error(error))
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
};
</script>

<style scoped>

</style>