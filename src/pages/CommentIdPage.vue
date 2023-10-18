<template>
  <div>
    <p class="comment-content">
      {{ commentContent }}
    </p>
    <h2>COMMENTS:</h2>
    <CommentsList />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import CommentsList from "../components/CommentsList.vue";

const store = useStore();
const route = useRoute();

const commentContent = computed(() => {
  const commentsString = localStorage.getItem("comments");
  const comments = JSON.parse(commentsString);
  comments.find((comment) => comment._id === route.params.id)?.content;
});
onMounted(() => {
  console.log("fetch");
  store.dispatch("fetchCommentsForComment", route.params.id);
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
