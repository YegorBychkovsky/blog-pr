<template>
  <div>
    <p class="post-content">
      {{ postContent }}
    </p>
    <h2>COMMENTS:</h2>
    <CommentsList />
  </div>
</template>
x

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import CommentsList from "../components/CommentsList.vue";

const store = useStore();
const route = useRoute();
const comments = computed(() => {
  return store.state.comment.comments;
});
const postContent = computed(() => {
  const postsString = localStorage.getItem("posts");
  const posts = JSON.parse(postsString);
  posts.find((post) => post._id === route.params.id).content;
});
onMounted(() => {
  store.dispatch("fetchComments", route.params.id);
});
</script>

<style scoped>
.post-content {
  margin-bottom: 30px;
  width: 70%;
  overflow: auto;
  word-wrap: break-word;
}
</style>
