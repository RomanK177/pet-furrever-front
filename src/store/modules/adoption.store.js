// import { userService } from '../../services/user-service.js';
import { adoptionService } from '../../services/adoption-service.js'


export const adoptionStore = {
    state: {
        adoptionRequests: [],
    },
    getters: {
        getAdoptionRequests(state) {
            return state.adoptionRequests;
        },

    },
    mutations: {
        setAdoptionRequests(state, { adoptions }) {
            state.adoptionRequests = adoptions
        },
        addAdoptionRequest(state, { adoptionRequest }) {
            state.adoptionRequests.push(adoptionRequest)
        },
        saveAdoption(state, { adoption }) {
            state.adoptionRequests.unshift(adoption)
        },
        updateAdoption(state, { adoption }) {
            const idx = state.adoptionRequests.findIndex(currAdoption => currAdoption._id === adoption._id)
            state.adoptionRequests.splice(idx, 1, adoption)
        },
    },
    actions: {
        async loadAdoptionRequests({ commit }) {
            const adoptions = await adoptionService.query()
            // console.log('adoptions', adoptions)
            commit({ type: 'setAdoptionRequests', adoptions })
        },
        async addAdoptionRequest({ commit }, { petId }) {
            try {
                const addedAdoptionRequest = await adoptionService.addAdoptionRequest(petId)
                return addedAdoptionRequest;
            } catch (err) {
                console.log('Cannot add request', err);
                alert('Cannot add request')
            }
        },
        async updateAdoptionRequest({ commit }, { adoptionRequest }) {
            try {
                const action = (adoptionRequest._id) ? 'updateAdoption' : 'saveAdoption';
                const savedAdoption = await adoptionService.saveAdoption(adoptionRequest)
                commit({ type: action, adoptionRequest: savedAdoption });
                return savedAdoption;
            } catch (err) {
                console.error('Cannot save adoption.', err)
            }
        },

    },
}