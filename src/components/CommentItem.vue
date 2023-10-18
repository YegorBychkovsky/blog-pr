<template>
  <div class="post">
    <div>
      <div><strong>Author:</strong> {{ comment.author.fullName }}</div>
      <div><strong>content:</strong> {{ comment.text }}</div>
    </div>
    <div class="comment__btns">
      <my-button @click="openComment">Open</my-button>
      <my-button @click="showDialogWindow">To Comment</my-button>
    </div>
    <MyDialog v-model:show="dialogVisible">
      <CommentForm @create="createComment" />
    </MyDialog>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import CommentForm from "../components/CommentForm.vue";
import MyDialog from "../components/ui/MyDialog.vue";

const route = useRouter();
const store = useStore();

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
const dialogVisible = ref(false);

const openComment = () => {
  route.push(`/comment/${props.comment._id}`);
};

const showDialogWindow = () => {
  dialogVisible.value = true;
};
const createComment = (text) => {
  store.dispatch("replyToComment", {
    text: text,
    parentCommentId: props.comment._id,
    author: props.comment.author._id,
  });

  dialogVisible.value = false;
};
</script>

<style>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
.post__btns {
  display: flex;
}
</style>
