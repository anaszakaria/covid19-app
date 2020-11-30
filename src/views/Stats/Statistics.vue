<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col sm="12">
                <h3 class="font-weight-medium">COVID-19 Statistics - Last Updated on {{ lastUpdatedOn }}</h3>
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
                            <v-chip label dark color="orange">+{{ item.change.total_cases | numberWithCommas }}</v-chip>
                        </template>
                        <template v-slot:[`item.deaths`]="{ item }">
                            {{ item.deaths | numberWithCommas }}
                        </template>
                        <template v-slot:[`item.change.deaths`]="{ item }">
                            <v-chip label dark color="red darken-1"
                                >+{{ item.change.deaths | numberWithCommas }}</v-chip
                            >
                        </template>
                        <template v-slot:[`item.recovered`]="{ item }">
                            {{ item.recovered | numberWithCommas }}
                        </template>
                        <template v-slot:[`item.change.recovered`]="{ item }">
                            <v-chip label dark color="green">+{{ item.change.recovered | numberWithCommas }}</v-chip>
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
import { toDate, format, fromUnixTime } from 'date-fns'
import { statisticService } from '@/services/statisticService'

export default {
    data() {
        return {
            loadDataTable: false,
            countries: [],
            countryNames: [],
            selectedCountries: [],
            total_cases: '',
            active_cases: '',
            deaths: '',
            generatedOn: '',
            tableHeight: ''
        }
    },
    methods: {
        resetTableHeight() {
            if (window.innerHeight < 500) {
                return
            }
            this.tableHeight = window.innerHeight - 280
        },
        async getCountriesLatestSummary() {
            this.loadDataTable = true
            try {
                const response = await statisticService.getCountriesLatestSummary()
                this.countries = response.countries
                this.generatedOn = response.generatedOn
                this.countryNames = this.countries.map((country) => country.name)
            } catch (error) {
                console.log(error.response)
            } finally {
                this.loadDataTable = false
            }
        }
    },
    computed: {
        lastUpdatedOn() {
            if (this.generatedOn) {
                return fromUnixTime(this.generatedOn)
            }
            return '...loading'
        },
        filteredCountries() {
            if (this.selectedCountries.length === 0) {
                return this.countries
            } else {
                return this.countries.filter((country) => {
                    return this.selectedCountries.includes(country.name)
                })
            }
        },
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
    created() {
        window.addEventListener('resize', this.resetTableHeight)
        this.getCountriesLatestSummary()
    },
    mounted() {
        this.resetTableHeight()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resetTableHeight)
    }
}
</script>

<style lang="scss" scoped></style>
