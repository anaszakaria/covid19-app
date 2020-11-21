<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col sm="12">
                <h3>COVID-19 Statistics for {{ country }}</h3>
                <v-card outlined tile>
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <Highstock ref="highcharts" :options="chartOptions" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
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
            chartData: []
        }
    },
    computed: {
        chartOptions() {
            return {
                title: {
                    text: `Total COVID-19 Cases for ${this.country}`
                },
                subtitle: {
                    text: 'Total Cases'
                },
                yAxis: {
                    title: {
                        text: 'Number of Cases'
                    }
                },
                xAxis: {
                    accessibility: {
                        rangeDescription: 'Range: 2010 to 2017'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                series: [
                    {
                        name: 'Cases',
                        data: [
                            [1542637800000, 46.47],
                            [1542724200000, 44.24],
                            [1542810600000, 44.19],
                            [1542983400000, 43.07],
                            [1543242600000, 43.65],
                            [1543329000000, 43.56],
                            [1543415400000, 45.24],
                            [1543501800000, 44.89],
                            [1543588200000, 44.65],
                            [1543847400000, 46.21],
                            [1543933800000, 44.17],
                            [1544106600000, 43.68],
                            [1544193000000, 42.12],
                            [1544452200000, 42.4],
                            [1544538600000, 42.16],
                            [1544625000000, 42.28],
                            [1544711400000, 42.74],
                            [1544797800000, 41.37],
                            [1545057000000, 40.99],
                            [1545143400000, 41.52],
                            [1545229800000, 40.22],
                            [1545316200000, 39.21],
                            [1545402600000, 37.68],
                            [1545661800000, 36.71],
                            [1545834600000, 39.29],
                            [1545921000000, 39.04],
                            [1546007400000, 39.06],
                            [1546266600000, 39.44],
                            [1546439400000, 39.48],
                            [1546525800000, 35.55],
                            [1546612200000, 37.06],
                            [1546871400000, 36.98],
                            [1546957800000, 37.69],
                            [1547044200000, 38.33],
                            [1547130600000, 38.45],
                            [1547217000000, 38.07],
                            [1547476200000, 37.5],
                            [1547562600000, 38.27],
                            [1547649000000, 38.74],
                            [1547735400000, 38.97],
                            [1547821800000, 39.21],
                            [1548167400000, 38.33],
                            [1548253800000, 38.48],
                            [1548340200000, 38.17],
                            [1548426600000, 39.44],
                            [1548685800000, 39.08],
                            [1548772200000, 38.67],
                            [1548858600000, 41.31],
                            [1548945000000, 41.61],
                            [1549031400000, 41.63],
                            [1549290600000, 42.81],
                            [1549377000000, 43.54],
                            [1549463400000, 43.56],
                            [1549549800000, 42.74],
                            [1549636200000, 42.6],
                            [1549895400000, 42.36],
                            [1549981800000, 42.72],
                            [1550068200000, 42.54]
                        ],
                        tooltip: {
                            valueDecimals: 2
                        }
                    }
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }
                    ]
                },
                credits: {
                    enabled: false
                }
            }
        }
    },
    methods: {
        async getTrendingSummaryByCountry() {
            try {
                const result = await statisticService.getTrendingSummaryByCountry(this.country)
                this.isLoading = false
                console.log(result)
            } catch (error) {
                this.isLoading = false
                console.log(error.response)
            }
        }
    },
    created() {
        this.isLoading = true
        this.country = this.$route.params.country
        this.getTrendingSummaryByCountry()
    },
    mounted() {
        const vm = this
        const { chart } = vm.$refs.highcharts
    }
}
</script>
