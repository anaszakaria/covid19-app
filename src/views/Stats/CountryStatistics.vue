<template>
    <v-container fluid>
        <h4 class="font-weight-medium ml-3 mb-0">COVID-19 Statistics for {{ country }}</h4>
        <v-row cols="12">
            <v-col>
                <v-autocomplete
                    dense
                    v-model="selectedCountry"
                    :items="countryNames"
                    :loading="isLoadingCountryList"
                    @change="changeRoute()"
                    label="Search Country"
                    hide-no-data
                    hide-details
                    class="mx-0 ml-3 mr-3"
                ></v-autocomplete>
            </v-col>
            <v-col v-if="userIsAuthenticated">
                <v-btn
                    small
                    color="primary"
                    elevation="0"
                    :disabled="disableSaveBtn"
                    :loading="savingDefaultCountry"
                    @click="saveDefaultCountry"
                    >Set as Default</v-btn
                >
            </v-col>
        </v-row>
        <v-row v-if="countryStatisticWidget[0].enabled" class="ma-0">
            <v-col cols="12" xs="6" sm="4" md="2">
                <StatusWidget
                    :widgetColor="'orange'"
                    :total="summary.total_cases"
                    :title="'Confirmed'"
                    :icon="'mdi-medical-bag'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col cols="12" xs="6" sm="4" md="2">
                <StatusWidget
                    :widgetColor="'orange'"
                    :total="summary.new_cases"
                    :title="'New Cases'"
                    :icon="'mdi-medical-bag'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col cols="12" xs="6" sm="4" md="2">
                <StatusWidget
                    :widgetColor="'darkgrey'"
                    :total="summary.active_cases"
                    :title="'Active'"
                    :icon="'mdi-pill'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col cols="12" xs="6" sm="4" md="2">
                <StatusWidget
                    :widgetColor="'green'"
                    :total="summary.total_recovered"
                    :title="'Recovered'"
                    :icon="'mdi-plus-circle'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col cols="12" xs="6" sm="4" md="2">
                <StatusWidget
                    :widgetColor="'red darken-1'"
                    :total="summary.total_deaths"
                    :title="'Deaths'"
                    :icon="'mdi-minus-circle'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col cols="12" xs="6" sm="4" md="2">
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
            <!-- DAILY CASES -->
            <v-col cols="12" v-if="countryStatisticWidget[1].enabled" xs="12" sm="6" md="6">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <HighStockLineChart
                        :data="dailyNewCasesData"
                        :title="'Daily Confirmed'"
                        :subTitle="'Daily Confirmed COVID-19 Cases'"
                        :lineColor="'#FF9800'"
                        :seriesType="'column'"
                    />
                </v-card>
            </v-col>
            <v-col cols="12" v-if="countryStatisticWidget[2].enabled" xs="12" sm="6" md="6">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <HighStockLineChart
                        :data="dailyDeathCasesData"
                        :title="'Daily Deaths'"
                        :subTitle="'Daily COVID-19 Deaths Cases'"
                        :lineColor="'#E53935'"
                        :seriesType="'column'"
                    />
                </v-card>
            </v-col>
            <!-- PIE CHARTS -->
            <v-col cols="12" v-if="countryStatisticWidget[3].enabled" xs="12" sm="6" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <PieChart
                        :data="casesPerMillion"
                        :title="'Cases per 1M'"
                        :subTitle="'Percentage of Cases per Million People'"
                        :lineColor="'#212121'"
                    />
                </v-card>
            </v-col>
            <v-col cols="12" v-if="countryStatisticWidget[4].enabled" xs="12" sm="6" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <PieChart
                        :data="deathsPerMillion"
                        :title="'Deaths per 1M'"
                        :subTitle="'Percentage of Deaths per Million People'"
                        :lineColor="'#212121'"
                    />
                </v-card>
            </v-col>
            <v-col cols="12" v-if="countryStatisticWidget[5].enabled" xs="12" sm="6" md="4">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <PieChart
                        :data="testPerMillion"
                        :title="'Tests per 1M'"
                        :subTitle="'Percentage of Tests per Million People'"
                        :lineColor="'#212121'"
                    />
                </v-card>
            </v-col>
            <!-- TOTAL CASES -->
            <v-col cols="12" v-if="countryStatisticWidget[6].enabled" xs="12" sm="12" md="12">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <v-row class="ma-0">
                        <v-col xs="12" sm="6" md="3">
                            <v-select
                                dense
                                :items="statusOptions"
                                v-model="selectedStatus"
                                label="Cases"
                                :disabled="isLoading"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <HighStockLineChart
                        :data="lineChartHistoricalData"
                        :title="statusChart.title"
                        :subTitle="statusChart.subTitle"
                        :lineColor="statusChart.lineColor"
                        :seriesType="statusChart.seriesType"
                    />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { EventBus } from '@/main'
