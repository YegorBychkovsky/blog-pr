import axios from "axios";
export const postModule = {
  state: () => ({
    posts: localStorage.getItem("posts") || "",
    isPostsLoading: true,
    token: localStorage.getItem("token") || "",
  }),
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        const { data } = await axios.get(`http://localhost:8000/posts`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        commit("setPosts", data);
      } catch (error) {
        console.log("Error", error);
      } finally {
        commit("setLoading", false);
      }
    },
    async fetchCreatePost({ commit, dispatch, state }, post) {
      try {
        commit("setLoading", true);

        const { data, headers } = await axios.post(
          `http://localhost:8000/posts/create`,
          {
            title: post.title,
            content: post.body,
            author: "652e299f4cd09cef792c3cf3",
          },
          {
            headers: {
              Authorization: `Bearer ${state.token}`, // Передача токена через заголовок
            },
          },
        );
        await commit("setPosts", data);
      } catch (error) {
        console.log("Error", error);
      } finally {
        await dispatch("fetchPosts");
        commit("setLoading", false);
      }
    },
    async deletePost({ commit }, id) {
      commit("deletePost", id);
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
      localStorage.setItem("posts", JSON.stringify(posts));
    },
    addPost(state, post) {
      state.posts.push(post);
    },
    deletePost(state, id) {
      state.posts = state.posts.filter((post) => {
        return post.id !== id;
      });
    },
    addComment(state, comment, id) {
      state.posts[id].comments.push(comment);
    },
    // deleteComment(state, id) {
    //   state.posts = state.posts.filter((post) => {
    //     return post.id !== id;
    //   });
    // },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
  },

  namespaced: true,
};
