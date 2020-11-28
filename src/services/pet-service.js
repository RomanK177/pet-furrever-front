import { httpService } from './http-service.js'
import axios from 'axios';



export const petService = {
    query,
    getPetById,
    removePet,
    savePet,
    getEmptyPet
}

// const BASE_URL = 'http://localhost:3000'


function query(filter = null, sortBy = 'name') {
    var filterStr = '';
    var sortStr = '';
    if (filter) {
        const searchStr = (filter.txt) ? `&q=${filter.txt}` : '';
        const typeStr = (filter.type === 'All') ? '' : `&type=${filter.type}`;
        const sizeStr = (filter.size === 'All') ? '' : `&size=${filter.size}`;
        const stockStr = (filter.stock) ? `&inStock=true` : '';
        filterStr = searchStr + sizeStr + stockStr + typeStr;
        sortStr = filter.sortBy
    }
    // let path = `${BASE_URL}/pets?_sort=${sortStr}${filterStr}`;
    // return axios.get(path)
    //     .then(res => {
    //         return res.data
    //     })

    return httpService.get(`pets?_sort=${sortBy}${filterStr}`)
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

function savePet(pet, user) {
    // For front end test only
    pet.owner = user; 
    //
    if (!pet._id) {
        pet.createdAt = Date.now();
        return httpService.post(`pets`, pet)
    } else {
        return httpService.put(`pets/${pet._id}`, pet)
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
        comments: [
            {
                comment: '',
                by: {
                    userName: '',
                    userId: '',
                }
            },
            {
                comment: '',
                by: {
                    userName: '',
                    userId: '',
                }
            }
        ],
        numOfTreats: ''
    }
    return pet;
}