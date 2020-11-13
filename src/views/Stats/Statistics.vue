<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col sm="12">
                <h3>COVID-19 Statistics</h3>
                <v-card outlined tile elevation="2">
                    <v-data-table
                        :headers="headers"
                        :items="countries"
                        item-key="name"
                        class="elevation-1"
                        :search="search"
                        :loading="loadDataTable"
                        loading-text="Loading... Please wait"
                    >
                        <template v-slot:top>
                            <v-row>
                                <v-col xs3>
                                    <v-text-field v-model="search" label="Search Country" class="mx-4"></v-text-field>
                                </v-col>
                                <v-col xs3>
                                    <v-text-field
                                        v-model="cases"
                                        type="number"
                                        label="Cases (Less than)"
                                    ></v-text-field>
                                </v-col>
                                <v-col xs3>
                                    <v-text-field
                                        v-model="deaths"
                                        type="number"
                                        label="Deaths (Less than)"
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
            cases: '',
            deaths: '',
            countries: [],
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%'
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%'
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%'
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%'
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%'
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%'
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%'
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%'
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%'
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%'
                }
            ]
        }
    },
    computed: {
        headers() {
            return [
                {
                    text: 'Country',
                    value: 'country'
                },
                {
                    text: 'Cases',
                    value: 'cases',
                    filter: (value) => {
                        if (!this.cases) return true
                        return value < parseInt(this.cases)
                    }
                },
                {
                    text: 'Deaths',
                    value: 'deaths',
                    filter: (value) => {
                        if (!this.deaths) return true
                        return value < parseInt(this.deaths)
                    }
                },
                { text: 'Recovered', value: 'recovered' }
            ]
        }
    },
    methods: {},
    mounted() {
        this.loadDataTable = true
        axios
            .get(`${process.env.VUE_APP_COVID19_MACHINE_LEARNING}/status`)
            .then((response) => {
                console.log(response.data)
                this.loadDataTable = false
                this.countries = response.data
            })
            .catch((error) => {
                this.loadDataTable = false
                console.log(error)
            })
    }
}
</script>
