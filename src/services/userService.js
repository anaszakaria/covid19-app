import axios from 'axios'
const USER_API = process.env.VUE_APP_USER_API

export const userService = {
    signUp(payload) {
        return axios.post(`${USER_API}/auth/register`, payload)
    },
    signIn(payload) {
        return axios.post(`${USER_API}/auth/login`, payload)
    },
    signOut() {}
}
