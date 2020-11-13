<template>
    <v-app-bar app dense flat color="primary" clipped-right clipped-left>
        <v-app-bar-nav-icon v-if="userIsAuthenticated" color="white" @click.stop="toggleLeftPanel"></v-app-bar-nav-icon>
        <v-toolbar-title
            class="white--text text--darken-4 font-weight-500 pointer hidden-xs-only pointer"
            @click="gotoPage('/')"
            >COVID-19 Stats and Monitoring App v1.0</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <template v-if="userIsAuthenticated">
            <v-tooltip v-for="list in menuLists" :key="list.toolTipText" bottom nudge-bottom="-10">
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="appBarAction(list.url, list.icon)">
                        <v-icon color="white">{{ list.icon }}</v-icon>
                    </v-btn>
                </template>
                <span>{{ list.tooltipText }}</span>
            </v-tooltip>
        </template>
        <v-menu v-if="userIsAuthenticated" :close-on-content-click="false" offset-y nudge-bottom="2">
            <template #activator="{ on: menu }">
                <v-tooltip bottom nudge-bottom="-10">
                    <template #activator="{ on: tooltip }">
                        <v-btn icon v-on="{ ...tooltip, ...menu }">
                            <v-icon color="white">mdi-account</v-icon>
                        </v-btn>
                    </template>
                    <span>Sign Out</span>
                </v-tooltip>
            </template>
            <v-card>
                <v-list>
                    <v-list-item>
                        <!-- <v-list-item-avatar v-if="$store.getters.user.userInfos.imgURL">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-avatar> -->
                        <v-list-item-avatar>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-avatar>
                        <!-- <v-list-item-content>
                            <v-list-item-title>{{ user.userInfos.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ user.userAccesses.permission }}</v-list-item-subtitle>
                        </v-list-item-content> -->
                        <v-list-item-content>
                            <v-list-item-title>Anas Zakaria</v-list-item-title>
                            <v-list-item-subtitle>System Administrator</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn class="primaryGreen--text" icon>
                                <v-icon>mdi-earth</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed small @click="signOut">Sign Out</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
import { EventBus } from '@/main'

export default {
    data() {
        return {
            menuLists: [
                { tooltipText: 'Map Viewer', icon: 'mdi-map', url: '/' },
                { tooltipText: 'Digital Library', icon: 'mdi-library-books', url: '/digitallibrary/trainingmodules' },
                { tooltipText: 'Data Management', icon: 'mdi-file', url: '/datamanagement/facilitylist' },
                { tooltipText: 'Settings', icon: 'mdi-settings', url: null }
            ]
        }
    },
    methods: {
        signOut() {
            EventBus.$emit('hideLeftPanel')
            EventBus.$emit('hideRightPanel')
            this.$store.dispatch('signOut')
        },
        toggleLeftPanel() {
            EventBus.$emit('toggleLeftPanel')
        },
        toggleFixedRightPanel() {
            EventBus.$emit('toggleFixedRightPanel')
        },
        appBarAction(url, icon) {
            if (icon === 'mdi-settings') this.toggleFixedRightPanel()
            else this.gotoPage(url)
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        profileImg() {
            return true
        }
    }
}
</script>

<style lang="scss" scoped></style>
