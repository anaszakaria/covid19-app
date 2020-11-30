<template>
    <Highcharts ref="highcharts" :options="chartOptions"></Highcharts>
</template>

<script>
import Highcharts from 'highcharts'
import { genComponent } from 'vue-highcharts'

export default {
    components: {
        Highcharts: genComponent('Highcharts', Highcharts)
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
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
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
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [
                    {
                        name: 'Percentage',
                        colorByPoint: true,
                        data: this.data
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
