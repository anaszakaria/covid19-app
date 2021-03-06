<template>
    <v-container fluid>
        <h4 class="font-weight-medium ml-3 mb-1">World COVID-19 Statistics - Updated on {{ lastUpdatedOn }}</h4>
        <v-row class="ma-0">
            <v-col sm="12">
                <v-card outlined tile>
                    <v-data-table
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
                            <v-row class="pt-1 pb-0">
                                <v-col cols="12" xs="12" sm="10">
                                    <v-autocomplete
                                        color="accent"
                                        @change="enableSaveButton"
                                        dense
                                        v-model="selectedCountries"
                                        :items="sortedCountryNames"
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
                                <v-col cols="12" xs="12" sm="2" v-if="userIsAuthenticated">
                                    <v-btn
                                        small
                                        color="primary"
                                        elevation="0"
                                        :disabled="disableSaveBtn"
                                        :loading="savingSelectedCountries"
                                        @click="saveQuery"
                                        >Save Query</v-btn
                                    >
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:[`item.name`]="{ item }">
                            <a @click="gotoPage(`/countrystatistics/${item.name}`)">{{ item.name }}</a>
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
        <v-snackbar color="accent" v-model="snackbar" timeout="1000">
            {{ snackbarMsg }}
        </v-snackbar>
    </v-container>
</template>

<script>
import { toDate, format, fromUnixTime } from 'date-fns'
import { statisticService } from '@/services/statisticService'
import { userService } from '@/services/userService'

export default {
    data() {
        return {
            loadDataTable: false,
            disableSaveBtn: true,
            snackbar: false,
            snackbarMsg: '',
            savingSelectedCountries: false,
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
        },
        lastUpdatedOn() {
            if (this.generatedOn) {
                const date = new Date(this.generatedOn * 1000)
                return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            }
            return '.....'
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
        sortedCountryNames() {
            return this.countryNames.sort()
        }
    },
    methods: {
        enableSaveButton() {
            this.disableSaveBtn = false
        },
        async saveQuery() {
            this.disableSaveBtn = true
            this.savingSelectedCountries = true
            try {
                const result = await userService.updateUserSelectedCountries(
                    this.$store.getters.user.userId,
                    this.selectedCountries
                )
                this.$store.dispatch('setSelectedCountries', this.selectedCountries)
                localStorage.setItem('user', JSON.stringify(this.$store.getters.user))
                this.snackbar = true
                this.snackbarMsg = result.message
            } catch (error) {
                console.log(error.response)
            } finally {
                this.savingSelectedCountries = false
            }
        },
        resetTableHeight() {
            if (window.innerHeight < 500) {
                return
            }
            this.tableHeight = window.innerHeight - 280
        },
        gotToCountryStatisticsPage(country) {
            let formattedCountry = country === 'South Korea' ? 'S-Korea' : country.replace(/ /g, '-')
            this.gotoPage(`/statistics/${formattedCountry}`)
        },
        async getCountriesLatestSummary() {
            this.loadDataTable = true
            try {
                const result = await statisticService.getCountriesLatestSummary()
                this.countries = result.countries
                this.generatedOn = result.generatedOn
                this.countryNames = this.countries.map((country) => country.name)
            } catch (error) {
                console.log(error.response)
            } finally {
                this.loadDataTable = false
            }
        }
    },
    created() {
        if (this.$store.getters.user) {
            this.selectedCountries = this.$store.getters.user.selectedCountries
        }
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

<style lang="scss" scoped>
a {
    color: #1e88e5;
}
</style>
