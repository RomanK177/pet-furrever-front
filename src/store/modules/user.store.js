import { userService } from '../../services/user-service.js';

export const userStore = {
    state: {
        loggedInUser: null,
        users: []
    },
    getters: {
        getEmptyUser() {
            return userService.getEmptyUser();
        },
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
        async signup({ commit }, { userCred }) {
            const user = await userService.signup(userCred);
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
        async getUserById({commit}, {userId}){
            const user = await userService.getById(userId);
            return user;
        }
    },
}
