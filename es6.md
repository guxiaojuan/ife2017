## 扩展运算符 (...) ##
###  js不提供求数组最大元素的函数，只能用Math.max, 但需要将数组先转换成参数序列
    Math.max.apply(null,[1,2,3])
    Math.max(...[1,2,3])  
###  push方法的参数不能是数组，ES5也需要借助apply
    Array.protoype.push.apply(arr1,arr2)
    arr1.push(...arr2)    
###  复制数组
    arr2 = arr1.concat()
    arr2 = [...arr1] || [...arr2] = arr1   
###  合并数组
    arr1.concat(arr2)
    [...arr1,...arr2] 
###  将字符串转变为数组
    [...'hello']
    
## Array.from 是将类似数组的对象和可遍历的对象转化为数组，如DOM对象的nodeList集合和arguments对象.第二个参数可以代替map函数 ##

## Array.of  是将一组值转化为数组，代替Array() 和 new Array() ##
