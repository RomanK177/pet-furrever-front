import { httpService } from './http-service.js'

export const petService = {
    query,
    getPetById,
    removePet,
    savePet,
    getEmptyPet,
    addComment,
    addTreat
}

// const BASE_URL = 'http://localhost:3000'


function query(filter = null, sortBy = 'name') {
    var filterStr = '';
    var sortStr = 'name';
    if (filter) {
        const searchStr = (filter.txt) ? `&txt=${filter.txt}` : '';
        const typeStr = (filter.type === 'All') ? '' : `&type=${filter.type}`;
        const sizeStr = (filter.size === 'All') ? '' : `&size=${filter.size}`;
        // const favStr = (filter.favorites) ? `&inStock=true` : '';
        filterStr = searchStr + sizeStr + typeStr;
        sortStr = filter.sortBy
    }

    return httpService.get(`pets?_sort=${sortStr}${filterStr}`)
}

function getPetById(id) {
    return httpService.get(`pets/${id}`)
}

function removePet(id) {
    return httpService.delete(`pet/${id}`)
}

function savePet(pet) {
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
    };
    return pet;
}

async function addComment(petId, comment) {
    return httpService.post(`pets/${petId}/comments`, comment);
}

async function addTreat(petId) {
    console.log(petId)
    return httpService.post(`pets/${petId}/treats`);
}