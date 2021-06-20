<template>
  <aside class="card w-full">
    <h4 class="font-bold text-lg text-gray-800 mb-4">Comunidades más populares</h4>
    <ol class="flex flex-col">
      <router-link :to="`/communitie${communitie.get_absolute_url}`" v-for="(communitie, i) in getCommunities" :key="communitie.id">
        <li class="flex items-center mb-3">
          <span class="mr-4">{{ i+1 }} </span>
          <div class="w-9 h-9 rounded-full overflow-hidden mr-2">
            <img :src="communitie.get_image" class="object-cover w-full h-9" />
          </div>
          <div>
            <span class="block font-bold text-gray-700 leading-4">{{ communitie.name }}</span>
            <span class="text-sm ">{{ communitie.num_members }} miembros</span>
          </div>
        </li>
      </router-link>

    </ol>
    <div class="w-full">
      <router-link to="/communities" class="btn btn-outline-secondary mt-2 text-center block">Ver más</router-link>
    </div>
  </aside>
</template>

<script>
import axios from 'axios'

export default {
  name: "TheTopCommunities",
  data() {
    return {
      communities: []
    }
  },
  computed: {
    getCommunities() {
      return this.splicedCommunities()
    }
  },
  methods: {
    splicedCommunities() {
      return this.communities.splice(0, 5)
    }
  },
  async mounted() {
    await axios
      .get('api/v1/communities/top/')
      .then(res => {
        this.communities = res.data
      })
      .catch(error => console.error(error))
  }
};
</script>