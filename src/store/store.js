import Vue from 'vue';
import Vuex from 'vuex';

import { petStore } from './modules/pet.store.js';
import { userStore } from './modules/user.store.js';
import {adoptionStore} from './modules/adoption.store.js';
// import {socketStore} from './modules/socket.store.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        petStore,
        userStore,
        adoptionStore,
        // socketStore
    }
})