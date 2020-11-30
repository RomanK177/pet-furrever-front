import { httpService } from './http-service.js'



export const adoptionService = {
    query,
    add,
    saveAdoption
}


function add(adoption) {
    return httpService.post(`adoptions`, adoption)

}


function query() {
    return httpService.get(`adoptions`)


}

function saveAdoption(adoption) {

    if (!adoption._id) {
        adoption.createdAt = Date.now();
        return httpService.post(`adoptions`, adoption)
    } else {
        return httpService.put(`adoptions/${adoption._id}`, adoption)
    }
}