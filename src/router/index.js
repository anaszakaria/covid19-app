import Vue from 'vue'
import VueRouter from 'vue-router'
// import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue')
    },
    // TEST
    {
        path: '/test',
        name: 'Test Page',
        component: () => import('@/views/Test')
    },
    // UNIDENTIFIED PAGE REQUEST
    {
        path: '*',
        name: 'Error404',
        component: () => import('@/views/Error404.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
