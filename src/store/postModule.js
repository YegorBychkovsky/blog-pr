import axios from 'axios';
export const postModule = {
  state: () => ({
    posts: [],
    isPostsLoading: false,
    selectedSort: '',
    searchQuery: '',
    page: 1,
    totalPages: 0,
    limit: 10,
    URL: 'https://jsonplaceholder.typicode.com/posts',
    sortOptions: [
      { value: 'title', name: 'По названию' },
      { value: 'body', name: 'По содержимому' },
    ],
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort],
        ),
      );
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title
          ?.toLowerCase()
          .includes(state.searchQuery.toLowerCase()),
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true);
        const { data, headers } = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          },
        );
        commit(
          'setTotalPages',
          Math.ceil(headers['x-total-count'] / state.limit),
        );
        commit('setPosts', data);
      } catch (error) {
        console.log('Ошибка', error);
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1);
        const { data, headers } = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          },
        );
        commit(
          'setTotalPages',
          Math.ceil(headers['x-total-count'] / state.limit),
        );
        commit('setPosts', [...state.posts, ...data]);
      } catch (error) {
        alert('Ошибка', error);
      }
    },
  },
  namespaced: true,
};
