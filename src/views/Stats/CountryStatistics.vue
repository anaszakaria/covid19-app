<template>
    <v-container fluid>
        <v-row class="ma-0">
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'orange'"
                    :total="summary.total_cases"
                    :title="'Confirmed'"
                    :icon="'mdi-medical-bag'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'orange'"
                    :total="summary.new_cases"
                    :title="'New Cases'"
                    :icon="'mdi-medical-bag'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'darkgrey'"
                    :total="summary.active_cases"
                    :title="'Active'"
                    :icon="'mdi-pill'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'green'"
                    :total="summary.total_recovered"
                    :title="'Recovered'"
                    :icon="'mdi-plus-circle'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'red darken-1'"
                    :total="summary.total_deaths"
                    :title="'Deaths'"
                    :icon="'mdi-minus-circle'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <v-col xs="6" md="2">
                <StatusWidget
                    :widgetColor="'red darken-1'"
                    :total="summary.new_deaths"
                    :title="'New Deaths'"
                    :icon="'mdi-minus-circle'"
                    :preLoader="isLoadingSummary"
                ></StatusWidget>
            </v-col>
            <!-- TOTAL CASES -->
            <v-col xs="12" md="12">
                <v-card outlined elevation="1">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <HighStockLineChart
                        :data="totalCases"
                        :title="'Confirmed Cases'"
                        :subTitle="`Total Confirmed COVID-19 Cases for ${country}`"
                        :lineColor="'#FF9800'"
                    />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getUnixTime } from 'date-fns'
import { statisticService } from '@/services/statisticService'
import HighStockLineChart from '@/components/Charts/HighStockLineChart'
import StatusWidget from '@/components/Widgets/StatusWidget'

export default {
    components: {
        HighStockLineChart,
        StatusWidget
    },
    data() {
        return {
            isLoading: false,
            isLoadingSummary: false,
            summary: {},
            trendingData: [],
            activeCases: [],
            critical: [],
            deaths: [],
            recovered: [],
            tested: [],
            totalCases: []
        }
    },
    computed: {},
    methods: {
        formatHighstockData(array, category) {
            return array
                .map((item) => {
                    const timestamp = getUnixTime(new Date(item.record_date)) * 1000
                    if (item[category]) {
                        return [timestamp, parseInt(item[category].replace(/,/g, ''))]
                    }
                    return [timestamp, null]
                })
                .sort((a, b) => {
                    return a[0] - b[0]
                })
        },
        async getHistoryByCountry() {
            this.isLoading = true
            try {
                const response = await statisticService.getHistoryByCountry(this.country)
                this.trendingData = response
                this.activeCases = this.formatHighstockData(this.trendingData, 'active_cases')
                this.critical = this.formatHighstockData(this.trendingData, 'serious_critical')
                this.deaths = this.formatHighstockData(this.trendingData, 'total_deaths')
                this.recovered = this.formatHighstockData(this.trendingData, 'total_recovered')
                this.tested = this.formatHighstockData(this.trendingData, 'total_tests')
                this.totalCases = this.formatHighstockData(this.trendingData, 'total_cases')
            } catch (error) {
                console.log(error.response)
            } finally {
                this.isLoading = false
            }
        },
        async getLatestStatsByCountry() {
            this.isLoadingSummary = true
            try {
                const response = await statisticService.getLatestStatsByCountry(this.country)
                this.summary = response
                console.log(object)
            } catch (error) {
            } finally {
                this.isLoadingSummary = false
            }
        }
    },
    created() {
        this.country = this.$route.params.country
        this.getHistoryByCountry()
        this.getLatestStatsByCountry()
    },
    mounted() {}
}
</script>
