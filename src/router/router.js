import About from "@/pages/About";
import CommentIdPage from "@/pages/CommentIdPage";
import LoginPage from "@/pages/LoginPage";
import Main from "@/pages/Main";
import PostIdPage from "@/pages/PostIdPage";
import PostPage from "@/pages/PostPage";
import ProfilePage from "@/pages/ProfilePage";
import RegisterPage from "@/pages/RegisterPage";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/profile",
    component: ProfilePage,
  },
  {
    path: "/posts",
    component: PostPage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/posts/:id",
    component: PostIdPage,
  },
  {
    path: "/comment/:id",
    component: CommentIdPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
