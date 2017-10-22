/**
 * Created by guxiaojuan on 2017/9/21.
 */

function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['hello','webpack'],'');
    return element
}

document.body.appendChild(component());