<script setup>
import { defineEmits, ref } from "vue";
const emit = defineEmits(["create"]);

const comment = ref({
  body: "",
  id: 0,
});

const createComment = () => {
  comment.value.id = Date.now();
  emit("create", comment.value.body);
  comment.value = {
    body: "",
  };
};
</script>

<template>
  <form @submit.prevent="createComment">
    <h4>Create comment</h4>
    <my-input v-model="comment.body" type="text" placeholder="comment" />
    <my-button style="margin-top: 15px" type="submit">Создать</my-button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
</style>
