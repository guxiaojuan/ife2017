/**
 * Created by guxiaojuan on 2017/9/21.
 */

let a=[1,2,3,4]

function test(num){
    let t=[...num]
    t[2]=t[1]+t[2]
    return t
}

test(a)
console.log(a)
