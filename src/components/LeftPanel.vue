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
            savedCountry: '',
            pageList: [
                { icon: 'mdi-view-dashboard', text: 'Dashboard', url: '/dashboard' },
                { icon: 'mdi-earth', text: 'Map Viewer', url: '/mapviewer' },
                { icon: 'mdi-earth', text: 'HighMaps', url: '/highmaps' },
                { icon: 'mdi-table-large', text: 'World Statistics', url: '/statistics' },
                { icon: 'mdi-map', text: '', url: '' },
                { icon: 'mdi-information', text: 'Information and Q&A', url: '/info-qna' },
                { icon: 'mdi-settings', text: 'App Settings', url: '/settings' },
                { icon: 'mdi-tune', text: 'Admin Page', url: '/admin' }
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
        this.savedCountry = this.$store.getters.savedCountry
        this.pageList[4].text = `Statistics: ${this.savedCountry}`
        this.pageList[4].url = `/countrystatistics/${this.savedCountry}`
        EventBus.$on('toggleLeftPanel', (payload) => {
            this.toggleLeftPanel()
        })
    }
}
</script>

<style lang="scss" scoped></style>
