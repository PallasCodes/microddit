<template>
	<div class="card flex w-full rounded-b-none">
		<div class="w-8 h-8 rounded-full overflow-hidden mr-2">
			<img src="https://monterreyrock.com/wp-content/uploads/2015/03/stevie-ray-vaughan-1.jpg" alt="" class="object-cover w-full h-8" />
		</div>
		<form @submit.prevent="postComment()" class="w-full text-gray-700">
			<textarea class="w-full rounded outline-none bg-gray-50 p-1 border border-gray-100 resize-none" rows="1" placeholder="Comentar algo..." v-model="comment"></textarea>
			<div class="flex justify-between items-end mt-2">
				<button class="btn btn-primary text-sm flex items-center justify-center" type="submit">
					Comentar
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'MakeComment',
	props: ['postId'],
	data() {
		return {
			comment: ''
		}
	},
	methods: {
		async postComment() {
			if (this.comment !== '') {
				await axios
					.post('api/v1/posts/comment/', {
						post: this.postId,
						comment: this.comment
					})
					.then(res => {
						this.$emit('comment-created', res.data)
						this.comment = '	'
					})
					.catch(error => console.error(error))
			} else {
				console.log('comenta algo pues uwu')
			}
		}
	}
}
</script>

<style>

</style>