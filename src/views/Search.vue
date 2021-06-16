<template>
	<section id="search">
		<h2 class="py-6 font-bold text-3xl text-gray-800">Resultados para: {{ $route.params.query }}</h2>
		<section class="bg-white rounded shadow mb-16 md:mb-4">
			<div>
				<h3 class="text-xl font-bold text-gray-700 mb-2 p-4 pb-0">Publicaciones</h3>
				<p v-if="getPosts.length === 0" class="px-4">Publicaciones no encontradas</p>
				<div v-for="post in getPosts" :key="post.id">
					<router-link class="px-4 py-2 flex items-center hover:bg-blue-50 cursor-pointer transition duration-150 ease" :to="`/post/${post.id}`">
						<div class="w-10 h-10 rounded-full overflow-hidden mr-2">
							<img :src="post.get_user_image" alt="Profile user image" class="object-cover w-full h-10" />
						</div>
						<div>
							<span class="block font-bold text-gray-700 text-lg">{{ post.title }}</span>
							<span class="block text-sm">
								Por <span class="font-bold text-gray-700">@{{ post.get_user }}</span> en <span class="font-bold text-gray-700">{{ post.get_communitie_url }}</span>
							</span>
						</div>
					</router-link>
				</div>
				<router-link v-if="posts.length > 3" :to="`/full-search/posts/${$route.params.query}`" class="px-4 text-blue-700">
					Ver más
				</router-link>

				<h3 class="text-xl font-bold text-gray-700 mb-2 p-4 pb-0 mt-2">Comunidades</h3>
				<p v-if="communities.length === 0" class="px-4">Comunidades no encontradas</p>
				<div v-for="communitie in communities" :key="communitie.id">
					<router-link class="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer transition duration-150 ease" :to="`/communitie${communitie.get_absolute_url}`">
						<div class="w-10 h-10 rounded-full overflow-hidden mr-2">
							<img :src="communitie.get_image" alt="Image photo" class="object-cover w-full h-10" />
						</div>
						<div>
							<span class="block font-bold text-gray-700 text-lg">{{ communitie.name }}</span>
							<span class="block text-sm">
								33 miembros
							</span>
						</div>
					</router-link>
				</div>
				<router-link v-if="communities.length > 3" :to="`/full-search/communities/${$route.params.query}`" class="px-4 text-blue-700">
					Ver más
				</router-link>

				<h3 class="text-xl font-bold text-gray-700 mb-2 p-4 pb-0 mt-2">Usuarios</h3>
				<p v-if="users.length === 0" class="px-4">Usuarios no encontrados</p>
				<div v-for="user in users" :key="user.id">
					<router-link class="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer transition duration-150 ease" :to="`/user/${user.get_username}`">
						<div class="w-10 h-10 rounded-full overflow-hidden mr-2">
							<img :src="user.get_profile_image" alt="User profile image" class="object-cover w-full h-10" />
						</div>
						<div>
							<span class="block font-bold text-gray-700 text-lg">{{ user.name }}</span>
							<span class="block text-sm">@{{ user.get_username }}</span>
						</div>
					</router-link>
				</div>
				<router-link v-if="users.length > 3" :to="`/full-search/users/${$route.params.query}`" class="px-4 text-blue-700">
					Ver más
				</router-link>
			</div>
		</section>
	</section>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Search',
	data() {
		return {
			posts: [],
			communities: [],
			users: []
		}
	},
	computed: {
		getPosts() {
			return this.splicedPosts()
		}
	},
	watch: {
		$route(route) {
			this.searchPosts(route)
			this.searchCommunities(route)
			this.searchUsers(route)
		}
	},
	methods: {
		splicedPosts() {
			return this.posts.splice(0, 5)
		},
		async searchPosts(route) {
			await axios
				.get(`api/v1/posts/search/${route.params.query}/`)
				.then(res => {
					this.posts = res.data
				})
				.catch(error => console.error(error))
		},
		async searchCommunities(route) {
			await axios
				.get(`api/v1/communities/search/${route.params.query}/`)
				.then(res => {
					this.communities = res.data
					console.log(res.data)
				})
				.catch(error => console.error(error))
		},
		async searchUsers(route) {
			await axios
				.get(`api/v1/user/search/${route.params.query}/`)
				.then(res => {
					console.log(res.data)
					this.users = res.data
				})
				.catch(error => console.error(error))
		}
	},
	async created() {
		const route = this.$route

		await this.searchPosts(route)
		await this.searchCommunities(route)
		await this.searchUsers(route)
	}
}
</script>

<style scoped>
#search {
	max-width: 1100px;
	margin: 0 auto;
}
</style>