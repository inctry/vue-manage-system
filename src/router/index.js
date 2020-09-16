import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//needed to study about this paragraph below !!!!

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
} 

const routes = [

    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/Login.vue')
    }
];



const router = new VueRouter({
  routes
});

export default router;
