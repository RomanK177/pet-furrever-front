import { httpService } from './http-service.js'
import { utilService } from './util-service.js';

import axios from 'axios';



export const petService = {
    query,
    getPetById,
    removePet,
    savePet,
    getEmptyPet,
    addComment
}

// const BASE_URL = 'http://localhost:3000'


function query(filter = null, sortBy = 'name') {
    var filterStr = '';
    var sortStr = 'name';
    if (filter) {
        const searchStr = (filter.txt) ? `&q=${filter.txt}` : '';
        const typeStr = (filter.type === 'All') ? '' : `&type=${filter.type}`;
        const sizeStr = (filter.size === 'All') ? '' : `&size=${filter.size}`;
        // const favStr = (filter.favorites) ? `&inStock=true` : '';
        filterStr = searchStr + sizeStr + typeStr;
        sortStr = filter.sortBy
    }
    // let path = `${BASE_URL}/pets?_sort=${sortStr}${filterStr}`;
    // return axios.get(path)
    //     .then(res => {
    //         return res.data
    //     })

    return httpService.get(`pets?_sort=${sortStr}${filterStr}`)
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
    // For front end test only
    //
    if (!pet._id) {
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
        description: '',
        imgUrls: [],
        tags: [],
        location: ""
    };
    return pet;
}

// function update(pet) {
//     return httpService.put(`pets/${pet._id}`, pet);
// }


//Karin change
async function addComment(petId, comment) {
    debugger
    // comment._id = utilService.makeId();
    // var pet = await getPetById(petId);
    // pet.comments.push(comment);
    // console.log(pet.comments)
    console.log(petId, comment)
    return httpService.post(`pets/${petId}/comments`, comment);
}