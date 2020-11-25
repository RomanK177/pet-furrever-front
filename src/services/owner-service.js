export const ownerService = {
    getEmptyOwner,
    // signUp
}

function getEmptyOwner() {
    var user = {
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
    return user;
}

// async function signUp(user) {
// console.log(user)
// }