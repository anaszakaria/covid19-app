import axios from 'axios'
import router from '@/router'
import { userService } from '@/services/userService'

export default {
    state: {
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null,
        savedCountry: 'Malaysia',
        selectedCountries: []
    },
    mutations: {
        SET_USER: (state, payload) => (state.user = payload),
        SET_ACCESSTOKEN: (state, payload) => (state.accessToken = payload),
        SET_REFRESHTOKEN: (state, payload) => (state.refreshToken = payload),
        SET_LOADING: (state, payload) => (state.loading = payload),
        SET_ERROR: (state, payload) => (state.error = payload),
        CLEAR_ERROR: (state) => (state.error = null),
        SET_SELECTED_COUNTRIES: (state, payload) => (state.user.selectedCountries = payload),
        SET_SAVED_COUNTRY: (state, payload) => (state.user.savedCountry = payload)
    },
    actions: {
        setUser({ commit }, payload) {
            commit('SET_USER', payload)
        },
        async setSelectedCountries({ commit }, payload) {
            commit('SET_SELECTED_COUNTRIES', payload)
        },
        async setSavedCountry({ commit }, payload) {
            commit('SET_SAVED_COUNTRY', payload)
        },
        async signUserUp({ commit, getters }, payload) {
            commit('SET_LOADING', true)
            commit('CLEAR_ERROR')
            try {
                await userService.signUp(payload)
                router.push('/signin')
            } catch (error) {
                commit('SET_ERROR', error.response.data.error)
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async signUserIn({ commit, getters }, payload) {
            commit('SET_LOADING', true)
            try {
                const response = await userService.signIn(payload)
                const newUser = response.data
                commit('SET_USER', newUser)
                commit('SET_ACCESSTOKEN', newUser.accessToken)
                commit('SET_REFRESHTOKEN', newUser.refreshToken)
                commit('SET_WIDGET', newUser.widget)
                localStorage.setItem('user', JSON.stringify(newUser))
                localStorage.setItem('dashboardWidget', JSON.stringify(newUser.widget.dashboardWidget))
                localStorage.setItem('countryStatisticWidget', JSON.stringify(newUser.widget.countryStatisticWidget))
                router.push('/')
            } catch (error) {
                commit('SET_ERROR', error.response.data.error)
            } finally {
                commit('SET_LOADING', false)
            }
        },
        signOut({ commit, getters }) {
            localStorage.clear()
            commit('SET_USER', null)
            commit('SET_ACCESSTOKEN', null)
            commit('SET_REFRESHTOKEN', null)
            commit('SET_ERROR', null)
            const widget = getters.widget
            widget.dashboardWidget.forEach((item) => (item.enabled = true))
            widget.countryStatisticWidget.forEach((item) => (item.enabled = true))
            commit('RESET_WIDGET', widget)
            localStorage.setItem('dashboardWidget', JSON.stringify(widget.dashboardWidget))
            localStorage.setItem('countryStatisticWidget', JSON.stringify(widget.countryStatisticWidget))
            router.push('/signin')
        },
        checkUserLocalStorage({ commit, getters }) {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                commit('SET_USER', user)
                commit('SET_ACCESSTOKEN', user.accessToken)
                commit('SET_REFRESHTOKEN', user.refreshToken)
            }
        },
        clearError({ commit }) {
            commit('CLEAR_ERROR')
        },
        refreshToken({ state }) {
            console.log('Refresh Token')
            return new Promise((resolve, reject) => {
                axios
                    .post(`${process.env.VUE_APP_USER_API}/auth/refresh-token`, state.user.refreshToken, {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.user.accessToken}`
                        }
                    })
                    .then((response) => {
                        // update token on user state
                        // update token on localstorage
                        resolve(response)
                    })
                    .catch((error) => {
                        // set user on state to null
                        // clear local storage
                        // goto login page
                        reject(error.response)
                    })
            })
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        savedCountry(state) {
            return state.user.savedCountry
        },
        selectedCountries(state) {
            return state.user.selectedCountries
        },
        accessToken(state) {
            return state.accessToken
        },
        refreshToken(state) {
            return state.refreshToken
        },
        error(state) {
            return state.error
        },
        loading(state) {
            return state.loading
        },
        userRoles(state) {
            return state.user.roles
        },
        userPermission(state) {
            return state.user.permission
        }
    }
}
