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
        async loadUsers(context) {
            try {
                const users = await userService.getUsers();
                context.commit({ type: 'setUsers', users });
                return users;
            } catch (err) {
                console.error('Cannot send message.', err)
            }
        },
        async signUp({ commit }, { userCred }) {
            try {
                const user = await userService.signUp(userCred);
                commit({
                    type: 'setUser',
                    user
                });
                return user;
            } catch (err) {
                console.error('Cannot send message.', err)
            }
        },
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred);
                commit({
                    type: 'setUser',
                    user
                });
                return user;
            } catch (err) {
                console.error('Cannot send message.', err)
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout();
                commit({
                    type: 'setUser',
                    user: null
                })
            } catch (err) {
                console.error('Cannot send message.', err)
            }
        },
        async getUserById({ commit }, { userId }) {
            try {
                const user = await userService.getById(userId);
                return user;
            } catch (err) {
                console.error('Cannot send message.', err)
            }
        },
        async updateUser({ commit }, { savedUser }) {
            try {
                const user = await userService.update(savedUser);
                commit({
                    type: 'updateUser',
                    user: savedUser
                })
                return user;
            } catch (err) {
                console.error('Cannot send message.', err)
            }
        },
        async updateFavorites({ commit }, { isFavorite, petId }) {
            try {
                const user = await userService.updateFavorites(isFavorite, petId);
                commit({ type: 'updateUser', user });
                return user;
            } catch (err) {
                console.error('Cannot send message.', err)
            }
        },
        // async updateFavorites({ commit }, { isFavorite ,petId }) {
        //     console.log(isFavorite, 'store isfav')
        //     const user = await userService.updateFavorites(isFavorite, petId);
        //     commit({ type: 'updateUser', user });
        //     return user;
        // },
        async saveUser({ commit }, { user }) {
            try {
                const action = (user._id) ? 'updateUser' : 'saveUser';
                const savedUser = await userService.update(user)
                commit({ type: action, user: savedUser });
                return savedUser;
            } catch (err) {
                console.error('Cannot send message.', err)
            }
        },
        async addReview({ commit }, { ownerId, review }) {
            try {
                const reviews = await userService.addReview(ownerId, review);
                const owner = await userService.getById(ownerId);
                commit({ type: 'updateUser', user: owner });
                return reviews;
            } catch (err) {
                console.error('Cannot send message.', err)
            }
        },
    },
}