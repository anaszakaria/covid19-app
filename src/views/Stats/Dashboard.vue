<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'orange'"
                    :total="summary.total_cases"
                    :title="'Confirmed'"
                    :icon="'mdi-twitter'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'darkgrey'"
                    :total="summary.active_cases"
                    :title="'Active'"
                    :icon="'mdi-twitter'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'green'"
                    :total="summary.recovered"
                    :title="'Recovered'"
                    :icon="'mdi-twitter'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'red darken-1'"
                    :total="summary.deaths"
                    :title="'Deaths'"
                    :icon="'mdi-twitter'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'yellow'"
                    :total="summary.critical"
                    :title="'Critical'"
                    :icon="'mdi-twitter'"
                    :isDark="false"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'blue'"
                    :total="summary.tested"
                    :title="'Tested'"
                    :icon="'mdi-twitter'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
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
            <!-- PIE CHART - OVERALL ACTIVE vs RECOVERED vs DEATHS PERCENTAGE 
            <v-col xs="12" md="6">
                <v-card outlined tile>
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <PieChart
                        :activeCases="activeCases"
                        :recovered="recovered"
                        :deaths="deaths"
                        :title="'Data Comparison'"
                        :subTitle="'Data Comparison Between Active, Recovered and Death Cases'"
                    />
                </v-card>
            </v-col> -->
            <!-- DATA COMPARISON - ACTIVE, RECOVERED, DEATHS -->
            <v-col xs="12" md="4">
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
            <v-col xs="12" md="4">
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
            <v-col xs="12" md="4">
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
            <v-col xs="12" md="6">
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
            <v-col xs="12" md="6">
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
            <v-col xs="12" md="6">
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
            totalCases: []
        }
    },
    methods: {
        formatHighstockData(array, category) {
            return array
                .map((item) => {
                    const timestamp = getUnixTime(new Date(item.eventDate)) * 1000
                    return [timestamp, item[category]]
                })
                .sort((a, b) => {
                    return a[0] - b[0]
                })
        },
        async getGlobalTrendingSummary() {
            this.isLoading = true
            try {
                const response = await statisticService.getGlobalTrendingSummary()
                this.trendingData = response
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
                const response = await statisticService.getGlobalLatestSummary()
                this.summary = response
                const [active, recovered, deaths] = this.pieChartSeriesData
                active.y = response.active_cases
                recovered.y = response.recovered
                deaths.y = response.deaths
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
    },
    mounted() {}
}
</script>
