export const ownerService = {
    getEmptyOwner,
    // signUp
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

// async function signUp(user) {
// console.log(user)
// }