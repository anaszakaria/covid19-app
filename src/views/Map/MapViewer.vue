<template>
    <section id="mapviewer">
        <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
        <l-map
            class="map"
            :zoom="zoom"
            :minZoom="minZoom"
            :maxZoom="maxZoom"
            :center="center"
            style="height: 100%; width: 100%"
        >
            <l-tile-layer :url="url" :attribution="attribution" />
            <!-- <l-geo-json v-if="showGeoJSON" :geojson="geojson" :options="options" :options-style="styleFunction" /> -->
            <l-geo-json v-if="showGeoJSON" :geojson="geojson" :options="options" />
        </l-map>
    </section>
</template>

<script>
import { LMap, LTileLayer, LGeoJson, LPolygon, LPolyline } from 'vue2-leaflet'
import { latLng, Icon, point, PolyUtil } from 'leaflet'
import { statisticService } from '@/services/statisticService'

export default {
    name: 'MapViewer',
    components: {
        LMap,
        LTileLayer,
        LGeoJson
    },
    data() {
        return {
            isLoading: false,
            showGeoJSON: true,
            enableTooltip: true,
            zoom: 2,
            minZoom: 2,
            maxZoom: 8,
            center: [48, -1.219482],
            geojson: null,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
    },
    methods: {
        async getCountriesLatestSummary() {
            this.isLoading = true
            try {
                const result = await statisticService.getCountriesLatestSummary()
                this.summary = result
                this.geojson.features.map((item, i) => {
                    let country = this.summary.countries.find((obj) => obj.iso3166a3 == item.properties.iso_a3)
                    if (country) {
                        return (item.properties = country)
                    }
                })
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoading = false
            }
        }
    },
    computed: {
        options() {
            return {
                onEachFeature: this.onEachFeatureFunction,
                style: (feature) => {
                    const totalCases = feature.properties.total_cases
                    if (totalCases < 5000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#f5f0eb',
                            fillOpacity: 1
                        }
                    }
                    if (totalCases < 10000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#f7efd4',
                            fillOpacity: 1
                        }
                    }
                    if (totalCases < 50000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#f7efd4',
                            fillOpacity: 1
                        }
                    } else if (totalCases < 100000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#f5eaad',
                            fillOpacity: 1
                        }
                    } else if (totalCases < 500000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#fcd783',
                            fillOpacity: 1
                        }
                    } else if (totalCases < 1000000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#fa9247',
                            fillOpacity: 1
                        }
                    } else if (totalCases < 2000000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#f76459',
                            fillOpacity: 1
                        }
                    } else if (totalCases > 2000000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#cc3838',
                            fillOpacity: 1
                        }
                    } else {
                        return {
                            weight: 1,
                            color: '#ddd',
                            opacity: 1,
                            fillColor: '#ddd',
                            fillOpacity: 0.5
                        }
                    }
                }
            }
        },
        onEachFeatureFunction() {
            if (!this.enableTooltip) {
                return () => {}
            }
            return (feature, layer) => {
                layer.bindTooltip(
                    `<div>Country:${feature.properties.name}</div><div>Total Cases:${feature.properties.total_cases}</div>`,
                    {
                        permanent: false,
                        sticky: true
                    }
                )
            }
        }
    },
    created() {
        const geojsonData = process.env.CountryGEOJSON
        this.geojson = geojsonData
        this.getCountriesLatestSummary()
    }
}
</script>

<style lang="scss" scoped>
#mapviewer {
    height: 100%;
}

.vue2leaflet-map {
    z-index: 2 !important;
}
</style>
