<template>
	<div class="flex gap-4 py-4 post mx-auto mb-12 md:mb-0">
		<main class="w-full">
			<Post :post="getPost" :key="post.id" fullText="true" />
			<span class="mb-4 block"></span>
			<MakeComment :postId="getPostId" v-if="isAuthenticated" @comment-created="addComent" />
			<section class="card rounded-t-none">
				<Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
			</section>
		</main>
		<div class="hidden md:block sticky top-16 side">
			<TheTopCommunities />
			<TheFooter />
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import Post from '@/components/Post.vue'
import TheTopCommunities from '@/components/UI/TheTopCommunities.vue'
import TheFooter from '@/components/UI/TheFooter.vue'
import Comment from '@/components/Comment.vue'
import MakeComment from '@/components/MakeComment.vue'

export default {
	name: 'FullPost',
	components: {
		Post,
		TheTopCommunities,
		TheFooter,
		Comment,
		MakeComment,
	},
	data() {
		return {
			post: {},
			comments: []
		}
	},
	async created() {
		await axios
			.get('api/v1/posts/full/' + this.$route.params.id + '/')
			.then(res => {
				this.post = res.data
				window.document.title = res.data.title + ' | Microddit'
			})
			.catch(error => console.error(error))

		await axios
			.get('api/v1/posts/comments/' + this.$route.params.id + '/')
			.then(res => {
				console.log(res.data)
				this.comments = res.data
			})
			.catch(error => console.error(error))
	},
	methods: {
		addComent(comment) {
			this.comments.unshift(comment)
		}
	},
	computed: {
		getPost() {
			return this.post
		},
		getPostId() {
			return this.post.id
		},
		isAuthenticated() {
			return this.$store.getters.isAuthenticated
		}
	},
}
</script>

<style scoped>
.side {
	height: min-content;
}

.post {
	max-width: 1100px;
}
</style>