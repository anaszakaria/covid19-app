import axios from 'axios'
import router from '@/router'

export default {
    state: {
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null
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
        }
    },
    actions: {
        setUser({ commit }, payload) {
            commit('setUser', payload)
        },
        signUserUp({ commit, getters }, payload) {
            commit('setLoading', true)
            commit('clearError')
            axios
                .post(`${process.env.VUE_APP_USER_API}/auth/signup`, payload)
                .then((response) => {
                    commit('setLoading', false)
                    router.push('/signin')
                })
                .catch((error) => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error.response.data)
                })
        },
        signUserIn({ commit, getters }, payload) {
            commit('setLoading', true)
            axios
                .post(`${process.env.VUE_APP_USER_API}/auth/login`, payload)
                .then((response) => {
                    commit('setLoading', false)
                    const newUser = response.data
                    commit('setUser', newUser)
                    commit('setAccessToken', newUser.accessToken)
                    commit('setRefreshToken', newUser.refreshToken)
                    localStorage.setItem('user', JSON.stringify(newUser))
                    router.push('/')
                })
                .catch((error) => {
                    console.log(error)
                    commit('setLoading', false)
                    commit('setError', error.response.data)
                })
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
            return new Promise((resolve, reject) => {
                axios
                    .post(`${process.env.VUE_APP_USER_API}/auth/refresh-token`, state.user.token, {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.user.token}`
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
                        reject(error)
                    })
            })
        }
    },
    getters: {
        user(state) {
            return state.user
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
