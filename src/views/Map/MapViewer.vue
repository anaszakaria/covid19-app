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
            <l-geo-json v-if="showGeoJSON" :geojson="geojson" :options="options" :options-style="styleFunction" />
            <l-marker :lat-lng="marker" />
        </l-map>
    </section>
</template>

<script>
import { LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet'
import { latLng, Icon } from 'leaflet'
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
            fillColor: '#e4ce7f',
            lineColor: '#0598fa',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            marker: latLng(2.9264, 101.6964)
        }
    },
    methods: {
        async getCasesByCountry() {
            this.isLoading = true
            try {
                const response = await statisticService.getCasesByCountry()
                this.summary = response
                console.log(this.summary.countries_stat)
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
                onEachFeature: this.onEachFeatureFunction
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
                layer.bindTooltip(`<div>Country:${feature.properties.name}</div>`, {
                    permanent: false,
                    sticky: true
                })
            }
        }
    },
    created() {
        const geojsonData = process.env.CountryGEOJSON
        this.geojson = geojsonData
        console.log(this.geojson)
        this.getCasesByCountry()
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
