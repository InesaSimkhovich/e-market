import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
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
    names: null, // names from names.json
    data: null, // data from data.json
    isShowSpinner: false,
    goods: [],
    cartList: [],
  },
});

export default store;
