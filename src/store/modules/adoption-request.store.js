import { userService } from '../../services/user-service.js';

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export const userStore = {
    state: {
        adoptionRequests: [],
    },
    getters: {
        getAdoptionRequests(state) {
            return state.adoptionRequests;
        },
        // getUsers(state) {
        //     return state.users;
        // }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedInUser = user;
        },
        setAdoptionRequests(state, {adoptionRequests}){
            state.adoptionRequests = adoptionRequests
        }
    },
    actions: {
        async signUp({ commit }, { userCred }) {
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
        async getUserById({ commit }, { userId }) {
            const user = await userService.getById(userId);
            return user;
        },
        async updateUser({ commit }, { savedUser }) {
            const user = await userService.update(savedUser);
            return user;
        }
    },
}
