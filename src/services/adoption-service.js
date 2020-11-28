import { httpService } from './http-service.js'



export const adoptionService = {
    query,
    add
}


function add(adoption) {
    return httpService.post(`adoptions`, adoption)

}


function query(){
    return httpService.get(`adoptions`)

}
