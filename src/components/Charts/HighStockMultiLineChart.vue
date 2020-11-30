<template>
    <Highstock ref="highcharts" :options="chartOptions" />
</template>

<script>
import Highcharts from 'highcharts'
import { genComponent } from 'vue-highcharts'
import loadStock from 'highcharts/modules/stock.js'

loadStock(Highcharts)

export default {
    components: {
        Highstock: genComponent('Highstock', Highcharts)
    },
    props: {
        activeCases: Array,
        recovered: Array,
        deaths: Array,
        title: String,
        subTitle: String,
        lineColor: String
    },
    data() {
        return {}
    },
    computed: {
        chartOptions() {
            return {
                title: {
                    text: this.title,
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Roboto'
                    }
                },
                subtitle: {
                    text: this.subTitle,
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
                        color: '#212121',
                        data: this.activeCases,
                        tooltip: {
                            pointFormat: 'Active Cases: {point.y:,.0f}'
                        }
                    },
                    {
                        name: 'Recovered Cases',
                        color: '#4CAF50',
                        data: this.recovered,
                        tooltip: {
                            pointFormat: 'Recovered: {point.y:,.0f}'
                        }
                    },
                    {
                        name: 'Deaths',
                        color: '#E53935',
                        data: this.deaths,
                        tooltip: {
                            pointFormat: 'Deaths: {point.y:,.0f}'
                        }
                    }
                ],
                credits: {
                    enabled: false
                }
            }
        }
    },
    methods: {},
    created() {},
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
