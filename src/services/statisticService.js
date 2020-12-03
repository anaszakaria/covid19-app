import axios from 'axios'

const coronaVirusMapAPIOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.VUE_APP_RAPID_API_KEY,
        'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
    },
    onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        // console.log(progressEvent.loaded, progressEvent.total)
        // console.log(progressEvent.lengthComputable)
        // console.log(percentCompleted)
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
    getGlobalLatestSummary() {
        return axios
            .request({
                ...coronaVirusMapAPIOptions,
                url: `${process.env.VUE_APP_CORONAVIRUS_MAP_API}/summary/latest`
            })
            .then((response) => {
                const summary = response.data.data.summary
                return summary
            })
    },
    getCountriesLatestSummary() {
        return axios
            .request({
                ...coronaVirusMapAPIOptions,
                url: `${process.env.VUE_APP_CORONAVIRUS_MAP_API}/summary/latest`
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
    getGlobalTrendingSummary() {
        return axios
            .request({
                ...coronaVirusMapAPIOptions,
                url: `${process.env.VUE_APP_CORONAVIRUS_MAP_API}/spots/summary`
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
    getWorldTotalStat() {
        return axios
            .request({
                ...coronaVirusMonitorAPIOptions,
                url: `${process.env.VUE_APP_CORONAVIRUS_MONITOR_API}/worldstat.php`
            })
            .then((response) => {
                return response.data
            })
    },
    getCasesByCountry() {
        return axios
            .request({
                ...coronaVirusMonitorAPIOptions,
                url: `${process.env.VUE_APP_CORONAVIRUS_MONITOR_API}/cases_by_country.php`
            })
            .then((response) => {
                return response.data
            })
    },
    getHistoryByCountry(country) {
        return axios
            .request({
                ...coronaVirusMonitorAPIOptions,
                url: `${process.env.VUE_APP_CORONAVIRUS_MONITOR_API}/cases_by_particular_country.php`,
                params: { country }
            })
            .then((response) => {
                return response.data.stat_by_country
            })
    },
    getLatestStatsByCountry(country) {
        return axios
            .request({
                ...coronaVirusMonitorAPIOptions,
                url: `${process.env.VUE_APP_CORONAVIRUS_MONITOR_API}/latest_stat_by_country.php`,
                params: { country }
            })
            .then((response) => {
                return response.data.latest_stat_by_country[0]
            })
    }
}
