// const path = require('path')//引入path模块
// function resolve(dir){ return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
//     }
    

module.exports = {
    //关闭语法校验
    lintOnSave:false,
    //代理跨域
    devServer:{
        proxy:{
            '/api':{
                target:'http://39.38.123.211',
                // pathRewrite:{ '^/api':'' }
            }
        }
    },
    publicPath:'./'
}