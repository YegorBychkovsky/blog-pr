<template>
  <div class="login-form-container">
    <form @submit.prevent="register">
      <div>
        <label for="email">Email: </label>
        <MyInput type="text" id="email" v-model="email" />
      </div>
      <div>
        <label for="username">Username: </label>
        <MyInput type="text" id="username" v-model="fullName" />
      </div>
      <div>
        <label for="password">Password: </label>
        <MyInput type="password" id="password" v-model="password" />
      </div>
      <div>
        <label for="confirmPassword">Confirm: </label>
        <MyInput
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
        />
      </div>
      <MyButton
        class="button"
        type="button"
        @click="$router.push('/login')"
        >Login</MyButton
      >
      <MyButton type="submit">Registration</MyButton>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import MyButton from "../components/ui/MyButton.vue";
import MyInput from "../components/ui/MyInput.vue";

const route = useRouter();
const store = useStore();
const email = ref("");
const fullName = ref("");
const password = ref("");
const confirmPassword = ref("");

const register = async () => {
  await store.dispatch("user/fetchRegister", {
    email: email.value,
    fullName: fullName.value,
    password: password.value,
  });
  const token = localStorage.getItem("token");
  if (token) {
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
