import { httpService } from './http-service.js';
import { utilService } from './util-service.js';

export const userService = {
    getEmptyUser,
    signUp,
    login,
    logout,
    getUsers,
    getById,
    remove,
    update,
    addReview
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
    // const user = await httpService.post('auth/login', userCred)
    // For front end test only //
   return getUsers().then(users => {
        var user = users.find(user => {
            return user.userName === userCred.userName;
        });

        if (!user) {
            throw Error('login failed')
        }

        return _handleLogin(user)
    });
}

async function signUp(userCred) {
    // const user = await httpService.post('auth/signup', userCred);
    const user = await httpService.post('users', userCred);
    return _handleLogin(user)
}
async function logout() {
    // await httpService.post('auth/logout');
    sessionStorage.clear();
}

//For frontend test only - relace by backend
async function addReview(userId, review) {
    review._id = utilService.makeId();
    var user = await getById(userId);
    user.ownerData.reviews.push(review);
    console.log(user.ownerData.reviews)
    console.log(user)
    update(user);
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

