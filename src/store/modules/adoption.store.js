// import { userService } from '../../services/user-service.js';
import {adoptionService} from '../../services/adoption-service.js'


export const adoptionStore = {
    state: {
        adoptionRequests: [],
    },
    getters: {
        getAdoptionRequests(state) {
            // console.log(state.addAdoptionRequests)
            return state.adoptionRequests;
        },
      
    },
    mutations: {
        setAdoptionRequests(state, {adoptions}){
            state.adoptionRequests = adoptions
        }
    },
    actions: {
       async loadAdoptionRequests({commit}){
        const adoptions = await adoptionService.query()
        console.log('adoptions', adoptions)
        commit({ type: 'setAdoptionRequests', adoptions })
       },
        async addAdoptionRequest({ commit }, { request }){
            const addedRequest = await adoptionService.add(request)
            return addedRequest
        },
        

    },
}
