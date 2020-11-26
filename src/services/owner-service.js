import { httpService } from './http-service.js';

export const ownerService = {
    getEmptyOwner,
    login,
    signUp,
    logout,
    getOwnerById
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
        imgUrlProfile: '',
        imgUrl: '',
    }
    return owner;
}

function getOwnerById(ownerId){
    return httpService.get(`owner/${ownerId}`);
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
    sessionStorage.setItem('owner', JSON.stringify(user))
    return user;
}
