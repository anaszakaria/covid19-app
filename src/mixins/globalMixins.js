/* eslint-disable */
export default {
    data() {
        return {}
    },
    methods: {
        gotoPage(url) {
            this.$router.push({ path: url })
        },
        // getImgURL(img) {
        //     return require('img/' + img)
        // },
        stringToList(val) {
            if (val == null) return ''
            return val.split('\n')
        },
        numberOnly(evt) {
            if (!isNaN(evt.key) || evt.key === 'Backspace' || evt.key === '.') {
                return true
            } else {
                evt.preventDefault()
            }
        },
        numberWithCommas(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        validate24HourFormat(evt, inputField) {
            if (inputField.length >= 5) {
                if (evt.key == 'Backspace' || evt.key === ':' || evt.keyCode === 37 || evt.keyCode === 39) {
                    return true
                }
                evt.preventDefault()
            } else if (!isNaN(evt.key) || evt.key === 'Backspace' || evt.key === ':') {
                return true
            } else {
                evt.preventDefault()
            }
        }
    },
    computed: {
        userIsAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsAdmin() {
            return this.$store.getters.userRole === 'Admin' ? true : false
        }
    }
}
