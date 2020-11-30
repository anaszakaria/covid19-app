/* eslint-disable */
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    productionSourceMap: false,
    css: {
        sourceMap: true,
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/scss/utilities/_variables.scss";`
            },
        },
    },
    configureWebpack: {
        performance: {
            hints: 'warning', // enum
            maxAssetSize: 1048576, // int (in bytes),
            maxEntrypointSize: 1048576 // int (in bytes)
        },
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
                chunks: 'all'
            }
        }
    },
    chainWebpack: (config) => {
        config.output.chunkFilename(`js/[name].[id].[chunkhash:8].js`)
        config.resolve.alias
            .set('root', resolve('./'))
            .set('@', resolve('src'))
            .set('scss', resolve('src/assets/scss'))
            .set('img', resolve('src/assets/img'))
        config
            .entry('main')
            .add('@babel/polyfill')
            .add('./src/main.js')
        config.plugin('define').tap((definitions) => {
            definitions[0]['process.env']['CountryGEOJSON'] = JSON.stringify(
                require('./src/config/country_geojson.json')
            )
            return definitions
        })
    }
}
