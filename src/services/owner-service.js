import { httpService } from './http-service.js';

export const ownerService = {
    getEmptyOwner,
    login,
    signUp,
    logout
}

function getEmptyOwner() {
    var owner = {
        name: '',
        userName: '',
        password: '',
        email: '',
        tel: 0,
        activityYears: 0,
        title: '',
        desc: '',
        tags: [],
        imgUrl: '',
    }
    return owner;
}

async function login(ownerCred) {
    const user = await httpService.post('auth/login', ownerCred)
    return _handleLogin(user)
}

async function signUp(ownerCred) {
    const user = await httpService.post('auth/signup', ownerCred)
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
