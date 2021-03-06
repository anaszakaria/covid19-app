import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        dark: false,
        default: 'light',
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: '#0D47A1',
                secondary: '#424242',
                accent: '#D81B60',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
            dark: {
                primary: '#ee44aa',
                secondary: '#424242',
                accent: '#FF4081',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00'
            }
        }
    }
})
