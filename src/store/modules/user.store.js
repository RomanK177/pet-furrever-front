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
        }
    },
    actions: {
        setUser({ commit}, { user} ) {
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
            return user;
        },
        async addReview({ commit }, { ownerId, review }) {
            const savedReview = await userService.addReview(ownerId, review);
            return savedReview
        }
    },
}
