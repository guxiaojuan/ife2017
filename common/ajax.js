const ajax = function(param){
    let ajaxData = {
        type: param.type || 'GET',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || '',
        async: param.async || 'true',
        contentType: param.contentType || 'application/x-www-form-urlencoded',
        success: param.success || function () {},
        beforeSend: param.beforeSend || function () {},
        error: param.error || function () {},
    }
    ajaxData.beforeSend()
    let xhr = createXMLHttpRequest()
    xhr.responseType = ajaxData.dataType
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async)
    xhr.setRequestHeader(ajaxData.contentType)
    xhr.send(ajaxData.data)
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                ajaxData.success(xhr.responseText)
            }else{
                ajaxData.error()
            }
        }
    }
}

function createXMLHttpRequest () {
    if(window.ActiveXObject)
        return new ActiveXObject('Microsoft.XMLHTTP')
    else if(window.XMLHttpRequest)
        return new XMLHttpRequest()
}

export default ajax