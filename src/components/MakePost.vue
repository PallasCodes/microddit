<template>
	<div class="card mb-4 flex w-full relative">
		<div v-if="isLoading" class="absolute w-full h-full mx-center top-0 left-0 opacity-40" style="background-color: #f1f1f1;">
			<img src="/assets/img/spinner.gif" class="my-4 mx-auto">
		</div>
		<div class="w-12 h-12 rounded-full overflow-hidden mr-2">
			<img :src="$store.getters.profileImage" class="object-cover full-w h-full" />
		</div>
		<form @submit.prevent="createPost()" class="w-full text-gray-700">
			<input type="text" class="w-full rounded outline-none bg-gray-50 p-1 border border-gray-200 mb-2" placeholder="Título" v-model="title">
			<textarea class="w-full rounded outline-none bg-gray-50 p-1 border border-gray-200 resize-none" rows="3" placeholder="Publicar algo..." v-model="postText" ref="textarea"></textarea>
			<div class="flex justify-between items-end mt-2">
				<input type="file" hidden="true" ref="image" accept=".png, .jpg, .jpeg" @change="setImage">
				<div v-if="image" class="w-40 flex relative text-gray-200 hover:text-red-900 cursor-pointer" @click="unselectImage">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute top-0 right-0 mt-1 mr-1" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
					</svg>
					<img :src="imageChoosen" class="w-full object-cover h-auto selected-img">
				</div>
				<span @click="chooseFile()">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="!imageChoosen">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
				</span>
				<button class="btn btn-primary text-sm flex items-center justify-center" type="submit">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
					</svg>
					<span>Publicar</span>
				</button>
			</div>
			<p v-if="!validTitle && !validPostText" class="mt-4">*Debes introducir un título y texto en tu publicación</p>
		</form>
	</div>
</template>

<script>
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
	name: 'MakePost',
	props: ['communitie', 'notJoined'],
	data() {
		return {
			image: null,
			title: '',
			postText: '',
			validTitle: true,
			validPostText: true,
			isLoading: false,
		}
	},
	emits: ['post-created'],
	methods: {
		async createPost() {
			if (this.notJoined) {
				createToast('Debes ser miembro para poder publicar', {
					type: 'warning',
					hideProgressBar: 'true',
					position: 'bottom-right',
				})
			} else {
				if (this.validateForm()) {
					this.isLoading = true

					let formData = new FormData()

					formData.append('title', this.title)
					formData.append('post_text', this.postText)

					if (this.communitie) {
						formData.append('communitie', this.communitie)
					}

					if (this.$refs.image.value !== '') {
						console.log('uwu')

						let formDataImg = new FormData()
						formDataImg.append('image', this.$refs.image.files[0])
						formDataImg.append('key', '4ea6ee238b064f8be61739a05a493544')

						var axiosImg = axios.create({ baseURL: 'https://api.imgbb.com/1/' })
						delete axiosImg.defaults.headers.common['Authorization']

						await axiosImg
							.post('upload', formDataImg, {
								headers: {
									'Content-Type': 'multipart/form-data'
								}
							})
							.then(res => {
								formData.append('image', res.data.data.image.url)
							})
							.catch(error => {
								console.error(error)
								createToast('Error al publicar. Inténtalo más tarde', {
									type: 'danger',
									hideProgressBar: 'true',
									position: 'bottom-right',
								})
							})
					}

					await axios
						.post('api/v1/posts/', formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						})
						.then(res => {
							this.title = ''
							this.postText = ''
							this.$refs.image.type = ''
							this.$refs.image.type = 'file'
							this.image = null
							this.imageUrl = null
							this.$emit('post-created', res.data)
							this.isLoading = false
							createToast('Publicación creada', {
								type: 'info',
								hideProgressBar: 'true',
								position: 'bottom-right',
							})
						})
						.catch(error => {
							console.error(error)
							createToast('Error al publicar. Inténtalo más tarde', {
								type: 'danger',
								hideProgressBar: 'true',
								position: 'bottom-right',
							})
						})
				}
			}
		},
		validateForm() {
			this.validTitle = true
			this.validPostText = true

			if (this.title === '') {
				this.validTitle = false
			}

			if (this.postText === '') {
				this.validPostText = false
			}

			return this.validPostText && this.validTitle
		},
		chooseFile() {
			this.$refs.image.click()
		},
		setImage() {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(this.$refs.image.files[0]);

			const that = this

			fileReader.addEventListener("load", function() {
				that.image = this.result
			});
		},
		unselectImage() {
			this.image = null
			this.$refs.image.type = ''
			this.$refs.image.type = 'file'
		}
	},
	computed: {
		imageChoosen() {
			return this.image
		},
	}
}
</script>

<style scoped>
.selected-img:hover {
	filter: opacity(70%);
	transition: all 200ms ease-in;
}
</style>