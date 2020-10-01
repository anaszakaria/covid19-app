import axios from 'axios'
import router from '@/router'

export default {
    state: {
        user: null,
        auth: {
            token: null
        },
        loading: false,
        error: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
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
                .post(`${process.env.VUE_APP_API_URL}/user/signup`, payload)
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
                .post(`${process.env.VUE_APP_API_URL}/user/login`, payload)
                .then((response) => {
                    commit('setLoading', false)
                    const newUser = response.data
                    commit('setUser', newUser)
                    // commit('setToken', response.data.token)
                    localStorage.setItem('user', JSON.stringify(newUser))
                    router.push('/')
                })
                .catch((error) => {
                    commit('setLoading', false)
                    commit('setError', error.response.data)
                })
        },
        signOut({ commit }) {
            localStorage.clear()
            commit('setUser', null)
            commit('setError', null)
            router.push('/signin')
        },
        checkUserLocalStorage({ commit, getters }) {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                commit('setUser', user)
                // commit('setToken', user.token)
            }
        },
        clearError({ commit }) {
            commit('clearError')
        },
        refreshToken({ state }) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${process.env.VUE_APP_API_URL}/token/refresh`, state.user.token, {
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
        token(state) {
            return state.user.token
        },
        error(state) {
            return state.error
        },
        loading(state) {
            return state.loading
        },
        userRole(state) {
            return state.user.userAccesses.role
        },
        userPosition(state) {
            return state.user.userInfos.position
        },
        userTeam(state) {
            return state.user.userAccesses.team
        },
        userPermission(state) {
            return state.user.userAccesses.permission
        }
    }
}
