import { userService } from '../../services/user-service.js';

export const userStore = {
    state: {
        loggedInUser: null,
        users: []
    },
    getters: {
        getLoggedInUser(state) {
            return state.loggedInUser;
        },
        getUsers(state) {
            return state.users;
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedInUser = user;
        },
        saveUser(state, { user }) {
            state.users.unshift(user)
        },
        updateUser(state, { user }) {
            const idx = state.users.findIndex(currUser => currUser._id === user._id)
            state.users.splice(idx, 1, user)
        },

    },
    actions: {
        setUser({ commit }, { user }) {
            commit({
                type: 'setUser',
                user
            })
        },
        async signUp({ commit }, { userCred }) {
            const user = await userService.signUp(userCred);
            commit({
                type: 'setUser',
                user
            });
            return user;
        },
        async login({ commit }, { userCred }) {
            const user = await userService.login(userCred);
            commit({
                type: 'setUser',
                user
            });
            return user;
        },
        async logout({ commit }) {
            await userService.logout();
            commit({
                type: 'setUser',
                user: null
            })
        },
        async getUserById({ commit }, { userId }) {
            const user = await userService.getById(userId);
            return user;
        },
        async updateUser({ commit }, { savedUser }) {
            const user = await userService.update(savedUser);
            commit({
                type: 'setUser',
                user: savedUser
            })
            return user;
        },
        async updateFavorites({ commit }, { isFavorite, petId }) {
            const user = await userService.updateFavorites(isFavorite, petId);
            commit({ type: 'setUser', user });
            return user;
        },
        // async updateFavorites({ commit }, { isFavorite ,petId }) {
        //     console.log(isFavorite, 'store isfav')
        //     const user = await userService.updateFavorites(isFavorite, petId);
        //     commit({ type: 'updateUser', user });
        //     return user;
        // },
        async saveUser({ commit }, { user }) {
            const action = (user._id) ? 'updateUser' : 'saveUser';
            const savedUser = await userService.update(user)
            commit({ type: action, user: savedUser });
            return savedUser;
        },
        async addReview({ commit }, { ownerId, review }) {
            const user = await userService.addReview(ownerId, review);
            // commit({ type: 'updateUser', user });
            return user;
        },
    },
}