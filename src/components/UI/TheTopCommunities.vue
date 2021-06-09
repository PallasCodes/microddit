<template>
  <aside class="card w-full">
    <h4 class="font-bold text-lg text-gray-900 mb-4">Comunidades más populares</h4>
    <ol class="flex flex-col gap-2">
      <a href="">
        <li class="flex items-center">
          <span class="mr-4">1 </span>
          <div class="w-7 h-7 rounded-full overflow-hidden mr-2">
            <img src="https://monterreyrock.com/wp-content/uploads/2015/03/stevie-ray-vaughan-1.jpg" alt="" class="object-cover w-full h-7" />
          </div>
          <span>Filosofía</span>
        </li>
      </a>
      <a href="">
        <li class="flex items-center">
          <span class="mr-4">2 </span>
          <div class="w-7 h-7 rounded-full overflow-hidden mr-2">
            <img src="https://monterreyrock.com/wp-content/uploads/2015/03/stevie-ray-vaughan-1.jpg" alt="" class="object-cover w-full h-7" />
          </div>
          <span>Artes Marciales</span>
        </li>
      </a>
      <a href="">
        <li class="flex items-center">
          <span class="mr-4">3 </span>
          <div class="w-7 h-7 rounded-full overflow-hidden mr-2">
            <img src="https://monterreyrock.com/wp-content/uploads/2015/03/stevie-ray-vaughan-1.jpg" alt="" class="object-cover w-full h-7" />
          </div>
          <span>Cine</span>
        </li>
      </a>
      <a href="">
        <li class="flex items-center">
          <span class="mr-4">4 </span>
          <div class="w-7 h-7 rounded-full overflow-hidden mr-2">
            <img src="https://monterreyrock.com/wp-content/uploads/2015/03/stevie-ray-vaughan-1.jpg" alt="" class="object-cover w-full h-7" />
          </div>
          <span>Rock</span>
        </li>
      </a>
      <a href="" class="">
        <li class="flex items-center">
          <span class="mr-4">5 </span>
          <div class="w-7 h-7 rounded-full overflow-hidden mr-2">
            <img src="https://monterreyrock.com/wp-content/uploads/2015/03/stevie-ray-vaughan-1.jpg" alt="" class="object-cover w-full h-7" />
          </div>
          <span>Diseño</span>
        </li>
      </a>
    </ol>
    <div class="w-full mt-3">
      <router-link to="/communities" class="text-blue-500 text-sm font-bold">Ver más</router-link>
    </div>
  </aside>
</template>

<script>
export default {
  name: "TheTopCommunities",
};
</script>