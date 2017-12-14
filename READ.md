### webpack  
*  module.noParse 是忽略的library，这里不能含有import,export,define的调用
*  extract-text-webpack-plugin主要是为了将css样式抽离出来，防止将css打包到js中引起页面样式加载错误
*  服务端渲染的代码要运行在nodejs环境，和浏览器不同的是，服务端渲染代码需要采用commonjs规范同时不应该包含除js之外的文件比如css
*  webpack的模块热替换允许更新任何模块，而无需进行完全刷新（HMR）
*  autoprefixer 自动添加css3的浏览器厂商前缀
*  html-webpack-plugin  自动生成html模板
*  Decorator(装饰器)是用来修改类的行为，使用时需要安装babel-plugin-transform-decorators-legacy
*  file-loader 将文件发送到输出文件夹，并返回相对url
*  classnames模块用来支持react动态修改classname或者使用多个class
*  css-loader 和 style-loader
>   css-loader使能够通过@import和url(...)的方式来实现require,style-loader将所有计算后的样式加入页面中.
遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件，遇到“@import”等语句就将相应样式
文件引入（所以如果没有css-loader，就没法解析这类语句），最后计算完的css，将会使用style-loader生成
一个内容为最终解析完的css代码的style标签，放到head标签里。

*  webpack-dev-server和react-hot-loader的热替换区别
>   webpack-dev-server --hot只能即时刷新页面，但是更新前的状态无法保存
  react-hot-loader可以保留更新前的状态,因为他并不会刷新网页，只是把改的部分更新了

*  PostCSS的主要功能只有两个：第一个就是前面提到的把 CSS 解析成 JavaScript 可以操作的 AST，第二个就是调用插件来处理 AST 并得到结果。
*  react-router实现单页面切换时比较生硬，为了让切换更加缓和，加入css动画切换插件react-addons-css-transition-group
*  extract-text-webpack-plugin 按照配置将入口中的特定文件提取出来放在一个单独的文件，一般提取样式文件
*  copy-webpack-plugin 在webpack中拷贝文件或文件夹
*  friendly-errors-webpack-plugin 用于更友好的输出webpack的错误和警告


### npm包
1. cross-env ------解决跨平台设置NODE_ENV的问题
2. babel-preset-env ------不需要添加任何preset，根据设置智能转化代码
3. autoprefixer -----自动添加浏览器厂商前缀
