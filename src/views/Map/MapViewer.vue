<template>
    <section id="mapviewer">
        <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
        <v-card id="basemap" class="mx-auto pa-3 pt-5 pb-0" max-width="240" tile>
            <v-select dense v-model="selectedProviders" :items="providers" label="Change Basemap"></v-select>
        </v-card>
        <v-card id="legend" class="mx-auto" max-width="200" tile>
            <v-list dense disabled>
                <v-subheader class="pl-4 subtitle-2">LEGEND</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item v-for="(item, i) in legendItems" :key="i">
                        <v-list-item-icon>
                            <v-icon v-text="'mdi-square'" :color="item.color"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
        <l-map
            class="map"
            :zoom="zoom"
            :minZoom="minZoom"
            :maxZoom="maxZoom"
            :center="center"
            style="height: 100%; width: 100%"
        >
            <l-tile-layer :url="tilesUrl" :options="tilesOptions" />
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
            fillOpacity: 0.7,
            zoom: 2.2,
            minZoom: 2,
            maxZoom: 8,
            center: [48, -1.219482],
            geojson: null,
            currentTiles: 0,
            selectedProviders: 'MapBox Satellite',
            providers: ['MapBox Satellite', 'MapBox Dark', 'MapBox Light', 'MapBox Outdoors', 'Esri World Imagery'],
            tiles: [
                {
                    name: 'MapBox Satellite',
                    url:
                        'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5hc3pha2FyaWEiLCJhIjoiY2tiZHM0cmZsMGVxcjJubWtidzJvNnBkZCJ9.daQ2O29WJOpI7jJV1lMD3w',
                    options: {
                        attribution: 'Tiles &copy; Source: MapBox'
                    }
                },
                {
                    name: 'MapBox Dark',
                    url:
                        'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5hc3pha2FyaWEiLCJhIjoiY2tiZHM0cmZsMGVxcjJubWtidzJvNnBkZCJ9.daQ2O29WJOpI7jJV1lMD3w',
                    options: {
                        attribution: 'Tiles &copy; Source: MapBox'
                    }
                },
                {
                    name: 'MapBox Light',
                    url:
                        'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5hc3pha2FyaWEiLCJhIjoiY2tiZHM0cmZsMGVxcjJubWtidzJvNnBkZCJ9.daQ2O29WJOpI7jJV1lMD3w',
                    options: {
                        attribution: 'Tiles &copy; Source: MapBox'
                    }
                },
                {
                    name: 'MapBox Outdoors',
                    url:
                        'https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5hc3pha2FyaWEiLCJhIjoiY2tiZHM0cmZsMGVxcjJubWtidzJvNnBkZCJ9.daQ2O29WJOpI7jJV1lMD3w',
                    options: {
                        attribution: 'Tiles &copy; Source: MapBox'
                    }
                },
                {
                    name: 'Esri World Imagery',
                    url:
                        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    options: {
                        attribution:
                            'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    }
                }
            ],
            legendItems: [
                { text: 'Below 5K', color: '#f5f0eb' },
                { text: '5K to 10K', color: '#f7efd4' },
                { text: '10K to 50K', color: '#f5eaad' },
                { text: '50K to 100K', color: '#fcd783' },
                { text: '100K to 500K', color: '#fabc70' },
                { text: '500K to 1M', color: '#fa9247' },
                { text: '1M to 2M', color: '#E53935' },
                { text: 'Above 2M', color: '#B71C1C' }
            ]
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
        tilesUrl() {
            return this.tiles.find((tile) => tile.name === this.selectedProviders).url
        },
        tilesOptions() {
            return this.tiles.find((tile) => tile.name === this.selectedProviders).options
        },
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
                            fillOpacity: this.fillOpacity
                        }
                    }
                    if (totalCases < 10000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#f7efd4',
                            fillOpacity: this.fillOpacity
                        }
                    }
                    if (totalCases < 50000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#f5eaad',
                            fillOpacity: this.fillOpacity
                        }
                    } else if (totalCases < 100000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#fcd783',
                            fillOpacity: this.fillOpacity
                        }
                    } else if (totalCases < 500000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#fabc70',
                            fillOpacity: this.fillOpacity
                        }
                    } else if (totalCases < 1000000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#fa9247',
                            fillOpacity: this.fillOpacity
                        }
                    } else if (totalCases < 2000000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#E53935',
                            fillOpacity: this.fillOpacity
                        }
                    } else if (totalCases > 2000000) {
                        return {
                            weight: 1,
                            color: '#1A237E',
                            opacity: 1,
                            fillColor: '#B71C1C',
                            fillOpacity: this.fillOpacity
                        }
                    } else {
                        return {
                            weight: 1,
                            color: '#ddd',
                            opacity: 1,
                            fillColor: '#ddd',
                            fillOpacity: this.fillOpacity
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
                function numbersToComma(num) {
                    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                const confirmedCases = feature.properties.total_cases
                    ? numbersToComma(feature.properties.total_cases)
                    : 'No Data'
                const deaths = feature.properties.deaths ? numbersToComma(feature.properties.deaths) : 'No Data'
                const active = feature.properties.active_cases
                    ? numbersToComma(feature.properties.active_cases)
                    : 'No Data'
                const recovered = feature.properties.recovered
                    ? numbersToComma(feature.properties.recovered)
                    : 'No Data'
                layer.bindTooltip(
                    `<div>
                        <div>Country: ${feature.properties.name}</div>
                        <div>Confirmed Cases: ${confirmedCases}</div>
                        <div>Active Cases: ${active}</div>
                        <div>Deaths: ${deaths}</div>
                        <div>Recovered: ${recovered}</div>
                    </div>`,
                    {
                        permanent: false,
                        sticky: true,
                        className: 'tool-tip-style'
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

.tool-tip-style {
    padding: 200px;
    background: red;
}

.popupCustom .leaflet-popup-tip,
.popupCustom .leaflet-popup-content-wrapper {
    background: #f80c0c !important;
    color: #234c5e !important;
}

#legend {
    position: absolute;
    z-index: 5;
    top: 14px;
    right: 14px;
}

#basemap {
    position: absolute;
    z-index: 5;
    top: 12px;
    left: 56px;
}
</style>
