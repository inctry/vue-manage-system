import Vue from "vue";
import VueRouter from "vue-router";

//needed to study about this paragraph below !!!!

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
} 
const routes = [
    {
        path: '/',
        component: () => import('@/views/Main.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../views/Home/Home.vue')
            },

            {
                path: 'video',
                name: 'video',
                component: () => import('../views/VideoManage/VideoManage.vue')
            },

            {
                path: 'user',
                name: 'user',
                component: () => import('../views/UserManage/UserManage.vue')
            },

            {
                path: 'page1',
                name: 'page1',
                component: () => import('../views/other/Pageone.vue')
            },

            {
                path: 'page2',
                name: 'page2',
                component: () => import('../views/other/Pagetwo.vue')
            }

        ]
    }
];

const router = new VueRouter({
  routes
});

export default router;
