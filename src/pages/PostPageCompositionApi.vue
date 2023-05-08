<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      v-focus
      v-model="searchQuery"
      placeholder="поиск..."
    ></my-input>
    <div class="app__btns">
      <my-button>Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form />
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
    <div v-else>Идёт загрузка</div>
  </div>
</template>
<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/ui/MyDialog.vue';
import MySelect from '@/components/ui/MySelect.vue';
import { usePosts } from '@/hooks/usePosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';
import useSortedPosts from '@/hooks/useSortedPosts';
export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
    MySelect,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
      ],
    };
  },
  setup(props) {
    const { posts, isPostsLoading, totalPages } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);
    return {
      posts,
      isPostsLoading,
      totalPages,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
  },
};
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
  /* background: green; */
}
</style>
