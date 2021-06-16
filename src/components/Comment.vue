<template>
	<div class="py-2 flex comment w-full">
		<router-link :to="`/user/${comment.get_user}`">
			<div class="w-6 h-6 rounded-full overflow-hidden mr-2">
				<img :src="comment.get_user_image" alt="User profile image" class="object-cover w-full h-6" />
			</div>
		</router-link>
		<div class="text-sm text-gray-700">
			<router-link :to="`/user/${comment.get_user}`">
				<span class="font-bold ">@{{ comment.get_user }}</span>
			</router-link>
			<span> el {{ getDate(comment.date) }}</span>
			<span class="block text mt-1 comment w-full">{{ comment.comment }}</span>
		</div>
	</div>
</template>a

<script>
export default {
	name: 'Comment',
	props: ['comment'],
	data() {
		return {

		}
	},
	methods: {
		getDate(dateTime) {
			const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

			const date = new Date(dateTime)
			const month = months[date.getMonth()]
			const day = date.getDate()
			const year = date.getFullYear()
			const hours = date.getHours()
			let minutes = date.getMinutes()
			if (minutes < 10)
				minutes = '0' + minutes

			return `${day} de ${month} del ${year} a las ${hours}:${minutes}`
		},
	}
}
</script>

<style scoped>
.comment {
	word-wrap: break-word;
	white-space: pre-wrap;
	max-width: 100%;
	overflow-x: clip;
}
</style>