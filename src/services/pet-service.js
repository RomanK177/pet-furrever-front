// import {httpService} from './http.service.js'
import axios from 'axios';



export const petService = {
    query,
    getById,
    remove,
    save,
    getEmptyPet
}

const BASE_URL = 'http://localhost:3000'


function query(filter = null, sortBy = 'name') {
    var filterStr = '';
    if (filter) {
        const searchStr = (filter.txt) ? `&q=${filter.txt}` : '';
        const typeStr = (filter.type === 'All') ? '' : `&type=${filter.type}`;
        const sizeStr = (filter.size === 'All') ? '' : `&size=${filter.size}`;
        const stockStr = (filter.stock) ? `&inStock=true` : '';
        filterStr = searchStr + sizeStr + stockStr + typeStr;
    }
    let path = `${BASE_URL}/pets?${filterStr}`;
    console.log("🚀 ~ file: pet-service.js ~ line 27 ~ query ~ path", path)
    return axios.get(path)
        .then(res => {
            return res.data
        })

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
        gender: '',
        size: '',
        type: '',
        breed: '',
        age: '',
        adoptedAt: '',
        owner: {},
        description: '',
        imgUrls: [],
        tags: [],
    };
}