<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col sm="12">
                <h3>COVID-19 Statistics for {{ country }}</h3>
                <v-card outlined tile>
                    Country Content
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            isLoading: false,
            country: ''
        }
    },
    computed: {},
    methods: {},
    mounted() {
        this.country = this.$route.params.country
    }
}
</script>
