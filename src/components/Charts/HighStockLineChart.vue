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
        data: Array,
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
                        name: this.title,
                        type: 'area',
                        color: this.lineColor,
                        data: this.data,
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.y:,.0f}</b>'
                        },
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0.7, this.lineColor],
                                [
                                    1,
                                    Highcharts.color(this.lineColor)
                                        .setOpacity(0)
                                        .get('rgba')
                                ]
                            ]
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
