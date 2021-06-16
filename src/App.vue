<template>
  <TheNavbar />
  <transition name="route" mode="out-in">
    <router-view>
    </router-view>
  </transition>
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
          this.$store.commit("setUserId", res.data.id);
        })
        .catch((error) => console.error(error));

      await axios
        .get(`api/v1/communities/joined/${username}`)
        .then(res => {
          this.$store.commit('setCommunities', res.data)
        })
        .catch(error => console.error(error))

      await axios
        .get(`api/v1/user/${username}/`)
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

    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }

  },
};
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.4s ease-out;
}

.route-leave-active {
  transition: all 0.4s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>