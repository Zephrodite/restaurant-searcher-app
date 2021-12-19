require('dotenv').config()

module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].apiUrl = process.env.VUE_APP_AUTOCOMPLETE_KEY;
                return args;
            })
    }
}