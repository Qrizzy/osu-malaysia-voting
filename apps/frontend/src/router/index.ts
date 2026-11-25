import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/vote',
    redirect: '/'
  },
  {
    path: '/past',
    name: 'PastResults',
    component: () =>
      import(/* webpackChunkName: "past" */ '../views/Past.vue')
  },
  {
    path: '/:year/:rank',
    name: 'PlayerResult',
    component: () =>
      import(/* webpackChunkName: "result" */ '../views/PlayerResult.vue')
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
