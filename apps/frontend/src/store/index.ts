import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth';
import Choice from './modules/choice';
import Vote from './modules/vote';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth,
    Choice,
    Vote
  }
});
export default store;
