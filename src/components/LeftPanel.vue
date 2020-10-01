<template lang="html">
    <section>
        <v-navigation-drawer app :width="leftPanelWidth" fixed v-model="leftPanel" clipped>
            <v-btn color="success">Test</v-btn>
        </v-navigation-drawer>
        <!-- FIXED TEMPORARY LEFT PANEL -->
        <v-navigation-drawer temporary :width="leftPanelWidth" v-model="leftDrawer" fixed></v-navigation-drawer>
    </section>
</template>

<script>
import { EventBus } from '@/main'

export default {
    components: {},
    data() {
        return {
            leftPanel: true,
            leftDrawer: null,
            leftPanelWidth: 299
        }
    },
    methods: {
        toggleLeftPanel() {
            this.leftPanel = !this.leftPanel
        },
        showLeftPanel() {
            this.leftPanel = true
        },
        hideLeftPanel() {
            this.leftPanel = false
        }
    },
    computed: {},
    created() {
        EventBus.$on('toggleLeftPanel', (payload) => {
            this.toggleLeftPanel()
        })
        EventBus.$on('hideLeftPanel', (payload) => {
            this.hideLeftPanel()
        })
        EventBus.$on('showLeftPanel', (payload) => {
            this.showLeftPanel()
        })
    }
}
</script>

<style lang="scss" scoped></style>
