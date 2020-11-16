<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col sm="12">
                <h3>COVID-19 Statistics</h3>
                <v-card outlined tile>
                    <v-data-table
                        :headers="headers"
                        :items="countries"
                        :sort-by="['total_cases']"
                        :sort-desc="[true, false]"
                        must-sort
                        item-key="name"
                        class="elevation-1"
                        :search="search"
                        :loading="loadDataTable"
                        loading-text="Loading... Please wait"
                    >
                        <template v-slot:top>
                            <v-row>
                                <v-col sm="3">
                                    <v-text-field v-model="search" label="Search Country" class="mx-4"></v-text-field>
                                </v-col>
                                <v-col sm="2">
                                    <v-text-field
                                        v-model="total_cases"
                                        type="number"
                                        label="Total Cases (More than)"
                                    ></v-text-field>
                                </v-col>
                                <v-col sm="2">
                                    <v-text-field
                                        v-model="deaths"
                                        type="number"
                                        label="Total Deaths (More than)"
                                    ></v-text-field>
                                </v-col>
                                <v-col sm="2">
                                    <v-text-field
                                        v-model="active_cases"
                                        type="number"
                                        label="Active Cases (More than)"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </template>
                    </v-data-table>
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
            loadDataTable: false,
            search: '',
            total_cases: '',
            active_cases: '',
            deaths: '',
            countries: []
        }
    },
    computed: {
        headers() {
            return [
                {
                    text: 'Country',
                    value: 'name'
                },
                {
                    text: 'Total Cases',
                    value: 'total_cases',
                    filter: (value) => {
                        if (!this.total_cases) return true
                        return value > parseInt(this.total_cases)
                    }
                },
                { text: 'New Cases', value: 'change.total_cases' },
                {
                    text: 'Total Deaths',
                    value: 'deaths',
                    filter: (value) => {
                        if (!this.deaths) return true
                        return value > parseInt(this.deaths)
                    }
                },
                { text: 'New Deaths', value: 'change.deaths' },
                { text: 'Total Recovered', value: 'recovered' },
                { text: 'New Revocered', value: 'change.recovered' },
                {
                    text: 'Active Cases',
                    value: 'active_cases',
                    filter: (value) => {
                        if (!this.active_cases) return true
                        return value > parseInt(this.active_cases)
                    }
                },
                { text: 'Critical', value: 'critical' },
                { text: 'Total Tested', value: 'tested' }
            ]
        }
    },
    methods: {},
    mounted() {
        this.loadDataTable = true
        const options = {
            method: 'GET',
            url: 'https://coronavirus-map.p.rapidapi.com/v1/summary/latest',
            headers: {
                'x-rapidapi-key': process.env.VUE_APP_CORONAVIRUSMAP_RAPID_API_KEY,
                'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
            }
        }
        axios
            .request(options)
            .then((response) => {
                this.loadDataTable = false
                let dataArray = []
                const countries = response.data.data.regions
                for (const property in countries) {
                    dataArray.push(countries[property])
                }
                this.countries = dataArray
            })
            .catch(function(error) {
                this.loadDataTable = false
                console.error(error)
            })
    }
}
</script>
