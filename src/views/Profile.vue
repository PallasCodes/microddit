<template>
	<div class="flex gap-4 mb-12 mx-auto md:py-4 profile md:mb-0">
		<main class="w-full" @scroll="loadPosts">
			<section class="bg-white rounded shadow overflow-hidden mb-4">
				<div class="bg-gray-100 h-56 overflow-hidden">
					<img :src="user.get_cover_image" class="w-full object-cover min-h-full">
				</div>
				<div class="p-4">
					<div class="w-16 h-16 rounded overflow-hidden profile-img">
						<img :src="user.get_profile_image" alt="avatar" class="object-cover w-full h-full" />
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
			<MakePost v-if="isAuthenticated && isOwnProfile" @post-created="addPost" @delete-post="removePost" />
			<Post v-for="post in posts" :key="post.id" :post="post" @delete-post="removePost" />
			<div v-if="isLoading">
				<img src="/assets/img/spinner.gif" class="my-4 mx-auto">
			</div>
		</main>
		<div class="hidden md:block sticky side">
			<TheTopCommunities />
			<TheFooter />
		</div>
	</div>

	<Modal v-show="isModalVisible" @close="closeModal" @send="updateProfile" class="relative">
		<template v-slot:header>
			Editar información de perfil
		</template>

		<template v-slot:body>
			<div v-if="requestLoading" class="absolute w-full h-full mx-center top-0 left-0 opacity-40" style="background-color: #f1f1f1;">
				<img src="/assets/img/spinner.gif" class="my-4 mx-auto">
			</div>

			<form @submit.prevent="" ref="form">
				<div class="mb-4">
					<label for="username" class="block">Nombre</label>
					<input type="text" name="name" class="input" v-model="name" />
				</div>
				<div class="mb-4">
					<label for="password" class="block">Descripción de perfil</label>
					<textarea name="bioDescription" class="input resize-none" v-model="bioDescription" rows="2"></textarea>
				</div>
				<div class="mb-4">
					<label for="profile-img" class="block">Foto de perfil</label>
					<input type="file" name="profileImg" class="input" accept=".png, .jpg, .jpeg">
				</div>
				<div class="mb-4">
					<label for="cover-img" class="block">Foto de portada</label>
					<input type="file" name="coverImg" class="input">
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

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
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
			bioDescription: '',
			pageNumber: 1,
			noMorePosts: false,
			isLoading: true,
			requestLoading: false,
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
	watch: {
		$route(route) {
			this.getUser(route)
			this.posts = []
			this.pageNumber = 0
			this.getCommunities(route)
			this.getPosts(route)
			this.loadPosts(route)
		}
	},
	methods: {
		removePost(postId) {
			this.posts = this.posts.filter(post => post.id !== postId)
		},
		loadPosts(route) {
			window.onscroll = () => {
				let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

				if (bottomOfWindow && !this.noMorePosts) {
					this.pageNumber = this.pageNumber + 1
					this.isLoading = true

					axios(`/api/v1/posts/user/${route.params.username}/?page=${this.pageNumber}`)
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
		async updateProfile() {
			this.requestLoading = true

			let formData = new FormData()
			let formDataImg = new FormData()
			formDataImg.append('key', '4ea6ee238b064f8be61739a05a493544')

			const form = this.$refs.form

			formData.append('name', form.name.value)
			formData.append('bio_description', form.bioDescription.value)

			var axiosImgProfile = axios.create({ baseURL: 'https://api.imgbb.com/1/' })
			delete axiosImgProfile.defaults.headers.common['Authorization']

			if (form.profileImg.files[0]) {
				formDataImg.append('image', form.profileImg.files[0])

				await axiosImgProfile
					.post('upload', formDataImg, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					.then(res => {
						formData.append('profile_image', res.data.data.image.url)
					})
					.catch(error => {
						console.error(error)
					})
			}

			if (form.coverImg.files[0]) {
				formDataImg.delete('image')
				formDataImg.append('image', form.coverImg.files[0])

				await axiosImgProfile
					.post('upload', formDataImg, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					.then(res => {
						formData.append('cover_image', res.data.data.image.url)
					})
					.catch(error => {
						console.error(error)
					})
			}

			await axios
				.put('api/v1/user/update/', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				.then(res => {
					this.user = res.data
					this.closeModal()
					createToast('Perfil actualizado', {
						type: 'info',
						hideProgressBar: 'true',
						position: 'bottom-right',
					})
					this.requestLoading = false
				})
				.catch(error => {
					console.error(error)
					createToast('Error al actualizar perfil. Inténtelo más tarde', {
						type: 'danger',
						hideProgressBar: 'true',
						position: 'bottom-right',
					})
				})
		},
		showModal() {
			this.isModalVisible = true;
		},
		closeModal() {
			this.isModalVisible = false;
		},
		async getPosts(route) {
			await axios
				.get(`api/v1/posts/user/${route.params.username}/`)
				.then(res => {
					this.posts = res.data
				})
				.catch(error => console.error(error))
		},
		addPost(post) {
			this.posts.unshift(post)
		},
		async getUser(route) {
			await axios
				.get(`api/v1/user/${route.params.username}/`)
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
		async getCommunities(route) {
			await axios
				.get(`api/v1/communities/joined/${route.params.username}/`)
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
					.catch(error => {
						console.error(error)
						createToast('Error en el servidor. Inténtalo más tarde', {
							type: 'danger',
							hideProgressBar: 'true',
							position: 'bottom-right',
						})
					})
			}
		},
	},
	async created() {
		const route = this.$route

		await this.getUser(route)
		await this.getCommunities(route)
		await this.getPosts(route)
		this.loadPosts(route)
	}
}
</script>

<style scoped>
.side {
	height: min-content;
	top: 4.5rem;
}

.profile {
	max-width: 1100px;
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