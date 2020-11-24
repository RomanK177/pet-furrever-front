import Vue from 'vue'
import Vuex from 'vuex'

import petStore from '@/modules/pet-store.js';
import userStore from '@/modules/user-store.js';
import rescueStore from '@/modules/rescue-store.js';
import reviewStore from '@/modules/review-store.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        petStore,
        userStore,
        rescueStore,
        reviewStore
    }
})