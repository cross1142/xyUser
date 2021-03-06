module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://59.110.138.169',
                changeOrigin: true
            },
            '^/admin': {
                target: 'http://59.110.138.169',
                changeOrigin: true
            },
            '/ms': {
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            }
        }
    }
}