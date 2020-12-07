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
        updateAdoption(state, { adoptionRequest }) {
            const idx = state.adoptionRequests.findIndex(currAdoption => currAdoption._id === adoptionRequest._id)
            state.adoptionRequests.splice(idx, 1, adoptionRequest)
        },
        removeAdoption(state, { adoptionRequest }) {
            const idx = state.adoptionRequests.findIndex(currAdoption => currAdoption._id === adoptionRequest._id)
            state.adoptionRequests.splice(idx, 1)

        }
    },
    actions: {
        async loadAdoptionRequests({ commit }) {
            const adoptions = await adoptionService.query()
                // console.log('adoptions', adoptions)
            commit({ type: 'setAdoptionRequests', adoptions })
        },
        async addAdoptionRequest({ commit }, { petId }) {
            try {
                const adoptionRequest = await adoptionService.addAdoptionRequest(petId);
                commit({ type: 'addAdoptionRequest', adoptionRequest });
                console.log('commited adoption request')
                return adoptionRequest;
            } catch (err) {
                console.log('Cannot add request', err);
                alert('Cannot add request')
            }
        },
        async updateAdoptionRequest({ commit }, { adoptionRequest }) {

            try {

                // console.log('adoptionrequest updated in store', adoptionRequest)
                const savedAdoption = await adoptionService.updateAdoptionRequest(adoptionRequest)
                commit({ type: 'updateAdoption', adoptionRequest: savedAdoption });
                return savedAdoption;
            } catch (err) {
                console.error('Cannot save adoption.', err)
            }
        },

        async removeAdoptionRequest({ commit }, { adoptionRequest }) {
            try {
                console.log('remove from store', adoptionRequest)
                const removedAdoption = await adoptionService.removeAdoptionRequest(adoptionRequest._id)
                commit({ type: 'removeAdoption', adoptionRequest });
                return removedAdoption;
            } catch (err) {
                console.error('Cannot remove adoption.', err)
            }
        },
        async addMessage({ commit }, { adoptionId, message }) {
            try {
                const addedMessage = await adoptionService.addMessage(adoptionId, message);
                const adoptionRequest = await adoptionService.getAdoptionRequestById(adoptionId);
                commit({ type: 'updateAdoption', adoptionRequest })
                    // return addedMessage;
            } catch (err) {
                console.error('Cannot send message.', err)
            }
        },
        // async markMessageAsUnread({commit} , {message, adoptionRequestId}) {
        //     try {
        //         const readedMessage = await adoptionService.markMessageAsUnread(message, adoptionRequestId);
        //         var adoptionRequest = await adoptionService.getAdoptionRequestById(adoptionRequestId);
        //         commit({type: 'updateAdoption', adoptionRequest});
        //         return readedMessage;
        //     } catch (err) {
        //         console.error('Messages cannot unread.', err)
        //     }
        // },
        async getAdoptionById(context, { adoptionId }) {
            console.log('in update request in store')
            const adoption = await adoptionService.getAdoptionRequestById(adoptionId)
            return adoption
        },

    },
}