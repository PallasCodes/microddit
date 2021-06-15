<template>
	<div class="flex gap-4 py-4 profile">
		<main class="w-full">
			<section class="bg-white rounded shadow overflow-hidden mb-4">
				<div class="bg-gray-100 h-56 overflow-hidden">
					<img :src="user.get_cover_image">
				</div>
				<div class="p-4">
					<div class="w-16 h-16 rounded overflow-hidden profile-img">
						<img :src="user.get_profile_image" alt="avatar" class="obj-cover w-full" />
					</div>
					<div class="flex justify-between">
						<div>
							<h3 class="text-xl font-bold text-gray-800">
								{{ name }}
							</h3>
							<span class="block">
								@{{ user.get_username }}
							</span>
						</div>
						<button v-if="isAuthenticated" class="btn text-sm" :class="{'btn-outline-primary': following, 'btn-primary': !following }" @click="followOrEdit()">
							{{ isOwnProfile ? 'Editar perfil' : following ? 'Dejar de seguir' : 'Seguir' }}
						</button>
					</div>
					<p class="mt-2">
						{{ bioDescription }}
					</p>
					<div class="mt-4 text-sm flex gap-2 flex-wrap">
						<router-link v-for="communitie in communities" :key="communitie.id" :to="'/communitie'+communitie.get_absolute_url" class="communitie rounded-xl bg-gray-300 py-1 px-3 text-bold text-gray-800 hover:bg-blue-200 transition duration-150 ease">
							<i :class="communitie.icon" class="mr-1"> </i>
							<span> {{ communitie.name }} </span>
						</router-link>
					</div>
				</div>
			</section>
			<MakePost v-if="isAuthenticated && isOwnProfile" @post-created="addPost" />
			<Post v-for="post in posts" :key="post.id" :post="post" />
		</main>
		<div class="hidden md:block sticky top-16 side">
			<TheTopCommunities />
			<TheFooter />
		</div>
	</div>

	<Modal v-show="isModalVisible" @close="closeModal" @send="updateProfile">
		<template v-slot:header>
			Editar información de perfil
		</template>

		<template v-slot:body>
			<form @submit.prevent="">
				<div class="mb-4">
					<label for="username" class="block">Nombre</label>
					<input type="text" name="username" class="input" v-model="name" />
				</div>
				<div class="mb-4">
					<label for="password" class="block">Descripción de perfil</label>
					<textarea type="password" name="password" class="input resize-none" v-model="bioDescription"></textarea>
				</div>
			</form>
		</template>

		<template v-slot:confirmBtn>
			<span class="btn btn-primary">Guardar</span>
		</template>
	</Modal>
</template>

<script>
import Post from "@/components/Post.vue";
import TheTopCommunities from "@/components/UI/TheTopCommunities.vue";
import TheFooter from "@/components/UI/TheFooter.vue";
import Modal from "@/components/UI/Modal.vue"
import MakePost from "@/components/MakePost.vue";
import axios from 'axios'

export default {
	name: 'Profile',
	components: {
		Post,
		TheTopCommunities,
		TheFooter,
		MakePost,
		Modal
	},
	data() {
		return {
			posts: [],
			user: {},
			communities: [],
			followed: false,
			isModalVisible: false,
			name: '',
			bioDescription: ''
		}
	},
	computed: {
		isAuthenticated() {
			return this.$store.getters.isAuthenticated
		},
		isOwnProfile() {
			return this.$store.getters.username === this.$route.params.username
		},
		following() {
			return this.followed
		}
	},
	methods: {
		async updateProfile() {
			await axios
				.put('api/v1/user/update/', {
					name: this.name,
					bio_description: this.bioDescription
				})
				.then(() => {
					this.closeModal()
				})
				.catch(error => console.error(error))
		},
		showModal() {
			this.isModalVisible = true;
		},
		closeModal() {
			this.isModalVisible = false;
		},
		async getPosts() {
			await axios
				.get(`api/v1/posts/user/${this.$route.params.username}/`)
				.then(res => {
					this.posts = res.data
				})
				.catch(error => console.error(error))
		},
		addPost(post) {
			this.posts.unshift(post)
		},
		async getUser() {
			await axios
				.get(`api/v1/user/${this.$route.params.username}/`)
				.then(res => {
					this.user = res.data
					this.name = res.data.name
					this.bioDescription = res.data.bio_description
					window.document.title = res.data.name + ' | Microddit'
				})
				.catch(error => console.error(error))

			await axios
				.get('api/v1/user/get-followed/')
				.then(res => {
					let users = []
					res.data.forEach(user => users.push(user.get_username))
					if (users.includes(this.$route.params.username)) {
						this.followed = true
					}
				})
				.catch(error => console.error(error))
		},
		async getCommunities() {
			await axios
				.get(`api/v1/communities/joined/${this.$route.params.username}/`)
				.then(res => {
					this.communities = res.data
				})
				.catch(error => console.error(error))
		},
		async followOrEdit() {
			if (this.isOwnProfile) {
				this.isModalVisible = true
			} else {
				await axios
					.post('api/v1/user/follow/', { username: this.$route.params.username })
					.then(() => {
						this.followed = !this.followed
					})
					.catch(error => console.error(error))
			}
		},
	},
	async mounted() {
		await this.getUser()
		await this.getCommunities()
		await this.getPosts()
	}
}
</script>

<style scoped>
.side {
	height: min-content;
}

.profile {
	max-width: 1100px;
	margin: 0 auto;
}

.btn {
	height: min-content;
}

.profile-img {
	margin-top: -3rem;
}

.communitie {
	height: min-content;
}
</style>