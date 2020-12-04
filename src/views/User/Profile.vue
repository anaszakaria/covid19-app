<template>
    <v-container fluid>
        <h3>User Profile</h3>
        <v-row class="ma-0">
            <v-col sm="12">
                <v-card outlined elevation="1">
                    <v-list dense subheader>
                        <v-subheader class="subtitle-2">Dashboard Widget</v-subheader>
                        <v-list-item v-for="(widget, index) in dashboardWidget" :key="index">
                            <v-list-item-action>
                                <v-switch v-model="widget.enabled"></v-switch>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title class="subtitle-2 font-weight-regular">{{
                                    widget.title
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
            <v-col sm="12">
                <v-card outlined elevation="1">
                    <v-list dense subheader>
                        <v-subheader class="subtitle-2">Country Statistics Widget</v-subheader>
                        <v-list-item v-for="(widget, index) in countryStatisticWidget" :key="index">
                            <v-list-item-action>
                                <v-switch v-model="widget.enabled"></v-switch>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title class="subtitle-2 font-weight-regular">{{
                                    widget.title
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
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