import { getUnixTime } from 'date-fns'
import { statisticService } from '@/services/statisticService'
import { userService } from '@/services/userService'
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
            isLoadingCountryList: false,
            disableSaveBtn: true,
            savingDefaultCountry: false,
            country: this.$route.params.country,
            countryNames: [],
            selectedCountry: '',
            formattedCountry: '',
            summary: {},
            selectedDaily: 'Confirmed',
            selectedStatus: 'Confirmed',
            statusOptions: ['Confirmed', 'Active', 'Recovered', 'Deaths', 'Critical', 'Tested'],
            countryStatisticWidget: [],
            statusChartOptions: {
                confirmed: {
                    title: 'Confirmed Cases',
                    subTitle: 'Total Confirmed COVID-19 Cases',
                    lineColor: '#FF9800',
                    seriesType: 'area'
                },
                active: {
                    title: 'Active Cases',
                    subTitle: 'Total COVID-19 Active Cases',
                    lineColor: '#212121',
                    seriesType: 'area'
                },
                recovered: {
                    title: 'Cases Recovered',
                    subTitle: 'Total COVID-19 Recovered Cases',
                    lineColor: '#4CAF50',
                    seriesType: 'area'
                },
                deaths: {
                    title: 'Death Cases',
                    subTitle: 'Total COVID-19 Death Cases',
                    lineColor: '#E53935',
                    seriesType: 'area'
                },
                critical: {
                    title: 'Critical Cases',
                    subTitle: 'Total COVID-19 Critical Cases',
                    lineColor: '#FDD835',
                    seriesType: 'area'
                },
                tested: {
                    title: 'Total Tests',
                    subTitle: 'Total Number of COVID-19 Tests',
                    lineColor: '#2196f3',
                    seriesType: 'area'
                }
            },
            dailyNewCases: [],
            dailyNewDeaths: [],
            historicalData: [],
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
    watch: {
        '$route.params.country': function(country) {
            this.country = this.$route.params.country
            this.selectedCountry = this.$route.params.country
            this.formattedCountry = this.country === 'South Korea' ? 'S-Korea' : this.country.replace(/ /g, '-')
            this.getHistoryByCountry()
            this.getLatestStatsByCountry()
        }
    },
    computed: {
        dailyNewCasesData() {
            if (this.dailyNewCases.length === 0) {
                return this.formatDailyCasesData(this.historicalData, 'cases', 'new')
            }
            return this.dailyNewCases
        },
        dailyDeathCasesData() {
            if (this.dailyNewDeaths.length === 0) {
                return this.formatDailyCasesData(this.historicalData, 'deaths', 'new')
            }
            return this.dailyNewDeaths
        },
        lineChartHistoricalData() {
            switch (this.selectedStatus) {
                case 'Confirmed':
                    if (this.confirmed.length === 0) {
                        return this.formatHighstockData(this.historicalData, 'cases', 'total')
                    }
                    return this.confirmed
                    break
                case 'Active':
                    if (this.active.length === 0) {
                        return this.formatHighstockData(this.historicalData, 'cases', 'active')
                    }
                    return this.active
                    break
                case 'Recovered':
                    if (this.recovered.length === 0) {
                        return this.formatHighstockData(this.historicalData, 'cases', 'recovered')
                    }
                    return this.recovered
                    break
                case 'Deaths':
                    if (this.deaths.length === 0) {
                        return this.formatHighstockData(this.historicalData, 'deaths', 'total')
                    }
                    return this.deaths
                    break
                case 'Critical':
                    if (this.critical.length === 0) {
                        return this.formatHighstockData(this.historicalData, 'cases', 'critical')
                    }
                    return this.critical
                    break
                case 'Tested':
                    if (this.tested.length === 0) {
                        return this.formatHighstockData(this.historicalData, 'tests', 'total')
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
        enableSaveButton() {
            this.disableSaveBtn = false
        },
        async saveDefaultCountry() {
            this.disableSaveBtn = true
            this.savingDefaultCountry = true
            try {
                const result = await userService.updateUserSavedCountry(
                    this.$store.getters.user.userId,
                    this.selectedCountry
                )
                this.$store.dispatch('setSavedCountry', this.selectedCountry)
                EventBus.$emit('setDefaultCountry')
                console.log(result)
            } catch (error) {
                console.log(error.response)
            } finally {
                this.savingDefaultCountry = false
            }
        },
        changeRoute() {
            this.disableSaveBtn = false
            this.gotoPage(this.selectedCountry)
        },
        formatDailyCasesData(array, category, subsection) {
            return array
                .map((item) => {
                    const timestamp = getUnixTime(new Date(item.day)) * 1000
                    if (item[category][subsection]) {
                        const value = parseInt(item[category][subsection].replace('+', ''))
                        let cases = value < 0 ? null : value
                        return [timestamp, cases]
                    }
                    return [timestamp, null]
                })
                .sort((a, b) => {
                    return a[0] - b[0]
                })
        },
        formatHighstockData(array, category, subsection) {
            return array
                .map((item) => {
                    const timestamp = getUnixTime(new Date(item.day)) * 1000
                    if (item[category][subsection]) {
                        return [timestamp, parseInt(item[category][subsection])]
                    }
                    return [timestamp, null]
                })
                .sort((a, b) => {
                    return a[0] - b[0]
                })
        },
        setPieChartData(pieChartData, value) {
            const [slice1, slice2] = pieChartData
            slice1.y = value
            slice2.y = 1000000 - value
        },
        async getCountryList() {
            this.isLoadingCountryList = true
            try {
                this.countryNames = await statisticService.getCountryList()
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoadingCountryList = false
            }
        },
        async getHistoryByCountry() {
            this.isLoading = true
            try {
                this.historicalData = await statisticService.getHistoryByCountry(this.formattedCountry)
                this.latestData = this.historicalData[0]
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
                const country = this.country === 'South Korea' ? 'S. Korea' : this.country
                this.summary = await statisticService.getLatestStatsByCountry(country)
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoadingSummary = false
            }
        }
    },
    created() {
        this.country = this.$route.params.country
        this.selectedCountry = this.$route.params.country
        this.formattedCountry = this.country === 'South Korea' ? 'S-Korea' : this.country.replace(/ /g, '-')
        this.countryStatisticWidget = this.$store.getters.countryStatisticWidget
        const historyByCountryWidget = this.countryStatisticWidget.find(
            (item) => item.title === 'Trending Data Line Chart'
        )
        if (historyByCountryWidget.enabled) {
            this.getHistoryByCountry()
        }
        this.getCountryList()
        this.getLatestStatsByCountry()
    },
    mounted() {}
}
</script>
