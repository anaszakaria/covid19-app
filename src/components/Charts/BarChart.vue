<template>
    <Highcharts ref="highcharts" :options="chartOptions"></Highcharts>
</template>

<script>
import Highcharts from 'highcharts'
import { genComponent } from 'vue-highcharts'
import exporting from 'highcharts/modules/exporting.js'

exporting(Highcharts)

export default {
    components: {
        Highcharts: genComponent('Highcharts', Highcharts)
    },
    props: {
        data: Array,
        seriesName: String,
        categories: Array,
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
                    type: 'bar'
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
                xAxis: {
                    categories: this.categories,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [
                    {
                        color: this.lineColor,
                        name: this.seriesName,
                        data: this.data
                    }
                ]
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
