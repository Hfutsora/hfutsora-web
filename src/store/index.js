import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';

import constant from './modules/constant';
import im from './modules/im';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    constant,
    im,
  },
  getters,
});

export default store;
