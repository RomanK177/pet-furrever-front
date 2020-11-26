import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '../views/home-page.vue';
import petApp from '../views/pet/pet-app.vue';
import petDetails from '../views/pet/pet-details.vue';
import petEdit from '../views/pet/pet-edit.vue';
import signup from '../views/signup.vue';
import ownerDetails from '../views/owner/owner-details.vue';
import ownerEdit from '../views/owner/owner-edit.vue';
import userDetails from '../views/user/user-details.vue'
import userEdit from '../views/user/user-edit.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homePage
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
    path: '/signup',
    component: signup
  },
  {
    path: '/owner/:id',
    component: ownerDetails
  },
  {
    path: '/owner/edit/:id',
    component: ownerEdit
  },
  {
    path: '/user/:id',
    component: userDetails
  },
  {
    path: '/user/edit:id',
    component: userEdit
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
