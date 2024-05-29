const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: '',
    transpileDependencies: true,
    lintOnSave:false,
    productionSourceMap:false,
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "./src/assets/css/variables.scss";`,
            },
        },    
    }
})
