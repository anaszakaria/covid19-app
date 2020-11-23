<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col xs="12" md="6">
                <v-card outlined tile>
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <Highstock ref="highcharts" :options="dataComparisonOptions" />
                </v-card>
            </v-col>
            <v-col xs="12" md="6">
                <v-card outlined tile>
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <Highstock ref="highcharts" :options="totalCasesChartOptions" />
                </v-card>
            </v-col>
            <v-col xs="12" md="6">
                <v-card outlined tile>
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <Highstock ref="highcharts" :options="activeCasesChartOptions" />
                </v-card>
            </v-col>
            <v-col xs="12" md="6">
                <v-card outlined tile>
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <Highstock ref="highcharts" :options="recoveredChartOptions" />
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
import { baseChartOptions } from '@/config/baseChartOptions'
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
        async getAllTrendingSummary() {
            this.isLoading = true
            try {
                const response = await statisticService.getAllTrendingSummary()
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
        }
    },
    computed: {
        dataComparisonOptions() {
            return {
                ...baseChartOptions,
                title: {
                    text: 'Data Comparison',
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Roboto'
                    }
                },
                subtitle: {
                    text: 'Data Comparison between Active, Recovered and Death Cases',
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Roboto'
                    }
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: ({ point }) => {
                                    const totalCases = this.numberWithCommas(point.y)
                                    console.log(`Number of Active Cases: ${totalCases}`)
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        name: 'Active Cases',
                        color: '#E65100',
                        data: this.activeCases,
                        tooltip: {
                            pointFormat: 'Active Cases: {point.y:,.0f}'
                        }
                    },
                    {
                        name: 'Recovered Cases',
                        color: '#1B5E20',
                        data: this.recovered,
                        tooltip: {
                            pointFormat: 'Recovered: {point.y:,.0f}'
                        }
                    },
                    {
                        name: 'Deaths',
                        color: '#B71C1C',
                        data: this.deaths,
                        tooltip: {
                            pointFormat: 'Deaths: {point.y:,.0f}'
                        }
                    }
                ]
            }
        },
        totalCasesChartOptions() {
            return {
                ...baseChartOptions,
                title: {
                    text: 'Total Cases',
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Roboto'
                    }
                },
                subtitle: {
                    text: 'Total COVID-19 Cases Worldwide',
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Roboto'
                    }
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: ({ point }) => {
                                    const totalCases = this.numberWithCommas(point.y)
                                    console.log(`Number of Total Cases: ${totalCases}`)
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        name: 'Number of Cases',
                        type: 'area',
                        color: '#212121',
                        data: this.totalCases,
                        tooltip: {
                            pointFormat: '{point.y:,.0f}'
                        }
                    }
                ]
            }
        },
        activeCasesChartOptions() {
            return {
                ...baseChartOptions,
                title: {
                    text: 'Active Cases',
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Roboto'
                    }
                },
                subtitle: {
                    text: 'Total COVID-19 Active Cases Worldwide',
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Roboto'
                    }
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: ({ point }) => {
                                    const totalCases = this.numberWithCommas(point.y)
                                    console.log(`Number of Active Cases: ${totalCases}`)
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        name: 'Active Cases',
                        type: 'area',
                        color: '#E65100',
                        data: this.activeCases,
                        tooltip: {
                            pointFormat: '{point.y:,.0f}'
                        },
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0.7, Highcharts.getOptions().colors[0]],
                                [
                                    1,
                                    Highcharts.color(Highcharts.getOptions().colors[0])
                                        .setOpacity(0)
                                        .get('rgba')
                                ]
                            ]
                        }
                    }
                ]
            }
        },
        recoveredChartOptions() {
            return {
                ...baseChartOptions,
                title: {
                    text: 'Cases Recovered',
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Roboto'
                    }
                },
                subtitle: {
                    text: 'Total COVID-19 Recovered Cases Worldwide',
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Roboto'
                    }
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: ({ point }) => {
                                    const totalCases = this.numberWithCommas(point.y)
                                    console.log(`Number of Recovered Cases: ${totalCases}`)
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        name: 'Recovered Cases',
                        type: 'area',
                        color: '#1B5E20',
                        data: this.recovered,
                        tooltip: {
                            pointFormat: '{point.y:,.0f}'
                        },
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0.7, Highcharts.getOptions().colors[0]],
                                [
                                    1,
                                    Highcharts.color(Highcharts.getOptions().colors[0])
                                        .setOpacity(0)
                                        .get('rgba')
                                ]
                            ]
                        }
                    }
                ]
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
