<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-focus placeholder="поиск..."></my-input>
    <div class="app__btns">
      <my-button @click="showDialogWindow">Создать пост</my-button>
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList v-if="!isPostsLoading" />
    <div v-else>Идёт загрузка</div>
  </div>
</template>
<script setup>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/ui/MyDialog.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const postLoading = computed(() => store.state.post.isPostsLoading);
const isPostsLoading = ref(postLoading);
const dialogVisible = ref(false);

const createPost = (post) => {
  store.dispatch("post/fetchCreatePost", post);
  dialogVisible.value = false;
};

const showDialogWindow = () => {
  dialogVisible.value = true;
};

onMounted(async () => {
  await store.dispatch("post/fetchPosts");
});
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px;
}

.page__wrapped {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}
.currentPage {
  border: 2px solid teal;
}
.observer {
  height: 30px;
}
</style>
