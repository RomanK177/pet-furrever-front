import { httpService } from './http-service.js'



export const adoptionService = {
    query,
    addAdoptionRequest,
    updateAdoptionRequest,
    removeAdoptionRequest,
    addMessage,
    getAdoptionRequestById
}


function query() {
    return httpService.get(`adoptions`);
}

function addAdoptionRequest(petId) {
    return httpService.post(`adoptions`, { petId });
}

function getAdoptionRequestById(adoptionRequestId) {
    return httpService.get(`adoptions/${adoptionRequestId}`);
}

function updateAdoptionRequest(adoptionRequest) {
    return httpService.put(`adoptions/${adoptionRequest._id}`, adoptionRequest);
}

function removeAdoptionRequest(adoptionRequestId) {
    return httpService.delete(`adoptions/${adoptionRequestId}`);

}

async function addMessage(adoptionId, message) {
    return httpService.put(`adoptions/${adoptionId}/messages`, { message });
}






// function saveAdoption(adoptionRequest) {
//     if (!adoptionRequest._id) {
//         return httpService.post(`adoptions`, adoptionRequest)
//     } else {
//         return httpService.put(`adoptions/${adoptionRequest._id}`, adoptionRequest);
//     }
// }