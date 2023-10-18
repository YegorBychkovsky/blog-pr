import axios from "axios";

export const userModule = {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: null,
  }),
  actions: {
    async fetchLogin({ commit }, userData) {
      try {
        commit("setLoading", true);
        const { data } = await axios.post(
          "http://localhost:8000/auth/login",
          userData,
        );
        commit("setToken", data.token);
        commit("setUser", data);
      } catch (error) {
        console.log("Error", error);
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchRegister({ commit }, userData) {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/auth/register",
          userData,
        );
        commit("setToken", data.token);
        commit("setUser", data.user);
      } catch (error) {
        console.log("Error", error);
      } finally {
      }
    },

    async fetchChangeProfile({ commit }, userName, avatarUrl, age, sex) {
      try {
        commit("setLoading", true);
        const newProfileData = {};

        if (userName) {
          newProfileData.fullName = userName;
        }
        if (avatarUrl) {
          newProfileData.avatarUrl = avatarUrl;
        }
        if (age) {
          newProfileData.age = age;
        }
        if (sex) {
          newProfileData.sex = sex;
        }
        const { data } = await axios.post(
          "http://localhost:8000/profile/change",
          {
            newProfileData,
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          },
        );
        commit("setToken", data.token);
        commit("setUser", data.user);
      } catch (error) {
        console.log("Error", error);
      } finally {
        commit("setLoading", false);
      }
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
  namespaced: true,
};
