import { httpService } from './http-service.js'



export const adoptionService = {
    query,
    addAdoptionRequest,
    updateAdoptionRequest,
    removeAdoptionRequest
}


function query() {
    return httpService.get(`adoptions`);
}

function addAdoptionRequest(petId) {
    return httpService.post(`adoptions`, { petId });
}

function updateAdoptionRequest(adoptionRequest) {
    return httpService.put(`adoptions/${adoptionRequest._id}`, adoptionRequest);
}

function removeAdoptionRequest(adoptionRequestId) {
    return httpService.delete(`adoptions/${adoptionRequestId}`);

}



// function saveAdoption(adoptionRequest) {
//     if (!adoptionRequest._id) {
//         return httpService.post(`adoptions`, adoptionRequest)
//     } else {
//         return httpService.put(`adoptions/${adoptionRequest._id}`, adoptionRequest);
//     }
// }