import { httpService } from './http-service.js';

export const userService = {
    getEmptyUser,
    signUp,
    login,
    logout,
    getUsers,
    getById,
    remove,
    update,
}

function getEmptyUser() {
    var user = {
        fullName: '',
        userName: '',
        password: '',
        email: '',
        tel: 0,
        dateOfBirth: '',
        ownPet: false,
        ownedPet: false,
        familyStatus: '',
        houseStatus: ''
    }
    return user;
}
function getUsers() {
    return httpService.get('user');
}

function getById(userId) {
    return httpService.get(`user/${userId}`);
}

function remove(userId) {
    return httpService.delete(`user/${userId}`);
}

function update(user) {
    return httpService.put(`user/${user._id}`, user);
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}

async function signUp(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

