<template>
  <div>
    <navbar></navbar>
    <div class="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
</style>
