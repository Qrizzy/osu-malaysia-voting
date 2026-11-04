import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Auth from '../store/modules/auth';

Vue.use(VueRouter);

function loggedInGuard(to, from, next) {
  const loggedInPromise = new Promise(function (resolve) {
    (function waitForLoggedInCheck() {
      if (Auth.state.checked) return resolve();
      setTimeout(waitForLoggedInCheck, 30);
    })();
  });

  loggedInPromise.then(() => {
    if (!Auth.state.loggedIn) {
      next({ name: 'Home' });
    }

    next();
  });
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/vote',
    name: 'Vote',
    beforeEnter: loggedInGuard,
    component: () =>
      import(/* webpackChunkName: "vote" */ '../views/Vote.vue')
  },
  {
    path: '/past',
    name: 'PastResults',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "past" */ '../views/Past.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
