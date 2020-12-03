<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col xs="6" md="2" class="d-flex">
                <StatusWidget
                    :widgetColor="'orange'"
                    :total="summary.total_cases"
                    :title="'Confirmed'"
                    :icon="'mdi-medical-bag'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2" class="d-flex">
                <StatusWidget
                    :widgetColor="'orange'"
                    :total="summary.new_cases"
                    :title="'New Cases'"
                    :icon="'mdi-medical-bag'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2" class="d-flex">
                <StatusWidget
                    :widgetColor="'darkgrey'"
                    :total="summary.active_cases"
                    :title="'Active'"
                    :icon="'mdi-pill'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2" class="d-flex">
                <StatusWidget
                    :widgetColor="'green'"
                    :total="summary.total_recovered"
                    :title="'Recovered'"
                    :icon="'mdi-plus-circle'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2" class="d-flex">
                <StatusWidget
                    :widgetColor="'red darken-1'"
                    :total="summary.total_deaths"
                    :title="'Deaths'"
                    :icon="'mdi-minus-circle'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2" class="d-flex">
                <StatusWidget
                    :widgetColor="'red darken-1'"
                    :total="summary.new_deaths"
                    :title="'New Deaths'"
                    :icon="'mdi-minus-circle'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <!-- PIE CHARTS -->
            <v-col xs="12" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoadingSummary" indeterminate></v-progress-linear>
                    <PieChart
                        :data="casesPerMillion"
                        :title="'Cases per 1M'"
                        :subTitle="'Percentage of Cases per Million People'"
                        :lineColor="'#212121'"
                    />
                </v-card>
            </v-col>
            <v-col xs="12" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoadingSummary" indeterminate></v-progress-linear>
                    <PieChart
                        :data="deathsPerMillion"
                        :title="'Deaths per 1M'"
                        :subTitle="'Percentage of Deaths per Million People'"
                        :lineColor="'#212121'"
                    />
                </v-card>
            </v-col>
            <v-col xs="12" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoadingSummary" indeterminate></v-progress-linear>
                    <PieChart
                        :data="testPerMillion"
                        :title="'Tests per 1M'"
                        :subTitle="'Percentage of Tests per Million People'"
                        :lineColor="'#212121'"
                    />
                </v-card>
            </v-col>
            <!-- TOTAL CASES -->
            <v-col xs="12" md="12">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <v-row class="ma-0">
                        <v-col xs="12" md="3">
                            <v-select :items="statusOptions" v-model="selectedStatus" label="Cases" dense></v-select>
                        </v-col>
                    </v-row>
                    <HighStockLineChart
                        :data="trendingLineChartSummaryData"
                        :title="statusChart.title"
                        :subTitle="statusChart.subTitle"
                        :lineColor="statusChart.lineColor"
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
import PieChart from '@/components/Charts/PieChart'
import StatusWidget from '@/components/Widgets/StatusWidget'

export default {
    components: {
        HighStockLineChart,
        PieChart,
        StatusWidget
    },
    data() {
        return {
            isLoading: false,
            isLoadingSummary: false,
            summary: {},
            selectedStatus: 'Confirmed',
            statusOptions: ['Confirmed', 'Active', 'Deaths', 'Recovered', 'Critical', 'Tested'],
            statusChartOptions: {
                confirmed: {
                    title: 'Confirmed Cases',
                    subTitle: 'Total Confirmed COVID-19 Cases',
                    lineColor: '#FF9800'
                }
            },
            trendingData: [],
            activeCases: [],
            critical: [],
            deaths: [],
            recovered: [],
            tested: [],
            confirmed: [],
            casesPerMillion: [
                { name: 'Confirmed', y: null, color: '#ff9800' },
                { name: 'Not Infected', y: null, color: '#4CAF50' }
            ],
            deathsPerMillion: [
                { name: 'Deaths', y: null, color: '#E53935' },
                { name: 'Alive', y: null, color: '#4CAF50' }
            ],
            testPerMillion: [
                { name: 'Tested', y: null, color: '#2196f3' },
                { name: 'Not Tested', y: null, color: '#212121' }
            ]
        }
    },
    computed: {
        trendingLineChartSummaryData() {
            const data = this.confirmed
            return data
        },
        statusChart() {
            return {
                ...this.statusChartOptions[this.selectedStatus.toLowerCase()]
            }
        }
    },
    methods: {
        formatHighstockData(array, category) {
            return array
                .map((item) => {
                    const timestamp = getUnixTime(new Date(item.record_date)) * 1000
                    if (item[category]) {
                        return [timestamp, parseInt(item[category].replace(/,/g, ''))]
                    }
                    return [timestamp, null]
                })
                .sort((a, b) => {
                    return a[0] - b[0]
                })
        },
        formatStrToInt(str) {
            return parseInt(str.replace(/,/g, ''))
        },
        setPieChartData(pieChartData, value) {
            const [slice1, slice2] = pieChartData
            slice1.y = value
            slice2.y = 1000000 - value
        },
        async getHistoryByCountry() {
            this.isLoading = true
            try {
                const response = await statisticService.getHistoryByCountry(this.country)
                this.trendingData = response
                // this.activeCases = this.formatHighstockData(this.trendingData, 'active_cases')
                // this.critical = this.formatHighstockData(this.trendingData, 'serious_critical')
                // this.deaths = this.formatHighstockData(this.trendingData, 'total_deaths')
                // this.recovered = this.formatHighstockData(this.trendingData, 'total_recovered')
                // this.tested = this.formatHighstockData(this.trendingData, 'total_tests')
                this.confirmed = this.formatHighstockData(this.trendingData, 'total_cases')
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoading = false
            }
        },
        async getLatestStatsByCountry() {
            this.isLoadingSummary = true
            try {
                const response = await statisticService.getLatestStatsByCountry(this.country)
                this.summary = response
                this.setPieChartData(this.casesPerMillion, this.formatStrToInt(this.summary.total_cases_per1m))
                this.setPieChartData(this.deathsPerMillion, this.formatStrToInt(this.summary.deaths_per1m))
                this.setPieChartData(this.testPerMillion, this.formatStrToInt(this.summary.total_tests_per1m))
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoadingSummary = false
            }
        }
    },
    created() {
        this.country = this.$route.params.country
        this.getHistoryByCountry()
        this.getLatestStatsByCountry()
    },
    mounted() {}
}
</script>
