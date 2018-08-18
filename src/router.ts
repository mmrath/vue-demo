import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import PreActivation from "./views/core/PreActivation.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/user/signup",
      name: "signup",
      component: () =>
        import(/* webpackChunkName: "signup" */ "./views/core/SignUp.vue")
    },
    {
      path: "/user/pre-activation",
      name: "user/pre-activation",
      props: true,
      component: PreActivation
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
