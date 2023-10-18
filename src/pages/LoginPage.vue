<template>
  <div class="login-form-container">
    <form @submit.prevent="login">
      <div>
        <label for="email">Email: </label>
        <MyInput class="myInput" type="text" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password: </label>
        <MyInput type="password" id="password" v-model="password" />
      </div>
      <MyButton class="button" type="submit">Login</MyButton>
      <MyButton type="button" @click="$router.push('/register')"
        >Registration</MyButton
      >
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import MyButton from "../components/ui/MyButton.vue";
import MyInput from "../components/ui/MyInput.vue";

const store = useStore();
const route = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
  await store.dispatch("user/fetchLogin", {
    email: email.value,
    password: password.value,
  });
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    console.log(token);
    route.push({ path: "/posts" });
  }
};
</script>

<style scoped>
.login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  margin-right: 45px;
}

input {
  margin-bottom: 10px;
}
</style>
