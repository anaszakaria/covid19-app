export default {
    state: {
        widget: {
            dashboardWidget: [
                { title: 'Summary', enabled: true },
                { title: 'Data Comparison Between Active, Recovered and Death Cases', enabled: true },
                { title: 'Confirmed Cases', enabled: true },
                { title: 'Percentage of Active, Recovered and Death Cases', enabled: true },
                { title: 'Active Cases', enabled: true },
                { title: 'Cases Recovered', enabled: true },
                { title: 'Death Cases', enabled: true }
            ],
            countryStatisticWidget: [
                { title: 'Summary', enabled: true },
                { title: 'Daily Confirmed', enabled: true },
                { title: 'Daily Deaths', enabled: true },
                { title: 'Cases Per Million Pie Chart', enabled: true },
                { title: 'Deaths Per Million Pie Chart', enabled: true },
                { title: 'Tests Per Million Pie Chart', enabled: true },
                { title: 'Trending Data Line Chart', enabled: true }
            ]
        }
    },
    mutations: {
        setWidget(state, payload) {
            state.widget = payload
        },
        setDashboardWidget(state, payload) {
            state.widget.dashboardWidget = payload
        },
        setCountryStatisticWidget(state, payload) {
            state.widget.countryStatisticWidget = payload
        }
    },
    actions: {
        setWidget({ commit }, payload) {
            commit('setWidget', payload)
        },
        setDashboardWidget({ commit }, payload) {
            commit('setDashboardWidget', payload)
        },
        setCountryStatisticWidget({ commit }, payload) {
            commit('setCountryStatisticWidget', payload)
        }
    },
    getters: {
        widget(state) {
            return state.widget
        },
        dashboardWidget(state) {
            return state.widget.dashboardWidget
        },
        countryStatisticWidget(state) {
            return state.widget.countryStatisticWidget
        }
    }
}
