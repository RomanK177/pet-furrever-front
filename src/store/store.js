import Vue from 'vue';
import Vuex from 'vuex';

import { petStore } from './modules/pet.store.js';
import { userStore } from './modules/user.store.js';
import { ownerStore } from './modules/owner.store.js';
import { reviewStore } from './modules/review.store.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    petStore,
    userStore,
    ownerStore,
    reviewStore
  }
})
