import axios from 'axios'
const COVID19_API = process.env.VUE_APP_COVID193_API
const CORONAVIRUS_MAP_API = process.env.VUE_APP_CORONAVIRUS_MAP_API
const CORONAVIRUS_MONITOR_API = process.env.VUE_APP_CORONAVIRUS_MONITOR_API

const covid19APIOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.VUE_APP_RAPID_API_KEY,
        'x-rapidapi-host': 'covid-193.p.rapidapi.com'
    }
}

const coronaVirusMapAPIOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.VUE_APP_RAPID_API_KEY,
        'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
    }
}

const coronaVirusMonitorAPIOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.VUE_APP_RAPID_API_KEY,
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com'
    },
    onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        // console.log(progressEvent.loaded, progressEvent.total)
        // console.log(progressEvent.lengthComputable)
        // console.log(percentCompleted)
    }
}

export const statisticService = {
    async getHistoryByCountry(country) {
        return axios
            .request({
                ...covid19APIOptions,
                url: `${COVID19_API}/history`,
                params: { country }
            })
            .then((response) => {
                return response.data.response
            })
    },
    async getGlobalLatestSummary() {
        return axios
            .request({
                ...coronaVirusMapAPIOptions,
                url: `${CORONAVIRUS_MAP_API}/summary/latest`
            })
            .then((response) => {
                const summary = response.data.data.summary
                return summary
            })
    },
    async getCountriesLatestSummary() {
        return axios
            .request({
                ...coronaVirusMapAPIOptions,
                url: `${CORONAVIRUS_MAP_API}/summary/latest`
            })
            .then((response) => {
                let countries = []
                const regions = response.data.data.regions
                for (const property in regions) {
                    countries.push(regions[property])
                }
                const newData = {
                    summary: response.data.data.summary,
                    generatedOn: response.data.data.generated_on,
                    countries
                }
                return newData
            })
    },
    async getGlobalTrendingSummary() {
        return axios
            .request({
                ...coronaVirusMapAPIOptions,
                url: `${CORONAVIRUS_MAP_API}/spots/summary`
            })
            .then((response) => {
                let trendingSummary = []
                const trendingData = response.data.data
                for (const property in trendingData) {
                    const newData = {
                        eventDate: property,
                        ...trendingData[property]
                    }
                    trendingSummary.push(newData)
                }
                return trendingSummary
            })
    },
    async getLatestStatsByCountry(country) {
        return axios
            .request({
                ...coronaVirusMonitorAPIOptions,
                url: `${CORONAVIRUS_MONITOR_API}/latest_stat_by_country.php`,
                params: { country }
            })
            .then((response) => {
                return response.data.latest_stat_by_country[0]
            })
    }
}
