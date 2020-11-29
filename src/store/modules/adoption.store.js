// import { userService } from '../../services/user-service.js';
import {adoptionService} from '../../services/adoption-service.js'


export const adoptionStore = {
    state: {
        adoptionRequests: [],
    },
    getters: {
        getAdoptionRequests(state) {
            console.log('from store' ,state.adoptionRequests)
            return state.adoptionRequests;
        },
      
    },
    mutations: {
        setAdoptionRequests(state, {adoptions}){
            state.adoptionRequests = adoptions
        },
        addAdoptionRequest(state, {adoptionRequest}){
            state.adoptionRequests.push(adoptionRequest)
        }
    },
    actions: {
       async loadAdoptionRequests({commit}){
        const adoptions = await adoptionService.query()
        // console.log('adoptions', adoptions)
        commit({ type: 'setAdoptionRequests', adoptions })
       },
        async addAdoptionRequest({ commit }, { request }){
            console.log('request', request)
            const adoptionRequest = await adoptionService.add(request)
           commit ({type: 'addAdoptionRequest', adoptionRequest})
        },
        

    },
}
