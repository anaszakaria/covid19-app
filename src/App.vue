<template>
    <v-app>
        <!-- APP HEADER -->
        <app-header
            v-on:toggleLeftPanel="toggleLeftPanel"
            v-on:toggleFixedRightPanel="toggleFixedRightPanel"
        ></app-header>

        <!-- LEFT PANEL -->
        <!-- <v-navigation-drawer clipped v-model="leftPanel" app>
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
        </v-navigation-drawer> -->
        <left-panel :leftPanel="leftPanel"></left-panel>

        <!-- FIXED PANEL -->
        <v-navigation-drawer v-model="fixedRightPanel" fixed right temporary></v-navigation-drawer>

        <!-- CONTENT AREA -->
        <v-main>
            <transition name="slide">
                <router-view></router-view>
            </transition>
        </v-main>

        <!-- APP FOOTER -->
        <app-footer></app-footer>
    </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import LeftPanel from '@/components/LeftPanel'
import AppFooter from '@/components/AppFooter'

export default {
    name: 'App',
    components: {
        AppHeader,
        LeftPanel,
        AppFooter
    },
    data: () => ({
        leftPanel: true,
        fixedRightPanel: false
    }),
    methods: {
        toggleLeftPanel() {
            this.leftPanel = !this.leftPanel
        },
        toggleFixedRightPanel() {
            this.fixedRightPanel = !this.fixedRightPanel
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
