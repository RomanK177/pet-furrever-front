import { ownerService } from './../../services/owner-service.js';

export const ownerStore = {
  state: {
    loggedInOwner: null,
    owners: []
  },
  getters: {
    getEmptyOwner() {
      return ownerService.getEmptyOwner();
    },
    getOwners(state) {
      return state.owners;
    }
  },
  mutations: {
    setOwner(state, { owner }) {
      state.loggedInOwner = owner;
    }
  },
  actions: {
    async signup({ commit }, { ownerCred }) {
      const owner = await ownerService.signup(ownerCred);
      commit({
        type: 'setOwner',
        owner
      });
      return owner;
    },
    async login({ commit }, { ownerCred }) {
      const owner = await ownerService.login(ownerCred);
      commit({
        type: 'setOwner',
        owner
      });
      return owner;
    },
    async logout({ commit }){
      await ownerService.logout();
      commit({
        type: 'setOwner',
        user: null
      })
    }
  },
}
