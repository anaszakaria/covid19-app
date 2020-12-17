<template>
    <v-container fluid>
        <v-row v-if="countryStatisticWidget[0].enabled" class="ma-0">
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'orange'"
                    :total="summary.total_cases"
                    :title="'Confirmed'"
                    :icon="'mdi-medical-bag'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'orange'"
                    :total="summary.new_cases"
                    :title="'New Cases'"
                    :icon="'mdi-medical-bag'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'darkgrey'"
                    :total="summary.active_cases"
                    :title="'Active'"
                    :icon="'mdi-pill'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'green'"
                    :total="summary.total_recovered"
                    :title="'Recovered'"
                    :icon="'mdi-plus-circle'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'red darken-1'"
                    :total="summary.total_deaths"
                    :title="'Deaths'"
                    :icon="'mdi-minus-circle'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'red darken-1'"
                    :total="summary.new_deaths"
                    :title="'New Deaths'"
                    :icon="'mdi-minus-circle'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
        </v-row>
        <v-row class="ma-0">
            <!-- PIE CHARTS -->
            <v-col v-if="countryStatisticWidget[1].enabled" xs="12" md="4">
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
            <v-col v-if="countryStatisticWidget[2].enabled" xs="12" md="4">
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
            <v-col v-if="countryStatisticWidget[3].enabled" xs="12" md="4">
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
            <v-col v-if="countryStatisticWidget[4].enabled" xs="12" md="12">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <v-row class="ma-0">
                        <v-col xs="12" md="3">
                            <v-select
                                :items="statusOptions"
                                v-model="selectedStatus"
                                label="Cases"
                                :disabled="isLoading"
                                dense
                            ></v-select>
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
            country: this.$route.params.country,
            summary: {},
            selectedStatus: 'Confirmed',
            statusOptions: ['Confirmed', 'Active', 'Recovered', 'Deaths', 'Critical', 'Tested'],
            countryStatisticWidget: [],
            statusChartOptions: {
                confirmed: {
                    title: 'Confirmed Cases',
                    subTitle: 'Total Confirmed COVID-19 Cases',
                    lineColor: '#FF9800'
                },
                active: {
                    title: 'Active Cases',
                    subTitle: 'Total COVID-19 Active Cases',
                    lineColor: '#212121'
                },
                recovered: {
                    title: 'Cases Recovered',
                    subTitle: 'Total COVID-19 Recovered Cases',
                    lineColor: '#4CAF50'
                },
                deaths: {
                    title: 'Death Cases',
                    subTitle: 'Total COVID-19 Death Cases',
                    lineColor: '#E53935'
                },
                critical: {
                    title: 'Critical Cases',
                    subTitle: 'Total COVID-19 Critical Cases',
                    lineColor: '#ffeb3b'
                },
                tested: {
                    title: 'Total Tests',
                    subTitle: 'Total Number of COVID-19 Tests',
                    lineColor: '#2196f3'
                }
            },
            dailyNewCases: [],
            dailyNewDeaths: [],
            trendingData: [],
            latestData: {},
            active: [],
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
            switch (this.selectedStatus) {
                case 'Confirmed':
                    if (this.confirmed.length === 0) {
                        return this.formatHighstockData(this.trendingData, 'cases', 'total')
                    }
                    return this.confirmed
                    break
                case 'Active':
                    if (this.active.length === 0) {
                        return this.formatHighstockData(this.trendingData, 'cases', 'active')
                    }
                    return this.active
                    break
                case 'Recovered':
                    if (this.recovered.length === 0) {
                        return this.formatHighstockData(this.trendingData, 'cases', 'recovered')
                    }
                    return this.recovered
                    break
                case 'Deaths':
                    if (this.deaths.length === 0) {
                        return this.formatHighstockData(this.trendingData, 'deaths', 'total')
                    }
                    return this.deaths
                    break
                case 'Critical':
                    if (this.critical.length === 0) {
                        return this.formatHighstockData(this.trendingData, 'cases', 'critical')
                    }
                    return this.critical
                    break
                case 'Tested':
                    if (this.tested.length === 0) {
                        return this.formatHighstockData(this.trendingData, 'tests', 'total')
                    }
                    return this.tested
                    break
                default:
                    console.log('Selected Status in Not Found')
                    break
            }
            return this[this.selectedStatus.toLowerCase()]
        },
        statusChart() {
            return {
                ...this.statusChartOptions[this.selectedStatus.toLowerCase()]
            }
        }
    },
    methods: {
        formatHighstockData(array, category, subsection) {
            return array
                .map((item) => {
                    const timestamp = getUnixTime(new Date(item.day)) * 1000
                    if (item[category]) {
                        return [timestamp, parseInt(item[category][subsection])]
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
            console.log(value)
            const [slice1, slice2] = pieChartData
            slice1.y = value
            slice2.y = 1000000 - value
            console.log(slice2.y)
        },
        async getHistoryByCountry() {
            this.isLoading = true
            try {
                this.trendingData = await statisticService.getHistoryByCountry(this.country)
                this.latestData = this.trendingData[0]
                this.setPieChartData(this.casesPerMillion, parseInt(this.latestData.cases['1M_pop']))
                this.setPieChartData(this.deathsPerMillion, parseInt(this.latestData.deaths['1M_pop']))
                this.setPieChartData(this.testPerMillion, parseInt(this.latestData.tests['1M_pop']))
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoading = false
            }
        },
        async getLatestStatsByCountry() {
            this.isLoadingSummary = true
            try {
                this.summary = await statisticService.getLatestStatsByCountry(this.country)
                // this.setPieChartData(this.casesPerMillion, this.formatStrToInt(this.summary.total_cases_per1m))
                // this.setPieChartData(this.deathsPerMillion, this.formatStrToInt(this.summary.deaths_per1m))
                // this.setPieChartData(this.testPerMillion, this.formatStrToInt(this.summary.total_tests_per1m))
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoadingSummary = false
            }
        }
    },
    created() {
        this.countryStatisticWidget = this.$store.getters.countryStatisticWidget
        const historyByCountryWidget = this.countryStatisticWidget.find(
            (item) => item.title === 'Trending Data Line Chart'
        )
        if (historyByCountryWidget.enabled) {
            this.getHistoryByCountry()
        }
        this.getLatestStatsByCountry()
    },
    mounted() {}
}
</script>
