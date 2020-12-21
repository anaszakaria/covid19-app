import axios from 'axios'
const USER_API = process.env.VUE_APP_USER_API
const token = 'temp-token'

const userAPIOptions = {
    method: 'GET',
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
                ...userAPIOptions,
                url: `${USER_API}/user/list`
            })
            .then((response) => {
                return response.data.user
            })
    }
}
