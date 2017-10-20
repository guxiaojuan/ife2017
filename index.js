function add (x,y){
    return x+y
}

some=[1,2,3]
// console.log(add(...some))
//
// console.log(add.apply(null,some))
// console.log(some)

cun=[2,3,4]
console.log(Array.prototype.push.apply(some,cun))
console.log(some)
console.log(cun)