module.exports = {
    devServer: {
        proxy: {
            "^/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
            },
        },
    },
    runtimeCompiler: true,
    productionSourceMap: false,

    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
};
