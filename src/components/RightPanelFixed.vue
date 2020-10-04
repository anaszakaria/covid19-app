<template>
    <v-navigation-drawer v-model="fixedRightPanel" fixed right temporary>
        <v-list dense>
            <v-list-item @click.stop="toggleTheme">
                <v-list-item-action>
                    <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Toggle Theme</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { EventBus } from '@/main'

export default {
    components: {},
    data() {
        return {
            fixedRightPanel: false
        }
    },
    methods: {
        toggleFixedRightPanel() {
            this.fixedRightPanel = !this.fixedRightPanel
        },
        toggleTheme() {
            this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
        }
    },
    computed: {},
    created() {
        EventBus.$on('toggleFixedRightPanel', (payload) => {
            this.toggleFixedRightPanel()
        })
    }
}
</script>

<style lang="scss" scoped></style>
