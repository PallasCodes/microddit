<template>
  <div id="feed" class="flex gap-4">
    <main>
      <Post />
      <Post />
    </main>
    <div class="hidden md:block sticky top-16" id="side">
      <TheTopCommunities />
      <TheFooter />
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import TheTopCommunities from "@/components/UI/TheTopCommunities.vue";
import TheFooter from "@/components/UI/TheFooter.vue";

export default {
  components: {
    Post,
    TheTopCommunities,
    TheFooter,
  },
};
</script>

<style scoped>
#side {
  height: min-content;
}
</style>
