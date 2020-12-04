import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import widget from './widget'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        widget,
        shared
    }
})
