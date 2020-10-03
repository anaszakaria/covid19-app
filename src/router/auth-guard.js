// eslint-disable-next-line import/no-cycle
import store from '@/store'

export default (to, from, next) => {
    store.dispatch('checkUserLocalStorage')
    if (store.getters.user) {
        next()
    } else {
        next('/signin')
    }
}
