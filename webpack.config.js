/**
 * Created by guxiaojuan on 2017/9/21.
 */
const webpack = require('webpack')
const path = require('path')
const ExtectTextPlugin = require('extract-text-webpack-plugin')  //将样式文件独立出来

module.exports={
    devtool:'source-map',
    entry:{
        index:"./index.js"
    },
    output:{
        path: path.resolve(__dirname,'dist'),    //webpack的输出路径
        filename: '[name].[chunkhash].js' ,   //编译后的文件名
        // publicPath: './assets/'      //输出解析文件的目录
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                loader:ExtectTextPlugin.extract("style-loader","css-loader")
            },
            {
                test:/\.js[x]?$/,
                loader:"babel-loader",
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.js'),  //公共引用的模块独立出来做成一个common.js
        new ExtectTextPlugin("[name].css")
    ]
}