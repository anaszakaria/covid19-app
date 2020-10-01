/* eslint-disable */
export default {
    methods: {
        numbersOnly(evt) {
            if (!isNaN(evt.key) || evt.key === 'Backspace' || evt.key === '.') {
                return true
            } else {
                evt.preventDefault()
            }
        }
    }
}
