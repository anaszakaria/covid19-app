<template>
    <v-app-bar app dense flat color="primary" clipped-right clipped-left elevation="3">
        <v-app-bar-nav-icon color="white" @click.stop="toggleLeftPanel"></v-app-bar-nav-icon>
        <v-toolbar-title
            class="white--text text--darken-4 font-weight-500 pointer hidden-xs-only pointer"
            @click="gotoPage('/')"
            >COVID-19 Global Stats and Monitoring</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-switch dark color="white" v-model="darkTheme" label="Dark Theme" hide-details></v-switch>
        <v-tooltip v-for="list in menuLists" :key="list.toolTipText" bottom nudge-bottom="-10">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="gotoPage(list.url)">
                    <v-icon color="white">{{ list.icon }}</v-icon>
                </v-btn>
            </template>
            <span>{{ list.tooltipText }}</span>
        </v-tooltip>
        <template v-if="!userIsAuthenticated">
            <v-btn small class="ml-4" color="accent" @click="gotoPage('/signin')"
                ><v-icon small left>mdi-account</v-icon>Sign In</v-btn
            >
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
                        <v-list-item-avatar>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ user.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
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
            darkTheme: false,
            menuLists: [{ tooltipText: 'App Settings', icon: 'mdi-cogs', url: '/settings' }]
        }
    },
    watch: {
        darkTheme(value) {
            this.toggleTheme()
        }
    },
    methods: {
        signOut() {
            this.$store.dispatch('signOut')
        },
        toggleTheme() {
            this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
        },
        toggleLeftPanel() {
            EventBus.$emit('toggleLeftPanel')
        },
        toggleFixedRightPanel() {
            EventBus.$emit('toggleFixedRightPanel')
        },
        appBarAction(url, icon) {
            if (icon === 'mdi-cogs') this.toggleFixedRightPanel()
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
