<template>
	<div id="communities" class="py-4">
		<h2 class="text-3xl font-bold text-gray-800 mb-6 mt-2">Comunidades</h2>
		<section class="flex w-full">
			<nav class="card mr-4 overflow-hidden" id="communities-nav">
				<div class="px-3 py-2 bg-indigo-50 font-bold text-gray-700">
					Categorías
				</div>
				<ul>
					<li v-for="category in categories" :key="category.id" :class="{selectedItem: isSelected(category.name)}" @click="selectCategory(category)" class="nav-item">{{ category.name }}</li>
				</ul>
			</nav>
			<section class="card w-full">
				<h4 class="text-xl text-gray-700 font-bold mb-3 ml-2">
					{{ selectedItem.name }}
				</h4>
				<ol>
					<li v-for="communitie in communities" :key="communitie.id" class="text-gray-800 text-lg py-3 border-b border-gray-100">
						<router-link :to="'/communitie'+communitie.get_absolute_url" class="block px-2 flex items-center ">
							<div class="w-10 h-10 rounded-full overflow-hidden mr-2">
								<img :src="communitie.get_image" :alt="communitie.name" class="object-cover w-full h-10" />
							</div>
							<span>{{ communitie.name }}</span>
						</router-link>
					</li>
				</ol>
			</section>
		</section>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Communities',
	data() {
		return {
			categories: [],
			communities: [],
			selectedItem: {
				name: 'Comunidades populares',
				id: 0,
				get_absolute_url: ''
			}
		}
	},
	methods: {
		isSelected(category) {
			return this.selectedItem.name === category
		},
		async selectCategory(category) {
			this.selectedItem = category

			await axios
				.get('api/v1/communities/category' + this.selectedItem.get_absolute_url)
				.then(res => {
					this.communities = res.data.communities
				})
				.catch(error => console.error(error))
		},
		async getCategories() {
			await axios
				.get('api/v1/communities/categories/')
				.then(res => {
					this.categories = res.data
				})
				.catch(error => console.error(error))
		}
	},
	async created() {
		await this.getCategories()
		this.categories.unshift({
			name: 'Comunidades populares'
		})
	}
}
</script>

<style scoped>
#communities-nav {
	min-width: 208px;
	padding: 0;
	height: min-content;
}

.nav-item {
	padding: 6px 8px;
	display: block;
	cursor: pointer;
}

.nav-item:hover {
	background-color: #F0F9FF;
	transition: all 200ms ease;
	border-left: 4px solid #0EA5E9;
}

.selectedItem {
	background-color: #F0F9FF;
	border-left: 4px solid #0EA5E9;
}

#communities {
	max-width: 1100px;
	margin: 0 auto;
}
</style>