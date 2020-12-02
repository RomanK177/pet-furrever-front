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
        },

    },
    mutations: {
        setPets(state, { pets }) {
            state.pets = pets
        },
        savePet(state, { pet }) {
            state.pets.unshift(pet)
        },
        updatePet(state, { pet }) {
            const idx = state.pets.findIndex(currPet => currPet._id === pet._id)
            state.pets.splice(idx, 1, pet)
        },
        deletePet(state, { petId }) {
            const idx = state.pets.findIndex(pet => pet._id === petId)
            state.pets.splice(idx, 1);
        },

        setFilter(state, { filter }) {
            console.log("🚀 ~ file: pet.store.js ~ line 39 ~ setFilter ~ filter", filter)
            state.filter = filter;
        },
        setSort(state, { sortBy }) {
            state.sortBy = sortBy;
        },
    },
    actions: {
        async loadPets({ commit }) {
            const pets = await petService.query()
            commit({ type: 'setPets', pets })

        },
        async savePet({ commit }, { pet }) {
            const action = (pet._id) ? 'updatePet' : 'savePet';
            const savedPet = await petService.savePet(pet)
            commit({ type: action, pet: savedPet });
            return savedPet;
        },
        async deletePet({ commit }, payload) {
            const removedPet = petService.removePet(payload.petId)
            commit(payload)
            return removedPet
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
            const pet = await petService.getPetById(id)
            return pet
        },
        //Karin changes:
        async addComment(context, { petId, comment }) {
            const addedComment = await petService.addComment(petId, comment)
                // context.commit({type: 'addcomment', comment})
            return addedComment;
        },
        async addTreat(context, { petId }) {
            const addedTreat = await petService.addTreat(petId)
            console.log(addedTreat)
            // context.commit({type: 'addcomment', comment})
            return addedTreat;
        },
    },

}