// const proxy = require('http-proxy-middleware')
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports =function(app){
    app.use(
        createProxyMiddleware('/api',{
            target:"https://api.trtst.com/",
            changeOrigin:true,
            pathRewrite:{'^/api':''},
        })
    )
}