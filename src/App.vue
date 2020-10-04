<template>
    <v-app>
        <!-- APP HEADER -->
        <app-header></app-header>

        <!-- LEFT PANEL -->
        <left-panel></left-panel>

        <!-- FIXED PANEL -->
        <right-panel-fixed></right-panel-fixed>

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
import RightPanelFixed from '@/components/RightPanelFixed'
import AppFooter from '@/components/AppFooter'

export default {
    name: 'App',
    components: {
        AppHeader,
        LeftPanel,
        RightPanelFixed,
        AppFooter
    },
    data: () => ({}),
    methods: {}
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
