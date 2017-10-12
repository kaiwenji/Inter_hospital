import Vue from "vue";
import index from "../pages/index.vue";
import Router from "vue-router";

Vue.use(Router)

export default new Router({
  routes: [
      {
          name:"index",
          path:"/",
          component:index
      }
  ]
})
