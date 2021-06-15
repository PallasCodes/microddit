<template>
  <div id="feed" class="flex gap-4 py-4" @scroll="loadPosts">
    <main class="w-full">
      <MakePost v-if="isAuthenticated" @post-created="addPost" />
      <Post v-for="post in computedPosts" :key="post.id" :post="post" @delete-post="removePost" />
      <div v-if="noMorePosts" class="font-bold text-gray-900 py-4 text-center">
        <p>
          No hay más publicaciones que mostrar.
        </p>
        <p v-if="isAuthenticated">Considera seguir a más personas o unirte a más comunidades.</p>
      </div>
      <div v-if="isLoading">
        <img src="/assets/img/spinner.gif" class="my-4 mx-auto">
      </div>
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
    MakePost,
  },
  data() {
    return {
      posts: [],
      isModalVisible: false,
      pageNumber: 1,
      noMorePosts: false,
      isLoading: false
    }
  },
  mounted() {
    this.getPosts()

    document.title = 'Microddit'

    this.loadPosts()
  },
  methods: {
    loadPosts() {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow && !this.noMorePosts) {
          this.pageNumber = this.pageNumber + 1
          this.isLoading = true

          axios(`/api/v1/public-feed/?page=${this.pageNumber}`)
            .then(res => {
              res.data.forEach(post => {
                this.posts.push(post)
              })
              this.isLoading = false
            })
            .catch(error => {
              this.isLoading = false
              if (error.response.data.detail === 'Invalid page.') {
                this.noMorePosts = true
              } else {
                console.error(error)
              }
            })
        }
      }
    },
    removePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId)
    },
    async getPosts() {
      await axios('/api/v1/public-feed/')
        .then(res => {
          this.posts = res.data
          console.log(res.data)
        })
        .catch(error => console.error(error))
    },
    addPost(post) {
      this.posts.unshift(post)
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    computedPosts() {
      return this.posts
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