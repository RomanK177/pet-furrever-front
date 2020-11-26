// import {httpService} from './http.service.js'
import axios from 'axios';



export const petService = {
    query,
    getById,
    remove,
    save,
    getEmptyPet
}

function query(filter = null, sortBy = 'name') {
    var filterStr = '';
    if (filter) {
        const searchStr = (filter.txt) ? `&q=${filter.txt}` : '';
        const typeStr = (filter.type === 'All') ? '' : `&type=${filter.type}`;
        const stockStr = (filter.stock) ? `&inStock=true` : '';
        filterStr = searchStr + stockStr + typeStr;
    }
    // return httpService.get(`pet?sort=${sortBy}${filterStr}`)
}

function getById(id) {
    // return httpService.get(`pet/${id}`)
}

function remove(id) {
    // return httpService.delete(`pet/${id}`)
}

function save(pet) {
    if (!pet._id) {
        pet.createdAt = Date.now();
        // return httpService.post(`pet`, pet)
    } else {
        // return httpService.put(`pet/${pet._id}`, pet)
    }
}

function getEmptyPet() {
    const pet = {
        name: '',
        price: null,
        type: null,
        createdAt: null,
        inStock: true
    };
    return Promise.resolve(pet)
}