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
                <v-list-item v-if="userIsAuthenticated && userIsAdmin" to="/admin">
                    <v-list-item-icon>
                        <v-icon v-text="'mdi-tune'"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-regular body-2" v-text="'Admin Page'"></v-list-item-title>
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
                { icon: 'mdi-table-large', text: 'World Statistics', url: '/statistics' },
                { icon: 'mdi-map', text: '', url: '' },
                { icon: 'mdi-information', text: 'Information and Q&A', url: '/info-qna' },
                { icon: 'mdi-settings', text: 'App Settings', url: '/settings' }
            ]
        }
    },
    methods: {
        toggleLeftPanel() {
            this.leftPanel = !this.leftPanel
        },
        setDefaultCountry() {
            if (this.$store.getters.user) {
                this.savedCountry = this.$store.getters.user.savedCountry
            } else {
                this.savedCountry = 'Malaysia'
            }
            this.pageList[3].text = `Statistics: ${this.savedCountry}`
            this.pageList[3].url = `/countrystatistics/${this.savedCountry}`
        }
    },
    computed: {},
    created() {
        this.setDefaultCountry()
        EventBus.$on('toggleLeftPanel', (payload) => {
            this.toggleLeftPanel()
        })
        EventBus.$on('setDefaultCountry', (payload) => {
            this.setDefaultCountry()
        })
    }
}
</script>

<style lang="scss" scoped></style>
