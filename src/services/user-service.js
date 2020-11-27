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

function getEmptyUser(type) {
    return type === 'adopter' ? _getEmptyAdopter() : _getEmptyOwner();
}

function _getCommonUserFields() {
    return {
        fullName: '',
        userName: '',
        password: '',
        email: '',
        tel: '0',
        imgUrlProfile: '',
    }
}

function _getEmptyAdopter() {
    var user = {
        ..._getCommonUserFields(),
        userType: 'adopter',
        adopterData: {
            dateOfBirth: '',
            ownPet: false,
            ownedPet: false,
            familyStatus: '',
            houseStatus: ''
        }
    }
    return user;
}

function _getEmptyOwner() {
    var owner = {
        ..._getCommonUserFields(),
        userType: 'owner',
        ownerData: {
            activityYears: '0',
            title: '',
            desc: '',
            tags: [],
            imgUrls: [],
            location: {
                name: '',
                lat: '',
                lang: ''
            },
            reviews: [
                {
                    txt: '',
                    rate: 5,
                    by: {
                        userId: '',
                        fullName: '',
                        imgUrl: ''
                    }
                }
            ]
        }
    }
    return owner;
}

function getUsers() {
    return httpService.get('users');
}

function getById(userId) {
    return httpService.get(`users/${userId}`);
}

function remove(userId) {
    return httpService.delete(`users/${userId}`);
}

function update(user) {
    return httpService.put(`users/${user._id}`, user);
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

