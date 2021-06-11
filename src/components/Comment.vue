<template>
	<div class="py-2 flex">
		<div class="w-6 h-6 rounded-full overflow-hidden mr-2">
			<img src="https://monterreyrock.com/wp-content/uploads/2015/03/stevie-ray-vaughan-1.jpg" alt="" class="object-cover w-full h-6" />
		</div>
		<div class="text-sm text-gray-700">
			<span class="font-bold ">@{{ comment.get_user }}</span>
			<span> el {{ getDate(comment.date) }}</span>
			<span class="block text-black text-base mt-1">{{ comment.comment }}</span>
		</div>
	</div>
</template>

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

<style>

</style>