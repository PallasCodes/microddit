<template>
  <article class="card post hover:border-4 hover:border-black mb-4 max-w-3xl">
    <header class="mb-2">
      <div class="flex items-center mb-1">
        <div class="w-8 h-8 rounded-full overflow-hidden mr-2">
          <img src="https://monterreyrock.com/wp-content/uploads/2015/03/stevie-ray-vaughan-1.jpg" alt="" class="object-cover w-full h-8" />
        </div>
        <span class="text-gray-700 text-sm">
          <b>@{{ post.get_user }}</b> en <b>/musica</b> el {{ getDate(post.date) }}
        </span>
      </div>
      <div class="post-title bold text-2xl">
        {{ post.title }}
      </div>
    </header>
    <a href="" class="post-content">
      <div class="post-img overflow-hidden mb-2" v-if="post.get_image">
        <img :src="post.get_image" alt="post" class="w-full h-auto object-cover" />
      </div>
      <span class="block post-text text">
        {{ post.post_text }}
      </span>
    </a>
    <footer class="flex text-blue-600 mt-3">
      <div class="flex items-center mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
        <span class="text-gray-500 text-xs ml-1">25</span>
      </div>
      <div class="flex items-center mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
        </svg>
        <span class="text-gray-500 text-xs ml-1">25</span>
      </div>
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        <span class="text-gray-500 ml-1 text-xs">5</span>
      </div>
    </footer>
  </article>
</template>

<script>
export default {
  name: "Post",
  props: {
    post: Object
  },
  methods: {
    getDate(dateTime) {
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

      const date = new Date(dateTime)
      const month = months[date.getMonth()]
      const day = date.getDate()
      const year = date.getFullYear()
      const hours = date.getHours()
      const minutes = date.getMinutes()

      return `${day} de ${month} del ${year} a las ${hours}:${minutes}`
    }
  }
};
</script>

<style>
.post-img {
  max-height: 400px;
}

.post-text {
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>