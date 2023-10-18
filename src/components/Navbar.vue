<template>
  <div class="navbar">
    <div @click="$router.push('/')">Posts Application</div>
    <div class="navbar__btns">
      <my-button
        v-if="store.state.post.token"
        @click="$router.push('/posts')"
        >Posts</my-button
      >
      <my-button
        v-else
        @click="$router.push('/login')"
        style="margin-left: 20px"
        >Login</my-button
      >
      <my-button
        v-if="store.state.post.token"
        @click="$router.push('/profile')"
        style="margin-left: 20px"
      >
        Profile
      </my-button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
