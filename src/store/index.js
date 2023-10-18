import { createStore } from "vuex";
import { commentModule } from "./commentModule";
import { postModule } from "./postModule";
import { userModule } from "./userModule";

export default createStore({
  modules: {
    comment: commentModule,
    post: postModule,
    user: userModule,
  },
});
