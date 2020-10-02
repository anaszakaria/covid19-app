<template>
    <v-app>
        <!-- APP HEADER -->
        <app-header v-on:toggleLeftPanel="toggleLeftPanel"></app-header>

        <!-- LEFT PANEL -->
        <v-navigation-drawer clipped v-model="leftPanel" app>
            <v-list dense>
                <v-list-item @click.stop="rightPanelFixed = !rightPanelFixed">
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Open Fixed Right Panel Drawer</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
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

        <!-- FIXED PANEL -->
        <v-navigation-drawer v-model="leftPanelFixed" fixed temporary></v-navigation-drawer>
        <v-navigation-drawer v-model="rightPanelFixed" fixed right temporary></v-navigation-drawer>

        <!-- CONTENT AREA -->
        <v-main>
            <transition name="slide">
                <router-view></router-view>
            </transition>
        </v-main>

        <!-- APP FOOTER -->
        <v-footer app color="blue-grey" class="white--text">
            <span>Vuetify</span>
            <v-spacer></v-spacer>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
    name: 'App',
    components: {
        AppHeader
    },
    data: () => ({
        leftPanel: null,
        leftPanelFixed: false,
        rightPanelFixed: false
    }),
    methods: {
        toggleLeftPanel() {
            this.leftPanel = !this.leftPanel
        },
        toggleRightPanelFixed() {
            this.rightPanelFixed = !this.rightPanelFixed
        },
        toggleTheme() {
            this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
