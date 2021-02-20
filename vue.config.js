module.exports = {
    devServer: {
        port: 3333,
        open: true
    },
    publicPath: process.env.NODE_ENV === "production" ? "/vue-manage-system" : "/",
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/assets/scss/_variable.scss"; '
            }
        }
    }
};
