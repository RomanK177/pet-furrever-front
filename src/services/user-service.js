export const userService = {
    getEmptyUser,
    // signUp
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

// async function signUp(user) {
// console.log(user)
// }