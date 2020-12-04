<template>
    <v-container fluid>
        <h3>User Profile</h3>
        <v-row class="ma-0">
            <v-col sm="12">
                <v-card outlined elevation="1">
                    <WidgetList :widgetSection="'Dashboard Widget'" :widgetList="dashboardWidget"></WidgetList>
                </v-card>
            </v-col>
            <v-col sm="12">
                <v-card outlined elevation="1">
                    <WidgetList
                        :widgetSection="'Country Statistic Widget'"
                        :widgetList="countryStatisticWidget"
                    ></WidgetList>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import WidgetList from '@/components/Widgets/WidgetList'

export default {
    components: {
        WidgetList
    },
    data() {
        return {
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
                { title: 'Cases Per Million Pie Chart', enabled: true },
                { title: 'Deaths Per Million Pie Chart', enabled: true },
                { title: 'Tests Per Million Pie Chart', enabled: true },
                { title: 'Trending Data Line Chart', enabled: true }
            ]
        }
    },
    watch: {
        dashboardWidget: {
            handler(value) {
                console.log(value)
            },
            deep: true
        },
        countryStatisticWidget: {
            handler(value) {
                console.log(value)
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.v-label {
    left: 12px !important;
}
</style>
