import axios from 'axios'

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.VUE_APP_CORONAVIRUSMAP_RAPID_API_KEY,
        'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
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
                ...options,
                url: `${process.env.VUE_APP_CORONAVIRUSMAP_API}/summary/latest`
            })
            .then((response) => {
                const summary = response.data.data.summary
                return summary
            })
    },
    getCountriesLatestSummary() {
        return axios
            .request({
                ...options,
                url: `${process.env.VUE_APP_CORONAVIRUSMAP_API}/summary/latest`
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
                ...options,
                url: `${process.env.VUE_APP_CORONAVIRUSMAP_API}/spots/summary`
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
    getTrendingSummaryByCountry(country) {
        return axios
            .request({
                ...options,
                url: `${process.env.VUE_APP_CORONAVIRUSMAP_API}/spots/day`,
                params: { region: country }
            })
            .then((response) => {
                return response.data
            })
    }
}
