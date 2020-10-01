<template>
    <v-app>
        <!-- APP HEADER -->
        <v-app-bar app clipped-left clipped-right color="blue-grey" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>COVID-19 Stats and Monitoring App</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
        </v-app-bar>

        <!-- LEFT PANEL -->
        <v-navigation-drawer clipped v-model="drawer" app>
            <v-list dense>
                <v-list-item @click.stop="left = !left">
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Open Temporary Drawer</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- RIGHT PANEL -->
        <v-navigation-drawer v-model="drawerRight" app clipped right>
            <v-list dense>
                <v-list-item @click.stop="right = !right">
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Open Temporary Drawer</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- FIXED PANEL -->
        <v-navigation-drawer v-model="left" fixed temporary></v-navigation-drawer>
        <v-navigation-drawer v-model="right" fixed right temporary></v-navigation-drawer>

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
export default {
    name: 'App',
    components: {
        // AppHeader
    },
    data: () => ({
        drawer: null,
        drawerRight: null,
        right: false,
        left: false
    }),
    methods: {
        // toggletheme() {
        //     this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
        // }
    }
}
</script>
