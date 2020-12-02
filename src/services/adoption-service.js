import { httpService } from './http-service.js'



export const adoptionService = {
    query,
    addAdoptionRequest,
    updateAdoptionRequest
}


function query() {
    return httpService.get(`adoptions`);
}

<<<<<<< HEAD
function addAdoptionRequest(adoptionRequest) {
    // debugger
    return httpService.post(`adoptions`, adoptionRequest)
=======
function addAdoptionRequest(petId) {
    debugger
    return httpService.post(`adoptions`, {petId});
>>>>>>> 6b6479dddac8f1344906ce6d3b728b8602b08c86
}

function updateAdoptionRequest(adoptionRequest) {
    return httpService.put(`adoptions/${adoptionRequest._id}`, adoptionRequest);
}