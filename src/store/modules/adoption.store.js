// import { userService } from '../../services/user-service.js';
import {adoptionService} from '../../services/adoption-service.js'


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
        setAdoptionRequests(state, {adoptionRequests}){
            state.adoptionRequests = adoptionRequests
        }
    },
    actions: {
       async loadAdoptionRequests({commit}){
        const adoptions = await adoptionService.query()
        commit({ type: 'setAdoptionRequests', adoptions })
       },
        async addAdoptionRequest({ commit }, { request }){
            const addedRequest = await adoptionService.add(request)
            return addedRequest
        },
        

    },
}
