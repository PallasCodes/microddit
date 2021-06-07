<template>
  <div id="feed" class="flex gap-4">
    <main>
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </main>
    <div class="hidden md:block sticky top-16" id="side">
      <TheTopCommunities />
      <TheFooter />
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import TheTopCommunities from "@/components/UI/TheTopCommunities.vue";
import TheFooter from "@/components/UI/TheFooter.vue";
import axios from 'axios'

export default {
  components: {
    Post,
    TheTopCommunities,
    TheFooter,
  },
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.getPosts()

    document.title = 'Microddit'
  },
  methods: {
    async getPosts() {
      await axios('/api/v1/public-feed/')
        .then(res => this.posts = res.data)
        .catch(error => console.error(error))
    }
  }
};
</script>

<style scoped>
#side {
  height: min-content;
}
</style>