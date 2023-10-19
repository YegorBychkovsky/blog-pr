<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import PostItem from "./PostItem.vue";
const store = useStore();
// const posts = ref(store.state.post.posts);
const filteredPosts = computed(() => {
  return store.state.post.posts;
});
</script>

<template>
  <div v-if="filteredPosts?.length > 0">
    <h3>Список постов</h3>
    <transition-group name="post-list">
      <PostItem
        v-if="filteredPosts.length > 0"
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: red">Список постов пуст</h2>
</template>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.6s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(120px);
}
.post-list-move {
  transition: transform 0.6s ease;
}
</style>
