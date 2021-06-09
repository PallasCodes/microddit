<template>
  <div id="feed" class="flex gap-4 py-4">
    <main class="w-full">
      <MakePost v-if="isAuthenticated" @post-created="addPost" />
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
import MakePost from "@/components/MakePost.vue";
import axios from 'axios'

export default {
  components: {
    Post,
    TheTopCommunities,
    TheFooter,
    MakePost
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
    },
    addPost(post) {
      this.posts.unshift(post)
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
};
</script>

<style scoped>
#side {
  height: min-content;
}

#feed {
  max-width: 1100px;
  margin: 0 auto;
}
</style>