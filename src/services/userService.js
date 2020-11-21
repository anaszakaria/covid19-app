import axios from 'axios'

export const userService = {
    signUp(payload) {
        return axios.post(`${process.env.VUE_APP_USER_API}/auth/register`, payload)
    },
    signIn(payload) {
        return axios.post(`${process.env.VUE_APP_USER_API}/auth/login`, payload)
    },
    signOut() {}
}
