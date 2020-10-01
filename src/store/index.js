import Vue from 'vue'
import Vuex from 'vuex'

// eslint-disable-next-line import/no-cycle
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        shared
    }
})
