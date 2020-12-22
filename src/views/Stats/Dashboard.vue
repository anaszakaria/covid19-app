<template>
    <v-container fluid>
        <h4 class="font-weight-medium ml-3">COVID-19 Worldwide Latest Summary</h4>
        <v-row v-if="dashboardWidget[0].enabled" class="ma-0">
            <v-col cols="12" v-for="(status, index) in statusWidgetData" :key="index" xs="12" sm="4" md="2">
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
            <!-- TOP 10 CASES -->
            <v-col cols="12" v-if="dashboardWidget[1].enabled" xs="12" sm="6" md="6">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoadingTopTenData" indeterminate></v-progress-linear>
                    <BarChart
                        :data="top10ConfirmedData.series"
                        :seriesName="'Total Confirmed'"
                        :categories="top10ConfirmedData.categories"
                        :title="'Top 10 COVID-19 Confirmed Cases Worldwide'"
                        :subTitle="'Top 10 Cumulative Number of COVID-19 Confirmed Cases Worldwide'"
                        :lineColor="'#FF9800'"
                    />
                </v-card>
            </v-col>
            <v-col cols="12" v-if="dashboardWidget[2].enabled" xs="12" sm="6" md="6">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoadingTopTenData" indeterminate></v-progress-linear>
                    <BarChart
                        :data="top10DeathsData.series"
                        :seriesName="'Total Deaths'"
                        :categories="top10DeathsData.categories"
                        :title="'Top 10 COVID-19 Death Cases Worldwide'"
                        :subTitle="'Top 10 Cumulative Number of COVID-19 Deaths Worldwide'"
                        :lineColor="'#E53935'"
                    />
                </v-card>
            </v-col>
            <!-- DATA COMPARISON - ACTIVE, RECOVERED, DEATHS -->
            <v-col cols="12" v-if="dashboardWidget[3].enabled" xs="12" sm="6" md="4">
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
            <!-- PIE CHART COMPARISON - ACTIVE, RECOVERED and DEATHS -->
            <v-col cols="12" v-if="dashboardWidget[4].enabled" xs="12" sm="6" md="4">
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
            <!-- CONFIRMED CASES -->
            <v-col cols="12" v-if="dashboardWidget[5].enabled" xs="12" sm="6" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <HighStockLineChart
                        :data="confirmedCases"
                        :title="'Confirmed Cases'"
                        :subTitle="'Total Confirmed COVID-19 Cases Worldwide'"
                        :lineColor="'#FF9800'"
                    />
                </v-card>
            </v-col>
            <!-- ACTIVE CASES -->
            <v-col cols="12" v-if="dashboardWidget[6].enabled" xs="12" sm="6" md="4">
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
            <v-col cols="12" v-if="dashboardWidget[7].enabled" xs="12" sm="6" md="4">
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
            <v-col cols="12" v-if="dashboardWidget[8].enabled" xs="12" sm="6" md="4">
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
import BarChart from '@/components/Charts/BarChart'
import PieChart from '@/components/Charts/PieChart'
import StatusWidget from '@/components/Widgets/StatusWidget'

export default {
    components: {
        HighStockLineChart,
        HighStockMultiLineChart,
        BarChart,
        PieChart,
        StatusWidget
    },
    data() {
        return {
            isLoading: false,
            isLoadingSummary: false,
            isLoadingTopTenData: false,
            summary: {},
            statusWidgetData: [
                { title: 'Confirmed', widgetColor: 'orange', total: 0, icon: 'mdi-medical-bag' },
                { title: 'Active', widgetColor: 'darkgrey', total: 0, icon: 'mdi-pill' },
                { title: 'Recovered', widgetColor: 'green', total: 0, icon: 'mdi-plus-circle' },
                { title: 'Deaths', widgetColor: 'red darken-1', total: 0, icon: 'mdi-minus-circle' },
                { title: 'Critical', widgetColor: 'yellow', total: 0, icon: 'mdi-hospital-building', blackFont: true },
                { title: 'Tested', widgetColor: 'blue', total: 0, icon: 'mdi-test-tube' }
            ],
            top10ConfirmedData: {
                series: [],
                categories: []
            },
            top10DeathsData: {
                series: [],
                categories: []
            },
            pieChartSeriesData: [
                { name: 'Active', y: null, color: '#212121' },
                { name: 'Recovered', y: null, color: '#4CAF50' },
                { name: 'Deaths', y: null, color: '#E53935' }
            ],
            historicalData: [],
            activeCases: [],
            critical: [],
            deaths: [],
            recovered: [],
            tested: [],
            confirmedCases: [],
            dashboardWidget: []
        }
    },
    computed: {},
    methods: {
        sortObjectArray(array, key) {
            const newArray = [...array]
            return newArray.sort((a, b) => {
                return b[key] - a[key]
            })
        },
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
        setTopTenBarChartData(array, obj, key) {
            const topTen = array.slice(0, 10)
            obj.categories = [...topTen.map((country) => country.name)]
            obj.series = [...topTen.map((country) => country[key])]
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
                this.historicalData = await statisticService.getGlobalTrendingSummary()
                this.activeCases = this.formatHighstockData(this.historicalData, 'active_cases')
                this.critical = this.formatHighstockData(this.historicalData, 'critical')
                this.deaths = this.formatHighstockData(this.historicalData, 'deaths')
                this.recovered = this.formatHighstockData(this.historicalData, 'recovered')
                this.tested = this.formatHighstockData(this.historicalData, 'tested')
                this.confirmedCases = this.formatHighstockData(this.historicalData, 'total_cases')
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
        },
        async getCountriesLatestSummary() {
            this.isLoadingTopTenData = true
            try {
                const result = await statisticService.getCountriesLatestSummary()
                const sortedCountriesByTotalCases = this.sortObjectArray(result.countries, 'total_cases')
                const sortedCountriesByDeaths = this.sortObjectArray(result.countries, 'deaths')
                this.setTopTenBarChartData(sortedCountriesByTotalCases, this.top10ConfirmedData, 'total_cases')
                this.setTopTenBarChartData(sortedCountriesByDeaths, this.top10DeathsData, 'deaths')
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoadingTopTenData = false
            }
        }
    },
    created() {
        this.getGlobalTrendingSummary()
        this.getGlobalLatestSummary()
        this.getCountriesLatestSummary()
        this.dashboardWidget = this.$store.getters.dashboardWidget
    },
    mounted() {}
}
</script>
