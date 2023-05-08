<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      v-focus
      v-model="searchQuery"
      placeholder="поиск..."
    ></my-input>
    <div class="app__btns">
      <my-button @click="showDialogWindow">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
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
import axios from 'axios';
export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
    MySelect,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      totalPages: 0,
      limit: 10,
      URL: 'https://jsonplaceholder.typicode.com/posts',
      sortOptions: [
        {
          value: 'title',
          name: 'По названию',
        },
        {
          value: 'body',
          name: 'По содержимому',
        },
      ],
    };
  },
  methods: {
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
    // changePageNumber(number) {
    //   this.page = number;
    //   this.fetchPosts();
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const { data, headers } = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          },
        );
        this.totalPages = Math.ceil(headers['x-total-count'] / this.limit);
        this.posts = data;
      } catch (error) {
        alert('Ошибка', error);
      } finally {
        this.isPostsLoading = false;
      }
    },
    async fetchMorePosts() {
      try {
        this.page += 1;
        const { data, headers } = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          },
        );
        this.totalPages = Math.ceil(headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...data];
      } catch (error) {
        alert('Ошибка', error);
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]),
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title?.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
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
