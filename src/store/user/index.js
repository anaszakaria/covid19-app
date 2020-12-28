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
        setUser(state, payload) {
            state.user = payload
        },
        setAccessToken(state, payload) {
            state.accessToken = payload
        },
        setRefreshToken(state, payload) {
            state.refreshToken = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        },
        SET_SELECTED_COUNTRIES: (state, payload) => (state.selectedCountries = payload),
        SET_SAVED_COUNTRY: (state, payload) => (state.savedCountry = payload)
    },
    actions: {
        setUser({ commit }, payload) {
            commit('setUser', payload)
        },
        async setSelectedCountries({ commit }, payload) {
            commit('SET_SELECTED_COUNTRIES', payload)
        },
        async setSavedCountry({ commit }, payload) {
            commit('SET_SAVED_COUNTRY', payload)
        },
        async signUserUp({ commit, getters }, payload) {
            commit('setLoading', true)
            commit('clearError')
            try {
                await userService.signUp(payload)
                router.push('/signin')
            } catch (error) {
                commit('setError', error.response.data.error)
            } finally {
                commit('setLoading', false)
            }
        },
        async signUserIn({ commit, getters }, payload) {
            commit('setLoading', true)
            try {
                const response = await userService.signIn(payload)
                const newUser = response.data
                commit('setUser', newUser)
                commit('setAccessToken', newUser.accessToken)
                commit('setRefreshToken', newUser.refreshToken)
                localStorage.setItem('user', JSON.stringify(newUser))
                router.push('/')
            } catch (error) {
                commit('setError', error.response.data.error)
            } finally {
                commit('setLoading', false)
            }
        },
        signOut({ commit }) {
            localStorage.clear()
            commit('setUser', null)
            commit('setAccessToken', null)
            commit('setRefreshToken', null)
            commit('setError', null)
            router.push('/signin')
        },
        checkUserLocalStorage({ commit, getters }) {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                commit('setUser', user)
                commit('setAccessToken', user.accessToken)
                commit('setRefreshToken', user.refreshToken)
            }
        },
        clearError({ commit }) {
            commit('clearError')
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
            return state.savedCountry
        },
        selectedCountries(state) {
            return state.selectedCountries
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
