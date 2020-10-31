module.exports = {
    devServer: {
        open: true, //配置自动启动浏览器 http://XXX.XXX.X.XX:7071/rest/XXX/
        hotOnly: true, // 热更新
        // lintOnSave: false, //是否开启eslint
        proxy:{
            '/api':{ //匹配 /api
                target:'https://api.qq.jsososo.com', //匹配 /api 后转换的地址
                changeOrigin: true,//运行跨域
                ws:true,
                secure:false,
                pathRewrite:{ //重写,把之前的清空
                    '^/api':''
                },
            }
        },
    },
};
