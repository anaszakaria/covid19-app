<template>
    <section id="mapviewer">
        <l-map class="map" :zoom="zoom" :center="center" style="height: 100%; width: 100%">
            <l-tile-layer :url="url" :attribution="attribution" />
            <l-geo-json v-if="showGeoJSON" :geojson="geojson" :options="options" :options-style="styleFunction" />
            <l-marker :lat-lng="marker" />
        </l-map>
    </section>
</template>

<script>
import { latLng } from 'leaflet'
// eslint-disable-next-line object-curly-newline
import { LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet'

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
            showGeoJSON: true,
            enableTooltip: true,
            zoom: 2,
            center: [48, -1.219482],
            geojson: null,
            fillColor: '#e4ce7f',
            lineColor: '#0598fa',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            marker: latLng(47.41322, -1.219482)
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
    }
}
</script>

<style lang="scss" scoped>
#mapviewer {
    height: 100%;
}
</style>
