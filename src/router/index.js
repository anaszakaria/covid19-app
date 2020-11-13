import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
    // USER
    {
        path: '/signin',
        name: 'Sign In',
        component: () => import('@/views/User/SignIn'),
        meta: { showFooter: true }
    },
    {
        path: '/signup',
        name: 'Sign Up',
        component: () => import('@/views/User/SignUp')
    },
    {
        path: '/profile',
        name: 'User Profile',
        component: () => import('@/views/User/Profile')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/mapviewer',
        name: 'MapViewer',
        component: () => import('@/views/MapViewer.vue')
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
