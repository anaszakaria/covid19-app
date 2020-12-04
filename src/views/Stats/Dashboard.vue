<template>
    <v-container fluid>
        <v-row v-if="dashboardWidget[0].enabled" class="ma-0">
            <v-col v-for="(status, index) in statusWidgetData" :key="index" xs="6" md="2">
                <StatusWidget
                    :widgetColor="status.widgetColor"
                    :total="status.total"
                    :title="status.title"
                    :icon="status.icon"
                    :blackFont="status.blackFont"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
        </v-row>
        <v-row class="ma-0">
            <!-- DATA COMPARISON - BY COUNTRY -->
            <!-- <v-col xs="12" md="6">
                <v-card outlined tile>
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <HighStockMultiLineChart
                        :activeCases="activeCases"
                        :recovered="recovered"
                        :deaths="deaths"
                        :title="'Data Comparison'"
                        :subTitle="'Data Comparison Between Active, Recovered and Death Cases'"
                    />
                </v-card>
            </v-col> -->
            <!-- DATA COMPARISON - ACTIVE, RECOVERED, DEATHS -->
            <v-col v-if="dashboardWidget[1].enabled" xs="12" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <HighStockMultiLineChart
                        :activeCases="activeCases"
                        :recovered="recovered"
                        :deaths="deaths"
                        :title="'Data Comparison'"
                        :subTitle="'Data Comparison Between Active, Recovered and Death Cases'"
                    />
                </v-card>
            </v-col>
            <!-- TOTAL CASES -->
            <v-col v-if="dashboardWidget[2].enabled" xs="12" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <HighStockLineChart
                        :data="totalCases"
                        :title="'Confirmed Cases'"
                        :subTitle="'Total Confirmed COVID-19 Cases Worldwide'"
                        :lineColor="'#FF9800'"
                    />
                </v-card>
            </v-col>
            <!-- PIE CHART COMPARISON - ACTIVE, RECOVERED and DEATHS -->
            <v-col v-if="dashboardWidget[3].enabled" xs="12" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoadingSummary" indeterminate></v-progress-linear>
                    <PieChart
                        :data="pieChartSeriesData"
                        :title="'Data Comparison'"
                        :subTitle="'Percentage of Active, Recovered and Death Cases'"
                        :lineColor="'#212121'"
                    />
                </v-card>
            </v-col>
            <!-- ACTIVE CASES -->
            <v-col v-if="dashboardWidget[4].enabled" xs="12" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <HighStockLineChart
                        :data="activeCases"
                        :title="'Active Cases'"
                        :subTitle="'Total COVID-19 Active Cases Worldwide'"
                        :lineColor="'#212121'"
                    />
                </v-card>
            </v-col>
            <!-- RECOVERED -->
            <v-col v-if="dashboardWidget[5].enabled" xs="12" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <HighStockLineChart
                        :data="recovered"
                        :title="'Cases Recovered'"
                        :subTitle="'Total COVID-19 Recovered Cases Worldwide'"
                        :lineColor="'#4CAF50'"
                    />
                </v-card>
            </v-col>
            <!-- DEATHS -->
            <v-col v-if="dashboardWidget[6].enabled" xs="12" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <HighStockLineChart
                        :data="deaths"
                        :title="'Death Cases'"
                        :subTitle="'Total COVID-19 Death Cases Worldwide'"
                        :lineColor="'#E53935'"
                    />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getUnixTime } from 'date-fns'
import { statisticService } from '@/services/statisticService'
import HighStockLineChart from '@/components/Charts/HighStockLineChart'
import HighStockMultiLineChart from '@/components/Charts/HighStockMultiLineChart'
import PieChart from '@/components/Charts/PieChart'
import StatusWidget from '@/components/Widgets/StatusWidget'

export default {
    components: {
        HighStockLineChart,
        HighStockMultiLineChart,
        PieChart,
        StatusWidget
    },
    data() {
        return {
            isLoading: false,
            isLoadingSummary: false,
            summary: {},
            statusParams: [
                'total_cases',
                'active_cases',
                'total_recovered',
                'total_deaths',
                'serious_critical',
                'total_tests'
            ],
            statusWidgetData: [
                { title: 'Confirmed', widgetColor: 'orange', total: 0, icon: 'mdi-medical-bag' },
                { title: 'Active', widgetColor: 'darkgrey', total: 0, icon: 'mdi-pill' },
                { title: 'Recovered', widgetColor: 'green', total: 0, icon: 'mdi-plus-circle' },
                { title: 'Deaths', widgetColor: 'red darken-1', total: 0, icon: 'mdi-minus-circle' },
                { title: 'Critical', widgetColor: 'yellow', total: 0, icon: 'mdi-hospital-building', blackFont: true },
                { title: 'Tested', widgetColor: 'blue', total: 0, icon: 'mdi-test-tube' }
            ],
            pieChartSeriesData: [
                { name: 'Active', y: null, color: '#212121' },
                { name: 'Recovered', y: null, color: '#4CAF50' },
                { name: 'Deaths', y: null, color: '#E53935' }
            ],
            trendingData: [],
            activeCases: [],
            critical: [],
            deaths: [],
            recovered: [],
            tested: [],
            totalCases: [],
            dashboardWidget: []
        }
    },
    methods: {
        formatHighstockData(array, category) {
            return array
                .map((item) => {
                    const timestamp = getUnixTime(new Date(item.eventDate)) * 1000
                    if (item[category]) {
                        return [timestamp, item[category]]
                    }
                    return [timestamp, null]
                })
                .sort((a, b) => {
                    return a[0] - b[0]
                })
        },
        setPieChartComparisonData(summary) {
            const [active, recovered, deaths] = this.pieChartSeriesData
            active.y = summary.active_cases
            recovered.y = summary.recovered
            deaths.y = summary.deaths
        },
        setStatusWidgetData(summary) {
            const [confirmed, active, recovered, deaths, critical, tested] = this.statusWidgetData
            confirmed.total = summary.total_cases
            active.total = summary.active_cases
            recovered.total = summary.recovered
            deaths.total = summary.deaths
            critical.total = summary.critical
            tested.total = summary.tested
        },
        async getGlobalTrendingSummary() {
            this.isLoading = true
            try {
                this.trendingData = await statisticService.getGlobalTrendingSummary()
                this.activeCases = this.formatHighstockData(this.trendingData, 'active_cases')
                this.critical = this.formatHighstockData(this.trendingData, 'critical')
                this.deaths = this.formatHighstockData(this.trendingData, 'deaths')
                this.recovered = this.formatHighstockData(this.trendingData, 'recovered')
                this.tested = this.formatHighstockData(this.trendingData, 'tested')
                this.totalCases = this.formatHighstockData(this.trendingData, 'total_cases')
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoading = false
            }
        },
        async getGlobalLatestSummary() {
            this.isLoadingSummary = true
            try {
                this.summary = await statisticService.getGlobalLatestSummary()
                this.setPieChartComparisonData(this.summary)
                this.setStatusWidgetData(this.summary)
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoadingSummary = false
            }
        }
    },
    computed: {},
    created() {
        this.getGlobalTrendingSummary()
        this.getGlobalLatestSummary()
        this.dashboardWidget = this.$store.getters.dashboardWidget
    },
    mounted() {}
}
</script>
