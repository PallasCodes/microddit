<template>
	<header class="bg-white mb-4">
		<div class="top-header h-72 overflow-hidden">
			<img :src="communitie.get_image" class="object-cover min-h-full w-full" />
		</div>
		<div class="bottom-header flex justify-center flex-col py-4 px-4 md:px-0">
			<div class="flex justify-between">
				<h1 class="font-bold text-gray-800 text-3xl">{{ communitie.name }}</h1>
				<button class="btn text-sm" :class="isJoinedClass" @click="joinOrLeave"> {{ isJoined ? 'Abandonar' : 'Unirme' }} </button>
			</div>
			<span class="tetx-gray-700 block text-sm">{{communitie.get_absolute_url}}</span>
			<span class="tetx-gray-700 block text-sm">{{ numMembers }} miembros</span>
			<span class="mt-2">{{ communitie.description }}</span>
		</div>
	</header>

	<section class="flex gap-4 mb-12 mx-auto md:py-4 communitie md:mb-0" @scroll="loadPosts">
		<main class="w-full">
			<MakePost v-if="isAuthenticated" @post-created="addPost" :communitie="communitie.id" :notJoined="!isJoined" />
			<Post v-for="post in posts" :key="post.id" :post="post" @delete-post="removePost" />
			<p v-if="noMorePosts" class="font-bold text-gray-900 py-4 text-center">
				No hay más publicaciones que mostrar.
			</p>
			<div v-if="isLoading">
				<img src="/assets/img/spinner.gif" class="my-4 mx-auto">
			</div>
		</main>
		<div class="hidden md:block sticky" id="side">
			<TheTopCommunities />
			<TheFooter />
		</div>
	</section>
</template>


<script>
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

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
			posts: [],
			joined: false,
			pageNumber: 1,
			noMorePosts: false,
			isLoading: false
		}
	},
	async created() {
		const route = this.$route

		await this.getCommunitie(route)
		await this.getPosts()

		window.document.title = this.communitie.name + ' | Microddit'

		const communities = this.$store.getters.communities
		const that = this

		if (this.isAuthenticated) {
			communities.forEach(communitie => {
				if (communitie.id === this.communitie.id) {
					that.joined = true
				}
			})
		}

		this.loadPosts()
	},
	watch: {
		$route(route) {
			this.posts = []
			this.pageNumber = 1
			this.getCommunitie(route)
			this.getPosts()

			window.document.title = this.communitie.name + ' | Microddit'

			const communities = this.$store.getters.communities
			const that = this

			if (this.isAuthenticated) {
				communities.forEach(communitie => {
					if (communitie.id === this.communitie.id) {
						that.joined = true
					}
				})
			}

			this.loadPosts()
		}
	},
	methods: {
		loadPosts() {
			window.onscroll = () => {
				let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

				if (bottomOfWindow && !this.noMorePosts) {
					this.pageNumber = this.pageNumber + 1
					this.isLoading = true

					axios(`/api/v1/posts/${this.communitie.id}/?page=${this.pageNumber}`)
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
		async getCommunitie(route) {
			await axios
				.get('api/v1/communities/' + route.params.category + '/' + route.params.communitie)
				.then(res => {
					this.communitie = res.data
				})
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
		async joinOrLeave() {
			if (this.isAuthenticated) {
				await axios
					.post('api/v1/communities/join/', {
						"id": this.communitie.id
					})
					.then(() => {
						this.joined = !this.joined
						if (this.joined) {
							this.communitie.num_members++
							this.$store.commit('addCommunitie', this.communitie)
						} else {
							this.communitie.num_members--
							this.$store.commit('removeCommunitie', this.communitie)
						}
					})
					.catch(error => {
						console.error(error)
						createToast('Error en el servidor. Inténtalo más tarde', {
							type: 'danger',
							hideProgressBar: 'true',
							position: 'bottom-right',
						})
					})
			} else {
				createToast('Debes iniciar sesión para unirte a una comunidad', {
					type: 'warning',
					hideProgressBar: 'true',
					position: 'bottom-right',
				})
			}
		}
	},
	computed: {
		isAuthenticated() {
			return this.$store.getters.isAuthenticated
		},
		isJoined() {
			return this.joined
		},
		isJoinedClass() {
			return {
				'btn-outline-primary': this.joined,
				'btn-primary': !this.joined
			}
		},
		numMembers() {
			return this.communitie.num_members
		},
		postsList() {
			return this.posts
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
}

#side {
	height: min-content;
	top: 4.5rem;
}
</style>