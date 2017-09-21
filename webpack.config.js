/**
 * Created by guxiaojuan on 2017/9/21.
 */
const webpack = require('webpack')
const path = require('path')
const ExtectTextPlugin = require('extract-text-webpack-plugin')  //将样式文件独立出来

module.exports={
    entry:{
        index:"index.js"
    },
    output:{
        path: path.resolve(__dirname,'bulid'),
        filename: '[name].bundle.js' ,
        publicPath: './build/'
    },
    module:{
        loaders:[
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
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtectTextPlugin("[name].css")
    ]
}