<template>
	<transition name="modal-fade">
		<div class="modal-backdrop">
			<div class="card flex flex-col" role="dialog">
				<header class="font-bold text-gray-800 text-2xl mb-1">
					<slot name="header">

					</slot>
					<button type="button" class="btn-close text-blue-600 font-bold text-xl relative" @click="close" aria-label="Cerrar modal" id="closeBtn">
						x
					</button>
				</header>

				<hr>

				<section class="py-4 px-2" id="modalDescription">
					<slot name="body">

					</slot>
				</section>

				<footer class="text-center">
					<button type="button" class="btn btn-outline-secondary mr-2" @click="close" aria-label="Cerrar modal">
						Cancelar
					</button>
					<button type="button" class="btn btn-secondary" @click="send" aria-label="Enviar información">
						Guardar
					</button>
				</footer>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Modal',
	methods: {
		close() {
			this.$emit('close');
		},
		send() {
			this.$emit('send');
		},
	},
};
</script>

<style scoped>
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal-fade-enter,
.modal-fade-leave-to {
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity .5s ease;
}

#closeBtn {
	top: -1rem;
	right: -.25rem;
}
</style>