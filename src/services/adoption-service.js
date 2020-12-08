import { httpService } from './http-service.js'



export const adoptionService = {
    query,
    addAdoptionRequest,
    updateAdoptionRequest,
    removeAdoptionRequest,
    addMessage,
    getAdoptionRequestById,
    markMessageAsUnread
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
    return httpService.post(`adoptions/${adoptionId}/messages`, { message });
}

async function markMessageAsUnread(adoptionId) {
    return httpService.post(`adoptions/${adoptionId}/messages`)
}



// function saveAdoption(adoptionRequest) {
//     if (!adoptionRequest._id) {
//         return httpService.post(`adoptions`, adoptionRequest)
//     } else {
//         return httpService.put(`adoptions/${adoptionRequest._id}`, adoptionRequest);
//     }
// }