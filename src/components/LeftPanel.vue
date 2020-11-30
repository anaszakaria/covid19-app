<template>
    <v-navigation-drawer clipped v-model="leftPanel" app>
        <v-list class="pt-0 pb-0" dense>
            <v-list-item-group color="primary">
                <v-list-item v-for="list in pageList" :key="list.text" :to="list.url">
                    <v-list-item-icon>
                        <v-icon v-text="list.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-regular body-2" v-text="list.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { EventBus } from '@/main'

export default {
    components: {},
    data() {
        return {
            leftPanel: true,
            pageList: [
                { icon: 'mdi-view-dashboard', text: 'Dashboard', url: '/dashboard' },
                { icon: 'mdi-map', text: 'Map Viewer', url: '/mapviewer' },
                { icon: 'mdi-earth', text: 'HighMaps', url: '/highmaps' },
                { icon: 'mdi-table-large', text: 'Statistics', url: '/statistics' },
                { icon: 'mdi-timer', text: 'Prediction', url: '/prediction' },
                { icon: 'mdi-chart-timeline', text: 'Timeline', url: '/timeline' }
            ]
        }
    },
    methods: {
        toggleLeftPanel() {
            this.leftPanel = !this.leftPanel
        }
    },
    computed: {},
    created() {
        EventBus.$on('toggleLeftPanel', (payload) => {
            this.toggleLeftPanel()
        })
    }
}
</script>

<style lang="scss" scoped></style>
