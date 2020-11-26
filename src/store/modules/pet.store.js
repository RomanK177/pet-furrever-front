import { petService } from '../../services/pet-service.js';

export const petStore = {
    strict: true,
    state: {
        pets: [],
        filter: {
            type: "All",
            txt: "",
            size: false,
            sortBy: 'name',
        },
        numOfpets: null
    },
    getters: {
        petsForPreview(state) {
            return state.pets
        }
    },
    mutations: {
        setPets(state, { pets }) {
            state.pets = pets
        },
        saveToy(state, { pet }) {
            state.pets.unshift(pet)
        },
        updateToy(state, { pet }) {
            const idx = state.pets.findIndex(currToy => currToy._id === pet._id)
            state.pets.splice(idx, 1, pet)
        },
        deleteToy(state, { petId }) {
            const idx = state.pets.findIndex(pet => pet._id === petId)
            state.pets.splice(idx, 1);
        },
        setFilter(state, { filter }) {
            state.filter = filter;
        },
        setSort(state, { sortBy }) {
            state.sortBy = sortBy;
        }
    },
    actions: {
        async loadPets({ commit }) {
            const pets = await petService.query()
            commit({ type: 'setPets', pets })
        },
        async savePet({ commit }, { pet }) {
            const action = (pet._id) ? 'updateToy' : 'saveToy'
            const savedToy = await petService.save(pet)
            commit({ type: action, pet: savedToy });
            return savedToy;
        },
        async deletePet({ commit }, payload) {
            const removedToy = petService.remove(payload.petId)
            commit(payload)
            return removedToy
        },
        async filterPets({ commit, state }, { filter }) {
            const pets = await petService.query(filter, state.sortBy)
            commit({ type: 'setPets', pets })
            commit({ type: 'setFilter', filter })
        },
        async getFullPetList() {
            return await petService.query(null, null)
        },
        async getById(context, { id }) {
            const pet = await petService.getById(id)
            return pet
        },
        getEmpty() {
            return petService.getEmptyToy()
        },
    },

}