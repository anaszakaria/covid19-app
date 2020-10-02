/* eslint-disable */
export default {
    data() {
        return {}
    },
    methods: {
        gotoPage(url) {
            this.$router.push({ path: url })
        },
        getImgURL(img) {
            return require('img/' + img)
        },
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
        userTeam() {
            return this.$store.getters.user.userAccesses.team
        },
        userIsAuthenticated() {
            return true
            // return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userCanPerformAction() {
            return this.$store.getters.userPermission === 'General User' ? false : true
        }
    }
}
