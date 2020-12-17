<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col sm="12">
                <h3>World Map Statistics for COVID-19</h3>
                <v-card outlined tile>
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <Highmaps ref="highcharts" :options="chartOptions" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import geojson from '@/config/world-palestine-highres.geo.json'
import Highcharts from 'highcharts'
import loadMap from 'highcharts/modules/map.js'
import { genComponent } from 'vue-highcharts'
import { statisticService } from '@/services/statisticService'

loadMap(Highcharts)

export default {
    components: {
        Highmaps: genComponent('Highmaps', Highcharts)
    },
    data() {
        return {
            isLoading: false,
            chartData: [],
            mapHeight: '',
            summary: {}
        }
    },
    methods: {
        resetMapHeight() {
            if (window.innerHeight < 300) {
                return
            }
            this.mapHeight = window.innerHeight - 130
        },
        async getCountriesLatestSummary() {
            this.isLoading = true
            try {
                const result = await statisticService.getCountriesLatestSummary()
                this.summary = result
                console.log(this.summary)
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoading = false
            }
        }
    },
    computed: {
        chartOptions() {
            return {
                chart: {
                    map: geojson,
                    height: this.mapHeight
                },
                title: {
                    text: 'COVID-19 Cases Worldwide'
                },
                mapNavigation: {
                    enabled: true
                },
                colorAxis: {
                    min: 0,
                    stops: [
                        [0, '#0f0ffa'],
                        [0.3, '#0f0ffa'],
                        [0.7, '#FFFF00'],
                        [1, '#FF0000']
                    ]
                },
                series: [
                    {
                        data: [
                            ['us-ny', 0],
                            ['us-mi', 5],
                            ['us-tx', 3],
                            ['us-ak', 100000000]
                        ],
                        mapData: Highcharts.maps['custom/world'],
                        joinBy: ['hc-key', 'key'],
                        name: 'Random data',
                        states: {
                            hover: {
                                color: Highcharts.getOptions().colors[2]
                            }
                        },
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        },
                        point: {
                            events: {
                                click: function() {
                                    console.log('Clicked')
                                }
                            }
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
        window.addEventListener('resize', this.resetMapHeight)
        this.resetMapHeight()
        this.getCountriesLatestSummary()
    },
    mounted() {
        const vm = this
        const { chart } = vm.$refs.highcharts
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resetMapHeight)
    }
}
</script>
