<template>
    <v-container fluid>
        <h4 class="font-weight-medium ml-3">App Settings - Toggle Switch to Show or Hide Widget</h4>
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
import { userService } from '@/services/userService'
import WidgetList from '@/components/Widgets/WidgetList'

export default {
    components: {
        WidgetList
    },
    data() {
        return {
            dashboardWidget: this.$store.getters.dashboardWidget,
            countryStatisticWidget: this.$store.getters.countryStatisticWidget
        }
    },
    watch: {
        dashboardWidget: {
            async handler(value) {
                const widget = {
                    dashboardWidget: this.dashboardWidget,
                    countryStatisticWidget: this.countryStatisticWidget
                }
                if (this.$store.getters.user) {
                    try {
                        await userService.saveWidget(this.$store.getters.user.userId, widget)
                    } catch (error) {
                        console.log(error.response)
                    }
                }
                this.$store.dispatch('setDashboardWidget', value)
                localStorage.setItem('dashboardWidget', JSON.stringify(value))
            },
            deep: true
        },
        countryStatisticWidget: {
            async handler(value) {
                const widget = {
                    dashboardWidget: this.dashboardWidget,
                    countryStatisticWidget: this.countryStatisticWidget
                }
                if (this.$store.getters.user) {
                    try {
                        await userService.saveWidget(this.$store.getters.user.userId, widget)
                    } catch (error) {
                        console.log(error.response)
                    }
                }
                this.$store.dispatch('setCountryStatisticWidget', value)
                localStorage.setItem('countryStatisticWidget', JSON.stringify(value))
            },
            deep: true
        }
    },
    computed: {},
    created() {
        const dashboardWidgetList = JSON.parse(localStorage.getItem('dashboardWidget'))
        if (dashboardWidgetList) {
            this.dashboardWidget = dashboardWidgetList
        } else {
            this.dashboardWidget = this.$store.getters.dashboardWidget
        }
        const countryStatisticWidgetList = JSON.parse(localStorage.getItem('countryStatisticWidget'))
        if (countryStatisticWidgetList) {
            this.countryStatisticWidget = countryStatisticWidgetList
        } else {
            this.countryStatisticWidget = this.$store.getters.countryStatisticWidget
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
.v-label {
    left: 12px !important;
}
</style>
