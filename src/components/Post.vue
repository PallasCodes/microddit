<template>
  <article class="card post mb-4 max-w-3xl relative">
    <span @click="showModal" v-if="ownPost" class="cursor-pointer justify-align-end absolute top-0 right-0 mr-3 pt-3 font-bold text-gray-400 hover:text-red-500 transition duration-150 ease">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
    <header class="mb-2">
      <div class="flex items-center mb-1">
        <div class="w-8 h-8 rounded-full overflow-hidden mr-2">
          <img src="https://monterreyrock.com/wp-content/uploads/2015/03/stevie-ray-vaughan-1.jpg" alt="" class="object-cover w-full h-8" />
        </div>
        <span class="text-gray-700 text-sm">
          <b>
            <router-link :to="`/user/${post.get_user}`">@{{ post.get_user }}</router-link>
          </b>
          <span v-if="post.get_communitie != ''"> en <b>
              <router-link :to="`/communitie${post.get_communitie_url}`">{{ post.get_communitie_url }}</router-link>
            </b></span>
          el {{ getDate(post.date) }}
        </span>

      </div>
      <router-link :to="'/post/'+this.post.id" class="post-content">
        <div class="post-title bold text-2xl">
          {{ post.title }}
        </div>
      </router-link>
    </header>
    <router-link :to="'/post/'+this.post.id" class="post-content">
      <div class="post-img overflow-hidden mb-2" v-if="post.get_image">
        <img :src="post.get_image" alt="post" class="w-full h-auto object-cover" />
      </div>
      <span class="block post-text text">
        {{ post.post_text }}
      </span>
    </router-link>
    <footer class="flex text-blue-600 mt-3">
      <div class="flex items-center mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="(getReaction === null || getReaction === false) || !isAuthenticated" @click="react(true)">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" v-if="getReaction === true && isAuthenticated" @click="react(true)">
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
        <span class="text-gray-500 text-xs ml-1">
          {{ getLikes }}
        </span>
      </div>
      <div class="flex items-center mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="(getReaction === null || getReaction === true) || !isAuthenticated" @click="react(false)">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" v-if="getReaction === false && isAuthenticated" @click="react(false)">
          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
        </svg>
        <span class="text-gray-500 text-xs ml-1">
          {{ getDislikes }}
        </span>
      </div>
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        <span class="text-gray-500 ml-1 text-xs">
          {{ getNumComments }}
        </span>
      </div>
    </footer>
  </article>

  <Modal v-if="isModalVisible" @close="closeModal" @send="deletePost">
    <template v-slot:header>
      ¿Deseas eliminar este post?
    </template>
    <template v-slot:body>
      "{{ post.title }}"
    </template>
    <template v-slot:confirmBtn>
      <span class="btn bg-red-500 text-white border border-red-500">Eliminar</span>
    </template>
  </Modal>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/UI/Modal.vue'

export default {
  name: "Post",
  emits: ['delete-post'],
  components: {
    Modal
  },
  data() {
    return {
      reaction: null,
      likes: 0,
      dislikes: 0,
      numComments: 0,
      isModalVisible: false,
    }
  },
  props: {
    post: Object
  },
  methods: {
    showModal() {
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    },
    async deletePost() {
      await axios
        .delete(`api/v1/posts/delete/${this.post.id}/`)
        .then(() => {
          this.$emit('delete-post', this.post.id)
        })
        .catch(error => console.error(error))

      this.isModalVisible = false
    },
    setReactions() {
      this.reaction = this.post.get_reaction
      this.likes = this.post.get_likes
      this.dislikes = this.post.get_dislikes
      this.numComments = this.post.get_num_comments
    },
    getDate(dateTime) {
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

      const date = new Date(dateTime)
      const month = months[date.getMonth()]
      const day = date.getDate()
      const year = date.getFullYear()
      const hours = date.getHours()
      let minutes = date.getMinutes()
      if (minutes < 10)
        minutes = '0' + minutes

      return `${day} de ${month} del ${year} a las ${hours}:${minutes}`
    },
    async react(reaction) {
      if (this.isAuthenticated) {
        await axios
          .post('api/v1/posts/react/', {
            post: this.post.id,
            reaction: reaction
          })
          .then(res => {
            console.log(res.data)

            if (this.reaction === null) {
              this.reaction = reaction
              if (reaction === true) {
                this.likes++
              } else {
                this.dislikes++
              }
            } else if (this.reaction === reaction) {
              this.reaction = null
              if (reaction === true) {
                this.likes--
              } else {
                this.dislikes--
              }
            } else {
              this.reaction = reaction
              if (reaction === true) {
                this.likes++
                this.dislikes--
              } else {
                this.likes--
                this.dislikes++
              }
            }

          })
          .catch(error => console.error(error))
      } else {
        console.log('autentiquese')
      }
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    getLikes() {
      return this.likes
    },
    getDislikes() {
      return this.dislikes
    },
    getReaction() {
      return this.reaction
    },
    getNumComments() {
      return this.numComments
    },
    ownPost() {
      return this.$store.getters.username === this.post.get_user
    }
  },
  mounted() {
    this.setReactions()
  },
};
</script>

<style>
.post-img {
  max-height: 400px;
}

.post-text {
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>