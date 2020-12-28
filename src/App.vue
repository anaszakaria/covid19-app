<template>
    <v-app>
        <!-- APP HEADER -->
        <app-header></app-header>

        <!-- LEFT PANEL -->
        <left-panel></left-panel>

        <!-- CONTENT AREA -->
        <v-main>
            <transition name="slide">
                <router-view></router-view>
            </transition>
        </v-main>
    </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import LeftPanel from '@/components/LeftPanel'

export default {
    name: 'App',
    components: {
        AppHeader,
        LeftPanel
    },
    data: () => ({}),
    methods: {}
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
