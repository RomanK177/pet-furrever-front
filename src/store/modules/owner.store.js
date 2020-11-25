import { ownerService } from './../../services/owner-service.js';

export const ownerStore =  {
    state: {
    },
    getters:{
      getEmptyOwner(){
        return ownerService.getEmptyOwner();
      }
    },
    mutations: {
    },
    actions: {
    },
  }
  