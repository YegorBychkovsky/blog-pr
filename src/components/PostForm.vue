<script setup>
import { defineEmits, ref } from "vue";
const emit = defineEmits(["create"]);

const post = ref({
  title: "",
  body: "",
  id: 0,
  // comments: [],
});

const createPost = () => {
  post.value.id = Date.now();
  emit("create", post.value);
  post.value = {
    title: "",
    body: "",
  };
};
</script>

<template>
  <form @submit.prevent="createPost">
    <h4>Создание поста</h4>
    <my-input
      v-focus
      v-model="post.title"
      type="text"
      placeholder="Название"
    />
    <my-input v-model="post.body" type="text" placeholder="Описание" />
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
