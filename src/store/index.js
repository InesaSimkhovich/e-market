import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  getters,
  actions,
  mutations,
  state: {
    currentRate: null,
    namesOfGoods: {},
  },
});

export default store;