<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col sm="12">
                <h3>COVID-19 Statistics</h3>
                <v-card outlined tile>
                    <v-data-table
                        id="statistics-table"
                        :height="tableHeight"
                        fixed-header
                        :headers="headers"
                        :items="filteredCountries"
                        :sort-by="['total_cases']"
                        :sort-desc="[true, false]"
                        must-sort
                        item-key="name"
                        class="elevation-1"
                        :search="search"
                        :loading="loadDataTable"
                        loading-text="Loading... Please wait"
                        :footer-props="{
                            'items-per-page-options': [15, 30, -1]
                        }"
                        :items-per-page="-1"
                    >
                        <template v-slot:top>
                            <v-row>
                                <v-col sm="5">
                                    <v-autocomplete
                                        v-model="selectedCountries"
                                        :items="countryNames"
                                        :loading="loadDataTable"
                                        chips
                                        small-chips
                                        deletable-chips
                                        clearable
                                        label="Search Country"
                                        multiple
                                        hide-no-data
                                        class="mx-2"
                                    ></v-autocomplete>
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
                        <template v-slot:[`item.name`]="{ item }">
                            <a @click="gotoPage(`/statistics/${item.name}`)">{{ item.name }}</a>
                        </template>
                        <template v-slot:[`item.total_cases`]="{ item }">
                            {{ item.total_cases | numberWithCommas }}
                        </template>
                        <template v-slot:[`item.change.total_cases`]="{ item }">
                            <v-chip label dark color="orange">{{ item.change.total_cases | numberWithCommas }}</v-chip>
                        </template>
                        <template v-slot:[`item.deaths`]="{ item }">
                            {{ item.deaths | numberWithCommas }}
                        </template>
                        <template v-slot:[`item.change.deaths`]="{ item }">
                            <v-chip label dark color="red">{{ item.change.deaths | numberWithCommas }}</v-chip>
                        </template>
                        <template v-slot:[`item.recovered`]="{ item }">
                            {{ item.recovered | numberWithCommas }}
                        </template>
                        <template v-slot:[`item.change.recovered`]="{ item }">
                            <v-chip label dark color="green">{{ item.change.recovered | numberWithCommas }}</v-chip>
                        </template>
                        <template v-slot:[`item.active_cases`]="{ item }">
                            {{ item.active_cases | numberWithCommas }}
                        </template>
                        <template v-slot:[`item.critical`]="{ item }">
                            {{ item.critical | numberWithCommas }}
                        </template>
                        <template v-slot:[`item.tested`]="{ item }">
                            {{ item.tested | numberWithCommas }}
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
            countryNames: [],
            selectedCountries: [],
            search: '',
            total_cases: '',
            active_cases: '',
            deaths: '',
            countries: [],
            filteredCountries: [],
            tableHeight: ''
        }
    },
    watch: {
        selectedCountries(val) {
            if (this.selectedCountries.length === 0) {
                this.filteredCountries = this.countries
            } else {
                this.filteredCountries = this.countries.filter((country) => {
                    return this.selectedCountries.includes(country.name)
                })
            }
        }
    },
    computed: {
        headers() {
            return [
                {
                    text: 'Country',
                    value: 'name',
                    align: 'left',
                    divider: true,
                    width: '150px'
                },
                {
                    text: 'Total Cases',
                    value: 'total_cases',
                    align: 'right',
                    divider: true,
                    filter: (value) => {
                        if (!this.total_cases) return true
                        return value > parseInt(this.total_cases)
                    }
                },
                { text: 'New Cases', value: 'change.total_cases', align: 'right', divider: true },
                {
                    text: 'Total Deaths',
                    value: 'deaths',
                    align: 'right',
                    divider: true,
                    filter: (value) => {
                        if (!this.deaths) return true
                        return value > parseInt(this.deaths)
                    }
                },
                { text: 'New Deaths', value: 'change.deaths', align: 'right', divider: true },
                { text: 'Total Recovered', value: 'recovered', align: 'right', divider: true },
                { text: 'New Revocered', value: 'change.recovered', align: 'right', divider: true },
                {
                    text: 'Active Cases',
                    value: 'active_cases',
                    align: 'right',
                    divider: true,
                    filter: (value) => {
                        if (!this.active_cases) return true
                        return value > parseInt(this.active_cases)
                    }
                },
                { text: 'Critical', value: 'critical', align: 'right', divider: true },
                { text: 'Total Tested', value: 'tested', align: 'right' }
            ]
        }
    },
    methods: {
        resetTableHeight() {
            if (window.innerHeight < 500) {
                return
            }
            this.tableHeight = window.innerHeight - 280
        }
    },
    created() {
        window.addEventListener('resize', this.resetTableHeight)
    },
    mounted() {
        this.resetTableHeight()
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
                this.filteredCountries = dataArray
                this.countryNames = this.countries.map((country) => country.name)
            })
            .catch(function(error) {
                this.loadDataTable = false
                console.error(error)
            })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resetTableHeight)
    }
}
</script>

<style lang="scss" scoped></style>
