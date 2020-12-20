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
            <l-marker :lat-lng="marker" />
        </l-map>
    </section>
</template>

<script>
import { LMap, LTileLayer, LMarker, LGeoJson, LPolygon, LPolyline } from 'vue2-leaflet'
import { latLng, Icon, point, PolyUtil } from 'leaflet'
import { statisticService } from '@/services/statisticService'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
    name: 'MapViewer',
    components: {
        LMap,
        LTileLayer,
        LGeoJson,
        LMarker
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
            // fillColor: '#e4ce7f',
            // lineColor: '#0598fa',
            fillColor: '',
            lineColor: '',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            marker: latLng(2.9264, 101.6964)
        }
    },
    methods: {
        async getCountriesLatestSummary() {
            this.isLoading = true
            try {
                const result = await statisticService.getCountriesLatestSummary()
                this.summary = result
                // console.log(this.summary);
                this.geojson.features.map((item, i) => {
                    // let country = this.summary.countries.find(obj => obj.name == item.properties.name)
                    let country = this.summary.countries.find((obj) => obj.iso3166a3 == item.properties.iso_a3)
                    if (country) {
                        // const properties = Object.assign(item.properties, country)
                        // return item.properties = properties
                        return (item.properties = country)
                    }
                })
                // console.log(this.geojson.features[0].geometry.coordinates);
                // LPolygon(this.geojson.features[0].geometry.coordinates)
                // console.log(LPolygon(this.geojson.features[0].geometry.coordinates));
                // console.log(LPolygon([this.geojson.features[0].geometry.coordinates]).getBounds());
                // console.log(this.geojson);
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
                    // console.log(feature);
                    const totalCases = feature.properties.total_cases
                    if (totalCases < 10000) {
                        return {
                            weight: 1,
                            color: 'green',
                            opacity: 1,
                            fillColor: 'green',
                            fillOpacity: 0.5
                        }
                    }
                    if (totalCases < 10000) {
                        return {
                            weight: 1,
                            color: 'yellow',
                            opacity: 1,
                            fillColor: 'yellow',
                            fillOpacity: 0.5
                        }
                    } else if (totalCases < 100000) {
                        return {
                            weight: 1,
                            color: 'orange',
                            opacity: 1,
                            fillColor: 'orange',
                            fillOpacity: 0.5
                        }
                    } else if (totalCases >= 100000) {
                        return {
                            weight: 1,
                            color: 'red',
                            opacity: 1,
                            fillColor: 'red',
                            fillOpacity: 0.5
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
        styleFunction() {
            const { fillColor, lineColor } = this
            return {
                weight: 1,
                color: lineColor,
                opacity: 1,
                fillColor,
                fillOpacity: 0.5
            }
        },
        onEachFeatureFunction() {
            if (!this.enableTooltip) {
                return () => {}
            }
            return (feature, layer) => {
                console.log(feature.properties)
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
        // console.log(this.geojson)
        this.getCountriesLatestSummary()
        // console.log(LPolygon);
        var latlngs = [
            [
                [37, -109.05],
                [41, -109.03],
                [41, -102.05],
                [37, -102.04]
            ], // outer ring
            [
                [37.29, -108.58],
                [40.71, -108.58],
                [40.71, -102.5],
                [37.29, -102.5]
            ] // hole
        ]
        // console.log(point(300, 300));
        console.log(PolyUtil.clipPolygon(latlngs))
        // console.log(Point(101.6964, 2.9264));
        // LPolygon.latLngs = latlngs
        // console.log(LPolygon);

        // console.log(LPolygon(latlngs));
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
