<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CommentItem from "./CommentItem.vue";

const store = useStore();

const filteredComments = computed(() => {
  return store.state.comment.comments;
});
</script>

<template>
  <div v-if="filteredComments.length > 0">
    <transition-group name="post-list">
      <CommentItem
        v-if="filteredComments.length > 0"
        v-for="comment in filteredComments"
        :key="comment._id"
        :comment="comment"
      />
    </transition-group>
  </div>
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
