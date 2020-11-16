import Vue from 'vue'
import Highcharts from 'highcharts'
import VueHighcharts from 'vue-highcharts'
import moment from 'moment'
import axios from 'axios'

import appMixins from '@/mixins/globalMixins' // import mixins
import Modal from '@/components/Global/Modal' // import shared components
// import global filters
import Snippet from './filters/snippet'
import UpperCaseFirstLetter from './filters/upperCaseFirstLetter'

import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false

Vue.mixin(appMixins) // init global mixins
Vue.component('app-modal', Modal) // register global component
// init global filters
Vue.filter('snippet', Snippet)
Vue.filter('upperCaseFirstLetter', UpperCaseFirstLetter)
Vue.filter('toUpperCase', (value) => value.toUpperCase())
Vue.filter('convertNullToDash', (value) => {
    if (value !== 'null') return value
    return '-'
})
Vue.filter('numberWithCommas', (value) => {
    if (value !== 'null') return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return '-'
})
Vue.filter('toMoney', (value) => {
    const adjusted = value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    return adjusted
})

export const EventBus = new Vue() // create event bus

// init middleware
Vue.use(VueHighcharts, { Highcharts })
Vue.prototype.moment = moment

// global custom directives
Vue.directive('focus', {
    inserted: (el) => {
        el.focus()
    }
})

// axios interceptors - refresh token
let isRefreshing = false

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const {
            config,
            response: { status, data }
        } = error

        if (status === 401 && data.message === 'jwt expired') {
            if (!isRefreshing) {
                isRefreshing = true
                store
                    .dispatch('refreshToken')
                    .then(({ status }) => {
                        if (status === 200 || status === 204) {
                            isRefreshing = false
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }
)

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
    created() {
        this.$store.dispatch('checkUserLocalStorage')
    }
}).$mount('#app')
