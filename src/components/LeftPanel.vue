<template>
    <v-navigation-drawer clipped v-model="leftPanel" app>
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
export default {
    props: {
        leftPanel: {
            type: Boolean,
            required: true
        }
    },
    components: {},
    data() {
        return {}
    },
    methods: {
        toggleTheme() {
            this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
        }
    },
    computed: {},
    created() {}
}
</script>

<style lang="scss" scoped></style>
