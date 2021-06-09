<template>
	<header class="bg-white mb-4">
		<div class="top-header h-44 overflow-hidden">
			<img :src="communitie.get_image" class="w-full object-cover" />
		</div>
		<div class="bottom-header flex justify-center flex-col h-20">
			<div class="flex justify-between">
				<h1 class="font-bold text-gray-800 text-3xl">{{ communitie.name }}</h1>
				<button class="btn btn-primary text-sm">Unirme</button>
			</div>
			<span class="tetx-gray-700">{{communitie.get_absolute_url}}</span>
		</div>
	</header>

	<section class="flex gap-4 py-4 communitie">
		<main class="w-full">
			<MakePost v-if="isAuthenticated" @post-created="addPost" :communitie="communitie.id" />
			<Post v-for="post in posts" :key="post.id" :post="post" />
		</main>
		<div class="hidden md:block sticky top-16" id="side">
			<TheTopCommunities />
			<TheFooter />
		</div>
	</section>
</template>


<script>
import axios from 'axios'
import Post from "@/components/Post.vue";
import TheTopCommunities from "@/components/UI/TheTopCommunities.vue";
import TheFooter from "@/components/UI/TheFooter.vue";
import MakePost from "@/components/MakePost.vue";

export default {
	name: 'Communitie',
	components: {
		Post,
		TheTopCommunities,
		TheFooter,
		MakePost
	},
	data() {
		return {
			communitie: {},
			posts: []
		}
	},
	async created() {
		await this.getCommunitie()

		await this.getPosts()

		document.title = this.communitie.name + ' | Microddit'
	},
	methods: {
		async getCommunitie() {
			await axios
				.get('api/v1/communities/' + this.$route.params.category + '/' + this.$route.params.communitie)
				.then(res => this.communitie = res.data)
				.catch(error => console.error(error))
		},
		async getPosts() {
			await axios('/api/v1/posts/' + this.communitie.id + '/')
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
}
</script>

<style scoped>
.bottom-header {
	max-width: 1100px;
	margin: 0 auto;
}

section {
	max-width: 1100px;
	margin: 0 auto;
}

#side {
	height: min-content;
}
</style>