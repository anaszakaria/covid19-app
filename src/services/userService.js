import axios from 'axios'
const USER_API = process.env.VUE_APP_USER_API
const token = 'temp-token'

const userReadAPIOptions = {
    method: 'GET',
    headers: {
        Authorization: `Bearer  ${token}`
    }
}

const userUpdateOptions = {
    method: 'PATCH',
    headers: {
        Authorization: `Bearer  ${token}`
    }
}

export const userService = {
    async signUp(payload) {
        return axios.post(`${USER_API}/auth/register`, payload)
    },
    async signIn(payload) {
        return axios.post(`${USER_API}/auth/login`, payload)
    },
    async signOut() {},
    async getUserList() {
        return axios
            .request({
                ...userReadAPIOptions,
                url: `${USER_API}/user/list`
            })
            .then((response) => {
                return response.data.user
            })
    },
    async updateUserSavedCountry(userId, payload) {
        return axios
            .request({
                ...userUpdateOptions,
                data: payload,
                url: `${USER_API}/user/savedcountry/${userId}`
            })
            .then((response) => {
                return response.data
            })
    },
    async updateUserSelectedCountries(userId, payload) {
        return axios
            .request({
                ...userUpdateOptions,
                data: payload,
                url: `${USER_API}/user/selectedcountries/${userId}`
            })
            .then((response) => {
                return response.data
            })
    }
}
