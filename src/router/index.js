import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
    // HOME
    {
        path: '/',
        redirect: '/dashboard'
    },
    // INFO AND Q&A
    {
        path: '/info-qna',
        name: 'Info and Q&A',
        component: () => import('@/views/CovidInfoQNA.vue')
    },
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
        path: '/settings',
        name: 'App Settings',
        component: () => import('@/views/Settings')
        // beforeEnter: AuthGuard
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/Admin/Admin.vue')
        // beforeEnter: AuthGuard
    },
    // MAPVIEWER
    {
        path: '/mapviewer',
        name: 'MapViewer',
        component: () => import('@/views/Map/MapViewer.vue')
    },
    {
        path: '/highmaps',
        name: 'HighMaps',
        component: () => import('@/views/Map/HighMaps.vue')
    },
    // STATISTICS
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Stats/Dashboard.vue')
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('@/views/Stats/Statistics.vue')
    },
    {
        path: '/countrystatistics/:country',
        name: 'CountryStatistics',
        component: () => import('@/views/Stats/CountryStatistics.vue')
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
