<template>
    <v-container fluid>
        <h4 class="font-weight-medium ml-3">App Settings</h4>
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
            dashboardWidget: this.$store.getters.dashboardWidget,
            countryStatisticWidget: this.$store.getters.countryStatisticWidget
        }
    },
    watch: {
        dashboardWidget: {
            handler(value) {
                this.$store.dispatch('setDashboardWidget', value)
            },
            deep: true
        },
        countryStatisticWidget: {
            handler(value) {
                this.$store.dispatch('setCountryStatisticWidget', value)
            },
            deep: true
        }
    },
    created() {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.v-label {
    left: 12px !important;
}
</style>
