import { userService } from '../../services/user-service.js';

export const userStore = {
    state: {
    },
    getters: {
        getEmptyUser() {
            return userService.getEmptyUser();
        },
    },
    mutations: {
    },
    actions: {
    },
}
