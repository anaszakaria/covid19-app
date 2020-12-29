export default {
    state: {
        widget: {
            dashboardWidget: [
                { title: 'Summary', enabled: true },
                { title: 'Top 10 COVID-19 Confirmed Cases Worldwide', enabled: true },
                { title: 'Top 10 COVID-19 Death Cases Worldwide', enabled: true },
                { title: 'Data Comparison Between Active, Recovered and Death Cases', enabled: true },
                { title: 'Percentage of Active, Recovered and Death Cases', enabled: true },
                { title: 'Confirmed Cases', enabled: true },
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
        SET_WIDGET: (state, payload) => (state.widget = payload),
        SET_DASHBOARD_WIDGET: (state, payload) => (state.widget.dashboardWidget = payload),
        SET_COUNTRY_STATISTIC_WIDGET: (state, payload) => (state.widget.countryStatisticWidget = payload),
        RESET_WIDGET: (state, payload) => (state.widget = payload)
    },
    actions: {
        setWidget({ commit }, payload) {
            commit('SET_WIDGET', payload)
        },
        setDashboardWidget({ commit }, payload) {
            commit('SET_DASHBOARD_WIDGET', payload)
        },
        setCountryStatisticWidget({ commit }, payload) {
            commit('SET_COUNTRY_STATISTIC_WIDGET', payload)
        },
        resetWidget({ commit }, payload) {
            commit('RESET_WIDGET', payload)
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
