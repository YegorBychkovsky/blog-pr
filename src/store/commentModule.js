import axios from "axios";

export const commentModule = {
  state: () => ({
    comments: [],
    token: localStorage.getItem("token") || "",
  }),
  actions: {
    async fetchCommentsForComment({ commit, state }, commentId) {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/commentsForComment/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          },
        );
        commit("setComments", data);
      } catch (error) {
        console.log("Error fetching comments", error);
      }
    },
    async fetchComments({ commit, state }, postId) {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/comments/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          },
        );
        commit("setComments", data);
      } catch (error) {
        console.log("Error fetching comments", error);
      }
    },
    async replyToComment({ commit, state }, comment) {
      try {
        const { data } = await axios.post(
          `http://localhost:8000/comment/reply`,
          {
            text: comment.text,
            parentCommentId: comment.parentCommentId,
            userId: comment.author,
          },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          },
        );
      } catch (error) {
        console.error("Ошибка при создании комментария:", error);
        throw error;
      }
    },

    async createComment({ commit, state }, { postId, text, author }) {
      try {
        const { data } = await axios.post(
          `http://localhost:8000/comment/create`,
          {
            postId,
            text,
            author,
          },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          },
        );
        commit("addComment", data);
      } catch (error) {
        console.log("Error creating comment", error);
      }
    },
  },
  mutations: {
    setComments(state, comments) {
      state.comments = comments;
      localStorage.setItem("comments", JSON.stringify(comments));
    },
    addComment(state, comment) {
      state.comments.push(comment);
    },
  },
};
