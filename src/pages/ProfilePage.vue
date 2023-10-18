<template>
  <div class="profile-container">
    <h1>My Profile</h1>
    <div>
      <img v-if="photo" :src="profilePhoto" alt="Моя фотография" />
      <div v-else>
        <img
          src="https://media.istockphoto.com/id/1337144146/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%B0-%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E.jpg?s=612x612&w=0&k=20&c=fHyhvKma_mzzlFxVsuAoB7juqZOWt-ZUO56PRvkAO_c="
          alt=""
          style="width: 200px; margin-left: 20px"
        />
      </div>
      <input type="file" @change="uploadPhoto" accept="image/*" />
    </div>
    <div>
      <br />
      <h2>Информация о себе</h2>
      <p>{{ aboutMe }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const profilePhoto = ref("");
const aboutMe = ref("Расскажите о себе...");
const photo = ref("");
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
