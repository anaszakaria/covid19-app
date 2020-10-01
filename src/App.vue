<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"
                />
            </div>

            <v-spacer></v-spacer>

            <v-btn @click="toggletheme">
                <span class="mr-2">Toggle Theme</span>
                <v-icon>mdi-eject</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <HelloWorld />
        </v-main>
    </v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'App',
    components: {
        HelloWorld
    },
    data() {
        return {}
    },
    methods: {
        toggletheme() {
            this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
        }
    }
}
</script>
