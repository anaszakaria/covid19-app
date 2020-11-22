<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col sm="12">
                <v-card outlined tile>
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <Highstock ref="highcharts" :options="totalCasesChartOptions" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getUnixTime } from 'date-fns'
import Highcharts from 'highcharts'
import { genComponent } from 'vue-highcharts'
import { statisticService } from '@/services/statisticService'
import loadStock from 'highcharts/modules/stock.js'

loadStock(Highcharts)

export default {
    components: {
        Highstock: genComponent('Highstock', Highcharts)
    },
    data() {
        return {
            isLoading: false,
            trendingData: [],
            activeCases: [],
            critical: [],
            deaths: [],
            recovered: [],
            tested: [],
            totalCases: [],
            chartOptions: {}
        }
    },
    methods: {
        setCategory(array, category) {
            return array
                .map((item) => {
                    const timestamp = getUnixTime(new Date(item.eventDate)) * 1000
                    return [timestamp, item[category]]
                })
                .sort((a, b) => {
                    return a[0] - b[0]
                })
        },
        async getAllTrendingSummary() {
            this.isLoading = true
            try {
                const response = await statisticService.getAllTrendingSummary()
                this.trendingData = response
                this.activeCases = this.setCategory(this.trendingData, 'active_cases')
                this.critical = this.setCategory(this.trendingData, 'critical')
                this.deaths = this.setCategory(this.trendingData, 'deaths')
                this.recovered = this.setCategory(this.trendingData, 'recovered')
                this.tested = this.setCategory(this.trendingData, 'tested')
                this.totalCases = this.setCategory(this.trendingData, 'total_cases')
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoading = false
            }
        }
    },
    computed: {
        totalCasesChartOptions() {
            return {
                title: {
                    text: 'Total COVID-19 Cases Worldwide',
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Roboto'
                    }
                },
                subtitle: {
                    text: 'Total Cases'
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: ({ point }) => {
                                    const totalCases = this.numberWithCommas(point.y)
                                    console.log(`Number of Cases: ${totalCases}`)
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        name: 'Number of Cases',
                        color: '#3743F7',
                        data: this.totalCases,
                        tooltip: {
                            pointFormat: '{point.y:,.0f}'
                        }
                    }
                ],
                credits: {
                    enabled: false
                }
            }
        }
    },
    created() {
        this.getAllTrendingSummary()
    },
    mounted() {
        const vm = this
        const { chart } = vm.$refs.highcharts
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        })
    }
}
</script>
