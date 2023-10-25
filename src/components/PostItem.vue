<template>
  <div class="post">
    <div class="content">
      <div><strong>Title:</strong> {{ post.title }}</div>
      <div class="content">
        <strong>Content:</strong> {{ post.content }}
      </div>
    </div>
    <div class="post__btns">
      <my-button @click="openPost">Open</my-button>
      <my-button style="height: 38px" @click="showDialogWindow"
        >To Comment</my-button
      >
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

const store = useStore();
const route = useRouter();

const dialogVisible = ref(false);

const showDialogWindow = () => {
  dialogVisible.value = true;
};

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
console.log(props.post);
const openPost = () => {
  route.push(`/posts/${props.post._id}`);
};

const createComment = (text) => {
  store.dispatch("createComment", {
    postId: props.post._id,
    text: text,
    author: props.post.author,
  });
  dialogVisible.value = false;
};
</script>

<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
.content {
  width: 70%;
  overflow: hidden;
  word-wrap: break-word;
}
.post__btns {
  display: flex;
}
</style>
