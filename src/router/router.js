import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '../views/home-page.vue';
import signup from '../views/signup.vue';
import petApp from '../views/pet/pet-app.vue';
import petDetails from '../views/pet/pet-details.vue';
import petEdit from '../views/pet/pet-edit.vue';
import userDetails from '../views/user/user-details.vue';
import userEdit from '../views/user/user-edit.vue';
import adoptionMessages from '../views/user/adoption-messages.vue'



Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: homePage
    },
    {
        path: '/signup',
        component: signup
    },
    {
        path: '/pet',
        component: petApp
    },
    {
        path: '/pet/edit/:id?',
        component: petEdit
    },
    {
        path: '/pet/:id',
        component: petDetails
    },
    {
        path: '/user/edit/:id',
        component: userEdit
    },
    {
        path: '/user/:id',
        component: userDetails
    },
    {
        path: '/adoption/:id',
        component: adoptionMessages
    }



    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    routes
})

export default router