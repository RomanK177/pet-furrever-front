import { petService } from '../../services/pet-service.js';

export const petStore = {
    strict: true,
    state: {
        pets: [],
        comments: [],
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
        commentsForDisplay(state){
            console.log('getter comments', state.comments)
            return state.comments
            
        }
        
    },
    mutations: {
        setPets(state, { pets }) {
            state.pets = pets
        },
        setComments(state, {comments}){
            state.comments = comments
        },
        addComments(state, {comment}){
            state.comments.push(comment)
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
        async loadComments({commit}){
            const pets = await petService.query()
            console.log('pets from loadcomments', pets)
            const comments = pets.comments
            console.log('loadComments', comments)
            commit({ type: 'setComments', comments})

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
        getEmpty() {
            return petService.getEmptyPet()
        },
        async addComment({ commit }, { petId, comment}) {
            const addedComment = await petService.addComment(petId, comment);
            // commit({ type: 'setComments', comment: addedComment })
            return addedComment
        }
       
    },

}