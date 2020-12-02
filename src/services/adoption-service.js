import { httpService } from './http-service.js'



export const adoptionService = {
    query,
    addAdoptionRequest,
    updateAdoptionRequest
}


function query() {
    return httpService.get(`adoptions`);
}

function addAdoptionRequest(petId) {
    debugger
    return httpService.post(`adoptions`, {petId});
}

function updateAdoptionRequest(adoptionRequest) {
    return httpService.put(`adoptions/${adoptionRequest._id}`, adoptionRequest);
}