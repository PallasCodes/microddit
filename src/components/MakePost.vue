<template>
	<div class="card mb-4 flex w-full">
		<div class="w-12 h-12 rounded-full overflow-hidden mr-2">
			<img :src="$store.getters.profileImage" />
		</div>
		<form @submit.prevent="createPost()" class="w-full text-gray-700">
			<input type="text" class="w-full rounded outline-none bg-gray-50 p-1 border border-gray-200 mb-2" placeholder="Título" v-model="title">
			<textarea class="w-full rounded outline-none bg-gray-50 p-1 border border-gray-200 resize-none" rows="3" placeholder="Publicar algo..." v-model="postText" ref="textarea"></textarea>
			<div class="flex justify-between items-end mt-2">
				<input type="file" hidden="true" ref="image" accept=".png, .jpg, .jpeg">
				<span @click="chooseFile()">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 cursor-pointer self-end" viewBox="0 0 20 20" fill="currentColor" v-if="imageChoosen">
						<path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
					</svg>
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
		</form>
	</div>
</template>

<script>
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
	name: 'MakePost',
	props: ['communitie'],
	data() {
		return {
			image: null,
			title: '',
			postText: '',
			validTitle: true,
			validPostText: true,
		}
	},
	emits: ['post-created'],
	methods: {
		async createPost() {
			if (this.validateForm()) {

				let post = {
					title: this.title,
					post_text: this.postText
				}

				if (this.communitie) {
					post.communitie = this.communitie
				}

				await axios
					.post('api/v1/posts/', post)
					.then(res => {
						this.title = ''
						this.postText = ''
						this.$emit('post-created', res.data)
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
			this.image = true
		},
	},
	computed: {
		imageChoosen() {
			return this.image
		}
	}
}
</script>

<style>

</style>