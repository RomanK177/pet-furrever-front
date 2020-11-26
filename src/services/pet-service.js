import {httpService} from './http-service.js'
import axios from 'axios';



export const petService = {
    query,
    getPetById,
    removePet,
    savePet,
    getEmptyPet
}

const BASE_URL = 'http://localhost:3000'


function query(filter = null, sortBy = 'name') {
    var filterStr = '';
    if (filter) {
        const searchStr = (filter.txt) ? `&q=${filter.txt}` : '';
        const typeStr = (filter.type === 'All') ? '' : `&type=${filter.type}`;
        const stockStr = (filter.stock) ? `&inStock=true` : '';
        filterStr = searchStr + stockStr + typeStr;
    }
    let path = `${BASE_URL}/pets${filterStr}`;
    console.log("🚀 ~ file: pet-service.js ~ line 27 ~ query ~ path", path)
    return axios.get(path)
        .then(res => {
            return res.data
        })

    // return httpService.get(`pet?sort=${sortBy}${filterStr}`)
}

function getPetById(id) {
    // return axios.get(`${BASE_URL}/pets/${id}`)
    // .then(res => res.data)

    // const url = `${BASE_URL}/pets/${id}`
    // const res = await axios.get(url)
    // const resId = res.data
    return httpService.get(`pets/${id}`)
}

function removePet(id) {
    // return httpService.delete(`pet/${id}`)
}

function savePet(pet) {
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