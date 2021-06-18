<template>
	<section class="flex items-center h-screen justify-center fixed w-full">
		<h1 class="font-bold text-gray-800 text-3xl text-center">Página no encontrada</h1>
	</section>
</template>

<script>
export default {
	name: 'NotFound',
	mounted() {
		window.document.title = 'Página no encontrada | Microddit'
	}
}
</script>