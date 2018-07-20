/*
 * zengyq 2017-8-29 添加功能
 * <div class="tempWrap" style="overflow:hidden; position:relative;"></div>
 * 写入.bd外面，则dom不会重新生成影响后边添加事件，比如点击事件生效等
 * TouchSlide v1.1
 * javascript触屏滑动特效插件，移动端滑动特效，触屏焦点图，触屏Tab切换，触屏多图切换
 * defaultPlay:false, 禁用初始动效
 * 详情信息看官网http://www.SuperSlide2.com/TouchSlide/
 *
 *
 * 1.1 宽度自适应（修复安卓横屏时滑动范围不变的bug）
 * overflow:a.overflow || "hidden"	//外层是否超出隐藏  by Tommy
 * bdOverflow:a.bdOverflow || "hidden"	//内容区bd是否超出影藏
*/

var TouchSlide = function (ad) {
    ad = ad || {}
    var H = {
        slideCell: ad.slideCell || '#touchSlide',
        titCell: ad.titCell || '.hd li',
        mainCell: ad.mainCell || '.bd',
        effect: ad.effect || 'left',
        autoPlay: ad.autoPlay || false,
        delayTime: ad.delayTime || 200,
        interTime: ad.interTime || 2500,
        defaultIndex: ad.defaultIndex || 0,
        titOnClassName: ad.titOnClassName || 'on',
        autoPage: ad.autoPage || false,
        prevCell: ad.prevCell || '.prev',
        nextCell: ad.nextCell || '.next',
        pageStateCell: ad.pageStateCell || '.pageState',
        pnLoop: ad.pnLoop === 'undefined ' ? true : ad.pnLoop,
        startFun: ad.startFun || null,
        endFun: ad.endFun || null,
        switchLoad: ad.switchLoad || null,
        overflow: ad.overflow || 'hidden',
        bdOverflow: ad.bdOverflow || 'hidden',
        defaultPlay: ad.defaultPlay === undefined ? true : ad.defaultPlay
    }

    // 模拟jquery选择器
    var g = document.getElementById(H.slideCell.replace('#', ''))
    if (!g) {
        return false
    }
    var d = function (ak, ag) {
        ak = ak.split(' ')
        var aj = []
        ag = ag || document
        var ae = [ag]
        for (var ai in ak) {
            if (ak[ai].length !== 0) {
                aj.push(ak[ai])
            }
        }
        for (var ai in aj) {
            if (ae.length === 0) {
                return false
            }
            var al = []
            for (var a in ae) {
                if (aj[ai][0] === '#') {
                    al.push(document.getElementById(aj[ai].replace('#', '')))
                } else {
                    if (aj[ai][0] === '.') {
                        var am = ae[a].getElementsByTagName('*')
                        for (var ah = 0; ah < am.length; ah++) {
                            var af = am[ah].className
                            if (af && af.search(new RegExp('\\b' + aj[ai].replace('.', '') + '\\b')) !== -1) {
                                al.push(am[ah])
                            }
                        }
                    } else {
                        var am = ae[a].getElementsByTagName(aj[ai])
                        for (var ah = 0; ah < am.length; ah++) {
                            al.push(am[ah])
                        }
                    }
                }
            }
            ae = al
        }
        return ae.length === 0 || ae[0] === ag ? false : ae
    }
    var V = function (ae, a) {
        var i = document.createElement('div')
        i.innerHTML = a
        i = i.children[0]
        var af = ae.cloneNode(true)
        i.appendChild(af)
        ae.parentNode.replaceChild(i, ae)
        S = af; return i
    }
    var T = function (ae, a) {
        var i = 0
        if (ae.currentStyle) {
            i = ae.currentStyle[a]
        } else {
            i = getComputedStyle(ae, false)[a]
        }
        return parseInt(i.replace('px', ''))
    }

    var F = function (i, a) {
        if (!i || !a || (i.className && i.className.search(new RegExp('\\b' + a + '\\b')) !== -1)) {
            return
        }
        i.className += (i.className ? ' ' : '') + a
    }
    var t = function (i, a) {
        if (!i || !a || (i.className && i.className.search(new RegExp('\\b' + a + '\\b')) === -1)) {
            return
        }
        i.className = i.className.replace(new RegExp('\\s*\\b' + a + '\\b', 'g'), '')
    }
    var X = H.effect
    var q = d(H.prevCell, g)[0]
    var G = d(H.nextCell, g)[0]
    var E = d(H.pageStateCell)[0]
    var S = d(H.mainCell, g)[0]
    if (!S) {
        return false
    }
    var h = S.children.length
    var y = d(H.titCell, g)
    var o = y ? y.length : h
    var l = H.switchLoad
    var J = parseInt(H.defaultIndex)
    var x = parseInt(H.delayTime)
    var r = parseInt(H.interTime)
    var U = !((H.autoPlay === 'false' || H.autoPlay === false))
    var s = !((H.autoPage === 'false' || H.autoPage === false))
    var f = !((H.pnLoop === 'false' || H.pnLoop === false))
    var ab = J
    var W = null
    var Y = null
    var D = null
    var C = 0
    var z = 0
    var N = 0
    var L = 0
    var k = 0
    var O = (/hp-tablet/gi).test(navigator.appVersion)
    var v = 'ontouchstart' in window && !O
    var Q = v ? 'touchstart' : 'mousedown'
    var p = v ? 'touchmove' : ''
    var w = v ? 'touchend' : 'mouseup'
    var I = 0
    var B = S.parentNode.clientWidth
    var R
    var c
    var ac = h
    var u = H.defaultPlay
    if (o === 0) {
        o = h
    }
    if (s) {
        o = h
        y = y[0]
        y.innerHTML = ''
        var K = ''
        if (H.autoPage === true || H.autoPage === 'true') {
            for (var aa = 0; aa < o; aa++) {
                K += '<li>' + (aa + 1) + '</li>'
            }
        } else {
            for (var aa = 0; aa < o; aa++) {
                K += H.autoPage.replace('$', (aa + 1))
            }
        }
        y.innerHTML = K
        y = y.children
    }
    if (X === 'leftLoop') {
        ac += 2
        S.appendChild(S.children[0].cloneNode(true))
        S.insertBefore(S.children[h - 1].cloneNode(true), S.children[0])
    }
    R = g.querySelector('.tempWrap')
    if (!R) {
        if (H.overflow === 'hidden') {
            R = V(S, '<div class="tempWrap" style="overflow:hidden; position:relative;"></div>')
        } else {
            R = V(S, '<div class="tempWrap" style="position:relative;"></div>')
        }
    }
    if (H.bdOverflow === 'hidden') {
        S.style.cssText = 'width:' + ac * B + 'px;' + 'position:relative;overflow:hidden;padding:0;margin:0;'
    } else {
        S.style.cssText = 'width:' + ac * B + 'px;' + 'position:relative;padding:0;margin:0;'
    }
    for (var aa = 0; aa < ac; aa++) {
        S.children[aa].style.cssText = 'display:table-cell;vertical-align:top;width:' + B + 'px'
    }
    var Z = function () {
        if (typeof H.startFun === 'function') {
            H.startFun(J, o)
        }
    }
    var m = function () {
        if (typeof H.endFun === 'function') {
            H.endFun(J, o)
        }
    }
    var b = function (a) {
        var i = (X === 'leftLoop' ? J + 1 : J) + a
        var ae = function (ah) {
            var af = S.children[ah].getElementsByTagName('img')
            for (var ag = 0; ag < af.length; ag++) {
                if (af[ag].getAttribute(l)) {
                    af[ag].setAttribute('src', af[ag].getAttribute(l)); af[ag].removeAttribute(l)
                }
            }
        }
        ae(i)

        if (X === 'leftLoop') {
            switch (i) {
            case 0:ae(h); break
            case 1:ae(h + 1); break
            case h:ae(0); break
            case h + 1:ae(1); break
            }
        }
    }
    var n = function () {
        B = R.clientWidth; S.style.width = ac * B + 'px'
        for (var a = 0; a < ac; a++) {
            S.children[a].style.width = B + 'px'
        }
        var ae = X === 'leftLoop' ? J + 1 : J
        e(-ae * B, 0)
    }
    window.addEventListener('resize', n, false)
    var e = function (ae, i, a) {
        if (a) {
            a = a.style
        } else {
            a = S.style
        }
        a.webkitTransitionDuration = a.MozTransitionDuration = a.msTransitionDuration = a.OTransitionDuration = a.transitionDuration = i + 'ms'
        a.webkitTransform = 'translate(' + ae + 'px,0)' + 'translateZ(0)'
        a.msTransform = a.MozTransform = a.OTransform = 'translateX(' + ae + 'px)'
    }
    var M = function (af, ae) {
        var a = ae === undefined || ae ? x : 0
        switch (X) {
        case 'left':
            if (J >= o) {
                J = af ? J - 1 : 0
            } else {
                if (J < 0) {
                    J = af ? 0 : o - 1
                }
            }
            if (l != null) {
                b(0)
            }
            e((-J * B), a)
            ab = J
            break
        case 'leftLoop':
            if (l != null) {
                b(0)
            }
            e(-(J + 1) * B, a)
            if (J === -1) {
                Y = setTimeout(function () {
                    e(-o * B, 0)
                }, a)
                J = o - 1
            } else {
                if (J === o) {
                    Y = setTimeout(function () {
                        e(-B, 0)
                    }, a)
                    J = 0
                }
            }
            ab = J
            break
        }
        Z()
        D = setTimeout(function () {
            m()
        }, a)
        for (var ag = 0; ag < o; ag++) {
            t(y[ag], H.titOnClassName)
            if (ag === J) {
                F(y[ag], H.titOnClassName)
            }
        }
        if (f === false) {
            t(G, 'nextStop')
            t(q, 'prevStop')
            if (J === 0) {
                F(q, 'prevStop')
            } else {
                if (J === o - 1) {
                    F(G, 'nextStop')
                }
            }
        }
        if (E) {
            E.innerHTML = '<span>' + (J + 1) + '</span>/' + o
        }
    }
    M(false, u)
    if (U) {
        W = setInterval(function () {
            J++
            M()
        }, r)
    }
    if (y) {
        for (var aa = 0; aa < o; aa++) {
            (function () {
                var a = aa
                y[a].addEventListener('click', function (i) {
                    clearTimeout(Y); clearTimeout(D)
                    J = a
                    M()
                })
            })()
        }
    }
    if (G) {
        G.addEventListener('click', function (a) {
            if (f === true || J !== o - 1) {
                clearTimeout(Y)
                clearTimeout(D)
                J++
                M()
            }
        })
    }
    if (q) {
        q.addEventListener('click', function (a) {
            if (f === true || J !== 0) {
                clearTimeout(Y)
                clearTimeout(D)
                J--
                M()
            }
        })
    }
    var j = function (i) {
        clearTimeout(Y)
        clearTimeout(D)
        c = undefined
        N = 0
        var a = v ? i.touches[0] : i
        C = a.pageX
        z = a.pageY
        S.addEventListener(p, A, false)
        S.addEventListener(w, P, false)
    }
    var A = function (i) {
        if (v) {
            if (i.touches.length > 1 || i.scale && i.scale !== 1) {
                return
            }
        }
        i.stopPropagation()
        var a = v ? i.touches[0] : i
        N = a.pageX - C
        L = a.pageY - z
        if (typeof c === 'undefined') {
            c = !!(c || Math.abs(N) < Math.abs(L))
        }
        if (!c) {
            i.preventDefault()
            if (U) {
                clearInterval(W)
            }
            switch (X) {
            case 'left':if ((J === 0 && N > 0) || (J >= o - 1 && N < 0)) { N = N * 0.4 }e(-J * B + N, 0); break
            case 'leftLoop':e(-(J + 1) * B + N, 0); break
            }
            if (l != null && Math.abs(N) > B / 3) {
                b(N > -0 ? -1 : 1)
            }
        }
    }
    var P = function (a) {
        if (N === 0) {
            return
        }
        a.preventDefault()
        if (!c) {
            if (Math.abs(N) > B / 10) {
                N > 0 ? J-- : J++
            }
            M(true)
            if (U) {
                W = setInterval(function () {
                    J++
                    M()
                }, r)
            }
        }
        S.removeEventListener(p, A, false)
        S.removeEventListener(w, P, false)
    }
    S.addEventListener(Q, j, false)
}

export default TouchSlide
