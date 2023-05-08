<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      v-focus
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="поиск..."
    ></my-input>
    <div class="app__btns">
      <my-button @click="showDialogWindow">Создать пост</my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      ></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идёт загрузка</div>
    <div class="observer" v-intersection="fetchMorePosts"></div>
    <!-- <div class="page__wrapped">
      <div
        class="page"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{ currentPage: page === pageNumber }"
        @click="changePageNumber(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>
<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/ui/MyDialog.vue';
import MySelect from '@/components/ui/MySelect.vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
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
    };
  },
  methods: {
    ...mapActions({
      fetchMorePosts: 'post/fetchMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialogWindow() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),

    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      totalPages: (state) => state.post.totalPages,
      limit: (state) => state.post.limit,
      URL: (state) => state.post.URL,
      sortOptions: (state) => state.post.sortOptions,
    }),
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
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
