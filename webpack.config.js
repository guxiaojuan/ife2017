/**
 * Created by guxiaojuan on 2017/9/21.
 */
const webpack = require('webpack')
const path = require('path')
const ExtectTextPlugin = require('extract-text-webpack-plugin')  //将样式文件独立出来
const rucksack = require('rucksack-css')  //一款基于postcss的css预处理器
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    devtool:'source-map',
    context: path.resolve(__dirname, "src"), //entry的根目录
    entry:{
        index:'./index.jsx',
        vendors:[   //第三方库入口,把一些公用的库打包到vendor.js
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'recharts',
            'react-addons-css-transition-group'     //实现页面切换的动画插件
        ]

    },
    output:{
        path: path.resolve(__dirname,'dist'),    //webpack的输出路径
        filename: '[name].js' ,   //编译后的文件名
        // publicPath: './assets/'      //输出解析文件的目录
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                loader:ExtectTextPlugin.extract("style-loader","css-loader","postcss-loader")
            },
            {
                test:/\.jsx?$/,
                loader:['babel-loader'],
                exclude:/node-modules/
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, "src/public/style"),
                // loader: "style!css!sass?sourceMap"
                loader:[
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({      //解决webpack打包文件体积过大的问题，webpack自带的压缩功能
            compress:{
                warnings:false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({   //公共引用的模块独立出来做成一个common.js
            name:'vendor',
            filename:'vendor.common.js'
        }),

        new ExtectTextPlugin("style.css"),  //提取出来的样式文件放到style.css文件里

        new webpack.DefinePlugin({
            'process.env':{NODE_ENV:JSON.stringify(process.env.NODE_ENV)}
        }),
        new webpack.LoaderOptionsPlugin({
            options:{
                postcss:[
                    rucksack({
                        autoprefixer:true
                    })
                ]
            }
        }),
        new HtmlWebpackPlugin({
            template:'./index.html'
        }),
        // new webpack.EnvironmentPlugin(['NODE_ENV'])

    ],
    devServer:{
        contentBase: path.resolve(__dirname, "src"),   //修改请求路径
        hot: true
    }
}