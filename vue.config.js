/* eslint-disable */

const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/covid19_app/',
    outputDir: 'covid19_app',
    productionSourceMap: false,
    css: {
        sourceMap: true,
        loaderOptions: {
            sass: {
                // prependData: '@import "~@/assets/scss/main.scss"',
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
        // ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((match) => {
        //     config.module
        //         .rule('scss')
        //         .oneOf(match)
        //         .use('sass-loader')
        //         .tap((opt) => Object.assign(opt, { data: `@import '~@/assets/scss/utilities/variables.scss';` }))
        // })
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
