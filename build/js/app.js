var $jscomp = {
    scope: {}
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(t, e, r) {
    if (r.get || r.set)
        throw new TypeError("ES3 does not support getters and setters.");
    t != Array.prototype && t != Object.prototype && (t[e] = r.value)
}
,
$jscomp.getGlobal = function(t) {
    return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t
}
,
$jscomp.global = $jscomp.getGlobal(this),
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_",
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {}
    ,
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}
,
$jscomp.symbolCounter_ = 0,
$jscomp.Symbol = function(t) {
    return $jscomp.SYMBOL_PREFIX + (t || "") + $jscomp.symbolCounter_++
}
,
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var t = $jscomp.global.Symbol.iterator;
    t || (t = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")),
    "function" != typeof Array.prototype[t] && $jscomp.defineProperty(Array.prototype, t, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this)
        }
    }),
    $jscomp.initSymbolIterator = function() {}
}
,
$jscomp.arrayIterator = function(t) {
    var e = 0;
    return $jscomp.iteratorPrototype(function() {
        return e < t.length ? {
            done: !1,
            value: t[e++]
        } : {
            done: !0
        }
    })
}
,
$jscomp.iteratorPrototype = function(t) {
    return $jscomp.initSymbolIterator(),
    t = {
        next: t
    },
    t[$jscomp.global.Symbol.iterator] = function() {
        return this
    }
    ,
    t
}
,
$jscomp.array = $jscomp.array || {},
$jscomp.iteratorFromArray = function(t, e) {
    $jscomp.initSymbolIterator(),
    t instanceof String && (t += "");
    var r = 0
      , n = {
        next: function() {
            if (r < t.length) {
                var o = r++;
                return {
                    value: e(o, t[o]),
                    done: !1
                }
            }
            return n.next = function() {
                return {
                    done: !0,
                    value: void 0
                }
            }
            ,
            n.next()
        }
    };
    return n[Symbol.iterator] = function() {
        return n
    }
    ,
    n
}
,
$jscomp.polyfill = function(t, e, r, n) {
    if (e) {
        for (r = $jscomp.global,
        t = t.split("."),
        n = 0; n < t.length - 1; n++) {
            var o = t[n];
            o in r || (r[o] = {}),
            r = r[o]
        }
        t = t[t.length - 1],
        n = r[t],
        e = e(n),
        e != n && null != e && $jscomp.defineProperty(r, t, {
            configurable: !0,
            writable: !0,
            value: e
        })
    }
}
,
$jscomp.polyfill("Array.prototype.keys", function(t) {
    return t ? t : function() {
        return $jscomp.iteratorFromArray(this, function(t) {
            return t
        })
    }
}, "es6-impl", "es3");
var $jscomp$this = this;
!function(t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.anime = e()
}(this, function() {
    function t(t) {
        if (!X.col(t))
            try {
                return document.querySelectorAll(t)
            } catch (t) {}
    }
    function e(t, e) {
        for (var r = t.length, n = 2 <= arguments.length ? arguments[1] : void 0, o = [], a = 0; a < r; a++)
            if (a in t) {
                var i = t[a];
                e.call(n, i, a, t) && o.push(i)
            }
        return o
    }
    function r(t) {
        return t.reduce(function(t, e) {
            return t.concat(X.arr(e) ? r(e) : e)
        }, [])
    }
    function n(e) {
        return X.arr(e) ? e : (X.str(e) && (e = t(e) || e),
        e instanceof NodeList || e instanceof HTMLCollection ? [].slice.call(e) : [e])
    }
    function o(t, e) {
        return t.some(function(t) {
            return t === e
        })
    }
    function a(t) {
        var e, r = {};
        for (e in t)
            r[e] = t[e];
        return r
    }
    function i(t, e) {
        var r, n = a(t);
        for (r in t)
            n[r] = e.hasOwnProperty(r) ? e[r] : t[r];
        return n
    }
    function u(t, e) {
        var r, n = a(t);
        for (r in e)
            n[r] = X.und(t[r]) ? e[r] : t[r];
        return n
    }
    function s(t) {
        t = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(t, e, r, n) {
            return e + e + r + r + n + n
        });
        var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        t = parseInt(e[1], 16);
        var r = parseInt(e[2], 16)
          , e = parseInt(e[3], 16);
        return "rgba(" + t + "," + r + "," + e + ",1)"
    }
    function c(t) {
        function e(t, e, r) {
            return 0 > r && (r += 1),
            1 < r && --r,
            r < 1 / 6 ? t + 6 * (e - t) * r : .5 > r ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t
        }
        var r = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t);
        t = parseInt(r[1]) / 360;
        var n = parseInt(r[2]) / 100
          , o = parseInt(r[3]) / 100
          , r = r[4] || 1;
        if (0 == n)
            o = n = t = o;
        else {
            var a = .5 > o ? o * (1 + n) : o + n - o * n
              , i = 2 * o - a
              , o = e(i, a, t + 1 / 3)
              , n = e(i, a, t);
            t = e(i, a, t - 1 / 3)
        }
        return "rgba(" + 255 * o + "," + 255 * n + "," + 255 * t + "," + r + ")"
    }
    function f(t) {
        if (t = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t))
            return t[2]
    }
    function l(t) {
        return -1 < t.indexOf("translate") || "perspective" === t ? "px" : -1 < t.indexOf("rotate") || -1 < t.indexOf("skew") ? "deg" : void 0
    }
    function p(t, e) {
        return X.fnc(t) ? t(e.target, e.id, e.total) : t
    }
    function d(t, e) {
        if (e in t.style)
            return getComputedStyle(t).getPropertyValue(e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0"
    }
    function m(t, e) {
        return X.dom(t) && o(N, e) ? "transform" : X.dom(t) && (t.getAttribute(e) || X.svg(t) && t[e]) ? "attribute" : X.dom(t) && "transform" !== e && d(t, e) ? "css" : null != t[e] ? "object" : void 0
    }
    function g(t, r) {
        var n = l(r)
          , n = -1 < r.indexOf("scale") ? 1 : 0 + n;
        if (t = t.style.transform,
        !t)
            return n;
        for (var o = [], a = [], i = [], u = /(\w+)\((.+?)\)/g; o = u.exec(t); )
            a.push(o[1]),
            i.push(o[2]);
        return t = e(i, function(t, e) {
            return a[e] === r
        }),
        t.length ? t[0] : n
    }
    function y(t, e) {
        switch (m(t, e)) {
        case "transform":
            return g(t, e);
        case "css":
            return d(t, e);
        case "attribute":
            return t.getAttribute(e)
        }
        return t[e] || 0
    }
    function h(t, e) {
        var r = /^(\*=|\+=|-=)/.exec(t);
        if (!r)
            return t;
        var n = f(t) || 0;
        switch (e = parseFloat(e),
        t = parseFloat(t.replace(r[0], "")),
        r[0][0]) {
        case "+":
            return e + t + n;
        case "-":
            return e - t + n;
        case "*":
            return e * t + n
        }
    }
    function v(t, e) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
    }
    function b(t) {
        t = t.points;
        for (var e, r = 0, n = 0; n < t.numberOfItems; n++) {
            var o = t.getItem(n);
            0 < n && (r += v(e, o)),
            e = o
        }
        return r
    }
    function j(t) {
        if (t.getTotalLength)
            return t.getTotalLength();
        switch (t.tagName.toLowerCase()) {
        case "circle":
            return 2 * Math.PI * t.getAttribute("r");
        case "rect":
            return 2 * t.getAttribute("width") + 2 * t.getAttribute("height");
        case "line":
            return v({
                x: t.getAttribute("x1"),
                y: t.getAttribute("y1")
            }, {
                x: t.getAttribute("x2"),
                y: t.getAttribute("y2")
            });
        case "polyline":
            return b(t);
        case "polygon":
            var e = t.points;
            return b(t) + v(e.getItem(e.numberOfItems - 1), e.getItem(0))
        }
    }
    function $(t, e) {
        function r(r) {
            return r = void 0 === r ? 0 : r,
            t.el.getPointAtLength(1 <= e + r ? e + r : 0)
        }
        var n = r()
          , o = r(-1)
          , a = r(1);
        switch (t.property) {
        case "x":
            return n.x;
        case "y":
            return n.y;
        case "angle":
            return 180 * Math.atan2(a.y - o.y, a.x - o.x) / Math.PI
        }
    }
    function x(t, e) {
        var r, n = /-?\d*\.?\d+/g;
        if (r = X.pth(t) ? t.totalLength : t,
        X.col(r))
            if (X.rgb(r)) {
                var o = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(r);
                r = o ? "rgba(" + o[1] + ",1)" : r
            } else
                r = X.hex(r) ? s(r) : X.hsl(r) ? c(r) : void 0;
        else
            o = (o = f(r)) ? r.substr(0, r.length - o.length) : r,
            r = e && !/\s/g.test(r) ? o + e : o;
        return r += "",
        {
            original: r,
            numbers: r.match(n) ? r.match(n).map(Number) : [0],
            strings: X.str(t) || e ? r.split(n) : []
        }
    }
    function w(t) {
        return t = t ? r(X.arr(t) ? t.map(n) : n(t)) : [],
        e(t, function(t, e, r) {
            return r.indexOf(t) === e
        })
    }
    function A(t) {
        var e = w(t);
        return e.map(function(t, r) {
            return {
                target: t,
                id: r,
                total: e.length
            }
        })
    }
    function I(t, e) {
        var r = a(e);
        if (X.arr(t)) {
            var o = t.length;
            2 !== o || X.obj(t[0]) ? X.fnc(e.duration) || (r.duration = e.duration / o) : t = {
                value: t
            }
        }
        return n(t).map(function(t, r) {
            return r = r ? 0 : e.delay,
            t = X.obj(t) && !X.pth(t) ? t : {
                value: t
            },
            X.und(t.delay) && (t.delay = r),
            t
        }).map(function(t) {
            return u(t, r)
        })
    }
    function M(t, e) {
        var r, n = {};
        for (r in t) {
            var o = p(t[r], e);
            X.arr(o) && (o = o.map(function(t) {
                return p(t, e)
            }),
            1 === o.length && (o = o[0])),
            n[r] = o
        }
        return n.duration = parseFloat(n.duration),
        n.delay = parseFloat(n.delay),
        n
    }
    function S(t) {
        return X.arr(t) ? Y.apply(this, t) : _[t]
    }
    function O(t, e) {
        var r;
        return t.tweens.map(function(n) {
            n = M(n, e);
            var o = n.value
              , a = y(e.target, t.name)
              , i = r ? r.to.original : a
              , i = X.arr(o) ? o[0] : i
              , u = h(X.arr(o) ? o[1] : o, i)
              , a = f(u) || f(i) || f(a);
            return n.from = x(i, a),
            n.to = x(u, a),
            n.start = r ? r.end : t.offset,
            n.end = n.start + n.delay + n.duration,
            n.easing = S(n.easing),
            n.elasticity = (1e3 - Math.min(Math.max(n.elasticity, 1), 999)) / 1e3,
            n.isPath = X.pth(o),
            n.isColor = X.col(n.from.original),
            n.isColor && (n.round = 1),
            r = n
        })
    }
    function P(t, n) {
        return e(r(t.map(function(t) {
            return n.map(function(e) {
                var r = m(t.target, e.name);
                if (r) {
                    var n = O(e, t);
                    e = {
                        type: r,
                        property: e.name,
                        animatable: t,
                        tweens: n,
                        duration: n[n.length - 1].end,
                        delay: n[0].delay
                    }
                } else
                    e = void 0;
                return e
            })
        })), function(t) {
            return !X.und(t)
        })
    }
    function k(t, e, r, n) {
        var o = "delay" === t;
        return e.length ? (o ? Math.min : Math.max).apply(Math, e.map(function(e) {
            return e[t]
        })) : o ? n.delay : r.offset + n.delay + n.duration
    }
    function F(t) {
        var e, r = i(E, t), n = i(T, t), o = A(t.targets), a = [], s = u(r, n);
        for (e in t)
            s.hasOwnProperty(e) || "targets" === e || a.push({
                name: e,
                offset: s.offset,
                tweens: I(t[e], n)
            });
        return t = P(o, a),
        u(r, {
            children: [],
            animatables: o,
            animations: t,
            duration: k("duration", t, r, n),
            delay: k("delay", t, r, n)
        })
    }
    function L(t) {
        function r() {
            return window.Promise && new Promise(function(t) {
                return l = t
            }
            )
        }
        function n(t) {
            return m.reversed ? m.duration - t : t
        }
        function o(t) {
            for (var r = 0, n = {}, o = m.animations, a = o.length; r < a; ) {
                var i = o[r]
                  , u = i.animatable
                  , s = i.tweens
                  , c = s.length - 1
                  , f = s[c];
                c && (f = e(s, function(e) {
                    return t < e.end
                })[0] || f);
                for (var s = Math.min(Math.max(t - f.start - f.delay, 0), f.duration) / f.duration, l = isNaN(s) ? 1 : f.easing(s, f.elasticity), s = f.to.strings, p = f.round, c = [], g = void 0, g = f.to.numbers.length, y = 0; y < g; y++) {
                    var h = void 0
                      , h = f.to.numbers[y]
                      , v = f.from.numbers[y]
                      , h = f.isPath ? $(f.value, l * h) : v + l * (h - v);
                    p && (f.isColor && 2 < y || (h = Math.round(h * p) / p)),
                    c.push(h)
                }
                if (f = s.length)
                    for (g = s[0],
                    l = 0; l < f; l++)
                        p = s[l + 1],
                        y = c[l],
                        isNaN(y) || (g = p ? g + (y + p) : g + (y + " "));
                else
                    g = c[0];
                V[i.type](u.target, i.property, g, n, u.id),
                i.currentValue = g,
                r++
            }
            if (r = Object.keys(n).length)
                for (o = 0; o < r; o++)
                    C || (C = d(document.body, "transform") ? "transform" : "-webkit-transform"),
                    m.animatables[o].target.style[C] = n[o].join(" ");
            m.currentTime = t,
            m.progress = t / m.duration * 100
        }
        function a(t) {
            m[t] && m[t](m)
        }
        function i() {
            m.remaining && !0 !== m.remaining && m.remaining--
        }
        function u(t) {
            var e = m.duration
              , u = m.offset
              , d = u + m.delay
              , g = m.currentTime
              , y = m.reversed
              , h = n(t);
            if (m.children.length) {
                var v = m.children
                  , b = v.length;
                if (h >= m.currentTime)
                    for (var j = 0; j < b; j++)
                        v[j].seek(h);
                else
                    for (; b--; )
                        v[b].seek(h)
            }
            (h >= d || !e) && (m.began || (m.began = !0,
            a("begin")),
            a("run")),
            h > u && h < e ? o(h) : (h <= u && 0 !== g && (o(0),
            y && i()),
            (h >= e && g !== e || !e) && (o(e),
            y || i())),
            a("update"),
            t >= e && (m.remaining ? (c = s,
            "alternate" === m.direction && (m.reversed = !m.reversed)) : (m.pause(),
            m.completed || (m.completed = !0,
            a("complete"),
            "Promise"in window && (l(),
            p = r()))),
            f = 0)
        }
        t = void 0 === t ? {} : t;
        var s, c, f = 0, l = null, p = r(), m = F(t);
        return m.reset = function() {
            var t = m.direction
              , e = m.loop;
            for (m.currentTime = 0,
            m.progress = 0,
            m.paused = !0,
            m.began = !1,
            m.completed = !1,
            m.reversed = "reverse" === t,
            m.remaining = "alternate" === t && 1 === e ? 2 : e,
            o(0),
            t = m.children.length; t--; )
                m.children[t].reset()
        }
        ,
        m.tick = function(t) {
            s = t,
            c || (c = s),
            u((f + s - c) * L.speed)
        }
        ,
        m.seek = function(t) {
            u(n(t))
        }
        ,
        m.pause = function() {
            var t = Z.indexOf(m);
            -1 < t && Z.splice(t, 1),
            m.paused = !0
        }
        ,
        m.play = function() {
            m.paused && (m.paused = !1,
            c = 0,
            f = n(m.currentTime),
            Z.push(m),
            q || B())
        }
        ,
        m.reverse = function() {
            m.reversed = !m.reversed,
            c = 0,
            f = n(m.currentTime)
        }
        ,
        m.restart = function() {
            m.pause(),
            m.reset(),
            m.play()
        }
        ,
        m.finished = p,
        m.reset(),
        m.autoplay && m.play(),
        m
    }
    var C, E = {
        update: void 0,
        begin: void 0,
        run: void 0,
        complete: void 0,
        loop: 1,
        direction: "normal",
        autoplay: !0,
        offset: 0
    }, T = {
        duration: 1e3,
        delay: 0,
        easing: "easeOutElastic",
        elasticity: 500,
        round: 0
    }, N = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "), X = {
        arr: function(t) {
            return Array.isArray(t)
        },
        obj: function(t) {
            return -1 < Object.prototype.toString.call(t).indexOf("Object")
        },
        pth: function(t) {
            return X.obj(t) && t.hasOwnProperty("totalLength")
        },
        svg: function(t) {
            return t instanceof SVGElement
        },
        dom: function(t) {
            return t.nodeType || X.svg(t)
        },
        str: function(t) {
            return "string" == typeof t
        },
        fnc: function(t) {
            return "function" == typeof t
        },
        und: function(t) {
            return "undefined" == typeof t
        },
        hex: function(t) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)
        },
        rgb: function(t) {
            return /^rgb/.test(t)
        },
        hsl: function(t) {
            return /^hsl/.test(t)
        },
        col: function(t) {
            return X.hex(t) || X.rgb(t) || X.hsl(t)
        }
    }, Y = function() {
        function t(t, e, r) {
            return (((1 - 3 * r + 3 * e) * t + (3 * r - 6 * e)) * t + 3 * e) * t
        }
        return function(e, r, n, o) {
            if (0 <= e && 1 >= e && 0 <= n && 1 >= n) {
                var a = new Float32Array(11);
                if (e !== r || n !== o)
                    for (var i = 0; 11 > i; ++i)
                        a[i] = t(.1 * i, e, n);
                return function(i) {
                    if (e === r && n === o)
                        return i;
                    if (0 === i)
                        return 0;
                    if (1 === i)
                        return 1;
                    for (var u = 0, s = 1; 10 !== s && a[s] <= i; ++s)
                        u += .1;
                    --s;
                    var s = u + (i - a[s]) / (a[s + 1] - a[s]) * .1
                      , c = 3 * (1 - 3 * n + 3 * e) * s * s + 2 * (3 * n - 6 * e) * s + 3 * e;
                    if (.001 <= c) {
                        for (u = 0; 4 > u && (c = 3 * (1 - 3 * n + 3 * e) * s * s + 2 * (3 * n - 6 * e) * s + 3 * e,
                        0 !== c); ++u)
                            var f = t(s, e, n) - i
                              , s = s - f / c;
                        i = s
                    } else if (0 === c)
                        i = s;
                    else {
                        var s = u
                          , u = u + .1
                          , l = 0;
                        do
                            f = s + (u - s) / 2,
                            c = t(f, e, n) - i,
                            0 < c ? u = f : s = f;
                        while (1e-7 < Math.abs(c) && 10 > ++l);
                        i = f
                    }
                    return t(i, r, o)
                }
            }
        }
    }(), _ = function() {
        function t(t, e) {
            return 0 === t || 1 === t ? t : -Math.pow(2, 10 * (t - 1)) * Math.sin(2 * (t - 1 - e / (2 * Math.PI) * Math.asin(1)) * Math.PI / e)
        }
        var e, r = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "), n = {
            In: [[.55, .085, .68, .53], [.55, .055, .675, .19], [.895, .03, .685, .22], [.755, .05, .855, .06], [.47, 0, .745, .715], [.95, .05, .795, .035], [.6, .04, .98, .335], [.6, -.28, .735, .045], t],
            Out: [[.25, .46, .45, .94], [.215, .61, .355, 1], [.165, .84, .44, 1], [.23, 1, .32, 1], [.39, .575, .565, 1], [.19, 1, .22, 1], [.075, .82, .165, 1], [.175, .885, .32, 1.275], function(e, r) {
                return 1 - t(1 - e, r)
            }
            ],
            InOut: [[.455, .03, .515, .955], [.645, .045, .355, 1], [.77, 0, .175, 1], [.86, 0, .07, 1], [.445, .05, .55, .95], [1, 0, 0, 1], [.785, .135, .15, .86], [.68, -.55, .265, 1.55], function(e, r) {
                return .5 > e ? t(2 * e, r) / 2 : 1 - t(-2 * e + 2, r) / 2
            }
            ]
        }, o = {
            linear: Y(.25, .25, .75, .75)
        }, a = {};
        for (e in n)
            a.type = e,
            n[a.type].forEach(function(t) {
                return function(e, n) {
                    o["ease" + t.type + r[n]] = X.fnc(e) ? e : Y.apply($jscomp$this, e)
                }
            }(a)),
            a = {
                type: a.type
            };
        return o
    }(), V = {
        css: function(t, e, r) {
            return t.style[e] = r
        },
        attribute: function(t, e, r) {
            return t.setAttribute(e, r)
        },
        object: function(t, e, r) {
            return t[e] = r
        },
        transform: function(t, e, r, n, o) {
            n[o] || (n[o] = []),
            n[o].push(e + "(" + r + ")")
        }
    }, Z = [], q = 0, B = function() {
        function t() {
            q = requestAnimationFrame(e)
        }
        function e(e) {
            var r = Z.length;
            if (r) {
                for (var n = 0; n < r; )
                    Z[n] && Z[n].tick(e),
                    n++;
                t()
            } else
                cancelAnimationFrame(q),
                q = 0
        }
        return t
    }();
    return L.version = "2.2.0",
    L.speed = 1,
    L.running = Z,
    L.remove = function(t) {
        t = w(t);
        for (var e = Z.length; e--; )
            for (var r = Z[e], n = r.animations, a = n.length; a--; )
                o(t, n[a].animatable.target) && (n.splice(a, 1),
                n.length || r.pause())
    }
    ,
    L.getValue = y,
    L.path = function(e, r) {
        var n = X.str(e) ? t(e)[0] : e
          , o = r || 100;
        return function(t) {
            return {
                el: n,
                property: t,
                totalLength: j(n) * (o / 100)
            }
        }
    }
    ,
    L.setDashoffset = function(t) {
        var e = j(t);
        return t.setAttribute("stroke-dasharray", e),
        e
    }
    ,
    L.bezier = Y,
    L.easings = _,
    L.timeline = function(t) {
        var e = L(t);
        return e.pause(),
        e.duration = 0,
        e.add = function(r) {
            return e.children.forEach(function(t) {
                t.began = !0,
                t.completed = !0
            }),
            n(r).forEach(function(r) {
                var n = u(r, i(T, t || {}));
                n.targets = n.targets || t.targets,
                r = e.duration;
                var o = n.offset;
                n.autoplay = !1,
                n.direction = e.direction,
                n.offset = X.und(o) ? r : h(o, r),
                e.began = !0,
                e.completed = !0,
                e.seek(n.offset),
                n = L(n),
                n.began = !0,
                n.completed = !0,
                n.duration > r && (e.duration = n.duration),
                e.children.push(n)
            }),
            e.seek(0),
            e.reset(),
            e.autoplay && e.restart(),
            e
        }
        ,
        e
    }
    ,
    L.random = function(t, e) {
        return Math.floor(Math.random() * (e - t + 1)) + t
    }
    ,
    L
});
!function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";
    function i(i, o, a) {
        function l(t, e, n) {
            var s, o = "$()." + i + '("' + e + '")';
            return t.each(function(t, l) {
                var h = a.data(l, i);
                if (!h)
                    return void r(i + " not initialized. Cannot call methods, i.e. " + o);
                var c = h[e];
                if (!c || "_" == e.charAt(0))
                    return void r(o + " is not a valid method");
                var d = c.apply(h, n);
                s = void 0 === s ? d : s
            }),
            void 0 !== s ? s : t
        }
        function h(t, e) {
            t.each(function(t, n) {
                var s = a.data(n, i);
                s ? (s.option(e),
                s._init()) : (s = new o(n,e),
                a.data(n, i, s))
            })
        }
        a = a || e || t.jQuery,
        a && (o.prototype.option || (o.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }
        ),
        a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = s.call(arguments, 1);
                return l(this, t, e)
            }
            return h(this, t),
            this
        }
        ,
        n(a))
    }
    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var s = Array.prototype.slice
      , o = t.console
      , r = "undefined" == typeof o ? function() {}
    : function(t) {
        o.error(t)
    }
    ;
    return n(e || t.jQuery),
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}
              , n = i[t] = i[t] || [];
            return n.indexOf(e) == -1 && n.push(e),
            this
        }
    }
    ,
    e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}
              , n = i[t] = i[t] || {};
            return n[e] = !0,
            this
        }
    }
    ,
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return n != -1 && i.splice(n, 1),
            this
        }
    }
    ,
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0),
            e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
                var o = i[s]
                  , r = n && n[o];
                r && (this.off(t, o),
                delete n[o]),
                o.apply(this, e)
            }
            return this
        }
    }
    ,
    e.allOff = function() {
        delete this._events,
        delete this._onceEvents
    }
    ,
    t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";
    function t(t) {
        var e = parseFloat(t)
          , i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }
    function e() {}
    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; e < h; e++) {
            var i = l[e];
            t[i] = 0
        }
        return t
    }
    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),
        e
    }
    function s() {
        if (!c) {
            c = !0;
            var e = document.createElement("div");
            e.style.width = "200px",
            e.style.padding = "1px 2px 3px 4px",
            e.style.borderStyle = "solid",
            e.style.borderWidth = "1px 2px 3px 4px",
            e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var s = n(e);
            r = 200 == Math.round(t(s.width)),
            o.isBoxSizeOuter = r,
            i.removeChild(e)
        }
    }
    function o(e) {
        if (s(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType) {
            var o = n(e);
            if ("none" == o.display)
                return i();
            var a = {};
            a.width = e.offsetWidth,
            a.height = e.offsetHeight;
            for (var c = a.isBorderBox = "border-box" == o.boxSizing, d = 0; d < h; d++) {
                var u = l[d]
                  , f = o[u]
                  , p = parseFloat(f);
                a[u] = isNaN(p) ? 0 : p
            }
            var g = a.paddingLeft + a.paddingRight
              , v = a.paddingTop + a.paddingBottom
              , m = a.marginLeft + a.marginRight
              , y = a.marginTop + a.marginBottom
              , b = a.borderLeftWidth + a.borderRightWidth
              , E = a.borderTopWidth + a.borderBottomWidth
              , S = c && r
              , C = t(o.width);
            C !== !1 && (a.width = C + (S ? 0 : g + b));
            var x = t(o.height);
            return x !== !1 && (a.height = x + (S ? 0 : v + E)),
            a.innerWidth = a.width - (g + b),
            a.innerHeight = a.height - (v + E),
            a.outerWidth = a.width + m,
            a.outerHeight = a.height + y,
            a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
        console.error(t)
    }
    , l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], h = l.length, c = !1;
    return o
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches)
            return "matches";
        if (t.matchesSelector)
            return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i]
              , s = n + "MatchesSelector";
            if (t[s])
                return s
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    ,
    i.modulo = function(t, e) {
        return (t % e + e) % e
    }
    ;
    var n = Array.prototype.slice;
    i.makeArray = function(t) {
        if (Array.isArray(t))
            return t;
        if (null === t || void 0 === t)
            return [];
        var e = "object" == typeof t && "number" == typeof t.length;
        return e ? n.call(t) : [t]
    }
    ,
    i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }
    ,
    i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body; )
            if (t = t.parentNode,
            e(t, i))
                return t
    }
    ,
    i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }
    ,
    i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var s = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!n)
                    return void s.push(t);
                e(t, n) && s.push(t);
                for (var i = t.querySelectorAll(n), o = 0; o < i.length; o++)
                    s.push(i[o])
            }
        }),
        s
    }
    ,
    i.debounceMethod = function(t, e, i) {
        i = i || 100;
        var n = t.prototype[e]
          , s = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[s];
            clearTimeout(t);
            var e = arguments
              , o = this;
            this[s] = setTimeout(function() {
                n.apply(o, e),
                delete o[s]
            }, i)
        }
    }
    ,
    i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }
    ,
    i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    }
    ;
    var s = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var o = i.toDashed(n)
              , r = "data-" + o
              , a = document.querySelectorAll("[" + r + "]")
              , l = document.querySelectorAll(".js-" + o)
              , h = i.makeArray(a).concat(i.makeArray(l))
              , c = r + "-options"
              , d = t.jQuery;
            h.forEach(function(t) {
                var i, o = t.getAttribute(r) || t.getAttribute(c);
                try {
                    i = o && JSON.parse(o)
                } catch (e) {
                    return void (s && s.error("Error parsing " + r + " on " + t.className + ": " + e))
                }
                var a = new e(t,i);
                d && d.data(t, n, a)
            })
        })
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {},
    t.Flickity.Cell = e(t, t.getSize))
}(window, function(t, e) {
    function i(t, e) {
        this.element = t,
        this.parent = e,
        this.create()
    }
    var n = i.prototype;
    return n.create = function() {
        this.element.style.position = "absolute",
        this.element.setAttribute("aria-selected", "false"),
        this.x = 0,
        this.shift = 0
    }
    ,
    n.destroy = function() {
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.removeAttribute("aria-selected"),
        this.element.style[t] = ""
    }
    ,
    n.getSize = function() {
        this.size = e(this.element)
    }
    ,
    n.setPosition = function(t) {
        this.x = t,
        this.updateTarget(),
        this.renderPosition(t)
    }
    ,
    n.updateTarget = n.setDefaultTarget = function() {
        var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
    }
    ,
    n.renderPosition = function(t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t)
    }
    ,
    n.wrapShift = function(t) {
        this.shift = t,
        this.renderPosition(this.x + this.parent.slideableWidth * t)
    }
    ,
    n.remove = function() {
        this.element.parentNode.removeChild(this.element)
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {},
    t.Flickity.Slide = e())
}(window, function() {
    "use strict";
    function t(t) {
        this.parent = t,
        this.isOriginLeft = "left" == t.originSide,
        this.cells = [],
        this.outerWidth = 0,
        this.height = 0
    }
    var e = t.prototype;
    return e.addCell = function(t) {
        if (this.cells.push(t),
        this.outerWidth += t.size.outerWidth,
        this.height = Math.max(t.size.outerHeight, this.height),
        1 == this.cells.length) {
            this.x = t.x;
            var e = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = t.size[e]
        }
    }
    ,
    e.updateTarget = function() {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft"
          , e = this.getLastCell()
          , i = e ? e.size[t] : 0
          , n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign
    }
    ,
    e.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    e.select = function() {
        this.changeSelected(!0)
    }
    ,
    e.unselect = function() {
        this.changeSelected(!1)
    }
    ,
    e.changeSelected = function(t) {
        var e = t ? "add" : "remove";
        this.cells.forEach(function(i) {
            i.element.classList[e]("is-selected"),
            i.element.setAttribute("aria-selected", t.toString())
        })
    }
    ,
    e.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }
    ,
    t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("fizzy-ui-utils")) : (t.Flickity = t.Flickity || {},
    t.Flickity.animatePrototype = e(t, t.fizzyUIUtils))
}(window, function(t, e) {
    var i = {};
    return i.startAnimation = function() {
        this.isAnimating || (this.isAnimating = !0,
        this.restingFrames = 0,
        this.animate())
    }
    ,
    i.animate = function() {
        this.applyDragForce(),
        this.applySelectedAttraction();
        var t = this.x;
        if (this.integratePhysics(),
        this.positionSlider(),
        this.settle(t),
        this.isAnimating) {
            var e = this;
            requestAnimationFrame(function() {
                e.animate()
            })
        }
    }
    ,
    i.positionSlider = function() {
        var t = this.x;
        this.options.wrapAround && this.cells.length > 1 && (t = e.modulo(t, this.slideableWidth),
        t -= this.slideableWidth,
        this.shiftWrapCells(t)),
        t += this.cursorPosition,
        t = this.options.rightToLeft ? -t : t;
        var i = this.getPositionValue(t);
        this.slider.style.transform = this.isAnimating ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")";
        var n = this.slides[0];
        if (n) {
            var s = -this.x - n.target
              , o = s / this.slidesWidth;
            this.dispatchEvent("scroll", null, [o, s])
        }
    }
    ,
    i.positionSliderAtSelected = function() {
        this.cells.length && (this.x = -this.selectedSlide.target,
        this.velocity = 0,
        this.positionSlider())
    }
    ,
    i.getPositionValue = function(t) {
        return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
    }
    ,
    i.settle = function(t) {
        this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++,
        this.restingFrames > 2 && (this.isAnimating = !1,
        delete this.isFreeScrolling,
        this.positionSlider(),
        this.dispatchEvent("settle", null, [this.selectedIndex]))
    }
    ,
    i.shiftWrapCells = function(t) {
        var e = this.cursorPosition + t;
        this._shiftCells(this.beforeShiftCells, e, -1);
        var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i, 1)
    }
    ,
    i._shiftCells = function(t, e, i) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n]
              , o = e > 0 ? i : 0;
            s.wrapShift(o),
            e -= s.size.outerWidth
        }
    }
    ,
    i._unshiftCells = function(t) {
        if (t && t.length)
            for (var e = 0; e < t.length; e++)
                t[e].wrapShift(0)
    }
    ,
    i.integratePhysics = function() {
        this.x += this.velocity,
        this.velocity *= this.getFrictionFactor()
    }
    ,
    i.applyForce = function(t) {
        this.velocity += t
    }
    ,
    i.getFrictionFactor = function() {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
    }
    ,
    i.getRestingPosition = function() {
        return this.x + this.velocity / (1 - this.getFrictionFactor())
    }
    ,
    i.applyDragForce = function() {
        if (this.isDraggable && this.isPointerDown) {
            var t = this.dragX - this.x
              , e = t - this.velocity;
            this.applyForce(e)
        }
    }
    ,
    i.applySelectedAttraction = function() {
        var t = this.isDraggable && this.isPointerDown;
        if (!t && !this.isFreeScrolling && this.slides.length) {
            var e = this.selectedSlide.target * -1 - this.x
              , i = e * this.options.selectedAttraction;
            this.applyForce(i)
        }
    }
    ,
    i
}),
function(t, e) {
    if ("function" == typeof define && define.amd)
        define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(i, n, s, o, r, a) {
            return e(t, i, n, s, o, r, a)
        });
    else if ("object" == typeof module && module.exports)
        module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
    else {
        var i = t.Flickity;
        t.Flickity = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype)
    }
}(window, function(t, e, i, n, s, o, r) {
    function a(t, e) {
        for (t = n.makeArray(t); t.length; )
            e.appendChild(t.shift())
    }
    function l(t, e) {
        var i = n.getQueryElement(t);
        if (!i)
            return void (d && d.error("Bad element for Flickity: " + (i || t)));
        if (this.element = i,
        this.element.flickityGUID) {
            var s = f[this.element.flickityGUID];
            return s.option(e),
            s
        }
        h && (this.$element = h(this.element)),
        this.options = n.extend({}, this.constructor.defaults),
        this.option(e),
        this._create()
    }
    var h = t.jQuery
      , c = t.getComputedStyle
      , d = t.console
      , u = 0
      , f = {};
    l.defaults = {
        accessibility: !0,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: !0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0
    },
    l.createMethods = [];
    var p = l.prototype;
    n.extend(p, e.prototype),
    p._create = function() {
        var e = this.guid = ++u;
        this.element.flickityGUID = e,
        f[e] = this,
        this.selectedIndex = 0,
        this.restingFrames = 0,
        this.x = 0,
        this.velocity = 0,
        this.originSide = this.options.rightToLeft ? "right" : "left",
        this.viewport = document.createElement("div"),
        this.viewport.className = "flickity-viewport",
        this._createSlider(),
        (this.options.resize || this.options.watchCSS) && t.addEventListener("resize", this);
        for (var i in this.options.on) {
            var n = this.options.on[i];
            this.on(i, n)
        }
        l.createMethods.forEach(function(t) {
            this[t]()
        }, this),
        this.options.watchCSS ? this.watchCSS() : this.activate()
    }
    ,
    p.option = function(t) {
        n.extend(this.options, t)
    }
    ,
    p.activate = function() {
        if (!this.isActive) {
            this.isActive = !0,
            this.element.classList.add("flickity-enabled"),
            this.options.rightToLeft && this.element.classList.add("flickity-rtl"),
            this.getSize();
            var t = this._filterFindCellElements(this.element.children);
            a(t, this.slider),
            this.viewport.appendChild(this.slider),
            this.element.appendChild(this.viewport),
            this.reloadCells(),
            this.options.accessibility && (this.element.tabIndex = 0,
            this.element.addEventListener("keydown", this)),
            this.emitEvent("activate");
            var e, i = this.options.initialIndex;
            e = this.isInitActivated ? this.selectedIndex : void 0 !== i && this.cells[i] ? i : 0,
            this.select(e, !1, !0),
            this.isInitActivated = !0,
            this.dispatchEvent("ready")
        }
    }
    ,
    p._createSlider = function() {
        var t = document.createElement("div");
        t.className = "flickity-slider",
        t.style[this.originSide] = 0,
        this.slider = t
    }
    ,
    p._filterFindCellElements = function(t) {
        return n.filterFindElements(t, this.options.cellSelector)
    }
    ,
    p.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children),
        this.positionCells(),
        this._getWrapShiftCells(),
        this.setGallerySize()
    }
    ,
    p._makeCells = function(t) {
        var e = this._filterFindCellElements(t)
          , i = e.map(function(t) {
            return new s(t,this)
        }, this);
        return i
    }
    ,
    p.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    p.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    }
    ,
    p.positionCells = function() {
        this._sizeCells(this.cells),
        this._positionCells(0)
    }
    ,
    p._positionCells = function(t) {
        t = t || 0,
        this.maxCellHeight = t ? this.maxCellHeight || 0 : 0;
        var e = 0;
        if (t > 0) {
            var i = this.cells[t - 1];
            e = i.x + i.size.outerWidth
        }
        for (var n = this.cells.length, s = t; s < n; s++) {
            var o = this.cells[s];
            o.setPosition(e),
            e += o.size.outerWidth,
            this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = e,
        this.updateSlides(),
        this._containSlides(),
        this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
    }
    ,
    p._sizeCells = function(t) {
        t.forEach(function(t) {
            t.getSize()
        })
    }
    ,
    p.updateSlides = function() {
        if (this.slides = [],
        this.cells.length) {
            var t = new o(this);
            this.slides.push(t);
            var e = "left" == this.originSide
              , i = e ? "marginRight" : "marginLeft"
              , n = this._getCanCellFit();
            this.cells.forEach(function(e, s) {
                if (!t.cells.length)
                    return void t.addCell(e);
                var r = t.outerWidth - t.firstMargin + (e.size.outerWidth - e.size[i]);
                n.call(this, s, r) ? t.addCell(e) : (t.updateTarget(),
                t = new o(this),
                this.slides.push(t),
                t.addCell(e))
            }, this),
            t.updateTarget(),
            this.updateSelectedSlide()
        }
    }
    ,
    p._getCanCellFit = function() {
        var t = this.options.groupCells;
        if (!t)
            return function() {
                return !1
            }
            ;
        if ("number" == typeof t) {
            var e = parseInt(t, 10);
            return function(t) {
                return t % e !== 0
            }
        }
        var i = "string" == typeof t && t.match(/^(\d+)%$/)
          , n = i ? parseInt(i[1], 10) / 100 : 1;
        return function(t, e) {
            return e <= (this.size.innerWidth + 1) * n
        }
    }
    ,
    p._init = p.reposition = function() {
        this.positionCells(),
        this.positionSliderAtSelected()
    }
    ,
    p.getSize = function() {
        this.size = i(this.element),
        this.setCellAlign(),
        this.cursorPosition = this.size.innerWidth * this.cellAlign
    }
    ;
    var g = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    return p.setCellAlign = function() {
        var t = g[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
    }
    ,
    p.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = t + "px"
        }
    }
    ,
    p._getWrapShiftCells = function() {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells),
            this._unshiftCells(this.afterShiftCells);
            var t = this.cursorPosition
              , e = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(t, e, -1),
            t = this.size.innerWidth - this.cursorPosition,
            this.afterShiftCells = this._getGapCells(t, 0, 1)
        }
    }
    ,
    p._getGapCells = function(t, e, i) {
        for (var n = []; t > 0; ) {
            var s = this.cells[e];
            if (!s)
                break;
            n.push(s),
            e += i,
            t -= s.size.outerWidth
        }
        return n
    }
    ,
    p._containSlides = function() {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var t = this.options.rightToLeft
              , e = t ? "marginRight" : "marginLeft"
              , i = t ? "marginLeft" : "marginRight"
              , n = this.slideableWidth - this.getLastCell().size[i]
              , s = n < this.size.innerWidth
              , o = this.cursorPosition + this.cells[0].size[e]
              , r = n - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function(t) {
                s ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, o),
                t.target = Math.min(t.target, r))
            }, this)
        }
    }
    ,
    p.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n),
        h && this.$element) {
            t += this.options.namespaceJQueryEvents ? ".flickity" : "";
            var s = t;
            if (e) {
                var o = h.Event(e);
                o.type = t,
                s = o
            }
            this.$element.trigger(s, i)
        }
    }
    ,
    p.select = function(t, e, i) {
        if (this.isActive && (t = parseInt(t, 10),
        this._wrapSelect(t),
        (this.options.wrapAround || e) && (t = n.modulo(t, this.slides.length)),
        this.slides[t])) {
            var s = this.selectedIndex;
            this.selectedIndex = t,
            this.updateSelectedSlide(),
            i ? this.positionSliderAtSelected() : this.startAnimation(),
            this.options.adaptiveHeight && this.setGallerySize(),
            this.dispatchEvent("select", null, [t]),
            t != s && this.dispatchEvent("change", null, [t]),
            this.dispatchEvent("cellSelect")
        }
    }
    ,
    p._wrapSelect = function(t) {
        var e = this.slides.length
          , i = this.options.wrapAround && e > 1;
        if (!i)
            return t;
        var s = n.modulo(t, e)
          , o = Math.abs(s - this.selectedIndex)
          , r = Math.abs(s + e - this.selectedIndex)
          , a = Math.abs(s - e - this.selectedIndex);
        !this.isDragSelect && r < o ? t += e : !this.isDragSelect && a < o && (t -= e),
        t < 0 ? this.x -= this.slideableWidth : t >= e && (this.x += this.slideableWidth)
    }
    ,
    p.previous = function(t, e) {
        this.select(this.selectedIndex - 1, t, e)
    }
    ,
    p.next = function(t, e) {
        this.select(this.selectedIndex + 1, t, e)
    }
    ,
    p.updateSelectedSlide = function() {
        var t = this.slides[this.selectedIndex];
        t && (this.unselectSelectedSlide(),
        this.selectedSlide = t,
        t.select(),
        this.selectedCells = t.cells,
        this.selectedElements = t.getCellElements(),
        this.selectedCell = t.cells[0],
        this.selectedElement = this.selectedElements[0])
    }
    ,
    p.unselectSelectedSlide = function() {
        this.selectedSlide && this.selectedSlide.unselect()
    }
    ,
    p.selectCell = function(t, e, i) {
        var n = this.queryCell(t);
        if (n) {
            var s = this.getCellSlideIndex(n);
            this.select(s, e, i)
        }
    }
    ,
    p.getCellSlideIndex = function(t) {
        for (var e = 0; e < this.slides.length; e++) {
            var i = this.slides[e]
              , n = i.cells.indexOf(t);
            if (n != -1)
                return e
        }
    }
    ,
    p.getCell = function(t) {
        for (var e = 0; e < this.cells.length; e++) {
            var i = this.cells[e];
            if (i.element == t)
                return i
        }
    }
    ,
    p.getCells = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getCell(t);
            i && e.push(i)
        }, this),
        e
    }
    ,
    p.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }
    ,
    p.getParentCell = function(t) {
        var e = this.getCell(t);
        return e ? e : (t = n.getParent(t, ".flickity-slider > *"),
        this.getCell(t))
    }
    ,
    p.getAdjacentCellElements = function(t, e) {
        if (!t)
            return this.selectedSlide.getCellElements();
        e = void 0 === e ? this.selectedIndex : e;
        var i = this.slides.length;
        if (1 + 2 * t >= i)
            return this.getCellElements();
        for (var s = [], o = e - t; o <= e + t; o++) {
            var r = this.options.wrapAround ? n.modulo(o, i) : o
              , a = this.slides[r];
            a && (s = s.concat(a.getCellElements()))
        }
        return s
    }
    ,
    p.queryCell = function(t) {
        return "number" == typeof t ? this.cells[t] : ("string" == typeof t && (t = this.element.querySelector(t)),
        this.getCell(t))
    }
    ,
    p.uiChange = function() {
        this.emitEvent("uiChange")
    }
    ,
    p.childUIPointerDown = function(t) {
        this.emitEvent("childUIPointerDown", [t])
    }
    ,
    p.onresize = function() {
        this.watchCSS(),
        this.resize()
    }
    ,
    n.debounceMethod(l, "onresize", 150),
    p.resize = function() {
        if (this.isActive) {
            this.getSize(),
            this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)),
            this.positionCells(),
            this._getWrapShiftCells(),
            this.setGallerySize(),
            this.emitEvent("resize");
            var t = this.selectedElements && this.selectedElements[0];
            this.selectCell(t, !1, !0)
        }
    }
    ,
    p.watchCSS = function() {
        var t = this.options.watchCSS;
        if (t) {
            var e = c(this.element, ":after").content;
            e.indexOf("flickity") != -1 ? this.activate() : this.deactivate()
        }
    }
    ,
    p.onkeydown = function(t) {
        var e = document.activeElement && document.activeElement != this.element;
        if (this.options.accessibility && !e) {
            var i = l.keyboardHandlers[t.keyCode];
            i && i.call(this)
        }
    }
    ,
    l.keyboardHandlers = {
        37: function() {
            var t = this.options.rightToLeft ? "next" : "previous";
            this.uiChange(),
            this[t]()
        },
        39: function() {
            var t = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(),
            this[t]()
        }
    },
    p.focus = function() {
        var e = t.pageYOffset;
        this.element.focus({
            preventScroll: !0
        }),
        t.pageYOffset != e && t.scrollTo(t.pageXOffset, e)
    }
    ,
    p.deactivate = function() {
        this.isActive && (this.element.classList.remove("flickity-enabled"),
        this.element.classList.remove("flickity-rtl"),
        this.unselectSelectedSlide(),
        this.cells.forEach(function(t) {
            t.destroy()
        }),
        this.element.removeChild(this.viewport),
        a(this.slider.children, this.element),
        this.options.accessibility && (this.element.removeAttribute("tabIndex"),
        this.element.removeEventListener("keydown", this)),
        this.isActive = !1,
        this.emitEvent("deactivate"))
    }
    ,
    p.destroy = function() {
        this.deactivate(),
        t.removeEventListener("resize", this),
        this.emitEvent("destroy"),
        h && this.$element && h.removeData(this.element, "flickity"),
        delete this.element.flickityGUID,
        delete f[this.guid]
    }
    ,
    n.extend(p, r),
    l.data = function(t) {
        t = n.getQueryElement(t);
        var e = t && t.flickityGUID;
        return e && f[e]
    }
    ,
    n.htmlInit(l, "flickity"),
    h && h.bridget && h.bridget("flickity", l),
    l.setJQuery = function(t) {
        h = t
    }
    ,
    l.Cell = s,
    l
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.Unipointer = e(t, t.EvEmitter)
}(window, function(t, e) {
    function i() {}
    function n() {}
    var s = n.prototype = Object.create(e.prototype);
    s.bindStartEvent = function(t) {
        this._bindStartEvent(t, !0)
    }
    ,
    s.unbindStartEvent = function(t) {
        this._bindStartEvent(t, !1)
    }
    ,
    s._bindStartEvent = function(e, i) {
        i = void 0 === i || i;
        var n = i ? "addEventListener" : "removeEventListener"
          , s = "mousedown";
        t.PointerEvent ? s = "pointerdown" : "ontouchstart"in t && (s = "touchstart"),
        e[n](s, this)
    }
    ,
    s.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    s.getTouch = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier)
                return i
        }
    }
    ,
    s.onmousedown = function(t) {
        var e = t.button;
        e && 0 !== e && 1 !== e || this._pointerDown(t, t)
    }
    ,
    s.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0])
    }
    ,
    s.onpointerdown = function(t) {
        this._pointerDown(t, t)
    }
    ,
    s._pointerDown = function(t, e) {
        t.button || this.isPointerDown || (this.isPointerDown = !0,
        this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier,
        this.pointerDown(t, e))
    }
    ,
    s.pointerDown = function(t, e) {
        this._bindPostStartEvents(t),
        this.emitEvent("pointerDown", [t, e])
    }
    ;
    var o = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return s._bindPostStartEvents = function(e) {
        if (e) {
            var i = o[e.type];
            i.forEach(function(e) {
                t.addEventListener(e, this)
            }, this),
            this._boundPointerEvents = i
        }
    }
    ,
    s._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function(e) {
            t.removeEventListener(e, this)
        }, this),
        delete this._boundPointerEvents)
    }
    ,
    s.onmousemove = function(t) {
        this._pointerMove(t, t)
    }
    ,
    s.onpointermove = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }
    ,
    s.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e)
    }
    ,
    s._pointerMove = function(t, e) {
        this.pointerMove(t, e)
    }
    ,
    s.pointerMove = function(t, e) {
        this.emitEvent("pointerMove", [t, e])
    }
    ,
    s.onmouseup = function(t) {
        this._pointerUp(t, t)
    }
    ,
    s.onpointerup = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }
    ,
    s.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e)
    }
    ,
    s._pointerUp = function(t, e) {
        this._pointerDone(),
        this.pointerUp(t, e)
    }
    ,
    s.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e])
    }
    ,
    s._pointerDone = function() {
        this._pointerReset(),
        this._unbindPostStartEvents(),
        this.pointerDone()
    }
    ,
    s._pointerReset = function() {
        this.isPointerDown = !1,
        delete this.pointerIdentifier
    }
    ,
    s.pointerDone = i,
    s.onpointercancel = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
    }
    ,
    s.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e)
    }
    ,
    s._pointerCancel = function(t, e) {
        this._pointerDone(),
        this.pointerCancel(t, e)
    }
    ,
    s.pointerCancel = function(t, e) {
        this.emitEvent("pointerCancel", [t, e])
    }
    ,
    n.getPointerPoint = function(t) {
        return {
            x: t.pageX,
            y: t.pageY
        }
    }
    ,
    n
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.Unidragger = e(t, t.Unipointer)
}(window, function(t, e) {
    function i() {}
    var n = i.prototype = Object.create(e.prototype);
    n.bindHandles = function() {
        this._bindHandles(!0)
    }
    ,
    n.unbindHandles = function() {
        this._bindHandles(!1)
    }
    ,
    n._bindHandles = function(e) {
        e = void 0 === e || e;
        for (var i = e ? "addEventListener" : "removeEventListener", n = e ? this._touchActionValue : "", s = 0; s < this.handles.length; s++) {
            var o = this.handles[s];
            this._bindStartEvent(o, e),
            o[i]("click", this),
            t.PointerEvent && (o.style.touchAction = n)
        }
    }
    ,
    n._touchActionValue = "none",
    n.pointerDown = function(t, e) {
        var i = this.okayPointerDown(t);
        i && (this.pointerDownPointer = e,
        t.preventDefault(),
        this.pointerDownBlur(),
        this._bindPostStartEvents(t),
        this.emitEvent("pointerDown", [t, e]))
    }
    ;
    var s = {
        TEXTAREA: !0,
        INPUT: !0,
        SELECT: !0,
        OPTION: !0
    }
      , o = {
        radio: !0,
        checkbox: !0,
        button: !0,
        submit: !0,
        image: !0,
        file: !0
    };
    return n.okayPointerDown = function(t) {
        var e = s[t.target.nodeName]
          , i = o[t.target.type]
          , n = !e || i;
        return n || this._pointerReset(),
        n
    }
    ,
    n.pointerDownBlur = function() {
        var t = document.activeElement
          , e = t && t.blur && t != document.body;
        e && t.blur()
    }
    ,
    n.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]),
        this._dragMove(t, e, i)
    }
    ,
    n._dragPointerMove = function(t, e) {
        var i = {
            x: e.pageX - this.pointerDownPointer.pageX,
            y: e.pageY - this.pointerDownPointer.pageY
        };
        return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e),
        i
    }
    ,
    n.hasDragStarted = function(t) {
        return Math.abs(t.x) > 3 || Math.abs(t.y) > 3
    }
    ,
    n.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e]),
        this._dragPointerUp(t, e)
    }
    ,
    n._dragPointerUp = function(t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
    }
    ,
    n._dragStart = function(t, e) {
        this.isDragging = !0,
        this.isPreventingClicks = !0,
        this.dragStart(t, e)
    }
    ,
    n.dragStart = function(t, e) {
        this.emitEvent("dragStart", [t, e])
    }
    ,
    n._dragMove = function(t, e, i) {
        this.isDragging && this.dragMove(t, e, i)
    }
    ,
    n.dragMove = function(t, e, i) {
        t.preventDefault(),
        this.emitEvent("dragMove", [t, e, i])
    }
    ,
    n._dragEnd = function(t, e) {
        this.isDragging = !1,
        setTimeout(function() {
            delete this.isPreventingClicks
        }
        .bind(this)),
        this.dragEnd(t, e)
    }
    ,
    n.dragEnd = function(t, e) {
        this.emitEvent("dragEnd", [t, e])
    }
    ,
    n.onclick = function(t) {
        this.isPreventingClicks && t.preventDefault()
    }
    ,
    n._staticClick = function(t, e) {
        this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e),
        "mouseup" != t.type && (this.isIgnoringMouseUp = !0,
        setTimeout(function() {
            delete this.isIgnoringMouseUp
        }
        .bind(this), 400)))
    }
    ,
    n.staticClick = function(t, e) {
        this.emitEvent("staticClick", [t, e])
    }
    ,
    i.getPointerPoint = e.getPointerPoint,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    function s() {
        return {
            x: t.pageXOffset,
            y: t.pageYOffset
        }
    }
    n.extend(e.defaults, {
        draggable: ">1",
        dragThreshold: 3
    }),
    e.createMethods.push("_createDrag");
    var o = e.prototype;
    n.extend(o, i.prototype),
    o._touchActionValue = "pan-y";
    var r = "createTouch"in document
      , a = !1;
    o._createDrag = function() {
        this.on("activate", this.onActivateDrag),
        this.on("uiChange", this._uiChangeDrag),
        this.on("childUIPointerDown", this._childUIPointerDownDrag),
        this.on("deactivate", this.onDeactivateDrag),
        this.on("cellChange", this.updateDraggable),
        r && !a && (t.addEventListener("touchmove", function() {}),
        a = !0)
    }
    ,
    o.onActivateDrag = function() {
        this.handles = [this.viewport],
        this.bindHandles(),
        this.updateDraggable()
    }
    ,
    o.onDeactivateDrag = function() {
        this.unbindHandles(),
        this.element.classList.remove("is-draggable")
    }
    ,
    o.updateDraggable = function() {
        ">1" == this.options.draggable ? this.isDraggable = this.slides.length > 1 : this.isDraggable = this.options.draggable,
        this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
    }
    ,
    o.bindDrag = function() {
        this.options.draggable = !0,
        this.updateDraggable()
    }
    ,
    o.unbindDrag = function() {
        this.options.draggable = !1,
        this.updateDraggable()
    }
    ,
    o._uiChangeDrag = function() {
        delete this.isFreeScrolling
    }
    ,
    o._childUIPointerDownDrag = function(t) {
        t.preventDefault(),
        this.pointerDownFocus(t)
    }
    ,
    o.pointerDown = function(e, i) {
        if (!this.isDraggable)
            return void this._pointerDownDefault(e, i);
        var n = this.okayPointerDown(e);
        n && (this._pointerDownPreventDefault(e),
        this.pointerDownFocus(e),
        document.activeElement != this.element && this.pointerDownBlur(),
        this.dragX = this.x,
        this.viewport.classList.add("is-pointer-down"),
        this.pointerDownScroll = s(),
        t.addEventListener("scroll", this),
        this._pointerDownDefault(e, i))
    }
    ,
    o._pointerDownDefault = function(t, e) {
        this.pointerDownPointer = e,
        this._bindPostStartEvents(t),
        this.dispatchEvent("pointerDown", t, [e])
    }
    ;
    var l = {
        INPUT: !0,
        TEXTAREA: !0,
        SELECT: !0
    };
    return o.pointerDownFocus = function(t) {
        var e = l[t.target.nodeName];
        e || this.focus()
    }
    ,
    o._pointerDownPreventDefault = function(t) {
        var e = "touchstart" == t.type
          , i = "touch" == t.pointerType
          , n = l[t.target.nodeName];
        e || i || n || t.preventDefault()
    }
    ,
    o.hasDragStarted = function(t) {
        return Math.abs(t.x) > this.options.dragThreshold
    }
    ,
    o.pointerUp = function(t, e) {
        delete this.isTouchScrolling,
        this.viewport.classList.remove("is-pointer-down"),
        this.dispatchEvent("pointerUp", t, [e]),
        this._dragPointerUp(t, e)
    }
    ,
    o.pointerDone = function() {
        t.removeEventListener("scroll", this),
        delete this.pointerDownScroll
    }
    ,
    o.dragStart = function(e, i) {
        this.isDraggable && (this.dragStartPosition = this.x,
        this.startAnimation(),
        t.removeEventListener("scroll", this),
        this.dispatchEvent("dragStart", e, [i]))
    }
    ,
    o.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]),
        this._dragMove(t, e, i)
    }
    ,
    o.dragMove = function(t, e, i) {
        if (this.isDraggable) {
            t.preventDefault(),
            this.previousDragX = this.dragX;
            var n = this.options.rightToLeft ? -1 : 1;
            this.options.wrapAround && (i.x = i.x % this.slideableWidth);
            var s = this.dragStartPosition + i.x * n;
            if (!this.options.wrapAround && this.slides.length) {
                var o = Math.max(-this.slides[0].target, this.dragStartPosition);
                s = s > o ? .5 * (s + o) : s;
                var r = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                s = s < r ? .5 * (s + r) : s
            }
            this.dragX = s,
            this.dragMoveTime = new Date,
            this.dispatchEvent("dragMove", t, [e, i])
        }
    }
    ,
    o.dragEnd = function(t, e) {
        if (this.isDraggable) {
            this.options.freeScroll && (this.isFreeScrolling = !0);
            var i = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                var n = this.getRestingPosition();
                this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
            } else
                this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
            delete this.previousDragX,
            this.isDragSelect = this.options.wrapAround,
            this.select(i),
            delete this.isDragSelect,
            this.dispatchEvent("dragEnd", t, [e])
        }
    }
    ,
    o.dragEndRestingSelect = function() {
        var t = this.getRestingPosition()
          , e = Math.abs(this.getSlideDistance(-t, this.selectedIndex))
          , i = this._getClosestResting(t, e, 1)
          , n = this._getClosestResting(t, e, -1)
          , s = i.distance < n.distance ? i.index : n.index;
        return s
    }
    ,
    o._getClosestResting = function(t, e, i) {
        for (var n = this.selectedIndex, s = 1 / 0, o = this.options.contain && !this.options.wrapAround ? function(t, e) {
            return t <= e
        }
        : function(t, e) {
            return t < e
        }
        ; o(e, s) && (n += i,
        s = e,
        e = this.getSlideDistance(-t, n),
        null !== e); )
            e = Math.abs(e);
        return {
            distance: s,
            index: n - i
        }
    }
    ,
    o.getSlideDistance = function(t, e) {
        var i = this.slides.length
          , s = this.options.wrapAround && i > 1
          , o = s ? n.modulo(e, i) : e
          , r = this.slides[o];
        if (!r)
            return null;
        var a = s ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (r.target + a)
    }
    ,
    o.dragEndBoostSelect = function() {
        if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100)
            return 0;
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex)
          , e = this.previousDragX - this.dragX;
        return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0
    }
    ,
    o.staticClick = function(t, e) {
        var i = this.getParentCell(t.target)
          , n = i && i.element
          , s = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, n, s])
    }
    ,
    o.onscroll = function() {
        var t = s()
          , e = this.pointerDownScroll.x - t.x
          , i = this.pointerDownScroll.y - t.y;
        (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone()
    }
    ,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.TapListener = e(t, t.Unipointer)
}(window, function(t, e) {
    function i(t) {
        this.bindTap(t)
    }
    var n = i.prototype = Object.create(e.prototype);
    return n.bindTap = function(t) {
        t && (this.unbindTap(),
        this.tapElement = t,
        this._bindStartEvent(t, !0))
    }
    ,
    n.unbindTap = function() {
        this.tapElement && (this._bindStartEvent(this.tapElement, !0),
        delete this.tapElement)
    }
    ,
    n.pointerUp = function(i, n) {
        if (!this.isIgnoringMouseUp || "mouseup" != i.type) {
            var s = e.getPointerPoint(n)
              , o = this.tapElement.getBoundingClientRect()
              , r = t.pageXOffset
              , a = t.pageYOffset
              , l = s.x >= o.left + r && s.x <= o.right + r && s.y >= o.top + a && s.y <= o.bottom + a;
            if (l && this.emitEvent("tap", [i, n]),
            "mouseup" != i.type) {
                this.isIgnoringMouseUp = !0;
                var h = this;
                setTimeout(function() {
                    delete h.isIgnoringMouseUp
                }, 400)
            }
        }
    }
    ,
    n.destroy = function() {
        this.pointerDone(),
        this.unbindTap()
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    "use strict";
    function s(t, e) {
        this.direction = t,
        this.parent = e,
        this._create()
    }
    function o(t) {
        return "string" == typeof t ? t : "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
    }
    var r = "http://www.w3.org/2000/svg";
    s.prototype = Object.create(i.prototype),
    s.prototype._create = function() {
        this.isEnabled = !0,
        this.isPrevious = this.direction == -1;
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = this.element = document.createElement("button");
        e.className = "flickity-button flickity-prev-next-button",
        e.className += this.isPrevious ? " previous" : " next",
        e.setAttribute("type", "button"),
        this.disable(),
        e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
        var i = this.createSVG();
        e.appendChild(i),
        this.on("tap", this.onTap),
        this.parent.on("select", this.update.bind(this)),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    s.prototype.activate = function() {
        this.bindTap(this.element),
        this.element.addEventListener("click", this),
        this.parent.element.appendChild(this.element)
    }
    ,
    s.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element),
        i.prototype.destroy.call(this),
        this.element.removeEventListener("click", this)
    }
    ,
    s.prototype.createSVG = function() {
        var t = document.createElementNS(r, "svg");
        t.setAttribute("class", "flickity-button-icon"),
        t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(r, "path")
          , i = o(this.parent.options.arrowShape);
        return e.setAttribute("d", i),
        e.setAttribute("class", "arrow"),
        this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "),
        t.appendChild(e),
        t
    }
    ,
    s.prototype.onTap = function() {
        if (this.isEnabled) {
            this.parent.uiChange();
            var t = this.isPrevious ? "previous" : "next";
            this.parent[t]()
        }
    }
    ,
    s.prototype.handleEvent = n.handleEvent,
    s.prototype.onclick = function(t) {
        var e = document.activeElement;
        e && e == this.element && this.onTap(t, t)
    }
    ,
    s.prototype.enable = function() {
        this.isEnabled || (this.element.disabled = !1,
        this.isEnabled = !0)
    }
    ,
    s.prototype.disable = function() {
        this.isEnabled && (this.element.disabled = !0,
        this.isEnabled = !1)
    }
    ,
    s.prototype.update = function() {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && t.length > 1)
            return void this.enable();
        var e = t.length ? t.length - 1 : 0
          , i = this.isPrevious ? 0 : e
          , n = this.parent.selectedIndex == i ? "disable" : "enable";
        this[n]()
    }
    ,
    s.prototype.destroy = function() {
        this.deactivate()
    }
    ,
    n.extend(e.defaults, {
        prevNextButtons: !0,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    }),
    e.createMethods.push("_createPrevNextButtons");
    var a = e.prototype;
    return a._createPrevNextButtons = function() {
        this.options.prevNextButtons && (this.prevButton = new s(-1,this),
        this.nextButton = new s(1,this),
        this.on("activate", this.activatePrevNextButtons))
    }
    ,
    a.activatePrevNextButtons = function() {
        this.prevButton.activate(),
        this.nextButton.activate(),
        this.on("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    a.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate(),
        this.nextButton.deactivate(),
        this.off("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    e.PrevNextButton = s,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    function s(t) {
        this.parent = t,
        this._create()
    }
    s.prototype = new i,
    s.prototype._create = function() {
        this.holder = document.createElement("ol"),
        this.holder.className = "flickity-page-dots",
        this.dots = [],
        this.on("tap", this.onTap),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    s.prototype.activate = function() {
        this.setDots(),
        this.bindTap(this.holder),
        this.parent.element.appendChild(this.holder)
    }
    ,
    s.prototype.deactivate = function() {
        this.parent.element.removeChild(this.holder),
        i.prototype.destroy.call(this)
    }
    ,
    s.prototype.setDots = function() {
        var t = this.parent.slides.length - this.dots.length;
        t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t)
    }
    ,
    s.prototype.addDots = function(t) {
        for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, s = n + t, o = n; o < s; o++) {
            var r = document.createElement("li");
            r.className = "dot",
            r.setAttribute("aria-label", "Page dot " + (o + 1)),
            e.appendChild(r),
            i.push(r)
        }
        this.holder.appendChild(e),
        this.dots = this.dots.concat(i)
    }
    ,
    s.prototype.removeDots = function(t) {
        var e = this.dots.splice(this.dots.length - t, t);
        e.forEach(function(t) {
            this.holder.removeChild(t)
        }, this)
    }
    ,
    s.prototype.updateSelected = function() {
        this.selectedDot && (this.selectedDot.className = "dot",
        this.selectedDot.removeAttribute("aria-current")),
        this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex],
        this.selectedDot.className = "dot is-selected",
        this.selectedDot.setAttribute("aria-current", "step"))
    }
    ,
    s.prototype.onTap = function(t) {
        var e = t.target;
        if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(e);
            this.parent.select(i)
        }
    }
    ,
    s.prototype.destroy = function() {
        this.deactivate()
    }
    ,
    e.PageDots = s,
    n.extend(e.defaults, {
        pageDots: !0
    }),
    e.createMethods.push("_createPageDots");
    var o = e.prototype;
    return o._createPageDots = function() {
        this.options.pageDots && (this.pageDots = new s(this),
        this.on("activate", this.activatePageDots),
        this.on("select", this.updateSelectedPageDots),
        this.on("cellChange", this.updatePageDots),
        this.on("resize", this.updatePageDots),
        this.on("deactivate", this.deactivatePageDots))
    }
    ,
    o.activatePageDots = function() {
        this.pageDots.activate()
    }
    ,
    o.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    }
    ,
    o.updatePageDots = function() {
        this.pageDots.setDots()
    }
    ,
    o.deactivatePageDots = function() {
        this.pageDots.deactivate()
    }
    ,
    e.PageDots = s,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(t, i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
}(window, function(t, e, i) {
    function n(t) {
        this.parent = t,
        this.state = "stopped",
        this.onVisibilityChange = this.visibilityChange.bind(this),
        this.onVisibilityPlay = this.visibilityPlay.bind(this)
    }
    n.prototype = Object.create(t.prototype),
    n.prototype.play = function() {
        if ("playing" != this.state) {
            var t = document.hidden;
            if (t)
                return void document.addEventListener("visibilitychange", this.onVisibilityPlay);
            this.state = "playing",
            document.addEventListener("visibilitychange", this.onVisibilityChange),
            this.tick()
        }
    }
    ,
    n.prototype.tick = function() {
        if ("playing" == this.state) {
            var t = this.parent.options.autoPlay;
            t = "number" == typeof t ? t : 3e3;
            var e = this;
            this.clear(),
            this.timeout = setTimeout(function() {
                e.parent.next(!0),
                e.tick()
            }, t)
        }
    }
    ,
    n.prototype.stop = function() {
        this.state = "stopped",
        this.clear(),
        document.removeEventListener("visibilitychange", this.onVisibilityChange)
    }
    ,
    n.prototype.clear = function() {
        clearTimeout(this.timeout)
    }
    ,
    n.prototype.pause = function() {
        "playing" == this.state && (this.state = "paused",
        this.clear())
    }
    ,
    n.prototype.unpause = function() {
        "paused" == this.state && this.play()
    }
    ,
    n.prototype.visibilityChange = function() {
        var t = document.hidden;
        this[t ? "pause" : "unpause"]()
    }
    ,
    n.prototype.visibilityPlay = function() {
        this.play(),
        document.removeEventListener("visibilitychange", this.onVisibilityPlay)
    }
    ,
    e.extend(i.defaults, {
        pauseAutoPlayOnHover: !0
    }),
    i.createMethods.push("_createPlayer");
    var s = i.prototype;
    return s._createPlayer = function() {
        this.player = new n(this),
        this.on("activate", this.activatePlayer),
        this.on("uiChange", this.stopPlayer),
        this.on("pointerDown", this.stopPlayer),
        this.on("deactivate", this.deactivatePlayer)
    }
    ,
    s.activatePlayer = function() {
        this.options.autoPlay && (this.player.play(),
        this.element.addEventListener("mouseenter", this))
    }
    ,
    s.playPlayer = function() {
        this.player.play()
    }
    ,
    s.stopPlayer = function() {
        this.player.stop()
    }
    ,
    s.pausePlayer = function() {
        this.player.pause()
    }
    ,
    s.unpausePlayer = function() {
        this.player.unpause()
    }
    ,
    s.deactivatePlayer = function() {
        this.player.stop(),
        this.element.removeEventListener("mouseenter", this)
    }
    ,
    s.onmouseenter = function() {
        this.options.pauseAutoPlayOnHover && (this.player.pause(),
        this.element.addEventListener("mouseleave", this))
    }
    ,
    s.onmouseleave = function() {
        this.player.unpause(),
        this.element.removeEventListener("mouseleave", this)
    }
    ,
    i.Player = n,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function(t, e, i) {
    function n(t) {
        var e = document.createDocumentFragment();
        return t.forEach(function(t) {
            e.appendChild(t.element)
        }),
        e
    }
    var s = e.prototype;
    return s.insert = function(t, e) {
        var i = this._makeCells(t);
        if (i && i.length) {
            var s = this.cells.length;
            e = void 0 === e ? s : e;
            var o = n(i)
              , r = e == s;
            if (r)
                this.slider.appendChild(o);
            else {
                var a = this.cells[e].element;
                this.slider.insertBefore(o, a)
            }
            if (0 === e)
                this.cells = i.concat(this.cells);
            else if (r)
                this.cells = this.cells.concat(i);
            else {
                var l = this.cells.splice(e, s - e);
                this.cells = this.cells.concat(i).concat(l)
            }
            this._sizeCells(i),
            this.cellChange(e, !0)
        }
    }
    ,
    s.append = function(t) {
        this.insert(t, this.cells.length)
    }
    ,
    s.prepend = function(t) {
        this.insert(t, 0)
    }
    ,
    s.remove = function(t) {
        var e = this.getCells(t);
        if (e && e.length) {
            var n = this.cells.length - 1;
            e.forEach(function(t) {
                t.remove();
                var e = this.cells.indexOf(t);
                n = Math.min(e, n),
                i.removeFrom(this.cells, t)
            }, this),
            this.cellChange(n, !0)
        }
    }
    ,
    s.cellSizeChange = function(t) {
        var e = this.getCell(t);
        if (e) {
            e.getSize();
            var i = this.cells.indexOf(e);
            this.cellChange(i)
        }
    }
    ,
    s.cellChange = function(t, e) {
        var i = this.selectedElement;
        this._positionCells(t),
        this._getWrapShiftCells(),
        this.setGallerySize();
        var n = this.getCell(i);
        n && (this.selectedIndex = this.getCellSlideIndex(n)),
        this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex),
        this.emitEvent("cellChange", [t]),
        this.select(this.selectedIndex),
        e && this.positionSliderAtSelected()
    }
    ,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function(t, e, i) {
    "use strict";
    function n(t) {
        if ("IMG" == t.nodeName) {
            var e = t.getAttribute("data-flickity-lazyload")
              , n = t.getAttribute("data-flickity-lazyload-src")
              , s = t.getAttribute("data-flickity-lazyload-srcset");
            if (e || n || s)
                return [t]
        }
        var o = "img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]"
          , r = t.querySelectorAll(o);
        return i.makeArray(r)
    }
    function s(t, e) {
        this.img = t,
        this.flickity = e,
        this.load()
    }
    e.createMethods.push("_createLazyload");
    var o = e.prototype;
    return o._createLazyload = function() {
        this.on("select", this.lazyLoad)
    }
    ,
    o.lazyLoad = function() {
        var t = this.options.lazyLoad;
        if (t) {
            var e = "number" == typeof t ? t : 0
              , i = this.getAdjacentCellElements(e)
              , o = [];
            i.forEach(function(t) {
                var e = n(t);
                o = o.concat(e)
            }),
            o.forEach(function(t) {
                new s(t,this)
            }, this)
        }
    }
    ,
    s.prototype.handleEvent = i.handleEvent,
    s.prototype.load = function() {
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this);
        var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src")
          , e = this.img.getAttribute("data-flickity-lazyload-srcset");
        this.img.src = t,
        e && this.img.setAttribute("srcset", e),
        this.img.removeAttribute("data-flickity-lazyload"),
        this.img.removeAttribute("data-flickity-lazyload-src"),
        this.img.removeAttribute("data-flickity-lazyload-srcset")
    }
    ,
    s.prototype.onload = function(t) {
        this.complete(t, "flickity-lazyloaded")
    }
    ,
    s.prototype.onerror = function(t) {
        this.complete(t, "flickity-lazyerror")
    }
    ,
    s.prototype.complete = function(t, e) {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img)
          , n = i && i.element;
        this.flickity.cellSizeChange(n),
        this.img.classList.add(e),
        this.flickity.dispatchEvent("lazyLoad", t, n)
    }
    ,
    e.LazyLoader = s,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, function(t) {
    return t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
}(window, function(t, e) {
    function i(t, e, i) {
        return (e - t) * i + t
    }
    t.createMethods.push("_createAsNavFor");
    var n = t.prototype;
    return n._createAsNavFor = function() {
        this.on("activate", this.activateAsNavFor),
        this.on("deactivate", this.deactivateAsNavFor),
        this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
            var e = this;
            setTimeout(function() {
                e.setNavCompanion(t)
            })
        }
    }
    ,
    n.setNavCompanion = function(i) {
        i = e.getQueryElement(i);
        var n = t.data(i);
        if (n && n != this) {
            this.navCompanion = n;
            var s = this;
            this.onNavCompanionSelect = function() {
                s.navCompanionSelect()
            }
            ,
            n.on("select", this.onNavCompanionSelect),
            this.on("staticClick", this.onNavStaticClick),
            this.navCompanionSelect(!0)
        }
    }
    ,
    n.navCompanionSelect = function(t) {
        if (this.navCompanion) {
            var e = this.navCompanion.selectedCells[0]
              , n = this.navCompanion.cells.indexOf(e)
              , s = n + this.navCompanion.selectedCells.length - 1
              , o = Math.floor(i(n, s, this.navCompanion.cellAlign));
            if (this.selectCell(o, !1, t),
            this.removeNavSelectedElements(),
            !(o >= this.cells.length)) {
                var r = this.cells.slice(n, s + 1);
                this.navSelectedElements = r.map(function(t) {
                    return t.element
                }),
                this.changeNavSelectedClass("add")
            }
        }
    }
    ,
    n.changeNavSelectedClass = function(t) {
        this.navSelectedElements.forEach(function(e) {
            e.classList[t]("is-nav-selected")
        })
    }
    ,
    n.activateAsNavFor = function() {
        this.navCompanionSelect(!0)
    }
    ,
    n.removeNavSelectedElements = function() {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"),
        delete this.navSelectedElements)
    }
    ,
    n.onNavStaticClick = function(t, e, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n)
    }
    ,
    n.deactivateAsNavFor = function() {
        this.removeNavSelectedElements()
    }
    ,
    n.destroyAsNavFor = function() {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect),
        this.off("staticClick", this.onNavStaticClick),
        delete this.navCompanion)
    }
    ,
    t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, function(t, e) {
    function i(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    function n(t) {
        if (Array.isArray(t))
            return t;
        var e = "object" == typeof t && "number" == typeof t.length;
        return e ? h.call(t) : [t]
    }
    function s(t, e, o) {
        if (!(this instanceof s))
            return new s(t,e,o);
        var r = t;
        return "string" == typeof t && (r = document.querySelectorAll(t)),
        r ? (this.elements = n(r),
        this.options = i({}, this.options),
        "function" == typeof e ? o = e : i(this.options, e),
        o && this.on("always", o),
        this.getImages(),
        a && (this.jqDeferred = new a.Deferred),
        void setTimeout(this.check.bind(this))) : void l.error("Bad element for imagesLoaded " + (r || t))
    }
    function o(t) {
        this.img = t
    }
    function r(t, e) {
        this.url = t,
        this.element = e,
        this.img = new Image
    }
    var a = t.jQuery
      , l = t.console
      , h = Array.prototype.slice;
    s.prototype = Object.create(e.prototype),
    s.prototype.options = {},
    s.prototype.getImages = function() {
        this.images = [],
        this.elements.forEach(this.addElementImages, this)
    }
    ,
    s.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t),
        this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && c[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var s = i[n];
                this.addImage(s)
            }
            if ("string" == typeof this.options.background) {
                var o = t.querySelectorAll(this.options.background);
                for (n = 0; n < o.length; n++) {
                    var r = o[n];
                    this.addElementBackgroundImages(r)
                }
            }
        }
    }
    ;
    var c = {
        1: !0,
        9: !0,
        11: !0
    };
    return s.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n; ) {
                var s = n && n[2];
                s && this.addBackground(s, t),
                n = i.exec(e.backgroundImage)
            }
    }
    ,
    s.prototype.addImage = function(t) {
        var e = new o(t);
        this.images.push(e)
    }
    ,
    s.prototype.addBackground = function(t, e) {
        var i = new r(t,e);
        this.images.push(i)
    }
    ,
    s.prototype.check = function() {
        function t(t, i, n) {
            setTimeout(function() {
                e.progress(t, i, n)
            })
        }
        var e = this;
        return this.progressedCount = 0,
        this.hasAnyBroken = !1,
        this.images.length ? void this.images.forEach(function(e) {
            e.once("progress", t),
            e.check()
        }) : void this.complete()
    }
    ,
    s.prototype.progress = function(t, e, i) {
        this.progressedCount++,
        this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded,
        this.emitEvent("progress", [this, t, e]),
        this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
        this.progressedCount == this.images.length && this.complete(),
        this.options.debug && l && l.log("progress: " + i, t, e)
    }
    ,
    s.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0,
        this.emitEvent(t, [this]),
        this.emitEvent("always", [this]),
        this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }
    ,
    o.prototype = Object.create(e.prototype),
    o.prototype.check = function() {
        var t = this.getIsImageComplete();
        return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
        this.proxyImage.addEventListener("load", this),
        this.proxyImage.addEventListener("error", this),
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        void (this.proxyImage.src = this.img.src))
    }
    ,
    o.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }
    ,
    o.prototype.confirm = function(t, e) {
        this.isLoaded = t,
        this.emitEvent("progress", [this, this.img, e])
    }
    ,
    o.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    o.prototype.onload = function() {
        this.confirm(!0, "onload"),
        this.unbindEvents()
    }
    ,
    o.prototype.onerror = function() {
        this.confirm(!1, "onerror"),
        this.unbindEvents()
    }
    ,
    o.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this),
        this.proxyImage.removeEventListener("error", this),
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    r.prototype = Object.create(o.prototype),
    r.prototype.check = function() {
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
        this.unbindEvents())
    }
    ,
    r.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    r.prototype.confirm = function(t, e) {
        this.isLoaded = t,
        this.emitEvent("progress", [this, this.element, e])
    }
    ,
    s.makeJQueryPlugin = function(e) {
        e = e || t.jQuery,
        e && (a = e,
        a.fn.imagesLoaded = function(t, e) {
            var i = new s(this,t,e);
            return i.jqDeferred.promise(a(this))
        }
        )
    }
    ,
    s.makeJQueryPlugin(),
    s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("flickity"), require("imagesloaded")) : t.Flickity = e(t, t.Flickity, t.imagesLoaded)
}(window, function(t, e, i) {
    "use strict";
    e.createMethods.push("_createImagesLoaded");
    var n = e.prototype;
    return n._createImagesLoaded = function() {
        this.on("activate", this.imagesLoaded)
    }
    ,
    n.imagesLoaded = function() {
        function t(t, i) {
            var n = e.getParentCell(i.img);
            e.cellSizeChange(n && n.element),
            e.options.freeScroll || e.positionSliderAtSelected()
        }
        if (this.options.imagesLoaded) {
            var e = this;
            i(this.slider).on("progress", t)
        }
    }
    ,
    e
});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
        var s = function(t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]))
                ;
            return i
        }
          , r = function(t, e, i) {
            var s, r, n = t.cycle;
            for (s in n)
                r = n[s],
                t[s] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
            delete t.cycle
        }
          , n = function(t, e, s) {
            i.call(this, t, e, s),
            this._cycle = 0,
            this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._repeat && this._uncache(!0),
            this.render = n.prototype.render
        }
          , a = 1e-10
          , o = i._internals
          , l = o.isSelector
          , h = o.isArray
          , _ = n.prototype = i.to({}, .1, {})
          , u = [];
        n.version = "2.0.2",
        _.constructor = n,
        _.kill()._gc = !1,
        n.killTweensOf = n.killDelayedCallsTo = i.killTweensOf,
        n.getTweensOf = i.getTweensOf,
        n.lagSmoothing = i.lagSmoothing,
        n.ticker = i.ticker,
        n.render = i.render,
        _.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._yoyoEase = null,
            this._uncache(!0),
            i.prototype.invalidate.call(this)
        }
        ,
        _.updateTo = function(t, e) {
            var s, r = this.ratio, n = this.vars.immediateRender || t.immediateRender;
            e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time,
            this._uncache(!1),
            this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (s in t)
                this.vars[s] = t[s];
            if (this._initted || n)
                if (e)
                    this._initted = !1,
                    n && this.render(0, !0, !0);
                else if (this._gc && this._enabled(!0, !1),
                this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this),
                this._time / this._duration > .998) {
                    var a = this._totalTime;
                    this.render(0, !0, !1),
                    this._initted = !1,
                    this.render(a, !0, !1)
                } else if (this._initted = !1,
                this._init(),
                this._time > 0 || n)
                    for (var o, l = 1 / (1 - r), h = this._firstPT; h; )
                        o = h.s + h.c,
                        h.c *= l,
                        h.s = o - h.c,
                        h = h._next;
            return this
        }
        ,
        _.render = function(t, e, s) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var r, n, l, h, _, u, f, c, p, d = this._dirty ? this.totalDuration() : this._totalDuration, m = this._time, g = this._totalTime, y = this._cycle, v = this._duration, T = this._rawPrevTime;
            if (t >= d - 1e-7 && t >= 0 ? (this._totalTime = d,
            this._cycle = this._repeat,
            this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
            this._reversed || (r = !0,
            n = "onComplete",
            s = s || this._timeline.autoRemoveChildren),
            0 === v && (this._initted || !this.vars.lazy || s) && (this._startTime === this._timeline._duration && (t = 0),
            (0 > T || 0 >= t && t >= -1e-7 || T === a && "isPause" !== this.data) && T !== t && (s = !0,
            T > a && (n = "onReverseComplete")),
            this._rawPrevTime = c = !e || t || T === t ? t : a)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
            (0 !== g || 0 === v && T > 0) && (n = "onReverseComplete",
            r = this._reversed),
            0 > t && (this._active = !1,
            0 === v && (this._initted || !this.vars.lazy || s) && (T >= 0 && (s = !0),
            this._rawPrevTime = c = !e || t || T === t ? t : a)),
            this._initted || (s = !0)) : (this._totalTime = this._time = t,
            0 !== this._repeat && (h = v + this._repeatDelay,
            this._cycle = this._totalTime / h >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / h && t >= g && this._cycle--,
            this._time = this._totalTime - this._cycle * h,
            this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time,
            p = this._yoyoEase || this.vars.yoyoEase,
            p && (this._yoyoEase || (p !== !0 || this._initted ? this._yoyoEase = p = p === !0 ? this._ease : p instanceof Ease ? p : Ease.map[p] : (p = this.vars.ease,
            this._yoyoEase = p = p ? p instanceof Ease ? p : "function" == typeof p ? new Ease(p,this.vars.easeParams) : Ease.map[p] || i.defaultEase : i.defaultEase)),
            this.ratio = p ? 1 - p.getRatio((v - this._time) / v) : 0)),
            this._time > v ? this._time = v : this._time < 0 && (this._time = 0)),
            this._easeType && !p ? (_ = this._time / v,
            u = this._easeType,
            f = this._easePower,
            (1 === u || 3 === u && _ >= .5) && (_ = 1 - _),
            3 === u && (_ *= 2),
            1 === f ? _ *= _ : 2 === f ? _ *= _ * _ : 3 === f ? _ *= _ * _ * _ : 4 === f && (_ *= _ * _ * _ * _),
            1 === u ? this.ratio = 1 - _ : 2 === u ? this.ratio = _ : this._time / v < .5 ? this.ratio = _ / 2 : this.ratio = 1 - _ / 2) : p || (this.ratio = this._ease.getRatio(this._time / v))),
            m === this._time && !s && y === this._cycle)
                return void (g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
            if (!this._initted) {
                if (this._init(),
                !this._initted || this._gc)
                    return;
                if (!s && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                    return this._time = m,
                    this._totalTime = g,
                    this._rawPrevTime = T,
                    this._cycle = y,
                    o.lazyTweens.push(this),
                    void (this._lazy = [t, e]);
                !this._time || r || p ? r && this._ease._calcEnd && !p && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / v)
            }
            for (this._lazy !== !1 && (this._lazy = !1),
            this._active || !this._paused && this._time !== m && t >= 0 && (this._active = !0),
            0 === g && (2 === this._initted && t > 0 && this._init(),
            this._startAt && (t >= 0 ? this._startAt.render(t, !0, s) : n || (n = "_dummyGS")),
            this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this._callback("onStart"))),
            l = this._firstPT; l; )
                l.f ? l.t[l.p](l.c * this.ratio + l.s) : l.t[l.p] = l.c * this.ratio + l.s,
                l = l._next;
            this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, !0, s),
            e || (this._totalTime !== g || n) && this._callback("onUpdate")),
            this._cycle !== y && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")),
            n && (!this._gc || s) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, !0, s),
            r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !e && this.vars[n] && this._callback(n),
            0 === v && this._rawPrevTime === a && c !== a && (this._rawPrevTime = 0))
        }
        ,
        n.to = function(t, e, i) {
            return new n(t,e,i)
        }
        ,
        n.from = function(t, e, i) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            new n(t,e,i)
        }
        ,
        n.fromTo = function(t, e, i, s) {
            return s.startAt = i,
            s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender,
            new n(t,e,s)
        }
        ,
        n.staggerTo = n.allTo = function(t, e, a, o, _, f, c) {
            o = o || 0;
            var p, d, m, g, y = 0, v = [], T = function() {
                a.onComplete && a.onComplete.apply(a.onCompleteScope || this, arguments),
                _.apply(c || a.callbackScope || this, f || u)
            }, x = a.cycle, b = a.startAt && a.startAt.cycle;
            for (h(t) || ("string" == typeof t && (t = i.selector(t) || t),
            l(t) && (t = s(t))),
            t = t || [],
            0 > o && (t = s(t),
            t.reverse(),
            o *= -1),
            p = t.length - 1,
            m = 0; p >= m; m++) {
                d = {};
                for (g in a)
                    d[g] = a[g];
                if (x && (r(d, t, m),
                null != d.duration && (e = d.duration,
                delete d.duration)),
                b) {
                    b = d.startAt = {};
                    for (g in a.startAt)
                        b[g] = a.startAt[g];
                    r(d.startAt, t, m)
                }
                d.delay = y + (d.delay || 0),
                m === p && _ && (d.onComplete = T),
                v[m] = new n(t[m],e,d),
                y += o
            }
            return v
        }
        ,
        n.staggerFrom = n.allFrom = function(t, e, i, s, r, a, o) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            n.staggerTo(t, e, i, s, r, a, o)
        }
        ,
        n.staggerFromTo = n.allFromTo = function(t, e, i, s, r, a, o, l) {
            return s.startAt = i,
            s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender,
            n.staggerTo(t, e, s, r, a, o, l)
        }
        ,
        n.delayedCall = function(t, e, i, s, r) {
            return new n(e,0,{
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                callbackScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                immediateRender: !1,
                useFrames: r,
                overwrite: 0
            })
        }
        ,
        n.set = function(t, e) {
            return new n(t,0,e)
        }
        ,
        n.isTweening = function(t) {
            return i.getTweensOf(t, !0).length > 0
        }
        ;
        var f = function(t, e) {
            for (var s = [], r = 0, n = t._first; n; )
                n instanceof i ? s[r++] = n : (e && (s[r++] = n),
                s = s.concat(f(n, e)),
                r = s.length),
                n = n._next;
            return s
        }
          , c = n.getAllTweens = function(e) {
            return f(t._rootTimeline, e).concat(f(t._rootFramesTimeline, e))
        }
        ;
        n.killAll = function(t, i, s, r) {
            null == i && (i = !0),
            null == s && (s = !0);
            var n, a, o, l = c(0 != r), h = l.length, _ = i && s && r;
            for (o = 0; h > o; o++)
                a = l[o],
                (_ || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && (t ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
        }
        ,
        n.killChildTweensOf = function(t, e) {
            if (null != t) {
                var r, a, _, u, f, c = o.tweenLookup;
                if ("string" == typeof t && (t = i.selector(t) || t),
                l(t) && (t = s(t)),
                h(t))
                    for (u = t.length; --u > -1; )
                        n.killChildTweensOf(t[u], e);
                else {
                    r = [];
                    for (_ in c)
                        for (a = c[_].target.parentNode; a; )
                            a === t && (r = r.concat(c[_].tweens)),
                            a = a.parentNode;
                    for (f = r.length,
                    u = 0; f > u; u++)
                        e && r[u].totalTime(r[u].totalDuration()),
                        r[u]._enabled(!1, !1)
                }
            }
        }
        ;
        var p = function(t, i, s, r) {
            i = i !== !1,
            s = s !== !1,
            r = r !== !1;
            for (var n, a, o = c(r), l = i && s && r, h = o.length; --h > -1; )
                a = o[h],
                (l || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && a.paused(t)
        };
        return n.pauseAll = function(t, e, i) {
            p(!0, t, e, i)
        }
        ,
        n.resumeAll = function(t, e, i) {
            p(!1, t, e, i)
        }
        ,
        n.globalTimeScale = function(e) {
            var s = t._rootTimeline
              , r = i.ticker.time;
            return arguments.length ? (e = e || a,
            s._startTime = r - (r - s._startTime) * s._timeScale / e,
            s = t._rootFramesTimeline,
            r = i.ticker.frame,
            s._startTime = r - (r - s._startTime) * s._timeScale / e,
            s._timeScale = t._rootTimeline._timeScale = e,
            e) : s._timeScale
        }
        ,
        _.progress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
        }
        ,
        _.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
        }
        ,
        _.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            t > this._duration && (t = this._duration),
            this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(t, e)) : this._time
        }
        ,
        _.duration = function(e) {
            return arguments.length ? t.prototype.duration.call(this, e) : this._duration
        }
        ,
        _.totalDuration = function(t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat,
            this._dirty = !1),
            this._totalDuration)
        }
        ,
        _.repeat = function(t) {
            return arguments.length ? (this._repeat = t,
            this._uncache(!0)) : this._repeat
        }
        ,
        _.repeatDelay = function(t) {
            return arguments.length ? (this._repeatDelay = t,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        _.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t,
            this) : this._yoyo
        }
        ,
        n
    }, !0),
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
        var s = function(t) {
            e.call(this, t),
            this._labels = {},
            this.autoRemoveChildren = this.vars.autoRemoveChildren === !0,
            this.smoothChildTiming = this.vars.smoothChildTiming === !0,
            this._sortChildren = !0,
            this._onUpdate = this.vars.onUpdate;
            var i, s, r = this.vars;
            for (s in r)
                i = r[s],
                l(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
            l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
        }
          , r = 1e-10
          , n = i._internals
          , a = s._internals = {}
          , o = n.isSelector
          , l = n.isArray
          , h = n.lazyTweens
          , _ = n.lazyRender
          , u = _gsScope._gsDefine.globals
          , f = function(t) {
            var e, i = {};
            for (e in t)
                i[e] = t[e];
            return i
        }
          , c = function(t, e, i) {
            var s, r, n = t.cycle;
            for (s in n)
                r = n[s],
                t[s] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
            delete t.cycle
        }
          , p = a.pauseCallback = function() {}
          , d = function(t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]))
                ;
            return i
        }
          , m = s.prototype = new e;
        return s.version = "2.0.2",
        m.constructor = s,
        m.kill()._gc = m._forcingPlayhead = m._hasPause = !1,
        m.to = function(t, e, s, r) {
            var n = s.repeat && u.TweenMax || i;
            return e ? this.add(new n(t,e,s), r) : this.set(t, s, r)
        }
        ,
        m.from = function(t, e, s, r) {
            return this.add((s.repeat && u.TweenMax || i).from(t, e, s), r)
        }
        ,
        m.fromTo = function(t, e, s, r, n) {
            var a = r.repeat && u.TweenMax || i;
            return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
        }
        ,
        m.staggerTo = function(t, e, r, n, a, l, h, _) {
            var u, p, m = new s({
                onComplete: l,
                onCompleteParams: h,
                callbackScope: _,
                smoothChildTiming: this.smoothChildTiming
            }), g = r.cycle;
            for ("string" == typeof t && (t = i.selector(t) || t),
            t = t || [],
            o(t) && (t = d(t)),
            n = n || 0,
            0 > n && (t = d(t),
            t.reverse(),
            n *= -1),
            p = 0; p < t.length; p++)
                u = f(r),
                u.startAt && (u.startAt = f(u.startAt),
                u.startAt.cycle && c(u.startAt, t, p)),
                g && (c(u, t, p),
                null != u.duration && (e = u.duration,
                delete u.duration)),
                m.to(t[p], e, u, p * n);
            return this.add(m, a)
        }
        ,
        m.staggerFrom = function(t, e, i, s, r, n, a, o) {
            return i.immediateRender = 0 != i.immediateRender,
            i.runBackwards = !0,
            this.staggerTo(t, e, i, s, r, n, a, o)
        }
        ,
        m.staggerFromTo = function(t, e, i, s, r, n, a, o, l) {
            return s.startAt = i,
            s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender,
            this.staggerTo(t, e, s, r, n, a, o, l)
        }
        ,
        m.call = function(t, e, s, r) {
            return this.add(i.delayedCall(0, t, e, s), r)
        }
        ,
        m.set = function(t, e, s) {
            return s = this._parseTimeOrLabel(s, 0, !0),
            null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused),
            this.add(new i(t,0,e), s)
        }
        ,
        s.exportRoot = function(t, e) {
            t = t || {},
            null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var r, n, a, o, l = new s(t), h = l._timeline;
            for (null == e && (e = !0),
            h._remove(l, !0),
            l._startTime = 0,
            l._rawPrevTime = l._time = l._totalTime = h._time,
            a = h._first; a; )
                o = a._next,
                e && a instanceof i && a.target === a.vars.onComplete || (n = a._startTime - a._delay,
                0 > n && (r = 1),
                l.add(a, n)),
                a = o;
            return h.add(l, 0),
            r && l.totalDuration(),
            l
        }
        ,
        m.add = function(r, n, a, o) {
            var h, _, u, f, c, p;
            if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)),
            !(r instanceof t)) {
                if (r instanceof Array || r && r.push && l(r)) {
                    for (a = a || "normal",
                    o = o || 0,
                    h = n,
                    _ = r.length,
                    u = 0; _ > u; u++)
                        l(f = r[u]) && (f = new s({
                            tweens: f
                        })),
                        this.add(f, h),
                        "string" != typeof f && "function" != typeof f && ("sequence" === a ? h = f._startTime + f.totalDuration() / f._timeScale : "start" === a && (f._startTime -= f.delay())),
                        h += o;
                    return this._uncache(!0)
                }
                if ("string" == typeof r)
                    return this.addLabel(r, n);
                if ("function" != typeof r)
                    throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = i.delayedCall(0, r)
            }
            if (e.prototype.add.call(this, r, n),
            r._time && (h = Math.max(0, Math.min(r.totalDuration(), (this.rawTime() - r._startTime) * r._timeScale)),
            Math.abs(h - r._totalTime) > 1e-5 && r.render(h, !1, !1)),
            (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (c = this,
                p = c.rawTime() > r._startTime; c._timeline; )
                    p && c._timeline.smoothChildTiming ? c.totalTime(c._totalTime, !0) : c._gc && c._enabled(!0, !1),
                    c = c._timeline;
            return this
        }
        ,
        m.remove = function(e) {
            if (e instanceof t) {
                this._remove(e, !1);
                var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale,
                this
            }
            if (e instanceof Array || e && e.push && l(e)) {
                for (var s = e.length; --s > -1; )
                    this.remove(e[s]);
                return this
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
        }
        ,
        m._remove = function(t, i) {
            e.prototype._remove.call(this, t, i);
            var s = this._last;
            return s ? this._time > this.duration() && (this._time = this._duration,
            this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
            this
        }
        ,
        m.append = function(t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }
        ,
        m.insert = m.insertMultiple = function(t, e, i, s) {
            return this.add(t, e || 0, i, s)
        }
        ,
        m.appendMultiple = function(t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
        }
        ,
        m.addLabel = function(t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e),
            this
        }
        ,
        m.addPause = function(t, e, s, r) {
            var n = i.delayedCall(0, p, s, r || this);
            return n.vars.onComplete = n.vars.onReverseComplete = e,
            n.data = "isPause",
            this._hasPause = !0,
            this.add(n, t)
        }
        ,
        m.removeLabel = function(t) {
            return delete this._labels[t],
            this
        }
        ,
        m.getLabelTime = function(t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }
        ,
        m._parseTimeOrLabel = function(e, i, s, r) {
            var n, a;
            if (r instanceof t && r.timeline === this)
                this.remove(r);
            else if (r && (r instanceof Array || r.push && l(r)))
                for (a = r.length; --a > -1; )
                    r[a]instanceof t && r[a].timeline === this && this.remove(r[a]);
            if (n = "number" != typeof e || i ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0,
            "string" == typeof i)
                return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - n : 0, s);
            if (i = i || 0,
            "string" != typeof e || !isNaN(e) && null == this._labels[e])
                null == e && (e = n);
            else {
                if (a = e.indexOf("="),
                -1 === a)
                    return null == this._labels[e] ? s ? this._labels[e] = n + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(a - 1) + "1", 10) * Number(e.substr(a + 1)),
                e = a > 1 ? this._parseTimeOrLabel(e.substr(0, a - 1), 0, s) : n
            }
            return Number(e) + i
        }
        ,
        m.seek = function(t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
        }
        ,
        m.stop = function() {
            return this.paused(!0)
        }
        ,
        m.gotoAndPlay = function(t, e) {
            return this.play(t, e)
        }
        ,
        m.gotoAndStop = function(t, e) {
            return this.pause(t, e)
        }
        ,
        m.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, n, a, o, l, u, f, c = this._time, p = this._dirty ? this.totalDuration() : this._totalDuration, d = this._startTime, m = this._timeScale, g = this._paused;
            if (c !== this._time && (t += this._time - c),
            t >= p - 1e-7 && t >= 0)
                this._totalTime = this._time = p,
                this._reversed || this._hasPausedChild() || (n = !0,
                o = "onComplete",
                l = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 >= t && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0,
                this._rawPrevTime > r && (o = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r,
                t = p + 1e-4;
            else if (1e-7 > t)
                if (this._totalTime = this._time = 0,
                (0 !== c || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete",
                n = this._reversed),
                0 > t)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (l = n = !0,
                    o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0),
                    this._rawPrevTime = t;
                else {
                    if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r,
                    0 === t && n)
                        for (s = this._first; s && 0 === s._startTime; )
                            s._duration || (n = !1),
                            s = s._next;
                    t = 0,
                    this._initted || (l = !0)
                }
            else {
                if (this._hasPause && !this._forcingPlayhead && !e) {
                    if (t >= c)
                        for (s = this._first; s && s._startTime <= t && !u; )
                            s._duration || "isPause" !== s.data || s.ratio || 0 === s._startTime && 0 === this._rawPrevTime || (u = s),
                            s = s._next;
                    else
                        for (s = this._last; s && s._startTime >= t && !u; )
                            s._duration || "isPause" === s.data && s._rawPrevTime > 0 && (u = s),
                            s = s._prev;
                    u && (this._time = t = u._startTime,
                    this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = t
            }
            if (this._time !== c && this._first || i || l || u) {
                if (this._initted || (this._initted = !0),
                this._active || !this._paused && this._time !== c && t > 0 && (this._active = !0),
                0 === c && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")),
                f = this._time,
                f >= c)
                    for (s = this._first; s && (a = s._next,
                    f === this._time && (!this._paused || g)); )
                        (s._active || s._startTime <= f && !s._paused && !s._gc) && (u === s && this.pause(),
                        s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)),
                        s = a;
                else
                    for (s = this._last; s && (a = s._prev,
                    f === this._time && (!this._paused || g)); ) {
                        if (s._active || s._startTime <= c && !s._paused && !s._gc) {
                            if (u === s) {
                                for (u = s._prev; u && u.endTime() > this._time; )
                                    u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i),
                                    u = u._prev;
                                u = null,
                                this.pause()
                            }
                            s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)
                        }
                        s = a
                    }
                this._onUpdate && (e || (h.length && _(),
                this._callback("onUpdate"))),
                o && (this._gc || (d === this._startTime || m !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (n && (h.length && _(),
                this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !e && this.vars[o] && this._callback(o)))
            }
        }
        ,
        m._hasPausedChild = function() {
            for (var t = this._first; t; ) {
                if (t._paused || t instanceof s && t._hasPausedChild())
                    return !0;
                t = t._next
            }
            return !1
        }
        ,
        m.getChildren = function(t, e, s, r) {
            r = r || -9999999999;
            for (var n = [], a = this._first, o = 0; a; )
                a._startTime < r || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a),
                t !== !1 && (n = n.concat(a.getChildren(!0, e, s)),
                o = n.length))),
                a = a._next;
            return n
        }
        ,
        m.getTweensOf = function(t, e) {
            var s, r, n = this._gc, a = [], o = 0;
            for (n && this._enabled(!0, !0),
            s = i.getTweensOf(t),
            r = s.length; --r > -1; )
                (s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
            return n && this._enabled(!1, !0),
            a
        }
        ,
        m.recent = function() {
            return this._recent
        }
        ,
        m._contains = function(t) {
            for (var e = t.timeline; e; ) {
                if (e === this)
                    return !0;
                e = e.timeline
            }
            return !1
        }
        ,
        m.shiftChildren = function(t, e, i) {
            i = i || 0;
            for (var s, r = this._first, n = this._labels; r; )
                r._startTime >= i && (r._startTime += t),
                r = r._next;
            if (e)
                for (s in n)
                    n[s] >= i && (n[s] += t);
            return this._uncache(!0)
        }
        ,
        m._kill = function(t, e) {
            if (!t && !e)
                return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1; )
                i[s]._kill(t, e) && (r = !0);
            return r
        }
        ,
        m.clear = function(t) {
            var e = this.getChildren(!1, !0, !0)
              , i = e.length;
            for (this._time = this._totalTime = 0; --i > -1; )
                e[i]._enabled(!1, !1);
            return t !== !1 && (this._labels = {}),
            this._uncache(!0)
        }
        ,
        m.invalidate = function() {
            for (var e = this._first; e; )
                e.invalidate(),
                e = e._next;
            return t.prototype.invalidate.call(this)
        }
        ,
        m._enabled = function(t, i) {
            if (t === this._gc)
                for (var s = this._first; s; )
                    s._enabled(t, !0),
                    s = s._next;
            return e.prototype._enabled.call(this, t, i)
        }
        ,
        m.totalTime = function(e, i, s) {
            this._forcingPlayhead = !0;
            var r = t.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1,
            r
        }
        ,
        m.duration = function(t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t),
            this) : (this._dirty && this.totalDuration(),
            this._duration)
        }
        ,
        m.totalDuration = function(t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, s = 0, r = this._last, n = 999999999999; r; )
                        e = r._prev,
                        r._dirty && r.totalDuration(),
                        r._startTime > n && this._sortChildren && !r._paused && !this._calculatingDuration ? (this._calculatingDuration = 1,
                        this.add(r, r._startTime - r._delay),
                        this._calculatingDuration = 0) : n = r._startTime,
                        r._startTime < 0 && !r._paused && (s -= r._startTime,
                        this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale,
                        this._time -= r._startTime,
                        this._totalTime -= r._startTime,
                        this._rawPrevTime -= r._startTime),
                        this.shiftChildren(-r._startTime, !1, -9999999999),
                        n = 0),
                        i = r._startTime + r._totalDuration / r._timeScale,
                        i > s && (s = i),
                        r = e;
                    this._duration = this._totalDuration = s,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
        }
        ,
        m.paused = function(e) {
            if (!e)
                for (var i = this._first, s = this._time; i; )
                    i._startTime === s && "isPause" === i.data && (i._rawPrevTime = 0),
                    i = i._next;
            return t.prototype.paused.apply(this, arguments)
        }
        ,
        m.usesFrames = function() {
            for (var e = this._timeline; e._timeline; )
                e = e._timeline;
            return e === t._rootFramesTimeline
        }
        ,
        m.rawTime = function(t) {
            return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
        }
        ,
        s
    }, !0),
    _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
        var s = function(e) {
            t.call(this, e),
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._cycle = 0,
            this._yoyo = this.vars.yoyo === !0,
            this._dirty = !0
        }
          , r = 1e-10
          , n = e._internals
          , a = n.lazyTweens
          , o = n.lazyRender
          , l = _gsScope._gsDefine.globals
          , h = new i(null,null,1,0)
          , _ = s.prototype = new t;
        return _.constructor = s,
        _.kill()._gc = !1,
        s.version = "2.0.2",
        _.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            t.prototype.invalidate.call(this)
        }
        ,
        _.addCallback = function(t, i, s, r) {
            return this.add(e.delayedCall(0, t, s, r), i)
        }
        ,
        _.removeCallback = function(t, e) {
            if (t)
                if (null == e)
                    this._kill(null, t);
                else
                    for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1; )
                        i[s]._startTime === r && i[s]._enabled(!1, !1);
            return this
        }
        ,
        _.removePause = function(e) {
            return this.removeCallback(t._internals.pauseCallback, e)
        }
        ,
        _.tweenTo = function(t, i) {
            i = i || {};
            var s, r, n, a = {
                ease: h,
                useFrames: this.usesFrames(),
                immediateRender: !1,
                lazy: !1
            }, o = i.repeat && l.TweenMax || e;
            for (r in i)
                a[r] = i[r];
            return a.time = this._parseTimeOrLabel(t),
            s = Math.abs(Number(a.time) - this._time) / this._timeScale || .001,
            n = new o(this,s,a),
            a.onStart = function() {
                n.target.paused(!0),
                n.vars.time === n.target.time() || s !== n.duration() || n.isFromTo || n.duration(Math.abs(n.vars.time - n.target.time()) / n.target._timeScale).render(n.time(), !0, !0),
                i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || n, i.onStartParams || [])
            }
            ,
            n
        }
        ,
        _.tweenFromTo = function(t, e, i) {
            i = i || {},
            t = this._parseTimeOrLabel(t),
            i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                callbackScope: this
            },
            i.immediateRender = i.immediateRender !== !1;
            var s = this.tweenTo(e, i);
            return s.isFromTo = 1,
            s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
        }
        ,
        _.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, n, l, h, _, u, f, c, p = this._time, d = this._dirty ? this.totalDuration() : this._totalDuration, m = this._duration, g = this._totalTime, y = this._startTime, v = this._timeScale, T = this._rawPrevTime, x = this._paused, b = this._cycle;
            if (p !== this._time && (t += this._time - p),
            t >= d - 1e-7 && t >= 0)
                this._locked || (this._totalTime = d,
                this._cycle = this._repeat),
                this._reversed || this._hasPausedChild() || (n = !0,
                h = "onComplete",
                _ = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 >= t && t >= -1e-7 || 0 > T || T === r) && T !== t && this._first && (_ = !0,
                T > r && (h = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r,
                this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = m,
                t = m + 1e-4);
            else if (1e-7 > t)
                if (this._locked || (this._totalTime = this._cycle = 0),
                this._time = 0,
                (0 !== p || 0 === m && T !== r && (T > 0 || 0 > t && T >= 0) && !this._locked) && (h = "onReverseComplete",
                n = this._reversed),
                0 > t)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (_ = n = !0,
                    h = "onReverseComplete") : T >= 0 && this._first && (_ = !0),
                    this._rawPrevTime = t;
                else {
                    if (this._rawPrevTime = m || !e || t || this._rawPrevTime === t ? t : r,
                    0 === t && n)
                        for (s = this._first; s && 0 === s._startTime; )
                            s._duration || (n = !1),
                            s = s._next;
                    t = 0,
                    this._initted || (_ = !0)
                }
            else if (0 === m && 0 > T && (_ = !0),
            this._time = this._rawPrevTime = t,
            this._locked || (this._totalTime = t,
            0 !== this._repeat && (u = m + this._repeatDelay,
            this._cycle = this._totalTime / u >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / u && t >= g && this._cycle--,
            this._time = this._totalTime - this._cycle * u,
            this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time),
            this._time > m ? (this._time = m,
            t = m + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)),
            this._hasPause && !this._forcingPlayhead && !e) {
                if (t = this._time,
                t >= p || this._repeat && b !== this._cycle)
                    for (s = this._first; s && s._startTime <= t && !f; )
                        s._duration || "isPause" !== s.data || s.ratio || 0 === s._startTime && 0 === this._rawPrevTime || (f = s),
                        s = s._next;
                else
                    for (s = this._last; s && s._startTime >= t && !f; )
                        s._duration || "isPause" === s.data && s._rawPrevTime > 0 && (f = s),
                        s = s._prev;
                f && f._startTime < m && (this._time = t = f._startTime,
                this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== b && !this._locked) {
                var w = this._yoyo && 0 !== (1 & b)
                  , P = w === (this._yoyo && 0 !== (1 & this._cycle))
                  , O = this._totalTime
                  , S = this._cycle
                  , k = this._rawPrevTime
                  , R = this._time;
                if (this._totalTime = b * m,
                this._cycle < b ? w = !w : this._totalTime += m,
                this._time = p,
                this._rawPrevTime = 0 === m ? T - 1e-4 : T,
                this._cycle = b,
                this._locked = !0,
                p = w ? 0 : m,
                this.render(p, e, 0 === m),
                e || this._gc || this.vars.onRepeat && (this._cycle = S,
                this._locked = !1,
                this._callback("onRepeat")),
                p !== this._time)
                    return;
                if (P && (this._cycle = b,
                this._locked = !0,
                p = w ? m + 1e-4 : -1e-4,
                this.render(p, !0, !1)),
                this._locked = !1,
                this._paused && !x)
                    return;
                this._time = R,
                this._totalTime = O,
                this._cycle = S,
                this._rawPrevTime = k
            }
            if (!(this._time !== p && this._first || i || _ || f))
                return void (g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
            if (this._initted || (this._initted = !0),
            this._active || !this._paused && this._totalTime !== g && t > 0 && (this._active = !0),
            0 === g && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")),
            c = this._time,
            c >= p)
                for (s = this._first; s && (l = s._next,
                c === this._time && (!this._paused || x)); )
                    (s._active || s._startTime <= this._time && !s._paused && !s._gc) && (f === s && this.pause(),
                    s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)),
                    s = l;
            else
                for (s = this._last; s && (l = s._prev,
                c === this._time && (!this._paused || x)); ) {
                    if (s._active || s._startTime <= p && !s._paused && !s._gc) {
                        if (f === s) {
                            for (f = s._prev; f && f.endTime() > this._time; )
                                f.render(f._reversed ? f.totalDuration() - (t - f._startTime) * f._timeScale : (t - f._startTime) * f._timeScale, e, i),
                                f = f._prev;
                            f = null,
                            this.pause()
                        }
                        s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)
                    }
                    s = l
                }
            this._onUpdate && (e || (a.length && o(),
            this._callback("onUpdate"))),
            h && (this._locked || this._gc || (y === this._startTime || v !== this._timeScale) && (0 === this._time || d >= this.totalDuration()) && (n && (a.length && o(),
            this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !e && this.vars[h] && this._callback(h)))
        }
        ,
        _.getActive = function(t, e, i) {
            null == t && (t = !0),
            null == e && (e = !0),
            null == i && (i = !1);
            var s, r, n = [], a = this.getChildren(t, e, i), o = 0, l = a.length;
            for (s = 0; l > s; s++)
                r = a[s],
                r.isActive() && (n[o++] = r);
            return n
        }
        ,
        _.getLabelAfter = function(t) {
            t || 0 !== t && (t = this._time);
            var e, i = this.getLabelsArray(), s = i.length;
            for (e = 0; s > e; e++)
                if (i[e].time > t)
                    return i[e].name;
            return null
        }
        ,
        _.getLabelBefore = function(t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1; )
                if (e[i].time < t)
                    return e[i].name;
            return null
        }
        ,
        _.getLabelsArray = function() {
            var t, e = [], i = 0;
            for (t in this._labels)
                e[i++] = {
                    time: this._labels[t],
                    name: t
                };
            return e.sort(function(t, e) {
                return t.time - e.time
            }),
            e
        }
        ,
        _.invalidate = function() {
            return this._locked = !1,
            t.prototype.invalidate.call(this)
        }
        ,
        _.progress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration() || 0
        }
        ,
        _.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration() || 0
        }
        ,
        _.totalDuration = function(e) {
            return arguments.length ? -1 !== this._repeat && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this),
            this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat),
            this._totalDuration)
        }
        ,
        _.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            t > this._duration && (t = this._duration),
            this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(t, e)) : this._time
        }
        ,
        _.repeat = function(t) {
            return arguments.length ? (this._repeat = t,
            this._uncache(!0)) : this._repeat
        }
        ,
        _.repeatDelay = function(t) {
            return arguments.length ? (this._repeatDelay = t,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        _.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t,
            this) : this._yoyo
        }
        ,
        _.currentLabel = function(t) {
            return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
        }
        ,
        s
    }, !0),
    function() {
        var t = 180 / Math.PI
          , e = []
          , i = []
          , s = []
          , r = {}
          , n = _gsScope._gsDefine.globals
          , a = function(t, e, i, s) {
            i === s && (i = s - (s - e) / 1e6),
            t === e && (e = t + (i - t) / 1e6),
            this.a = t,
            this.b = e,
            this.c = i,
            this.d = s,
            this.da = s - t,
            this.ca = i - t,
            this.ba = e - t
        }
          , o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,"
          , l = function(t, e, i, s) {
            var r = {
                a: t
            }
              , n = {}
              , a = {}
              , o = {
                c: s
            }
              , l = (t + e) / 2
              , h = (e + i) / 2
              , _ = (i + s) / 2
              , u = (l + h) / 2
              , f = (h + _) / 2
              , c = (f - u) / 8;
            return r.b = l + (t - l) / 4,
            n.b = u + c,
            r.c = n.a = (r.b + n.b) / 2,
            n.c = a.a = (u + f) / 2,
            a.b = f - c,
            o.b = _ + (s - _) / 4,
            a.c = o.a = (a.b + o.b) / 2,
            [r, n, a, o]
        }
          , h = function(t, r, n, a, o) {
            var h, _, u, f, c, p, d, m, g, y, v, T, x, b = t.length - 1, w = 0, P = t[0].a;
            for (h = 0; b > h; h++)
                c = t[w],
                _ = c.a,
                u = c.d,
                f = t[w + 1].d,
                o ? (v = e[h],
                T = i[h],
                x = (T + v) * r * .25 / (a ? .5 : s[h] || .5),
                p = u - (u - _) * (a ? .5 * r : 0 !== v ? x / v : 0),
                d = u + (f - u) * (a ? .5 * r : 0 !== T ? x / T : 0),
                m = u - (p + ((d - p) * (3 * v / (v + T) + .5) / 4 || 0))) : (p = u - (u - _) * r * .5,
                d = u + (f - u) * r * .5,
                m = u - (p + d) / 2),
                p += m,
                d += m,
                c.c = g = p,
                0 !== h ? c.b = P : c.b = P = c.a + .6 * (c.c - c.a),
                c.da = u - _,
                c.ca = g - _,
                c.ba = P - _,
                n ? (y = l(_, P, g, u),
                t.splice(w, 1, y[0], y[1], y[2], y[3]),
                w += 4) : w++,
                P = d;
            c = t[w],
            c.b = P,
            c.c = P + .4 * (c.d - P),
            c.da = c.d - c.a,
            c.ca = c.c - c.a,
            c.ba = P - c.a,
            n && (y = l(c.a, P, c.c, c.d),
            t.splice(w, 1, y[0], y[1], y[2], y[3]))
        }
          , _ = function(t, s, r, n) {
            var o, l, h, _, u, f, c = [];
            if (n)
                for (t = [n].concat(t),
                l = t.length; --l > -1; )
                    "string" == typeof (f = t[l][s]) && "=" === f.charAt(1) && (t[l][s] = n[s] + Number(f.charAt(0) + f.substr(2)));
            if (o = t.length - 2,
            0 > o)
                return c[0] = new a(t[0][s],0,0,t[0][s]),
                c;
            for (l = 0; o > l; l++)
                h = t[l][s],
                _ = t[l + 1][s],
                c[l] = new a(h,0,0,_),
                r && (u = t[l + 2][s],
                e[l] = (e[l] || 0) + (_ - h) * (_ - h),
                i[l] = (i[l] || 0) + (u - _) * (u - _));
            return c[l] = new a(t[l][s],0,0,t[l + 1][s]),
            c
        }
          , u = function(t, n, a, l, u, f) {
            var c, p, d, m, g, y, v, T, x = {}, b = [], w = f || t[0];
            u = "string" == typeof u ? "," + u + "," : o,
            null == n && (n = 1);
            for (p in t[0])
                b.push(p);
            if (t.length > 1) {
                for (T = t[t.length - 1],
                v = !0,
                c = b.length; --c > -1; )
                    if (p = b[c],
                    Math.abs(w[p] - T[p]) > .05) {
                        v = !1;
                        break
                    }
                v && (t = t.concat(),
                f && t.unshift(f),
                t.push(t[1]),
                f = t[t.length - 3])
            }
            for (e.length = i.length = s.length = 0,
            c = b.length; --c > -1; )
                p = b[c],
                r[p] = -1 !== u.indexOf("," + p + ","),
                x[p] = _(t, p, r[p], f);
            for (c = e.length; --c > -1; )
                e[c] = Math.sqrt(e[c]),
                i[c] = Math.sqrt(i[c]);
            if (!l) {
                for (c = b.length; --c > -1; )
                    if (r[p])
                        for (d = x[b[c]],
                        y = d.length - 1,
                        m = 0; y > m; m++)
                            g = d[m + 1].da / i[m] + d[m].da / e[m] || 0,
                            s[m] = (s[m] || 0) + g * g;
                for (c = s.length; --c > -1; )
                    s[c] = Math.sqrt(s[c])
            }
            for (c = b.length,
            m = a ? 4 : 1; --c > -1; )
                p = b[c],
                d = x[p],
                h(d, n, a, l, r[p]),
                v && (d.splice(0, m),
                d.splice(d.length - m, m));
            return x
        }
          , f = function(t, e, i) {
            e = e || "soft";
            var s, r, n, o, l, h, _, u, f, c, p, d = {}, m = "cubic" === e ? 3 : 2, g = "soft" === e, y = [];
            if (g && i && (t = [i].concat(t)),
            null == t || t.length < m + 1)
                throw "invalid Bezier data";
            for (f in t[0])
                y.push(f);
            for (h = y.length; --h > -1; ) {
                for (f = y[h],
                d[f] = l = [],
                c = 0,
                u = t.length,
                _ = 0; u > _; _++)
                    s = null == i ? t[_][f] : "string" == typeof (p = t[_][f]) && "=" === p.charAt(1) ? i[f] + Number(p.charAt(0) + p.substr(2)) : Number(p),
                    g && _ > 1 && u - 1 > _ && (l[c++] = (s + l[c - 2]) / 2),
                    l[c++] = s;
                for (u = c - m + 1,
                c = 0,
                _ = 0; u > _; _ += m)
                    s = l[_],
                    r = l[_ + 1],
                    n = l[_ + 2],
                    o = 2 === m ? 0 : l[_ + 3],
                    l[c++] = p = 3 === m ? new a(s,r,n,o) : new a(s,(2 * r + s) / 3,(2 * r + n) / 3,n);
                l.length = c
            }
            return d
        }
          , c = function(t, e, i) {
            for (var s, r, n, a, o, l, h, _, u, f, c, p = 1 / i, d = t.length; --d > -1; )
                for (f = t[d],
                n = f.a,
                a = f.d - n,
                o = f.c - n,
                l = f.b - n,
                s = r = 0,
                _ = 1; i >= _; _++)
                    h = p * _,
                    u = 1 - h,
                    s = r - (r = (h * h * a + 3 * u * (h * o + u * l)) * h),
                    c = d * i + _ - 1,
                    e[c] = (e[c] || 0) + s * s
        }
          , p = function(t, e) {
            e = e >> 0 || 6;
            var i, s, r, n, a = [], o = [], l = 0, h = 0, _ = e - 1, u = [], f = [];
            for (i in t)
                c(t[i], a, e);
            for (r = a.length,
            s = 0; r > s; s++)
                l += Math.sqrt(a[s]),
                n = s % e,
                f[n] = l,
                n === _ && (h += l,
                n = s / e >> 0,
                u[n] = f,
                o[n] = h,
                l = 0,
                f = []);
            return {
                length: h,
                lengths: o,
                segments: u
            }
        }
          , d = _gsScope._gsDefine.plugin({
            propName: "bezier",
            priority: -1,
            version: "1.3.8",
            API: 2,
            global: !0,
            init: function(t, e, i) {
                this._target = t,
                e instanceof Array && (e = {
                    values: e
                }),
                this._func = {},
                this._mod = {},
                this._props = [],
                this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                var s, r, n, a, o, l = e.values || [], h = {}, _ = l[0], c = e.autoRotate || i.vars.orientToBezier;
                this._autoRotate = c ? c instanceof Array ? c : [["x", "y", "rotation", c === !0 ? 0 : Number(c) || 0]] : null;
                for (s in _)
                    this._props.push(s);
                for (n = this._props.length; --n > -1; )
                    s = this._props[n],
                    this._overwriteProps.push(s),
                    r = this._func[s] = "function" == typeof t[s],
                    h[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]),
                    o || h[s] !== l[0][s] && (o = h);
                if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : f(l, e.type, h),
                this._segCount = this._beziers[s].length,
                this._timeRes) {
                    var d = p(this._beziers, this._timeRes);
                    this._length = d.length,
                    this._lengths = d.lengths,
                    this._segments = d.segments,
                    this._l1 = this._li = this._s1 = this._si = 0,
                    this._l2 = this._lengths[0],
                    this._curSeg = this._segments[0],
                    this._s2 = this._curSeg[0],
                    this._prec = 1 / this._curSeg.length
                }
                if (c = this._autoRotate)
                    for (this._initialRotations = [],
                    c[0]instanceof Array || (this._autoRotate = c = [c]),
                    n = c.length; --n > -1; ) {
                        for (a = 0; 3 > a; a++)
                            s = c[n][a],
                            this._func[s] = "function" == typeof t[s] && t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)];
                        s = c[n][2],
                        this._initialRotations[n] = (this._func[s] ? this._func[s].call(this._target) : this._target[s]) || 0,
                        this._overwriteProps.push(s)
                    }
                return this._startRatio = i.vars.runBackwards ? 1 : 0,
                !0
            },
            set: function(e) {
                var i, s, r, n, a, o, l, h, _, u, f = this._segCount, c = this._func, p = this._target, d = e !== this._startRatio;
                if (this._timeRes) {
                    if (_ = this._lengths,
                    u = this._curSeg,
                    e *= this._length,
                    r = this._li,
                    e > this._l2 && f - 1 > r) {
                        for (h = f - 1; h > r && (this._l2 = _[++r]) <= e; )
                            ;
                        this._l1 = _[r - 1],
                        this._li = r,
                        this._curSeg = u = this._segments[r],
                        this._s2 = u[this._s1 = this._si = 0]
                    } else if (e < this._l1 && r > 0) {
                        for (; r > 0 && (this._l1 = _[--r]) >= e; )
                            ;
                        0 === r && e < this._l1 ? this._l1 = 0 : r++,
                        this._l2 = _[r],
                        this._li = r,
                        this._curSeg = u = this._segments[r],
                        this._s1 = u[(this._si = u.length - 1) - 1] || 0,
                        this._s2 = u[this._si]
                    }
                    if (i = r,
                    e -= this._l1,
                    r = this._si,
                    e > this._s2 && r < u.length - 1) {
                        for (h = u.length - 1; h > r && (this._s2 = u[++r]) <= e; )
                            ;
                        this._s1 = u[r - 1],
                        this._si = r
                    } else if (e < this._s1 && r > 0) {
                        for (; r > 0 && (this._s1 = u[--r]) >= e; )
                            ;
                        0 === r && e < this._s1 ? this._s1 = 0 : r++,
                        this._s2 = u[r],
                        this._si = r
                    }
                    o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                } else
                    i = 0 > e ? 0 : e >= 1 ? f - 1 : f * e >> 0,
                    o = (e - i * (1 / f)) * f;
                for (s = 1 - o,
                r = this._props.length; --r > -1; )
                    n = this._props[r],
                    a = this._beziers[n][i],
                    l = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a,
                    this._mod[n] && (l = this._mod[n](l, p)),
                    c[n] ? p[n](l) : p[n] = l;
                if (this._autoRotate) {
                    var m, g, y, v, T, x, b, w = this._autoRotate;
                    for (r = w.length; --r > -1; )
                        n = w[r][2],
                        x = w[r][3] || 0,
                        b = w[r][4] === !0 ? 1 : t,
                        a = this._beziers[w[r][0]],
                        m = this._beziers[w[r][1]],
                        a && m && (a = a[i],
                        m = m[i],
                        g = a.a + (a.b - a.a) * o,
                        v = a.b + (a.c - a.b) * o,
                        g += (v - g) * o,
                        v += (a.c + (a.d - a.c) * o - v) * o,
                        y = m.a + (m.b - m.a) * o,
                        T = m.b + (m.c - m.b) * o,
                        y += (T - y) * o,
                        T += (m.c + (m.d - m.c) * o - T) * o,
                        l = d ? Math.atan2(T - y, v - g) * b + x : this._initialRotations[r],
                        this._mod[n] && (l = this._mod[n](l, p)),
                        c[n] ? p[n](l) : p[n] = l)
                }
            }
        })
          , m = d.prototype;
        d.bezierThrough = u,
        d.cubicToQuadratic = l,
        d._autoCSS = !0,
        d.quadraticToCubic = function(t, e, i) {
            return new a(t,(2 * e + t) / 3,(2 * e + i) / 3,i)
        }
        ,
        d._cssRegister = function() {
            var t = n.CSSPlugin;
            if (t) {
                var e = t._internals
                  , i = e._parseToProxy
                  , s = e._setPluginRatio
                  , r = e.CSSPropTween;
                e._registerComplexSpecialProp("bezier", {
                    parser: function(t, e, n, a, o, l) {
                        e instanceof Array && (e = {
                            values: e
                        }),
                        l = new d;
                        var h, _, u, f = e.values, c = f.length - 1, p = [], m = {};
                        if (0 > c)
                            return o;
                        for (h = 0; c >= h; h++)
                            u = i(t, f[h], a, o, l, c !== h),
                            p[h] = u.end;
                        for (_ in e)
                            m[_] = e[_];
                        return m.values = p,
                        o = new r(t,"bezier",0,0,u.pt,2),
                        o.data = u,
                        o.plugin = l,
                        o.setRatio = s,
                        0 === m.autoRotate && (m.autoRotate = !0),
                        !m.autoRotate || m.autoRotate instanceof Array || (h = m.autoRotate === !0 ? 0 : Number(m.autoRotate),
                        m.autoRotate = null != u.end.left ? [["left", "top", "rotation", h, !1]] : null != u.end.x && [["x", "y", "rotation", h, !1]]),
                        m.autoRotate && (a._transform || a._enableTransforms(!1),
                        u.autoRotate = a._target._gsTransform,
                        u.proxy.rotation = u.autoRotate.rotation || 0,
                        a._overwriteProps.push("rotation")),
                        l._onInitTween(u.proxy, m, a._tween),
                        o
                    }
                })
            }
        }
        ,
        m._mod = function(t) {
            for (var e, i = this._overwriteProps, s = i.length; --s > -1; )
                e = t[i[s]],
                e && "function" == typeof e && (this._mod[i[s]] = e)
        }
        ,
        m._kill = function(t) {
            var e, i, s = this._props;
            for (e in this._beziers)
                if (e in t)
                    for (delete this._beziers[e],
                    delete this._func[e],
                    i = s.length; --i > -1; )
                        s[i] === e && s.splice(i, 1);
            if (s = this._autoRotate)
                for (i = s.length; --i > -1; )
                    t[s[i][2]] && s.splice(i, 1);
            return this._super._kill.call(this, t)
        }
    }(),
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
        var i, s, r, n, a = function() {
            t.call(this, "css"),
            this._overwriteProps.length = 0,
            this.setRatio = a.prototype.setRatio
        }, o = _gsScope._gsDefine.globals, l = {}, h = a.prototype = new t("css");
        h.constructor = a,
        a.version = "2.0.2",
        a.API = 2,
        a.defaultTransformPerspective = 0,
        a.defaultSkewType = "compensated",
        a.defaultSmoothOrigin = !0,
        h = "px",
        a.suffixMap = {
            top: h,
            right: h,
            bottom: h,
            left: h,
            width: h,
            height: h,
            fontSize: h,
            padding: h,
            margin: h,
            perspective: h,
            lineHeight: ""
        };
        var _, u, f, c, p, d, m, g, y = /(?:\-|\.|\b)(\d|\.|e\-)+/g, v = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, T = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, x = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, b = /(?:\d|\-|\+|=|#|\.)*/g, w = /opacity *= *([^)]*)/i, P = /opacity:([^;]*)/i, O = /alpha\(opacity *=.+?\)/i, S = /^(rgb|hsl)/, k = /([A-Z])/g, R = /-([a-z])/gi, A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, C = function(t, e) {
            return e.toUpperCase()
        }, M = /(?:Left|Right|Width)/i, D = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, F = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, z = /,(?=[^\)]*(?:\(|$))/gi, E = /[\s,\(]/i, I = Math.PI / 180, X = 180 / Math.PI, N = {}, L = {
            style: {}
        }, B = _gsScope.document || {
            createElement: function() {
                return L
            }
        }, Y = function(t, e) {
            return B.createElementNS ? B.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : B.createElement(t)
        }, j = Y("div"), U = Y("img"), V = a._internals = {
            _specialProps: l
        }, q = (_gsScope.navigator || {}).userAgent || "", W = function() {
            var t = q.indexOf("Android")
              , e = Y("a");
            return f = -1 !== q.indexOf("Safari") && -1 === q.indexOf("Chrome") && (-1 === t || parseFloat(q.substr(t + 8, 2)) > 3),
            p = f && parseFloat(q.substr(q.indexOf("Version/") + 8, 2)) < 6,
            c = -1 !== q.indexOf("Firefox"),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(q) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(q)) && (d = parseFloat(RegExp.$1)),
            !!e && (e.style.cssText = "top:1px;opacity:.55;",
            /^0.55/.test(e.style.opacity))
        }(), G = function(t) {
            return w.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        }, Z = function(t) {
            _gsScope.console && console.log(t)
        }, H = "", $ = "", Q = function(t, e) {
            e = e || j;
            var i, s, r = e.style;
            if (void 0 !== r[t])
                return t;
            for (t = t.charAt(0).toUpperCase() + t.substr(1),
            i = ["O", "Moz", "ms", "Ms", "Webkit"],
            s = 5; --s > -1 && void 0 === r[i[s] + t]; )
                ;
            return s >= 0 ? ($ = 3 === s ? "ms" : i[s],
            H = "-" + $.toLowerCase() + "-",
            $ + t) : null
        }, K = ("undefined" != typeof window ? window : B.defaultView || {
            getComputedStyle: function() {}
        }).getComputedStyle, J = a.getStyle = function(t, e, i, s, r) {
            var n;
            return W || "opacity" !== e ? (!s && t.style[e] ? n = t.style[e] : (i = i || K(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(k, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]),
            null == r || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : r) : G(t)
        }
        , tt = V.convertToPixels = function(t, i, s, r, n) {
            if ("px" === r || !r && "lineHeight" !== i)
                return s;
            if ("auto" === r || !s)
                return 0;
            var o, l, h, _ = M.test(i), u = t, f = j.style, c = 0 > s, p = 1 === s;
            if (c && (s = -s),
            p && (s *= 100),
            "lineHeight" !== i || r)
                if ("%" === r && -1 !== i.indexOf("border"))
                    o = s / 100 * (_ ? t.clientWidth : t.clientHeight);
                else {
                    if (f.cssText = "border:0 solid red;position:" + J(t, "position") + ";line-height:0;",
                    "%" !== r && u.appendChild && "v" !== r.charAt(0) && "rem" !== r)
                        f[_ ? "borderLeftWidth" : "borderTopWidth"] = s + r;
                    else {
                        if (u = t.parentNode || B.body,
                        -1 !== J(u, "display").indexOf("flex") && (f.position = "absolute"),
                        l = u._gsCache,
                        h = e.ticker.frame,
                        l && _ && l.time === h)
                            return l.width * s / 100;
                        f[_ ? "width" : "height"] = s + r
                    }
                    u.appendChild(j),
                    o = parseFloat(j[_ ? "offsetWidth" : "offsetHeight"]),
                    u.removeChild(j),
                    _ && "%" === r && a.cacheWidths !== !1 && (l = u._gsCache = u._gsCache || {},
                    l.time = h,
                    l.width = o / s * 100),
                    0 !== o || n || (o = tt(t, i, s, r, !0))
                }
            else
                l = K(t).lineHeight,
                t.style.lineHeight = s,
                o = parseFloat(K(t).lineHeight),
                t.style.lineHeight = l;
            return p && (o /= 100),
            c ? -o : o
        }
        , et = V.calculateOffset = function(t, e, i) {
            if ("absolute" !== J(t, "position", i))
                return 0;
            var s = "left" === e ? "Left" : "Top"
              , r = J(t, "margin" + s, i);
            return t["offset" + s] - (tt(t, e, parseFloat(r), r.replace(b, "")) || 0)
        }
        , it = function(t, e) {
            var i, s, r, n = {};
            if (e = e || K(t, null))
                if (i = e.length)
                    for (; --i > -1; )
                        r = e[i],
                        (-1 === r.indexOf("-transform") || At === r) && (n[r.replace(R, C)] = e.getPropertyValue(r));
                else
                    for (i in e)
                        (-1 === i.indexOf("Transform") || Rt === i) && (n[i] = e[i]);
            else if (e = t.currentStyle || t.style)
                for (i in e)
                    "string" == typeof i && void 0 === n[i] && (n[i.replace(R, C)] = e[i]);
            return W || (n.opacity = G(t)),
            s = Ut(t, e, !1),
            n.rotation = s.rotation,
            n.skewX = s.skewX,
            n.scaleX = s.scaleX,
            n.scaleY = s.scaleY,
            n.x = s.x,
            n.y = s.y,
            Mt && (n.z = s.z,
            n.rotationX = s.rotationX,
            n.rotationY = s.rotationY,
            n.scaleZ = s.scaleZ),
            n.filters && delete n.filters,
            n
        }, st = function(t, e, i, s, r) {
            var n, a, o, l = {}, h = t.style;
            for (a in i)
                "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (l[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(x, "") ? n : 0 : et(t, a),
                void 0 !== h[a] && (o = new yt(h,a,h[a],o)));
            if (s)
                for (a in s)
                    "className" !== a && (l[a] = s[a]);
            return {
                difs: l,
                firstMPT: o
            }
        }, rt = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        }, nt = ["marginLeft", "marginRight", "marginTop", "marginBottom"], at = function(t, e, i) {
            if ("svg" === (t.nodeName + "").toLowerCase())
                return (i || K(t))[e] || 0;
            if (t.getCTM && Bt(t))
                return t.getBBox()[e] || 0;
            var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight)
              , r = rt[e]
              , n = r.length;
            for (i = i || K(t, null); --n > -1; )
                s -= parseFloat(J(t, "padding" + r[n], i, !0)) || 0,
                s -= parseFloat(J(t, "border" + r[n] + "Width", i, !0)) || 0;
            return s
        }, ot = function(t, e) {
            if ("contain" === t || "auto" === t || "auto auto" === t)
                return t + " ";
            (null == t || "" === t) && (t = "0 0");
            var i, s = t.split(" "), r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : s[0], n = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : s[1];
            if (s.length > 3 && !e) {
                for (s = t.split(", ").join(",").split(","),
                t = [],
                i = 0; i < s.length; i++)
                    t.push(ot(s[i]));
                return t.join(",")
            }
            return null == n ? n = "center" === r ? "50%" : "0" : "center" === n && (n = "50%"),
            ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"),
            t = r + " " + n + (s.length > 2 ? " " + s[2] : ""),
            e && (e.oxp = -1 !== r.indexOf("%"),
            e.oyp = -1 !== n.indexOf("%"),
            e.oxr = "=" === r.charAt(1),
            e.oyr = "=" === n.charAt(1),
            e.ox = parseFloat(r.replace(x, "")),
            e.oy = parseFloat(n.replace(x, "")),
            e.v = t),
            e || t
        }, lt = function(t, e) {
            return "function" == typeof t && (t = t(g, m)),
            "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0
        }, ht = function(t, e) {
            "function" == typeof t && (t = t(g, m));
            var i = "string" == typeof t && "=" === t.charAt(1);
            return "string" == typeof t && "v" === t.charAt(t.length - 2) && (t = (i ? t.substr(0, 2) : 0) + window["inner" + ("vh" === t.substr(-2) ? "Height" : "Width")] * (parseFloat(i ? t.substr(2) : t) / 100)),
            null == t ? e : i ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0
        }, _t = function(t, e, i, s) {
            var r, n, a, o, l, h = 1e-6;
            return "function" == typeof t && (t = t(g, m)),
            null == t ? o = e : "number" == typeof t ? o = t : (r = 360,
            n = t.split("_"),
            l = "=" === t.charAt(1),
            a = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(n[0].substr(2)) : parseFloat(n[0])) * (-1 === t.indexOf("rad") ? 1 : X) - (l ? 0 : e),
            n.length && (s && (s[i] = e + a),
            -1 !== t.indexOf("short") && (a %= r,
            a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)),
            -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (a / r | 0) * r : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (a / r | 0) * r)),
            o = e + a),
            h > o && o > -h && (o = 0),
            o
        }, ut = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        }, ft = function(t, e, i) {
            return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t,
            255 * (1 > 6 * t ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
        }, ct = a.parseColor = function(t, e) {
            var i, s, r, n, a, o, l, h, _, u, f;
            if (t)
                if ("number" == typeof t)
                    i = [t >> 16, t >> 8 & 255, 255 & t];
                else {
                    if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)),
                    ut[t])
                        i = ut[t];
                    else if ("#" === t.charAt(0))
                        4 === t.length && (s = t.charAt(1),
                        r = t.charAt(2),
                        n = t.charAt(3),
                        t = "#" + s + s + r + r + n + n),
                        t = parseInt(t.substr(1), 16),
                        i = [t >> 16, t >> 8 & 255, 255 & t];
                    else if ("hsl" === t.substr(0, 3))
                        if (i = f = t.match(y),
                        e) {
                            if (-1 !== t.indexOf("="))
                                return t.match(v)
                        } else
                            a = Number(i[0]) % 360 / 360,
                            o = Number(i[1]) / 100,
                            l = Number(i[2]) / 100,
                            r = .5 >= l ? l * (o + 1) : l + o - l * o,
                            s = 2 * l - r,
                            i.length > 3 && (i[3] = Number(i[3])),
                            i[0] = ft(a + 1 / 3, s, r),
                            i[1] = ft(a, s, r),
                            i[2] = ft(a - 1 / 3, s, r);
                    else
                        i = t.match(y) || ut.transparent;
                    i[0] = Number(i[0]),
                    i[1] = Number(i[1]),
                    i[2] = Number(i[2]),
                    i.length > 3 && (i[3] = Number(i[3]))
                }
            else
                i = ut.black;
            return e && !f && (s = i[0] / 255,
            r = i[1] / 255,
            n = i[2] / 255,
            h = Math.max(s, r, n),
            _ = Math.min(s, r, n),
            l = (h + _) / 2,
            h === _ ? a = o = 0 : (u = h - _,
            o = l > .5 ? u / (2 - h - _) : u / (h + _),
            a = h === s ? (r - n) / u + (n > r ? 6 : 0) : h === r ? (n - s) / u + 2 : (s - r) / u + 4,
            a *= 60),
            i[0] = a + .5 | 0,
            i[1] = 100 * o + .5 | 0,
            i[2] = 100 * l + .5 | 0),
            i
        }
        , pt = function(t, e) {
            var i, s, r, n = t.match(dt) || [], a = 0, o = "";
            if (!n.length)
                return t;
            for (i = 0; i < n.length; i++)
                s = n[i],
                r = t.substr(a, t.indexOf(s, a) - a),
                a += r.length + s.length,
                s = ct(s, e),
                3 === s.length && s.push(1),
                o += r + (e ? "hsla(" + s[0] + "," + s[1] + "%," + s[2] + "%," + s[3] : "rgba(" + s.join(",")) + ")";
            return o + t.substr(a)
        }, dt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (h in ut)
            dt += "|" + h + "\\b";
        dt = new RegExp(dt + ")","gi"),
        a.colorStringFilter = function(t) {
            var e, i = t[0] + " " + t[1];
            dt.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("),
            t[0] = pt(t[0], e),
            t[1] = pt(t[1], e)),
            dt.lastIndex = 0
        }
        ,
        e.defaultStringFilter || (e.defaultStringFilter = a.colorStringFilter);
        var mt = function(t, e, i, s) {
            if (null == t)
                return function(t) {
                    return t
                }
                ;
            var r, n = e ? (t.match(dt) || [""])[0] : "", a = t.split(n).join("").match(T) || [], o = t.substr(0, t.indexOf(a[0])), l = ")" === t.charAt(t.length - 1) ? ")" : "", h = -1 !== t.indexOf(" ") ? " " : ",", _ = a.length, u = _ > 0 ? a[0].replace(y, "") : "";
            return _ ? r = e ? function(t) {
                var e, f, c, p;
                if ("number" == typeof t)
                    t += u;
                else if (s && z.test(t)) {
                    for (p = t.replace(z, "|").split("|"),
                    c = 0; c < p.length; c++)
                        p[c] = r(p[c]);
                    return p.join(",")
                }
                if (e = (t.match(dt) || [n])[0],
                f = t.split(e).join("").match(T) || [],
                c = f.length,
                _ > c--)
                    for (; ++c < _; )
                        f[c] = i ? f[(c - 1) / 2 | 0] : a[c];
                return o + f.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
            }
            : function(t) {
                var e, n, f;
                if ("number" == typeof t)
                    t += u;
                else if (s && z.test(t)) {
                    for (n = t.replace(z, "|").split("|"),
                    f = 0; f < n.length; f++)
                        n[f] = r(n[f]);
                    return n.join(",")
                }
                if (e = t.match(T) || [],
                f = e.length,
                _ > f--)
                    for (; ++f < _; )
                        e[f] = i ? e[(f - 1) / 2 | 0] : a[f];
                return o + e.join(h) + l
            }
            : function(t) {
                return t
            }
        }
          , gt = function(t) {
            return t = t.split(","),
            function(e, i, s, r, n, a, o) {
                var l, h = (i + "").split(" ");
                for (o = {},
                l = 0; 4 > l; l++)
                    o[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                return r.parse(e, o, n, a)
            }
        }
          , yt = (V._setPluginRatio = function(t) {
            this.plugin.setRatio(t);
            for (var e, i, s, r, n, a = this.data, o = a.proxy, l = a.firstMPT, h = 1e-6; l; )
                e = o[l.v],
                l.r ? e = l.r(e) : h > e && e > -h && (e = 0),
                l.t[l.p] = e,
                l = l._next;
            if (a.autoRotate && (a.autoRotate.rotation = a.mod ? a.mod.call(this._tween, o.rotation, this.t, this._tween) : o.rotation),
            1 === t || 0 === t)
                for (l = a.firstMPT,
                n = 1 === t ? "e" : "b"; l; ) {
                    if (i = l.t,
                    i.type) {
                        if (1 === i.type) {
                            for (r = i.xs0 + i.s + i.xs1,
                            s = 1; s < i.l; s++)
                                r += i["xn" + s] + i["xs" + (s + 1)];
                            i[n] = r
                        }
                    } else
                        i[n] = i.s + i.xs0;
                    l = l._next
                }
        }
        ,
        function(t, e, i, s, r) {
            this.t = t,
            this.p = e,
            this.v = i,
            this.r = r,
            s && (s._prev = this,
            this._next = s)
        }
        )
          , vt = (V._parseToProxy = function(t, e, i, s, r, n) {
            var a, o, l, h, _, u = s, f = {}, c = {}, p = i._transform, d = N;
            for (i._transform = null,
            N = e,
            s = _ = i.parse(t, e, s, r),
            N = d,
            n && (i._transform = p,
            u && (u._prev = null,
            u._prev && (u._prev._next = null))); s && s !== u; ) {
                if (s.type <= 1 && (o = s.p,
                c[o] = s.s + s.c,
                f[o] = s.s,
                n || (h = new yt(s,"s",o,h,s.r),
                s.c = 0),
                1 === s.type))
                    for (a = s.l; --a > 0; )
                        l = "xn" + a,
                        o = s.p + "_" + l,
                        c[o] = s.data[l],
                        f[o] = s[l],
                        n || (h = new yt(s,l,o,h,s.rxp[l]));
                s = s._next
            }
            return {
                proxy: f,
                end: c,
                firstMPT: h,
                pt: _
            }
        }
        ,
        V.CSSPropTween = function(t, e, s, r, a, o, l, h, _, u, f) {
            this.t = t,
            this.p = e,
            this.s = s,
            this.c = r,
            this.n = l || e,
            t instanceof vt || n.push(this.n),
            this.r = h ? "function" == typeof h ? h : Math.round : h,
            this.type = o || 0,
            _ && (this.pr = _,
            i = !0),
            this.b = void 0 === u ? s : u,
            this.e = void 0 === f ? s + r : f,
            a && (this._next = a,
            a._prev = this)
        }
        )
          , Tt = function(t, e, i, s, r, n) {
            var a = new vt(t,e,i,s - i,r,-1,n);
            return a.b = i,
            a.e = a.xs0 = s,
            a
        }
          , xt = a.parseComplex = function(t, e, i, s, r, n, o, l, h, u) {
            i = i || n || "",
            "function" == typeof s && (s = s(g, m)),
            o = new vt(t,e,0,0,o,u ? 2 : 1,null,!1,l,i,s),
            s += "",
            r && dt.test(s + i) && (s = [i, s],
            a.colorStringFilter(s),
            i = s[0],
            s = s[1]);
            var f, c, p, d, T, x, b, w, P, O, S, k, R, A = i.split(", ").join(",").split(" "), C = s.split(", ").join(",").split(" "), M = A.length, D = _ !== !1;
            for ((-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) && (-1 !== (s + i).indexOf("rgb") || -1 !== (s + i).indexOf("hsl") ? (A = A.join(" ").replace(z, ", ").split(" "),
            C = C.join(" ").replace(z, ", ").split(" ")) : (A = A.join(" ").split(",").join(", ").split(" "),
            C = C.join(" ").split(",").join(", ").split(" ")),
            M = A.length),
            M !== C.length && (A = (n || "").split(" "),
            M = A.length),
            o.plugin = h,
            o.setRatio = u,
            dt.lastIndex = 0,
            f = 0; M > f; f++)
                if (d = A[f],
                T = C[f] + "",
                w = parseFloat(d),
                w || 0 === w)
                    o.appendXtra("", w, lt(T, w), T.replace(v, ""), !(!D || -1 === T.indexOf("px")) && Math.round, !0);
                else if (r && dt.test(d))
                    k = T.indexOf(")") + 1,
                    k = ")" + (k ? T.substr(k) : ""),
                    R = -1 !== T.indexOf("hsl") && W,
                    O = T,
                    d = ct(d, R),
                    T = ct(T, R),
                    P = d.length + T.length > 6,
                    P && !W && 0 === T[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent",
                    o.e = o.e.split(C[f]).join("transparent")) : (W || (P = !1),
                    R ? o.appendXtra(O.substr(0, O.indexOf("hsl")) + (P ? "hsla(" : "hsl("), d[0], lt(T[0], d[0]), ",", !1, !0).appendXtra("", d[1], lt(T[1], d[1]), "%,", !1).appendXtra("", d[2], lt(T[2], d[2]), P ? "%," : "%" + k, !1) : o.appendXtra(O.substr(0, O.indexOf("rgb")) + (P ? "rgba(" : "rgb("), d[0], T[0] - d[0], ",", Math.round, !0).appendXtra("", d[1], T[1] - d[1], ",", Math.round).appendXtra("", d[2], T[2] - d[2], P ? "," : k, Math.round),
                    P && (d = d.length < 4 ? 1 : d[3],
                    o.appendXtra("", d, (T.length < 4 ? 1 : T[3]) - d, k, !1))),
                    dt.lastIndex = 0;
                else if (x = d.match(y)) {
                    if (b = T.match(v),
                    !b || b.length !== x.length)
                        return o;
                    for (p = 0,
                    c = 0; c < x.length; c++)
                        S = x[c],
                        O = d.indexOf(S, p),
                        o.appendXtra(d.substr(p, O - p), Number(S), lt(b[c], S), "", !(!D || "px" !== d.substr(O + S.length, 2)) && Math.round, 0 === c),
                        p = O + S.length;
                    o["xs" + o.l] += d.substr(p)
                } else
                    o["xs" + o.l] += o.l || o["xs" + o.l] ? " " + T : T;
            if (-1 !== s.indexOf("=") && o.data) {
                for (k = o.xs0 + o.data.s,
                f = 1; f < o.l; f++)
                    k += o["xs" + f] + o.data["xn" + f];
                o.e = k + o["xs" + f]
            }
            return o.l || (o.type = -1,
            o.xs0 = o.e),
            o.xfirst || o
        }
          , bt = 9;
        for (h = vt.prototype,
        h.l = h.pr = 0; --bt > 0; )
            h["xn" + bt] = 0,
            h["xs" + bt] = "";
        h.xs0 = "",
        h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null,
        h.appendXtra = function(t, e, i, s, r, n) {
            var a = this
              , o = a.l;
            return a["xs" + o] += n && (o || a["xs" + o]) ? " " + t : t || "",
            i || 0 === o || a.plugin ? (a.l++,
            a.type = a.setRatio ? 2 : 1,
            a["xs" + a.l] = s || "",
            o > 0 ? (a.data["xn" + o] = e + i,
            a.rxp["xn" + o] = r,
            a["xn" + o] = e,
            a.plugin || (a.xfirst = new vt(a,"xn" + o,e,i,a.xfirst || a,0,a.n,r,a.pr),
            a.xfirst.xs0 = 0),
            a) : (a.data = {
                s: e + i
            },
            a.rxp = {},
            a.s = e,
            a.c = i,
            a.r = r,
            a)) : (a["xs" + o] += e + (s || ""),
            a)
        }
        ;
        var wt = function(t, e) {
            e = e || {},
            this.p = e.prefix ? Q(t) || t : t,
            l[t] = l[this.p] = this,
            this.format = e.formatter || mt(e.defaultValue, e.color, e.collapsible, e.multi),
            e.parser && (this.parse = e.parser),
            this.clrs = e.color,
            this.multi = e.multi,
            this.keyword = e.keyword,
            this.dflt = e.defaultValue,
            this.pr = e.priority || 0
        }
          , Pt = V._registerComplexSpecialProp = function(t, e, i) {
            "object" != typeof e && (e = {
                parser: i
            });
            var s, r, n = t.split(","), a = e.defaultValue;
            for (i = i || [a],
            s = 0; s < n.length; s++)
                e.prefix = 0 === s && e.prefix,
                e.defaultValue = i[s] || a,
                r = new wt(n[s],e)
        }
          , Ot = V._registerPluginProp = function(t) {
            if (!l[t]) {
                var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                Pt(t, {
                    parser: function(t, i, s, r, n, a, h) {
                        var _ = o.com.greensock.plugins[e];
                        return _ ? (_._cssRegister(),
                        l[s].parse(t, i, s, r, n, a, h)) : (Z("Error: " + e + " js file not loaded."),
                        n)
                    }
                })
            }
        }
        ;
        h = wt.prototype,
        h.parseComplex = function(t, e, i, s, r, n) {
            var a, o, l, h, _, u, f = this.keyword;
            if (this.multi && (z.test(i) || z.test(e) ? (o = e.replace(z, "|").split("|"),
            l = i.replace(z, "|").split("|")) : f && (o = [e],
            l = [i])),
            l) {
                for (h = l.length > o.length ? l.length : o.length,
                a = 0; h > a; a++)
                    e = o[a] = o[a] || this.dflt,
                    i = l[a] = l[a] || this.dflt,
                    f && (_ = e.indexOf(f),
                    u = i.indexOf(f),
                    _ !== u && (-1 === u ? o[a] = o[a].split(f).join("") : -1 === _ && (o[a] += " " + f)));
                e = o.join(", "),
                i = l.join(", ")
            }
            return xt(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n)
        }
        ,
        h.parse = function(t, e, i, s, n, a, o) {
            return this.parseComplex(t.style, this.format(J(t, this.p, r, !1, this.dflt)), this.format(e), n, a)
        }
        ,
        a.registerSpecialProp = function(t, e, i) {
            Pt(t, {
                parser: function(t, s, r, n, a, o, l) {
                    var h = new vt(t,r,0,0,a,2,r,!1,i);
                    return h.plugin = o,
                    h.setRatio = e(t, s, n._tween, r),
                    h
                },
                priority: i
            })
        }
        ,
        a.useSVGTransformAttr = !0;
        var St, kt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), Rt = Q("transform"), At = H + "transform", Ct = Q("transformOrigin"), Mt = null !== Q("perspective"), Dt = V.Transform = function() {
            this.perspective = parseFloat(a.defaultTransformPerspective) || 0,
            this.force3D = !(a.defaultForce3D === !1 || !Mt) && (a.defaultForce3D || "auto")
        }
        , Ft = _gsScope.SVGElement, zt = function(t, e, i) {
            var s, r = B.createElementNS("http://www.w3.org/2000/svg", t), n = /([a-z])([A-Z])/g;
            for (s in i)
                r.setAttributeNS(null, s.replace(n, "$1-$2").toLowerCase(), i[s]);
            return e.appendChild(r),
            r
        }, Et = B.documentElement || {}, It = function() {
            var t, e, i, s = d || /Android/i.test(q) && !_gsScope.chrome;
            return B.createElementNS && !s && (t = zt("svg", Et),
            e = zt("rect", t, {
                width: 100,
                height: 50,
                x: 100
            }),
            i = e.getBoundingClientRect().width,
            e.style[Ct] = "50% 50%",
            e.style[Rt] = "scaleX(0.5)",
            s = i === e.getBoundingClientRect().width && !(c && Mt),
            Et.removeChild(t)),
            s
        }(), Xt = function(t, e, i, s, r, n) {
            var o, l, h, _, u, f, c, p, d, m, g, y, v, T, x = t._gsTransform, b = jt(t, !0);
            x && (v = x.xOrigin,
            T = x.yOrigin),
            (!s || (o = s.split(" ")).length < 2) && (c = t.getBBox(),
            0 === c.x && 0 === c.y && c.width + c.height === 0 && (c = {
                x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
                y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
                width: 0,
                height: 0
            }),
            e = ot(e).split(" "),
            o = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * c.width : parseFloat(e[0])) + c.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * c.height : parseFloat(e[1])) + c.y]),
            i.xOrigin = _ = parseFloat(o[0]),
            i.yOrigin = u = parseFloat(o[1]),
            s && b !== Yt && (f = b[0],
            c = b[1],
            p = b[2],
            d = b[3],
            m = b[4],
            g = b[5],
            y = f * d - c * p,
            y && (l = _ * (d / y) + u * (-p / y) + (p * g - d * m) / y,
            h = _ * (-c / y) + u * (f / y) - (f * g - c * m) / y,
            _ = i.xOrigin = o[0] = l,
            u = i.yOrigin = o[1] = h)),
            x && (n && (i.xOffset = x.xOffset,
            i.yOffset = x.yOffset,
            x = i),
            r || r !== !1 && a.defaultSmoothOrigin !== !1 ? (l = _ - v,
            h = u - T,
            x.xOffset += l * b[0] + h * b[2] - l,
            x.yOffset += l * b[1] + h * b[3] - h) : x.xOffset = x.yOffset = 0),
            n || t.setAttribute("data-svg-origin", o.join(" "))
        }, Nt = function(t) {
            var e, i = Y("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), s = this.parentNode, r = this.nextSibling, n = this.style.cssText;
            if (Et.appendChild(i),
            i.appendChild(this),
            this.style.display = "block",
            t)
                try {
                    e = this.getBBox(),
                    this._originalGetBBox = this.getBBox,
                    this.getBBox = Nt
                } catch (t) {}
            else
                this._originalGetBBox && (e = this._originalGetBBox());
            return r ? s.insertBefore(this, r) : s.appendChild(this),
            Et.removeChild(i),
            this.style.cssText = n,
            e
        }, Lt = function(t) {
            try {
                return t.getBBox()
            } catch (e) {
                return Nt.call(t, !0)
            }
        }, Bt = function(t) {
            return !(!Ft || !t.getCTM || t.parentNode && !t.ownerSVGElement || !Lt(t))
        }, Yt = [1, 0, 0, 1, 0, 0], jt = function(t, e) {
            var i, s, r, n, a, o, l = t._gsTransform || new Dt, h = 1e5, _ = t.style;
            if (Rt ? s = J(t, At, null, !0) : t.currentStyle && (s = t.currentStyle.filter.match(D),
            s = s && 4 === s.length ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), l.x || 0, l.y || 0].join(",") : ""),
            i = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s,
            !Rt || !(o = !K(t) || "none" === K(t).display) && t.parentNode || (o && (n = _.display,
            _.display = "block"),
            t.parentNode || (a = 1,
            Et.appendChild(t)),
            s = J(t, At, null, !0),
            i = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s,
            n ? _.display = n : o && Gt(_, "display"),
            a && Et.removeChild(t)),
            (l.svg || t.getCTM && Bt(t)) && (i && -1 !== (_[Rt] + "").indexOf("matrix") && (s = _[Rt],
            i = 0),
            r = t.getAttribute("transform"),
            i && r && (r = t.transform.baseVal.consolidate().matrix,
            s = "matrix(" + r.a + "," + r.b + "," + r.c + "," + r.d + "," + r.e + "," + r.f + ")",
            i = 0)),
            i)
                return Yt;
            for (r = (s || "").match(y) || [],
            bt = r.length; --bt > -1; )
                n = Number(r[bt]),
                r[bt] = (a = n - (n |= 0)) ? (a * h + (0 > a ? -.5 : .5) | 0) / h + n : n;
            return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
        }, Ut = V.getTransform = function(t, i, s, r) {
            if (t._gsTransform && s && !r)
                return t._gsTransform;
            var n, o, l, h, _, u, f = s ? t._gsTransform || new Dt : new Dt, c = f.scaleX < 0, p = 2e-5, d = 1e5, m = Mt ? parseFloat(J(t, Ct, i, !1, "0 0 0").split(" ")[2]) || f.zOrigin || 0 : 0, g = parseFloat(a.defaultTransformPerspective) || 0;
            if (f.svg = !(!t.getCTM || !Bt(t)),
            f.svg && (Xt(t, J(t, Ct, i, !1, "50% 50%") + "", f, t.getAttribute("data-svg-origin")),
            St = a.useSVGTransformAttr || It),
            n = jt(t),
            n !== Yt) {
                if (16 === n.length) {
                    var y, v, T, x, b, w = n[0], P = n[1], O = n[2], S = n[3], k = n[4], R = n[5], A = n[6], C = n[7], M = n[8], D = n[9], F = n[10], z = n[12], E = n[13], I = n[14], N = n[11], L = Math.atan2(A, F);
                    f.zOrigin && (I = -f.zOrigin,
                    z = M * I - n[12],
                    E = D * I - n[13],
                    I = F * I + f.zOrigin - n[14]),
                    f.rotationX = L * X,
                    L && (x = Math.cos(-L),
                    b = Math.sin(-L),
                    y = k * x + M * b,
                    v = R * x + D * b,
                    T = A * x + F * b,
                    M = k * -b + M * x,
                    D = R * -b + D * x,
                    F = A * -b + F * x,
                    N = C * -b + N * x,
                    k = y,
                    R = v,
                    A = T),
                    L = Math.atan2(-O, F),
                    f.rotationY = L * X,
                    L && (x = Math.cos(-L),
                    b = Math.sin(-L),
                    y = w * x - M * b,
                    v = P * x - D * b,
                    T = O * x - F * b,
                    D = P * b + D * x,
                    F = O * b + F * x,
                    N = S * b + N * x,
                    w = y,
                    P = v,
                    O = T),
                    L = Math.atan2(P, w),
                    f.rotation = L * X,
                    L && (x = Math.cos(L),
                    b = Math.sin(L),
                    y = w * x + P * b,
                    v = k * x + R * b,
                    T = M * x + D * b,
                    P = P * x - w * b,
                    R = R * x - k * b,
                    D = D * x - M * b,
                    w = y,
                    k = v,
                    M = T),
                    f.rotationX && Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 && (f.rotationX = f.rotation = 0,
                    f.rotationY = 180 - f.rotationY),
                    L = Math.atan2(k, R),
                    f.scaleX = (Math.sqrt(w * w + P * P + O * O) * d + .5 | 0) / d,
                    f.scaleY = (Math.sqrt(R * R + A * A) * d + .5 | 0) / d,
                    f.scaleZ = (Math.sqrt(M * M + D * D + F * F) * d + .5 | 0) / d,
                    w /= f.scaleX,
                    k /= f.scaleY,
                    P /= f.scaleX,
                    R /= f.scaleY,
                    Math.abs(L) > p ? (f.skewX = L * X,
                    k = 0,
                    "simple" !== f.skewType && (f.scaleY *= 1 / Math.cos(L))) : f.skewX = 0,
                    f.perspective = N ? 1 / (0 > N ? -N : N) : 0,
                    f.x = z,
                    f.y = E,
                    f.z = I,
                    f.svg && (f.x -= f.xOrigin - (f.xOrigin * w - f.yOrigin * k),
                    f.y -= f.yOrigin - (f.yOrigin * P - f.xOrigin * R))
                } else if (!Mt || r || !n.length || f.x !== n[4] || f.y !== n[5] || !f.rotationX && !f.rotationY) {
                    var B = n.length >= 6
                      , Y = B ? n[0] : 1
                      , j = n[1] || 0
                      , U = n[2] || 0
                      , V = B ? n[3] : 1;
                    f.x = n[4] || 0,
                    f.y = n[5] || 0,
                    l = Math.sqrt(Y * Y + j * j),
                    h = Math.sqrt(V * V + U * U),
                    _ = Y || j ? Math.atan2(j, Y) * X : f.rotation || 0,
                    u = U || V ? Math.atan2(U, V) * X + _ : f.skewX || 0,
                    f.scaleX = l,
                    f.scaleY = h,
                    f.rotation = _,
                    f.skewX = u,
                    Mt && (f.rotationX = f.rotationY = f.z = 0,
                    f.perspective = g,
                    f.scaleZ = 1),
                    f.svg && (f.x -= f.xOrigin - (f.xOrigin * Y + f.yOrigin * U),
                    f.y -= f.yOrigin - (f.xOrigin * j + f.yOrigin * V))
                }
                Math.abs(f.skewX) > 90 && Math.abs(f.skewX) < 270 && (c ? (f.scaleX *= -1,
                f.skewX += f.rotation <= 0 ? 180 : -180,
                f.rotation += f.rotation <= 0 ? 180 : -180) : (f.scaleY *= -1,
                f.skewX += f.skewX <= 0 ? 180 : -180)),
                f.zOrigin = m;
                for (o in f)
                    f[o] < p && f[o] > -p && (f[o] = 0)
            }
            return s && (t._gsTransform = f,
            f.svg && (St && t.style[Rt] ? e.delayedCall(.001, function() {
                Gt(t.style, Rt)
            }) : !St && t.getAttribute("transform") && e.delayedCall(.001, function() {
                t.removeAttribute("transform")
            }))),
            f
        }
        , Vt = function(t) {
            var e, i, s = this.data, r = -s.rotation * I, n = r + s.skewX * I, a = 1e5, o = (Math.cos(r) * s.scaleX * a | 0) / a, l = (Math.sin(r) * s.scaleX * a | 0) / a, h = (Math.sin(n) * -s.scaleY * a | 0) / a, _ = (Math.cos(n) * s.scaleY * a | 0) / a, u = this.t.style, f = this.t.currentStyle;
            if (f) {
                i = l,
                l = -h,
                h = -i,
                e = f.filter,
                u.filter = "";
                var c, p, m = this.t.offsetWidth, g = this.t.offsetHeight, y = "absolute" !== f.position, v = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + h + ", M22=" + _, T = s.x + m * s.xPercent / 100, x = s.y + g * s.yPercent / 100;
                if (null != s.ox && (c = (s.oxp ? m * s.ox * .01 : s.ox) - m / 2,
                p = (s.oyp ? g * s.oy * .01 : s.oy) - g / 2,
                T += c - (c * o + p * l),
                x += p - (c * h + p * _)),
                y ? (c = m / 2,
                p = g / 2,
                v += ", Dx=" + (c - (c * o + p * l) + T) + ", Dy=" + (p - (c * h + p * _) + x) + ")") : v += ", sizingMethod='auto expand')",
                -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? u.filter = e.replace(F, v) : u.filter = v + " " + e,
                (0 === t || 1 === t) && 1 === o && 0 === l && 0 === h && 1 === _ && (y && -1 === v.indexOf("Dx=0, Dy=0") || w.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && u.removeAttribute("filter")),
                !y) {
                    var P, O, S, k = 8 > d ? 1 : -1;
                    for (c = s.ieOffsetX || 0,
                    p = s.ieOffsetY || 0,
                    s.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 + T),
                    s.ieOffsetY = Math.round((g - ((0 > _ ? -_ : _) * g + (0 > h ? -h : h) * m)) / 2 + x),
                    bt = 0; 4 > bt; bt++)
                        O = nt[bt],
                        P = f[O],
                        i = -1 !== P.indexOf("px") ? parseFloat(P) : tt(this.t, O, parseFloat(P), P.replace(b, "")) || 0,
                        S = i !== s[O] ? 2 > bt ? -s.ieOffsetX : -s.ieOffsetY : 2 > bt ? c - s.ieOffsetX : p - s.ieOffsetY,
                        u[O] = (s[O] = Math.round(i - S * (0 === bt || 2 === bt ? 1 : k))) + "px"
                }
            }
        }, qt = V.set3DTransformRatio = V.setTransformRatio = function(t) {
            var e, i, s, r, n, a, o, l, h, _, u, f, p, d, m, g, y, v, T, x, b, w, P, O = this.data, S = this.t.style, k = O.rotation, R = O.rotationX, A = O.rotationY, C = O.scaleX, M = O.scaleY, D = O.scaleZ, F = O.x, z = O.y, E = O.z, X = O.svg, N = O.perspective, L = O.force3D, B = O.skewY, Y = O.skewX;
            if (B && (Y += B,
            k += B),
            ((1 === t || 0 === t) && "auto" === L && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !L) && !E && !N && !A && !R && 1 === D || St && X || !Mt)
                return void (k || Y || X ? (k *= I,
                w = Y * I,
                P = 1e5,
                i = Math.cos(k) * C,
                n = Math.sin(k) * C,
                s = Math.sin(k - w) * -M,
                a = Math.cos(k - w) * M,
                w && "simple" === O.skewType && (e = Math.tan(w - B * I),
                e = Math.sqrt(1 + e * e),
                s *= e,
                a *= e,
                B && (e = Math.tan(B * I),
                e = Math.sqrt(1 + e * e),
                i *= e,
                n *= e)),
                X && (F += O.xOrigin - (O.xOrigin * i + O.yOrigin * s) + O.xOffset,
                z += O.yOrigin - (O.xOrigin * n + O.yOrigin * a) + O.yOffset,
                St && (O.xPercent || O.yPercent) && (m = this.t.getBBox(),
                F += .01 * O.xPercent * m.width,
                z += .01 * O.yPercent * m.height),
                m = 1e-6,
                m > F && F > -m && (F = 0),
                m > z && z > -m && (z = 0)),
                T = (i * P | 0) / P + "," + (n * P | 0) / P + "," + (s * P | 0) / P + "," + (a * P | 0) / P + "," + F + "," + z + ")",
                X && St ? this.t.setAttribute("transform", "matrix(" + T) : S[Rt] = (O.xPercent || O.yPercent ? "translate(" + O.xPercent + "%," + O.yPercent + "%) matrix(" : "matrix(") + T) : S[Rt] = (O.xPercent || O.yPercent ? "translate(" + O.xPercent + "%," + O.yPercent + "%) matrix(" : "matrix(") + C + ",0,0," + M + "," + F + "," + z + ")");
            if (c && (m = 1e-4,
            m > C && C > -m && (C = D = 2e-5),
            m > M && M > -m && (M = D = 2e-5),
            !N || O.z || O.rotationX || O.rotationY || (N = 0)),
            k || Y)
                k *= I,
                g = i = Math.cos(k),
                y = n = Math.sin(k),
                Y && (k -= Y * I,
                g = Math.cos(k),
                y = Math.sin(k),
                "simple" === O.skewType && (e = Math.tan((Y - B) * I),
                e = Math.sqrt(1 + e * e),
                g *= e,
                y *= e,
                O.skewY && (e = Math.tan(B * I),
                e = Math.sqrt(1 + e * e),
                i *= e,
                n *= e))),
                s = -y,
                a = g;
            else {
                if (!(A || R || 1 !== D || N || X))
                    return void (S[Rt] = (O.xPercent || O.yPercent ? "translate(" + O.xPercent + "%," + O.yPercent + "%) translate3d(" : "translate3d(") + F + "px," + z + "px," + E + "px)" + (1 !== C || 1 !== M ? " scale(" + C + "," + M + ")" : ""));
                i = a = 1,
                s = n = 0
            }
            _ = 1,
            r = o = l = h = u = f = 0,
            p = N ? -1 / N : 0,
            d = O.zOrigin,
            m = 1e-6,
            x = ",",
            b = "0",
            k = A * I,
            k && (g = Math.cos(k),
            y = Math.sin(k),
            l = -y,
            u = p * -y,
            r = i * y,
            o = n * y,
            _ = g,
            p *= g,
            i *= g,
            n *= g),
            k = R * I,
            k && (g = Math.cos(k),
            y = Math.sin(k),
            e = s * g + r * y,
            v = a * g + o * y,
            h = _ * y,
            f = p * y,
            r = s * -y + r * g,
            o = a * -y + o * g,
            _ *= g,
            p *= g,
            s = e,
            a = v),
            1 !== D && (r *= D,
            o *= D,
            _ *= D,
            p *= D),
            1 !== M && (s *= M,
            a *= M,
            h *= M,
            f *= M),
            1 !== C && (i *= C,
            n *= C,
            l *= C,
            u *= C),
            (d || X) && (d && (F += r * -d,
            z += o * -d,
            E += _ * -d + d),
            X && (F += O.xOrigin - (O.xOrigin * i + O.yOrigin * s) + O.xOffset,
            z += O.yOrigin - (O.xOrigin * n + O.yOrigin * a) + O.yOffset),
            m > F && F > -m && (F = b),
            m > z && z > -m && (z = b),
            m > E && E > -m && (E = 0)),
            T = O.xPercent || O.yPercent ? "translate(" + O.xPercent + "%," + O.yPercent + "%) matrix3d(" : "matrix3d(",
            T += (m > i && i > -m ? b : i) + x + (m > n && n > -m ? b : n) + x + (m > l && l > -m ? b : l),
            T += x + (m > u && u > -m ? b : u) + x + (m > s && s > -m ? b : s) + x + (m > a && a > -m ? b : a),
            R || A || 1 !== D ? (T += x + (m > h && h > -m ? b : h) + x + (m > f && f > -m ? b : f) + x + (m > r && r > -m ? b : r),
            T += x + (m > o && o > -m ? b : o) + x + (m > _ && _ > -m ? b : _) + x + (m > p && p > -m ? b : p) + x) : T += ",0,0,0,0,1,0,",
            T += F + x + z + x + E + x + (N ? 1 + -E / N : 1) + ")",
            S[Rt] = T;
        }
        ;
        h = Dt.prototype,
        h.x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0,
        h.scaleX = h.scaleY = h.scaleZ = 1,
        Pt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function(t, e, i, s, n, o, l) {
                if (s._lastParsedTransform === l)
                    return n;
                s._lastParsedTransform = l;
                var h, _ = l.scale && "function" == typeof l.scale ? l.scale : 0;
                "function" == typeof l[i] && (h = l[i],
                l[i] = e),
                _ && (l.scale = _(g, t));
                var u, f, c, p, d, y, v, T, x, b = t._gsTransform, w = t.style, P = 1e-6, O = kt.length, S = l, k = {}, R = "transformOrigin", A = Ut(t, r, !0, S.parseTransform), C = S.transform && ("function" == typeof S.transform ? S.transform(g, m) : S.transform);
                if (A.skewType = S.skewType || A.skewType || a.defaultSkewType,
                s._transform = A,
                "rotationZ"in S && (S.rotation = S.rotationZ),
                C && "string" == typeof C && Rt)
                    f = j.style,
                    f[Rt] = C,
                    f.display = "block",
                    f.position = "absolute",
                    -1 !== C.indexOf("%") && (f.width = J(t, "width"),
                    f.height = J(t, "height")),
                    B.body.appendChild(j),
                    u = Ut(j, null, !1),
                    "simple" === A.skewType && (u.scaleY *= Math.cos(u.skewX * I)),
                    A.svg && (y = A.xOrigin,
                    v = A.yOrigin,
                    u.x -= A.xOffset,
                    u.y -= A.yOffset,
                    (S.transformOrigin || S.svgOrigin) && (C = {},
                    Xt(t, ot(S.transformOrigin), C, S.svgOrigin, S.smoothOrigin, !0),
                    y = C.xOrigin,
                    v = C.yOrigin,
                    u.x -= C.xOffset - A.xOffset,
                    u.y -= C.yOffset - A.yOffset),
                    (y || v) && (T = jt(j, !0),
                    u.x -= y - (y * T[0] + v * T[2]),
                    u.y -= v - (y * T[1] + v * T[3]))),
                    B.body.removeChild(j),
                    u.perspective || (u.perspective = A.perspective),
                    null != S.xPercent && (u.xPercent = ht(S.xPercent, A.xPercent)),
                    null != S.yPercent && (u.yPercent = ht(S.yPercent, A.yPercent));
                else if ("object" == typeof S) {
                    if (u = {
                        scaleX: ht(null != S.scaleX ? S.scaleX : S.scale, A.scaleX),
                        scaleY: ht(null != S.scaleY ? S.scaleY : S.scale, A.scaleY),
                        scaleZ: ht(S.scaleZ, A.scaleZ),
                        x: ht(S.x, A.x),
                        y: ht(S.y, A.y),
                        z: ht(S.z, A.z),
                        xPercent: ht(S.xPercent, A.xPercent),
                        yPercent: ht(S.yPercent, A.yPercent),
                        perspective: ht(S.transformPerspective, A.perspective)
                    },
                    d = S.directionalRotation,
                    null != d)
                        if ("object" == typeof d)
                            for (f in d)
                                S[f] = d[f];
                        else
                            S.rotation = d;
                    "string" == typeof S.x && -1 !== S.x.indexOf("%") && (u.x = 0,
                    u.xPercent = ht(S.x, A.xPercent)),
                    "string" == typeof S.y && -1 !== S.y.indexOf("%") && (u.y = 0,
                    u.yPercent = ht(S.y, A.yPercent)),
                    u.rotation = _t("rotation"in S ? S.rotation : "shortRotation"in S ? S.shortRotation + "_short" : A.rotation, A.rotation, "rotation", k),
                    Mt && (u.rotationX = _t("rotationX"in S ? S.rotationX : "shortRotationX"in S ? S.shortRotationX + "_short" : A.rotationX || 0, A.rotationX, "rotationX", k),
                    u.rotationY = _t("rotationY"in S ? S.rotationY : "shortRotationY"in S ? S.shortRotationY + "_short" : A.rotationY || 0, A.rotationY, "rotationY", k)),
                    u.skewX = _t(S.skewX, A.skewX),
                    u.skewY = _t(S.skewY, A.skewY)
                }
                for (Mt && null != S.force3D && (A.force3D = S.force3D,
                p = !0),
                c = A.force3D || A.z || A.rotationX || A.rotationY || u.z || u.rotationX || u.rotationY || u.perspective,
                c || null == S.scale || (u.scaleZ = 1); --O > -1; )
                    x = kt[O],
                    C = u[x] - A[x],
                    (C > P || -P > C || null != S[x] || null != N[x]) && (p = !0,
                    n = new vt(A,x,A[x],C,n),
                    x in k && (n.e = k[x]),
                    n.xs0 = 0,
                    n.plugin = o,
                    s._overwriteProps.push(n.n));
                return C = S.transformOrigin,
                A.svg && (C || S.svgOrigin) && (y = A.xOffset,
                v = A.yOffset,
                Xt(t, ot(C), u, S.svgOrigin, S.smoothOrigin),
                n = Tt(A, "xOrigin", (b ? A : u).xOrigin, u.xOrigin, n, R),
                n = Tt(A, "yOrigin", (b ? A : u).yOrigin, u.yOrigin, n, R),
                (y !== A.xOffset || v !== A.yOffset) && (n = Tt(A, "xOffset", b ? y : A.xOffset, A.xOffset, n, R),
                n = Tt(A, "yOffset", b ? v : A.yOffset, A.yOffset, n, R)),
                C = "0px 0px"),
                (C || Mt && c && A.zOrigin) && (Rt ? (p = !0,
                x = Ct,
                C = (C || J(t, x, r, !1, "50% 50%")) + "",
                n = new vt(w,x,0,0,n,-1,R),
                n.b = w[x],
                n.plugin = o,
                Mt ? (f = A.zOrigin,
                C = C.split(" "),
                A.zOrigin = (C.length > 2 && (0 === f || "0px" !== C[2]) ? parseFloat(C[2]) : f) || 0,
                n.xs0 = n.e = C[0] + " " + (C[1] || "50%") + " 0px",
                n = new vt(A,"zOrigin",0,0,n,-1,n.n),
                n.b = f,
                n.xs0 = n.e = A.zOrigin) : n.xs0 = n.e = C) : ot(C + "", A)),
                p && (s._transformType = A.svg && St || !c && 3 !== this._transformType ? 2 : 3),
                h && (l[i] = h),
                _ && (l.scale = _),
                n
            },
            prefix: !0
        }),
        Pt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }),
        Pt("borderRadius", {
            defaultValue: "0px",
            parser: function(t, e, i, n, a, o) {
                e = this.format(e);
                var l, h, _, u, f, c, p, d, m, g, y, v, T, x, b, w, P = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], O = t.style;
                for (m = parseFloat(t.offsetWidth),
                g = parseFloat(t.offsetHeight),
                l = e.split(" "),
                h = 0; h < P.length; h++)
                    this.p.indexOf("border") && (P[h] = Q(P[h])),
                    f = u = J(t, P[h], r, !1, "0px"),
                    -1 !== f.indexOf(" ") && (u = f.split(" "),
                    f = u[0],
                    u = u[1]),
                    c = _ = l[h],
                    p = parseFloat(f),
                    v = f.substr((p + "").length),
                    T = "=" === c.charAt(1),
                    T ? (d = parseInt(c.charAt(0) + "1", 10),
                    c = c.substr(2),
                    d *= parseFloat(c),
                    y = c.substr((d + "").length - (0 > d ? 1 : 0)) || "") : (d = parseFloat(c),
                    y = c.substr((d + "").length)),
                    "" === y && (y = s[i] || v),
                    y !== v && (x = tt(t, "borderLeft", p, v),
                    b = tt(t, "borderTop", p, v),
                    "%" === y ? (f = x / m * 100 + "%",
                    u = b / g * 100 + "%") : "em" === y ? (w = tt(t, "borderLeft", 1, "em"),
                    f = x / w + "em",
                    u = b / w + "em") : (f = x + "px",
                    u = b + "px"),
                    T && (c = parseFloat(f) + d + y,
                    _ = parseFloat(u) + d + y)),
                    a = xt(O, P[h], f + " " + u, c + " " + _, !1, "0px", a);
                return a
            },
            prefix: !0,
            formatter: mt("0px 0px 0px 0px", !1, !0)
        }),
        Pt("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
            defaultValue: "0px",
            parser: function(t, e, i, s, n, a) {
                return xt(t.style, i, this.format(J(t, i, r, !1, "0px 0px")), this.format(e), !1, "0px", n)
            },
            prefix: !0,
            formatter: mt("0px 0px", !1, !0)
        }),
        Pt("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(t, e, i, s, n, a) {
                var o, l, h, _, u, f, c = "background-position", p = r || K(t, null), m = this.format((p ? d ? p.getPropertyValue(c + "-x") + " " + p.getPropertyValue(c + "-y") : p.getPropertyValue(c) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), g = this.format(e);
                if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && g.split(",").length < 2 && (f = J(t, "backgroundImage").replace(A, ""),
                f && "none" !== f)) {
                    for (o = m.split(" "),
                    l = g.split(" "),
                    U.setAttribute("src", f),
                    h = 2; --h > -1; )
                        m = o[h],
                        _ = -1 !== m.indexOf("%"),
                        _ !== (-1 !== l[h].indexOf("%")) && (u = 0 === h ? t.offsetWidth - U.width : t.offsetHeight - U.height,
                        o[h] = _ ? parseFloat(m) / 100 * u + "px" : parseFloat(m) / u * 100 + "%");
                    m = o.join(" ")
                }
                return this.parseComplex(t.style, m, g, n, a)
            },
            formatter: ot
        }),
        Pt("backgroundSize", {
            defaultValue: "0 0",
            formatter: function(t) {
                return t += "",
                "co" === t.substr(0, 2) ? t : ot(-1 === t.indexOf(" ") ? t + " " + t : t)
            }
        }),
        Pt("perspective", {
            defaultValue: "0px",
            prefix: !0
        }),
        Pt("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }),
        Pt("transformStyle", {
            prefix: !0
        }),
        Pt("backfaceVisibility", {
            prefix: !0
        }),
        Pt("userSelect", {
            prefix: !0
        }),
        Pt("margin", {
            parser: gt("marginTop,marginRight,marginBottom,marginLeft")
        }),
        Pt("padding", {
            parser: gt("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }),
        Pt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(t, e, i, s, n, a) {
                var o, l, h;
                return 9 > d ? (l = t.currentStyle,
                h = 8 > d ? " " : ",",
                o = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")",
                e = this.format(e).split(",").join(h)) : (o = this.format(J(t, this.p, r, !1, this.dflt)),
                e = this.format(e)),
                this.parseComplex(t.style, o, e, n, a)
            }
        }),
        Pt("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }),
        Pt("autoRound,strictUnits", {
            parser: function(t, e, i, s, r) {
                return r
            }
        }),
        Pt("border", {
            defaultValue: "0px solid #000",
            parser: function(t, e, i, s, n, a) {
                var o = J(t, "borderTopWidth", r, !1, "0px")
                  , l = this.format(e).split(" ")
                  , h = l[0].replace(b, "");
                return "px" !== h && (o = parseFloat(o) / tt(t, "borderTopWidth", 1, h) + h),
                this.parseComplex(t.style, this.format(o + " " + J(t, "borderTopStyle", r, !1, "solid") + " " + J(t, "borderTopColor", r, !1, "#000")), l.join(" "), n, a)
            },
            color: !0,
            formatter: function(t) {
                var e = t.split(" ");
                return e[0] + " " + (e[1] || "solid") + " " + (t.match(dt) || ["#000"])[0]
            }
        }),
        Pt("borderWidth", {
            parser: gt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }),
        Pt("float,cssFloat,styleFloat", {
            parser: function(t, e, i, s, r, n) {
                var a = t.style
                  , o = "cssFloat"in a ? "cssFloat" : "styleFloat";
                return new vt(a,o,0,0,r,-1,i,!1,0,a[o],e)
            }
        });
        var Wt = function(t) {
            var e, i = this.t, s = i.filter || J(this.data, "filter") || "", r = this.s + this.c * t | 0;
            100 === r && (-1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") && -1 === s.indexOf("oader(") ? (i.removeAttribute("filter"),
            e = !J(this.data, "filter")) : (i.filter = s.replace(O, ""),
            e = !0)),
            e || (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"),
            -1 === s.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = s + " alpha(opacity=" + r + ")") : i.filter = s.replace(w, "opacity=" + r))
        };
        Pt("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(t, e, i, s, n, a) {
                var o = parseFloat(J(t, "opacity", r, !1, "1"))
                  , l = t.style
                  , h = "autoAlpha" === i;
                return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o),
                h && 1 === o && "hidden" === J(t, "visibility", r) && 0 !== e && (o = 0),
                W ? n = new vt(l,"opacity",o,e - o,n) : (n = new vt(l,"opacity",100 * o,100 * (e - o),n),
                n.xn1 = h ? 1 : 0,
                l.zoom = 1,
                n.type = 2,
                n.b = "alpha(opacity=" + n.s + ")",
                n.e = "alpha(opacity=" + (n.s + n.c) + ")",
                n.data = t,
                n.plugin = a,
                n.setRatio = Wt),
                h && (n = new vt(l,"visibility",0,0,n,-1,null,!1,0,0 !== o ? "inherit" : "hidden",0 === e ? "hidden" : "inherit"),
                n.xs0 = "inherit",
                s._overwriteProps.push(n.n),
                s._overwriteProps.push(i)),
                n
            }
        });
        var Gt = function(t, e) {
            e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e),
            t.removeProperty(e.replace(k, "-$1").toLowerCase())) : t.removeAttribute(e))
        }
          , Zt = function(t) {
            if (this.t._gsClassPT = this,
            1 === t || 0 === t) {
                this.t.setAttribute("class", 0 === t ? this.b : this.e);
                for (var e = this.data, i = this.t.style; e; )
                    e.v ? i[e.p] = e.v : Gt(i, e.p),
                    e = e._next;
                1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else
                this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        Pt("className", {
            parser: function(t, e, s, n, a, o, l) {
                var h, _, u, f, c, p = t.getAttribute("class") || "", d = t.style.cssText;
                if (a = n._classNamePT = new vt(t,s,0,0,a,2),
                a.setRatio = Zt,
                a.pr = -11,
                i = !0,
                a.b = p,
                _ = it(t, r),
                u = t._gsClassPT) {
                    for (f = {},
                    c = u.data; c; )
                        f[c.p] = 1,
                        c = c._next;
                    u.setRatio(1)
                }
                return t._gsClassPT = a,
                a.e = "=" !== e.charAt(1) ? e : p.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""),
                t.setAttribute("class", a.e),
                h = st(t, _, it(t), l, f),
                t.setAttribute("class", p),
                a.data = h.firstMPT,
                t.style.cssText = d,
                a = a.xfirst = n.parse(t, h.difs, a, o)
            }
        });
        var Ht = function(t) {
            if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var e, i, s, r, n, a = this.t.style, o = l.transform.parse;
                if ("all" === this.e)
                    a.cssText = "",
                    r = !0;
                else
                    for (e = this.e.split(" ").join("").split(","),
                    s = e.length; --s > -1; )
                        i = e[s],
                        l[i] && (l[i].parse === o ? r = !0 : i = "transformOrigin" === i ? Ct : l[i].p),
                        Gt(a, i);
                r && (Gt(a, Rt),
                n = this.t._gsTransform,
                n && (n.svg && (this.t.removeAttribute("data-svg-origin"),
                this.t.removeAttribute("transform")),
                delete this.t._gsTransform))
            }
        };
        for (Pt("clearProps", {
            parser: function(t, e, s, r, n) {
                return n = new vt(t,s,0,0,n,2),
                n.setRatio = Ht,
                n.e = e,
                n.pr = -10,
                n.data = r._tween,
                i = !0,
                n
            }
        }),
        h = "bezier,throwProps,physicsProps,physics2D".split(","),
        bt = h.length; bt--; )
            Ot(h[bt]);
        h = a.prototype,
        h._firstPT = h._lastParsedTransform = h._transform = null,
        h._onInitTween = function(t, e, o, h) {
            if (!t.nodeType)
                return !1;
            this._target = m = t,
            this._tween = o,
            this._vars = e,
            g = h,
            _ = e.autoRound,
            i = !1,
            s = e.suffixMap || a.suffixMap,
            r = K(t, ""),
            n = this._overwriteProps;
            var c, d, y, v, T, x, b, w, O, S = t.style;
            if (u && "" === S.zIndex && (c = J(t, "zIndex", r),
            ("auto" === c || "" === c) && this._addLazySet(S, "zIndex", 0)),
            "string" == typeof e && (v = S.cssText,
            c = it(t, r),
            S.cssText = v + ";" + e,
            c = st(t, c, it(t)).difs,
            !W && P.test(e) && (c.opacity = parseFloat(RegExp.$1)),
            e = c,
            S.cssText = v),
            e.className ? this._firstPT = d = l.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = d = this.parse(t, e, null),
            this._transformType) {
                for (O = 3 === this._transformType,
                Rt ? f && (u = !0,
                "" === S.zIndex && (b = J(t, "zIndex", r),
                ("auto" === b || "" === b) && this._addLazySet(S, "zIndex", 0)),
                p && this._addLazySet(S, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (O ? "visible" : "hidden"))) : S.zoom = 1,
                y = d; y && y._next; )
                    y = y._next;
                w = new vt(t,"transform",0,0,null,2),
                this._linkCSSP(w, null, y),
                w.setRatio = Rt ? qt : Vt,
                w.data = this._transform || Ut(t, r, !0),
                w.tween = o,
                w.pr = -1,
                n.pop()
            }
            if (i) {
                for (; d; ) {
                    for (x = d._next,
                    y = v; y && y.pr > d.pr; )
                        y = y._next;
                    (d._prev = y ? y._prev : T) ? d._prev._next = d : v = d,
                    (d._next = y) ? y._prev = d : T = d,
                    d = x
                }
                this._firstPT = v
            }
            return !0
        }
        ,
        h.parse = function(t, e, i, n) {
            var a, o, h, u, f, c, p, d, y, v, T = t.style;
            for (a in e) {
                if (c = e[a],
                "function" == typeof c && (c = c(g, m)),
                o = l[a])
                    i = o.parse(t, c, a, this, i, n, e);
                else {
                    if ("--" === a.substr(0, 2)) {
                        this._tween._propLookup[a] = this._addTween.call(this._tween, t.style, "setProperty", K(t).getPropertyValue(a) + "", c + "", a, !1, a);
                        continue
                    }
                    f = J(t, a, r) + "",
                    y = "string" == typeof c,
                    "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || y && S.test(c) ? (y || (c = ct(c),
                    c = (c.length > 3 ? "rgba(" : "rgb(") + c.join(",") + ")"),
                    i = xt(T, a, f, c, !0, "transparent", i, 0, n)) : y && E.test(c) ? i = xt(T, a, f, c, !0, null, i, 0, n) : (h = parseFloat(f),
                    p = h || 0 === h ? f.substr((h + "").length) : "",
                    ("" === f || "auto" === f) && ("width" === a || "height" === a ? (h = at(t, a, r),
                    p = "px") : "left" === a || "top" === a ? (h = et(t, a, r),
                    p = "px") : (h = "opacity" !== a ? 0 : 1,
                    p = "")),
                    v = y && "=" === c.charAt(1),
                    v ? (u = parseInt(c.charAt(0) + "1", 10),
                    c = c.substr(2),
                    u *= parseFloat(c),
                    d = c.replace(b, "")) : (u = parseFloat(c),
                    d = y ? c.replace(b, "") : ""),
                    "" === d && (d = a in s ? s[a] : p),
                    c = u || 0 === u ? (v ? u + h : u) + d : e[a],
                    p !== d && ("" !== d || "lineHeight" === a) && (u || 0 === u) && h && (h = tt(t, a, h, p),
                    "%" === d ? (h /= tt(t, a, 100, "%") / 100,
                    e.strictUnits !== !0 && (f = h + "%")) : "em" === d || "rem" === d || "vw" === d || "vh" === d ? h /= tt(t, a, 1, d) : "px" !== d && (u = tt(t, a, u, d),
                    d = "px"),
                    v && (u || 0 === u) && (c = u + h + d)),
                    v && (u += h),
                    !h && 0 !== h || !u && 0 !== u ? void 0 !== T[a] && (c || c + "" != "NaN" && null != c) ? (i = new vt(T,a,u || h || 0,0,i,-1,a,!1,0,f,c),
                    i.xs0 = "none" !== c || "display" !== a && -1 === a.indexOf("Style") ? c : f) : Z("invalid " + a + " tween value: " + e[a]) : (i = new vt(T,a,h,u - h,i,0,a,_ !== !1 && ("px" === d || "zIndex" === a),0,f,c),
                    i.xs0 = d))
                }
                n && i && !i.plugin && (i.plugin = n)
            }
            return i
        }
        ,
        h.setRatio = function(t) {
            var e, i, s, r = this._firstPT, n = 1e-6;
            if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                    for (; r; ) {
                        if (e = r.c * t + r.s,
                        r.r ? e = r.r(e) : n > e && e > -n && (e = 0),
                        r.type)
                            if (1 === r.type)
                                if (s = r.l,
                                2 === s)
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                else if (3 === s)
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === s)
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === s)
                                    r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1,
                                    s = 1; s < r.l; s++)
                                        i += r["xn" + s] + r["xs" + (s + 1)];
                                    r.t[r.p] = i
                                }
                            else
                                -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                        else
                            r.t[r.p] = e + r.xs0;
                        r = r._next
                    }
                else
                    for (; r; )
                        2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t),
                        r = r._next;
            else
                for (; r; ) {
                    if (2 !== r.type)
                        if (r.r && -1 !== r.type)
                            if (e = r.r(r.s + r.c),
                            r.type) {
                                if (1 === r.type) {
                                    for (s = r.l,
                                    i = r.xs0 + e + r.xs1,
                                    s = 1; s < r.l; s++)
                                        i += r["xn" + s] + r["xs" + (s + 1)];
                                    r.t[r.p] = i
                                }
                            } else
                                r.t[r.p] = e + r.xs0;
                        else
                            r.t[r.p] = r.e;
                    else
                        r.setRatio(t);
                    r = r._next
                }
        }
        ,
        h._enableTransforms = function(t) {
            this._transform = this._transform || Ut(this._target, r, !0),
            this._transformType = this._transform.svg && St || !t && 3 !== this._transformType ? 2 : 3
        }
        ;
        var $t = function(t) {
            this.t[this.p] = this.e,
            this.data._linkCSSP(this, this._next, null, !0)
        };
        h._addLazySet = function(t, e, i) {
            var s = this._firstPT = new vt(t,e,0,0,this._firstPT,2);
            s.e = i,
            s.setRatio = $t,
            s.data = this
        }
        ,
        h._linkCSSP = function(t, e, i, s) {
            return t && (e && (e._prev = t),
            t._next && (t._next._prev = t._prev),
            t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next,
            s = !0),
            i ? i._next = t : s || null !== this._firstPT || (this._firstPT = t),
            t._next = e,
            t._prev = i),
            t
        }
        ,
        h._mod = function(t) {
            for (var e = this._firstPT; e; )
                "function" == typeof t[e.p] && (e.r = t[e.p]),
                e = e._next
        }
        ,
        h._kill = function(e) {
            var i, s, r, n = e;
            if (e.autoAlpha || e.alpha) {
                n = {};
                for (s in e)
                    n[s] = e[s];
                n.opacity = 1,
                n.autoAlpha && (n.visibility = 1)
            }
            for (e.className && (i = this._classNamePT) && (r = i.xfirst,
            r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next),
            i._next && this._linkCSSP(i._next, i._next._next, r._prev),
            this._classNamePT = null),
            i = this._firstPT; i; )
                i.plugin && i.plugin !== s && i.plugin._kill && (i.plugin._kill(e),
                s = i.plugin),
                i = i._next;
            return t.prototype._kill.call(this, n)
        }
        ;
        var Qt = function(t, e, i) {
            var s, r, n, a;
            if (t.slice)
                for (r = t.length; --r > -1; )
                    Qt(t[r], e, i);
            else
                for (s = t.childNodes,
                r = s.length; --r > -1; )
                    n = s[r],
                    a = n.type,
                    n.style && (e.push(it(n)),
                    i && i.push(n)),
                    1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || Qt(n, e, i)
        };
        return a.cascadeTo = function(t, i, s) {
            var r, n, a, o, l = e.to(t, i, s), h = [l], _ = [], u = [], f = [], c = e._internals.reservedProps;
            for (t = l._targets || l.target,
            Qt(t, _, f),
            l.render(i, !0, !0),
            Qt(t, u),
            l.render(0, !0, !0),
            l._enabled(!0),
            r = f.length; --r > -1; )
                if (n = st(f[r], _[r], u[r]),
                n.firstMPT) {
                    n = n.difs;
                    for (a in s)
                        c[a] && (n[a] = s[a]);
                    o = {};
                    for (a in n)
                        o[a] = _[r][a];
                    h.push(e.fromTo(f[r], i, o, n))
                }
            return h
        }
        ,
        t.activate([a]),
        a
    }, !0),
    function() {
        var t = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.7.0",
            priority: -1,
            API: 2,
            init: function(t, e, i) {
                return this._tween = i,
                !0
            }
        })
          , e = function(t) {
            var e = 1 > t ? Math.pow(10, (t + "").length - 2) : 1;
            return function(i) {
                return (Math.round(i / t) * t * e | 0) / e
            }
        }
          , i = function(t, e) {
            for (; t; )
                t.f || t.blob || (t.m = e || Math.round),
                t = t._next
        }
          , s = t.prototype;
        s._onInitAllProps = function() {
            var t, s, r, n, a = this._tween, o = a.vars.roundProps, l = {}, h = a._propLookup.roundProps;
            if ("object" != typeof o || o.push)
                for ("string" == typeof o && (o = o.split(",")),
                r = o.length; --r > -1; )
                    l[o[r]] = Math.round;
            else
                for (n in o)
                    l[n] = e(o[n]);
            for (n in l)
                for (t = a._firstPT; t; )
                    s = t._next,
                    t.pg ? t.t._mod(l) : t.n === n && (2 === t.f && t.t ? i(t.t._firstPT, l[n]) : (this._add(t.t, n, t.s, t.c, l[n]),
                    s && (s._prev = t._prev),
                    t._prev ? t._prev._next = s : a._firstPT === t && (a._firstPT = s),
                    t._next = t._prev = null,
                    a._propLookup[n] = h)),
                    t = s;
            return !1
        }
        ,
        s._add = function(t, e, i, s, r) {
            this._addTween(t, e, i, i + s, e, r || Math.round),
            this._overwriteProps.push(e)
        }
    }(),
    function() {
        _gsScope._gsDefine.plugin({
            propName: "attr",
            API: 2,
            version: "0.6.1",
            init: function(t, e, i, s) {
                var r, n;
                if ("function" != typeof t.setAttribute)
                    return !1;
                for (r in e)
                    n = e[r],
                    "function" == typeof n && (n = n(s, t)),
                    this._addTween(t, "setAttribute", t.getAttribute(r) + "", n + "", r, !1, r),
                    this._overwriteProps.push(r);
                return !0
            }
        })
    }(),
    _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.3.1",
        API: 2,
        init: function(t, e, i, s) {
            "object" != typeof e && (e = {
                rotation: e
            }),
            this.finals = {};
            var r, n, a, o, l, h, _ = e.useRadians === !0 ? 2 * Math.PI : 360, u = 1e-6;
            for (r in e)
                "useRadians" !== r && (o = e[r],
                "function" == typeof o && (o = o(s, t)),
                h = (o + "").split("_"),
                n = h[0],
                a = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]()),
                o = this.finals[r] = "string" == typeof n && "=" === n.charAt(1) ? a + parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2)) : Number(n) || 0,
                l = o - a,
                h.length && (n = h.join("_"),
                -1 !== n.indexOf("short") && (l %= _,
                l !== l % (_ / 2) && (l = 0 > l ? l + _ : l - _)),
                -1 !== n.indexOf("_cw") && 0 > l ? l = (l + 9999999999 * _) % _ - (l / _ | 0) * _ : -1 !== n.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * _) % _ - (l / _ | 0) * _)),
                (l > u || -u > l) && (this._addTween(t, r, a, a + l, r),
                this._overwriteProps.push(r)));
            return !0
        },
        set: function(t) {
            var e;
            if (1 !== t)
                this._super.setRatio.call(this, t);
            else
                for (e = this._firstPT; e; )
                    e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p],
                    e = e._next
        }
    })._autoCSS = !0,
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
        var e, i, s, r, n = _gsScope.GreenSockGlobals || _gsScope, a = n.com.greensock, o = 2 * Math.PI, l = Math.PI / 2, h = a._class, _ = function(e, i) {
            var s = h("easing." + e, function() {}, !0)
              , r = s.prototype = new t;
            return r.constructor = s,
            r.getRatio = i,
            s
        }, u = t.register || function() {}
        , f = function(t, e, i, s, r) {
            var n = h("easing." + t, {
                easeOut: new e,
                easeIn: new i,
                easeInOut: new s
            }, !0);
            return u(n, t),
            n
        }, c = function(t, e, i) {
            this.t = t,
            this.v = e,
            i && (this.next = i,
            i.prev = this,
            this.c = i.v - e,
            this.gap = i.t - t)
        }, p = function(e, i) {
            var s = h("easing." + e, function(t) {
                this._p1 = t || 0 === t ? t : 1.70158,
                this._p2 = 1.525 * this._p1
            }, !0)
              , r = s.prototype = new t;
            return r.constructor = s,
            r.getRatio = i,
            r.config = function(t) {
                return new s(t)
            }
            ,
            s
        }, d = f("Back", p("BackOut", function(t) {
            return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
        }), p("BackIn", function(t) {
            return t * t * ((this._p1 + 1) * t - this._p1)
        }), p("BackInOut", function(t) {
            return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
        })), m = h("easing.SlowMo", function(t, e, i) {
            e = e || 0 === e ? e : .7,
            null == t ? t = .7 : t > 1 && (t = 1),
            this._p = 1 !== t ? e : 0,
            this._p1 = (1 - t) / 2,
            this._p2 = t,
            this._p3 = this._p1 + this._p2,
            this._calcEnd = i === !0
        }, !0), g = m.prototype = new t;
        return g.constructor = m,
        g.getRatio = function(t) {
            var e = t + (.5 - t) * this._p;
            return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 === t ? 0 : 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }
        ,
        m.ease = new m(.7,.7),
        g.config = m.config = function(t, e, i) {
            return new m(t,e,i)
        }
        ,
        e = h("easing.SteppedEase", function(t, e) {
            t = t || 1,
            this._p1 = 1 / t,
            this._p2 = t + (e ? 0 : 1),
            this._p3 = e ? 1 : 0
        }, !0),
        g = e.prototype = new t,
        g.constructor = e,
        g.getRatio = function(t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999),
            ((this._p2 * t | 0) + this._p3) * this._p1
        }
        ,
        g.config = e.config = function(t, i) {
            return new e(t,i)
        }
        ,
        i = h("easing.ExpoScaleEase", function(t, e, i) {
            this._p1 = Math.log(e / t),
            this._p2 = e - t,
            this._p3 = t,
            this._ease = i
        }, !0),
        g = i.prototype = new t,
        g.constructor = i,
        g.getRatio = function(t) {
            return this._ease && (t = this._ease.getRatio(t)),
            (this._p3 * Math.exp(this._p1 * t) - this._p3) / this._p2
        }
        ,
        g.config = i.config = function(t, e, s) {
            return new i(t,e,s)
        }
        ,
        s = h("easing.RoughEase", function(e) {
            e = e || {};
            for (var i, s, r, n, a, o, l = e.taper || "none", h = [], _ = 0, u = 0 | (e.points || 20), f = u, p = e.randomize !== !1, d = e.clamp === !0, m = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1; )
                i = p ? Math.random() : 1 / u * f,
                s = m ? m.getRatio(i) : i,
                "none" === l ? r = g : "out" === l ? (n = 1 - i,
                r = n * n * g) : "in" === l ? r = i * i * g : .5 > i ? (n = 2 * i,
                r = n * n * .5 * g) : (n = 2 * (1 - i),
                r = n * n * .5 * g),
                p ? s += Math.random() * r - .5 * r : f % 2 ? s += .5 * r : s -= .5 * r,
                d && (s > 1 ? s = 1 : 0 > s && (s = 0)),
                h[_++] = {
                    x: i,
                    y: s
                };
            for (h.sort(function(t, e) {
                return t.x - e.x
            }),
            o = new c(1,1,null),
            f = u; --f > -1; )
                a = h[f],
                o = new c(a.x,a.y,o);
            this._prev = new c(0,0,0 !== o.t ? o : o.next)
        }, !0),
        g = s.prototype = new t,
        g.constructor = s,
        g.getRatio = function(t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t; )
                    e = e.next;
                e = e.prev
            } else
                for (; e.prev && t <= e.t; )
                    e = e.prev;
            return this._prev = e,
            e.v + (t - e.t) / e.gap * e.c
        }
        ,
        g.config = function(t) {
            return new s(t)
        }
        ,
        s.ease = new s,
        f("Bounce", _("BounceOut", function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), _("BounceIn", function(t) {
            return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), _("BounceInOut", function(t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1,
            t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375,
            e ? .5 * (1 - t) : .5 * t + .5
        })),
        f("Circ", _("CircOut", function(t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), _("CircIn", function(t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), _("CircInOut", function(t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })),
        r = function(e, i, s) {
            var r = h("easing." + e, function(t, e) {
                this._p1 = t >= 1 ? t : 1,
                this._p2 = (e || s) / (1 > t ? t : 1),
                this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0),
                this._p2 = o / this._p2
            }, !0)
              , n = r.prototype = new t;
            return n.constructor = r,
            n.getRatio = i,
            n.config = function(t, e) {
                return new r(t,e)
            }
            ,
            r
        }
        ,
        f("Elastic", r("ElasticOut", function(t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
        }, .3), r("ElasticIn", function(t) {
            return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2))
        }, .3), r("ElasticInOut", function(t) {
            return (t *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
        }, .45)),
        f("Expo", _("ExpoOut", function(t) {
            return 1 - Math.pow(2, -10 * t)
        }), _("ExpoIn", function(t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), _("ExpoInOut", function(t) {
            return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })),
        f("Sine", _("SineOut", function(t) {
            return Math.sin(t * l)
        }), _("SineIn", function(t) {
            return -Math.cos(t * l) + 1
        }), _("SineInOut", function(t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })),
        h("easing.EaseLookup", {
            find: function(e) {
                return t.map[e]
            }
        }, !0),
        u(n.SlowMo, "SlowMo", "ease,"),
        u(s, "RoughEase", "ease,"),
        u(e, "SteppedEase", "ease,"),
        d
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(t, e) {
    "use strict";
    var i = {}
      , s = t.document
      , r = t.GreenSockGlobals = t.GreenSockGlobals || t
      , n = r[e];
    if (n)
        return "undefined" != typeof module && module.exports && (module.exports = n),
        n;
    var a, o, l, h, _, u = function(t) {
        var e, i = t.split("."), s = r;
        for (e = 0; e < i.length; e++)
            s[i[e]] = s = s[i[e]] || {};
        return s
    }, f = u("com.greensock"), c = 1e-10, p = function(t) {
        var e, i = [], s = t.length;
        for (e = 0; e !== s; i.push(t[e++]))
            ;
        return i
    }, d = function() {}, m = function() {
        var t = Object.prototype.toString
          , e = t.call([]);
        return function(i) {
            return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
        }
    }(), g = {}, y = function(s, n, a, o) {
        this.sc = g[s] ? g[s].sc : [],
        g[s] = this,
        this.gsClass = null,
        this.func = a;
        var l = [];
        this.check = function(h) {
            for (var _, f, c, p, d = n.length, m = d; --d > -1; )
                (_ = g[n[d]] || new y(n[d],[])).gsClass ? (l[d] = _.gsClass,
                m--) : h && _.sc.push(this);
            if (0 === m && a) {
                if (f = ("com.greensock." + s).split("."),
                c = f.pop(),
                p = u(f.join("."))[c] = this.gsClass = a.apply(a, l),
                o)
                    if (r[c] = i[c] = p,
                    "undefined" != typeof module && module.exports)
                        if (s === e) {
                            module.exports = i[e] = p;
                            for (d in i)
                                p[d] = i[d]
                        } else
                            i[e] && (i[e][c] = p);
                    else
                        "function" == typeof define && define.amd && define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function() {
                            return p
                        });
                for (d = 0; d < this.sc.length; d++)
                    this.sc[d].check()
            }
        }
        ,
        this.check(!0)
    }, v = t._gsDefine = function(t, e, i, s) {
        return new y(t,e,i,s)
    }
    , T = f._class = function(t, e, i) {
        return e = e || function() {}
        ,
        v(t, [], function() {
            return e
        }, i),
        e
    }
    ;
    v.globals = r;
    var x = [0, 0, 1, 1]
      , b = T("easing.Ease", function(t, e, i, s) {
        this._func = t,
        this._type = i || 0,
        this._power = s || 0,
        this._params = e ? x.concat(e) : x
    }, !0)
      , w = b.map = {}
      , P = b.register = function(t, e, i, s) {
        for (var r, n, a, o, l = e.split(","), h = l.length, _ = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1; )
            for (n = l[h],
            r = s ? T("easing." + n, null, !0) : f.easing[n] || {},
            a = _.length; --a > -1; )
                o = _[a],
                w[n + "." + o] = w[o + n] = r[o] = t.getRatio ? t : t[o] || new t
    }
    ;
    for (l = b.prototype,
    l._calcEnd = !1,
    l.getRatio = function(t) {
        if (this._func)
            return this._params[0] = t,
            this._func.apply(null, this._params);
        var e = this._type
          , i = this._power
          , s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
        return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s),
        1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
    }
    ,
    a = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
    o = a.length; --o > -1; )
        l = a[o] + ",Power" + o,
        P(new b(null,null,1,o), l, "easeOut", !0),
        P(new b(null,null,2,o), l, "easeIn" + (0 === o ? ",easeNone" : "")),
        P(new b(null,null,3,o), l, "easeInOut");
    w.linear = f.easing.Linear.easeIn,
    w.swing = f.easing.Quad.easeInOut;
    var O = T("events.EventDispatcher", function(t) {
        this._listeners = {},
        this._eventTarget = t || this
    });
    l = O.prototype,
    l.addEventListener = function(t, e, i, s, r) {
        r = r || 0;
        var n, a, o = this._listeners[t], l = 0;
        for (this !== h || _ || h.wake(),
        null == o && (this._listeners[t] = o = []),
        a = o.length; --a > -1; )
            n = o[a],
            n.c === e && n.s === i ? o.splice(a, 1) : 0 === l && n.pr < r && (l = a + 1);
        o.splice(l, 0, {
            c: e,
            s: i,
            up: s,
            pr: r
        })
    }
    ,
    l.removeEventListener = function(t, e) {
        var i, s = this._listeners[t];
        if (s)
            for (i = s.length; --i > -1; )
                if (s[i].c === e)
                    return void s.splice(i, 1)
    }
    ,
    l.dispatchEvent = function(t) {
        var e, i, s, r = this._listeners[t];
        if (r)
            for (e = r.length,
            e > 1 && (r = r.slice(0)),
            i = this._eventTarget; --e > -1; )
                s = r[e],
                s && (s.up ? s.c.call(s.s || i, {
                    type: t,
                    target: i
                }) : s.c.call(s.s || i))
    }
    ;
    var S = t.requestAnimationFrame
      , k = t.cancelAnimationFrame
      , R = Date.now || function() {
        return (new Date).getTime()
    }
      , A = R();
    for (a = ["ms", "moz", "webkit", "o"],
    o = a.length; --o > -1 && !S; )
        S = t[a[o] + "RequestAnimationFrame"],
        k = t[a[o] + "CancelAnimationFrame"] || t[a[o] + "CancelRequestAnimationFrame"];
    T("Ticker", function(t, e) {
        var i, r, n, a, o, l = this, u = R(), f = !(e === !1 || !S) && "auto", p = 500, m = 33, g = "tick", y = function(t) {
            var e, s, h = R() - A;
            h > p && (u += h - m),
            A += h,
            l.time = (A - u) / 1e3,
            e = l.time - o,
            (!i || e > 0 || t === !0) && (l.frame++,
            o += e + (e >= a ? .004 : a - e),
            s = !0),
            t !== !0 && (n = r(y)),
            s && l.dispatchEvent(g)
        };
        O.call(l),
        l.time = l.frame = 0,
        l.tick = function() {
            y(!0)
        }
        ,
        l.lagSmoothing = function(t, e) {
            return arguments.length ? (p = t || 1 / c,
            void (m = Math.min(e, p, 0))) : 1 / c > p
        }
        ,
        l.sleep = function() {
            null != n && (f && k ? k(n) : clearTimeout(n),
            r = d,
            n = null,
            l === h && (_ = !1))
        }
        ,
        l.wake = function(t) {
            null !== n ? l.sleep() : t ? u += -A + (A = R()) : l.frame > 10 && (A = R() - p + 5),
            r = 0 === i ? d : f && S ? S : function(t) {
                return setTimeout(t, 1e3 * (o - l.time) + 1 | 0)
            }
            ,
            l === h && (_ = !0),
            y(2)
        }
        ,
        l.fps = function(t) {
            return arguments.length ? (i = t,
            a = 1 / (i || 60),
            o = this.time + a,
            void l.wake()) : i
        }
        ,
        l.useRAF = function(t) {
            return arguments.length ? (l.sleep(),
            f = t,
            void l.fps(i)) : f
        }
        ,
        l.fps(t),
        setTimeout(function() {
            "auto" === f && l.frame < 5 && "hidden" !== (s || {}).visibilityState && l.useRAF(!1)
        }, 1500)
    }),
    l = f.Ticker.prototype = new f.events.EventDispatcher,
    l.constructor = f.Ticker;
    var C = T("core.Animation", function(t, e) {
        if (this.vars = e = e || {},
        this._duration = this._totalDuration = t || 0,
        this._delay = Number(e.delay) || 0,
        this._timeScale = 1,
        this._active = e.immediateRender === !0,
        this.data = e.data,
        this._reversed = e.reversed === !0,
        $) {
            _ || h.wake();
            var i = this.vars.useFrames ? H : $;
            i.add(this, i._time),
            this.vars.paused && this.paused(!0)
        }
    });
    h = C.ticker = new f.Ticker,
    l = C.prototype,
    l._dirty = l._gc = l._initted = l._paused = !1,
    l._totalTime = l._time = 0,
    l._rawPrevTime = -1,
    l._next = l._last = l._onUpdate = l._timeline = l.timeline = null,
    l._paused = !1;
    var M = function() {
        _ && R() - A > 2e3 && ("hidden" !== (s || {}).visibilityState || !h.lagSmoothing()) && h.wake();
        var t = setTimeout(M, 2e3);
        t.unref && t.unref()
    };
    M(),
    l.play = function(t, e) {
        return null != t && this.seek(t, e),
        this.reversed(!1).paused(!1)
    }
    ,
    l.pause = function(t, e) {
        return null != t && this.seek(t, e),
        this.paused(!0)
    }
    ,
    l.resume = function(t, e) {
        return null != t && this.seek(t, e),
        this.paused(!1)
    }
    ,
    l.seek = function(t, e) {
        return this.totalTime(Number(t), e !== !1)
    }
    ,
    l.restart = function(t, e) {
        return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
    }
    ,
    l.reverse = function(t, e) {
        return null != t && this.seek(t || this.totalDuration(), e),
        this.reversed(!0).paused(!1)
    }
    ,
    l.render = function(t, e, i) {}
    ,
    l.invalidate = function() {
        return this._time = this._totalTime = 0,
        this._initted = this._gc = !1,
        this._rawPrevTime = -1,
        (this._gc || !this.timeline) && this._enabled(!0),
        this
    }
    ,
    l.isActive = function() {
        var t, e = this._timeline, i = this._startTime;
        return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-7
    }
    ,
    l._enabled = function(t, e) {
        return _ || h.wake(),
        this._gc = !t,
        this._active = this.isActive(),
        e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)),
        !1
    }
    ,
    l._kill = function(t, e) {
        return this._enabled(!1, !1)
    }
    ,
    l.kill = function(t, e) {
        return this._kill(t, e),
        this
    }
    ,
    l._uncache = function(t) {
        for (var e = t ? this : this.timeline; e; )
            e._dirty = !0,
            e = e.timeline;
        return this
    }
    ,
    l._swapSelfInParams = function(t) {
        for (var e = t.length, i = t.concat(); --e > -1; )
            "{self}" === t[e] && (i[e] = this);
        return i
    }
    ,
    l._callback = function(t) {
        var e = this.vars
          , i = e[t]
          , s = e[t + "Params"]
          , r = e[t + "Scope"] || e.callbackScope || this
          , n = s ? s.length : 0;
        switch (n) {
        case 0:
            i.call(r);
            break;
        case 1:
            i.call(r, s[0]);
            break;
        case 2:
            i.call(r, s[0], s[1]);
            break;
        default:
            i.apply(r, s)
        }
    }
    ,
    l.eventCallback = function(t, e, i, s) {
        if ("on" === (t || "").substr(0, 2)) {
            var r = this.vars;
            if (1 === arguments.length)
                return r[t];
            null == e ? delete r[t] : (r[t] = e,
            r[t + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i,
            r[t + "Scope"] = s),
            "onUpdate" === t && (this._onUpdate = e)
        }
        return this
    }
    ,
    l.delay = function(t) {
        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay),
        this._delay = t,
        this) : this._delay
    }
    ,
    l.duration = function(t) {
        return arguments.length ? (this._duration = this._totalDuration = t,
        this._uncache(!0),
        this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0),
        this) : (this._dirty = !1,
        this._duration)
    }
    ,
    l.totalDuration = function(t) {
        return this._dirty = !1,
        arguments.length ? this.duration(t) : this._totalDuration
    }
    ,
    l.time = function(t, e) {
        return arguments.length ? (this._dirty && this.totalDuration(),
        this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
    }
    ,
    l.totalTime = function(t, e, i) {
        if (_ || h.wake(),
        !arguments.length)
            return this._totalTime;
        if (this._timeline) {
            if (0 > t && !i && (t += this.totalDuration()),
            this._timeline.smoothChildTiming) {
                this._dirty && this.totalDuration();
                var s = this._totalDuration
                  , r = this._timeline;
                if (t > s && !i && (t = s),
                this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? s - t : t) / this._timeScale,
                r._dirty || this._uncache(!1),
                r._timeline)
                    for (; r._timeline; )
                        r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0),
                        r = r._timeline
            }
            this._gc && this._enabled(!0, !1),
            (this._totalTime !== t || 0 === this._duration) && (I.length && K(),
            this.render(t, e, !1),
            I.length && K())
        }
        return this
    }
    ,
    l.progress = l.totalProgress = function(t, e) {
        var i = this.duration();
        return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio;
    }
    ,
    l.startTime = function(t) {
        return arguments.length ? (t !== this._startTime && (this._startTime = t,
        this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)),
        this) : this._startTime
    }
    ,
    l.endTime = function(t) {
        return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
    }
    ,
    l.timeScale = function(t) {
        if (!arguments.length)
            return this._timeScale;
        var e, i;
        for (t = t || c,
        this._timeline && this._timeline.smoothChildTiming && (e = this._pauseTime,
        i = e || 0 === e ? e : this._timeline.totalTime(),
        this._startTime = i - (i - this._startTime) * this._timeScale / t),
        this._timeScale = t,
        i = this.timeline; i && i.timeline; )
            i._dirty = !0,
            i.totalDuration(),
            i = i.timeline;
        return this
    }
    ,
    l.reversed = function(t) {
        return arguments.length ? (t != this._reversed && (this._reversed = t,
        this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
        this) : this._reversed
    }
    ,
    l.paused = function(t) {
        if (!arguments.length)
            return this._paused;
        var e, i, s = this._timeline;
        return t != this._paused && s && (_ || t || h.wake(),
        e = s.rawTime(),
        i = e - this._pauseTime,
        !t && s.smoothChildTiming && (this._startTime += i,
        this._uncache(!1)),
        this._pauseTime = t ? e : null,
        this._paused = t,
        this._active = this.isActive(),
        !t && 0 !== i && this._initted && this.duration() && (e = s.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale,
        this.render(e, e === this._totalTime, !0))),
        this._gc && !t && this._enabled(!0, !1),
        this
    }
    ;
    var D = T("core.SimpleTimeline", function(t) {
        C.call(this, 0, t),
        this.autoRemoveChildren = this.smoothChildTiming = !0
    });
    l = D.prototype = new C,
    l.constructor = D,
    l.kill()._gc = !1,
    l._first = l._last = l._recent = null,
    l._sortChildren = !1,
    l.add = l.insert = function(t, e, i, s) {
        var r, n;
        if (t._startTime = Number(e || 0) + t._delay,
        t._paused && this !== t._timeline && (t._pauseTime = this.rawTime() - (t._timeline.rawTime() - t._pauseTime)),
        t.timeline && t.timeline._remove(t, !0),
        t.timeline = t._timeline = this,
        t._gc && t._enabled(!0, !0),
        r = this._last,
        this._sortChildren)
            for (n = t._startTime; r && r._startTime > n; )
                r = r._prev;
        return r ? (t._next = r._next,
        r._next = t) : (t._next = this._first,
        this._first = t),
        t._next ? t._next._prev = t : this._last = t,
        t._prev = r,
        this._recent = t,
        this._timeline && this._uncache(!0),
        this
    }
    ,
    l._remove = function(t, e) {
        return t.timeline === this && (e || t._enabled(!1, !0),
        t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next),
        t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev),
        t._next = t._prev = t.timeline = null,
        t === this._recent && (this._recent = this._last),
        this._timeline && this._uncache(!0)),
        this
    }
    ,
    l.render = function(t, e, i) {
        var s, r = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = t; r; )
            s = r._next,
            (r._active || t >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)),
            r = s
    }
    ,
    l.rawTime = function() {
        return _ || h.wake(),
        this._totalTime
    }
    ;
    var F = T("TweenLite", function(e, i, s) {
        if (C.call(this, i, s),
        this.render = F.prototype.render,
        null == e)
            throw "Cannot tween a null target.";
        this.target = e = "string" != typeof e ? e : F.selector(e) || e;
        var r, n, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType), l = this.vars.overwrite;
        if (this._overwrite = l = null == l ? Z[F.defaultOverwrite] : "number" == typeof l ? l >> 0 : Z[l],
        (o || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])
            for (this._targets = a = p(e),
            this._propLookup = [],
            this._siblings = [],
            r = 0; r < a.length; r++)
                n = a[r],
                n ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(r--, 1),
                this._targets = a = a.concat(p(n))) : (this._siblings[r] = J(n, this, !1),
                1 === l && this._siblings[r].length > 1 && et(n, this, null, 1, this._siblings[r])) : (n = a[r--] = F.selector(n),
                "string" == typeof n && a.splice(r + 1, 1)) : a.splice(r--, 1);
        else
            this._propLookup = {},
            this._siblings = J(e, this, !1),
            1 === l && this._siblings.length > 1 && et(e, this, null, 1, this._siblings);
        (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -c,
        this.render(Math.min(0, -this._delay)))
    }, !0)
      , z = function(e) {
        return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
    }
      , E = function(t, e) {
        var i, s = {};
        for (i in t)
            G[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!V[i] || V[i] && V[i]._autoCSS) || (s[i] = t[i],
            delete t[i]);
        t.css = s
    };
    l = F.prototype = new C,
    l.constructor = F,
    l.kill()._gc = !1,
    l.ratio = 0,
    l._firstPT = l._targets = l._overwrittenProps = l._startAt = null,
    l._notifyPluginsOfEnabled = l._lazy = !1,
    F.version = "2.0.2",
    F.defaultEase = l._ease = new b(null,null,1,1),
    F.defaultOverwrite = "auto",
    F.ticker = h,
    F.autoSleep = 120,
    F.lagSmoothing = function(t, e) {
        h.lagSmoothing(t, e)
    }
    ,
    F.selector = t.$ || t.jQuery || function(e) {
        var i = t.$ || t.jQuery;
        return i ? (F.selector = i,
        i(e)) : (s || (s = t.document),
        s ? s.querySelectorAll ? s.querySelectorAll(e) : s.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e)
    }
    ;
    var I = []
      , X = {}
      , N = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
      , L = /[\+-]=-?[\.\d]/
      , B = function(t) {
        for (var e, i = this._firstPT, s = 1e-6; i; )
            e = i.blob ? 1 === t && null != this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s,
            i.m ? e = i.m.call(this._tween, e, this._target || i.t, this._tween) : s > e && e > -s && !i.blob && (e = 0),
            i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e,
            i = i._next
    }
      , Y = function(t, e, i, s) {
        var r, n, a, o, l, h, _, u = [], f = 0, c = "", p = 0;
        for (u.start = t,
        u.end = e,
        t = u[0] = t + "",
        e = u[1] = e + "",
        i && (i(u),
        t = u[0],
        e = u[1]),
        u.length = 0,
        r = t.match(N) || [],
        n = e.match(N) || [],
        s && (s._next = null,
        s.blob = 1,
        u._firstPT = u._applyPT = s),
        l = n.length,
        o = 0; l > o; o++)
            _ = n[o],
            h = e.substr(f, e.indexOf(_, f) - f),
            c += h || !o ? h : ",",
            f += h.length,
            p ? p = (p + 1) % 5 : "rgba(" === h.substr(-5) && (p = 1),
            _ === r[o] || r.length <= o ? c += _ : (c && (u.push(c),
            c = ""),
            a = parseFloat(r[o]),
            u.push(a),
            u._firstPT = {
                _next: u._firstPT,
                t: u,
                p: u.length - 1,
                s: a,
                c: ("=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * parseFloat(_.substr(2)) : parseFloat(_) - a) || 0,
                f: 0,
                m: p && 4 > p ? Math.round : 0
            }),
            f += _.length;
        return c += e.substr(f),
        c && u.push(c),
        u.setRatio = B,
        L.test(e) && (u.end = null),
        u
    }
      , j = function(t, e, i, s, r, n, a, o, l) {
        "function" == typeof s && (s = s(l || 0, t));
        var h, _ = typeof t[e], u = "function" !== _ ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3), f = "get" !== i ? i : u ? a ? t[u](a) : t[u]() : t[e], c = "string" == typeof s && "=" === s.charAt(1), p = {
            t: t,
            p: e,
            s: f,
            f: "function" === _,
            pg: 0,
            n: r || e,
            m: n ? "function" == typeof n ? n : Math.round : 0,
            pr: 0,
            c: c ? parseInt(s.charAt(0) + "1", 10) * parseFloat(s.substr(2)) : parseFloat(s) - f || 0
        };
        return ("number" != typeof f || "number" != typeof s && !c) && (a || isNaN(f) || !c && isNaN(s) || "boolean" == typeof f || "boolean" == typeof s ? (p.fp = a,
        h = Y(f, c ? parseFloat(p.s) + p.c + (p.s + "").replace(/[0-9\-\.]/g, "") : s, o || F.defaultStringFilter, p),
        p = {
            t: h,
            p: "setRatio",
            s: 0,
            c: 1,
            f: 2,
            pg: 0,
            n: r || e,
            pr: 0,
            m: 0
        }) : (p.s = parseFloat(f),
        c || (p.c = parseFloat(s) - p.s || 0))),
        p.c ? ((p._next = this._firstPT) && (p._next._prev = p),
        this._firstPT = p,
        p) : void 0
    }
      , U = F._internals = {
        isArray: m,
        isSelector: z,
        lazyTweens: I,
        blobDif: Y
    }
      , V = F._plugins = {}
      , q = U.tweenLookup = {}
      , W = 0
      , G = U.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
        yoyoEase: 1
    }
      , Z = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0
    }
      , H = C._rootFramesTimeline = new D
      , $ = C._rootTimeline = new D
      , Q = 30
      , K = U.lazyRender = function() {
        var t, e = I.length;
        for (X = {}; --e > -1; )
            t = I[e],
            t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0),
            t._lazy = !1);
        I.length = 0
    }
    ;
    $._startTime = h.time,
    H._startTime = h.frame,
    $._active = H._active = !0,
    setTimeout(K, 1),
    C._updateRoot = F.render = function() {
        var t, e, i;
        if (I.length && K(),
        $.render((h.time - $._startTime) * $._timeScale, !1, !1),
        H.render((h.frame - H._startTime) * H._timeScale, !1, !1),
        I.length && K(),
        h.frame >= Q) {
            Q = h.frame + (parseInt(F.autoSleep, 10) || 120);
            for (i in q) {
                for (e = q[i].tweens,
                t = e.length; --t > -1; )
                    e[t]._gc && e.splice(t, 1);
                0 === e.length && delete q[i]
            }
            if (i = $._first,
            (!i || i._paused) && F.autoSleep && !H._first && 1 === h._listeners.tick.length) {
                for (; i && i._paused; )
                    i = i._next;
                i || h.sleep()
            }
        }
    }
    ,
    h.addEventListener("tick", C._updateRoot);
    var J = function(t, e, i) {
        var s, r, n = t._gsTweenID;
        if (q[n || (t._gsTweenID = n = "t" + W++)] || (q[n] = {
            target: t,
            tweens: []
        }),
        e && (s = q[n].tweens,
        s[r = s.length] = e,
        i))
            for (; --r > -1; )
                s[r] === e && s.splice(r, 1);
        return q[n].tweens
    }
      , tt = function(t, e, i, s) {
        var r, n, a = t.vars.onOverwrite;
        return a && (r = a(t, e, i, s)),
        a = F.onOverwrite,
        a && (n = a(t, e, i, s)),
        r !== !1 && n !== !1
    }
      , et = function(t, e, i, s, r) {
        var n, a, o, l;
        if (1 === s || s >= 4) {
            for (l = r.length,
            n = 0; l > n; n++)
                if ((o = r[n]) !== e)
                    o._gc || o._kill(null, t, e) && (a = !0);
                else if (5 === s)
                    break;
            return a
        }
        var h, _ = e._startTime + c, u = [], f = 0, p = 0 === e._duration;
        for (n = r.length; --n > -1; )
            (o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (h = h || it(e, 0, p),
            0 === it(o, h, p) && (u[f++] = o)) : o._startTime <= _ && o._startTime + o.totalDuration() / o._timeScale > _ && ((p || !o._initted) && _ - o._startTime <= 2e-10 || (u[f++] = o)));
        for (n = f; --n > -1; )
            if (o = u[n],
            l = o._firstPT,
            2 === s && o._kill(i, t, e) && (a = !0),
            2 !== s || !o._firstPT && o._initted && l) {
                if (2 !== s && !tt(o, e))
                    continue;
                o._enabled(!1, !1) && (a = !0)
            }
        return a
    }
      , it = function(t, e, i) {
        for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline; ) {
            if (n += s._startTime,
            r *= s._timeScale,
            s._paused)
                return -100;
            s = s._timeline
        }
        return n /= r,
        n > e ? n - e : i && n === e || !t._initted && 2 * c > n - e ? c : (n += t.totalDuration() / t._timeScale / r) > e + c ? 0 : n - e - c
    };
    l._init = function() {
        var t, e, i, s, r, n, a = this.vars, o = this._overwrittenProps, l = this._duration, h = !!a.immediateRender, _ = a.ease;
        if (a.startAt) {
            this._startAt && (this._startAt.render(-1, !0),
            this._startAt.kill()),
            r = {};
            for (s in a.startAt)
                r[s] = a.startAt[s];
            if (r.data = "isStart",
            r.overwrite = !1,
            r.immediateRender = !0,
            r.lazy = h && a.lazy !== !1,
            r.startAt = r.delay = null,
            r.onUpdate = a.onUpdate,
            r.onUpdateParams = a.onUpdateParams,
            r.onUpdateScope = a.onUpdateScope || a.callbackScope || this,
            this._startAt = F.to(this.target || {}, 0, r),
            h)
                if (this._time > 0)
                    this._startAt = null;
                else if (0 !== l)
                    return
        } else if (a.runBackwards && 0 !== l)
            if (this._startAt)
                this._startAt.render(-1, !0),
                this._startAt.kill(),
                this._startAt = null;
            else {
                0 !== this._time && (h = !1),
                i = {};
                for (s in a)
                    G[s] && "autoCSS" !== s || (i[s] = a[s]);
                if (i.overwrite = 0,
                i.data = "isFromStart",
                i.lazy = h && a.lazy !== !1,
                i.immediateRender = h,
                this._startAt = F.to(this.target, 0, i),
                h) {
                    if (0 === this._time)
                        return
                } else
                    this._startAt._init(),
                    this._startAt._enabled(!1),
                    this.vars.immediateRender && (this._startAt = null)
            }
        if (this._ease = _ = _ ? _ instanceof b ? _ : "function" == typeof _ ? new b(_,a.easeParams) : w[_] || F.defaultEase : F.defaultEase,
        a.easeParams instanceof Array && _.config && (this._ease = _.config.apply(_, a.easeParams)),
        this._easeType = this._ease._type,
        this._easePower = this._ease._power,
        this._firstPT = null,
        this._targets)
            for (n = this._targets.length,
            t = 0; n > t; t++)
                this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], o ? o[t] : null, t) && (e = !0);
        else
            e = this._initProps(this.target, this._propLookup, this._siblings, o, 0);
        if (e && F._onPluginEvent("_onInitAllProps", this),
        o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
        a.runBackwards)
            for (i = this._firstPT; i; )
                i.s += i.c,
                i.c = -i.c,
                i = i._next;
        this._onUpdate = a.onUpdate,
        this._initted = !0
    }
    ,
    l._initProps = function(e, i, s, r, n) {
        var a, o, l, h, _, u;
        if (null == e)
            return !1;
        X[e._gsTweenID] && K(),
        this.vars.css || e.style && e !== t && e.nodeType && V.css && this.vars.autoCSS !== !1 && E(this.vars, e);
        for (a in this.vars)
            if (u = this.vars[a],
            G[a])
                u && (u instanceof Array || u.push && m(u)) && -1 !== u.join("").indexOf("{self}") && (this.vars[a] = u = this._swapSelfInParams(u, this));
            else if (V[a] && (h = new V[a])._onInitTween(e, this.vars[a], this, n)) {
                for (this._firstPT = _ = {
                    _next: this._firstPT,
                    t: h,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 1,
                    n: a,
                    pg: 1,
                    pr: h._priority,
                    m: 0
                },
                o = h._overwriteProps.length; --o > -1; )
                    i[h._overwriteProps[o]] = this._firstPT;
                (h._priority || h._onInitAllProps) && (l = !0),
                (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0),
                _._next && (_._next._prev = _)
            } else
                i[a] = j.call(this, e, a, "get", u, a, 0, null, this.vars.stringFilter, n);
        return r && this._kill(r, e) ? this._initProps(e, i, s, r, n) : this._overwrite > 1 && this._firstPT && s.length > 1 && et(e, this, i, this._overwrite, s) ? (this._kill(i, e),
        this._initProps(e, i, s, r, n)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (X[e._gsTweenID] = !0),
        l)
    }
    ,
    l.render = function(t, e, i) {
        var s, r, n, a, o = this._time, l = this._duration, h = this._rawPrevTime;
        if (t >= l - 1e-7 && t >= 0)
            this._totalTime = this._time = l,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
            this._reversed || (s = !0,
            r = "onComplete",
            i = i || this._timeline.autoRemoveChildren),
            0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0),
            (0 > h || 0 >= t && t >= -1e-7 || h === c && "isPause" !== this.data) && h !== t && (i = !0,
            h > c && (r = "onReverseComplete")),
            this._rawPrevTime = a = !e || t || h === t ? t : c);
        else if (1e-7 > t)
            this._totalTime = this._time = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
            (0 !== o || 0 === l && h > 0) && (r = "onReverseComplete",
            s = this._reversed),
            0 > t && (this._active = !1,
            0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== c || "isPause" !== this.data) && (i = !0),
            this._rawPrevTime = a = !e || t || h === t ? t : c)),
            (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
        else if (this._totalTime = this._time = t,
        this._easeType) {
            var _ = t / l
              , u = this._easeType
              , f = this._easePower;
            (1 === u || 3 === u && _ >= .5) && (_ = 1 - _),
            3 === u && (_ *= 2),
            1 === f ? _ *= _ : 2 === f ? _ *= _ * _ : 3 === f ? _ *= _ * _ * _ : 4 === f && (_ *= _ * _ * _ * _),
            1 === u ? this.ratio = 1 - _ : 2 === u ? this.ratio = _ : .5 > t / l ? this.ratio = _ / 2 : this.ratio = 1 - _ / 2
        } else
            this.ratio = this._ease.getRatio(t / l);
        if (this._time !== o || i) {
            if (!this._initted) {
                if (this._init(),
                !this._initted || this._gc)
                    return;
                if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                    return this._time = this._totalTime = o,
                    this._rawPrevTime = h,
                    I.push(this),
                    void (this._lazy = [t, e]);
                this._time && !s ? this.ratio = this._ease.getRatio(this._time / l) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (this._lazy !== !1 && (this._lazy = !1),
            this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0),
            0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, !0, i) : r || (r = "_dummyGS")),
            this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))),
            n = this._firstPT; n; )
                n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s,
                n = n._next;
            this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, !0, i),
            e || (this._time !== o || s || i) && this._callback("onUpdate")),
            r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, !0, i),
            s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !e && this.vars[r] && this._callback(r),
            0 === l && this._rawPrevTime === c && a !== c && (this._rawPrevTime = 0))
        }
    }
    ,
    l._kill = function(t, e, i) {
        if ("all" === t && (t = null),
        null == t && (null == e || e === this.target))
            return this._lazy = !1,
            this._enabled(!1, !1);
        e = "string" != typeof e ? e || this._targets || this.target : F.selector(e) || e;
        var s, r, n, a, o, l, h, _, u, f = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline, c = this._firstPT;
        if ((m(e) || z(e)) && "number" != typeof e[0])
            for (s = e.length; --s > -1; )
                this._kill(t, e[s], i) && (l = !0);
        else {
            if (this._targets) {
                for (s = this._targets.length; --s > -1; )
                    if (e === this._targets[s]) {
                        o = this._propLookup[s] || {},
                        this._overwrittenProps = this._overwrittenProps || [],
                        r = this._overwrittenProps[s] = t ? this._overwrittenProps[s] || {} : "all";
                        break
                    }
            } else {
                if (e !== this.target)
                    return !1;
                o = this._propLookup,
                r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
            }
            if (o) {
                if (h = t || o,
                _ = t !== r && "all" !== r && t !== o && ("object" != typeof t || !t._tempKill),
                i && (F.onOverwrite || this.vars.onOverwrite)) {
                    for (n in h)
                        o[n] && (u || (u = []),
                        u.push(n));
                    if ((u || !t) && !tt(this, i, e, u))
                        return !1
                }
                for (n in h)
                    (a = o[n]) && (f && (a.f ? a.t[a.p](a.s) : a.t[a.p] = a.s,
                    l = !0),
                    a.pg && a.t._kill(h) && (l = !0),
                    a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next),
                    a._next && (a._next._prev = a._prev),
                    a._next = a._prev = null),
                    delete o[n]),
                    _ && (r[n] = 1);
                !this._firstPT && this._initted && c && this._enabled(!1, !1)
            }
        }
        return l
    }
    ,
    l.invalidate = function() {
        return this._notifyPluginsOfEnabled && F._onPluginEvent("_onDisable", this),
        this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null,
        this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
        this._propLookup = this._targets ? {} : [],
        C.prototype.invalidate.call(this),
        this.vars.immediateRender && (this._time = -c,
        this.render(Math.min(0, -this._delay))),
        this
    }
    ,
    l._enabled = function(t, e) {
        if (_ || h.wake(),
        t && this._gc) {
            var i, s = this._targets;
            if (s)
                for (i = s.length; --i > -1; )
                    this._siblings[i] = J(s[i], this, !0);
            else
                this._siblings = J(this.target, this, !0)
        }
        return C.prototype._enabled.call(this, t, e),
        !(!this._notifyPluginsOfEnabled || !this._firstPT) && F._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
    }
    ,
    F.to = function(t, e, i) {
        return new F(t,e,i)
    }
    ,
    F.from = function(t, e, i) {
        return i.runBackwards = !0,
        i.immediateRender = 0 != i.immediateRender,
        new F(t,e,i)
    }
    ,
    F.fromTo = function(t, e, i, s) {
        return s.startAt = i,
        s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender,
        new F(t,e,s)
    }
    ,
    F.delayedCall = function(t, e, i, s, r) {
        return new F(e,0,{
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            callbackScope: s,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            immediateRender: !1,
            lazy: !1,
            useFrames: r,
            overwrite: 0
        })
    }
    ,
    F.set = function(t, e) {
        return new F(t,0,e)
    }
    ,
    F.getTweensOf = function(t, e) {
        if (null == t)
            return [];
        t = "string" != typeof t ? t : F.selector(t) || t;
        var i, s, r, n;
        if ((m(t) || z(t)) && "number" != typeof t[0]) {
            for (i = t.length,
            s = []; --i > -1; )
                s = s.concat(F.getTweensOf(t[i], e));
            for (i = s.length; --i > -1; )
                for (n = s[i],
                r = i; --r > -1; )
                    n === s[r] && s.splice(i, 1)
        } else if (t._gsTweenID)
            for (s = J(t).concat(),
            i = s.length; --i > -1; )
                (s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
        return s || []
    }
    ,
    F.killTweensOf = F.killDelayedCallsTo = function(t, e, i) {
        "object" == typeof e && (i = e,
        e = !1);
        for (var s = F.getTweensOf(t, e), r = s.length; --r > -1; )
            s[r]._kill(i, t)
    }
    ;
    var st = T("plugins.TweenPlugin", function(t, e) {
        this._overwriteProps = (t || "").split(","),
        this._propName = this._overwriteProps[0],
        this._priority = e || 0,
        this._super = st.prototype
    }, !0);
    if (l = st.prototype,
    st.version = "1.19.0",
    st.API = 2,
    l._firstPT = null,
    l._addTween = j,
    l.setRatio = B,
    l._kill = function(t) {
        var e, i = this._overwriteProps, s = this._firstPT;
        if (null != t[this._propName])
            this._overwriteProps = [];
        else
            for (e = i.length; --e > -1; )
                null != t[i[e]] && i.splice(e, 1);
        for (; s; )
            null != t[s.n] && (s._next && (s._next._prev = s._prev),
            s._prev ? (s._prev._next = s._next,
            s._prev = null) : this._firstPT === s && (this._firstPT = s._next)),
            s = s._next;
        return !1
    }
    ,
    l._mod = l._roundProps = function(t) {
        for (var e, i = this._firstPT; i; )
            e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")],
            e && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e),
            i = i._next
    }
    ,
    F._onPluginEvent = function(t, e) {
        var i, s, r, n, a, o = e._firstPT;
        if ("_onInitAllProps" === t) {
            for (; o; ) {
                for (a = o._next,
                s = r; s && s.pr > o.pr; )
                    s = s._next;
                (o._prev = s ? s._prev : n) ? o._prev._next = o : r = o,
                (o._next = s) ? s._prev = o : n = o,
                o = a
            }
            o = e._firstPT = r
        }
        for (; o; )
            o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0),
            o = o._next;
        return i
    }
    ,
    st.activate = function(t) {
        for (var e = t.length; --e > -1; )
            t[e].API === st.API && (V[(new t[e])._propName] = t[e]);
        return !0
    }
    ,
    v.plugin = function(t) {
        if (!(t && t.propName && t.init && t.API))
            throw "illegal plugin definition.";
        var e, i = t.propName, s = t.priority || 0, r = t.overwriteProps, n = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_mod",
            mod: "_mod",
            initAll: "_onInitAllProps"
        }, a = T("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
            st.call(this, i, s),
            this._overwriteProps = r || []
        }, t.global === !0), o = a.prototype = new st(i);
        o.constructor = a,
        a.API = t.API;
        for (e in n)
            "function" == typeof t[e] && (o[n[e]] = t[e]);
        return a.version = t.version,
        st.activate([a]),
        a
    }
    ,
    a = t._gsQueue) {
        for (o = 0; o < a.length; o++)
            a[o]();
        for (l in g)
            g[l].func || t.console.log("GSAP encountered missing dependency: " + l)
    }
    _ = !1
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    var t = (_gsScope.document || {}).documentElement
      , e = _gsScope
      , s = function(s, i) {
        var o = "x" === i ? "Width" : "Height"
          , l = "scroll" + o
          , n = "client" + o
          , r = document.body;
        return s === e || s === t || s === r ? Math.max(t[l], r[l]) - (e["inner" + o] || t[n] || r[n]) : s[l] - s["offset" + o]
    }
      , i = function(t) {
        return "string" == typeof t && (t = TweenLite.selector(t)),
        t.length && t !== e && t[0] && t[0].style && !t.nodeType && (t = t[0]),
        t === e || t.nodeType && t.style ? t : null
    }
      , o = function(s, i) {
        var o = "scroll" + ("x" === i ? "Left" : "Top");
        return s === e && (null != s.pageXOffset ? o = "page" + i.toUpperCase() + "Offset" : s = null != t[o] ? t : document.body),
        function() {
            return s[o]
        }
    }
      , l = function(s, l) {
        var n = i(s).getBoundingClientRect()
          , r = document.body
          , h = !l || l === e || l === r
          , p = h ? {
            top: t.clientTop - (window.pageYOffset || t.scrollTop || r.scrollTop || 0),
            left: t.clientLeft - (window.pageXOffset || t.scrollLeft || r.scrollLeft || 0)
        } : l.getBoundingClientRect()
          , u = {
            x: n.left - p.left,
            y: n.top - p.top
        };
        return !h && l && (u.x += o(l, "x")(),
        u.y += o(l, "y")()),
        u
    }
      , n = function(t, e, i) {
        var o = typeof t;
        return isNaN(t) ? "number" === o || "string" === o && "=" === t.charAt(1) ? t : "max" === t ? s(e, i) : Math.min(s(e, i), l(t, e)[i]) : parseFloat(t)
    }
      , r = _gsScope._gsDefine.plugin({
        propName: "scrollTo",
        API: 2,
        global: !0,
        version: "1.9.1",
        init: function(t, s, i) {
            return this._wdw = t === e,
            this._target = t,
            this._tween = i,
            "object" != typeof s ? (s = {
                y: s
            },
            "string" == typeof s.y && "max" !== s.y && "=" !== s.y.charAt(1) && (s.x = s.y)) : s.nodeType && (s = {
                y: s,
                x: s
            }),
            this.vars = s,
            this._autoKill = s.autoKill !== !1,
            this.getX = o(t, "x"),
            this.getY = o(t, "y"),
            this.x = this.xPrev = this.getX(),
            this.y = this.yPrev = this.getY(),
            null != s.x ? (this._addTween(this, "x", this.x, n(s.x, t, "x") - (s.offsetX || 0), "scrollTo_x", !0),
            this._overwriteProps.push("scrollTo_x")) : this.skipX = !0,
            null != s.y ? (this._addTween(this, "y", this.y, n(s.y, t, "y") - (s.offsetY || 0), "scrollTo_y", !0),
            this._overwriteProps.push("scrollTo_y")) : this.skipY = !0,
            !0
        },
        set: function(t) {
            this._super.setRatio.call(this, t);
            var i = this._wdw || !this.skipX ? this.getX() : this.xPrev
              , o = this._wdw || !this.skipY ? this.getY() : this.yPrev
              , l = o - this.yPrev
              , n = i - this.xPrev
              , h = r.autoKillThreshold;
            this.x < 0 && (this.x = 0),
            this.y < 0 && (this.y = 0),
            this._autoKill && (!this.skipX && (n > h || -h > n) && i < s(this._target, "x") && (this.skipX = !0),
            !this.skipY && (l > h || -h > l) && o < s(this._target, "y") && (this.skipY = !0),
            this.skipX && this.skipY && (this._tween.kill(),
            this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))),
            this._wdw ? e.scrollTo(this.skipX ? i : this.x, this.skipY ? o : this.y) : (this.skipY || (this._target.scrollTop = this.y),
            this.skipX || (this._target.scrollLeft = this.x)),
            this.xPrev = this.x,
            this.yPrev = this.y
        }
    })
      , h = r.prototype;
    r.max = s,
    r.getOffset = l,
    r.buildGetter = o,
    r.autoKillThreshold = 7,
    h._kill = function(t) {
        return t.scrollTo_x && (this.skipX = !0),
        t.scrollTo_y && (this.skipY = !0),
        this._super._kill.call(this, t)
    }
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(t) {
    "use strict";
    var e = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[t]
    };
    "undefined" != typeof module && module.exports ? (require("../TweenLite.min.js"),
    module.exports = e()) : "function" == typeof define && define.amd && define(["TweenLite"], e)
}("ScrollToPlugin");
!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.inView = e() : t.inView = e()
}(this, function() {
    return function(t) {
        function e(r) {
            if (n[r])
                return n[r].exports;
            var i = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return t[r].call(i.exports, i, i.exports, e),
            i.loaded = !0,
            i.exports
        }
        var n = {};
        return e.m = t,
        e.c = n,
        e.p = "",
        e(0)
    }([function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var i = n(2)
          , o = r(i);
        t.exports = o.default
    }
    , function(t, e) {
        function n(t) {
            var e = typeof t;
            return null != t && ("object" == e || "function" == e)
        }
        t.exports = n
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(9)
          , o = r(i)
          , u = n(3)
          , f = r(u)
          , s = n(4)
          , c = function() {
            if ("undefined" != typeof window) {
                var t = 100
                  , e = ["scroll", "resize", "load"]
                  , n = {
                    history: []
                }
                  , r = {
                    offset: {},
                    threshold: 0,
                    test: s.inViewport
                }
                  , i = (0,
                o.default)(function() {
                    n.history.forEach(function(t) {
                        n[t].check()
                    })
                }, t);
                e.forEach(function(t) {
                    return addEventListener(t, i)
                }),
                window.MutationObserver && addEventListener("DOMContentLoaded", function() {
                    new MutationObserver(i).observe(document.body, {
                        attributes: !0,
                        childList: !0,
                        subtree: !0
                    })
                });
                var u = function(t) {
                    if ("string" == typeof t) {
                        var e = [].slice.call(document.querySelectorAll(t));
                        return n.history.indexOf(t) > -1 ? n[t].elements = e : (n[t] = (0,
                        f.default)(e, r),
                        n.history.push(t)),
                        n[t]
                    }
                };
                return u.offset = function(t) {
                    if (void 0 === t)
                        return r.offset;
                    var e = function(t) {
                        return "number" == typeof t
                    };
                    return ["top", "right", "bottom", "left"].forEach(e(t) ? function(e) {
                        return r.offset[e] = t
                    }
                    : function(n) {
                        return e(t[n]) ? r.offset[n] = t[n] : null
                    }
                    ),
                    r.offset
                }
                ,
                u.threshold = function(t) {
                    return "number" == typeof t && t >= 0 && t <= 1 ? r.threshold = t : r.threshold
                }
                ,
                u.test = function(t) {
                    return "function" == typeof t ? r.test = t : r.test
                }
                ,
                u.is = function(t) {
                    return r.test(t, r)
                }
                ,
                u.offset(0),
                u
            }
        };
        e.default = c()
    }
    , function(t, e) {
        "use strict";
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n),
                r && t(e, r),
                e
            }
        }()
          , i = function() {
            function t(e, r) {
                n(this, t),
                this.options = r,
                this.elements = e,
                this.current = [],
                this.handlers = {
                    enter: [],
                    exit: []
                },
                this.singles = {
                    enter: [],
                    exit: []
                }
            }
            return r(t, [{
                key: "check",
                value: function() {
                    var t = this;
                    return this.elements.forEach(function(e) {
                        var n = t.options.test(e, t.options)
                          , r = t.current.indexOf(e)
                          , i = r > -1
                          , o = n && !i
                          , u = !n && i;
                        o && (t.current.push(e),
                        t.emit("enter", e)),
                        u && (t.current.splice(r, 1),
                        t.emit("exit", e))
                    }),
                    this
                }
            }, {
                key: "on",
                value: function(t, e) {
                    return this.handlers[t].push(e),
                    this
                }
            }, {
                key: "once",
                value: function(t, e) {
                    return this.singles[t].unshift(e),
                    this
                }
            }, {
                key: "emit",
                value: function(t, e) {
                    for (; this.singles[t].length; )
                        this.singles[t].pop()(e);
                    for (var n = this.handlers[t].length; --n > -1; )
                        this.handlers[t][n](e);
                    return this
                }
            }]),
            t
        }();
        e.default = function(t, e) {
            return new i(t,e)
        }
    }
    , function(t, e) {
        "use strict";
        function n(t, e) {
            var n = t.getBoundingClientRect()
              , r = n.top
              , i = n.right
              , o = n.bottom
              , u = n.left
              , f = n.width
              , s = n.height
              , c = {
                t: o,
                r: window.innerWidth - u,
                b: window.innerHeight - r,
                l: i
            }
              , a = {
                x: e.threshold * f,
                y: e.threshold * s
            };
            return c.t > e.offset.top + a.y && c.r > e.offset.right + a.x && c.b > e.offset.bottom + a.y && c.l > e.offset.left + a.x
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.inViewport = n
    }
    , function(t, e) {
        (function(e) {
            var n = "object" == typeof e && e && e.Object === Object && e;
            t.exports = n
        }
        ).call(e, function() {
            return this
        }())
    }
    , function(t, e, n) {
        var r = n(5)
          , i = "object" == typeof self && self && self.Object === Object && self
          , o = r || i || Function("return this")();
        t.exports = o
    }
    , function(t, e, n) {
        function r(t, e, n) {
            function r(e) {
                var n = x
                  , r = m;
                return x = m = void 0,
                E = e,
                w = t.apply(r, n)
            }
            function a(t) {
                return E = t,
                j = setTimeout(h, e),
                M ? r(t) : w
            }
            function l(t) {
                var n = t - O
                  , r = t - E
                  , i = e - n;
                return _ ? c(i, g - r) : i
            }
            function d(t) {
                var n = t - O
                  , r = t - E;
                return void 0 === O || n >= e || n < 0 || _ && r >= g
            }
            function h() {
                var t = o();
                return d(t) ? p(t) : void (j = setTimeout(h, l(t)))
            }
            function p(t) {
                return j = void 0,
                T && x ? r(t) : (x = m = void 0,
                w)
            }
            function v() {
                void 0 !== j && clearTimeout(j),
                E = 0,
                x = O = m = j = void 0
            }
            function y() {
                return void 0 === j ? w : p(o())
            }
            function b() {
                var t = o()
                  , n = d(t);
                if (x = arguments,
                m = this,
                O = t,
                n) {
                    if (void 0 === j)
                        return a(O);
                    if (_)
                        return j = setTimeout(h, e),
                        r(O)
                }
                return void 0 === j && (j = setTimeout(h, e)),
                w
            }
            var x, m, g, w, j, O, E = 0, M = !1, _ = !1, T = !0;
            if ("function" != typeof t)
                throw new TypeError(f);
            return e = u(e) || 0,
            i(n) && (M = !!n.leading,
            _ = "maxWait"in n,
            g = _ ? s(u(n.maxWait) || 0, e) : g,
            T = "trailing"in n ? !!n.trailing : T),
            b.cancel = v,
            b.flush = y,
            b
        }
        var i = n(1)
          , o = n(8)
          , u = n(10)
          , f = "Expected a function"
          , s = Math.max
          , c = Math.min;
        t.exports = r
    }
    , function(t, e, n) {
        var r = n(6)
          , i = function() {
            return r.Date.now()
        };
        t.exports = i
    }
    , function(t, e, n) {
        function r(t, e, n) {
            var r = !0
              , f = !0;
            if ("function" != typeof t)
                throw new TypeError(u);
            return o(n) && (r = "leading"in n ? !!n.leading : r,
            f = "trailing"in n ? !!n.trailing : f),
            i(t, e, {
                leading: r,
                maxWait: e,
                trailing: f
            })
        }
        var i = n(7)
          , o = n(1)
          , u = "Expected a function";
        t.exports = r
    }
    , function(t, e) {
        function n(t) {
            return t
        }
        t.exports = n
    }
    ])
});
!function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";
    function n(e, t, n) {
        var r, i = (t = t || ae).createElement("script");
        if (i.text = e,
        n)
            for (r in be)
                n[r] && (i[r] = n[r]);
        t.head.appendChild(i).parentNode.removeChild(i)
    }
    function r(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? pe[de.call(e)] || "object" : typeof e
    }
    function i(e) {
        var t = !!e && "length"in e && e.length
          , n = r(e);
        return !me(e) && !xe(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    function o(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    function a(e, t, n) {
        return me(t) ? we.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        }) : t.nodeType ? we.grep(e, function(e) {
            return e === t !== n
        }) : "string" != typeof t ? we.grep(e, function(e) {
            return fe.call(t, e) > -1 !== n
        }) : we.filter(t, e, n)
    }
    function s(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType; )
            ;
        return e
    }
    function u(e) {
        var t = {};
        return we.each(e.match(Le) || [], function(e, n) {
            t[n] = !0
        }),
        t
    }
    function l(e) {
        return e
    }
    function c(e) {
        throw e
    }
    function f(e, t, n, r) {
        var i;
        try {
            e && me(i = e.promise) ? i.call(e).done(t).fail(n) : e && me(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    function p() {
        ae.removeEventListener("DOMContentLoaded", p),
        e.removeEventListener("load", p),
        we.ready()
    }
    function d(e, t) {
        return t.toUpperCase()
    }
    function h(e) {
        return e.replace(Me, "ms-").replace(Re, d)
    }
    function g() {
        this.expando = we.expando + g.uid++
    }
    function y(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Be.test(e) ? JSON.parse(e) : e)
    }
    function v(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(Fe, "-$&").toLowerCase(),
            "string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = y(n)
                } catch (e) {}
                $e.set(e, t, n)
            } else
                n = void 0;
        return n
    }
    function m(e, t, n, r) {
        var i, o, a = 20, s = r ? function() {
            return r.cur()
        }
        : function() {
            return we.css(e, t, "")
        }
        , u = s(), l = n && n[3] || (we.cssNumber[t] ? "" : "px"), c = (we.cssNumber[t] || "px" !== l && +u) && ze.exec(we.css(e, t));
        if (c && c[3] !== l) {
            for (u /= 2,
            l = l || c[3],
            c = +u || 1; a--; )
                we.style(e, t, c + l),
                (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0),
                c /= o;
            c *= 2,
            we.style(e, t, c + l),
            n = n || []
        }
        return n && (c = +c || +u || 0,
        i = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
        r && (r.unit = l,
        r.start = c,
        r.end = i)),
        i
    }
    function x(e) {
        var t, n = e.ownerDocument, r = e.nodeName, i = Ge[r];
        return i || (t = n.body.appendChild(n.createElement(r)),
        i = we.css(t, "display"),
        t.parentNode.removeChild(t),
        "none" === i && (i = "block"),
        Ge[r] = i,
        i)
    }
    function b(e, t) {
        for (var n, r, i = [], o = 0, a = e.length; o < a; o++)
            (r = e[o]).style && (n = r.style.display,
            t ? ("none" === n && (i[o] = We.get(r, "display") || null,
            i[o] || (r.style.display = "")),
            "" === r.style.display && Ue(r) && (i[o] = x(r))) : "none" !== n && (i[o] = "none",
            We.set(r, "display", n)));
        for (o = 0; o < a; o++)
            null != i[o] && (e[o].style.display = i[o]);
        return e
    }
    function w(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
        void 0 === t || t && o(e, t) ? we.merge([e], n) : n
    }
    function T(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            We.set(e[n], "globalEval", !t || We.get(t[n], "globalEval"))
    }
    function C(e, t, n, i, o) {
        for (var a, s, u, l, c, f, p = t.createDocumentFragment(), d = [], h = 0, g = e.length; h < g; h++)
            if ((a = e[h]) || 0 === a)
                if ("object" === r(a))
                    we.merge(d, a.nodeType ? [a] : a);
                else if (Ze.test(a)) {
                    for (s = s || p.appendChild(t.createElement("div")),
                    u = (Qe.exec(a) || ["", ""])[1].toLowerCase(),
                    l = Ke[u] || Ke._default,
                    s.innerHTML = l[1] + we.htmlPrefilter(a) + l[2],
                    f = l[0]; f--; )
                        s = s.lastChild;
                    we.merge(d, s.childNodes),
                    (s = p.firstChild).textContent = ""
                } else
                    d.push(t.createTextNode(a));
        for (p.textContent = "",
        h = 0; a = d[h++]; )
            if (i && we.inArray(a, i) > -1)
                o && o.push(a);
            else if (c = we.contains(a.ownerDocument, a),
            s = w(p.appendChild(a), "script"),
            c && T(s),
            n)
                for (f = 0; a = s[f++]; )
                    Je.test(a.type || "") && n.push(a);
        return p
    }
    function E() {
        return !0
    }
    function k() {
        return !1
    }
    function S() {
        try {
            return ae.activeElement
        } catch (e) {}
    }
    function D(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            "string" != typeof n && (r = r || n,
            n = void 0);
            for (s in t)
                D(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n,
        r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
        r = void 0) : (i = r,
        r = n,
        n = void 0)),
        !1 === i)
            i = k;
        else if (!i)
            return e;
        return 1 === o && (a = i,
        (i = function(e) {
            return we().off(e),
            a.apply(this, arguments)
        }
        ).guid = a.guid || (a.guid = we.guid++)),
        e.each(function() {
            we.event.add(this, t, i, r, n)
        })
    }
    function N(e, t) {
        return o(e, "table") && o(11 !== t.nodeType ? t : t.firstChild, "tr") ? we(e).children("tbody")[0] || e : e
    }
    function A(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
        e
    }
    function j(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"),
        e
    }
    function q(e, t) {
        var n, r, i, o, a, s, u, l;
        if (1 === t.nodeType) {
            if (We.hasData(e) && (o = We.access(e),
            a = We.set(t, o),
            l = o.events)) {
                delete a.handle,
                a.events = {};
                for (i in l)
                    for (n = 0,
                    r = l[i].length; n < r; n++)
                        we.event.add(t, i, l[i][n])
            }
            $e.hasData(e) && (s = $e.access(e),
            u = we.extend({}, s),
            $e.set(t, u))
        }
    }
    function L(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Ye.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }
    function H(e, t, r, i) {
        t = le.apply([], t);
        var o, a, s, u, l, c, f = 0, p = e.length, d = p - 1, h = t[0], g = me(h);
        if (g || p > 1 && "string" == typeof h && !ve.checkClone && at.test(h))
            return e.each(function(n) {
                var o = e.eq(n);
                g && (t[0] = h.call(this, n, o.html())),
                H(o, t, r, i)
            });
        if (p && (o = C(t, e[0].ownerDocument, !1, e, i),
        a = o.firstChild,
        1 === o.childNodes.length && (o = a),
        a || i)) {
            for (u = (s = we.map(w(o, "script"), A)).length; f < p; f++)
                l = o,
                f !== d && (l = we.clone(l, !0, !0),
                u && we.merge(s, w(l, "script"))),
                r.call(e[f], l, f);
            if (u)
                for (c = s[s.length - 1].ownerDocument,
                we.map(s, j),
                f = 0; f < u; f++)
                    l = s[f],
                    Je.test(l.type || "") && !We.access(l, "globalEval") && we.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? we._evalUrl && we._evalUrl(l.src) : n(l.textContent.replace(st, ""), c, l))
        }
        return e
    }
    function O(e, t, n) {
        for (var r, i = t ? we.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
            n || 1 !== r.nodeType || we.cleanData(w(r)),
            r.parentNode && (n && we.contains(r.ownerDocument, r) && T(w(r, "script")),
            r.parentNode.removeChild(r));
        return e
    }
    function P(e, t, n) {
        var r, i, o, a, s = e.style;
        return (n = n || lt(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || we.contains(e.ownerDocument, e) || (a = we.style(e, t)),
        !ve.pixelBoxStyles() && ut.test(a) && ct.test(t) && (r = s.width,
        i = s.minWidth,
        o = s.maxWidth,
        s.minWidth = s.maxWidth = s.width = a,
        a = n.width,
        s.width = r,
        s.minWidth = i,
        s.maxWidth = o)),
        void 0 !== a ? a + "" : a
    }
    function M(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }
    function R(e) {
        if (e in yt)
            return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = gt.length; n--; )
            if ((e = gt[n] + t)in yt)
                return e
    }
    function I(e) {
        var t = we.cssProps[e];
        return t || (t = we.cssProps[e] = R(e) || e),
        t
    }
    function W(e, t, n) {
        var r = ze.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }
    function $(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0
          , s = 0
          , u = 0;
        if (n === (r ? "border" : "content"))
            return 0;
        for (; a < 4; a += 2)
            "margin" === n && (u += we.css(e, n + Xe[a], !0, i)),
            r ? ("content" === n && (u -= we.css(e, "padding" + Xe[a], !0, i)),
            "margin" !== n && (u -= we.css(e, "border" + Xe[a] + "Width", !0, i))) : (u += we.css(e, "padding" + Xe[a], !0, i),
            "padding" !== n ? u += we.css(e, "border" + Xe[a] + "Width", !0, i) : s += we.css(e, "border" + Xe[a] + "Width", !0, i));
        return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5))),
        u
    }
    function B(e, t, n) {
        var r = lt(e)
          , i = P(e, t, r)
          , o = "border-box" === we.css(e, "boxSizing", !1, r)
          , a = o;
        if (ut.test(i)) {
            if (!n)
                return i;
            i = "auto"
        }
        return a = a && (ve.boxSizingReliable() || i === e.style[t]),
        ("auto" === i || !parseFloat(i) && "inline" === we.css(e, "display", !1, r)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)],
        a = !0),
        (i = parseFloat(i) || 0) + $(e, t, n || (o ? "border" : "content"), a, r, i) + "px"
    }
    function F(e, t, n, r, i) {
        return new F.prototype.init(e,t,n,r,i)
    }
    function _() {
        mt && (!1 === ae.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(_) : e.setTimeout(_, we.fx.interval),
        we.fx.tick())
    }
    function z() {
        return e.setTimeout(function() {
            vt = void 0
        }),
        vt = Date.now()
    }
    function X(e, t) {
        var n, r = 0, i = {
            height: e
        };
        for (t = t ? 1 : 0; r < 4; r += 2 - t)
            i["margin" + (n = Xe[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function U(e, t, n) {
        for (var r, i = (Y.tweeners[t] || []).concat(Y.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e))
                return r
    }
    function V(e, t, n) {
        var r, i, o, a, s, u, l, c, f = "width"in t || "height"in t, p = this, d = {}, h = e.style, g = e.nodeType && Ue(e), y = We.get(e, "fxshow");
        n.queue || (null == (a = we._queueHooks(e, "fx")).unqueued && (a.unqueued = 0,
        s = a.empty.fire,
        a.empty.fire = function() {
            a.unqueued || s()
        }
        ),
        a.unqueued++,
        p.always(function() {
            p.always(function() {
                a.unqueued--,
                we.queue(e, "fx").length || a.empty.fire()
            })
        }));
        for (r in t)
            if (i = t[r],
            xt.test(i)) {
                if (delete t[r],
                o = o || "toggle" === i,
                i === (g ? "hide" : "show")) {
                    if ("show" !== i || !y || void 0 === y[r])
                        continue;
                    g = !0
                }
                d[r] = y && y[r] || we.style(e, r)
            }
        if ((u = !we.isEmptyObject(t)) || !we.isEmptyObject(d)) {
            f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY],
            null == (l = y && y.display) && (l = We.get(e, "display")),
            "none" === (c = we.css(e, "display")) && (l ? c = l : (b([e], !0),
            l = e.style.display || l,
            c = we.css(e, "display"),
            b([e]))),
            ("inline" === c || "inline-block" === c && null != l) && "none" === we.css(e, "float") && (u || (p.done(function() {
                h.display = l
            }),
            null == l && (c = h.display,
            l = "none" === c ? "" : c)),
            h.display = "inline-block")),
            n.overflow && (h.overflow = "hidden",
            p.always(function() {
                h.overflow = n.overflow[0],
                h.overflowX = n.overflow[1],
                h.overflowY = n.overflow[2]
            })),
            u = !1;
            for (r in d)
                u || (y ? "hidden"in y && (g = y.hidden) : y = We.access(e, "fxshow", {
                    display: l
                }),
                o && (y.hidden = !g),
                g && b([e], !0),
                p.done(function() {
                    g || b([e]),
                    We.remove(e, "fxshow");
                    for (r in d)
                        we.style(e, r, d[r])
                })),
                u = U(g ? y[r] : 0, r, p),
                r in y || (y[r] = u.start,
                g && (u.end = u.start,
                u.start = 0))
        }
    }
    function G(e, t) {
        var n, r, i, o, a;
        for (n in e)
            if (r = h(n),
            i = t[r],
            o = e[n],
            Array.isArray(o) && (i = o[1],
            o = e[n] = o[0]),
            n !== r && (e[r] = o,
            delete e[n]),
            (a = we.cssHooks[r]) && "expand"in a) {
                o = a.expand(o),
                delete e[r];
                for (n in o)
                    n in e || (e[n] = o[n],
                    t[n] = i)
            } else
                t[r] = i
    }
    function Y(e, t, n) {
        var r, i, o = 0, a = Y.prefilters.length, s = we.Deferred().always(function() {
            delete u.elem
        }), u = function() {
            if (i)
                return !1;
            for (var t = vt || z(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++)
                l.tweens[o].run(r);
            return s.notifyWith(e, [l, r, n]),
            r < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]),
            s.resolveWith(e, [l]),
            !1)
        }, l = s.promise({
            elem: e,
            props: we.extend({}, t),
            opts: we.extend(!0, {
                specialEasing: {},
                easing: we.easing._default
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: vt || z(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = we.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(r),
                r
            },
            stop: function(t) {
                var n = 0
                  , r = t ? l.tweens.length : 0;
                if (i)
                    return this;
                for (i = !0; n < r; n++)
                    l.tweens[n].run(1);
                return t ? (s.notifyWith(e, [l, 1, 0]),
                s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]),
                this
            }
        }), c = l.props;
        for (G(c, l.opts.specialEasing); o < a; o++)
            if (r = Y.prefilters[o].call(l, e, c, l.opts))
                return me(r.stop) && (we._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)),
                r;
        return we.map(c, U, l),
        me(l.opts.start) && l.opts.start.call(e, l),
        l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always),
        we.fx.timer(we.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })),
        l
    }
    function Q(e) {
        return (e.match(Le) || []).join(" ")
    }
    function J(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    function K(e) {
        return Array.isArray(e) ? e : "string" == typeof e ? e.match(Le) || [] : []
    }
    function Z(e, t, n, i) {
        var o;
        if (Array.isArray(t))
            we.each(t, function(t, r) {
                n || qt.test(e) ? i(e, r) : Z(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, i)
            });
        else if (n || "object" !== r(t))
            i(e, t);
        else
            for (o in t)
                Z(e + "[" + o + "]", t[o], n, i)
    }
    function ee(e) {
        return function(t, n) {
            "string" != typeof t && (n = t,
            t = "*");
            var r, i = 0, o = t.toLowerCase().match(Le) || [];
            if (me(n))
                for (; r = o[i++]; )
                    "+" === r[0] ? (r = r.slice(1) || "*",
                    (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function te(e, t, n, r) {
        function i(s) {
            var u;
            return o[s] = !0,
            we.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l),
                i(l),
                !1)
            }),
            u
        }
        var o = {}
          , a = e === _t;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }
    function ne(e, t) {
        var n, r, i = we.ajaxSettings.flatOptions || {};
        for (n in t)
            void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && we.extend(!0, e, r),
        e
    }
    function re(e, t, n) {
        for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0]; )
            u.shift(),
            void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in s)
                if (s[i] && s[i].test(r)) {
                    u.unshift(i);
                    break
                }
        if (u[0]in n)
            o = u[0];
        else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                a || (a = i)
            }
            o = o || a
        }
        if (o)
            return o !== u[0] && u.unshift(o),
            n[o]
    }
    function ie(e, t, n, r) {
        var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters)
                l[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o; )
            if (e.responseFields[o] && (n[e.responseFields[o]] = t),
            !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
            u = o,
            o = c.shift())
                if ("*" === o)
                    o = u;
                else if ("*" !== u && u !== o) {
                    if (!(a = l[u + " " + o] || l["* " + o]))
                        for (i in l)
                            if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0],
                                c.unshift(s[1]));
                                break
                            }
                    if (!0 !== a)
                        if (a && e.throws)
                            t = a(t);
                        else
                            try {
                                t = a(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: a ? e : "No conversion from " + u + " to " + o
                                }
                            }
                }
        return {
            state: "success",
            data: t
        }
    }
    var oe = []
      , ae = e.document
      , se = Object.getPrototypeOf
      , ue = oe.slice
      , le = oe.concat
      , ce = oe.push
      , fe = oe.indexOf
      , pe = {}
      , de = pe.toString
      , he = pe.hasOwnProperty
      , ge = he.toString
      , ye = ge.call(Object)
      , ve = {}
      , me = function(e) {
        return "function" == typeof e && "number" != typeof e.nodeType
    }
      , xe = function(e) {
        return null != e && e === e.window
    }
      , be = {
        type: !0,
        src: !0,
        noModule: !0
    }
      , we = function(e, t) {
        return new we.fn.init(e,t)
    }
      , Te = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    we.fn = we.prototype = {
        jquery: "3.3.1",
        constructor: we,
        length: 0,
        toArray: function() {
            return ue.call(this)
        },
        get: function(e) {
            return null == e ? ue.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = we.merge(this.constructor(), e);
            return t.prevObject = this,
            t
        },
        each: function(e) {
            return we.each(this, e)
        },
        map: function(e) {
            return this.pushStack(we.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(ue.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length
              , n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: ce,
        sort: oe.sort,
        splice: oe.splice
    },
    we.extend = we.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof a && (l = a,
        a = arguments[s] || {},
        s++),
        "object" == typeof a || me(a) || (a = {}),
        s === u && (a = this,
        s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e)
                    n = a[t],
                    a !== (r = e[t]) && (l && r && (we.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1,
                    o = n && Array.isArray(n) ? n : []) : o = n && we.isPlainObject(n) ? n : {},
                    a[t] = we.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }
    ,
    we.extend({
        expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== de.call(e) || (t = se(e)) && ("function" != typeof (n = he.call(t, "constructor") && t.constructor) || ge.call(n) !== ye))
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        globalEval: function(e) {
            n(e)
        },
        each: function(e, t) {
            var n, r = 0;
            if (i(e))
                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++)
                    ;
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r]))
                        break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(Te, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (i(Object(e)) ? we.merge(n, "string" == typeof e ? [e] : e) : ce.call(n, e)),
            n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : fe.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                e[i++] = t[r];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++)
                (r = !t(e[o], o)) !== s && i.push(e[o]);
            return i
        },
        map: function(e, t, n) {
            var r, o, a = 0, s = [];
            if (i(e))
                for (r = e.length; a < r; a++)
                    null != (o = t(e[a], a, n)) && s.push(o);
            else
                for (a in e)
                    null != (o = t(e[a], a, n)) && s.push(o);
            return le.apply([], s)
        },
        guid: 1,
        support: ve
    }),
    "function" == typeof Symbol && (we.fn[Symbol.iterator] = oe[Symbol.iterator]),
    we.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        pe["[object " + t + "]"] = t.toLowerCase()
    });
    var Ce = function(e) {
        function t(e, t, n, r) {
            var i, o, a, s, u, l, c, p = t && t.ownerDocument, h = t ? t.nodeType : 9;
            if (n = n || [],
            "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h)
                return n;
            if (!r && ((t ? t.ownerDocument || t : B) !== H && L(t),
            t = t || H,
            P)) {
                if (11 !== h && (u = ve.exec(e)))
                    if (i = u[1]) {
                        if (9 === h) {
                            if (!(a = t.getElementById(i)))
                                return n;
                            if (a.id === i)
                                return n.push(a),
                                n
                        } else if (p && (a = p.getElementById(i)) && W(t, a) && a.id === i)
                            return n.push(a),
                            n
                    } else {
                        if (u[2])
                            return K.apply(n, t.getElementsByTagName(e)),
                            n;
                        if ((i = u[3]) && T.getElementsByClassName && t.getElementsByClassName)
                            return K.apply(n, t.getElementsByClassName(i)),
                            n
                    }
                if (T.qsa && !U[e + " "] && (!M || !M.test(e))) {
                    if (1 !== h)
                        p = t,
                        c = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(we, Te) : t.setAttribute("id", s = $),
                        o = (l = S(e)).length; o--; )
                            l[o] = "#" + s + " " + d(l[o]);
                        c = l.join(","),
                        p = me.test(e) && f(t.parentNode) || t
                    }
                    if (c)
                        try {
                            return K.apply(n, p.querySelectorAll(c)),
                            n
                        } catch (e) {} finally {
                            s === $ && t.removeAttribute("id")
                        }
                }
            }
            return N(e.replace(se, "$1"), t, n, r)
        }
        function n() {
            function e(n, r) {
                return t.push(n + " ") > C.cacheLength && delete e[t.shift()],
                e[n + " "] = r
            }
            var t = [];
            return e
        }
        function r(e) {
            return e[$] = !0,
            e
        }
        function i(e) {
            var t = H.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function o(e, t) {
            for (var n = e.split("|"), r = n.length; r--; )
                C.attrHandle[n[r]] = t
        }
        function a(e, t) {
            var n = t && e
              , r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r)
                return r;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function s(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }
        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function l(e) {
            return function(t) {
                return "form"in t ? t.parentNode && !1 === t.disabled ? "label"in t ? "label"in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Ee(t) === e : t.disabled === e : "label"in t && t.disabled === e
            }
        }
        function c(e) {
            return r(function(t) {
                return t = +t,
                r(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--; )
                        n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }
        function f(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        function p() {}
        function d(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++)
                r += e[t].value;
            return r
        }
        function h(e, t, n) {
            var r = t.dir
              , i = t.next
              , o = i || r
              , a = n && "parentNode" === o
              , s = _++;
            return t.first ? function(t, n, i) {
                for (; t = t[r]; )
                    if (1 === t.nodeType || a)
                        return e(t, n, i);
                return !1
            }
            : function(t, n, u) {
                var l, c, f, p = [F, s];
                if (u) {
                    for (; t = t[r]; )
                        if ((1 === t.nodeType || a) && e(t, n, u))
                            return !0
                } else
                    for (; t = t[r]; )
                        if (1 === t.nodeType || a)
                            if (f = t[$] || (t[$] = {}),
                            c = f[t.uniqueID] || (f[t.uniqueID] = {}),
                            i && i === t.nodeName.toLowerCase())
                                t = t[r] || t;
                            else {
                                if ((l = c[o]) && l[0] === F && l[1] === s)
                                    return p[2] = l[2];
                                if (c[o] = p,
                                p[2] = e(t, n, u))
                                    return !0
                            }
                return !1
            }
        }
        function g(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--; )
                    if (!e[i](t, n, r))
                        return !1;
                return !0
            }
            : e[0]
        }
        function y(e, n, r) {
            for (var i = 0, o = n.length; i < o; i++)
                t(e, n[i], r);
            return r
        }
        function v(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
                (o = e[s]) && (n && !n(o, r, i) || (a.push(o),
                l && t.push(s)));
            return a
        }
        function m(e, t, n, i, o, a) {
            return i && !i[$] && (i = m(i)),
            o && !o[$] && (o = m(o, a)),
            r(function(r, a, s, u) {
                var l, c, f, p = [], d = [], h = a.length, g = r || y(t || "*", s.nodeType ? [s] : s, []), m = !e || !r && t ? g : v(g, p, e, s, u), x = n ? o || (r ? e : h || i) ? [] : a : m;
                if (n && n(m, x, s, u),
                i)
                    for (l = v(x, d),
                    i(l, [], s, u),
                    c = l.length; c--; )
                        (f = l[c]) && (x[d[c]] = !(m[d[c]] = f));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (l = [],
                            c = x.length; c--; )
                                (f = x[c]) && l.push(m[c] = f);
                            o(null, x = [], l, u)
                        }
                        for (c = x.length; c--; )
                            (f = x[c]) && (l = o ? ee(r, f) : p[c]) > -1 && (r[l] = !(a[l] = f))
                    }
                } else
                    x = v(x === a ? x.splice(h, x.length) : x),
                    o ? o(null, a, x, u) : K.apply(a, x)
            })
        }
        function x(e) {
            for (var t, n, r, i = e.length, o = C.relative[e[0].type], a = o || C.relative[" "], s = o ? 1 : 0, u = h(function(e) {
                return e === t
            }, a, !0), l = h(function(e) {
                return ee(t, e) > -1
            }, a, !0), c = [function(e, n, r) {
                var i = !o && (r || n !== A) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                return t = null,
                i
            }
            ]; s < i; s++)
                if (n = C.relative[e[s].type])
                    c = [h(g(c), n)];
                else {
                    if ((n = C.filter[e[s].type].apply(null, e[s].matches))[$]) {
                        for (r = ++s; r < i && !C.relative[e[r].type]; r++)
                            ;
                        return m(s > 1 && g(c), s > 1 && d(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(se, "$1"), n, s < r && x(e.slice(s, r)), r < i && x(e = e.slice(r)), r < i && d(e))
                    }
                    c.push(n)
                }
            return g(c)
        }
        function b(e, n) {
            var i = n.length > 0
              , o = e.length > 0
              , a = function(r, a, s, u, l) {
                var c, f, p, d = 0, h = "0", g = r && [], y = [], m = A, x = r || o && C.find.TAG("*", l), b = F += null == m ? 1 : Math.random() || .1, w = x.length;
                for (l && (A = a === H || a || l); h !== w && null != (c = x[h]); h++) {
                    if (o && c) {
                        for (f = 0,
                        a || c.ownerDocument === H || (L(c),
                        s = !P); p = e[f++]; )
                            if (p(c, a || H, s)) {
                                u.push(c);
                                break
                            }
                        l && (F = b)
                    }
                    i && ((c = !p && c) && d--,
                    r && g.push(c))
                }
                if (d += h,
                i && h !== d) {
                    for (f = 0; p = n[f++]; )
                        p(g, y, a, s);
                    if (r) {
                        if (d > 0)
                            for (; h--; )
                                g[h] || y[h] || (y[h] = Q.call(u));
                        y = v(y)
                    }
                    K.apply(u, y),
                    l && !r && y.length > 0 && d + n.length > 1 && t.uniqueSort(u)
                }
                return l && (F = b,
                A = m),
                g
            };
            return i ? r(a) : a
        }
        var w, T, C, E, k, S, D, N, A, j, q, L, H, O, P, M, R, I, W, $ = "sizzle" + 1 * new Date, B = e.document, F = 0, _ = 0, z = n(), X = n(), U = n(), V = function(e, t) {
            return e === t && (q = !0),
            0
        }, G = {}.hasOwnProperty, Y = [], Q = Y.pop, J = Y.push, K = Y.push, Z = Y.slice, ee = function(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] === t)
                    return n;
            return -1
        }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]", oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)", ae = new RegExp(ne + "+","g"), se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$","g"), ue = new RegExp("^" + ne + "*," + ne + "*"), le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]","g"), fe = new RegExp(oe), pe = new RegExp("^" + re + "$"), de = {
            ID: new RegExp("^#(" + re + ")"),
            CLASS: new RegExp("^\\.(" + re + ")"),
            TAG: new RegExp("^(" + re + "|[*])"),
            ATTR: new RegExp("^" + ie),
            PSEUDO: new RegExp("^" + oe),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)","i"),
            bool: new RegExp("^(?:" + te + ")$","i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)","i")
        }, he = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, ye = /^[^{]+\{\s*\[native \w/, ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, me = /[+~]/, xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)","ig"), be = function(e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        }, we = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, Te = function(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        }, Ce = function() {
            L()
        }, Ee = h(function(e) {
            return !0 === e.disabled && ("form"in e || "label"in e)
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            K.apply(Y = Z.call(B.childNodes), B.childNodes),
            Y[B.childNodes.length].nodeType
        } catch (e) {
            K = {
                apply: Y.length ? function(e, t) {
                    J.apply(e, Z.call(t))
                }
                : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++]; )
                        ;
                    e.length = n - 1
                }
            }
        }
        T = t.support = {},
        k = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }
        ,
        L = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : B;
            return r !== H && 9 === r.nodeType && r.documentElement ? (H = r,
            O = H.documentElement,
            P = !k(H),
            B !== H && (n = H.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Ce, !1) : n.attachEvent && n.attachEvent("onunload", Ce)),
            T.attributes = i(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }),
            T.getElementsByTagName = i(function(e) {
                return e.appendChild(H.createComment("")),
                !e.getElementsByTagName("*").length
            }),
            T.getElementsByClassName = ye.test(H.getElementsByClassName),
            T.getById = i(function(e) {
                return O.appendChild(e).id = $,
                !H.getElementsByName || !H.getElementsByName($).length
            }),
            T.getById ? (C.filter.ID = function(e) {
                var t = e.replace(xe, be);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ,
            C.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && P) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }
            ) : (C.filter.ID = function(e) {
                var t = e.replace(xe, be);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }
            ,
            C.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && P) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                            return [o];
                        for (i = t.getElementsByName(e),
                        r = 0; o = i[r++]; )
                            if ((n = o.getAttributeNode("id")) && n.value === e)
                                return [o]
                    }
                    return []
                }
            }
            ),
            C.find.TAG = T.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : T.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++]; )
                        1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }
            ,
            C.find.CLASS = T.getElementsByClassName && function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && P)
                    return t.getElementsByClassName(e)
            }
            ,
            R = [],
            M = [],
            (T.qsa = ye.test(H.querySelectorAll)) && (i(function(e) {
                O.appendChild(e).innerHTML = "<a id='" + $ + "'></a><select id='" + $ + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && M.push("[*^$]=" + ne + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || M.push("\\[" + ne + "*(?:value|" + te + ")"),
                e.querySelectorAll("[id~=" + $ + "-]").length || M.push("~="),
                e.querySelectorAll(":checked").length || M.push(":checked"),
                e.querySelectorAll("a#" + $ + "+*").length || M.push(".#.+[+~]")
            }),
            i(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = H.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && M.push("name" + ne + "*[*^$|!~]?="),
                2 !== e.querySelectorAll(":enabled").length && M.push(":enabled", ":disabled"),
                O.appendChild(e).disabled = !0,
                2 !== e.querySelectorAll(":disabled").length && M.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                M.push(",.*:")
            })),
            (T.matchesSelector = ye.test(I = O.matches || O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && i(function(e) {
                T.disconnectedMatch = I.call(e, "*"),
                I.call(e, "[s!='']:x"),
                R.push("!=", oe)
            }),
            M = M.length && new RegExp(M.join("|")),
            R = R.length && new RegExp(R.join("|")),
            t = ye.test(O.compareDocumentPosition),
            W = t || ye.test(O.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e
                  , r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }
            : function(e, t) {
                if (t)
                    for (; t = t.parentNode; )
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            V = t ? function(e, t) {
                if (e === t)
                    return q = !0,
                    0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !T.sortDetached && t.compareDocumentPosition(e) === n ? e === H || e.ownerDocument === B && W(B, e) ? -1 : t === H || t.ownerDocument === B && W(B, t) ? 1 : j ? ee(j, e) - ee(j, t) : 0 : 4 & n ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return q = !0,
                    0;
                var n, r = 0, i = e.parentNode, o = t.parentNode, s = [e], u = [t];
                if (!i || !o)
                    return e === H ? -1 : t === H ? 1 : i ? -1 : o ? 1 : j ? ee(j, e) - ee(j, t) : 0;
                if (i === o)
                    return a(e, t);
                for (n = e; n = n.parentNode; )
                    s.unshift(n);
                for (n = t; n = n.parentNode; )
                    u.unshift(n);
                for (; s[r] === u[r]; )
                    r++;
                return r ? a(s[r], u[r]) : s[r] === B ? -1 : u[r] === B ? 1 : 0
            }
            ,
            H) : H
        }
        ,
        t.matches = function(e, n) {
            return t(e, null, null, n)
        }
        ,
        t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== H && L(e),
            n = n.replace(ce, "='$1']"),
            T.matchesSelector && P && !U[n + " "] && (!R || !R.test(n)) && (!M || !M.test(n)))
                try {
                    var r = I.call(e, n);
                    if (r || T.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return r
                } catch (e) {}
            return t(n, H, null, [e]).length > 0
        }
        ,
        t.contains = function(e, t) {
            return (e.ownerDocument || e) !== H && L(e),
            W(e, t)
        }
        ,
        t.attr = function(e, t) {
            (e.ownerDocument || e) !== H && L(e);
            var n = C.attrHandle[t.toLowerCase()]
              , r = n && G.call(C.attrHandle, t.toLowerCase()) ? n(e, t, !P) : void 0;
            return void 0 !== r ? r : T.attributes || !P ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }
        ,
        t.escape = function(e) {
            return (e + "").replace(we, Te)
        }
        ,
        t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        t.uniqueSort = function(e) {
            var t, n = [], r = 0, i = 0;
            if (q = !T.detectDuplicates,
            j = !T.sortStable && e.slice(0),
            e.sort(V),
            q) {
                for (; t = e[i++]; )
                    t === e[i] && (r = n.push(i));
                for (; r--; )
                    e.splice(n[r], 1)
            }
            return j = null,
            e
        }
        ,
        E = t.getText = function(e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += E(e)
                } else if (3 === i || 4 === i)
                    return e.nodeValue
            } else
                for (; t = e[r++]; )
                    n += E(t);
            return n
        }
        ,
        (C = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: de,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(xe, be),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(xe, be),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return de.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && fe.test(n) && (t = S(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(xe, be).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = z[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && z(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var o = t.attr(i, e);
                        return null == o ? "!=" === n : !n || (o += "",
                        "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3)
                      , a = "last" !== e.slice(-4)
                      , s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    }
                    : function(t, n, u) {
                        var l, c, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling", y = t.parentNode, v = s && t.nodeName.toLowerCase(), m = !u && !s, x = !1;
                        if (y) {
                            if (o) {
                                for (; g; ) {
                                    for (p = t; p = p[g]; )
                                        if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType)
                                            return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? y.firstChild : y.lastChild],
                            a && m) {
                                for (x = (d = (l = (c = (f = (p = y)[$] || (p[$] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === F && l[1]) && l[2],
                                p = d && y.childNodes[d]; p = ++d && p && p[g] || (x = d = 0) || h.pop(); )
                                    if (1 === p.nodeType && ++x && p === t) {
                                        c[e] = [F, d, x];
                                        break
                                    }
                            } else if (m && (x = d = (l = (c = (f = (p = t)[$] || (p[$] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === F && l[1]),
                            !1 === x)
                                for (; (p = ++d && p && p[g] || (x = d = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++x || (m && ((c = (f = p[$] || (p[$] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [F, x]),
                                p !== t)); )
                                    ;
                            return (x -= i) === r || x % r == 0 && x / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var i, o = C.pseudos[e] || C.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[$] ? o(n) : o.length > 1 ? (i = [e, e, "", n],
                    C.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = o(e, n), a = i.length; a--; )
                            e[r = ee(e, i[a])] = !(t[r] = i[a])
                    }) : function(e) {
                        return o(e, 0, i)
                    }
                    ) : o
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = []
                      , n = []
                      , i = D(e.replace(se, "$1"));
                    return i[$] ? r(function(e, t, n, r) {
                        for (var o, a = i(e, null, r, []), s = e.length; s--; )
                            (o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, r, o) {
                        return t[0] = e,
                        i(t, null, o, n),
                        t[0] = null,
                        !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return e = e.replace(xe, be),
                    function(t) {
                        return (t.textContent || t.innerText || E(t)).indexOf(e) > -1
                    }
                }),
                lang: r(function(e) {
                    return pe.test(e || "") || t.error("unsupported lang: " + e),
                    e = e.replace(xe, be).toLowerCase(),
                    function(t) {
                        var n;
                        do
                            if (n = P ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-");
                        while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === O
                },
                focus: function(e) {
                    return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: l(!1),
                disabled: l(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !C.pseudos.empty(e)
                },
                header: function(e) {
                    return ge.test(e.nodeName)
                },
                input: function(e) {
                    return he.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(e, t) {
                    return [t - 1]
                }),
                eq: c(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: c(function(e, t) {
                    for (var n = 0; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                odd: c(function(e, t) {
                    for (var n = 1; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                lt: c(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0; )
                        e.push(r);
                    return e
                }),
                gt: c(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; )
                        e.push(r);
                    return e
                })
            }
        }).pseudos.nth = C.pseudos.eq;
        for (w in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            C.pseudos[w] = s(w);
        for (w in {
            submit: !0,
            reset: !0
        })
            C.pseudos[w] = u(w);
        return p.prototype = C.filters = C.pseudos,
        C.setFilters = new p,
        S = t.tokenize = function(e, n) {
            var r, i, o, a, s, u, l, c = X[e + " "];
            if (c)
                return n ? 0 : c.slice(0);
            for (s = e,
            u = [],
            l = C.preFilter; s; ) {
                r && !(i = ue.exec(s)) || (i && (s = s.slice(i[0].length) || s),
                u.push(o = [])),
                r = !1,
                (i = le.exec(s)) && (r = i.shift(),
                o.push({
                    value: r,
                    type: i[0].replace(se, " ")
                }),
                s = s.slice(r.length));
                for (a in C.filter)
                    !(i = de[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(),
                    o.push({
                        value: r,
                        type: a,
                        matches: i
                    }),
                    s = s.slice(r.length));
                if (!r)
                    break
            }
            return n ? s.length : s ? t.error(e) : X(e, u).slice(0)
        }
        ,
        D = t.compile = function(e, t) {
            var n, r = [], i = [], o = U[e + " "];
            if (!o) {
                for (t || (t = S(e)),
                n = t.length; n--; )
                    (o = x(t[n]))[$] ? r.push(o) : i.push(o);
                (o = U(e, b(i, r))).selector = e
            }
            return o
        }
        ,
        N = t.select = function(e, t, n, r) {
            var i, o, a, s, u, l = "function" == typeof e && e, c = !r && S(e = l.selector || e);
            if (n = n || [],
            1 === c.length) {
                if ((o = c[0] = c[0].slice(0)).length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && P && C.relative[o[1].type]) {
                    if (!(t = (C.find.ID(a.matches[0].replace(xe, be), t) || [])[0]))
                        return n;
                    l && (t = t.parentNode),
                    e = e.slice(o.shift().value.length)
                }
                for (i = de.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i],
                !C.relative[s = a.type]); )
                    if ((u = C.find[s]) && (r = u(a.matches[0].replace(xe, be), me.test(o[0].type) && f(t.parentNode) || t))) {
                        if (o.splice(i, 1),
                        !(e = r.length && d(o)))
                            return K.apply(n, r),
                            n;
                        break
                    }
            }
            return (l || D(e, c))(r, t, !P, n, !t || me.test(e) && f(t.parentNode) || t),
            n
        }
        ,
        T.sortStable = $.split("").sort(V).join("") === $,
        T.detectDuplicates = !!q,
        L(),
        T.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(H.createElement("fieldset"))
        }),
        i(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(e, t, n) {
            if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        T.attributes && i(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || o("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue
        }),
        i(function(e) {
            return null == e.getAttribute("disabled")
        }) || o(te, function(e, t, n) {
            var r;
            if (!n)
                return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }),
        t
    }(e);
    we.find = Ce,
    we.expr = Ce.selectors,
    we.expr[":"] = we.expr.pseudos,
    we.uniqueSort = we.unique = Ce.uniqueSort,
    we.text = Ce.getText,
    we.isXMLDoc = Ce.isXML,
    we.contains = Ce.contains,
    we.escapeSelector = Ce.escape;
    var Ee = function(e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
            if (1 === e.nodeType) {
                if (i && we(e).is(n))
                    break;
                r.push(e)
            }
        return r
    }
      , ke = function(e, t) {
        for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
        return n
    }
      , Se = we.expr.match.needsContext
      , De = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    we.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === r.nodeType ? we.find.matchesSelector(r, e) ? [r] : [] : we.find.matches(e, we.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }
    ,
    we.fn.extend({
        find: function(e) {
            var t, n, r = this.length, i = this;
            if ("string" != typeof e)
                return this.pushStack(we(e).filter(function() {
                    for (t = 0; t < r; t++)
                        if (we.contains(i[t], this))
                            return !0
                }));
            for (n = this.pushStack([]),
            t = 0; t < r; t++)
                we.find(e, i[t], n);
            return r > 1 ? we.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(a(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(a(this, e || [], !0))
        },
        is: function(e) {
            return !!a(this, "string" == typeof e && Se.test(e) ? we(e) : e || [], !1).length
        }
    });
    var Ne, Ae = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (we.fn.init = function(e, t, n) {
        var r, i;
        if (!e)
            return this;
        if (n = n || Ne,
        "string" == typeof e) {
            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : Ae.exec(e)) || !r[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof we ? t[0] : t,
                we.merge(this, we.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : ae, !0)),
                De.test(r[1]) && we.isPlainObject(t))
                    for (r in t)
                        me(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return (i = ae.getElementById(r[2])) && (this[0] = i,
            this.length = 1),
            this
        }
        return e.nodeType ? (this[0] = e,
        this.length = 1,
        this) : me(e) ? void 0 !== n.ready ? n.ready(e) : e(we) : we.makeArray(e, this)
    }
    ).prototype = we.fn,
    Ne = we(ae);
    var je = /^(?:parents|prev(?:Until|All))/
      , qe = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    we.fn.extend({
        has: function(e) {
            var t = we(e, this)
              , n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (we.contains(this, t[e]))
                        return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0, i = this.length, o = [], a = "string" != typeof e && we(e);
            if (!Se.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && we.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
            return this.pushStack(o.length > 1 ? we.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? fe.call(we(e), this[0]) : fe.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(we.uniqueSort(we.merge(this.get(), we(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    we.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return Ee(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return Ee(e, "parentNode", n)
        },
        next: function(e) {
            return s(e, "nextSibling")
        },
        prev: function(e) {
            return s(e, "previousSibling")
        },
        nextAll: function(e) {
            return Ee(e, "nextSibling")
        },
        prevAll: function(e) {
            return Ee(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return Ee(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return Ee(e, "previousSibling", n)
        },
        siblings: function(e) {
            return ke((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return ke(e.firstChild)
        },
        contents: function(e) {
            return o(e, "iframe") ? e.contentDocument : (o(e, "template") && (e = e.content || e),
            we.merge([], e.childNodes))
        }
    }, function(e, t) {
        we.fn[e] = function(n, r) {
            var i = we.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n),
            r && "string" == typeof r && (i = we.filter(r, i)),
            this.length > 1 && (qe[e] || we.uniqueSort(i),
            je.test(e) && i.reverse()),
            this.pushStack(i)
        }
    });
    var Le = /[^\x20\t\r\n\f]+/g;
    we.Callbacks = function(e) {
        e = "string" == typeof e ? u(e) : we.extend({}, e);
        var t, n, i, o, a = [], s = [], l = -1, c = function() {
            for (o = o || e.once,
            i = t = !0; s.length; l = -1)
                for (n = s.shift(); ++l < a.length; )
                    !1 === a[l].apply(n[0], n[1]) && e.stopOnFalse && (l = a.length,
                    n = !1);
            e.memory || (n = !1),
            t = !1,
            o && (a = n ? [] : "")
        }, f = {
            add: function() {
                return a && (n && !t && (l = a.length - 1,
                s.push(n)),
                function t(n) {
                    we.each(n, function(n, i) {
                        me(i) ? e.unique && f.has(i) || a.push(i) : i && i.length && "string" !== r(i) && t(i)
                    })
                }(arguments),
                n && !t && c()),
                this
            },
            remove: function() {
                return we.each(arguments, function(e, t) {
                    for (var n; (n = we.inArray(t, a, n)) > -1; )
                        a.splice(n, 1),
                        n <= l && l--
                }),
                this
            },
            has: function(e) {
                return e ? we.inArray(e, a) > -1 : a.length > 0
            },
            empty: function() {
                return a && (a = []),
                this
            },
            disable: function() {
                return o = s = [],
                a = n = "",
                this
            },
            disabled: function() {
                return !a
            },
            lock: function() {
                return o = s = [],
                n || t || (a = n = ""),
                this
            },
            locked: function() {
                return !!o
            },
            fireWith: function(e, n) {
                return o || (n = [e, (n = n || []).slice ? n.slice() : n],
                s.push(n),
                t || c()),
                this
            },
            fire: function() {
                return f.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!i
            }
        };
        return f
    }
    ,
    we.extend({
        Deferred: function(t) {
            var n = [["notify", "progress", we.Callbacks("memory"), we.Callbacks("memory"), 2], ["resolve", "done", we.Callbacks("once memory"), we.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", we.Callbacks("once memory"), we.Callbacks("once memory"), 1, "rejected"]]
              , r = "pending"
              , i = {
                state: function() {
                    return r
                },
                always: function() {
                    return o.done(arguments).fail(arguments),
                    this
                },
                catch: function(e) {
                    return i.then(null, e)
                },
                pipe: function() {
                    var e = arguments;
                    return we.Deferred(function(t) {
                        we.each(n, function(n, r) {
                            var i = me(e[r[4]]) && e[r[4]];
                            o[r[1]](function() {
                                var e = i && i.apply(this, arguments);
                                e && me(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments)
                            })
                        }),
                        e = null
                    }).promise()
                },
                then: function(t, r, i) {
                    function o(t, n, r, i) {
                        return function() {
                            var s = this
                              , u = arguments
                              , f = function() {
                                var e, f;
                                if (!(t < a)) {
                                    if ((e = r.apply(s, u)) === n.promise())
                                        throw new TypeError("Thenable self-resolution");
                                    f = e && ("object" == typeof e || "function" == typeof e) && e.then,
                                    me(f) ? i ? f.call(e, o(a, n, l, i), o(a, n, c, i)) : (a++,
                                    f.call(e, o(a, n, l, i), o(a, n, c, i), o(a, n, l, n.notifyWith))) : (r !== l && (s = void 0,
                                    u = [e]),
                                    (i || n.resolveWith)(s, u))
                                }
                            }
                              , p = i ? f : function() {
                                try {
                                    f()
                                } catch (e) {
                                    we.Deferred.exceptionHook && we.Deferred.exceptionHook(e, p.stackTrace),
                                    t + 1 >= a && (r !== c && (s = void 0,
                                    u = [e]),
                                    n.rejectWith(s, u))
                                }
                            }
                            ;
                            t ? p() : (we.Deferred.getStackHook && (p.stackTrace = we.Deferred.getStackHook()),
                            e.setTimeout(p))
                        }
                    }
                    var a = 0;
                    return we.Deferred(function(e) {
                        n[0][3].add(o(0, e, me(i) ? i : l, e.notifyWith)),
                        n[1][3].add(o(0, e, me(t) ? t : l)),
                        n[2][3].add(o(0, e, me(r) ? r : c))
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? we.extend(e, i) : i
                }
            }
              , o = {};
            return we.each(n, function(e, t) {
                var a = t[2]
                  , s = t[5];
                i[t[1]] = a.add,
                s && a.add(function() {
                    r = s
                }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock),
                a.add(t[3].fire),
                o[t[0]] = function() {
                    return o[t[0] + "With"](this === o ? void 0 : this, arguments),
                    this
                }
                ,
                o[t[0] + "With"] = a.fireWith
            }),
            i.promise(o),
            t && t.call(o, o),
            o
        },
        when: function(e) {
            var t = arguments.length
              , n = t
              , r = Array(n)
              , i = ue.call(arguments)
              , o = we.Deferred()
              , a = function(e) {
                return function(n) {
                    r[e] = this,
                    i[e] = arguments.length > 1 ? ue.call(arguments) : n,
                    --t || o.resolveWith(r, i)
                }
            };
            if (t <= 1 && (f(e, o.done(a(n)).resolve, o.reject, !t),
            "pending" === o.state() || me(i[n] && i[n].then)))
                return o.then();
            for (; n--; )
                f(i[n], a(n), o.reject);
            return o.promise()
        }
    });
    var He = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    we.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && He.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }
    ,
    we.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    }
    ;
    var Oe = we.Deferred();
    we.fn.ready = function(e) {
        return Oe.then(e).catch(function(e) {
            we.readyException(e)
        }),
        this
    }
    ,
    we.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --we.readyWait : we.isReady) || (we.isReady = !0,
            !0 !== e && --we.readyWait > 0 || Oe.resolveWith(ae, [we]))
        }
    }),
    we.ready.then = Oe.then,
    "complete" === ae.readyState || "loading" !== ae.readyState && !ae.documentElement.doScroll ? e.setTimeout(we.ready) : (ae.addEventListener("DOMContentLoaded", p),
    e.addEventListener("load", p));
    var Pe = function(e, t, n, i, o, a, s) {
        var u = 0
          , l = e.length
          , c = null == n;
        if ("object" === r(n)) {
            o = !0;
            for (u in n)
                Pe(e, t, u, n[u], !0, a, s)
        } else if (void 0 !== i && (o = !0,
        me(i) || (s = !0),
        c && (s ? (t.call(e, i),
        t = null) : (c = t,
        t = function(e, t, n) {
            return c.call(we(e), n)
        }
        )),
        t))
            for (; u < l; u++)
                t(e[u], n, s ? i : i.call(e[u], u, t(e[u], n)));
        return o ? e : c ? t.call(e) : l ? t(e[0], n) : a
    }
      , Me = /^-ms-/
      , Re = /-([a-z])/g
      , Ie = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    g.uid = 1,
    g.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {},
            Ie(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))),
            t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t)
                i[h(t)] = n;
            else
                for (r in t)
                    i[h(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][h(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n),
            void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(h) : (t = h(t))in r ? [t] : t.match(Le) || []).length;
                    for (; n--; )
                        delete r[t[n]]
                }
                (void 0 === t || we.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !we.isEmptyObject(t)
        }
    };
    var We = new g
      , $e = new g
      , Be = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , Fe = /[A-Z]/g;
    we.extend({
        hasData: function(e) {
            return $e.hasData(e) || We.hasData(e)
        },
        data: function(e, t, n) {
            return $e.access(e, t, n)
        },
        removeData: function(e, t) {
            $e.remove(e, t)
        },
        _data: function(e, t, n) {
            return We.access(e, t, n)
        },
        _removeData: function(e, t) {
            We.remove(e, t)
        }
    }),
    we.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0], a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = $e.get(o),
                1 === o.nodeType && !We.get(o, "hasDataAttrs"))) {
                    for (n = a.length; n--; )
                        a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = h(r.slice(5)),
                        v(o, r, i[r]));
                    We.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                $e.set(this, e)
            }) : Pe(this, function(t) {
                var n;
                if (o && void 0 === t) {
                    if (void 0 !== (n = $e.get(o, e)))
                        return n;
                    if (void 0 !== (n = v(o, e)))
                        return n
                } else
                    this.each(function() {
                        $e.set(this, e, t)
                    })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                $e.remove(this, e)
            })
        }
    }),
    we.extend({
        queue: function(e, t, n) {
            var r;
            if (e)
                return t = (t || "fx") + "queue",
                r = We.get(e, t),
                n && (!r || Array.isArray(n) ? r = We.access(e, t, we.makeArray(n)) : r.push(n)),
                r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = we.queue(e, t)
              , r = n.length
              , i = n.shift()
              , o = we._queueHooks(e, t)
              , a = function() {
                we.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(),
            r--),
            i && ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(e, a, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return We.get(e, n) || We.access(e, n, {
                empty: we.Callbacks("once memory").add(function() {
                    We.remove(e, [t + "queue", n])
                })
            })
        }
    }),
    we.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e,
            e = "fx",
            n--),
            arguments.length < n ? we.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = we.queue(this, e, t);
                we._queueHooks(this, e),
                "fx" === e && "inprogress" !== n[0] && we.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                we.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1, i = we.Deferred(), o = this, a = this.length, s = function() {
                --r || i.resolveWith(o, [o])
            };
            for ("string" != typeof e && (t = e,
            e = void 0),
            e = e || "fx"; a--; )
                (n = We.get(o[a], e + "queueHooks")) && n.empty && (r++,
                n.empty.add(s));
            return s(),
            i.promise(t)
        }
    });
    var _e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , ze = new RegExp("^(?:([+-])=|)(" + _e + ")([a-z%]*)$","i")
      , Xe = ["Top", "Right", "Bottom", "Left"]
      , Ue = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && we.contains(e.ownerDocument, e) && "none" === we.css(e, "display")
    }
      , Ve = function(e, t, n, r) {
        var i, o, a = {};
        for (o in t)
            a[o] = e.style[o],
            e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t)
            e.style[o] = a[o];
        return i
    }
      , Ge = {};
    we.fn.extend({
        show: function() {
            return b(this, !0)
        },
        hide: function() {
            return b(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Ue(this) ? we(this).show() : we(this).hide()
            })
        }
    });
    var Ye = /^(?:checkbox|radio)$/i
      , Qe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i
      , Je = /^$|^module$|\/(?:java|ecma)script/i
      , Ke = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    Ke.optgroup = Ke.option,
    Ke.tbody = Ke.tfoot = Ke.colgroup = Ke.caption = Ke.thead,
    Ke.th = Ke.td;
    var Ze = /<|&#?\w+;/;
    !function() {
        var e = ae.createDocumentFragment().appendChild(ae.createElement("div"))
          , t = ae.createElement("input");
        t.setAttribute("type", "radio"),
        t.setAttribute("checked", "checked"),
        t.setAttribute("name", "t"),
        e.appendChild(t),
        ve.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked,
        e.innerHTML = "<textarea>x</textarea>",
        ve.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    }();
    var et = ae.documentElement
      , tt = /^key/
      , nt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , rt = /^([^.]*)(?:\.(.+)|)/;
    we.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, y = We.get(e);
            if (y)
                for (n.handler && (n = (o = n).handler,
                i = o.selector),
                i && we.find.matchesSelector(et, i),
                n.guid || (n.guid = we.guid++),
                (u = y.events) || (u = y.events = {}),
                (a = y.handle) || (a = y.handle = function(t) {
                    return "undefined" != typeof we && we.event.triggered !== t.type ? we.event.dispatch.apply(e, arguments) : void 0
                }
                ),
                l = (t = (t || "").match(Le) || [""]).length; l--; )
                    d = g = (s = rt.exec(t[l]) || [])[1],
                    h = (s[2] || "").split(".").sort(),
                    d && (f = we.event.special[d] || {},
                    d = (i ? f.delegateType : f.bindType) || d,
                    f = we.event.special[d] || {},
                    c = we.extend({
                        type: d,
                        origType: g,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && we.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, o),
                    (p = u[d]) || ((p = u[d] = []).delegateCount = 0,
                    f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(d, a)),
                    f.add && (f.add.call(e, c),
                    c.handler.guid || (c.handler.guid = n.guid)),
                    i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                    we.event.global[d] = !0)
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, y = We.hasData(e) && We.get(e);
            if (y && (u = y.events)) {
                for (l = (t = (t || "").match(Le) || [""]).length; l--; )
                    if (s = rt.exec(t[l]) || [],
                    d = g = s[1],
                    h = (s[2] || "").split(".").sort(),
                    d) {
                        for (f = we.event.special[d] || {},
                        p = u[d = (r ? f.delegateType : f.bindType) || d] || [],
                        s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        a = o = p.length; o--; )
                            c = p[o],
                            !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1),
                            c.selector && p.delegateCount--,
                            f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, y.handle) || we.removeEvent(e, d, y.handle),
                        delete u[d])
                    } else
                        for (d in u)
                            we.event.remove(e, d + t[l], n, r, !0);
                we.isEmptyObject(u) && We.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, a, s = we.event.fix(e), u = new Array(arguments.length), l = (We.get(this, "events") || {})[s.type] || [], c = we.event.special[s.type] || {};
            for (u[0] = s,
            t = 1; t < arguments.length; t++)
                u[t] = arguments[t];
            if (s.delegateTarget = this,
            !c.preDispatch || !1 !== c.preDispatch.call(this, s)) {
                for (a = we.event.handlers.call(this, s, l),
                t = 0; (i = a[t++]) && !s.isPropagationStopped(); )
                    for (s.currentTarget = i.elem,
                    n = 0; (o = i.handlers[n++]) && !s.isImmediatePropagationStopped(); )
                        s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o,
                        s.data = o.data,
                        void 0 !== (r = ((we.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u)) && !1 === (s.result = r) && (s.preventDefault(),
                        s.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, s),
                s.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target;
            if (u && l.nodeType && !("click" === e.type && e.button >= 1))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [],
                        a = {},
                        n = 0; n < u; n++)
                            void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? we(i, this).index(l) > -1 : we.find(i, this, null, [l]).length),
                            a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    }
            return l = this,
            u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }),
            s
        },
        addProp: function(e, t) {
            Object.defineProperty(we.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: me(t) ? function() {
                    if (this.originalEvent)
                        return t(this.originalEvent)
                }
                : function() {
                    if (this.originalEvent)
                        return this.originalEvent[e]
                }
                ,
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[we.expando] ? e : new we.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== S() && this.focus)
                        return this.focus(),
                        !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === S() && this.blur)
                        return this.blur(),
                        !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && o(this, "input"))
                        return this.click(),
                        !1
                },
                _default: function(e) {
                    return o(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    },
    we.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }
    ,
    we.Event = function(e, t) {
        return this instanceof we.Event ? (e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? E : k,
        this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target,
        this.currentTarget = e.currentTarget,
        this.relatedTarget = e.relatedTarget) : this.type = e,
        t && we.extend(this, t),
        this.timeStamp = e && e.timeStamp || Date.now(),
        this[we.expando] = !0,
        void 0) : new we.Event(e,t)
    }
    ,
    we.Event.prototype = {
        constructor: we.Event,
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = E,
            e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = E,
            e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = E,
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    we.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && tt.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && nt.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, we.event.addProp),
    we.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        we.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this, i = e.relatedTarget, o = e.handleObj;
                return i && (i === r || we.contains(r, i)) || (e.type = o.origType,
                n = o.handler.apply(this, arguments),
                e.type = t),
                n
            }
        }
    }),
    we.fn.extend({
        on: function(e, t, n, r) {
            return D(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return D(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)
                return r = e.handleObj,
                we(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                this;
            if ("object" == typeof e) {
                for (i in e)
                    this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t,
            t = void 0),
            !1 === n && (n = k),
            this.each(function() {
                we.event.remove(this, e, n, t)
            })
        }
    });
    var it = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi
      , ot = /<script|<style|<link/i
      , at = /checked\s*(?:[^=]|=\s*.checked.)/i
      , st = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    we.extend({
        htmlPrefilter: function(e) {
            return e.replace(it, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, i, o, a, s = e.cloneNode(!0), u = we.contains(e.ownerDocument, e);
            if (!(ve.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || we.isXMLDoc(e)))
                for (a = w(s),
                r = 0,
                i = (o = w(e)).length; r < i; r++)
                    L(o[r], a[r]);
            if (t)
                if (n)
                    for (o = o || w(e),
                    a = a || w(s),
                    r = 0,
                    i = o.length; r < i; r++)
                        q(o[r], a[r]);
                else
                    q(e, s);
            return (a = w(s, "script")).length > 0 && T(a, !u && w(e, "script")),
            s
        },
        cleanData: function(e) {
            for (var t, n, r, i = we.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (Ie(n)) {
                    if (t = n[We.expando]) {
                        if (t.events)
                            for (r in t.events)
                                i[r] ? we.event.remove(n, r) : we.removeEvent(n, r, t.handle);
                        n[We.expando] = void 0
                    }
                    n[$e.expando] && (n[$e.expando] = void 0)
                }
        }
    }),
    we.fn.extend({
        detach: function(e) {
            return O(this, e, !0)
        },
        remove: function(e) {
            return O(this, e)
        },
        text: function(e) {
            return Pe(this, function(e) {
                return void 0 === e ? we.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return H(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || N(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return H(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = N(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return H(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return H(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                1 === e.nodeType && (we.cleanData(w(e, !1)),
                e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e,
            t = null == t ? e : t,
            this.map(function() {
                return we.clone(this, e, t)
            })
        },
        html: function(e) {
            return Pe(this, function(e) {
                var t = this[0] || {}
                  , n = 0
                  , r = this.length;
                if (void 0 === e && 1 === t.nodeType)
                    return t.innerHTML;
                if ("string" == typeof e && !ot.test(e) && !Ke[(Qe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = we.htmlPrefilter(e);
                    try {
                        for (; n < r; n++)
                            1 === (t = this[n] || {}).nodeType && (we.cleanData(w(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return H(this, arguments, function(t) {
                var n = this.parentNode;
                we.inArray(this, e) < 0 && (we.cleanData(w(this)),
                n && n.replaceChild(t, this))
            }, e)
        }
    }),
    we.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        we.fn[e] = function(e) {
            for (var n, r = [], i = we(e), o = i.length - 1, a = 0; a <= o; a++)
                n = a === o ? this : this.clone(!0),
                we(i[a])[t](n),
                ce.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var ut = new RegExp("^(" + _e + ")(?!px)[a-z%]+$","i")
      , lt = function(t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e),
        n.getComputedStyle(t)
    }
      , ct = new RegExp(Xe.join("|"),"i");
    !function() {
        function t() {
            if (l) {
                u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                et.appendChild(u).appendChild(l);
                var t = e.getComputedStyle(l);
                r = "1%" !== t.top,
                s = 12 === n(t.marginLeft),
                l.style.right = "60%",
                a = 36 === n(t.right),
                i = 36 === n(t.width),
                l.style.position = "absolute",
                o = 36 === l.offsetWidth || "absolute",
                et.removeChild(u),
                l = null
            }
        }
        function n(e) {
            return Math.round(parseFloat(e))
        }
        var r, i, o, a, s, u = ae.createElement("div"), l = ae.createElement("div");
        l.style && (l.style.backgroundClip = "content-box",
        l.cloneNode(!0).style.backgroundClip = "",
        ve.clearCloneStyle = "content-box" === l.style.backgroundClip,
        we.extend(ve, {
            boxSizingReliable: function() {
                return t(),
                i
            },
            pixelBoxStyles: function() {
                return t(),
                a
            },
            pixelPosition: function() {
                return t(),
                r
            },
            reliableMarginLeft: function() {
                return t(),
                s
            },
            scrollboxSize: function() {
                return t(),
                o
            }
        }))
    }();
    var ft = /^(none|table(?!-c[ea]).+)/
      , pt = /^--/
      , dt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , ht = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , gt = ["Webkit", "Moz", "ms"]
      , yt = ae.createElement("div").style;
    we.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = P(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = h(t), u = pt.test(t), l = e.style;
                if (u || (t = I(s)),
                a = we.cssHooks[t] || we.cssHooks[s],
                void 0 === n)
                    return a && "get"in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                "string" == (o = typeof n) && (i = ze.exec(n)) && i[1] && (n = m(e, t, i),
                o = "number"),
                null != n && n === n && ("number" === o && (n += i && i[3] || (we.cssNumber[s] ? "" : "px")),
                ve.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                a && "set"in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = h(t);
            return pt.test(t) || (t = I(s)),
            (a = we.cssHooks[t] || we.cssHooks[s]) && "get"in a && (i = a.get(e, !0, n)),
            void 0 === i && (i = P(e, t, r)),
            "normal" === i && t in ht && (i = ht[t]),
            "" === n || n ? (o = parseFloat(i),
            !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }),
    we.each(["height", "width"], function(e, t) {
        we.cssHooks[t] = {
            get: function(e, n, r) {
                if (n)
                    return !ft.test(we.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? B(e, t, r) : Ve(e, dt, function() {
                        return B(e, t, r)
                    })
            },
            set: function(e, n, r) {
                var i, o = lt(e), a = "border-box" === we.css(e, "boxSizing", !1, o), s = r && $(e, t, r, a, o);
                return a && ve.scrollboxSize() === o.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - $(e, t, "border", !1, o) - .5)),
                s && (i = ze.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n,
                n = we.css(e, t)),
                W(e, n, s)
            }
        }
    }),
    we.cssHooks.marginLeft = M(ve.reliableMarginLeft, function(e, t) {
        if (t)
            return (parseFloat(P(e, "marginLeft")) || e.getBoundingClientRect().left - Ve(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
    }),
    we.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        we.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++)
                    i[e + Xe[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        },
        "margin" !== e && (we.cssHooks[e + t].set = W)
    }),
    we.fn.extend({
        css: function(e, t) {
            return Pe(this, function(e, t, n) {
                var r, i, o = {}, a = 0;
                if (Array.isArray(t)) {
                    for (r = lt(e),
                    i = t.length; a < i; a++)
                        o[t[a]] = we.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? we.style(e, t, n) : we.css(e, t)
            }, e, t, arguments.length > 1)
        }
    }),
    we.Tween = F,
    F.prototype = {
        constructor: F,
        init: function(e, t, n, r, i, o) {
            this.elem = e,
            this.prop = n,
            this.easing = i || we.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = o || (we.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = F.propHooks[this.prop];
            return e && e.get ? e.get(this) : F.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = F.propHooks[this.prop];
            return this.options.duration ? this.pos = t = we.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : F.propHooks._default.set(this),
            this
        }
    },
    F.prototype.init.prototype = F.prototype,
    F.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = we.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                we.fx.step[e.prop] ? we.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[we.cssProps[e.prop]] && !we.cssHooks[e.prop] ? e.elem[e.prop] = e.now : we.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    },
    F.propHooks.scrollTop = F.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    we.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    },
    we.fx = F.prototype.init,
    we.fx.step = {};
    var vt, mt, xt = /^(?:toggle|show|hide)$/, bt = /queueHooks$/;
    we.Animation = we.extend(Y, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return m(n.elem, e, ze.exec(t), n),
                n
            }
            ]
        },
        tweener: function(e, t) {
            me(e) ? (t = e,
            e = ["*"]) : e = e.match(Le);
            for (var n, r = 0, i = e.length; r < i; r++)
                n = e[r],
                Y.tweeners[n] = Y.tweeners[n] || [],
                Y.tweeners[n].unshift(t)
        },
        prefilters: [V],
        prefilter: function(e, t) {
            t ? Y.prefilters.unshift(e) : Y.prefilters.push(e)
        }
    }),
    we.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? we.extend({}, e) : {
            complete: n || !n && t || me(e) && e,
            duration: e,
            easing: n && t || t && !me(t) && t
        };
        return we.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in we.fx.speeds ? r.duration = we.fx.speeds[r.duration] : r.duration = we.fx.speeds._default),
        null != r.queue && !0 !== r.queue || (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
            me(r.old) && r.old.call(this),
            r.queue && we.dequeue(this, r.queue)
        }
        ,
        r
    }
    ,
    we.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Ue).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = we.isEmptyObject(e)
              , o = we.speed(t, n, r)
              , a = function() {
                var t = Y(this, we.extend({}, e), o);
                (i || We.get(this, "finish")) && t.stop(!0)
            };
            return a.finish = a,
            i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop,
                t(n)
            };
            return "string" != typeof e && (n = t,
            t = e,
            e = void 0),
            t && !1 !== e && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0
                  , i = null != e && e + "queueHooks"
                  , o = we.timers
                  , a = We.get(this);
                if (i)
                    a[i] && a[i].stop && r(a[i]);
                else
                    for (i in a)
                        a[i] && a[i].stop && bt.test(i) && r(a[i]);
                for (i = o.length; i--; )
                    o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n),
                    t = !1,
                    o.splice(i, 1));
                !t && n || we.dequeue(this, e)
            })
        },
        finish: function(e) {
            return !1 !== e && (e = e || "fx"),
            this.each(function() {
                var t, n = We.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = we.timers, a = r ? r.length : 0;
                for (n.finish = !0,
                we.queue(this, e, []),
                i && i.stop && i.stop.call(this, !0),
                t = o.length; t--; )
                    o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0),
                    o.splice(t, 1));
                for (t = 0; t < a; t++)
                    r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }),
    we.each(["toggle", "show", "hide"], function(e, t) {
        var n = we.fn[t];
        we.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(X(t, !0), e, r, i)
        }
    }),
    we.each({
        slideDown: X("show"),
        slideUp: X("hide"),
        slideToggle: X("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        we.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }),
    we.timers = [],
    we.fx.tick = function() {
        var e, t = 0, n = we.timers;
        for (vt = Date.now(); t < n.length; t++)
            (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || we.fx.stop(),
        vt = void 0
    }
    ,
    we.fx.timer = function(e) {
        we.timers.push(e),
        we.fx.start()
    }
    ,
    we.fx.interval = 13,
    we.fx.start = function() {
        mt || (mt = !0,
        _())
    }
    ,
    we.fx.stop = function() {
        mt = null
    }
    ,
    we.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    we.fn.delay = function(t, n) {
        return t = we.fx ? we.fx.speeds[t] || t : t,
        n = n || "fx",
        this.queue(n, function(n, r) {
            var i = e.setTimeout(n, t);
            r.stop = function() {
                e.clearTimeout(i)
            }
        })
    }
    ,
    function() {
        var e = ae.createElement("input")
          , t = ae.createElement("select").appendChild(ae.createElement("option"));
        e.type = "checkbox",
        ve.checkOn = "" !== e.value,
        ve.optSelected = t.selected,
        (e = ae.createElement("input")).value = "t",
        e.type = "radio",
        ve.radioValue = "t" === e.value
    }();
    var wt, Tt = we.expr.attrHandle;
    we.fn.extend({
        attr: function(e, t) {
            return Pe(this, we.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                we.removeAttr(this, e)
            })
        }
    }),
    we.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return "undefined" == typeof e.getAttribute ? we.prop(e, t, n) : (1 === o && we.isXMLDoc(e) || (i = we.attrHooks[t.toLowerCase()] || (we.expr.match.bool.test(t) ? wt : void 0)),
                void 0 !== n ? null === n ? void we.removeAttr(e, t) : i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                n) : i && "get"in i && null !== (r = i.get(e, t)) ? r : null == (r = we.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!ve.radioValue && "radio" === t && o(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0, i = t && t.match(Le);
            if (i && 1 === e.nodeType)
                for (; n = i[r++]; )
                    e.removeAttribute(n)
        }
    }),
    wt = {
        set: function(e, t, n) {
            return !1 === t ? we.removeAttr(e, n) : e.setAttribute(n, n),
            n
        }
    },
    we.each(we.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = Tt[t] || we.find.attr;
        Tt[t] = function(e, t, r) {
            var i, o, a = t.toLowerCase();
            return r || (o = Tt[a],
            Tt[a] = i,
            i = null != n(e, t, r) ? a : null,
            Tt[a] = o),
            i
        }
    });
    var Ct = /^(?:input|select|textarea|button)$/i
      , Et = /^(?:a|area)$/i;
    we.fn.extend({
        prop: function(e, t) {
            return Pe(this, we.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[we.propFix[e] || e]
            })
        }
    }),
    we.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return 1 === o && we.isXMLDoc(e) || (t = we.propFix[t] || t,
                i = we.propHooks[t]),
                void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = we.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Ct.test(e.nodeName) || Et.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }),
    ve.optSelected || (we.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    we.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        we.propFix[this.toLowerCase()] = this
    }),
    we.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (me(e))
                return this.each(function(t) {
                    we(this).addClass(e.call(this, t, J(this)))
                });
            if ((t = K(e)).length)
                for (; n = this[u++]; )
                    if (i = J(n),
                    r = 1 === n.nodeType && " " + Q(i) + " ") {
                        for (a = 0; o = t[a++]; )
                            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = Q(r)) && n.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (me(e))
                return this.each(function(t) {
                    we(this).removeClass(e.call(this, t, J(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ((t = K(e)).length)
                for (; n = this[u++]; )
                    if (i = J(n),
                    r = 1 === n.nodeType && " " + Q(i) + " ") {
                        for (a = 0; o = t[a++]; )
                            for (; r.indexOf(" " + o + " ") > -1; )
                                r = r.replace(" " + o + " ", " ");
                        i !== (s = Q(r)) && n.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e
              , r = "string" === n || Array.isArray(e);
            return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : me(e) ? this.each(function(n) {
                we(this).toggleClass(e.call(this, n, J(this), t), t)
            }) : this.each(function() {
                var t, i, o, a;
                if (r)
                    for (i = 0,
                    o = we(this),
                    a = K(e); t = a[i++]; )
                        o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else
                    void 0 !== e && "boolean" !== n || ((t = J(this)) && We.set(this, "__className__", t),
                    this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : We.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++]; )
                if (1 === n.nodeType && (" " + Q(J(n)) + " ").indexOf(t) > -1)
                    return !0;
            return !1
        }
    });
    var kt = /\r/g;
    we.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0];
            return arguments.length ? (r = me(e),
            this.each(function(n) {
                var i;
                1 === this.nodeType && (null == (i = r ? e.call(this, n, we(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = we.map(i, function(e) {
                    return null == e ? "" : e + ""
                })),
                (t = we.valHooks[this.type] || we.valHooks[this.nodeName.toLowerCase()]) && "set"in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            })) : i ? (t = we.valHooks[i.type] || we.valHooks[i.nodeName.toLowerCase()]) && "get"in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(kt, "") : null == n ? "" : n : void 0
        }
    }),
    we.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = we.find.attr(e, "value");
                    return null != t ? t : Q(we.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options, a = e.selectedIndex, s = "select-one" === e.type, u = s ? null : [], l = s ? a + 1 : i.length;
                    for (r = a < 0 ? l : s ? a : 0; r < l; r++)
                        if (((n = i[r]).selected || r === a) && !n.disabled && (!n.parentNode.disabled || !o(n.parentNode, "optgroup"))) {
                            if (t = we(n).val(),
                            s)
                                return t;
                            u.push(t)
                        }
                    return u
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = we.makeArray(t), a = i.length; a--; )
                        ((r = i[a]).selected = we.inArray(we.valHooks.option.get(r), o) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1),
                    o
                }
            }
        }
    }),
    we.each(["radio", "checkbox"], function() {
        we.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t))
                    return e.checked = we.inArray(we(e).val(), t) > -1
            }
        },
        ve.checkOn || (we.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    }),
    ve.focusin = "onfocusin"in e;
    var St = /^(?:focusinfocus|focusoutblur)$/
      , Dt = function(e) {
        e.stopPropagation()
    };
    we.extend(we.event, {
        trigger: function(t, n, r, i) {
            var o, a, s, u, l, c, f, p, d = [r || ae], h = he.call(t, "type") ? t.type : t, g = he.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = p = s = r = r || ae,
            3 !== r.nodeType && 8 !== r.nodeType && !St.test(h + we.event.triggered) && (h.indexOf(".") > -1 && (h = (g = h.split(".")).shift(),
            g.sort()),
            l = h.indexOf(":") < 0 && "on" + h,
            t = t[we.expando] ? t : new we.Event(h,"object" == typeof t && t),
            t.isTrigger = i ? 2 : 3,
            t.namespace = g.join("."),
            t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            t.result = void 0,
            t.target || (t.target = r),
            n = null == n ? [t] : we.makeArray(n, [t]),
            f = we.event.special[h] || {},
            i || !f.trigger || !1 !== f.trigger.apply(r, n))) {
                if (!i && !f.noBubble && !xe(r)) {
                    for (u = f.delegateType || h,
                    St.test(u + h) || (a = a.parentNode); a; a = a.parentNode)
                        d.push(a),
                        s = a;
                    s === (r.ownerDocument || ae) && d.push(s.defaultView || s.parentWindow || e)
                }
                for (o = 0; (a = d[o++]) && !t.isPropagationStopped(); )
                    p = a,
                    t.type = o > 1 ? u : f.bindType || h,
                    (c = (We.get(a, "events") || {})[t.type] && We.get(a, "handle")) && c.apply(a, n),
                    (c = l && a[l]) && c.apply && Ie(a) && (t.result = c.apply(a, n),
                    !1 === t.result && t.preventDefault());
                return t.type = h,
                i || t.isDefaultPrevented() || f._default && !1 !== f._default.apply(d.pop(), n) || !Ie(r) || l && me(r[h]) && !xe(r) && ((s = r[l]) && (r[l] = null),
                we.event.triggered = h,
                t.isPropagationStopped() && p.addEventListener(h, Dt),
                r[h](),
                t.isPropagationStopped() && p.removeEventListener(h, Dt),
                we.event.triggered = void 0,
                s && (r[l] = s)),
                t.result
            }
        },
        simulate: function(e, t, n) {
            var r = we.extend(new we.Event, n, {
                type: e,
                isSimulated: !0
            });
            we.event.trigger(r, null, t)
        }
    }),
    we.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                we.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n)
                return we.event.trigger(e, t, n, !0)
        }
    }),
    ve.focusin || we.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            we.event.simulate(t, e.target, we.event.fix(e))
        };
        we.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this
                  , i = We.access(r, t);
                i || r.addEventListener(e, n, !0),
                We.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this
                  , i = We.access(r, t) - 1;
                i ? We.access(r, t, i) : (r.removeEventListener(e, n, !0),
                We.remove(r, t))
            }
        }
    });
    var Nt = e.location
      , At = Date.now()
      , jt = /\?/;
    we.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t)
            return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (e) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || we.error("Invalid XML: " + t),
        n
    }
    ;
    var qt = /\[\]$/
      , Lt = /\r?\n/g
      , Ht = /^(?:submit|button|image|reset|file)$/i
      , Ot = /^(?:input|select|textarea|keygen)/i;
    we.param = function(e, t) {
        var n, r = [], i = function(e, t) {
            var n = me(t) ? t() : t;
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
        };
        if (Array.isArray(e) || e.jquery && !we.isPlainObject(e))
            we.each(e, function() {
                i(this.name, this.value)
            });
        else
            for (n in e)
                Z(n, e[n], t, i);
        return r.join("&")
    }
    ,
    we.fn.extend({
        serialize: function() {
            return we.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = we.prop(this, "elements");
                return e ? we.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !we(this).is(":disabled") && Ot.test(this.nodeName) && !Ht.test(e) && (this.checked || !Ye.test(e))
            }).map(function(e, t) {
                var n = we(this).val();
                return null == n ? null : Array.isArray(n) ? we.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Lt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Lt, "\r\n")
                }
            }).get()
        }
    });
    var Pt = /%20/g
      , Mt = /#.*$/
      , Rt = /([?&])_=[^&]*/
      , It = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , Wt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
      , $t = /^(?:GET|HEAD)$/
      , Bt = /^\/\//
      , Ft = {}
      , _t = {}
      , zt = "*/".concat("*")
      , Xt = ae.createElement("a");
    Xt.href = Nt.href,
    we.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Nt.href,
            type: "GET",
            isLocal: Wt.test(Nt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": zt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": we.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? ne(ne(e, we.ajaxSettings), t) : ne(we.ajaxSettings, e)
        },
        ajaxPrefilter: ee(Ft),
        ajaxTransport: ee(_t),
        ajax: function(t, n) {
            function r(t, n, r, s) {
                var l, p, d, b, w, T = n;
                c || (c = !0,
                u && e.clearTimeout(u),
                i = void 0,
                a = s || "",
                C.readyState = t > 0 ? 4 : 0,
                l = t >= 200 && t < 300 || 304 === t,
                r && (b = re(h, C, r)),
                b = ie(h, b, C, l),
                l ? (h.ifModified && ((w = C.getResponseHeader("Last-Modified")) && (we.lastModified[o] = w),
                (w = C.getResponseHeader("etag")) && (we.etag[o] = w)),
                204 === t || "HEAD" === h.type ? T = "nocontent" : 304 === t ? T = "notmodified" : (T = b.state,
                p = b.data,
                l = !(d = b.error))) : (d = T,
                !t && T || (T = "error",
                t < 0 && (t = 0))),
                C.status = t,
                C.statusText = (n || T) + "",
                l ? v.resolveWith(g, [p, T, C]) : v.rejectWith(g, [C, T, d]),
                C.statusCode(x),
                x = void 0,
                f && y.trigger(l ? "ajaxSuccess" : "ajaxError", [C, h, l ? p : d]),
                m.fireWith(g, [C, T]),
                f && (y.trigger("ajaxComplete", [C, h]),
                --we.active || we.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t,
            t = void 0),
            n = n || {};
            var i, o, a, s, u, l, c, f, p, d, h = we.ajaxSetup({}, n), g = h.context || h, y = h.context && (g.nodeType || g.jquery) ? we(g) : we.event, v = we.Deferred(), m = we.Callbacks("once memory"), x = h.statusCode || {}, b = {}, w = {}, T = "canceled", C = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (c) {
                        if (!s)
                            for (s = {}; t = It.exec(a); )
                                s[t[1].toLowerCase()] = t[2];
                        t = s[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function() {
                    return c ? a : null
                },
                setRequestHeader: function(e, t) {
                    return null == c && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e,
                    b[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return null == c && (h.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (c)
                            C.always(e[C.status]);
                        else
                            for (t in e)
                                x[t] = [x[t], e[t]];
                    return this
                },
                abort: function(e) {
                    var t = e || T;
                    return i && i.abort(t),
                    r(0, t),
                    this
                }
            };
            if (v.promise(C),
            h.url = ((t || h.url || Nt.href) + "").replace(Bt, Nt.protocol + "//"),
            h.type = n.method || n.type || h.method || h.type,
            h.dataTypes = (h.dataType || "*").toLowerCase().match(Le) || [""],
            null == h.crossDomain) {
                l = ae.createElement("a");
                try {
                    l.href = h.url,
                    l.href = l.href,
                    h.crossDomain = Xt.protocol + "//" + Xt.host != l.protocol + "//" + l.host
                } catch (e) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = we.param(h.data, h.traditional)),
            te(Ft, h, n, C),
            c)
                return C;
            (f = we.event && h.global) && 0 == we.active++ && we.event.trigger("ajaxStart"),
            h.type = h.type.toUpperCase(),
            h.hasContent = !$t.test(h.type),
            o = h.url.replace(Mt, ""),
            h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(Pt, "+")) : (d = h.url.slice(o.length),
            h.data && (h.processData || "string" == typeof h.data) && (o += (jt.test(o) ? "&" : "?") + h.data,
            delete h.data),
            !1 === h.cache && (o = o.replace(Rt, "$1"),
            d = (jt.test(o) ? "&" : "?") + "_=" + At++ + d),
            h.url = o + d),
            h.ifModified && (we.lastModified[o] && C.setRequestHeader("If-Modified-Since", we.lastModified[o]),
            we.etag[o] && C.setRequestHeader("If-None-Match", we.etag[o])),
            (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && C.setRequestHeader("Content-Type", h.contentType),
            C.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : h.accepts["*"]);
            for (p in h.headers)
                C.setRequestHeader(p, h.headers[p]);
            if (h.beforeSend && (!1 === h.beforeSend.call(g, C, h) || c))
                return C.abort();
            if (T = "abort",
            m.add(h.complete),
            C.done(h.success),
            C.fail(h.error),
            i = te(_t, h, n, C)) {
                if (C.readyState = 1,
                f && y.trigger("ajaxSend", [C, h]),
                c)
                    return C;
                h.async && h.timeout > 0 && (u = e.setTimeout(function() {
                    C.abort("timeout")
                }, h.timeout));
                try {
                    c = !1,
                    i.send(b, r)
                } catch (e) {
                    if (c)
                        throw e;
                    r(-1, e)
                }
            } else
                r(-1, "No Transport");
            return C
        },
        getJSON: function(e, t, n) {
            return we.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return we.get(e, void 0, t, "script")
        }
    }),
    we.each(["get", "post"], function(e, t) {
        we[t] = function(e, n, r, i) {
            return me(n) && (i = i || r,
            r = n,
            n = void 0),
            we.ajax(we.extend({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            }, we.isPlainObject(e) && e))
        }
    }),
    we._evalUrl = function(e) {
        return we.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        })
    }
    ,
    we.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (me(e) && (e = e.call(this[0])),
            t = we(e, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && t.insertBefore(this[0]),
            t.map(function() {
                for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                return e
            }).append(this)),
            this
        },
        wrapInner: function(e) {
            return me(e) ? this.each(function(t) {
                we(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = we(this)
                  , n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = me(e);
            return this.each(function(n) {
                we(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                we(this).replaceWith(this.childNodes)
            }),
            this
        }
    }),
    we.expr.pseudos.hidden = function(e) {
        return !we.expr.pseudos.visible(e)
    }
    ,
    we.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }
    ,
    we.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    }
    ;
    var Ut = {
        0: 200,
        1223: 204
    }
      , Vt = we.ajaxSettings.xhr();
    ve.cors = !!Vt && "withCredentials"in Vt,
    ve.ajax = Vt = !!Vt,
    we.ajaxTransport(function(t) {
        var n, r;
        if (ve.cors || Vt && !t.crossDomain)
            return {
                send: function(i, o) {
                    var a, s = t.xhr();
                    if (s.open(t.type, t.url, t.async, t.username, t.password),
                    t.xhrFields)
                        for (a in t.xhrFields)
                            s[a] = t.xhrFields[a];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType),
                    t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (a in i)
                        s.setRequestHeader(a, i[a]);
                    n = function(e) {
                        return function() {
                            n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null,
                            "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Ut[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                binary: s.response
                            } : {
                                text: s.responseText
                            }, s.getAllResponseHeaders()))
                        }
                    }
                    ,
                    s.onload = n(),
                    r = s.onerror = s.ontimeout = n("error"),
                    void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                        4 === s.readyState && e.setTimeout(function() {
                            n && r()
                        })
                    }
                    ,
                    n = n("abort");
                    try {
                        s.send(t.hasContent && t.data || null)
                    } catch (e) {
                        if (n)
                            throw e
                    }
                },
                abort: function() {
                    n && n()
                }
            }
    }),
    we.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }),
    we.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return we.globalEval(e),
                e
            }
        }
    }),
    we.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET")
    }),
    we.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = we("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(),
                        n = null,
                        e && i("error" === e.type ? 404 : 200, e.type)
                    }
                    ),
                    ae.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Gt = []
      , Yt = /(=)\?(?=&|$)|\?\?/;
    we.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Gt.pop() || we.expando + "_" + At++;
            return this[e] = !0,
            e
        }
    }),
    we.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, a, s = !1 !== t.jsonp && (Yt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Yt.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0])
            return i = t.jsonpCallback = me(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
            s ? t[s] = t[s].replace(Yt, "$1" + i) : !1 !== t.jsonp && (t.url += (jt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
            t.converters["script json"] = function() {
                return a || we.error(i + " was not called"),
                a[0]
            }
            ,
            t.dataTypes[0] = "json",
            o = e[i],
            e[i] = function() {
                a = arguments
            }
            ,
            r.always(function() {
                void 0 === o ? we(e).removeProp(i) : e[i] = o,
                t[i] && (t.jsonpCallback = n.jsonpCallback,
                Gt.push(i)),
                a && me(o) && o(a[0]),
                a = o = void 0
            }),
            "script"
    }),
    ve.createHTMLDocument = function() {
        var e = ae.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>",
        2 === e.childNodes.length
    }(),
    we.parseHTML = function(e, t, n) {
        if ("string" != typeof e)
            return [];
        "boolean" == typeof t && (n = t,
        t = !1);
        var r, i, o;
        return t || (ve.createHTMLDocument ? ((r = (t = ae.implementation.createHTMLDocument("")).createElement("base")).href = ae.location.href,
        t.head.appendChild(r)) : t = ae),
        i = De.exec(e),
        o = !n && [],
        i ? [t.createElement(i[1])] : (i = C([e], t, o),
        o && o.length && we(o).remove(),
        we.merge([], i.childNodes))
    }
    ,
    we.fn.load = function(e, t, n) {
        var r, i, o, a = this, s = e.indexOf(" ");
        return s > -1 && (r = Q(e.slice(s)),
        e = e.slice(0, s)),
        me(t) ? (n = t,
        t = void 0) : t && "object" == typeof t && (i = "POST"),
        a.length > 0 && we.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments,
            a.html(r ? we("<div>").append(we.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }
        ),
        this
    }
    ,
    we.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        we.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    we.expr.pseudos.animated = function(e) {
        return we.grep(we.timers, function(t) {
            return e === t.elem
        }).length
    }
    ,
    we.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l, c = we.css(e, "position"), f = we(e), p = {};
            "static" === c && (e.style.position = "relative"),
            s = f.offset(),
            o = we.css(e, "top"),
            u = we.css(e, "left"),
            (l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1) ? (a = (r = f.position()).top,
            i = r.left) : (a = parseFloat(o) || 0,
            i = parseFloat(u) || 0),
            me(t) && (t = t.call(e, n, we.extend({}, s))),
            null != t.top && (p.top = t.top - s.top + a),
            null != t.left && (p.left = t.left - s.left + i),
            "using"in t ? t.using.call(e, p) : f.css(p)
        }
    },
    we.fn.extend({
        offset: function(e) {
            if (arguments.length)
                return void 0 === e ? this : this.each(function(t) {
                    we.offset.setOffset(this, e, t)
                });
            var t, n, r = this[0];
            return r ? r.getClientRects().length ? (t = r.getBoundingClientRect(),
            n = r.ownerDocument.defaultView,
            {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0], i = {
                    top: 0,
                    left: 0
                };
                if ("fixed" === we.css(r, "position"))
                    t = r.getBoundingClientRect();
                else {
                    for (t = this.offset(),
                    n = r.ownerDocument,
                    e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === we.css(e, "position"); )
                        e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((i = we(e).offset()).top += we.css(e, "borderTopWidth", !0),
                    i.left += we.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - i.top - we.css(r, "marginTop", !0),
                    left: t.left - i.left - we.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === we.css(e, "position"); )
                    e = e.offsetParent;
                return e || et
            })
        }
    }),
    we.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        we.fn[e] = function(r) {
            return Pe(this, function(e, r, i) {
                var o;
                return xe(e) ? o = e : 9 === e.nodeType && (o = e.defaultView),
                void 0 === i ? o ? o[t] : e[r] : void (o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i)
            }, e, r, arguments.length)
        }
    }),
    we.each(["top", "left"], function(e, t) {
        we.cssHooks[t] = M(ve.pixelPosition, function(e, n) {
            if (n)
                return n = P(e, t),
                ut.test(n) ? we(e).position()[t] + "px" : n
        })
    }),
    we.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        we.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            we.fn[r] = function(i, o) {
                var a = arguments.length && (n || "boolean" != typeof i)
                  , s = n || (!0 === i || !0 === o ? "margin" : "border");
                return Pe(this, function(t, n, i) {
                    var o;
                    return xe(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement,
                    Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? we.css(t, n, s) : we.style(t, n, i, s)
                }, t, a ? i : void 0, a)
            }
        })
    }),
    we.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        we.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }),
    we.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    we.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }),
    we.proxy = function(e, t) {
        var n, r, i;
        if ("string" == typeof t && (n = e[t],
        t = e,
        e = n),
        me(e))
            return r = ue.call(arguments, 2),
            i = function() {
                return e.apply(t || this, r.concat(ue.call(arguments)))
            }
            ,
            i.guid = e.guid = e.guid || we.guid++,
            i
    }
    ,
    we.holdReady = function(e) {
        e ? we.readyWait++ : we.ready(!0)
    }
    ,
    we.isArray = Array.isArray,
    we.parseJSON = JSON.parse,
    we.nodeName = o,
    we.isFunction = me,
    we.isWindow = xe,
    we.camelCase = h,
    we.type = r,
    we.now = Date.now,
    we.isNumeric = function(e) {
        var t = we.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }
    ,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return we
    });
    var Qt = e.jQuery
      , Jt = e.$;
    return we.noConflict = function(t) {
        return e.$ === we && (e.$ = Jt),
        t && e.jQuery === we && (e.jQuery = Qt),
        we
    }
    ,
    t || (e.jQuery = e.$ = we),
    we
});
(function() {
    function n(n, t, r) {
        switch (r.length) {
        case 0:
            return n.call(t);
        case 1:
            return n.call(t, r[0]);
        case 2:
            return n.call(t, r[0], r[1]);
        case 3:
            return n.call(t, r[0], r[1], r[2])
        }
        return n.apply(t, r)
    }
    function t(n, t, r, e) {
        for (var u = -1, i = null == n ? 0 : n.length; ++u < i; ) {
            var o = n[u];
            t(e, o, r(o), n)
        }
        return e
    }
    function r(n, t) {
        for (var r = -1, e = null == n ? 0 : n.length; ++r < e && t(n[r], r, n) !== !1; )
            ;
        return n
    }
    function e(n, t) {
        for (var r = null == n ? 0 : n.length; r-- && t(n[r], r, n) !== !1; )
            ;
        return n
    }
    function u(n, t) {
        for (var r = -1, e = null == n ? 0 : n.length; ++r < e; )
            if (!t(n[r], r, n))
                return !1;
        return !0
    }
    function i(n, t) {
        for (var r = -1, e = null == n ? 0 : n.length, u = 0, i = []; ++r < e; ) {
            var o = n[r];
            t(o, r, n) && (i[u++] = o)
        }
        return i
    }
    function o(n, t) {
        return !!(null == n ? 0 : n.length) && y(n, t, 0) > -1
    }
    function f(n, t, r) {
        for (var e = -1, u = null == n ? 0 : n.length; ++e < u; )
            if (r(t, n[e]))
                return !0;
        return !1
    }
    function c(n, t) {
        for (var r = -1, e = null == n ? 0 : n.length, u = Array(e); ++r < e; )
            u[r] = t(n[r], r, n);
        return u
    }
    function a(n, t) {
        for (var r = -1, e = t.length, u = n.length; ++r < e; )
            n[u + r] = t[r];
        return n
    }
    function l(n, t, r, e) {
        var u = -1
          , i = null == n ? 0 : n.length;
        for (e && i && (r = n[++u]); ++u < i; )
            r = t(r, n[u], u, n);
        return r
    }
    function s(n, t, r, e) {
        var u = null == n ? 0 : n.length;
        for (e && u && (r = n[--u]); u--; )
            r = t(r, n[u], u, n);
        return r
    }
    function h(n, t) {
        for (var r = -1, e = null == n ? 0 : n.length; ++r < e; )
            if (t(n[r], r, n))
                return !0;
        return !1
    }
    function p(n) {
        return n.split("")
    }
    function _(n) {
        return n.match($t) || []
    }
    function v(n, t, r) {
        var e;
        return r(n, function(n, r, u) {
            if (t(n, r, u))
                return e = r,
                !1
        }),
        e
    }
    function g(n, t, r, e) {
        for (var u = n.length, i = r + (e ? 1 : -1); e ? i-- : ++i < u; )
            if (t(n[i], i, n))
                return i;
        return -1
    }
    function y(n, t, r) {
        return t === t ? Z(n, t, r) : g(n, b, r)
    }
    function d(n, t, r, e) {
        for (var u = r - 1, i = n.length; ++u < i; )
            if (e(n[u], t))
                return u;
        return -1
    }
    function b(n) {
        return n !== n
    }
    function w(n, t) {
        var r = null == n ? 0 : n.length;
        return r ? k(n, t) / r : Cn
    }
    function m(n) {
        return function(t) {
            return null == t ? X : t[n]
        }
    }
    function x(n) {
        return function(t) {
            return null == n ? X : n[t]
        }
    }
    function j(n, t, r, e, u) {
        return u(n, function(n, u, i) {
            r = e ? (e = !1,
            n) : t(r, n, u, i)
        }),
        r
    }
    function A(n, t) {
        var r = n.length;
        for (n.sort(t); r--; )
            n[r] = n[r].value;
        return n
    }
    function k(n, t) {
        for (var r, e = -1, u = n.length; ++e < u; ) {
            var i = t(n[e]);
            i !== X && (r = r === X ? i : r + i)
        }
        return r
    }
    function O(n, t) {
        for (var r = -1, e = Array(n); ++r < n; )
            e[r] = t(r);
        return e
    }
    function I(n, t) {
        return c(t, function(t) {
            return [t, n[t]]
        })
    }
    function R(n) {
        return n ? n.slice(0, H(n) + 1).replace(Lt, "") : n
    }
    function z(n) {
        return function(t) {
            return n(t)
        }
    }
    function E(n, t) {
        return c(t, function(t) {
            return n[t]
        })
    }
    function S(n, t) {
        return n.has(t)
    }
    function W(n, t) {
        for (var r = -1, e = n.length; ++r < e && y(t, n[r], 0) > -1; )
            ;
        return r
    }
    function L(n, t) {
        for (var r = n.length; r-- && y(t, n[r], 0) > -1; )
            ;
        return r
    }
    function C(n, t) {
        for (var r = n.length, e = 0; r--; )
            n[r] === t && ++e;
        return e
    }
    function U(n) {
        return "\\" + Yr[n]
    }
    function B(n, t) {
        return null == n ? X : n[t]
    }
    function T(n) {
        return Nr.test(n)
    }
    function $(n) {
        return Pr.test(n)
    }
    function D(n) {
        for (var t, r = []; !(t = n.next()).done; )
            r.push(t.value);
        return r
    }
    function M(n) {
        var t = -1
          , r = Array(n.size);
        return n.forEach(function(n, e) {
            r[++t] = [e, n]
        }),
        r
    }
    function F(n, t) {
        return function(r) {
            return n(t(r))
        }
    }
    function N(n, t) {
        for (var r = -1, e = n.length, u = 0, i = []; ++r < e; ) {
            var o = n[r];
            o !== t && o !== cn || (n[r] = cn,
            i[u++] = r)
        }
        return i
    }
    function P(n) {
        var t = -1
          , r = Array(n.size);
        return n.forEach(function(n) {
            r[++t] = n
        }),
        r
    }
    function q(n) {
        var t = -1
          , r = Array(n.size);
        return n.forEach(function(n) {
            r[++t] = [n, n]
        }),
        r
    }
    function Z(n, t, r) {
        for (var e = r - 1, u = n.length; ++e < u; )
            if (n[e] === t)
                return e;
        return -1
    }
    function K(n, t, r) {
        for (var e = r + 1; e--; )
            if (n[e] === t)
                return e;
        return e
    }
    function V(n) {
        return T(n) ? J(n) : _e(n)
    }
    function G(n) {
        return T(n) ? Y(n) : p(n)
    }
    function H(n) {
        for (var t = n.length; t-- && Ct.test(n.charAt(t)); )
            ;
        return t
    }
    function J(n) {
        for (var t = Mr.lastIndex = 0; Mr.test(n); )
            ++t;
        return t
    }
    function Y(n) {
        return n.match(Mr) || []
    }
    function Q(n) {
        return n.match(Fr) || []
    }
    var X, nn = "4.17.21", tn = 200, rn = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", en = "Expected a function", un = "Invalid `variable` option passed into `_.template`", on = "__lodash_hash_undefined__", fn = 500, cn = "__lodash_placeholder__", an = 1, ln = 2, sn = 4, hn = 1, pn = 2, _n = 1, vn = 2, gn = 4, yn = 8, dn = 16, bn = 32, wn = 64, mn = 128, xn = 256, jn = 512, An = 30, kn = "...", On = 800, In = 16, Rn = 1, zn = 2, En = 3, Sn = 1 / 0, Wn = 9007199254740991, Ln = 1.7976931348623157e308, Cn = NaN, Un = 4294967295, Bn = Un - 1, Tn = Un >>> 1, $n = [["ary", mn], ["bind", _n], ["bindKey", vn], ["curry", yn], ["curryRight", dn], ["flip", jn], ["partial", bn], ["partialRight", wn], ["rearg", xn]], Dn = "[object Arguments]", Mn = "[object Array]", Fn = "[object AsyncFunction]", Nn = "[object Boolean]", Pn = "[object Date]", qn = "[object DOMException]", Zn = "[object Error]", Kn = "[object Function]", Vn = "[object GeneratorFunction]", Gn = "[object Map]", Hn = "[object Number]", Jn = "[object Null]", Yn = "[object Object]", Qn = "[object Promise]", Xn = "[object Proxy]", nt = "[object RegExp]", tt = "[object Set]", rt = "[object String]", et = "[object Symbol]", ut = "[object Undefined]", it = "[object WeakMap]", ot = "[object WeakSet]", ft = "[object ArrayBuffer]", ct = "[object DataView]", at = "[object Float32Array]", lt = "[object Float64Array]", st = "[object Int8Array]", ht = "[object Int16Array]", pt = "[object Int32Array]", _t = "[object Uint8Array]", vt = "[object Uint8ClampedArray]", gt = "[object Uint16Array]", yt = "[object Uint32Array]", dt = /\b__p \+= '';/g, bt = /\b(__p \+=) '' \+/g, wt = /(__e\(.*?\)|\b__t\)) \+\n'';/g, mt = /&(?:amp|lt|gt|quot|#39);/g, xt = /[&<>"']/g, jt = RegExp(mt.source), At = RegExp(xt.source), kt = /<%-([\s\S]+?)%>/g, Ot = /<%([\s\S]+?)%>/g, It = /<%=([\s\S]+?)%>/g, Rt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, zt = /^\w*$/, Et = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, St = /[\\^$.*+?()[\]{}|]/g, Wt = RegExp(St.source), Lt = /^\s+/, Ct = /\s/, Ut = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Bt = /\{\n\/\* \[wrapped with (.+)\] \*/, Tt = /,? & /, $t = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Dt = /[()=,{}\[\]\/\s]/, Mt = /\\(\\)?/g, Ft = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Nt = /\w*$/, Pt = /^[-+]0x[0-9a-f]+$/i, qt = /^0b[01]+$/i, Zt = /^\[object .+?Constructor\]$/, Kt = /^0o[0-7]+$/i, Vt = /^(?:0|[1-9]\d*)$/, Gt = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Ht = /($^)/, Jt = /['\n\r\u2028\u2029\\]/g, Yt = "\\ud800-\\udfff", Qt = "\\u0300-\\u036f", Xt = "\\ufe20-\\ufe2f", nr = "\\u20d0-\\u20ff", tr = Qt + Xt + nr, rr = "\\u2700-\\u27bf", er = "a-z\\xdf-\\xf6\\xf8-\\xff", ur = "\\xac\\xb1\\xd7\\xf7", ir = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", or = "\\u2000-\\u206f", fr = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", cr = "A-Z\\xc0-\\xd6\\xd8-\\xde", ar = "\\ufe0e\\ufe0f", lr = ur + ir + or + fr, sr = "['’]", hr = "[" + Yt + "]", pr = "[" + lr + "]", _r = "[" + tr + "]", vr = "\\d+", gr = "[" + rr + "]", yr = "[" + er + "]", dr = "[^" + Yt + lr + vr + rr + er + cr + "]", br = "\\ud83c[\\udffb-\\udfff]", wr = "(?:" + _r + "|" + br + ")", mr = "[^" + Yt + "]", xr = "(?:\\ud83c[\\udde6-\\uddff]){2}", jr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Ar = "[" + cr + "]", kr = "\\u200d", Or = "(?:" + yr + "|" + dr + ")", Ir = "(?:" + Ar + "|" + dr + ")", Rr = "(?:" + sr + "(?:d|ll|m|re|s|t|ve))?", zr = "(?:" + sr + "(?:D|LL|M|RE|S|T|VE))?", Er = wr + "?", Sr = "[" + ar + "]?", Wr = "(?:" + kr + "(?:" + [mr, xr, jr].join("|") + ")" + Sr + Er + ")*", Lr = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Cr = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Ur = Sr + Er + Wr, Br = "(?:" + [gr, xr, jr].join("|") + ")" + Ur, Tr = "(?:" + [mr + _r + "?", _r, xr, jr, hr].join("|") + ")", $r = RegExp(sr, "g"), Dr = RegExp(_r, "g"), Mr = RegExp(br + "(?=" + br + ")|" + Tr + Ur, "g"), Fr = RegExp([Ar + "?" + yr + "+" + Rr + "(?=" + [pr, Ar, "$"].join("|") + ")", Ir + "+" + zr + "(?=" + [pr, Ar + Or, "$"].join("|") + ")", Ar + "?" + Or + "+" + Rr, Ar + "+" + zr, Cr, Lr, vr, Br].join("|"), "g"), Nr = RegExp("[" + kr + Yt + tr + ar + "]"), Pr = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, qr = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], Zr = -1, Kr = {};
    Kr[at] = Kr[lt] = Kr[st] = Kr[ht] = Kr[pt] = Kr[_t] = Kr[vt] = Kr[gt] = Kr[yt] = !0,
    Kr[Dn] = Kr[Mn] = Kr[ft] = Kr[Nn] = Kr[ct] = Kr[Pn] = Kr[Zn] = Kr[Kn] = Kr[Gn] = Kr[Hn] = Kr[Yn] = Kr[nt] = Kr[tt] = Kr[rt] = Kr[it] = !1;
    var Vr = {};
    Vr[Dn] = Vr[Mn] = Vr[ft] = Vr[ct] = Vr[Nn] = Vr[Pn] = Vr[at] = Vr[lt] = Vr[st] = Vr[ht] = Vr[pt] = Vr[Gn] = Vr[Hn] = Vr[Yn] = Vr[nt] = Vr[tt] = Vr[rt] = Vr[et] = Vr[_t] = Vr[vt] = Vr[gt] = Vr[yt] = !0,
    Vr[Zn] = Vr[Kn] = Vr[it] = !1;
    var Gr = {
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ã": "A",
        "Ä": "A",
        "Å": "A",
        "à": "a",
        "á": "a",
        "â": "a",
        "ã": "a",
        "ä": "a",
        "å": "a",
        "Ç": "C",
        "ç": "c",
        "Ð": "D",
        "ð": "d",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ë": "E",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        "Ñ": "N",
        "ñ": "n",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "O",
        "Ø": "O",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ö": "o",
        "ø": "o",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ü": "U",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ü": "u",
        "Ý": "Y",
        "ý": "y",
        "ÿ": "y",
        "Æ": "Ae",
        "æ": "ae",
        "Þ": "Th",
        "þ": "th",
        "ß": "ss",
        "Ā": "A",
        "Ă": "A",
        "Ą": "A",
        "ā": "a",
        "ă": "a",
        "ą": "a",
        "Ć": "C",
        "Ĉ": "C",
        "Ċ": "C",
        "Č": "C",
        "ć": "c",
        "ĉ": "c",
        "ċ": "c",
        "č": "c",
        "Ď": "D",
        "Đ": "D",
        "ď": "d",
        "đ": "d",
        "Ē": "E",
        "Ĕ": "E",
        "Ė": "E",
        "Ę": "E",
        "Ě": "E",
        "ē": "e",
        "ĕ": "e",
        "ė": "e",
        "ę": "e",
        "ě": "e",
        "Ĝ": "G",
        "Ğ": "G",
        "Ġ": "G",
        "Ģ": "G",
        "ĝ": "g",
        "ğ": "g",
        "ġ": "g",
        "ģ": "g",
        "Ĥ": "H",
        "Ħ": "H",
        "ĥ": "h",
        "ħ": "h",
        "Ĩ": "I",
        "Ī": "I",
        "Ĭ": "I",
        "Į": "I",
        "İ": "I",
        "ĩ": "i",
        "ī": "i",
        "ĭ": "i",
        "į": "i",
        "ı": "i",
        "Ĵ": "J",
        "ĵ": "j",
        "Ķ": "K",
        "ķ": "k",
        "ĸ": "k",
        "Ĺ": "L",
        "Ļ": "L",
        "Ľ": "L",
        "Ŀ": "L",
        "Ł": "L",
        "ĺ": "l",
        "ļ": "l",
        "ľ": "l",
        "ŀ": "l",
        "ł": "l",
        "Ń": "N",
        "Ņ": "N",
        "Ň": "N",
        "Ŋ": "N",
        "ń": "n",
        "ņ": "n",
        "ň": "n",
        "ŋ": "n",
        "Ō": "O",
        "Ŏ": "O",
        "Ő": "O",
        "ō": "o",
        "ŏ": "o",
        "ő": "o",
        "Ŕ": "R",
        "Ŗ": "R",
        "Ř": "R",
        "ŕ": "r",
        "ŗ": "r",
        "ř": "r",
        "Ś": "S",
        "Ŝ": "S",
        "Ş": "S",
        "Š": "S",
        "ś": "s",
        "ŝ": "s",
        "ş": "s",
        "š": "s",
        "Ţ": "T",
        "Ť": "T",
        "Ŧ": "T",
        "ţ": "t",
        "ť": "t",
        "ŧ": "t",
        "Ũ": "U",
        "Ū": "U",
        "Ŭ": "U",
        "Ů": "U",
        "Ű": "U",
        "Ų": "U",
        "ũ": "u",
        "ū": "u",
        "ŭ": "u",
        "ů": "u",
        "ű": "u",
        "ų": "u",
        "Ŵ": "W",
        "ŵ": "w",
        "Ŷ": "Y",
        "ŷ": "y",
        "Ÿ": "Y",
        "Ź": "Z",
        "Ż": "Z",
        "Ž": "Z",
        "ź": "z",
        "ż": "z",
        "ž": "z",
        "Ĳ": "IJ",
        "ĳ": "ij",
        "Œ": "Oe",
        "œ": "oe",
        "ŉ": "'n",
        "ſ": "s"
    }
      , Hr = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }
      , Jr = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
    }
      , Yr = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }
      , Qr = parseFloat
      , Xr = parseInt
      , ne = "object" == typeof global && global && global.Object === Object && global
      , te = "object" == typeof self && self && self.Object === Object && self
      , re = ne || te || Function("return this")()
      , ee = "object" == typeof exports && exports && !exports.nodeType && exports
      , ue = ee && "object" == typeof module && module && !module.nodeType && module
      , ie = ue && ue.exports === ee
      , oe = ie && ne.process
      , fe = function() {
        try {
            var n = ue && ue.require && ue.require("util").types;
            return n ? n : oe && oe.binding && oe.binding("util")
        } catch (n) {}
    }()
      , ce = fe && fe.isArrayBuffer
      , ae = fe && fe.isDate
      , le = fe && fe.isMap
      , se = fe && fe.isRegExp
      , he = fe && fe.isSet
      , pe = fe && fe.isTypedArray
      , _e = m("length")
      , ve = x(Gr)
      , ge = x(Hr)
      , ye = x(Jr)
      , de = function p(x) {
        function Z(n) {
            if (cc(n) && !bh(n) && !(n instanceof Ct)) {
                if (n instanceof Y)
                    return n;
                if (bl.call(n, "__wrapped__"))
                    return eo(n)
            }
            return new Y(n)
        }
        function J() {}
        function Y(n, t) {
            this.__wrapped__ = n,
            this.__actions__ = [],
            this.__chain__ = !!t,
            this.__index__ = 0,
            this.__values__ = X
        }
        function Ct(n) {
            this.__wrapped__ = n,
            this.__actions__ = [],
            this.__dir__ = 1,
            this.__filtered__ = !1,
            this.__iteratees__ = [],
            this.__takeCount__ = Un,
            this.__views__ = []
        }
        function $t() {
            var n = new Ct(this.__wrapped__);
            return n.__actions__ = Tu(this.__actions__),
            n.__dir__ = this.__dir__,
            n.__filtered__ = this.__filtered__,
            n.__iteratees__ = Tu(this.__iteratees__),
            n.__takeCount__ = this.__takeCount__,
            n.__views__ = Tu(this.__views__),
            n
        }
        function Yt() {
            if (this.__filtered__) {
                var n = new Ct(this);
                n.__dir__ = -1,
                n.__filtered__ = !0
            } else
                n = this.clone(),
                n.__dir__ *= -1;
            return n
        }
        function Qt() {
            var n = this.__wrapped__.value()
              , t = this.__dir__
              , r = bh(n)
              , e = t < 0
              , u = r ? n.length : 0
              , i = Oi(0, u, this.__views__)
              , o = i.start
              , f = i.end
              , c = f - o
              , a = e ? f : o - 1
              , l = this.__iteratees__
              , s = l.length
              , h = 0
              , p = Hl(c, this.__takeCount__);
            if (!r || !e && u == c && p == c)
                return wu(n, this.__actions__);
            var _ = [];
            n: for (; c-- && h < p; ) {
                a += t;
                for (var v = -1, g = n[a]; ++v < s; ) {
                    var y = l[v]
                      , d = y.iteratee
                      , b = y.type
                      , w = d(g);
                    if (b == zn)
                        g = w;
                    else if (!w) {
                        if (b == Rn)
                            continue n;
                        break n
                    }
                }
                _[h++] = g
            }
            return _
        }
        function Xt(n) {
            var t = -1
              , r = null == n ? 0 : n.length;
            for (this.clear(); ++t < r; ) {
                var e = n[t];
                this.set(e[0], e[1])
            }
        }
        function nr() {
            this.__data__ = is ? is(null) : {},
            this.size = 0
        }
        function tr(n) {
            var t = this.has(n) && delete this.__data__[n];
            return this.size -= t ? 1 : 0,
            t
        }
        function rr(n) {
            var t = this.__data__;
            if (is) {
                var r = t[n];
                return r === on ? X : r
            }
            return bl.call(t, n) ? t[n] : X
        }
        function er(n) {
            var t = this.__data__;
            return is ? t[n] !== X : bl.call(t, n)
        }
        function ur(n, t) {
            var r = this.__data__;
            return this.size += this.has(n) ? 0 : 1,
            r[n] = is && t === X ? on : t,
            this
        }
        function ir(n) {
            var t = -1
              , r = null == n ? 0 : n.length;
            for (this.clear(); ++t < r; ) {
                var e = n[t];
                this.set(e[0], e[1])
            }
        }
        function or() {
            this.__data__ = [],
            this.size = 0
        }
        function fr(n) {
            var t = this.__data__
              , r = Wr(t, n);
            return !(r < 0 || (r == t.length - 1 ? t.pop() : Ll.call(t, r, 1),
            --this.size,
            0))
        }
        function cr(n) {
            var t = this.__data__
              , r = Wr(t, n);
            return r < 0 ? X : t[r][1]
        }
        function ar(n) {
            return Wr(this.__data__, n) > -1
        }
        function lr(n, t) {
            var r = this.__data__
              , e = Wr(r, n);
            return e < 0 ? (++this.size,
            r.push([n, t])) : r[e][1] = t,
            this
        }
        function sr(n) {
            var t = -1
              , r = null == n ? 0 : n.length;
            for (this.clear(); ++t < r; ) {
                var e = n[t];
                this.set(e[0], e[1])
            }
        }
        function hr() {
            this.size = 0,
            this.__data__ = {
                hash: new Xt,
                map: new (ts || ir),
                string: new Xt
            }
        }
        function pr(n) {
            var t = xi(this, n).delete(n);
            return this.size -= t ? 1 : 0,
            t
        }
        function _r(n) {
            return xi(this, n).get(n)
        }
        function vr(n) {
            return xi(this, n).has(n)
        }
        function gr(n, t) {
            var r = xi(this, n)
              , e = r.size;
            return r.set(n, t),
            this.size += r.size == e ? 0 : 1,
            this
        }
        function yr(n) {
            var t = -1
              , r = null == n ? 0 : n.length;
            for (this.__data__ = new sr; ++t < r; )
                this.add(n[t])
        }
        function dr(n) {
            return this.__data__.set(n, on),
            this
        }
        function br(n) {
            return this.__data__.has(n)
        }
        function wr(n) {
            this.size = (this.__data__ = new ir(n)).size
        }
        function mr() {
            this.__data__ = new ir,
            this.size = 0
        }
        function xr(n) {
            var t = this.__data__
              , r = t.delete(n);
            return this.size = t.size,
            r
        }
        function jr(n) {
            return this.__data__.get(n)
        }
        function Ar(n) {
            return this.__data__.has(n)
        }
        function kr(n, t) {
            var r = this.__data__;
            if (r instanceof ir) {
                var e = r.__data__;
                if (!ts || e.length < tn - 1)
                    return e.push([n, t]),
                    this.size = ++r.size,
                    this;
                r = this.__data__ = new sr(e)
            }
            return r.set(n, t),
            this.size = r.size,
            this
        }
        function Or(n, t) {
            var r = bh(n)
              , e = !r && dh(n)
              , u = !r && !e && mh(n)
              , i = !r && !e && !u && Oh(n)
              , o = r || e || u || i
              , f = o ? O(n.length, hl) : []
              , c = f.length;
            for (var a in n)
                !t && !bl.call(n, a) || o && ("length" == a || u && ("offset" == a || "parent" == a) || i && ("buffer" == a || "byteLength" == a || "byteOffset" == a) || Ci(a, c)) || f.push(a);
            return f
        }
        function Ir(n) {
            var t = n.length;
            return t ? n[tu(0, t - 1)] : X
        }
        function Rr(n, t) {
            return Xi(Tu(n), Mr(t, 0, n.length))
        }
        function zr(n) {
            return Xi(Tu(n))
        }
        function Er(n, t, r) {
            (r === X || Gf(n[t], r)) && (r !== X || t in n) || Br(n, t, r)
        }
        function Sr(n, t, r) {
            var e = n[t];
            bl.call(n, t) && Gf(e, r) && (r !== X || t in n) || Br(n, t, r)
        }
        function Wr(n, t) {
            for (var r = n.length; r--; )
                if (Gf(n[r][0], t))
                    return r;
            return -1
        }
        function Lr(n, t, r, e) {
            return ys(n, function(n, u, i) {
                t(e, n, r(n), i)
            }),
            e
        }
        function Cr(n, t) {
            return n && $u(t, Pc(t), n)
        }
        function Ur(n, t) {
            return n && $u(t, qc(t), n)
        }
        function Br(n, t, r) {
            "__proto__" == t && Tl ? Tl(n, t, {
                configurable: !0,
                enumerable: !0,
                value: r,
                writable: !0
            }) : n[t] = r
        }
        function Tr(n, t) {
            for (var r = -1, e = t.length, u = il(e), i = null == n; ++r < e; )
                u[r] = i ? X : Mc(n, t[r]);
            return u
        }
        function Mr(n, t, r) {
            return n === n && (r !== X && (n = n <= r ? n : r),
            t !== X && (n = n >= t ? n : t)),
            n
        }
        function Fr(n, t, e, u, i, o) {
            var f, c = t & an, a = t & ln, l = t & sn;
            if (e && (f = i ? e(n, u, i, o) : e(n)),
            f !== X)
                return f;
            if (!fc(n))
                return n;
            var s = bh(n);
            if (s) {
                if (f = zi(n),
                !c)
                    return Tu(n, f)
            } else {
                var h = zs(n)
                  , p = h == Kn || h == Vn;
                if (mh(n))
                    return Iu(n, c);
                if (h == Yn || h == Dn || p && !i) {
                    if (f = a || p ? {} : Ei(n),
                    !c)
                        return a ? Mu(n, Ur(f, n)) : Du(n, Cr(f, n))
                } else {
                    if (!Vr[h])
                        return i ? n : {};
                    f = Si(n, h, c)
                }
            }
            o || (o = new wr);
            var _ = o.get(n);
            if (_)
                return _;
            o.set(n, f),
            kh(n) ? n.forEach(function(r) {
                f.add(Fr(r, t, e, r, n, o))
            }) : jh(n) && n.forEach(function(r, u) {
                f.set(u, Fr(r, t, e, u, n, o))
            });
            var v = l ? a ? di : yi : a ? qc : Pc
              , g = s ? X : v(n);
            return r(g || n, function(r, u) {
                g && (u = r,
                r = n[u]),
                Sr(f, u, Fr(r, t, e, u, n, o))
            }),
            f
        }
        function Nr(n) {
            var t = Pc(n);
            return function(r) {
                return Pr(r, n, t)
            }
        }
        function Pr(n, t, r) {
            var e = r.length;
            if (null == n)
                return !e;
            for (n = ll(n); e--; ) {
                var u = r[e]
                  , i = t[u]
                  , o = n[u];
                if (o === X && !(u in n) || !i(o))
                    return !1
            }
            return !0
        }
        function Gr(n, t, r) {
            if ("function" != typeof n)
                throw new pl(en);
            return Ws(function() {
                n.apply(X, r)
            }, t)
        }
        function Hr(n, t, r, e) {
            var u = -1
              , i = o
              , a = !0
              , l = n.length
              , s = []
              , h = t.length;
            if (!l)
                return s;
            r && (t = c(t, z(r))),
            e ? (i = f,
            a = !1) : t.length >= tn && (i = S,
            a = !1,
            t = new yr(t));
            n: for (; ++u < l; ) {
                var p = n[u]
                  , _ = null == r ? p : r(p);
                if (p = e || 0 !== p ? p : 0,
                a && _ === _) {
                    for (var v = h; v--; )
                        if (t[v] === _)
                            continue n;
                    s.push(p)
                } else
                    i(t, _, e) || s.push(p)
            }
            return s
        }
        function Jr(n, t) {
            var r = !0;
            return ys(n, function(n, e, u) {
                return r = !!t(n, e, u)
            }),
            r
        }
        function Yr(n, t, r) {
            for (var e = -1, u = n.length; ++e < u; ) {
                var i = n[e]
                  , o = t(i);
                if (null != o && (f === X ? o === o && !bc(o) : r(o, f)))
                    var f = o
                      , c = i
            }
            return c
        }
        function ne(n, t, r, e) {
            var u = n.length;
            for (r = kc(r),
            r < 0 && (r = -r > u ? 0 : u + r),
            e = e === X || e > u ? u : kc(e),
            e < 0 && (e += u),
            e = r > e ? 0 : Oc(e); r < e; )
                n[r++] = t;
            return n
        }
        function te(n, t) {
            var r = [];
            return ys(n, function(n, e, u) {
                t(n, e, u) && r.push(n)
            }),
            r
        }
        function ee(n, t, r, e, u) {
            var i = -1
              , o = n.length;
            for (r || (r = Li),
            u || (u = []); ++i < o; ) {
                var f = n[i];
                t > 0 && r(f) ? t > 1 ? ee(f, t - 1, r, e, u) : a(u, f) : e || (u[u.length] = f)
            }
            return u
        }
        function ue(n, t) {
            return n && bs(n, t, Pc)
        }
        function oe(n, t) {
            return n && ws(n, t, Pc)
        }
        function fe(n, t) {
            return i(t, function(t) {
                return uc(n[t])
            })
        }
        function _e(n, t) {
            t = ku(t, n);
            for (var r = 0, e = t.length; null != n && r < e; )
                n = n[no(t[r++])];
            return r && r == e ? n : X
        }
        function de(n, t, r) {
            var e = t(n);
            return bh(n) ? e : a(e, r(n))
        }
        function we(n) {
            return null == n ? n === X ? ut : Jn : Bl && Bl in ll(n) ? ki(n) : Ki(n)
        }
        function me(n, t) {
            return n > t
        }
        function xe(n, t) {
            return null != n && bl.call(n, t)
        }
        function je(n, t) {
            return null != n && t in ll(n)
        }
        function Ae(n, t, r) {
            return n >= Hl(t, r) && n < Gl(t, r)
        }
        function ke(n, t, r) {
            for (var e = r ? f : o, u = n[0].length, i = n.length, a = i, l = il(i), s = 1 / 0, h = []; a--; ) {
                var p = n[a];
                a && t && (p = c(p, z(t))),
                s = Hl(p.length, s),
                l[a] = !r && (t || u >= 120 && p.length >= 120) ? new yr(a && p) : X
            }
            p = n[0];
            var _ = -1
              , v = l[0];
            n: for (; ++_ < u && h.length < s; ) {
                var g = p[_]
                  , y = t ? t(g) : g;
                if (g = r || 0 !== g ? g : 0,
                !(v ? S(v, y) : e(h, y, r))) {
                    for (a = i; --a; ) {
                        var d = l[a];
                        if (!(d ? S(d, y) : e(n[a], y, r)))
                            continue n
                    }
                    v && v.push(y),
                    h.push(g)
                }
            }
            return h
        }
        function Oe(n, t, r, e) {
            return ue(n, function(n, u, i) {
                t(e, r(n), u, i)
            }),
            e
        }
        function Ie(t, r, e) {
            r = ku(r, t),
            t = Gi(t, r);
            var u = null == t ? t : t[no(jo(r))];
            return null == u ? X : n(u, t, e)
        }
        function Re(n) {
            return cc(n) && we(n) == Dn
        }
        function ze(n) {
            return cc(n) && we(n) == ft
        }
        function Ee(n) {
            return cc(n) && we(n) == Pn
        }
        function Se(n, t, r, e, u) {
            return n === t || (null == n || null == t || !cc(n) && !cc(t) ? n !== n && t !== t : We(n, t, r, e, Se, u))
        }
        function We(n, t, r, e, u, i) {
            var o = bh(n)
              , f = bh(t)
              , c = o ? Mn : zs(n)
              , a = f ? Mn : zs(t);
            c = c == Dn ? Yn : c,
            a = a == Dn ? Yn : a;
            var l = c == Yn
              , s = a == Yn
              , h = c == a;
            if (h && mh(n)) {
                if (!mh(t))
                    return !1;
                o = !0,
                l = !1
            }
            if (h && !l)
                return i || (i = new wr),
                o || Oh(n) ? pi(n, t, r, e, u, i) : _i(n, t, c, r, e, u, i);
            if (!(r & hn)) {
                var p = l && bl.call(n, "__wrapped__")
                  , _ = s && bl.call(t, "__wrapped__");
                if (p || _) {
                    var v = p ? n.value() : n
                      , g = _ ? t.value() : t;
                    return i || (i = new wr),
                    u(v, g, r, e, i)
                }
            }
            return !!h && (i || (i = new wr),
            vi(n, t, r, e, u, i))
        }
        function Le(n) {
            return cc(n) && zs(n) == Gn
        }
        function Ce(n, t, r, e) {
            var u = r.length
              , i = u
              , o = !e;
            if (null == n)
                return !i;
            for (n = ll(n); u--; ) {
                var f = r[u];
                if (o && f[2] ? f[1] !== n[f[0]] : !(f[0]in n))
                    return !1
            }
            for (; ++u < i; ) {
                f = r[u];
                var c = f[0]
                  , a = n[c]
                  , l = f[1];
                if (o && f[2]) {
                    if (a === X && !(c in n))
                        return !1
                } else {
                    var s = new wr;
                    if (e)
                        var h = e(a, l, c, n, t, s);
                    if (!(h === X ? Se(l, a, hn | pn, e, s) : h))
                        return !1
                }
            }
            return !0
        }
        function Ue(n) {
            return !(!fc(n) || Di(n)) && (uc(n) ? kl : Zt).test(to(n))
        }
        function Be(n) {
            return cc(n) && we(n) == nt
        }
        function Te(n) {
            return cc(n) && zs(n) == tt
        }
        function $e(n) {
            return cc(n) && oc(n.length) && !!Kr[we(n)]
        }
        function De(n) {
            return "function" == typeof n ? n : null == n ? La : "object" == typeof n ? bh(n) ? Ze(n[0], n[1]) : qe(n) : Fa(n)
        }
        function Me(n) {
            if (!Mi(n))
                return Vl(n);
            var t = [];
            for (var r in ll(n))
                bl.call(n, r) && "constructor" != r && t.push(r);
            return t
        }
        function Fe(n) {
            if (!fc(n))
                return Zi(n);
            var t = Mi(n)
              , r = [];
            for (var e in n)
                ("constructor" != e || !t && bl.call(n, e)) && r.push(e);
            return r
        }
        function Ne(n, t) {
            return n < t
        }
        function Pe(n, t) {
            var r = -1
              , e = Hf(n) ? il(n.length) : [];
            return ys(n, function(n, u, i) {
                e[++r] = t(n, u, i)
            }),
            e
        }
        function qe(n) {
            var t = ji(n);
            return 1 == t.length && t[0][2] ? Ni(t[0][0], t[0][1]) : function(r) {
                return r === n || Ce(r, n, t)
            }
        }
        function Ze(n, t) {
            return Bi(n) && Fi(t) ? Ni(no(n), t) : function(r) {
                var e = Mc(r, n);
                return e === X && e === t ? Nc(r, n) : Se(t, e, hn | pn)
            }
        }
        function Ke(n, t, r, e, u) {
            n !== t && bs(t, function(i, o) {
                if (u || (u = new wr),
                fc(i))
                    Ve(n, t, o, r, Ke, e, u);
                else {
                    var f = e ? e(Ji(n, o), i, o + "", n, t, u) : X;
                    f === X && (f = i),
                    Er(n, o, f)
                }
            }, qc)
        }
        function Ve(n, t, r, e, u, i, o) {
            var f = Ji(n, r)
              , c = Ji(t, r)
              , a = o.get(c);
            if (a)
                return Er(n, r, a),
                X;
            var l = i ? i(f, c, r + "", n, t, o) : X
              , s = l === X;
            if (s) {
                var h = bh(c)
                  , p = !h && mh(c)
                  , _ = !h && !p && Oh(c);
                l = c,
                h || p || _ ? bh(f) ? l = f : Jf(f) ? l = Tu(f) : p ? (s = !1,
                l = Iu(c, !0)) : _ ? (s = !1,
                l = Wu(c, !0)) : l = [] : gc(c) || dh(c) ? (l = f,
                dh(f) ? l = Rc(f) : fc(f) && !uc(f) || (l = Ei(c))) : s = !1
            }
            s && (o.set(c, l),
            u(l, c, e, i, o),
            o.delete(c)),
            Er(n, r, l)
        }
        function Ge(n, t) {
            var r = n.length;
            if (r)
                return t += t < 0 ? r : 0,
                Ci(t, r) ? n[t] : X
        }
        function He(n, t, r) {
            t = t.length ? c(t, function(n) {
                return bh(n) ? function(t) {
                    return _e(t, 1 === n.length ? n[0] : n)
                }
                : n
            }) : [La];
            var e = -1;
            return t = c(t, z(mi())),
            A(Pe(n, function(n, r, u) {
                return {
                    criteria: c(t, function(t) {
                        return t(n)
                    }),
                    index: ++e,
                    value: n
                }
            }), function(n, t) {
                return Cu(n, t, r)
            })
        }
        function Je(n, t) {
            return Ye(n, t, function(t, r) {
                return Nc(n, r)
            })
        }
        function Ye(n, t, r) {
            for (var e = -1, u = t.length, i = {}; ++e < u; ) {
                var o = t[e]
                  , f = _e(n, o);
                r(f, o) && fu(i, ku(o, n), f)
            }
            return i
        }
        function Qe(n) {
            return function(t) {
                return _e(t, n)
            }
        }
        function Xe(n, t, r, e) {
            var u = e ? d : y
              , i = -1
              , o = t.length
              , f = n;
            for (n === t && (t = Tu(t)),
            r && (f = c(n, z(r))); ++i < o; )
                for (var a = 0, l = t[i], s = r ? r(l) : l; (a = u(f, s, a, e)) > -1; )
                    f !== n && Ll.call(f, a, 1),
                    Ll.call(n, a, 1);
            return n
        }
        function nu(n, t) {
            for (var r = n ? t.length : 0, e = r - 1; r--; ) {
                var u = t[r];
                if (r == e || u !== i) {
                    var i = u;
                    Ci(u) ? Ll.call(n, u, 1) : yu(n, u)
                }
            }
            return n
        }
        function tu(n, t) {
            return n + Nl(Ql() * (t - n + 1))
        }
        function ru(n, t, r, e) {
            for (var u = -1, i = Gl(Fl((t - n) / (r || 1)), 0), o = il(i); i--; )
                o[e ? i : ++u] = n,
                n += r;
            return o
        }
        function eu(n, t) {
            var r = "";
            if (!n || t < 1 || t > Wn)
                return r;
            do
                t % 2 && (r += n),
                t = Nl(t / 2),
                t && (n += n);
            while (t);
            return r
        }
        function uu(n, t) {
            return Ls(Vi(n, t, La), n + "")
        }
        function iu(n) {
            return Ir(ra(n))
        }
        function ou(n, t) {
            var r = ra(n);
            return Xi(r, Mr(t, 0, r.length))
        }
        function fu(n, t, r, e) {
            if (!fc(n))
                return n;
            t = ku(t, n);
            for (var u = -1, i = t.length, o = i - 1, f = n; null != f && ++u < i; ) {
                var c = no(t[u])
                  , a = r;
                if ("__proto__" === c || "constructor" === c || "prototype" === c)
                    return n;
                if (u != o) {
                    var l = f[c];
                    a = e ? e(l, c, f) : X,
                    a === X && (a = fc(l) ? l : Ci(t[u + 1]) ? [] : {})
                }
                Sr(f, c, a),
                f = f[c]
            }
            return n
        }
        function cu(n) {
            return Xi(ra(n))
        }
        function au(n, t, r) {
            var e = -1
              , u = n.length;
            t < 0 && (t = -t > u ? 0 : u + t),
            r = r > u ? u : r,
            r < 0 && (r += u),
            u = t > r ? 0 : r - t >>> 0,
            t >>>= 0;
            for (var i = il(u); ++e < u; )
                i[e] = n[e + t];
            return i
        }
        function lu(n, t) {
            var r;
            return ys(n, function(n, e, u) {
                return r = t(n, e, u),
                !r
            }),
            !!r
        }
        function su(n, t, r) {
            var e = 0
              , u = null == n ? e : n.length;
            if ("number" == typeof t && t === t && u <= Tn) {
                for (; e < u; ) {
                    var i = e + u >>> 1
                      , o = n[i];
                    null !== o && !bc(o) && (r ? o <= t : o < t) ? e = i + 1 : u = i
                }
                return u
            }
            return hu(n, t, La, r)
        }
        function hu(n, t, r, e) {
            var u = 0
              , i = null == n ? 0 : n.length;
            if (0 === i)
                return 0;
            t = r(t);
            for (var o = t !== t, f = null === t, c = bc(t), a = t === X; u < i; ) {
                var l = Nl((u + i) / 2)
                  , s = r(n[l])
                  , h = s !== X
                  , p = null === s
                  , _ = s === s
                  , v = bc(s);
                if (o)
                    var g = e || _;
                else
                    g = a ? _ && (e || h) : f ? _ && h && (e || !p) : c ? _ && h && !p && (e || !v) : !p && !v && (e ? s <= t : s < t);
                g ? u = l + 1 : i = l
            }
            return Hl(i, Bn)
        }
        function pu(n, t) {
            for (var r = -1, e = n.length, u = 0, i = []; ++r < e; ) {
                var o = n[r]
                  , f = t ? t(o) : o;
                if (!r || !Gf(f, c)) {
                    var c = f;
                    i[u++] = 0 === o ? 0 : o
                }
            }
            return i
        }
        function _u(n) {
            return "number" == typeof n ? n : bc(n) ? Cn : +n
        }
        function vu(n) {
            if ("string" == typeof n)
                return n;
            if (bh(n))
                return c(n, vu) + "";
            if (bc(n))
                return vs ? vs.call(n) : "";
            var t = n + "";
            return "0" == t && 1 / n == -Sn ? "-0" : t
        }
        function gu(n, t, r) {
            var e = -1
              , u = o
              , i = n.length
              , c = !0
              , a = []
              , l = a;
            if (r)
                c = !1,
                u = f;
            else if (i >= tn) {
                var s = t ? null : ks(n);
                if (s)
                    return P(s);
                c = !1,
                u = S,
                l = new yr
            } else
                l = t ? [] : a;
            n: for (; ++e < i; ) {
                var h = n[e]
                  , p = t ? t(h) : h;
                if (h = r || 0 !== h ? h : 0,
                c && p === p) {
                    for (var _ = l.length; _--; )
                        if (l[_] === p)
                            continue n;
                    t && l.push(p),
                    a.push(h)
                } else
                    u(l, p, r) || (l !== a && l.push(p),
                    a.push(h))
            }
            return a
        }
        function yu(n, t) {
            return t = ku(t, n),
            n = Gi(n, t),
            null == n || delete n[no(jo(t))]
        }
        function du(n, t, r, e) {
            return fu(n, t, r(_e(n, t)), e)
        }
        function bu(n, t, r, e) {
            for (var u = n.length, i = e ? u : -1; (e ? i-- : ++i < u) && t(n[i], i, n); )
                ;
            return r ? au(n, e ? 0 : i, e ? i + 1 : u) : au(n, e ? i + 1 : 0, e ? u : i)
        }
        function wu(n, t) {
            var r = n;
            return r instanceof Ct && (r = r.value()),
            l(t, function(n, t) {
                return t.func.apply(t.thisArg, a([n], t.args))
            }, r)
        }
        function mu(n, t, r) {
            var e = n.length;
            if (e < 2)
                return e ? gu(n[0]) : [];
            for (var u = -1, i = il(e); ++u < e; )
                for (var o = n[u], f = -1; ++f < e; )
                    f != u && (i[u] = Hr(i[u] || o, n[f], t, r));
            return gu(ee(i, 1), t, r)
        }
        function xu(n, t, r) {
            for (var e = -1, u = n.length, i = t.length, o = {}; ++e < u; )
                r(o, n[e], e < i ? t[e] : X);
            return o
        }
        function ju(n) {
            return Jf(n) ? n : []
        }
        function Au(n) {
            return "function" == typeof n ? n : La
        }
        function ku(n, t) {
            return bh(n) ? n : Bi(n, t) ? [n] : Cs(Ec(n))
        }
        function Ou(n, t, r) {
            var e = n.length;
            return r = r === X ? e : r,
            !t && r >= e ? n : au(n, t, r)
        }
        function Iu(n, t) {
            if (t)
                return n.slice();
            var r = n.length
              , e = zl ? zl(r) : new n.constructor(r);
            return n.copy(e),
            e
        }
        function Ru(n) {
            var t = new n.constructor(n.byteLength);
            return new Rl(t).set(new Rl(n)),
            t
        }
        function zu(n, t) {
            return new n.constructor(t ? Ru(n.buffer) : n.buffer,n.byteOffset,n.byteLength)
        }
        function Eu(n) {
            var t = new n.constructor(n.source,Nt.exec(n));
            return t.lastIndex = n.lastIndex,
            t
        }
        function Su(n) {
            return _s ? ll(_s.call(n)) : {}
        }
        function Wu(n, t) {
            return new n.constructor(t ? Ru(n.buffer) : n.buffer,n.byteOffset,n.length)
        }
        function Lu(n, t) {
            if (n !== t) {
                var r = n !== X
                  , e = null === n
                  , u = n === n
                  , i = bc(n)
                  , o = t !== X
                  , f = null === t
                  , c = t === t
                  , a = bc(t);
                if (!f && !a && !i && n > t || i && o && c && !f && !a || e && o && c || !r && c || !u)
                    return 1;
                if (!e && !i && !a && n < t || a && r && u && !e && !i || f && r && u || !o && u || !c)
                    return -1
            }
            return 0
        }
        function Cu(n, t, r) {
            for (var e = -1, u = n.criteria, i = t.criteria, o = u.length, f = r.length; ++e < o; ) {
                var c = Lu(u[e], i[e]);
                if (c)
                    return e >= f ? c : c * ("desc" == r[e] ? -1 : 1)
            }
            return n.index - t.index
        }
        function Uu(n, t, r, e) {
            for (var u = -1, i = n.length, o = r.length, f = -1, c = t.length, a = Gl(i - o, 0), l = il(c + a), s = !e; ++f < c; )
                l[f] = t[f];
            for (; ++u < o; )
                (s || u < i) && (l[r[u]] = n[u]);
            for (; a--; )
                l[f++] = n[u++];
            return l
        }
        function Bu(n, t, r, e) {
            for (var u = -1, i = n.length, o = -1, f = r.length, c = -1, a = t.length, l = Gl(i - f, 0), s = il(l + a), h = !e; ++u < l; )
                s[u] = n[u];
            for (var p = u; ++c < a; )
                s[p + c] = t[c];
            for (; ++o < f; )
                (h || u < i) && (s[p + r[o]] = n[u++]);
            return s
        }
        function Tu(n, t) {
            var r = -1
              , e = n.length;
            for (t || (t = il(e)); ++r < e; )
                t[r] = n[r];
            return t
        }
        function $u(n, t, r, e) {
            var u = !r;
            r || (r = {});
            for (var i = -1, o = t.length; ++i < o; ) {
                var f = t[i]
                  , c = e ? e(r[f], n[f], f, r, n) : X;
                c === X && (c = n[f]),
                u ? Br(r, f, c) : Sr(r, f, c)
            }
            return r
        }
        function Du(n, t) {
            return $u(n, Is(n), t)
        }
        function Mu(n, t) {
            return $u(n, Rs(n), t)
        }
        function Fu(n, r) {
            return function(e, u) {
                var i = bh(e) ? t : Lr
                  , o = r ? r() : {};
                return i(e, n, mi(u, 2), o)
            }
        }
        function Nu(n) {
            return uu(function(t, r) {
                var e = -1
                  , u = r.length
                  , i = u > 1 ? r[u - 1] : X
                  , o = u > 2 ? r[2] : X;
                for (i = n.length > 3 && "function" == typeof i ? (u--,
                i) : X,
                o && Ui(r[0], r[1], o) && (i = u < 3 ? X : i,
                u = 1),
                t = ll(t); ++e < u; ) {
                    var f = r[e];
                    f && n(t, f, e, i)
                }
                return t
            })
        }
        function Pu(n, t) {
            return function(r, e) {
                if (null == r)
                    return r;
                if (!Hf(r))
                    return n(r, e);
                for (var u = r.length, i = t ? u : -1, o = ll(r); (t ? i-- : ++i < u) && e(o[i], i, o) !== !1; )
                    ;
                return r
            }
        }
        function qu(n) {
            return function(t, r, e) {
                for (var u = -1, i = ll(t), o = e(t), f = o.length; f--; ) {
                    var c = o[n ? f : ++u];
                    if (r(i[c], c, i) === !1)
                        break
                }
                return t
            }
        }
        function Zu(n, t, r) {
            function e() {
                return (this && this !== re && this instanceof e ? i : n).apply(u ? r : this, arguments)
            }
            var u = t & _n
              , i = Gu(n);
            return e
        }
        function Ku(n) {
            return function(t) {
                t = Ec(t);
                var r = T(t) ? G(t) : X
                  , e = r ? r[0] : t.charAt(0)
                  , u = r ? Ou(r, 1).join("") : t.slice(1);
                return e[n]() + u
            }
        }
        function Vu(n) {
            return function(t) {
                return l(Ra(ca(t).replace($r, "")), n, "")
            }
        }
        function Gu(n) {
            return function() {
                var t = arguments;
                switch (t.length) {
                case 0:
                    return new n;
                case 1:
                    return new n(t[0]);
                case 2:
                    return new n(t[0],t[1]);
                case 3:
                    return new n(t[0],t[1],t[2]);
                case 4:
                    return new n(t[0],t[1],t[2],t[3]);
                case 5:
                    return new n(t[0],t[1],t[2],t[3],t[4]);
                case 6:
                    return new n(t[0],t[1],t[2],t[3],t[4],t[5]);
                case 7:
                    return new n(t[0],t[1],t[2],t[3],t[4],t[5],t[6])
                }
                var r = gs(n.prototype)
                  , e = n.apply(r, t);
                return fc(e) ? e : r
            }
        }
        function Hu(t, r, e) {
            function u() {
                for (var o = arguments.length, f = il(o), c = o, a = wi(u); c--; )
                    f[c] = arguments[c];
                var l = o < 3 && f[0] !== a && f[o - 1] !== a ? [] : N(f, a);
                return o -= l.length,
                o < e ? oi(t, r, Qu, u.placeholder, X, f, l, X, X, e - o) : n(this && this !== re && this instanceof u ? i : t, this, f)
            }
            var i = Gu(t);
            return u
        }
        function Ju(n) {
            return function(t, r, e) {
                var u = ll(t);
                if (!Hf(t)) {
                    var i = mi(r, 3);
                    t = Pc(t),
                    r = function(n) {
                        return i(u[n], n, u)
                    }
                }
                var o = n(t, r, e);
                return o > -1 ? u[i ? t[o] : o] : X
            }
        }
        function Yu(n) {
            return gi(function(t) {
                var r = t.length
                  , e = r
                  , u = Y.prototype.thru;
                for (n && t.reverse(); e--; ) {
                    var i = t[e];
                    if ("function" != typeof i)
                        throw new pl(en);
                    if (u && !o && "wrapper" == bi(i))
                        var o = new Y([],!0)
                }
                for (e = o ? e : r; ++e < r; ) {
                    i = t[e];
                    var f = bi(i)
                      , c = "wrapper" == f ? Os(i) : X;
                    o = c && $i(c[0]) && c[1] == (mn | yn | bn | xn) && !c[4].length && 1 == c[9] ? o[bi(c[0])].apply(o, c[3]) : 1 == i.length && $i(i) ? o[f]() : o.thru(i)
                }
                return function() {
                    var n = arguments
                      , e = n[0];
                    if (o && 1 == n.length && bh(e))
                        return o.plant(e).value();
                    for (var u = 0, i = r ? t[u].apply(this, n) : e; ++u < r; )
                        i = t[u].call(this, i);
                    return i
                }
            })
        }
        function Qu(n, t, r, e, u, i, o, f, c, a) {
            function l() {
                for (var y = arguments.length, d = il(y), b = y; b--; )
                    d[b] = arguments[b];
                if (_)
                    var w = wi(l)
                      , m = C(d, w);
                if (e && (d = Uu(d, e, u, _)),
                i && (d = Bu(d, i, o, _)),
                y -= m,
                _ && y < a)
                    return oi(n, t, Qu, l.placeholder, r, d, N(d, w), f, c, a - y);
                var x = h ? r : this
                  , j = p ? x[n] : n;
                return y = d.length,
                f ? d = Hi(d, f) : v && y > 1 && d.reverse(),
                s && c < y && (d.length = c),
                this && this !== re && this instanceof l && (j = g || Gu(j)),
                j.apply(x, d)
            }
            var s = t & mn
              , h = t & _n
              , p = t & vn
              , _ = t & (yn | dn)
              , v = t & jn
              , g = p ? X : Gu(n);
            return l
        }
        function Xu(n, t) {
            return function(r, e) {
                return Oe(r, n, t(e), {})
            }
        }
        function ni(n, t) {
            return function(r, e) {
                var u;
                if (r === X && e === X)
                    return t;
                if (r !== X && (u = r),
                e !== X) {
                    if (u === X)
                        return e;
                    "string" == typeof r || "string" == typeof e ? (r = vu(r),
                    e = vu(e)) : (r = _u(r),
                    e = _u(e)),
                    u = n(r, e)
                }
                return u
            }
        }
        function ti(t) {
            return gi(function(r) {
                return r = c(r, z(mi())),
                uu(function(e) {
                    var u = this;
                    return t(r, function(t) {
                        return n(t, u, e)
                    })
                })
            })
        }
        function ri(n, t) {
            t = t === X ? " " : vu(t);
            var r = t.length;
            if (r < 2)
                return r ? eu(t, n) : t;
            var e = eu(t, Fl(n / V(t)));
            return T(t) ? Ou(G(e), 0, n).join("") : e.slice(0, n)
        }
        function ei(t, r, e, u) {
            function i() {
                for (var r = -1, c = arguments.length, a = -1, l = u.length, s = il(l + c), h = this && this !== re && this instanceof i ? f : t; ++a < l; )
                    s[a] = u[a];
                for (; c--; )
                    s[a++] = arguments[++r];
                return n(h, o ? e : this, s)
            }
            var o = r & _n
              , f = Gu(t);
            return i
        }
        function ui(n) {
            return function(t, r, e) {
                return e && "number" != typeof e && Ui(t, r, e) && (r = e = X),
                t = Ac(t),
                r === X ? (r = t,
                t = 0) : r = Ac(r),
                e = e === X ? t < r ? 1 : -1 : Ac(e),
                ru(t, r, e, n)
            }
        }
        function ii(n) {
            return function(t, r) {
                return "string" == typeof t && "string" == typeof r || (t = Ic(t),
                r = Ic(r)),
                n(t, r)
            }
        }
        function oi(n, t, r, e, u, i, o, f, c, a) {
            var l = t & yn
              , s = l ? o : X
              , h = l ? X : o
              , p = l ? i : X
              , _ = l ? X : i;
            t |= l ? bn : wn,
            t &= ~(l ? wn : bn),
            t & gn || (t &= ~(_n | vn));
            var v = [n, t, u, p, s, _, h, f, c, a]
              , g = r.apply(X, v);
            return $i(n) && Ss(g, v),
            g.placeholder = e,
            Yi(g, n, t)
        }
        function fi(n) {
            var t = al[n];
            return function(n, r) {
                if (n = Ic(n),
                r = null == r ? 0 : Hl(kc(r), 292),
                r && Zl(n)) {
                    var e = (Ec(n) + "e").split("e");
                    return e = (Ec(t(e[0] + "e" + (+e[1] + r))) + "e").split("e"),
                    +(e[0] + "e" + (+e[1] - r))
                }
                return t(n)
            }
        }
        function ci(n) {
            return function(t) {
                var r = zs(t);
                return r == Gn ? M(t) : r == tt ? q(t) : I(t, n(t))
            }
        }
        function ai(n, t, r, e, u, i, o, f) {
            var c = t & vn;
            if (!c && "function" != typeof n)
                throw new pl(en);
            var a = e ? e.length : 0;
            if (a || (t &= ~(bn | wn),
            e = u = X),
            o = o === X ? o : Gl(kc(o), 0),
            f = f === X ? f : kc(f),
            a -= u ? u.length : 0,
            t & wn) {
                var l = e
                  , s = u;
                e = u = X
            }
            var h = c ? X : Os(n)
              , p = [n, t, r, e, u, l, s, i, o, f];
            if (h && qi(p, h),
            n = p[0],
            t = p[1],
            r = p[2],
            e = p[3],
            u = p[4],
            f = p[9] = p[9] === X ? c ? 0 : n.length : Gl(p[9] - a, 0),
            !f && t & (yn | dn) && (t &= ~(yn | dn)),
            t && t != _n)
                _ = t == yn || t == dn ? Hu(n, t, f) : t != bn && t != (_n | bn) || u.length ? Qu.apply(X, p) : ei(n, t, r, e);
            else
                var _ = Zu(n, t, r);
            return Yi((h ? ms : Ss)(_, p), n, t)
        }
        function li(n, t, r, e) {
            return n === X || Gf(n, gl[r]) && !bl.call(e, r) ? t : n
        }
        function si(n, t, r, e, u, i) {
            return fc(n) && fc(t) && (i.set(t, n),
            Ke(n, t, X, si, i),
            i.delete(t)),
            n
        }
        function hi(n) {
            return gc(n) ? X : n
        }
        function pi(n, t, r, e, u, i) {
            var o = r & hn
              , f = n.length
              , c = t.length;
            if (f != c && !(o && c > f))
                return !1;
            var a = i.get(n)
              , l = i.get(t);
            if (a && l)
                return a == t && l == n;
            var s = -1
              , p = !0
              , _ = r & pn ? new yr : X;
            for (i.set(n, t),
            i.set(t, n); ++s < f; ) {
                var v = n[s]
                  , g = t[s];
                if (e)
                    var y = o ? e(g, v, s, t, n, i) : e(v, g, s, n, t, i);
                if (y !== X) {
                    if (y)
                        continue;
                    p = !1;
                    break
                }
                if (_) {
                    if (!h(t, function(n, t) {
                        if (!S(_, t) && (v === n || u(v, n, r, e, i)))
                            return _.push(t)
                    })) {
                        p = !1;
                        break
                    }
                } else if (v !== g && !u(v, g, r, e, i)) {
                    p = !1;
                    break
                }
            }
            return i.delete(n),
            i.delete(t),
            p
        }
        function _i(n, t, r, e, u, i, o) {
            switch (r) {
            case ct:
                if (n.byteLength != t.byteLength || n.byteOffset != t.byteOffset)
                    return !1;
                n = n.buffer,
                t = t.buffer;
            case ft:
                return !(n.byteLength != t.byteLength || !i(new Rl(n), new Rl(t)));
            case Nn:
            case Pn:
            case Hn:
                return Gf(+n, +t);
            case Zn:
                return n.name == t.name && n.message == t.message;
            case nt:
            case rt:
                return n == t + "";
            case Gn:
                var f = M;
            case tt:
                var c = e & hn;
                if (f || (f = P),
                n.size != t.size && !c)
                    return !1;
                var a = o.get(n);
                if (a)
                    return a == t;
                e |= pn,
                o.set(n, t);
                var l = pi(f(n), f(t), e, u, i, o);
                return o.delete(n),
                l;
            case et:
                if (_s)
                    return _s.call(n) == _s.call(t)
            }
            return !1
        }
        function vi(n, t, r, e, u, i) {
            var o = r & hn
              , f = yi(n)
              , c = f.length;
            if (c != yi(t).length && !o)
                return !1;
            for (var a = c; a--; ) {
                var l = f[a];
                if (!(o ? l in t : bl.call(t, l)))
                    return !1
            }
            var s = i.get(n)
              , h = i.get(t);
            if (s && h)
                return s == t && h == n;
            var p = !0;
            i.set(n, t),
            i.set(t, n);
            for (var _ = o; ++a < c; ) {
                l = f[a];
                var v = n[l]
                  , g = t[l];
                if (e)
                    var y = o ? e(g, v, l, t, n, i) : e(v, g, l, n, t, i);
                if (!(y === X ? v === g || u(v, g, r, e, i) : y)) {
                    p = !1;
                    break
                }
                _ || (_ = "constructor" == l)
            }
            if (p && !_) {
                var d = n.constructor
                  , b = t.constructor;
                d != b && "constructor"in n && "constructor"in t && !("function" == typeof d && d instanceof d && "function" == typeof b && b instanceof b) && (p = !1)
            }
            return i.delete(n),
            i.delete(t),
            p
        }
        function gi(n) {
            return Ls(Vi(n, X, _o), n + "")
        }
        function yi(n) {
            return de(n, Pc, Is)
        }
        function di(n) {
            return de(n, qc, Rs)
        }
        function bi(n) {
            for (var t = n.name + "", r = fs[t], e = bl.call(fs, t) ? r.length : 0; e--; ) {
                var u = r[e]
                  , i = u.func;
                if (null == i || i == n)
                    return u.name
            }
            return t
        }
        function wi(n) {
            return (bl.call(Z, "placeholder") ? Z : n).placeholder
        }
        function mi() {
            var n = Z.iteratee || Ca;
            return n = n === Ca ? De : n,
            arguments.length ? n(arguments[0], arguments[1]) : n
        }
        function xi(n, t) {
            var r = n.__data__;
            return Ti(t) ? r["string" == typeof t ? "string" : "hash"] : r.map
        }
        function ji(n) {
            for (var t = Pc(n), r = t.length; r--; ) {
                var e = t[r]
                  , u = n[e];
                t[r] = [e, u, Fi(u)]
            }
            return t
        }
        function Ai(n, t) {
            var r = B(n, t);
            return Ue(r) ? r : X
        }
        function ki(n) {
            var t = bl.call(n, Bl)
              , r = n[Bl];
            try {
                n[Bl] = X;
                var e = !0
            } catch (n) {}
            var u = xl.call(n);
            return e && (t ? n[Bl] = r : delete n[Bl]),
            u
        }
        function Oi(n, t, r) {
            for (var e = -1, u = r.length; ++e < u; ) {
                var i = r[e]
                  , o = i.size;
                switch (i.type) {
                case "drop":
                    n += o;
                    break;
                case "dropRight":
                    t -= o;
                    break;
                case "take":
                    t = Hl(t, n + o);
                    break;
                case "takeRight":
                    n = Gl(n, t - o)
                }
            }
            return {
                start: n,
                end: t
            }
        }
        function Ii(n) {
            var t = n.match(Bt);
            return t ? t[1].split(Tt) : []
        }
        function Ri(n, t, r) {
            t = ku(t, n);
            for (var e = -1, u = t.length, i = !1; ++e < u; ) {
                var o = no(t[e]);
                if (!(i = null != n && r(n, o)))
                    break;
                n = n[o]
            }
            return i || ++e != u ? i : (u = null == n ? 0 : n.length,
            !!u && oc(u) && Ci(o, u) && (bh(n) || dh(n)))
        }
        function zi(n) {
            var t = n.length
              , r = new n.constructor(t);
            return t && "string" == typeof n[0] && bl.call(n, "index") && (r.index = n.index,
            r.input = n.input),
            r
        }
        function Ei(n) {
            return "function" != typeof n.constructor || Mi(n) ? {} : gs(El(n))
        }
        function Si(n, t, r) {
            var e = n.constructor;
            switch (t) {
            case ft:
                return Ru(n);
            case Nn:
            case Pn:
                return new e(+n);
            case ct:
                return zu(n, r);
            case at:
            case lt:
            case st:
            case ht:
            case pt:
            case _t:
            case vt:
            case gt:
            case yt:
                return Wu(n, r);
            case Gn:
                return new e;
            case Hn:
            case rt:
                return new e(n);
            case nt:
                return Eu(n);
            case tt:
                return new e;
            case et:
                return Su(n)
            }
        }
        function Wi(n, t) {
            var r = t.length;
            if (!r)
                return n;
            var e = r - 1;
            return t[e] = (r > 1 ? "& " : "") + t[e],
            t = t.join(r > 2 ? ", " : " "),
            n.replace(Ut, "{\n/* [wrapped with " + t + "] */\n")
        }
        function Li(n) {
            return bh(n) || dh(n) || !!(Cl && n && n[Cl])
        }
        function Ci(n, t) {
            var r = typeof n;
            return t = null == t ? Wn : t,
            !!t && ("number" == r || "symbol" != r && Vt.test(n)) && n > -1 && n % 1 == 0 && n < t
        }
        function Ui(n, t, r) {
            if (!fc(r))
                return !1;
            var e = typeof t;
            return !!("number" == e ? Hf(r) && Ci(t, r.length) : "string" == e && t in r) && Gf(r[t], n)
        }
        function Bi(n, t) {
            if (bh(n))
                return !1;
            var r = typeof n;
            return !("number" != r && "symbol" != r && "boolean" != r && null != n && !bc(n)) || zt.test(n) || !Rt.test(n) || null != t && n in ll(t)
        }
        function Ti(n) {
            var t = typeof n;
            return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== n : null === n
        }
        function $i(n) {
            var t = bi(n)
              , r = Z[t];
            if ("function" != typeof r || !(t in Ct.prototype))
                return !1;
            if (n === r)
                return !0;
            var e = Os(r);
            return !!e && n === e[0]
        }
        function Di(n) {
            return !!ml && ml in n
        }
        function Mi(n) {
            var t = n && n.constructor;
            return n === ("function" == typeof t && t.prototype || gl)
        }
        function Fi(n) {
            return n === n && !fc(n)
        }
        function Ni(n, t) {
            return function(r) {
                return null != r && r[n] === t && (t !== X || n in ll(r))
            }
        }
        function Pi(n) {
            var t = Cf(n, function(n) {
                return r.size === fn && r.clear(),
                n
            })
              , r = t.cache;
            return t
        }
        function qi(n, t) {
            var r = n[1]
              , e = t[1]
              , u = r | e
              , i = u < (_n | vn | mn)
              , o = e == mn && r == yn || e == mn && r == xn && n[7].length <= t[8] || e == (mn | xn) && t[7].length <= t[8] && r == yn;
            if (!i && !o)
                return n;
            e & _n && (n[2] = t[2],
            u |= r & _n ? 0 : gn);
            var f = t[3];
            if (f) {
                var c = n[3];
                n[3] = c ? Uu(c, f, t[4]) : f,
                n[4] = c ? N(n[3], cn) : t[4]
            }
            return f = t[5],
            f && (c = n[5],
            n[5] = c ? Bu(c, f, t[6]) : f,
            n[6] = c ? N(n[5], cn) : t[6]),
            f = t[7],
            f && (n[7] = f),
            e & mn && (n[8] = null == n[8] ? t[8] : Hl(n[8], t[8])),
            null == n[9] && (n[9] = t[9]),
            n[0] = t[0],
            n[1] = u,
            n
        }
        function Zi(n) {
            var t = [];
            if (null != n)
                for (var r in ll(n))
                    t.push(r);
            return t
        }
        function Ki(n) {
            return xl.call(n)
        }
        function Vi(t, r, e) {
            return r = Gl(r === X ? t.length - 1 : r, 0),
            function() {
                for (var u = arguments, i = -1, o = Gl(u.length - r, 0), f = il(o); ++i < o; )
                    f[i] = u[r + i];
                i = -1;
                for (var c = il(r + 1); ++i < r; )
                    c[i] = u[i];
                return c[r] = e(f),
                n(t, this, c)
            }
        }
        function Gi(n, t) {
            return t.length < 2 ? n : _e(n, au(t, 0, -1))
        }
        function Hi(n, t) {
            for (var r = n.length, e = Hl(t.length, r), u = Tu(n); e--; ) {
                var i = t[e];
                n[e] = Ci(i, r) ? u[i] : X
            }
            return n
        }
        function Ji(n, t) {
            if (("constructor" !== t || "function" != typeof n[t]) && "__proto__" != t)
                return n[t]
        }
        function Yi(n, t, r) {
            var e = t + "";
            return Ls(n, Wi(e, ro(Ii(e), r)))
        }
        function Qi(n) {
            var t = 0
              , r = 0;
            return function() {
                var e = Jl()
                  , u = In - (e - r);
                if (r = e,
                u > 0) {
                    if (++t >= On)
                        return arguments[0]
                } else
                    t = 0;
                return n.apply(X, arguments)
            }
        }
        function Xi(n, t) {
            var r = -1
              , e = n.length
              , u = e - 1;
            for (t = t === X ? e : t; ++r < t; ) {
                var i = tu(r, u)
                  , o = n[i];
                n[i] = n[r],
                n[r] = o
            }
            return n.length = t,
            n
        }
        function no(n) {
            if ("string" == typeof n || bc(n))
                return n;
            var t = n + "";
            return "0" == t && 1 / n == -Sn ? "-0" : t
        }
        function to(n) {
            if (null != n) {
                try {
                    return dl.call(n)
                } catch (n) {}
                try {
                    return n + ""
                } catch (n) {}
            }
            return ""
        }
        function ro(n, t) {
            return r($n, function(r) {
                var e = "_." + r[0];
                t & r[1] && !o(n, e) && n.push(e)
            }),
            n.sort()
        }
        function eo(n) {
            if (n instanceof Ct)
                return n.clone();
            var t = new Y(n.__wrapped__,n.__chain__);
            return t.__actions__ = Tu(n.__actions__),
            t.__index__ = n.__index__,
            t.__values__ = n.__values__,
            t
        }
        function uo(n, t, r) {
            t = (r ? Ui(n, t, r) : t === X) ? 1 : Gl(kc(t), 0);
            var e = null == n ? 0 : n.length;
            if (!e || t < 1)
                return [];
            for (var u = 0, i = 0, o = il(Fl(e / t)); u < e; )
                o[i++] = au(n, u, u += t);
            return o
        }
        function io(n) {
            for (var t = -1, r = null == n ? 0 : n.length, e = 0, u = []; ++t < r; ) {
                var i = n[t];
                i && (u[e++] = i)
            }
            return u
        }
        function oo() {
            var n = arguments.length;
            if (!n)
                return [];
            for (var t = il(n - 1), r = arguments[0], e = n; e--; )
                t[e - 1] = arguments[e];
            return a(bh(r) ? Tu(r) : [r], ee(t, 1))
        }
        function fo(n, t, r) {
            var e = null == n ? 0 : n.length;
            return e ? (t = r || t === X ? 1 : kc(t),
            au(n, t < 0 ? 0 : t, e)) : []
        }
        function co(n, t, r) {
            var e = null == n ? 0 : n.length;
            return e ? (t = r || t === X ? 1 : kc(t),
            t = e - t,
            au(n, 0, t < 0 ? 0 : t)) : []
        }
        function ao(n, t) {
            return n && n.length ? bu(n, mi(t, 3), !0, !0) : []
        }
        function lo(n, t) {
            return n && n.length ? bu(n, mi(t, 3), !0) : []
        }
        function so(n, t, r, e) {
            var u = null == n ? 0 : n.length;
            return u ? (r && "number" != typeof r && Ui(n, t, r) && (r = 0,
            e = u),
            ne(n, t, r, e)) : []
        }
        function ho(n, t, r) {
            var e = null == n ? 0 : n.length;
            if (!e)
                return -1;
            var u = null == r ? 0 : kc(r);
            return u < 0 && (u = Gl(e + u, 0)),
            g(n, mi(t, 3), u)
        }
        function po(n, t, r) {
            var e = null == n ? 0 : n.length;
            if (!e)
                return -1;
            var u = e - 1;
            return r !== X && (u = kc(r),
            u = r < 0 ? Gl(e + u, 0) : Hl(u, e - 1)),
            g(n, mi(t, 3), u, !0)
        }
        function _o(n) {
            return (null == n ? 0 : n.length) ? ee(n, 1) : []
        }
        function vo(n) {
            return (null == n ? 0 : n.length) ? ee(n, Sn) : []
        }
        function go(n, t) {
            return (null == n ? 0 : n.length) ? (t = t === X ? 1 : kc(t),
            ee(n, t)) : []
        }
        function yo(n) {
            for (var t = -1, r = null == n ? 0 : n.length, e = {}; ++t < r; ) {
                var u = n[t];
                e[u[0]] = u[1]
            }
            return e
        }
        function bo(n) {
            return n && n.length ? n[0] : X
        }
        function wo(n, t, r) {
            var e = null == n ? 0 : n.length;
            if (!e)
                return -1;
            var u = null == r ? 0 : kc(r);
            return u < 0 && (u = Gl(e + u, 0)),
            y(n, t, u)
        }
        function mo(n) {
            return (null == n ? 0 : n.length) ? au(n, 0, -1) : []
        }
        function xo(n, t) {
            return null == n ? "" : Kl.call(n, t)
        }
        function jo(n) {
            var t = null == n ? 0 : n.length;
            return t ? n[t - 1] : X
        }
        function Ao(n, t, r) {
            var e = null == n ? 0 : n.length;
            if (!e)
                return -1;
            var u = e;
            return r !== X && (u = kc(r),
            u = u < 0 ? Gl(e + u, 0) : Hl(u, e - 1)),
            t === t ? K(n, t, u) : g(n, b, u, !0)
        }
        function ko(n, t) {
            return n && n.length ? Ge(n, kc(t)) : X
        }
        function Oo(n, t) {
            return n && n.length && t && t.length ? Xe(n, t) : n
        }
        function Io(n, t, r) {
            return n && n.length && t && t.length ? Xe(n, t, mi(r, 2)) : n
        }
        function Ro(n, t, r) {
            return n && n.length && t && t.length ? Xe(n, t, X, r) : n
        }
        function zo(n, t) {
            var r = [];
            if (!n || !n.length)
                return r;
            var e = -1
              , u = []
              , i = n.length;
            for (t = mi(t, 3); ++e < i; ) {
                var o = n[e];
                t(o, e, n) && (r.push(o),
                u.push(e))
            }
            return nu(n, u),
            r
        }
        function Eo(n) {
            return null == n ? n : Xl.call(n)
        }
        function So(n, t, r) {
            var e = null == n ? 0 : n.length;
            return e ? (r && "number" != typeof r && Ui(n, t, r) ? (t = 0,
            r = e) : (t = null == t ? 0 : kc(t),
            r = r === X ? e : kc(r)),
            au(n, t, r)) : []
        }
        function Wo(n, t) {
            return su(n, t)
        }
        function Lo(n, t, r) {
            return hu(n, t, mi(r, 2))
        }
        function Co(n, t) {
            var r = null == n ? 0 : n.length;
            if (r) {
                var e = su(n, t);
                if (e < r && Gf(n[e], t))
                    return e
            }
            return -1
        }
        function Uo(n, t) {
            return su(n, t, !0)
        }
        function Bo(n, t, r) {
            return hu(n, t, mi(r, 2), !0)
        }
        function To(n, t) {
            if (null == n ? 0 : n.length) {
                var r = su(n, t, !0) - 1;
                if (Gf(n[r], t))
                    return r
            }
            return -1
        }
        function $o(n) {
            return n && n.length ? pu(n) : []
        }
        function Do(n, t) {
            return n && n.length ? pu(n, mi(t, 2)) : []
        }
        function Mo(n) {
            var t = null == n ? 0 : n.length;
            return t ? au(n, 1, t) : []
        }
        function Fo(n, t, r) {
            return n && n.length ? (t = r || t === X ? 1 : kc(t),
            au(n, 0, t < 0 ? 0 : t)) : []
        }
        function No(n, t, r) {
            var e = null == n ? 0 : n.length;
            return e ? (t = r || t === X ? 1 : kc(t),
            t = e - t,
            au(n, t < 0 ? 0 : t, e)) : []
        }
        function Po(n, t) {
            return n && n.length ? bu(n, mi(t, 3), !1, !0) : []
        }
        function qo(n, t) {
            return n && n.length ? bu(n, mi(t, 3)) : []
        }
        function Zo(n) {
            return n && n.length ? gu(n) : []
        }
        function Ko(n, t) {
            return n && n.length ? gu(n, mi(t, 2)) : []
        }
        function Vo(n, t) {
            return t = "function" == typeof t ? t : X,
            n && n.length ? gu(n, X, t) : []
        }
        function Go(n) {
            if (!n || !n.length)
                return [];
            var t = 0;
            return n = i(n, function(n) {
                if (Jf(n))
                    return t = Gl(n.length, t),
                    !0
            }),
            O(t, function(t) {
                return c(n, m(t))
            })
        }
        function Ho(t, r) {
            if (!t || !t.length)
                return [];
            var e = Go(t);
            return null == r ? e : c(e, function(t) {
                return n(r, X, t)
            })
        }
        function Jo(n, t) {
            return xu(n || [], t || [], Sr)
        }
        function Yo(n, t) {
            return xu(n || [], t || [], fu)
        }
        function Qo(n) {
            var t = Z(n);
            return t.__chain__ = !0,
            t
        }
        function Xo(n, t) {
            return t(n),
            n
        }
        function nf(n, t) {
            return t(n)
        }
        function tf() {
            return Qo(this)
        }
        function rf() {
            return new Y(this.value(),this.__chain__)
        }
        function ef() {
            this.__values__ === X && (this.__values__ = jc(this.value()));
            var n = this.__index__ >= this.__values__.length;
            return {
                done: n,
                value: n ? X : this.__values__[this.__index__++]
            }
        }
        function uf() {
            return this
        }
        function of(n) {
            for (var t, r = this; r instanceof J; ) {
                var e = eo(r);
                e.__index__ = 0,
                e.__values__ = X,
                t ? u.__wrapped__ = e : t = e;
                var u = e;
                r = r.__wrapped__
            }
            return u.__wrapped__ = n,
            t
        }
        function ff() {
            var n = this.__wrapped__;
            if (n instanceof Ct) {
                var t = n;
                return this.__actions__.length && (t = new Ct(this)),
                t = t.reverse(),
                t.__actions__.push({
                    func: nf,
                    args: [Eo],
                    thisArg: X
                }),
                new Y(t,this.__chain__)
            }
            return this.thru(Eo)
        }
        function cf() {
            return wu(this.__wrapped__, this.__actions__)
        }
        function af(n, t, r) {
            var e = bh(n) ? u : Jr;
            return r && Ui(n, t, r) && (t = X),
            e(n, mi(t, 3))
        }
        function lf(n, t) {
            return (bh(n) ? i : te)(n, mi(t, 3))
        }
        function sf(n, t) {
            return ee(yf(n, t), 1)
        }
        function hf(n, t) {
            return ee(yf(n, t), Sn)
        }
        function pf(n, t, r) {
            return r = r === X ? 1 : kc(r),
            ee(yf(n, t), r)
        }
        function _f(n, t) {
            return (bh(n) ? r : ys)(n, mi(t, 3))
        }
        function vf(n, t) {
            return (bh(n) ? e : ds)(n, mi(t, 3))
        }
        function gf(n, t, r, e) {
            n = Hf(n) ? n : ra(n),
            r = r && !e ? kc(r) : 0;
            var u = n.length;
            return r < 0 && (r = Gl(u + r, 0)),
            dc(n) ? r <= u && n.indexOf(t, r) > -1 : !!u && y(n, t, r) > -1
        }
        function yf(n, t) {
            return (bh(n) ? c : Pe)(n, mi(t, 3))
        }
        function df(n, t, r, e) {
            return null == n ? [] : (bh(t) || (t = null == t ? [] : [t]),
            r = e ? X : r,
            bh(r) || (r = null == r ? [] : [r]),
            He(n, t, r))
        }
        function bf(n, t, r) {
            var e = bh(n) ? l : j
              , u = arguments.length < 3;
            return e(n, mi(t, 4), r, u, ys)
        }
        function wf(n, t, r) {
            var e = bh(n) ? s : j
              , u = arguments.length < 3;
            return e(n, mi(t, 4), r, u, ds)
        }
        function mf(n, t) {
            return (bh(n) ? i : te)(n, Uf(mi(t, 3)))
        }
        function xf(n) {
            return (bh(n) ? Ir : iu)(n)
        }
        function jf(n, t, r) {
            return t = (r ? Ui(n, t, r) : t === X) ? 1 : kc(t),
            (bh(n) ? Rr : ou)(n, t)
        }
        function Af(n) {
            return (bh(n) ? zr : cu)(n)
        }
        function kf(n) {
            if (null == n)
                return 0;
            if (Hf(n))
                return dc(n) ? V(n) : n.length;
            var t = zs(n);
            return t == Gn || t == tt ? n.size : Me(n).length
        }
        function Of(n, t, r) {
            var e = bh(n) ? h : lu;
            return r && Ui(n, t, r) && (t = X),
            e(n, mi(t, 3))
        }
        function If(n, t) {
            if ("function" != typeof t)
                throw new pl(en);
            return n = kc(n),
            function() {
                if (--n < 1)
                    return t.apply(this, arguments)
            }
        }
        function Rf(n, t, r) {
            return t = r ? X : t,
            t = n && null == t ? n.length : t,
            ai(n, mn, X, X, X, X, t)
        }
        function zf(n, t) {
            var r;
            if ("function" != typeof t)
                throw new pl(en);
            return n = kc(n),
            function() {
                return --n > 0 && (r = t.apply(this, arguments)),
                n <= 1 && (t = X),
                r
            }
        }
        function Ef(n, t, r) {
            t = r ? X : t;
            var e = ai(n, yn, X, X, X, X, X, t);
            return e.placeholder = Ef.placeholder,
            e
        }
        function Sf(n, t, r) {
            t = r ? X : t;
            var e = ai(n, dn, X, X, X, X, X, t);
            return e.placeholder = Sf.placeholder,
            e
        }
        function Wf(n, t, r) {
            function e(t) {
                var r = h
                  , e = p;
                return h = p = X,
                d = t,
                v = n.apply(e, r)
            }
            function u(n) {
                return d = n,
                g = Ws(f, t),
                b ? e(n) : v
            }
            function i(n) {
                var r = n - y
                  , e = n - d
                  , u = t - r;
                return w ? Hl(u, _ - e) : u
            }
            function o(n) {
                var r = n - y
                  , e = n - d;
                return y === X || r >= t || r < 0 || w && e >= _
            }
            function f() {
                var n = fh();
                return o(n) ? c(n) : (g = Ws(f, i(n)),
                X)
            }
            function c(n) {
                return g = X,
                m && h ? e(n) : (h = p = X,
                v)
            }
            function a() {
                g !== X && As(g),
                d = 0,
                h = y = p = g = X
            }
            function l() {
                return g === X ? v : c(fh())
            }
            function s() {
                var n = fh()
                  , r = o(n);
                if (h = arguments,
                p = this,
                y = n,
                r) {
                    if (g === X)
                        return u(y);
                    if (w)
                        return As(g),
                        g = Ws(f, t),
                        e(y)
                }
                return g === X && (g = Ws(f, t)),
                v
            }
            var h, p, _, v, g, y, d = 0, b = !1, w = !1, m = !0;
            if ("function" != typeof n)
                throw new pl(en);
            return t = Ic(t) || 0,
            fc(r) && (b = !!r.leading,
            w = "maxWait"in r,
            _ = w ? Gl(Ic(r.maxWait) || 0, t) : _,
            m = "trailing"in r ? !!r.trailing : m),
            s.cancel = a,
            s.flush = l,
            s
        }
        function Lf(n) {
            return ai(n, jn)
        }
        function Cf(n, t) {
            if ("function" != typeof n || null != t && "function" != typeof t)
                throw new pl(en);
            var r = function() {
                var e = arguments
                  , u = t ? t.apply(this, e) : e[0]
                  , i = r.cache;
                if (i.has(u))
                    return i.get(u);
                var o = n.apply(this, e);
                return r.cache = i.set(u, o) || i,
                o
            };
            return r.cache = new (Cf.Cache || sr),
            r
        }
        function Uf(n) {
            if ("function" != typeof n)
                throw new pl(en);
            return function() {
                var t = arguments;
                switch (t.length) {
                case 0:
                    return !n.call(this);
                case 1:
                    return !n.call(this, t[0]);
                case 2:
                    return !n.call(this, t[0], t[1]);
                case 3:
                    return !n.call(this, t[0], t[1], t[2])
                }
                return !n.apply(this, t)
            }
        }
        function Bf(n) {
            return zf(2, n)
        }
        function Tf(n, t) {
            if ("function" != typeof n)
                throw new pl(en);
            return t = t === X ? t : kc(t),
            uu(n, t)
        }
        function $f(t, r) {
            if ("function" != typeof t)
                throw new pl(en);
            return r = null == r ? 0 : Gl(kc(r), 0),
            uu(function(e) {
                var u = e[r]
                  , i = Ou(e, 0, r);
                return u && a(i, u),
                n(t, this, i)
            })
        }
        function Df(n, t, r) {
            var e = !0
              , u = !0;
            if ("function" != typeof n)
                throw new pl(en);
            return fc(r) && (e = "leading"in r ? !!r.leading : e,
            u = "trailing"in r ? !!r.trailing : u),
            Wf(n, t, {
                leading: e,
                maxWait: t,
                trailing: u
            })
        }
        function Mf(n) {
            return Rf(n, 1)
        }
        function Ff(n, t) {
            return ph(Au(t), n)
        }
        function Nf() {
            if (!arguments.length)
                return [];
            var n = arguments[0];
            return bh(n) ? n : [n]
        }
        function Pf(n) {
            return Fr(n, sn)
        }
        function qf(n, t) {
            return t = "function" == typeof t ? t : X,
            Fr(n, sn, t)
        }
        function Zf(n) {
            return Fr(n, an | sn)
        }
        function Kf(n, t) {
            return t = "function" == typeof t ? t : X,
            Fr(n, an | sn, t)
        }
        function Vf(n, t) {
            return null == t || Pr(n, t, Pc(t))
        }
        function Gf(n, t) {
            return n === t || n !== n && t !== t
        }
        function Hf(n) {
            return null != n && oc(n.length) && !uc(n)
        }
        function Jf(n) {
            return cc(n) && Hf(n)
        }
        function Yf(n) {
            return n === !0 || n === !1 || cc(n) && we(n) == Nn
        }
        function Qf(n) {
            return cc(n) && 1 === n.nodeType && !gc(n)
        }
        function Xf(n) {
            if (null == n)
                return !0;
            if (Hf(n) && (bh(n) || "string" == typeof n || "function" == typeof n.splice || mh(n) || Oh(n) || dh(n)))
                return !n.length;
            var t = zs(n);
            if (t == Gn || t == tt)
                return !n.size;
            if (Mi(n))
                return !Me(n).length;
            for (var r in n)
                if (bl.call(n, r))
                    return !1;
            return !0
        }
        function nc(n, t) {
            return Se(n, t)
        }
        function tc(n, t, r) {
            r = "function" == typeof r ? r : X;
            var e = r ? r(n, t) : X;
            return e === X ? Se(n, t, X, r) : !!e
        }
        function rc(n) {
            if (!cc(n))
                return !1;
            var t = we(n);
            return t == Zn || t == qn || "string" == typeof n.message && "string" == typeof n.name && !gc(n)
        }
        function ec(n) {
            return "number" == typeof n && Zl(n)
        }
        function uc(n) {
            if (!fc(n))
                return !1;
            var t = we(n);
            return t == Kn || t == Vn || t == Fn || t == Xn
        }
        function ic(n) {
            return "number" == typeof n && n == kc(n)
        }
        function oc(n) {
            return "number" == typeof n && n > -1 && n % 1 == 0 && n <= Wn
        }
        function fc(n) {
            var t = typeof n;
            return null != n && ("object" == t || "function" == t)
        }
        function cc(n) {
            return null != n && "object" == typeof n
        }
        function ac(n, t) {
            return n === t || Ce(n, t, ji(t))
        }
        function lc(n, t, r) {
            return r = "function" == typeof r ? r : X,
            Ce(n, t, ji(t), r)
        }
        function sc(n) {
            return vc(n) && n != +n
        }
        function hc(n) {
            if (Es(n))
                throw new fl(rn);
            return Ue(n)
        }
        function pc(n) {
            return null === n
        }
        function _c(n) {
            return null == n
        }
        function vc(n) {
            return "number" == typeof n || cc(n) && we(n) == Hn
        }
        function gc(n) {
            if (!cc(n) || we(n) != Yn)
                return !1;
            var t = El(n);
            if (null === t)
                return !0;
            var r = bl.call(t, "constructor") && t.constructor;
            return "function" == typeof r && r instanceof r && dl.call(r) == jl
        }
        function yc(n) {
            return ic(n) && n >= -Wn && n <= Wn
        }
        function dc(n) {
            return "string" == typeof n || !bh(n) && cc(n) && we(n) == rt
        }
        function bc(n) {
            return "symbol" == typeof n || cc(n) && we(n) == et
        }
        function wc(n) {
            return n === X
        }
        function mc(n) {
            return cc(n) && zs(n) == it
        }
        function xc(n) {
            return cc(n) && we(n) == ot
        }
        function jc(n) {
            if (!n)
                return [];
            if (Hf(n))
                return dc(n) ? G(n) : Tu(n);
            if (Ul && n[Ul])
                return D(n[Ul]());
            var t = zs(n);
            return (t == Gn ? M : t == tt ? P : ra)(n)
        }
        function Ac(n) {
            return n ? (n = Ic(n),
            n === Sn || n === -Sn ? (n < 0 ? -1 : 1) * Ln : n === n ? n : 0) : 0 === n ? n : 0
        }
        function kc(n) {
            var t = Ac(n)
              , r = t % 1;
            return t === t ? r ? t - r : t : 0
        }
        function Oc(n) {
            return n ? Mr(kc(n), 0, Un) : 0
        }
        function Ic(n) {
            if ("number" == typeof n)
                return n;
            if (bc(n))
                return Cn;
            if (fc(n)) {
                var t = "function" == typeof n.valueOf ? n.valueOf() : n;
                n = fc(t) ? t + "" : t
            }
            if ("string" != typeof n)
                return 0 === n ? n : +n;
            n = R(n);
            var r = qt.test(n);
            return r || Kt.test(n) ? Xr(n.slice(2), r ? 2 : 8) : Pt.test(n) ? Cn : +n
        }
        function Rc(n) {
            return $u(n, qc(n))
        }
        function zc(n) {
            return n ? Mr(kc(n), -Wn, Wn) : 0 === n ? n : 0
        }
        function Ec(n) {
            return null == n ? "" : vu(n)
        }
        function Sc(n, t) {
            var r = gs(n);
            return null == t ? r : Cr(r, t)
        }
        function Wc(n, t) {
            return v(n, mi(t, 3), ue)
        }
        function Lc(n, t) {
            return v(n, mi(t, 3), oe)
        }
        function Cc(n, t) {
            return null == n ? n : bs(n, mi(t, 3), qc)
        }
        function Uc(n, t) {
            return null == n ? n : ws(n, mi(t, 3), qc)
        }
        function Bc(n, t) {
            return n && ue(n, mi(t, 3))
        }
        function Tc(n, t) {
            return n && oe(n, mi(t, 3))
        }
        function $c(n) {
            return null == n ? [] : fe(n, Pc(n))
        }
        function Dc(n) {
            return null == n ? [] : fe(n, qc(n))
        }
        function Mc(n, t, r) {
            var e = null == n ? X : _e(n, t);
            return e === X ? r : e
        }
        function Fc(n, t) {
            return null != n && Ri(n, t, xe)
        }
        function Nc(n, t) {
            return null != n && Ri(n, t, je)
        }
        function Pc(n) {
            return Hf(n) ? Or(n) : Me(n)
        }
        function qc(n) {
            return Hf(n) ? Or(n, !0) : Fe(n)
        }
        function Zc(n, t) {
            var r = {};
            return t = mi(t, 3),
            ue(n, function(n, e, u) {
                Br(r, t(n, e, u), n)
            }),
            r
        }
        function Kc(n, t) {
            var r = {};
            return t = mi(t, 3),
            ue(n, function(n, e, u) {
                Br(r, e, t(n, e, u))
            }),
            r
        }
        function Vc(n, t) {
            return Gc(n, Uf(mi(t)))
        }
        function Gc(n, t) {
            if (null == n)
                return {};
            var r = c(di(n), function(n) {
                return [n]
            });
            return t = mi(t),
            Ye(n, r, function(n, r) {
                return t(n, r[0])
            })
        }
        function Hc(n, t, r) {
            t = ku(t, n);
            var e = -1
              , u = t.length;
            for (u || (u = 1,
            n = X); ++e < u; ) {
                var i = null == n ? X : n[no(t[e])];
                i === X && (e = u,
                i = r),
                n = uc(i) ? i.call(n) : i
            }
            return n
        }
        function Jc(n, t, r) {
            return null == n ? n : fu(n, t, r)
        }
        function Yc(n, t, r, e) {
            return e = "function" == typeof e ? e : X,
            null == n ? n : fu(n, t, r, e)
        }
        function Qc(n, t, e) {
            var u = bh(n)
              , i = u || mh(n) || Oh(n);
            if (t = mi(t, 4),
            null == e) {
                var o = n && n.constructor;
                e = i ? u ? new o : [] : fc(n) && uc(o) ? gs(El(n)) : {}
            }
            return (i ? r : ue)(n, function(n, r, u) {
                return t(e, n, r, u)
            }),
            e
        }
        function Xc(n, t) {
            return null == n || yu(n, t)
        }
        function na(n, t, r) {
            return null == n ? n : du(n, t, Au(r))
        }
        function ta(n, t, r, e) {
            return e = "function" == typeof e ? e : X,
            null == n ? n : du(n, t, Au(r), e)
        }
        function ra(n) {
            return null == n ? [] : E(n, Pc(n))
        }
        function ea(n) {
            return null == n ? [] : E(n, qc(n))
        }
        function ua(n, t, r) {
            return r === X && (r = t,
            t = X),
            r !== X && (r = Ic(r),
            r = r === r ? r : 0),
            t !== X && (t = Ic(t),
            t = t === t ? t : 0),
            Mr(Ic(n), t, r)
        }
        function ia(n, t, r) {
            return t = Ac(t),
            r === X ? (r = t,
            t = 0) : r = Ac(r),
            n = Ic(n),
            Ae(n, t, r)
        }
        function oa(n, t, r) {
            if (r && "boolean" != typeof r && Ui(n, t, r) && (t = r = X),
            r === X && ("boolean" == typeof t ? (r = t,
            t = X) : "boolean" == typeof n && (r = n,
            n = X)),
            n === X && t === X ? (n = 0,
            t = 1) : (n = Ac(n),
            t === X ? (t = n,
            n = 0) : t = Ac(t)),
            n > t) {
                var e = n;
                n = t,
                t = e
            }
            if (r || n % 1 || t % 1) {
                var u = Ql();
                return Hl(n + u * (t - n + Qr("1e-" + ((u + "").length - 1))), t)
            }
            return tu(n, t)
        }
        function fa(n) {
            return Qh(Ec(n).toLowerCase())
        }
        function ca(n) {
            return n = Ec(n),
            n && n.replace(Gt, ve).replace(Dr, "")
        }
        function aa(n, t, r) {
            n = Ec(n),
            t = vu(t);
            var e = n.length;
            r = r === X ? e : Mr(kc(r), 0, e);
            var u = r;
            return r -= t.length,
            r >= 0 && n.slice(r, u) == t
        }
        function la(n) {
            return n = Ec(n),
            n && At.test(n) ? n.replace(xt, ge) : n
        }
        function sa(n) {
            return n = Ec(n),
            n && Wt.test(n) ? n.replace(St, "\\$&") : n
        }
        function ha(n, t, r) {
            n = Ec(n),
            t = kc(t);
            var e = t ? V(n) : 0;
            if (!t || e >= t)
                return n;
            var u = (t - e) / 2;
            return ri(Nl(u), r) + n + ri(Fl(u), r)
        }
        function pa(n, t, r) {
            n = Ec(n),
            t = kc(t);
            var e = t ? V(n) : 0;
            return t && e < t ? n + ri(t - e, r) : n
        }
        function _a(n, t, r) {
            n = Ec(n),
            t = kc(t);
            var e = t ? V(n) : 0;
            return t && e < t ? ri(t - e, r) + n : n
        }
        function va(n, t, r) {
            return r || null == t ? t = 0 : t && (t = +t),
            Yl(Ec(n).replace(Lt, ""), t || 0)
        }
        function ga(n, t, r) {
            return t = (r ? Ui(n, t, r) : t === X) ? 1 : kc(t),
            eu(Ec(n), t)
        }
        function ya() {
            var n = arguments
              , t = Ec(n[0]);
            return n.length < 3 ? t : t.replace(n[1], n[2])
        }
        function da(n, t, r) {
            return r && "number" != typeof r && Ui(n, t, r) && (t = r = X),
            (r = r === X ? Un : r >>> 0) ? (n = Ec(n),
            n && ("string" == typeof t || null != t && !Ah(t)) && (t = vu(t),
            !t && T(n)) ? Ou(G(n), 0, r) : n.split(t, r)) : []
        }
        function ba(n, t, r) {
            return n = Ec(n),
            r = null == r ? 0 : Mr(kc(r), 0, n.length),
            t = vu(t),
            n.slice(r, r + t.length) == t
        }
        function wa(n, t, r) {
            var e = Z.templateSettings;
            r && Ui(n, t, r) && (t = X),
            n = Ec(n),
            t = Sh({}, t, e, li);
            var u, i, o = Sh({}, t.imports, e.imports, li), f = Pc(o), c = E(o, f), a = 0, l = t.interpolate || Ht, s = "__p += '", h = sl((t.escape || Ht).source + "|" + l.source + "|" + (l === It ? Ft : Ht).source + "|" + (t.evaluate || Ht).source + "|$", "g"), p = "//# sourceURL=" + (bl.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Zr + "]") + "\n";
            n.replace(h, function(t, r, e, o, f, c) {
                return e || (e = o),
                s += n.slice(a, c).replace(Jt, U),
                r && (u = !0,
                s += "' +\n__e(" + r + ") +\n'"),
                f && (i = !0,
                s += "';\n" + f + ";\n__p += '"),
                e && (s += "' +\n((__t = (" + e + ")) == null ? '' : __t) +\n'"),
                a = c + t.length,
                t
            }),
            s += "';\n";
            var _ = bl.call(t, "variable") && t.variable;
            if (_) {
                if (Dt.test(_))
                    throw new fl(un)
            } else
                s = "with (obj) {\n" + s + "\n}\n";
            s = (i ? s.replace(dt, "") : s).replace(bt, "$1").replace(wt, "$1;"),
            s = "function(" + (_ || "obj") + ") {\n" + (_ ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (u ? ", __e = _.escape" : "") + (i ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + s + "return __p\n}";
            var v = Xh(function() {
                return cl(f, p + "return " + s).apply(X, c)
            });
            if (v.source = s,
            rc(v))
                throw v;
            return v
        }
        function ma(n) {
            return Ec(n).toLowerCase()
        }
        function xa(n) {
            return Ec(n).toUpperCase()
        }
        function ja(n, t, r) {
            if (n = Ec(n),
            n && (r || t === X))
                return R(n);
            if (!n || !(t = vu(t)))
                return n;
            var e = G(n)
              , u = G(t);
            return Ou(e, W(e, u), L(e, u) + 1).join("")
        }
        function Aa(n, t, r) {
            if (n = Ec(n),
            n && (r || t === X))
                return n.slice(0, H(n) + 1);
            if (!n || !(t = vu(t)))
                return n;
            var e = G(n);
            return Ou(e, 0, L(e, G(t)) + 1).join("")
        }
        function ka(n, t, r) {
            if (n = Ec(n),
            n && (r || t === X))
                return n.replace(Lt, "");
            if (!n || !(t = vu(t)))
                return n;
            var e = G(n);
            return Ou(e, W(e, G(t))).join("")
        }
        function Oa(n, t) {
            var r = An
              , e = kn;
            if (fc(t)) {
                var u = "separator"in t ? t.separator : u;
                r = "length"in t ? kc(t.length) : r,
                e = "omission"in t ? vu(t.omission) : e
            }
            n = Ec(n);
            var i = n.length;
            if (T(n)) {
                var o = G(n);
                i = o.length
            }
            if (r >= i)
                return n;
            var f = r - V(e);
            if (f < 1)
                return e;
            var c = o ? Ou(o, 0, f).join("") : n.slice(0, f);
            if (u === X)
                return c + e;
            if (o && (f += c.length - f),
            Ah(u)) {
                if (n.slice(f).search(u)) {
                    var a, l = c;
                    for (u.global || (u = sl(u.source, Ec(Nt.exec(u)) + "g")),
                    u.lastIndex = 0; a = u.exec(l); )
                        var s = a.index;
                    c = c.slice(0, s === X ? f : s)
                }
            } else if (n.indexOf(vu(u), f) != f) {
                var h = c.lastIndexOf(u);
                h > -1 && (c = c.slice(0, h))
            }
            return c + e
        }
        function Ia(n) {
            return n = Ec(n),
            n && jt.test(n) ? n.replace(mt, ye) : n
        }
        function Ra(n, t, r) {
            return n = Ec(n),
            t = r ? X : t,
            t === X ? $(n) ? Q(n) : _(n) : n.match(t) || []
        }
        function za(t) {
            var r = null == t ? 0 : t.length
              , e = mi();
            return t = r ? c(t, function(n) {
                if ("function" != typeof n[1])
                    throw new pl(en);
                return [e(n[0]), n[1]]
            }) : [],
            uu(function(e) {
                for (var u = -1; ++u < r; ) {
                    var i = t[u];
                    if (n(i[0], this, e))
                        return n(i[1], this, e)
                }
            })
        }
        function Ea(n) {
            return Nr(Fr(n, an))
        }
        function Sa(n) {
            return function() {
                return n
            }
        }
        function Wa(n, t) {
            return null == n || n !== n ? t : n
        }
        function La(n) {
            return n
        }
        function Ca(n) {
            return De("function" == typeof n ? n : Fr(n, an))
        }
        function Ua(n) {
            return qe(Fr(n, an))
        }
        function Ba(n, t) {
            return Ze(n, Fr(t, an))
        }
        function Ta(n, t, e) {
            var u = Pc(t)
              , i = fe(t, u);
            null != e || fc(t) && (i.length || !u.length) || (e = t,
            t = n,
            n = this,
            i = fe(t, Pc(t)));
            var o = !(fc(e) && "chain"in e && !e.chain)
              , f = uc(n);
            return r(i, function(r) {
                var e = t[r];
                n[r] = e,
                f && (n.prototype[r] = function() {
                    var t = this.__chain__;
                    if (o || t) {
                        var r = n(this.__wrapped__);
                        return (r.__actions__ = Tu(this.__actions__)).push({
                            func: e,
                            args: arguments,
                            thisArg: n
                        }),
                        r.__chain__ = t,
                        r
                    }
                    return e.apply(n, a([this.value()], arguments))
                }
                )
            }),
            n
        }
        function $a() {
            return re._ === this && (re._ = Al),
            this
        }
        function Da() {}
        function Ma(n) {
            return n = kc(n),
            uu(function(t) {
                return Ge(t, n)
            })
        }
        function Fa(n) {
            return Bi(n) ? m(no(n)) : Qe(n)
        }
        function Na(n) {
            return function(t) {
                return null == n ? X : _e(n, t)
            }
        }
        function Pa() {
            return []
        }
        function qa() {
            return !1
        }
        function Za() {
            return {}
        }
        function Ka() {
            return ""
        }
        function Va() {
            return !0
        }
        function Ga(n, t) {
            if (n = kc(n),
            n < 1 || n > Wn)
                return [];
            var r = Un
              , e = Hl(n, Un);
            t = mi(t),
            n -= Un;
            for (var u = O(e, t); ++r < n; )
                t(r);
            return u
        }
        function Ha(n) {
            return bh(n) ? c(n, no) : bc(n) ? [n] : Tu(Cs(Ec(n)))
        }
        function Ja(n) {
            var t = ++wl;
            return Ec(n) + t
        }
        function Ya(n) {
            return n && n.length ? Yr(n, La, me) : X
        }
        function Qa(n, t) {
            return n && n.length ? Yr(n, mi(t, 2), me) : X
        }
        function Xa(n) {
            return w(n, La)
        }
        function nl(n, t) {
            return w(n, mi(t, 2))
        }
        function tl(n) {
            return n && n.length ? Yr(n, La, Ne) : X
        }
        function rl(n, t) {
            return n && n.length ? Yr(n, mi(t, 2), Ne) : X
        }
        function el(n) {
            return n && n.length ? k(n, La) : 0
        }
        function ul(n, t) {
            return n && n.length ? k(n, mi(t, 2)) : 0
        }
        x = null == x ? re : be.defaults(re.Object(), x, be.pick(re, qr));
        var il = x.Array
          , ol = x.Date
          , fl = x.Error
          , cl = x.Function
          , al = x.Math
          , ll = x.Object
          , sl = x.RegExp
          , hl = x.String
          , pl = x.TypeError
          , _l = il.prototype
          , vl = cl.prototype
          , gl = ll.prototype
          , yl = x["__core-js_shared__"]
          , dl = vl.toString
          , bl = gl.hasOwnProperty
          , wl = 0
          , ml = function() {
            var n = /[^.]+$/.exec(yl && yl.keys && yl.keys.IE_PROTO || "");
            return n ? "Symbol(src)_1." + n : ""
        }()
          , xl = gl.toString
          , jl = dl.call(ll)
          , Al = re._
          , kl = sl("^" + dl.call(bl).replace(St, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
          , Ol = ie ? x.Buffer : X
          , Il = x.Symbol
          , Rl = x.Uint8Array
          , zl = Ol ? Ol.allocUnsafe : X
          , El = F(ll.getPrototypeOf, ll)
          , Sl = ll.create
          , Wl = gl.propertyIsEnumerable
          , Ll = _l.splice
          , Cl = Il ? Il.isConcatSpreadable : X
          , Ul = Il ? Il.iterator : X
          , Bl = Il ? Il.toStringTag : X
          , Tl = function() {
            try {
                var n = Ai(ll, "defineProperty");
                return n({}, "", {}),
                n
            } catch (n) {}
        }()
          , $l = x.clearTimeout !== re.clearTimeout && x.clearTimeout
          , Dl = ol && ol.now !== re.Date.now && ol.now
          , Ml = x.setTimeout !== re.setTimeout && x.setTimeout
          , Fl = al.ceil
          , Nl = al.floor
          , Pl = ll.getOwnPropertySymbols
          , ql = Ol ? Ol.isBuffer : X
          , Zl = x.isFinite
          , Kl = _l.join
          , Vl = F(ll.keys, ll)
          , Gl = al.max
          , Hl = al.min
          , Jl = ol.now
          , Yl = x.parseInt
          , Ql = al.random
          , Xl = _l.reverse
          , ns = Ai(x, "DataView")
          , ts = Ai(x, "Map")
          , rs = Ai(x, "Promise")
          , es = Ai(x, "Set")
          , us = Ai(x, "WeakMap")
          , is = Ai(ll, "create")
          , os = us && new us
          , fs = {}
          , cs = to(ns)
          , as = to(ts)
          , ls = to(rs)
          , ss = to(es)
          , hs = to(us)
          , ps = Il ? Il.prototype : X
          , _s = ps ? ps.valueOf : X
          , vs = ps ? ps.toString : X
          , gs = function() {
            function n() {}
            return function(t) {
                if (!fc(t))
                    return {};
                if (Sl)
                    return Sl(t);
                n.prototype = t;
                var r = new n;
                return n.prototype = X,
                r
            }
        }();
        Z.templateSettings = {
            escape: kt,
            evaluate: Ot,
            interpolate: It,
            variable: "",
            imports: {
                _: Z
            }
        },
        Z.prototype = J.prototype,
        Z.prototype.constructor = Z,
        Y.prototype = gs(J.prototype),
        Y.prototype.constructor = Y,
        Ct.prototype = gs(J.prototype),
        Ct.prototype.constructor = Ct,
        Xt.prototype.clear = nr,
        Xt.prototype.delete = tr,
        Xt.prototype.get = rr,
        Xt.prototype.has = er,
        Xt.prototype.set = ur,
        ir.prototype.clear = or,
        ir.prototype.delete = fr,
        ir.prototype.get = cr,
        ir.prototype.has = ar,
        ir.prototype.set = lr,
        sr.prototype.clear = hr,
        sr.prototype.delete = pr,
        sr.prototype.get = _r,
        sr.prototype.has = vr,
        sr.prototype.set = gr,
        yr.prototype.add = yr.prototype.push = dr,
        yr.prototype.has = br,
        wr.prototype.clear = mr,
        wr.prototype.delete = xr,
        wr.prototype.get = jr,
        wr.prototype.has = Ar,
        wr.prototype.set = kr;
        var ys = Pu(ue)
          , ds = Pu(oe, !0)
          , bs = qu()
          , ws = qu(!0)
          , ms = os ? function(n, t) {
            return os.set(n, t),
            n
        }
        : La
          , xs = Tl ? function(n, t) {
            return Tl(n, "toString", {
                configurable: !0,
                enumerable: !1,
                value: Sa(t),
                writable: !0
            })
        }
        : La
          , js = uu
          , As = $l || function(n) {
            return re.clearTimeout(n)
        }
          , ks = es && 1 / P(new es([, -0]))[1] == Sn ? function(n) {
            return new es(n)
        }
        : Da
          , Os = os ? function(n) {
            return os.get(n)
        }
        : Da
          , Is = Pl ? function(n) {
            return null == n ? [] : (n = ll(n),
            i(Pl(n), function(t) {
                return Wl.call(n, t)
            }))
        }
        : Pa
          , Rs = Pl ? function(n) {
            for (var t = []; n; )
                a(t, Is(n)),
                n = El(n);
            return t
        }
        : Pa
          , zs = we;
        (ns && zs(new ns(new ArrayBuffer(1))) != ct || ts && zs(new ts) != Gn || rs && zs(rs.resolve()) != Qn || es && zs(new es) != tt || us && zs(new us) != it) && (zs = function(n) {
            var t = we(n)
              , r = t == Yn ? n.constructor : X
              , e = r ? to(r) : "";
            if (e)
                switch (e) {
                case cs:
                    return ct;
                case as:
                    return Gn;
                case ls:
                    return Qn;
                case ss:
                    return tt;
                case hs:
                    return it
                }
            return t
        }
        );
        var Es = yl ? uc : qa
          , Ss = Qi(ms)
          , Ws = Ml || function(n, t) {
            return re.setTimeout(n, t)
        }
          , Ls = Qi(xs)
          , Cs = Pi(function(n) {
            var t = [];
            return 46 === n.charCodeAt(0) && t.push(""),
            n.replace(Et, function(n, r, e, u) {
                t.push(e ? u.replace(Mt, "$1") : r || n)
            }),
            t
        })
          , Us = uu(function(n, t) {
            return Jf(n) ? Hr(n, ee(t, 1, Jf, !0)) : []
        })
          , Bs = uu(function(n, t) {
            var r = jo(t);
            return Jf(r) && (r = X),
            Jf(n) ? Hr(n, ee(t, 1, Jf, !0), mi(r, 2)) : []
        })
          , Ts = uu(function(n, t) {
            var r = jo(t);
            return Jf(r) && (r = X),
            Jf(n) ? Hr(n, ee(t, 1, Jf, !0), X, r) : []
        })
          , $s = uu(function(n) {
            var t = c(n, ju);
            return t.length && t[0] === n[0] ? ke(t) : []
        })
          , Ds = uu(function(n) {
            var t = jo(n)
              , r = c(n, ju);
            return t === jo(r) ? t = X : r.pop(),
            r.length && r[0] === n[0] ? ke(r, mi(t, 2)) : []
        })
          , Ms = uu(function(n) {
            var t = jo(n)
              , r = c(n, ju);
            return t = "function" == typeof t ? t : X,
            t && r.pop(),
            r.length && r[0] === n[0] ? ke(r, X, t) : []
        })
          , Fs = uu(Oo)
          , Ns = gi(function(n, t) {
            var r = null == n ? 0 : n.length
              , e = Tr(n, t);
            return nu(n, c(t, function(n) {
                return Ci(n, r) ? +n : n
            }).sort(Lu)),
            e
        })
          , Ps = uu(function(n) {
            return gu(ee(n, 1, Jf, !0))
        })
          , qs = uu(function(n) {
            var t = jo(n);
            return Jf(t) && (t = X),
            gu(ee(n, 1, Jf, !0), mi(t, 2))
        })
          , Zs = uu(function(n) {
            var t = jo(n);
            return t = "function" == typeof t ? t : X,
            gu(ee(n, 1, Jf, !0), X, t)
        })
          , Ks = uu(function(n, t) {
            return Jf(n) ? Hr(n, t) : []
        })
          , Vs = uu(function(n) {
            return mu(i(n, Jf))
        })
          , Gs = uu(function(n) {
            var t = jo(n);
            return Jf(t) && (t = X),
            mu(i(n, Jf), mi(t, 2))
        })
          , Hs = uu(function(n) {
            var t = jo(n);
            return t = "function" == typeof t ? t : X,
            mu(i(n, Jf), X, t)
        })
          , Js = uu(Go)
          , Ys = uu(function(n) {
            var t = n.length
              , r = t > 1 ? n[t - 1] : X;
            return r = "function" == typeof r ? (n.pop(),
            r) : X,
            Ho(n, r)
        })
          , Qs = gi(function(n) {
            var t = n.length
              , r = t ? n[0] : 0
              , e = this.__wrapped__
              , u = function(t) {
                return Tr(t, n)
            };
            return !(t > 1 || this.__actions__.length) && e instanceof Ct && Ci(r) ? (e = e.slice(r, +r + (t ? 1 : 0)),
            e.__actions__.push({
                func: nf,
                args: [u],
                thisArg: X
            }),
            new Y(e,this.__chain__).thru(function(n) {
                return t && !n.length && n.push(X),
                n
            })) : this.thru(u)
        })
          , Xs = Fu(function(n, t, r) {
            bl.call(n, r) ? ++n[r] : Br(n, r, 1)
        })
          , nh = Ju(ho)
          , th = Ju(po)
          , rh = Fu(function(n, t, r) {
            bl.call(n, r) ? n[r].push(t) : Br(n, r, [t])
        })
          , eh = uu(function(t, r, e) {
            var u = -1
              , i = "function" == typeof r
              , o = Hf(t) ? il(t.length) : [];
            return ys(t, function(t) {
                o[++u] = i ? n(r, t, e) : Ie(t, r, e)
            }),
            o
        })
          , uh = Fu(function(n, t, r) {
            Br(n, r, t)
        })
          , ih = Fu(function(n, t, r) {
            n[r ? 0 : 1].push(t)
        }, function() {
            return [[], []]
        })
          , oh = uu(function(n, t) {
            if (null == n)
                return [];
            var r = t.length;
            return r > 1 && Ui(n, t[0], t[1]) ? t = [] : r > 2 && Ui(t[0], t[1], t[2]) && (t = [t[0]]),
            He(n, ee(t, 1), [])
        })
          , fh = Dl || function() {
            return re.Date.now()
        }
          , ch = uu(function(n, t, r) {
            var e = _n;
            if (r.length) {
                var u = N(r, wi(ch));
                e |= bn
            }
            return ai(n, e, t, r, u)
        })
          , ah = uu(function(n, t, r) {
            var e = _n | vn;
            if (r.length) {
                var u = N(r, wi(ah));
                e |= bn
            }
            return ai(t, e, n, r, u)
        })
          , lh = uu(function(n, t) {
            return Gr(n, 1, t)
        })
          , sh = uu(function(n, t, r) {
            return Gr(n, Ic(t) || 0, r)
        });
        Cf.Cache = sr;
        var hh = js(function(t, r) {
            r = 1 == r.length && bh(r[0]) ? c(r[0], z(mi())) : c(ee(r, 1), z(mi()));
            var e = r.length;
            return uu(function(u) {
                for (var i = -1, o = Hl(u.length, e); ++i < o; )
                    u[i] = r[i].call(this, u[i]);
                return n(t, this, u)
            })
        })
          , ph = uu(function(n, t) {
            return ai(n, bn, X, t, N(t, wi(ph)))
        })
          , _h = uu(function(n, t) {
            return ai(n, wn, X, t, N(t, wi(_h)))
        })
          , vh = gi(function(n, t) {
            return ai(n, xn, X, X, X, t)
        })
          , gh = ii(me)
          , yh = ii(function(n, t) {
            return n >= t
        })
          , dh = Re(function() {
            return arguments
        }()) ? Re : function(n) {
            return cc(n) && bl.call(n, "callee") && !Wl.call(n, "callee")
        }
          , bh = il.isArray
          , wh = ce ? z(ce) : ze
          , mh = ql || qa
          , xh = ae ? z(ae) : Ee
          , jh = le ? z(le) : Le
          , Ah = se ? z(se) : Be
          , kh = he ? z(he) : Te
          , Oh = pe ? z(pe) : $e
          , Ih = ii(Ne)
          , Rh = ii(function(n, t) {
            return n <= t
        })
          , zh = Nu(function(n, t) {
            if (Mi(t) || Hf(t))
                return $u(t, Pc(t), n),
                X;
            for (var r in t)
                bl.call(t, r) && Sr(n, r, t[r])
        })
          , Eh = Nu(function(n, t) {
            $u(t, qc(t), n)
        })
          , Sh = Nu(function(n, t, r, e) {
            $u(t, qc(t), n, e)
        })
          , Wh = Nu(function(n, t, r, e) {
            $u(t, Pc(t), n, e)
        })
          , Lh = gi(Tr)
          , Ch = uu(function(n, t) {
            n = ll(n);
            var r = -1
              , e = t.length
              , u = e > 2 ? t[2] : X;
            for (u && Ui(t[0], t[1], u) && (e = 1); ++r < e; )
                for (var i = t[r], o = qc(i), f = -1, c = o.length; ++f < c; ) {
                    var a = o[f]
                      , l = n[a];
                    (l === X || Gf(l, gl[a]) && !bl.call(n, a)) && (n[a] = i[a])
                }
            return n
        })
          , Uh = uu(function(t) {
            return t.push(X, si),
            n(Mh, X, t)
        })
          , Bh = Xu(function(n, t, r) {
            null != t && "function" != typeof t.toString && (t = xl.call(t)),
            n[t] = r
        }, Sa(La))
          , Th = Xu(function(n, t, r) {
            null != t && "function" != typeof t.toString && (t = xl.call(t)),
            bl.call(n, t) ? n[t].push(r) : n[t] = [r]
        }, mi)
          , $h = uu(Ie)
          , Dh = Nu(function(n, t, r) {
            Ke(n, t, r)
        })
          , Mh = Nu(function(n, t, r, e) {
            Ke(n, t, r, e)
        })
          , Fh = gi(function(n, t) {
            var r = {};
            if (null == n)
                return r;
            var e = !1;
            t = c(t, function(t) {
                return t = ku(t, n),
                e || (e = t.length > 1),
                t
            }),
            $u(n, di(n), r),
            e && (r = Fr(r, an | ln | sn, hi));
            for (var u = t.length; u--; )
                yu(r, t[u]);
            return r
        })
          , Nh = gi(function(n, t) {
            return null == n ? {} : Je(n, t)
        })
          , Ph = ci(Pc)
          , qh = ci(qc)
          , Zh = Vu(function(n, t, r) {
            return t = t.toLowerCase(),
            n + (r ? fa(t) : t)
        })
          , Kh = Vu(function(n, t, r) {
            return n + (r ? "-" : "") + t.toLowerCase()
        })
          , Vh = Vu(function(n, t, r) {
            return n + (r ? " " : "") + t.toLowerCase()
        })
          , Gh = Ku("toLowerCase")
          , Hh = Vu(function(n, t, r) {
            return n + (r ? "_" : "") + t.toLowerCase()
        })
          , Jh = Vu(function(n, t, r) {
            return n + (r ? " " : "") + Qh(t)
        })
          , Yh = Vu(function(n, t, r) {
            return n + (r ? " " : "") + t.toUpperCase()
        })
          , Qh = Ku("toUpperCase")
          , Xh = uu(function(t, r) {
            try {
                return n(t, X, r)
            } catch (n) {
                return rc(n) ? n : new fl(n)
            }
        })
          , np = gi(function(n, t) {
            return r(t, function(t) {
                t = no(t),
                Br(n, t, ch(n[t], n))
            }),
            n
        })
          , tp = Yu()
          , rp = Yu(!0)
          , ep = uu(function(n, t) {
            return function(r) {
                return Ie(r, n, t)
            }
        })
          , up = uu(function(n, t) {
            return function(r) {
                return Ie(n, r, t)
            }
        })
          , ip = ti(c)
          , op = ti(u)
          , fp = ti(h)
          , cp = ui()
          , ap = ui(!0)
          , lp = ni(function(n, t) {
            return n + t
        }, 0)
          , sp = fi("ceil")
          , hp = ni(function(n, t) {
            return n / t
        }, 1)
          , pp = fi("floor")
          , _p = ni(function(n, t) {
            return n * t
        }, 1)
          , vp = fi("round")
          , gp = ni(function(n, t) {
            return n - t
        }, 0);
        return Z.after = If,
        Z.ary = Rf,
        Z.assign = zh,
        Z.assignIn = Eh,
        Z.assignInWith = Sh,
        Z.assignWith = Wh,
        Z.at = Lh,
        Z.before = zf,
        Z.bind = ch,
        Z.bindAll = np,
        Z.bindKey = ah,
        Z.castArray = Nf,
        Z.chain = Qo,
        Z.chunk = uo,
        Z.compact = io,
        Z.concat = oo,
        Z.cond = za,
        Z.conforms = Ea,
        Z.constant = Sa,
        Z.countBy = Xs,
        Z.create = Sc,
        Z.curry = Ef,
        Z.curryRight = Sf,
        Z.debounce = Wf,
        Z.defaults = Ch,
        Z.defaultsDeep = Uh,
        Z.defer = lh,
        Z.delay = sh,
        Z.difference = Us,
        Z.differenceBy = Bs,
        Z.differenceWith = Ts,
        Z.drop = fo,
        Z.dropRight = co,
        Z.dropRightWhile = ao,
        Z.dropWhile = lo,
        Z.fill = so,
        Z.filter = lf,
        Z.flatMap = sf,
        Z.flatMapDeep = hf,
        Z.flatMapDepth = pf,
        Z.flatten = _o,
        Z.flattenDeep = vo,
        Z.flattenDepth = go,
        Z.flip = Lf,
        Z.flow = tp,
        Z.flowRight = rp,
        Z.fromPairs = yo,
        Z.functions = $c,
        Z.functionsIn = Dc,
        Z.groupBy = rh,
        Z.initial = mo,
        Z.intersection = $s,
        Z.intersectionBy = Ds,
        Z.intersectionWith = Ms,
        Z.invert = Bh,
        Z.invertBy = Th,
        Z.invokeMap = eh,
        Z.iteratee = Ca,
        Z.keyBy = uh,
        Z.keys = Pc,
        Z.keysIn = qc,
        Z.map = yf,
        Z.mapKeys = Zc,
        Z.mapValues = Kc,
        Z.matches = Ua,
        Z.matchesProperty = Ba,
        Z.memoize = Cf,
        Z.merge = Dh,
        Z.mergeWith = Mh,
        Z.method = ep,
        Z.methodOf = up,
        Z.mixin = Ta,
        Z.negate = Uf,
        Z.nthArg = Ma,
        Z.omit = Fh,
        Z.omitBy = Vc,
        Z.once = Bf,
        Z.orderBy = df,
        Z.over = ip,
        Z.overArgs = hh,
        Z.overEvery = op,
        Z.overSome = fp,
        Z.partial = ph,
        Z.partialRight = _h,
        Z.partition = ih,
        Z.pick = Nh,
        Z.pickBy = Gc,
        Z.property = Fa,
        Z.propertyOf = Na,
        Z.pull = Fs,
        Z.pullAll = Oo,
        Z.pullAllBy = Io,
        Z.pullAllWith = Ro,
        Z.pullAt = Ns,
        Z.range = cp,
        Z.rangeRight = ap,
        Z.rearg = vh,
        Z.reject = mf,
        Z.remove = zo,
        Z.rest = Tf,
        Z.reverse = Eo,
        Z.sampleSize = jf,
        Z.set = Jc,
        Z.setWith = Yc,
        Z.shuffle = Af,
        Z.slice = So,
        Z.sortBy = oh,
        Z.sortedUniq = $o,
        Z.sortedUniqBy = Do,
        Z.split = da,
        Z.spread = $f,
        Z.tail = Mo,
        Z.take = Fo,
        Z.takeRight = No,
        Z.takeRightWhile = Po,
        Z.takeWhile = qo,
        Z.tap = Xo,
        Z.throttle = Df,
        Z.thru = nf,
        Z.toArray = jc,
        Z.toPairs = Ph,
        Z.toPairsIn = qh,
        Z.toPath = Ha,
        Z.toPlainObject = Rc,
        Z.transform = Qc,
        Z.unary = Mf,
        Z.union = Ps,
        Z.unionBy = qs,
        Z.unionWith = Zs,
        Z.uniq = Zo,
        Z.uniqBy = Ko,
        Z.uniqWith = Vo,
        Z.unset = Xc,
        Z.unzip = Go,
        Z.unzipWith = Ho,
        Z.update = na,
        Z.updateWith = ta,
        Z.values = ra,
        Z.valuesIn = ea,
        Z.without = Ks,
        Z.words = Ra,
        Z.wrap = Ff,
        Z.xor = Vs,
        Z.xorBy = Gs,
        Z.xorWith = Hs,
        Z.zip = Js,
        Z.zipObject = Jo,
        Z.zipObjectDeep = Yo,
        Z.zipWith = Ys,
        Z.entries = Ph,
        Z.entriesIn = qh,
        Z.extend = Eh,
        Z.extendWith = Sh,
        Ta(Z, Z),
        Z.add = lp,
        Z.attempt = Xh,
        Z.camelCase = Zh,
        Z.capitalize = fa,
        Z.ceil = sp,
        Z.clamp = ua,
        Z.clone = Pf,
        Z.cloneDeep = Zf,
        Z.cloneDeepWith = Kf,
        Z.cloneWith = qf,
        Z.conformsTo = Vf,
        Z.deburr = ca,
        Z.defaultTo = Wa,
        Z.divide = hp,
        Z.endsWith = aa,
        Z.eq = Gf,
        Z.escape = la,
        Z.escapeRegExp = sa,
        Z.every = af,
        Z.find = nh,
        Z.findIndex = ho,
        Z.findKey = Wc,
        Z.findLast = th,
        Z.findLastIndex = po,
        Z.findLastKey = Lc,
        Z.floor = pp,
        Z.forEach = _f,
        Z.forEachRight = vf,
        Z.forIn = Cc,
        Z.forInRight = Uc,
        Z.forOwn = Bc,
        Z.forOwnRight = Tc,
        Z.get = Mc,
        Z.gt = gh,
        Z.gte = yh,
        Z.has = Fc,
        Z.hasIn = Nc,
        Z.head = bo,
        Z.identity = La,
        Z.includes = gf,
        Z.indexOf = wo,
        Z.inRange = ia,
        Z.invoke = $h,
        Z.isArguments = dh,
        Z.isArray = bh,
        Z.isArrayBuffer = wh,
        Z.isArrayLike = Hf,
        Z.isArrayLikeObject = Jf,
        Z.isBoolean = Yf,
        Z.isBuffer = mh,
        Z.isDate = xh,
        Z.isElement = Qf,
        Z.isEmpty = Xf,
        Z.isEqual = nc,
        Z.isEqualWith = tc,
        Z.isError = rc,
        Z.isFinite = ec,
        Z.isFunction = uc,
        Z.isInteger = ic,
        Z.isLength = oc,
        Z.isMap = jh,
        Z.isMatch = ac,
        Z.isMatchWith = lc,
        Z.isNaN = sc,
        Z.isNative = hc,
        Z.isNil = _c,
        Z.isNull = pc,
        Z.isNumber = vc,
        Z.isObject = fc,
        Z.isObjectLike = cc,
        Z.isPlainObject = gc,
        Z.isRegExp = Ah,
        Z.isSafeInteger = yc,
        Z.isSet = kh,
        Z.isString = dc,
        Z.isSymbol = bc,
        Z.isTypedArray = Oh,
        Z.isUndefined = wc,
        Z.isWeakMap = mc,
        Z.isWeakSet = xc,
        Z.join = xo,
        Z.kebabCase = Kh,
        Z.last = jo,
        Z.lastIndexOf = Ao,
        Z.lowerCase = Vh,
        Z.lowerFirst = Gh,
        Z.lt = Ih,
        Z.lte = Rh,
        Z.max = Ya,
        Z.maxBy = Qa,
        Z.mean = Xa,
        Z.meanBy = nl,
        Z.min = tl,
        Z.minBy = rl,
        Z.stubArray = Pa,
        Z.stubFalse = qa,
        Z.stubObject = Za,
        Z.stubString = Ka,
        Z.stubTrue = Va,
        Z.multiply = _p,
        Z.nth = ko,
        Z.noConflict = $a,
        Z.noop = Da,
        Z.now = fh,
        Z.pad = ha,
        Z.padEnd = pa,
        Z.padStart = _a,
        Z.parseInt = va,
        Z.random = oa,
        Z.reduce = bf,
        Z.reduceRight = wf,
        Z.repeat = ga,
        Z.replace = ya,
        Z.result = Hc,
        Z.round = vp,
        Z.runInContext = p,
        Z.sample = xf,
        Z.size = kf,
        Z.snakeCase = Hh,
        Z.some = Of,
        Z.sortedIndex = Wo,
        Z.sortedIndexBy = Lo,
        Z.sortedIndexOf = Co,
        Z.sortedLastIndex = Uo,
        Z.sortedLastIndexBy = Bo,
        Z.sortedLastIndexOf = To,
        Z.startCase = Jh,
        Z.startsWith = ba,
        Z.subtract = gp,
        Z.sum = el,
        Z.sumBy = ul,
        Z.template = wa,
        Z.times = Ga,
        Z.toFinite = Ac,
        Z.toInteger = kc,
        Z.toLength = Oc,
        Z.toLower = ma,
        Z.toNumber = Ic,
        Z.toSafeInteger = zc,
        Z.toString = Ec,
        Z.toUpper = xa,
        Z.trim = ja,
        Z.trimEnd = Aa,
        Z.trimStart = ka,
        Z.truncate = Oa,
        Z.unescape = Ia,
        Z.uniqueId = Ja,
        Z.upperCase = Yh,
        Z.upperFirst = Qh,
        Z.each = _f,
        Z.eachRight = vf,
        Z.first = bo,
        Ta(Z, function() {
            var n = {};
            return ue(Z, function(t, r) {
                bl.call(Z.prototype, r) || (n[r] = t)
            }),
            n
        }(), {
            chain: !1
        }),
        Z.VERSION = nn,
        r(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n) {
            Z[n].placeholder = Z
        }),
        r(["drop", "take"], function(n, t) {
            Ct.prototype[n] = function(r) {
                r = r === X ? 1 : Gl(kc(r), 0);
                var e = this.__filtered__ && !t ? new Ct(this) : this.clone();
                return e.__filtered__ ? e.__takeCount__ = Hl(r, e.__takeCount__) : e.__views__.push({
                    size: Hl(r, Un),
                    type: n + (e.__dir__ < 0 ? "Right" : "")
                }),
                e
            }
            ,
            Ct.prototype[n + "Right"] = function(t) {
                return this.reverse()[n](t).reverse()
            }
        }),
        r(["filter", "map", "takeWhile"], function(n, t) {
            var r = t + 1
              , e = r == Rn || r == En;
            Ct.prototype[n] = function(n) {
                var t = this.clone();
                return t.__iteratees__.push({
                    iteratee: mi(n, 3),
                    type: r
                }),
                t.__filtered__ = t.__filtered__ || e,
                t
            }
        }),
        r(["head", "last"], function(n, t) {
            var r = "take" + (t ? "Right" : "");
            Ct.prototype[n] = function() {
                return this[r](1).value()[0]
            }
        }),
        r(["initial", "tail"], function(n, t) {
            var r = "drop" + (t ? "" : "Right");
            Ct.prototype[n] = function() {
                return this.__filtered__ ? new Ct(this) : this[r](1)
            }
        }),
        Ct.prototype.compact = function() {
            return this.filter(La)
        }
        ,
        Ct.prototype.find = function(n) {
            return this.filter(n).head()
        }
        ,
        Ct.prototype.findLast = function(n) {
            return this.reverse().find(n)
        }
        ,
        Ct.prototype.invokeMap = uu(function(n, t) {
            return "function" == typeof n ? new Ct(this) : this.map(function(r) {
                return Ie(r, n, t)
            })
        }),
        Ct.prototype.reject = function(n) {
            return this.filter(Uf(mi(n)))
        }
        ,
        Ct.prototype.slice = function(n, t) {
            n = kc(n);
            var r = this;
            return r.__filtered__ && (n > 0 || t < 0) ? new Ct(r) : (n < 0 ? r = r.takeRight(-n) : n && (r = r.drop(n)),
            t !== X && (t = kc(t),
            r = t < 0 ? r.dropRight(-t) : r.take(t - n)),
            r)
        }
        ,
        Ct.prototype.takeRightWhile = function(n) {
            return this.reverse().takeWhile(n).reverse()
        }
        ,
        Ct.prototype.toArray = function() {
            return this.take(Un)
        }
        ,
        ue(Ct.prototype, function(n, t) {
            var r = /^(?:filter|find|map|reject)|While$/.test(t)
              , e = /^(?:head|last)$/.test(t)
              , u = Z[e ? "take" + ("last" == t ? "Right" : "") : t]
              , i = e || /^find/.test(t);
            u && (Z.prototype[t] = function() {
                var t = this.__wrapped__
                  , o = e ? [1] : arguments
                  , f = t instanceof Ct
                  , c = o[0]
                  , l = f || bh(t)
                  , s = function(n) {
                    var t = u.apply(Z, a([n], o));
                    return e && h ? t[0] : t
                };
                l && r && "function" == typeof c && 1 != c.length && (f = l = !1);
                var h = this.__chain__
                  , p = !!this.__actions__.length
                  , _ = i && !h
                  , v = f && !p;
                if (!i && l) {
                    t = v ? t : new Ct(this);
                    var g = n.apply(t, o);
                    return g.__actions__.push({
                        func: nf,
                        args: [s],
                        thisArg: X
                    }),
                    new Y(g,h)
                }
                return _ && v ? n.apply(this, o) : (g = this.thru(s),
                _ ? e ? g.value()[0] : g.value() : g)
            }
            )
        }),
        r(["pop", "push", "shift", "sort", "splice", "unshift"], function(n) {
            var t = _l[n]
              , r = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru"
              , e = /^(?:pop|shift)$/.test(n);
            Z.prototype[n] = function() {
                var n = arguments;
                if (e && !this.__chain__) {
                    var u = this.value();
                    return t.apply(bh(u) ? u : [], n)
                }
                return this[r](function(r) {
                    return t.apply(bh(r) ? r : [], n)
                })
            }
        }),
        ue(Ct.prototype, function(n, t) {
            var r = Z[t];
            if (r) {
                var e = r.name + "";
                bl.call(fs, e) || (fs[e] = []),
                fs[e].push({
                    name: t,
                    func: r
                })
            }
        }),
        fs[Qu(X, vn).name] = [{
            name: "wrapper",
            func: X
        }],
        Ct.prototype.clone = $t,
        Ct.prototype.reverse = Yt,
        Ct.prototype.value = Qt,
        Z.prototype.at = Qs,
        Z.prototype.chain = tf,
        Z.prototype.commit = rf,
        Z.prototype.next = ef,
        Z.prototype.plant = of,
        Z.prototype.reverse = ff,
        Z.prototype.toJSON = Z.prototype.valueOf = Z.prototype.value = cf,
        Z.prototype.first = Z.prototype.head,
        Ul && (Z.prototype[Ul] = uf),
        Z
    }
      , be = de();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (re._ = be,
    define(function() {
        return be
    })) : ue ? ((ue.exports = be)._ = be,
    ee._ = be) : re._ = be
}
).call(this);
!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("scrollMonitor", [], e) : "object" == typeof exports ? exports.scrollMonitor = e() : t.scrollMonitor = e()
}(this, function() {
    return function(t) {
        function e(o) {
            if (i[o])
                return i[o].exports;
            var s = i[o] = {
                exports: {},
                id: o,
                loaded: !1
            };
            return t[o].call(s.exports, s, s.exports, e),
            s.loaded = !0,
            s.exports
        }
        var i = {};
        return e.m = t,
        e.c = i,
        e.p = "",
        e(0)
    }([function(t, e, i) {
        "use strict";
        var o = i(1)
          , s = o.isInBrowser
          , n = i(2)
          , r = new n(s ? document.body : null);
        r.setStateFromDOM(null),
        r.listenToDOM(),
        s && (window.scrollMonitor = r),
        t.exports = r
    }
    , function(t, e) {
        "use strict";
        e.VISIBILITYCHANGE = "visibilityChange",
        e.ENTERVIEWPORT = "enterViewport",
        e.FULLYENTERVIEWPORT = "fullyEnterViewport",
        e.EXITVIEWPORT = "exitViewport",
        e.PARTIALLYEXITVIEWPORT = "partiallyExitViewport",
        e.LOCATIONCHANGE = "locationChange",
        e.STATECHANGE = "stateChange",
        e.eventTypes = [e.VISIBILITYCHANGE, e.ENTERVIEWPORT, e.FULLYENTERVIEWPORT, e.EXITVIEWPORT, e.PARTIALLYEXITVIEWPORT, e.LOCATIONCHANGE, e.STATECHANGE],
        e.isOnServer = "undefined" == typeof window,
        e.isInBrowser = !e.isOnServer,
        e.defaultOffsets = {
            top: 0,
            bottom: 0
        }
    }
    , function(t, e, i) {
        "use strict";
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function s(t) {
            return c ? 0 : t === document.body ? window.innerHeight || document.documentElement.clientHeight : t.clientHeight
        }
        function n(t) {
            return c ? 0 : t === document.body ? Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight) : t.scrollHeight
        }
        function r(t) {
            return c ? 0 : t === document.body ? window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop
        }
        var h = i(1)
          , c = h.isOnServer
          , a = h.isInBrowser
          , l = h.eventTypes
          , p = i(3)
          , u = !1;
        if (a)
            try {
                var w = Object.defineProperty({}, "passive", {
                    get: function() {
                        u = !0
                    }
                });
                window.addEventListener("test", null, w)
            } catch (t) {}
        var d = !!u && {
            capture: !1,
            passive: !0
        }
          , f = function() {
            function t(e, i) {
                function h() {
                    if (a.viewportTop = r(e),
                    a.viewportBottom = a.viewportTop + a.viewportHeight,
                    a.documentHeight = n(e),
                    a.documentHeight !== p) {
                        for (u = a.watchers.length; u--; )
                            a.watchers[u].recalculateLocation();
                        p = a.documentHeight
                    }
                }
                function c() {
                    for (w = a.watchers.length; w--; )
                        a.watchers[w].update();
                    for (w = a.watchers.length; w--; )
                        a.watchers[w].triggerCallbacks()
                }
                o(this, t);
                var a = this;
                this.item = e,
                this.watchers = [],
                this.viewportTop = null,
                this.viewportBottom = null,
                this.documentHeight = n(e),
                this.viewportHeight = s(e),
                this.DOMListener = function() {
                    t.prototype.DOMListener.apply(a, arguments)
                }
                ,
                this.eventTypes = l,
                i && (this.containerWatcher = i.create(e));
                var p, u, w;
                this.update = function() {
                    h(),
                    c()
                }
                ,
                this.recalculateLocations = function() {
                    this.documentHeight = 0,
                    this.update()
                }
            }
            return t.prototype.listenToDOM = function() {
                a && (window.addEventListener ? (this.item === document.body ? window.addEventListener("scroll", this.DOMListener, d) : this.item.addEventListener("scroll", this.DOMListener, d),
                window.addEventListener("resize", this.DOMListener)) : (this.item === document.body ? window.attachEvent("onscroll", this.DOMListener) : this.item.attachEvent("onscroll", this.DOMListener),
                window.attachEvent("onresize", this.DOMListener)),
                this.destroy = function() {
                    window.addEventListener ? (this.item === document.body ? (window.removeEventListener("scroll", this.DOMListener, d),
                    this.containerWatcher.destroy()) : this.item.removeEventListener("scroll", this.DOMListener, d),
                    window.removeEventListener("resize", this.DOMListener)) : (this.item === document.body ? (window.detachEvent("onscroll", this.DOMListener),
                    this.containerWatcher.destroy()) : this.item.detachEvent("onscroll", this.DOMListener),
                    window.detachEvent("onresize", this.DOMListener))
                }
                )
            }
            ,
            t.prototype.destroy = function() {}
            ,
            t.prototype.DOMListener = function(t) {
                this.setStateFromDOM(t)
            }
            ,
            t.prototype.setStateFromDOM = function(t) {
                var e = r(this.item)
                  , i = s(this.item)
                  , o = n(this.item);
                this.setState(e, i, o, t)
            }
            ,
            t.prototype.setState = function(t, e, i, o) {
                var s = e !== this.viewportHeight || i !== this.contentHeight;
                if (this.latestEvent = o,
                this.viewportTop = t,
                this.viewportHeight = e,
                this.viewportBottom = t + e,
                this.contentHeight = i,
                s)
                    for (var n = this.watchers.length; n--; )
                        this.watchers[n].recalculateLocation();
                this.updateAndTriggerWatchers(o)
            }
            ,
            t.prototype.updateAndTriggerWatchers = function(t) {
                for (var e = this.watchers.length; e--; )
                    this.watchers[e].update();
                for (e = this.watchers.length; e--; )
                    this.watchers[e].triggerCallbacks(t)
            }
            ,
            t.prototype.createCustomContainer = function() {
                return new t
            }
            ,
            t.prototype.createContainer = function(e) {
                "string" == typeof e ? e = document.querySelector(e) : e && e.length > 0 && (e = e[0]);
                var i = new t(e,this);
                return i.setStateFromDOM(),
                i.listenToDOM(),
                i
            }
            ,
            t.prototype.create = function(t, e) {
                "string" == typeof t ? t = document.querySelector(t) : t && t.length > 0 && (t = t[0]);
                var i = new p(this,t,e);
                return this.watchers.push(i),
                i
            }
            ,
            t.prototype.beget = function(t, e) {
                return this.create(t, e)
            }
            ,
            t
        }();
        t.exports = f
    }
    , function(t, e, i) {
        "use strict";
        function o(t, e, i) {
            function o(t, e) {
                if (0 !== t.length)
                    for (E = t.length; E--; )
                        y = t[E],
                        y.callback.call(s, e, s),
                        y.isOne && t.splice(E, 1)
            }
            var s = this;
            this.watchItem = e,
            this.container = t,
            i ? i === +i ? this.offsets = {
                top: i,
                bottom: i
            } : this.offsets = {
                top: i.top || w.top,
                bottom: i.bottom || w.bottom
            } : this.offsets = w,
            this.callbacks = {};
            for (var d = 0, f = u.length; d < f; d++)
                s.callbacks[u[d]] = [];
            this.locked = !1;
            var m, v, b, I, E, y;
            this.triggerCallbacks = function(t) {
                switch (this.isInViewport && !m && o(this.callbacks[r], t),
                this.isFullyInViewport && !v && o(this.callbacks[h], t),
                this.isAboveViewport !== b && this.isBelowViewport !== I && (o(this.callbacks[n], t),
                v || this.isFullyInViewport || (o(this.callbacks[h], t),
                o(this.callbacks[a], t)),
                m || this.isInViewport || (o(this.callbacks[r], t),
                o(this.callbacks[c], t))),
                !this.isFullyInViewport && v && o(this.callbacks[a], t),
                !this.isInViewport && m && o(this.callbacks[c], t),
                this.isInViewport !== m && o(this.callbacks[n], t),
                !0) {
                case m !== this.isInViewport:
                case v !== this.isFullyInViewport:
                case b !== this.isAboveViewport:
                case I !== this.isBelowViewport:
                    o(this.callbacks[p], t)
                }
                m = this.isInViewport,
                v = this.isFullyInViewport,
                b = this.isAboveViewport,
                I = this.isBelowViewport
            }
            ,
            this.recalculateLocation = function() {
                if (!this.locked) {
                    var t = this.top
                      , e = this.bottom;
                    if (this.watchItem.nodeName) {
                        var i = this.watchItem.style.display;
                        "none" === i && (this.watchItem.style.display = "");
                        for (var s = 0, n = this.container; n.containerWatcher; )
                            s += n.containerWatcher.top - n.containerWatcher.container.viewportTop,
                            n = n.containerWatcher.container;
                        var r = this.watchItem.getBoundingClientRect();
                        this.top = r.top + this.container.viewportTop - s,
                        this.bottom = r.bottom + this.container.viewportTop - s,
                        "none" === i && (this.watchItem.style.display = i)
                    } else
                        this.watchItem === +this.watchItem ? this.watchItem > 0 ? this.top = this.bottom = this.watchItem : this.top = this.bottom = this.container.documentHeight - this.watchItem : (this.top = this.watchItem.top,
                        this.bottom = this.watchItem.bottom);
                    this.top -= this.offsets.top,
                    this.bottom += this.offsets.bottom,
                    this.height = this.bottom - this.top,
                    void 0 === t && void 0 === e || this.top === t && this.bottom === e || o(this.callbacks[l], null)
                }
            }
            ,
            this.recalculateLocation(),
            this.update(),
            m = this.isInViewport,
            v = this.isFullyInViewport,
            b = this.isAboveViewport,
            I = this.isBelowViewport
        }
        var s = i(1)
          , n = s.VISIBILITYCHANGE
          , r = s.ENTERVIEWPORT
          , h = s.FULLYENTERVIEWPORT
          , c = s.EXITVIEWPORT
          , a = s.PARTIALLYEXITVIEWPORT
          , l = s.LOCATIONCHANGE
          , p = s.STATECHANGE
          , u = s.eventTypes
          , w = s.defaultOffsets;
        o.prototype = {
            on: function(t, e, i) {
                switch (!0) {
                case t === n && !this.isInViewport && this.isAboveViewport:
                case t === r && this.isInViewport:
                case t === h && this.isFullyInViewport:
                case t === c && this.isAboveViewport && !this.isInViewport:
                case t === a && this.isInViewport && this.isAboveViewport:
                    if (e.call(this, this.container.latestEvent, this),
                    i)
                        return
                }
                if (!this.callbacks[t])
                    throw new Error("Tried to add a scroll monitor listener of type " + t + ". Your options are: " + u.join(", "));
                this.callbacks[t].push({
                    callback: e,
                    isOne: i || !1
                })
            },
            off: function(t, e) {
                if (!this.callbacks[t])
                    throw new Error("Tried to remove a scroll monitor listener of type " + t + ". Your options are: " + u.join(", "));
                for (var i, o = 0; i = this.callbacks[t][o]; o++)
                    if (i.callback === e) {
                        this.callbacks[t].splice(o, 1);
                        break
                    }
            },
            one: function(t, e) {
                this.on(t, e, !0)
            },
            recalculateSize: function() {
                this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom,
                this.bottom = this.top + this.height
            },
            update: function() {
                this.isAboveViewport = this.top < this.container.viewportTop,
                this.isBelowViewport = this.bottom > this.container.viewportBottom,
                this.isInViewport = this.top < this.container.viewportBottom && this.bottom > this.container.viewportTop,
                this.isFullyInViewport = this.top >= this.container.viewportTop && this.bottom <= this.container.viewportBottom || this.isAboveViewport && this.isBelowViewport
            },
            destroy: function() {
                var t = this.container.watchers.indexOf(this)
                  , e = this;
                this.container.watchers.splice(t, 1);
                for (var i = 0, o = u.length; i < o; i++)
                    e.callbacks[u[i]].length = 0
            },
            lock: function() {
                this.locked = !0
            },
            unlock: function() {
                this.locked = !1
            }
        };
        for (var d = function(t) {
            return function(e, i) {
                this.on.call(this, t, e, i)
            }
        }, f = 0, m = u.length; f < m; f++) {
            var v = u[f];
            o.prototype[v] = d(v)
        }
        t.exports = o
    }
    ])
});
!function(T, e) {
    T(function() {
        "use strict";
        function T(T, e) {
            return null != T && null != e && T.toLowerCase() === e.toLowerCase()
        }
        function S(T, e) {
            var S, i, o = T.length;
            if (!o || !e)
                return !1;
            for (S = e.toLowerCase(),
            i = 0; i < o; ++i)
                if (S === T[i].toLowerCase())
                    return !0;
            return !1
        }
        function i(T) {
            for (var e in T)
                A.call(T, e) && (T[e] = new RegExp(T[e],"i"))
        }
        function o(T) {
            return (T || "").substr(0, 500)
        }
        function P(T, e) {
            this.ua = o(T),
            this._cache = {},
            this.maxPhoneWidth = e || 600
        }
        var a = {};
        a.mobileDetectRules = {
            phones: {
                iPhone: "\\biPhone\\b|\\biPod\\b",
                BlackBerry: "BlackBerry|\\bBB10\\b|rim[0-9]+",
                HTC: "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m|Android [0-9.]+; Pixel",
                Nexus: "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",
                Dell: "Dell[;]? (Streak|Aero|Venue|Venue Pro|Flash|Smoke|Mini 3iX)|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
                Motorola: "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b|XT1068|XT1092|XT1052",
                Samsung: "\\bSamsung\\b|SM-G950F|SM-G955F|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F|SM-G920F|SM-G920V|SM-G930F|SM-N910C|SM-A310F|GT-I9190|SM-J500FN|SM-G903F|SM-J330F",
                LG: "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323|M257)",
                Sony: "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",
                Asus: "Asus.*Galaxy|PadFone.*Mobile",
                NokiaLumia: "Lumia [0-9]{3,4}",
                Micromax: "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
                Palm: "PalmSource|Palm",
                Vertu: "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
                Pantech: "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
                Fly: "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
                Wiko: "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
                iMobile: "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
                SimValley: "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
                Wolfgang: "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
                Alcatel: "Alcatel",
                Nintendo: "Nintendo (3DS|Switch)",
                Amoi: "Amoi",
                INQ: "INQ",
                GenericPhone: "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
            },
            tablets: {
                iPad: "iPad|iPad.*Mobile",
                NexusTablet: "Android.*Nexus[\\s]+(7|9|10)",
                GoogleTablet: "Android.*Pixel C",
                SamsungTablet: "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-T116BU|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561|SM-T713|SM-T719|SM-T813|SM-T819|SM-T580|SM-T355Y?|SM-T280|SM-T817A|SM-T820|SM-W700|SM-P580|SM-T587|SM-P350|SM-P555M|SM-P355M|SM-T113NU|SM-T815Y|SM-T585|SM-T285|SM-T825|SM-W708",
                Kindle: "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI|KFFOWI|KFGIWI|KFMEWI)\\b|Android.*Silk/[0-9.]+ like Chrome/[0-9.]+ (?!Mobile)",
                SurfaceTablet: "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
                HPTablet: "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
                AsusTablet: "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K011 | K017 | K01E |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA|P01Z|\\bP027\\b|\\bP024\\b|\\bP00C\\b",
                BlackBerryTablet: "PlayBook|RIM Tablet",
                HTCtablet: "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
                MotorolaTablet: "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
                NookTablet: "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
                AcerTablet: "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20\\b|\\bA3-A30",
                ToshibaTablet: "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
                LGTablet: "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
                FujitsuTablet: "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
                PrestigioTablet: "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
                LenovoTablet: "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-850M|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)|TB-X103F|TB-X304F|TB-X304L|TB-8703F|Tab2A7-10F",
                DellTablet: "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
                YarvikTablet: "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
                MedionTablet: "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
                ArnovaTablet: "97G4|AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
                IntensoTablet: "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
                IRUTablet: "M702pro",
                MegafonTablet: "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
                EbodaTablet: "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
                AllViewTablet: "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
                ArchosTablet: "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|c|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
                AinolTablet: "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
                NokiaLumiaTablet: "Lumia 2520",
                SonyTablet: "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",
                PhilipsTablet: "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
                CubeTablet: "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
                CobyTablet: "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
                MIDTablet: "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",
                MSITablet: "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
                SMiTTablet: "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
                RockChipTablet: "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
                FlyTablet: "IQ310|Fly Vision",
                bqTablet: "Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris ([E|M]10|M8))|Maxwell.*Lite|Maxwell.*Plus",
                HuaweiTablet: "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim|M2-A01L|BAH-L09|BAH-W09",
                NecTablet: "\\bN-06D|\\bN-08D",
                PantechTablet: "Pantech.*P4100",
                BronchoTablet: "Broncho.*(N701|N708|N802|a710)",
                VersusTablet: "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
                ZyncTablet: "z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",
                PositivoTablet: "TB07STA|TB10STA|TB07FTA|TB10FTA",
                NabiTablet: "Android.*\\bNabi",
                KoboTablet: "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
                DanewTablet: "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
                TexetTablet: "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
                PlaystationTablet: "Playstation.*(Portable|Vita)",
                TrekstorTablet: "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
                PyleAudioTablet: "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
                AdvanTablet: "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
                DanyTechTablet: "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
                GalapadTablet: "Android.*\\bG1\\b",
                MicromaxTablet: "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
                KarbonnTablet: "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
                AllFineTablet: "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
                PROSCANTablet: "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
                YONESTablet: "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
                ChangJiaTablet: "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
                GUTablet: "TX-A1301|TX-M9002|Q702|kf026",
                PointOfViewTablet: "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
                OvermaxTablet: "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)|Qualcore 1027",
                HCLTablet: "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
                DPSTablet: "DPS Dream 9|DPS Dual 7",
                VistureTablet: "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
                CrestaTablet: "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
                MediatekTablet: "\\bMT8125|MT8389|MT8135|MT8377\\b",
                ConcordeTablet: "Concorde([ ]+)?Tab|ConCorde ReadMan",
                GoCleverTablet: "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
                ModecomTablet: "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
                VoninoTablet: "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
                ECSTablet: "V07OT2|TM105A|S10OT1|TR10CS1",
                StorexTablet: "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
                VodafoneTablet: "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497",
                EssentielBTablet: "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
                RossMoorTablet: "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
                iMobileTablet: "i-mobile i-note",
                TolinoTablet: "tolino tab [0-9.]+|tolino shine",
                AudioSonicTablet: "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
                AMPETablet: "Android.* A78 ",
                SkkTablet: "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
                TecnoTablet: "TECNO P9|TECNO DP8D",
                JXDTablet: "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
                iJoyTablet: "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
                FX2Tablet: "FX2 PAD7|FX2 PAD10",
                XoroTablet: "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
                ViewsonicTablet: "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
                VerizonTablet: "QTAQZ3|QTAIR7|QTAQTZ3|QTASUN1|QTASUN2|QTAXIA1",
                OdysTablet: "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
                CaptivaTablet: "CAPTIVA PAD",
                IconbitTablet: "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
                TeclastTablet: "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
                OndaTablet: "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",
                JaytechTablet: "TPC-PA762",
                BlaupunktTablet: "Endeavour 800NG|Endeavour 1010",
                DigmaTablet: "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
                EvolioTablet: "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
                LavaTablet: "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
                AocTablet: "MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712",
                MpmanTablet: "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",
                CelkonTablet: "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
                WolderTablet: "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
                MediacomTablet: "M-MPI10C3G|M-SP10EG|M-SP10EGP|M-SP10HXAH|M-SP7HXAH|M-SP10HXBH|M-SP8HXAH|M-SP8MXA",
                MiTablet: "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
                NibiruTablet: "Nibiru M1|Nibiru Jupiter One",
                NexoTablet: "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
                LeaderTablet: "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
                UbislateTablet: "UbiSlate[\\s]?7C",
                PocketBookTablet: "Pocketbook",
                KocasoTablet: "\\b(TB-1207)\\b",
                HisenseTablet: "\\b(F5281|E2371)\\b",
                Hudl: "Hudl HT7S3|Hudl 2",
                TelstraTablet: "T-Hub2",
                GenericTablet: "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bTP750\\b|\\bQTAQZ3\\b|WVT101|TM1088|KT107"
            },
            oss: {
                AndroidOS: "Android",
                BlackBerryOS: "blackberry|\\bBB10\\b|rim tablet os",
                PalmOS: "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
                SymbianOS: "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
                WindowsMobileOS: "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;",
                WindowsPhoneOS: "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
                iOS: "\\biPhone.*Mobile|\\biPod|\\biPad|AppleCoreMedia",
                MeeGoOS: "MeeGo",
                MaemoOS: "Maemo",
                JavaOS: "J2ME/|\\bMIDP\\b|\\bCLDC\\b",
                webOS: "webOS|hpwOS",
                badaOS: "\\bBada\\b",
                BREWOS: "BREW"
            },
            uas: {
                Chrome: "\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",
                Dolfin: "\\bDolfin\\b",
                Opera: "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+|Coast/[0-9.]+",
                Skyfire: "Skyfire",
                Edge: "Mobile Safari/[.0-9]* Edge",
                IE: "IEMobile|MSIEMobile",
                Firefox: "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS",
                Bolt: "bolt",
                TeaShark: "teashark",
                Blazer: "Blazer",
                Safari: "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",
                UCBrowser: "UC.*Browser|UCWEB",
                baiduboxapp: "baiduboxapp",
                baidubrowser: "baidubrowser",
                DiigoBrowser: "DiigoBrowser",
                Puffin: "Puffin",
                Mercury: "\\bMercury\\b",
                ObigoBrowser: "Obigo",
                NetFront: "NF-Browser",
                GenericBrowser: "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger",
                PaleMoon: "Android.*PaleMoon|Mobile.*PaleMoon"
            },
            props: {
                Mobile: "Mobile/[VER]",
                Build: "Build/[VER]",
                Version: "Version/[VER]",
                VendorID: "VendorID/[VER]",
                iPad: "iPad.*CPU[a-z ]+[VER]",
                iPhone: "iPhone.*CPU[a-z ]+[VER]",
                iPod: "iPod.*CPU[a-z ]+[VER]",
                Kindle: "Kindle/[VER]",
                Chrome: ["Chrome/[VER]", "CriOS/[VER]", "CrMo/[VER]"],
                Coast: ["Coast/[VER]"],
                Dolfin: "Dolfin/[VER]",
                Firefox: ["Firefox/[VER]", "FxiOS/[VER]"],
                Fennec: "Fennec/[VER]",
                Edge: "Edge/[VER]",
                IE: ["IEMobile/[VER];", "IEMobile [VER]", "MSIE [VER];", "Trident/[0-9.]+;.*rv:[VER]"],
                NetFront: "NetFront/[VER]",
                NokiaBrowser: "NokiaBrowser/[VER]",
                Opera: [" OPR/[VER]", "Opera Mini/[VER]", "Version/[VER]"],
                "Opera Mini": "Opera Mini/[VER]",
                "Opera Mobi": "Version/[VER]",
                UCBrowser: ["UCWEB[VER]", "UC.*Browser/[VER]"],
                MQQBrowser: "MQQBrowser/[VER]",
                MicroMessenger: "MicroMessenger/[VER]",
                baiduboxapp: "baiduboxapp/[VER]",
                baidubrowser: "baidubrowser/[VER]",
                SamsungBrowser: "SamsungBrowser/[VER]",
                Iron: "Iron/[VER]",
                Safari: ["Version/[VER]", "Safari/[VER]"],
                Skyfire: "Skyfire/[VER]",
                Tizen: "Tizen/[VER]",
                Webkit: "webkit[ /][VER]",
                PaleMoon: "PaleMoon/[VER]",
                Gecko: "Gecko/[VER]",
                Trident: "Trident/[VER]",
                Presto: "Presto/[VER]",
                Goanna: "Goanna/[VER]",
                iOS: " \\bi?OS\\b [VER][ ;]{1}",
                Android: "Android [VER]",
                BlackBerry: ["BlackBerry[\\w]+/[VER]", "BlackBerry.*Version/[VER]", "Version/[VER]"],
                BREW: "BREW [VER]",
                Java: "Java/[VER]",
                "Windows Phone OS": ["Windows Phone OS [VER]", "Windows Phone [VER]"],
                "Windows Phone": "Windows Phone [VER]",
                "Windows CE": "Windows CE/[VER]",
                "Windows NT": "Windows NT [VER]",
                Symbian: ["SymbianOS/[VER]", "Symbian/[VER]"],
                webOS: ["webOS/[VER]", "hpwOS/[VER];"]
            },
            utils: {
                Bot: "Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|YandexMobileBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom",
                MobileBot: "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",
                DesktopMode: "WPDesktop",
                TV: "SonyDTV|HbbTV",
                WebKit: "(webkit)[ /]([\\w.]+)",
                Console: "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|Nintendo Switch|PLAYSTATION|Xbox)\\b",
                Watch: "SM-V700"
            }
        },
        a.detectMobileBrowsers = {
            fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            tabletPattern: /android|ipad|playbook|silk/i
        };
        var M, A = Object.prototype.hasOwnProperty;
        return a.FALLBACK_PHONE = "UnknownPhone",
        a.FALLBACK_TABLET = "UnknownTablet",
        a.FALLBACK_MOBILE = "UnknownMobile",
        M = "isArray"in Array ? Array.isArray : function(T) {
            return "[object Array]" === Object.prototype.toString.call(T)
        }
        ,
        function() {
            var T, e, S, o, P, b, n = a.mobileDetectRules;
            for (T in n.props)
                if (A.call(n.props, T)) {
                    for (e = n.props[T],
                    M(e) || (e = [e]),
                    P = e.length,
                    o = 0; o < P; ++o)
                        S = e[o],
                        b = S.indexOf("[VER]"),
                        b >= 0 && (S = S.substring(0, b) + "([\\w._\\+]+)" + S.substring(b + 5)),
                        e[o] = new RegExp(S,"i");
                    n.props[T] = e
                }
            i(n.oss),
            i(n.phones),
            i(n.tablets),
            i(n.uas),
            i(n.utils),
            n.oss0 = {
                WindowsPhoneOS: n.oss.WindowsPhoneOS,
                WindowsMobileOS: n.oss.WindowsMobileOS
            }
        }(),
        a.findMatch = function(T, e) {
            for (var S in T)
                if (A.call(T, S) && T[S].test(e))
                    return S;
            return null
        }
        ,
        a.findMatches = function(T, e) {
            var S = [];
            for (var i in T)
                A.call(T, i) && T[i].test(e) && S.push(i);
            return S
        }
        ,
        a.getVersionStr = function(T, e) {
            var S, i, o, P, M = a.mobileDetectRules.props;
            if (A.call(M, T))
                for (S = M[T],
                o = S.length,
                i = 0; i < o; ++i)
                    if (P = S[i].exec(e),
                    null !== P)
                        return P[1];
            return null
        }
        ,
        a.getVersion = function(T, e) {
            var S = a.getVersionStr(T, e);
            return S ? a.prepareVersionNo(S) : NaN
        }
        ,
        a.prepareVersionNo = function(T) {
            var e;
            return e = T.split(/[a-z._ \/\-]/i),
            1 === e.length && (T = e[0]),
            e.length > 1 && (T = e[0] + ".",
            e.shift(),
            T += e.join("")),
            Number(T)
        }
        ,
        a.isMobileFallback = function(T) {
            return a.detectMobileBrowsers.fullPattern.test(T) || a.detectMobileBrowsers.shortPattern.test(T.substr(0, 4))
        }
        ,
        a.isTabletFallback = function(T) {
            return a.detectMobileBrowsers.tabletPattern.test(T)
        }
        ,
        a.prepareDetectionCache = function(T, S, i) {
            if (T.mobile === e) {
                var o, M, A;
                return (M = a.findMatch(a.mobileDetectRules.tablets, S)) ? (T.mobile = T.tablet = M,
                void (T.phone = null)) : (o = a.findMatch(a.mobileDetectRules.phones, S)) ? (T.mobile = T.phone = o,
                void (T.tablet = null)) : void (a.isMobileFallback(S) ? (A = P.isPhoneSized(i),
                A === e ? (T.mobile = a.FALLBACK_MOBILE,
                T.tablet = T.phone = null) : A ? (T.mobile = T.phone = a.FALLBACK_PHONE,
                T.tablet = null) : (T.mobile = T.tablet = a.FALLBACK_TABLET,
                T.phone = null)) : a.isTabletFallback(S) ? (T.mobile = T.tablet = a.FALLBACK_TABLET,
                T.phone = null) : T.mobile = T.tablet = T.phone = null)
            }
        }
        ,
        a.mobileGrade = function(T) {
            var e = null !== T.mobile();
            return T.os("iOS") && T.version("iPad") >= 4.3 || T.os("iOS") && T.version("iPhone") >= 3.1 || T.os("iOS") && T.version("iPod") >= 3.1 || T.version("Android") > 2.1 && T.is("Webkit") || T.version("Windows Phone OS") >= 7 || T.is("BlackBerry") && T.version("BlackBerry") >= 6 || T.match("Playbook.*Tablet") || T.version("webOS") >= 1.4 && T.match("Palm|Pre|Pixi") || T.match("hp.*TouchPad") || T.is("Firefox") && T.version("Firefox") >= 12 || T.is("Chrome") && T.is("AndroidOS") && T.version("Android") >= 4 || T.is("Skyfire") && T.version("Skyfire") >= 4.1 && T.is("AndroidOS") && T.version("Android") >= 2.3 || T.is("Opera") && T.version("Opera Mobi") > 11 && T.is("AndroidOS") || T.is("MeeGoOS") || T.is("Tizen") || T.is("Dolfin") && T.version("Bada") >= 2 || (T.is("UC Browser") || T.is("Dolfin")) && T.version("Android") >= 2.3 || T.match("Kindle Fire") || T.is("Kindle") && T.version("Kindle") >= 3 || T.is("AndroidOS") && T.is("NookTablet") || T.version("Chrome") >= 11 && !e || T.version("Safari") >= 5 && !e || T.version("Firefox") >= 4 && !e || T.version("MSIE") >= 7 && !e || T.version("Opera") >= 10 && !e ? "A" : T.os("iOS") && T.version("iPad") < 4.3 || T.os("iOS") && T.version("iPhone") < 3.1 || T.os("iOS") && T.version("iPod") < 3.1 || T.is("Blackberry") && T.version("BlackBerry") >= 5 && T.version("BlackBerry") < 6 || T.version("Opera Mini") >= 5 && T.version("Opera Mini") <= 6.5 && (T.version("Android") >= 2.3 || T.is("iOS")) || T.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3") || T.version("Opera Mobi") >= 11 && T.is("SymbianOS") ? "B" : (T.version("BlackBerry") < 5 || T.match("MSIEMobile|Windows CE.*Mobile") || T.version("Windows Mobile") <= 5.2,
            "C")
        }
        ,
        a.detectOS = function(T) {
            return a.findMatch(a.mobileDetectRules.oss0, T) || a.findMatch(a.mobileDetectRules.oss, T)
        }
        ,
        a.getDeviceSmallerSide = function() {
            return window.screen.width < window.screen.height ? window.screen.width : window.screen.height
        }
        ,
        P.prototype = {
            constructor: P,
            mobile: function() {
                return a.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth),
                this._cache.mobile
            },
            phone: function() {
                return a.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth),
                this._cache.phone
            },
            tablet: function() {
                return a.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth),
                this._cache.tablet
            },
            userAgent: function() {
                return this._cache.userAgent === e && (this._cache.userAgent = a.findMatch(a.mobileDetectRules.uas, this.ua)),
                this._cache.userAgent
            },
            userAgents: function() {
                return this._cache.userAgents === e && (this._cache.userAgents = a.findMatches(a.mobileDetectRules.uas, this.ua)),
                this._cache.userAgents
            },
            os: function() {
                return this._cache.os === e && (this._cache.os = a.detectOS(this.ua)),
                this._cache.os
            },
            version: function(T) {
                return a.getVersion(T, this.ua)
            },
            versionStr: function(T) {
                return a.getVersionStr(T, this.ua)
            },
            is: function(e) {
                return S(this.userAgents(), e) || T(e, this.os()) || T(e, this.phone()) || T(e, this.tablet()) || S(a.findMatches(a.mobileDetectRules.utils, this.ua), e)
            },
            match: function(T) {
                return T instanceof RegExp || (T = new RegExp(T,"i")),
                T.test(this.ua)
            },
            isPhoneSized: function(T) {
                return P.isPhoneSized(T || this.maxPhoneWidth)
            },
            mobileGrade: function() {
                return this._cache.grade === e && (this._cache.grade = a.mobileGrade(this)),
                this._cache.grade
            }
        },
        "undefined" != typeof window && window.screen ? P.isPhoneSized = function(T) {
            return T < 0 ? e : a.getDeviceSmallerSide() <= T
        }
        : P.isPhoneSized = function() {}
        ,
        P._impl = a,
        P.version = "1.4.2 2018-06-10",
        P
    })
}(function(T) {
    if ("undefined" != typeof module && module.exports)
        return function(T) {
            module.exports = T()
        }
        ;
    if ("function" == typeof define && define.amd)
        return define;
    if ("undefined" != typeof window)
        return function(T) {
            window.MobileDetect = T()
        }
        ;
    throw new Error("unknown environment")
}());
"use strict";
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    _gsScope._gsDefine("easing.CustomEase", ["easing.Ease"], function(e) {
        var t = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
          , n = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
          , i = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi
          , o = /[cLlsS]/g
          , s = "CustomEase only accepts Cubic Bezier data."
          , a = function e(t, n, i, o, s, a, r, h, u, c, l) {
            var f, g = (t + i) / 2, p = (n + o) / 2, x = (i + s) / 2, d = (o + a) / 2, y = (s + r) / 2, m = (a + h) / 2, S = (g + x) / 2, _ = (p + d) / 2, v = (x + y) / 2, w = (d + m) / 2, M = (S + v) / 2, b = (_ + w) / 2, k = r - t, C = h - n, z = Math.abs((i - r) * C - (o - h) * k), D = Math.abs((s - r) * C - (a - h) * k);
            return c || (c = [{
                x: t,
                y: n
            }, {
                x: r,
                y: h
            }],
            l = 1),
            c.splice(l || c.length - 1, 0, {
                x: M,
                y: b
            }),
            (z + D) * (z + D) > u * (k * k + C * C) && (f = c.length,
            e(t, n, g, p, S, _, M, b, u, c, l),
            e(M, b, v, w, y, m, r, h, u, c, l + 1 + (c.length - f))),
            c
        }
          , r = function(e) {
            var t, o, a, r, h, u, c, l, f, g, p, x = (e + "").replace(i, function(e) {
                var t = +e;
                return t < 1e-4 && t > -1e-4 ? 0 : t
            }).match(n) || [], d = [], y = 0, m = 0, S = x.length, _ = 2;
            for (t = 0; t < S; t++)
                if (f = r,
                isNaN(x[t]) ? (r = x[t].toUpperCase(),
                h = r !== x[t]) : t--,
                o = +x[t + 1],
                a = +x[t + 2],
                h && (o += y,
                a += m),
                t || (c = o,
                l = a),
                "M" === r)
                    u && u.length < 8 && (d.length -= 1,
                    _ = 0),
                    y = c = o,
                    m = l = a,
                    u = [o, a],
                    _ = 2,
                    d.push(u),
                    t += 2,
                    r = "L";
                else if ("C" === r)
                    u || (u = [0, 0]),
                    u[_++] = o,
                    u[_++] = a,
                    h || (y = m = 0),
                    u[_++] = y + 1 * x[t + 3],
                    u[_++] = m + 1 * x[t + 4],
                    u[_++] = y += 1 * x[t + 5],
                    u[_++] = m += 1 * x[t + 6],
                    t += 6;
                else if ("S" === r)
                    "C" === f || "S" === f ? (g = y - u[_ - 4],
                    p = m - u[_ - 3],
                    u[_++] = y + g,
                    u[_++] = m + p) : (u[_++] = y,
                    u[_++] = m),
                    u[_++] = o,
                    u[_++] = a,
                    h || (y = m = 0),
                    u[_++] = y += 1 * x[t + 3],
                    u[_++] = m += 1 * x[t + 4],
                    t += 4;
                else {
                    if ("L" !== r && "Z" !== r)
                        throw s;
                    "Z" === r && (o = c,
                    a = l,
                    u.closed = !0),
                    ("L" === r || Math.abs(y - o) > .5 || Math.abs(m - a) > .5) && (u[_++] = y + (o - y) / 3,
                    u[_++] = m + (a - m) / 3,
                    u[_++] = y + 2 * (o - y) / 3,
                    u[_++] = m + 2 * (a - m) / 3,
                    u[_++] = o,
                    u[_++] = a,
                    "L" === r && (t += 2)),
                    y = o,
                    m = a
                }
            return d[0]
        }
          , h = function(e) {
            var t, n = e.length, i = 999999999999;
            for (t = 1; t < n; t += 6)
                +e[t] < i && (i = +e[t]);
            return i
        }
          , u = function(e, t, n) {
            n || 0 === n || (n = Math.max(+e[e.length - 1], +e[1]));
            var i, o = +e[0] * -1, s = -n, a = e.length, r = 1 / (+e[a - 2] + o), u = -t || (Math.abs(+e[a - 1] - +e[1]) < .01 * (+e[a - 2] - +e[0]) ? h(e) + s : +e[a - 1] + s);
            for (u = u ? 1 / u : -r,
            i = 0; i < a; i += 2)
                e[i] = (+e[i] + o) * r,
                e[i + 1] = (+e[i + 1] + s) * u
        }
          , c = function(e) {
            var t = this.lookup[e * this.l | 0] || this.lookup[this.l - 1];
            return t.nx < e && (t = t.n),
            t.y + (e - t.x) / t.cx * t.cy
        }
          , l = function(t, n, i) {
            this._calcEnd = !0,
            this.id = t,
            t && (e.map[t] = this),
            this.getRatio = c,
            this.setData(n, i)
        }
          , f = l.prototype = new e;
        return f.constructor = l,
        f.setData = function(e, n) {
            e = e || "0,0,1,1";
            var i, h, c, l, f, g, p, x, d, y, m = e.match(t), S = 1, _ = [];
            if (n = n || {},
            y = n.precision || 1,
            this.data = e,
            this.lookup = [],
            this.points = _,
            this.fast = y <= 1,
            (o.test(e) || e.indexOf("M") !== -1 && e.indexOf("C") === -1) && (m = r(e)),
            i = m.length,
            4 === i)
                m.unshift(0, 0),
                m.push(1, 1),
                i = 8;
            else if ((i - 2) % 6)
                throw s;
            for (0 === +m[0] && 1 === +m[i - 2] || u(m, n.height, n.originY),
            this.rawBezier = m,
            l = 2; l < i; l += 6)
                h = {
                    x: +m[l - 2],
                    y: +m[l - 1]
                },
                c = {
                    x: +m[l + 4],
                    y: +m[l + 5]
                },
                _.push(h, c),
                a(h.x, h.y, +m[l], +m[l + 1], +m[l + 2], +m[l + 3], c.x, c.y, 1 / (2e5 * y), _, _.length - 1);
            for (i = _.length,
            l = 0; l < i; l++)
                p = _[l],
                x = _[l - 1] || p,
                p.x > x.x || x.y !== p.y && x.x === p.x || p === x ? (x.cx = p.x - x.x,
                x.cy = p.y - x.y,
                x.n = p,
                x.nx = p.x,
                this.fast && l > 1 && Math.abs(x.cy / x.cx - _[l - 2].cy / _[l - 2].cx) > 2 && (this.fast = !1),
                x.cx < S && (x.cx ? S = x.cx : (x.cx = .001,
                l === i - 1 && (x.x -= .001,
                S = Math.min(S, .001),
                this.fast = !1)))) : (_.splice(l--, 1),
                i--);
            if (i = 1 / S + 1 | 0,
            this.l = i,
            f = 1 / i,
            g = 0,
            p = _[0],
            this.fast) {
                for (l = 0; l < i; l++)
                    d = l * f,
                    p.nx < d && (p = _[++g]),
                    h = p.y + (d - p.x) / p.cx * p.cy,
                    this.lookup[l] = {
                        x: d,
                        cx: f,
                        y: h,
                        cy: 0,
                        nx: 9
                    },
                    l && (this.lookup[l - 1].cy = h - this.lookup[l - 1].y);
                this.lookup[i - 1].cy = _[_.length - 1].y - h
            } else {
                for (l = 0; l < i; l++)
                    p.nx < l * f && (p = _[++g]),
                    this.lookup[l] = p;
                g < _.length - 1 && (this.lookup[l - 1] = _[_.length - 2])
            }
            return this._calcEnd = 1 !== _[_.length - 1].y || 0 !== _[0].y,
            this
        }
        ,
        f.getRatio = c,
        f.getSVGData = function(e) {
            return l.getSVGData(this, e)
        }
        ,
        l.create = function(e, t, n) {
            return new l(e,t,n)
        }
        ,
        l.version = "0.2.2",
        l.bezierToPoints = a,
        l.get = function(t) {
            return e.map[t]
        }
        ,
        l.getSVGData = function(t, n) {
            n = n || {};
            var i, o, s, a, r, h, u, c, l, f, g = 1e3, p = n.width || 100, x = n.height || 100, d = n.x || 0, y = (n.y || 0) + x, m = n.path;
            if (n.invert && (x = -x,
            y = 0),
            t = t.getRatio ? t : e.map[t] || console.log("No ease found: ", t),
            t.rawBezier) {
                for (i = [],
                u = t.rawBezier.length,
                s = 0; s < u; s += 2)
                    i.push(((d + t.rawBezier[s] * p) * g | 0) / g + "," + ((y + t.rawBezier[s + 1] * -x) * g | 0) / g);
                i[0] = "M" + i[0],
                i[1] = "C" + i[1]
            } else
                for (i = ["M" + d + "," + y],
                u = Math.max(5, 200 * (n.precision || 1)),
                a = 1 / u,
                u += 2,
                c = 5 / u,
                l = ((d + a * p) * g | 0) / g,
                f = ((y + t.getRatio(a) * -x) * g | 0) / g,
                o = (f - y) / (l - d),
                s = 2; s < u; s++)
                    r = ((d + s * a * p) * g | 0) / g,
                    h = ((y + t.getRatio(s * a) * -x) * g | 0) / g,
                    (Math.abs((h - f) / (r - l) - o) > c || s === u - 1) && (i.push(l + "," + f),
                    o = (h - f) / (r - l)),
                    l = r,
                    f = h;
            return m && ("string" == typeof m ? document.querySelector(m) : m).setAttribute("d", i.join(" ")),
            i.join(" ")
        }
        ,
        l
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(e) {
    var t = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[e]
    };
    "undefined" != typeof module && module.exports ? (require("gsap/umd/TweenLite"),
    module.exports = t()) : "function" == typeof define && define.amd && define(["gsap/umd/TweenLite"], t)
}("CustomEase");
"use strict";
!function(s) {
    s.fn.alterClass = function(a, e) {
        var r = this;
        if (a.indexOf("*") === -1)
            return r.removeClass(a),
            e ? r.addClass(e) : r;
        var t = new RegExp("\\s" + a.replace(/\*/g, "[A-Za-z0-9-_]+").split(" ").join("\\s|\\s") + "\\s","g");
        return r.each(function(a, e) {
            for (var r = " " + e.className + " "; t.test(r); )
                r = r.replace(t, " ");
            e.className = s.trim(r)
        }),
        e ? r.addClass(e) : r
    }
}(jQuery);
"use strict";
var tarteaucitronCustomText = {
    alertBigPrivacy: "<span>Le respect de votre vie privée est notre priorité</span><p>Nos partenaires et nous-mêmes utilisons différentes technologies, telles que les cookies pour analyser le trafic, vous proposer des fonctionnalités sur les réseaux sociaux ou pour personnaliser les contenus et publicités et aller encore plus loin dans le sur-mesure. 😉</p><p>Nous utilisons également des cookies au moment du goûter, avec un thé bien chaud, un vrai régal ! Accompagnez cette petite pause d'une lecture passionnante en découvrant <a href='/politique-de-confidentialite'>notre politique de confidentialité</a>. Si vous voulez notre recette, <a href='/contact'>écrivez-nous</a>.</p><p>Lire <a href='/politique-de-confidentialite'>notre politique de confidentialité</a>.</p>",
    denyAll: "Tout refuser",
    acceptAll: "Tout accepter",
    personalize: "Personnaliser"
};
tarteaucitron.init({
    privacyUrl: "",
    hashtag: "#tarteaucitron",
    cookieName: "tarteaucitron",
    orientation: "bottom",
    groupServices: !1,
    showAlertSmall: !1,
    cookieslist: !1,
    closePopup: !1,
    showIcon: !0,
    iconPosition: "BottomLeft",
    adblocker: !1,
    DenyAllCta: !0,
    AcceptAllCta: !0,
    highPrivacy: !0,
    handleBrowserDNTRequest: !1,
    removeCredit: !0,
    moreInfoLink: !0,
    useExternalCss: !0,
    useExternalJs: !1,
    readmoreLink: "",
    mandatory: !0
});
"use strict";
function _classCallCheck(n, e) {
    if (!(n instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
    function n(n, e) {
        for (var t = 0; t < e.length; t++) {
            var a = e[t];
            a.enumerable = a.enumerable || !1,
            a.configurable = !0,
            "value"in a && (a.writable = !0),
            Object.defineProperty(n, a.key, a)
        }
    }
    return function(e, t, a) {
        return t && n(e.prototype, t),
        a && n(e, a),
        e
    }
}()
  , FrameLoop = function() {
    function n(e) {
        _classCallCheck(this, n),
        this.frameID = null,
        this.callback = "function" == typeof e ? e : function() {}
    }
    return _createClass(n, [{
        key: "start",
        value: function() {
            this.onFrame()
        }
    }, {
        key: "onFrame",
        value: function() {
            var n = this;
            this.callback(),
            this.frameID = window.requestAnimationFrame(function() {
                return n.onFrame()
            })
        }
    }, {
        key: "stop",
        value: function() {
            window.cancelAnimationFrame(this.frameID)
        }
    }]),
    n
}();
"use strict";
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n),
        i && e(t, i),
        t
    }
}()
  , InviewPercent = function() {
    function e() {
        var t = this;
        _classCallCheck(this, e);
        var n = {};
        this.listeners = new Map,
        this.inviews = [],
        this.frameID = null,
        this.rootBounds = null,
        this.nextFrame = function() {
            t.updatePercent()
        }
        ,
        this.o = new IntersectionObserver(function(e, n) {
            t.onIntersect(e, n)
        }
        ,n),
        window.o = this.o
    }
    return _createClass(e, [{
        key: "update",
        value: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
              , i = this.listeners.get(e)
              , s = i.callback
              , r = i.value;
            "function" == typeof s && (null !== n ? n !== r && (s({
                status: t,
                value: n
            }),
            this.listeners.get(e).value = n) : s({
                status: t
            }))
        }
    }, {
        key: "onIntersect",
        value: function(e, t) {
            var n = this;
            e.forEach(function(e) {
                var t = e.target
                  , i = e.isIntersecting
                  , s = e.rootBounds;
                e.boundingClientRect;
                i && !n.inviews.includes(t) ? (n.rootBounds = s,
                n.inviews.push(t),
                n.update(t, "ENTER")) : !i && n.inviews.includes(t) && (n.inviews = n.inviews.filter(function(e) {
                    return e !== t
                }),
                n.update(t, "EXIT"))
            })
        }
    }, {
        key: "updatePercent",
        value: function() {
            var e = this;
            this.inviews.length && this.inviews.forEach(function(t) {
                var n = t.getBoundingClientRect()
                  , i = n.top
                  , s = n.height;
                e.update(t, "PERCENT", -(i - e.rootBounds.height) / (s + e.rootBounds.height))
            }),
            this.frameID = requestAnimationFrame(this.nextFrame)
        }
    }, {
        key: "add",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}
            ;
            this.listeners.set(e, {
                callback: t,
                value: null
            }),
            this.o.observe(e),
            this.listeners.size <= 1 && this.updatePercent()
        }
    }, {
        key: "remove",
        value: function(e) {
            this.listeners.delete(e),
            this.o.unobserve(e),
            this.inviews = this.inviews.filter(function(t) {
                return t !== e
            }),
            this.listeners.size <= 0 && cancelAnimationFrame(this.frameID)
        }
    }]),
    e
}()
  , inviewPercent = new InviewPercent;
"use strict";
!function(e) {
    jQuery.scrollSpeed = function(n, o, t) {
        var i, r, l = e(document), u = e(window), a = e("html, body"), c = t || "default", h = 0, s = !1;
        return !window.navigator.msPointerEnabled && void u.on("mousewheel DOMMouseScroll", function(e) {
            var t = e.originalEvent.wheelDeltaY
              , d = e.originalEvent.detail;
            return i = l.height() > u.height(),
            s = !0,
            i && (r = u.height(),
            (t < 0 || d > 0) && (h = h + r >= l.height() ? h : h += n),
            (t > 0 || d < 0) && (h = h <= 0 ? 0 : h -= n),
            a.stop().animate({
                scrollTop: h
            }, o, c, function() {
                s = !1
            })),
            !1
        }).on("scroll", function() {
            i && !s && (h = u.scrollTop())
        }).on("resize", function() {
            i && !s && (r = u.height())
        })
    }
    ,
    jQuery.easing.default = function(e, n, o, t, i) {
        return -t * ((n = n / i - 1) * n * n * n - 1) + o
    }
}(jQuery);
"use strict";
EV_EMITTER = new EvEmitter,
KEY_GMAPS = "AIzaSyDzmuwTB-zTmt0OZGfx3MKqURVgeuUmJrY",
PAGES = {},
ACTIVE_PAGE = null,
IS_MENU_OPEN = !1,
IS_MENU_TOGGLABLE = !0,
IS_HEADER_SVG_ANIMABLE = !1,
IS_HEADER_SVG_ANIMATING = !1,
IS_BACKGROUND_MORPH_ENABLED = !1,
IS_GMAPS_LOADED = !1,
BREATHING_SVGS = [],
BACKGROUND_MORPH_SHAPES = [{
    path: "M220.423447,1067.91051 C305.70021,1067.91051 472.103079,1090.3851 551.363914,987.917216 C632.736329,882.719494 625.856048,650.709719 625.856048,508.457393 C625.856048,227.644129 485.7534,0 312.928024,0 C242.742643,0 216.449195,111.583926 164.249051,174.985337 C87.9108958,267.704366 0,341.684014 0,508.457393 C0,789.270657 47.5980717,1067.91051 220.423447,1067.91051 Z",
    pathAlt: "M222.5,1110 C307.776763,1110 399.739165,1023.96789 479,921.5 C560.372415,816.302279 683,650.709719 683,508.457393 C683,227.644129 520.325376,-31 347.5,-31 C277.314619,-31 216.449195,111.583926 164.249051,174.985337 C87.9108958,267.704366 -37.5,341.684014 -37.5,508.457393 C-37.5,789.270657 49.6746244,1110 222.5,1110 Z",
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    tx: 350,
    ty: 0,
    opacity: 1,
    fill: {
        color: "#fff",
        duration: 500,
        easing: "linear"
    },
    animation: {
        path: {
            duration: 1e3,
            easing: "easeInOutQuad"
        },
        svg: {
            duration: 1e3,
            easing: "easeInOutQuad"
        }
    }
}, {
    path: "M775,1079 C940.09375,1079 1144.99962,1011.27681 1255,882 C1360.88972,757.554204 1375,572.77773 1375,503 C1375,222.163205 1021.85709,0 849,0 C676.142913,0 648.352162,189.273201 572,282 C495.647838,374.726799 0,336.212646 0,503 C0,783.836795 450.981972,1079 775,1079 Z",
    pathAlt: "M779.5,1053 C944.59375,1053 1134.49962,986.776806 1244.5,857.5 C1350.38972,733.054204 1354.53705,556.643737 1349,487 C1326.5,204 1021.85709,0 849,0 C676.142913,0 581,128 462,204 C343,280 0,336.212646 0,503 C0,783.836795 455.481972,1053 779.5,1053 Z",
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    tx: 0,
    ty: 0,
    opacity: 1,
    fill: {
        color: "#fff",
        duration: 500,
        easing: "linear"
    },
    animation: {
        path: {
            duration: 1500,
            easing: "easeInOutQuad"
        },
        svg: {
            duration: 1500,
            easing: "easeInOutQuad"
        }
    }
}, {
    path: "M733.178521,1236.57888 C1199.19526,1091.50796 1889.22005,1174.81293 1889.22005,1032.4791 C1889.22005,906.383908 1949.39735,647.18634 1771.2063,558.854504 C1552.33957,450.35915 1101.12826,450.35915 949.5,397.821558 C796.025194,344.644155 521.176861,-53.1545543 253.161278,5.97729198 C-14.8543062,65.1091382 0.152188545,576.468825 0.152188545,743.337753 C0.152188545,1024.3119 267.16178,1381.64979 733.178521,1236.57888 Z",
    pathAlt: "M779.5,1197 C1245.51674,1051.92908 1556.57758,1071.47142 1746.5,1001.5 C1917.5,938.5 1949.39735,647.18634 1771.2063,558.854504 C1552.33957,450.35915 1154.62826,365.537592 1003,313 C849.525194,259.822597 547.5,-31 295,70.5 C42.5,172 20.5,573.131072 20.5,740 C20.5,1020.97415 313.483259,1342.07092 779.5,1197 Z",
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    tx: 0,
    ty: 0,
    opacity: 1,
    fill: {
        color: "#fff",
        duration: 500,
        easing: "linear"
    },
    animation: {
        path: {
            duration: 1e3,
            easing: "easeInOutQuad"
        },
        svg: {
            duration: 1e3,
            easing: "easeInOutQuad"
        }
    }
}, {
    path: "M982.70971,1275.51598 C1243.74842,1288.88669 1247.78599,1021.46158 1489.85566,941.444453 C1731.92532,861.427321 1630.89625,556.997377 1572.87955,374.32303 C1514.86285,191.648684 1369.54953,70.1155517 1108.74598,22.2476495 C847.94243,-25.6202527 521.577004,-3.75791838 248.498418,162.27763 C-24.5801693,328.313179 -127.609819,792.412544 226.492085,861.427321 C580.593988,930.442097 721.670996,1262.14527 982.70971,1275.51598 Z",
    pathAlt: "M1032,1126 C1293.03871,1139.37071 1198.93034,1039.01713 1441,959 C1683.06966,878.982868 1641.0167,605.174347 1583,422.5 C1524.9833,239.825653 1344.30355,88.8679022 1083.5,41 C822.696449,-6.86790224 561.078587,15.4644512 288,181.5 C14.9214132,347.535549 -239.509498,844.927321 248.498418,881 C736.506333,917.072679 770.961286,1112.62929 1032,1126 Z",
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    tx: 0,
    ty: 0,
    opacity: 1,
    fill: {
        color: "#fff",
        duration: 500,
        easing: "linear"
    },
    animation: {
        path: {
            duration: 1e3,
            easing: "easeInOutQuad"
        },
        svg: {
            duration: 1e3,
            easing: "easeInOutQuad"
        }
    }
}, {
    path: "M281.870251,1352.11491 C602.230795,1385.12701 995,1129.70706 995,848.857717 C995,717.733923 884.785479,489.520299 817,323.889812 C739.598195,134.762306 695.88954,14.9436022 558.827561,0.819817078 C448.515468,-10.5474805 414.049,97.8927217 315,226.879445 C183.203475,398.511687 1.60726719,620.509495 1.60726719,780.854678 C1.60726719,1061.70403 -38.490293,1319.10281 281.870251,1352.11491 Z",
    pathAlt: "M497.5,1355 C817.860544,1388.0121 972,1085.34935 972,804.5 C972,673.376206 884.785479,489.520299 817,323.889812 C739.598195,134.762306 713.561979,88.1237851 576.5,74 C466.187907,62.6327024 414.049,97.8927217 315,226.879445 C183.203475,398.511687 25.5,610.654817 25.5,771 C25.5,1051.84935 177.139456,1321.9879 497.5,1355 Z",
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    tx: 0,
    ty: 0,
    opacity: 1,
    fill: {
        color: "#fff",
        duration: 500,
        easing: "linear"
    },
    animation: {
        path: {
            duration: 1e3,
            easing: "easeInOutQuad"
        },
        svg: {
            duration: 1e3,
            easing: "easeInOutQuad"
        }
    }
}, {
    path: "M456.215473,834.458665 C759.90675,757.052353 895.223989,1047 1093.96695,1047 C1355.014,1047 1560.05095,902.174004 1574.05347,581.65795 C1588.056,261.141896 1448.09517,14.6923654 1060.961,0.189013549 C884.734085,-6.41304141 697.206597,161.628487 542.867636,239.145867 C358.155761,331.918169 156.378199,235.51575 40.7771515,394.117885 C-57.893974,529.492533 1.24430858,950.42393 456.215473,834.458665 Z",
    pathAlt: "M456.215473,834.458665 C663.5,955 896.757036,975 1095.5,975 C1356.54704,975 1557.88425,766.468024 1548,487.5 C1538.11575,208.531976 1268,63 1068.5,63 C869,63 697.206597,161.628487 542.867636,239.145867 C358.155761,331.918169 257,381.5 224.5,487.5 C192,593.5 248.930946,713.917329 456.215473,834.458665 Z",
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    tx: 0,
    ty: 0,
    opacity: 1,
    fill: {
        color: "#fff",
        duration: 500,
        easing: "linear"
    },
    animation: {
        path: {
            duration: 2e3,
            easing: "easeOutElastic",
            elasticity: 400
        },
        svg: {
            duration: 2e3,
            easing: "easeOutQuad"
        }
    }
}, {
    path: "M435.493239,1224.41114 C661.931419,1291.93786 872.166376,1160.06829 1042.49326,1075.3577 C1211.76389,991.172423 1391.49327,982.82452 1487.49327,805.260853 C1626.11317,548.866509 1407.27077,259.416962 1097.49326,108.010848 C897.572611,10.2981091 639.209912,-6.65940316 483.493241,1.97282715 C86.4932272,23.9807183 -7.82674008,307.095101 0.493224295,641.202028 C8.81318867,975.308955 209.055059,1156.88442 435.493239,1224.41114 Z",
    pathAlt: "M423.5,1154 C643.278233,1219.51667 869.514423,1143.53689 1034.83169,1061.34786 C1199.12378,979.668498 1383.82353,863.778184 1477,691.5 C1611.54284,442.737668 1388.88045,269.694977 1088.21405,122.795722 C894.173416,27.9915685 643.409621,11.5388253 492.272851,19.9141026 C106.949309,41.2668916 -18.0425646,315.731128 23.4787177,640.115564 C65,964.5 203.721767,1088.48333 423.5,1154 Z",
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    tx: 0,
    ty: 0,
    opacity: 1,
    fill: {
        color: "#fff",
        duration: 500,
        easing: "linear"
    },
    animation: {
        path: {
            duration: 1e3,
            easing: "easeInOutQuad"
        },
        svg: {
            duration: 1e3,
            easing: "easeInOutQuad"
        }
    }
}];
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var o = t[a];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    return function(t, a, o) {
        return a && e(t.prototype, a),
        o && e(t, o),
        t
    }
}()
  , MainApp = function() {
    function e() {
        _classCallCheck(this, e),
        this.$html = $("html"),
        this.$navbar = null,
        this.navbarTimeline = new TimelineMax({
            paused: !0
        }),
        this.$bgMorph = $(".js-morph-wrap"),
        this.bgMorphSvg = document.querySelector(".morph"),
        this.bgMorphSvgPath = document.querySelector(".morph").querySelector("path"),
        this.bgMorphSections = [],
        this.bgMorphShapes = [],
        this.bgMorphWatchers = [],
        this.bgMorphStep = null,
        this.zou = document.querySelector(".js-zou"),
        this.inviewWatcher = null,
        PAGES = {
            home: pageHome,
            agence: pageAgence,
            article: pageBlog,
            author: pageBlog,
            blog: pageBlog,
            contact: pageContact,
            data: pageData,
            design: pageDesign,
            agile: pageAgile,
            "expertise-conseil": pageExpertiseConseil,
            "expertise-dev": pageExpertiseDev,
            "expertise-ecommerce": pageExpertiseEcommerce,
            "expertise-solution": pageExpertiseSolution,
            job: pageJob,
            mobile: pageMobile,
            react: pageReact,
            reference: pageReference,
            references: pageReferences,
            "symfo-lovers": pageSymfonyLovers,
            team: pageTeam,
            ux: pageUx,
            "landing-page": pageLandingPage,
            "seo-master-page": pageSeoMasterPage,
            sitemap: pageSitemap,
            "sur-mesure": pageSurMesure
        },
        CustomEase.create("headerSvgRound", "M0,0 C0.024,0.632 0.014,0.706 0.1,0.8 0.261,0.976 0.566,0.986 1,1"),
        CustomEase.create("headerSvgFlat", "M0,0,C0,0.5,0,1,1,1"),
        this.attachEventsListeners()
    }
    return _createClass(e, [{
        key: "attachEventsListeners",
        value: function() {
            var e = this;
            EV_EMITTER.on("appLoadComplete", function() {
                setTimeout(function() {
                    var t = Object.keys(PAGES).find(function(e) {
                        return $(".js-page-" + e).length > 0
                    });
                    null != t && (ACTIVE_CLASS = new PAGES[t]($(e)),
                    ACTIVE_CLASS.openingAnimation())
                }, 750)
            }),
            EV_EMITTER.on("openingAnimationStart", function() {
                IS_MENU_TOGGLABLE = !1
            }),
            EV_EMITTER.on("openingAnimationComplete", function() {
                e.onOpeningAnimationComplete(),
                ACTIVE_CLASS.onOpeningAnimationComplete()
            }),
            EV_EMITTER.emitEvent("appAttachEventsListenersComplete")
        }
    }, {
        key: "onOpeningAnimationComplete",
        value: function() {
            function e(e) {
                var t = 0
                  , a = 0
                  , o = e;
                do
                    t += o.offsetTop || 0,
                    a += o.offsetLeft || 0,
                    o = o.offsetParent;
                while (o);
                return t
            }
            new componentMenu,
            this.inview(),
            $(".js-scroll-to").on("click", function(t) {
                t.preventDefault();
                var a = $(t.target).attr("data-target")
                  , o = void 0;
                try {
                    o = document.querySelector(a)
                } catch (e) {
                    console.error(e)
                }
                o ? $("html, body").animate({
                    scrollTop: e(o) - 100
                }, 1e3) : a && $("html, body").animate({
                    scrollTop: $(a).offset().top - 200
                }, 1e3)
            });
            window.performance.now();
            if ($(window).scroll(function() {
                var e = $(".js-header-container")
                  , t = $(".js-menu-logo > img")
                  , a = $(".js-zou-container")
                  , o = (e.length ? e.height() : 0) - (t.length ? t.height() : 0);
                a.length > 0 && $(window).scrollTop() >= a.offset().top ? ($(".js-menu-logo").removeClass("menu-logo-inner--alt"),
                $(".menu-toggler").removeClass("menu-toggler--alt")) : $(window).scrollTop() >= (e.length ? e.offset().top : 0) + o && o > 0 ? ($(".js-menu-logo").addClass("menu-logo-inner--alt"),
                $(".menu-toggler").addClass("menu-toggler--alt")) : ($(".js-menu-logo").removeClass("menu-logo-inner--alt"),
                $(".menu-toggler").removeClass("menu-toggler--alt"))
            }),
            IS_HEADER_SVG_ANIMABLE) {
                var t = ".js-header-svg svg > path";
                inView(t).on("enter", function(e) {
                    0 == IS_HEADER_SVG_ANIMATING && (anime({
                        targets: e,
                        easing: "easeInOutQuad",
                        d: [{
                            value: $(e).attr("data-alt-path"),
                            duration: _.random(5e3, 1e4)
                        }],
                        loop: !0,
                        direction: "alternate"
                    }),
                    IS_HEADER_SVG_ANIMATING = !0)
                }).on("exit", function(e) {
                    anime.remove(e),
                    $(e).attr("d", $(e).attr("data-path")),
                    IS_HEADER_SVG_ANIMATING = !1
                }).emit("enter", t)
            }
            if (BREATHING_SVGS.length && BREATHING_SVGS.forEach(function(e) {
                inView(e).on("enter", function(e) {
                    anime({
                        targets: e,
                        easing: "easeInOutQuad",
                        d: [{
                            value: $(e).attr("data-alt-path"),
                            duration: _.random(5e3, 1e4)
                        }],
                        loop: !0,
                        direction: "alternate"
                    })
                }).on("exit", function(e) {
                    anime.remove(e),
                    $(e).attr("d", $(e).attr("data-path"))
                })
            }),
            IS_BACKGROUND_MORPH_ENABLED && this.bgMorphInit(),
            this.$navbar = $(".gsap--header-navbar"),
            this.navbarTimeline.add(TweenLite.to(this.$navbar, 1, {
                opacity: 1,
                transform: "none"
            }), "-=0.125").timeScale(1).play(),
            this.$html.removeClass("html--no-scroll"),
            IS_MENU_TOGGLABLE = !0,
            "loading"in HTMLImageElement.prototype) {
                var a = document.querySelectorAll('img[loading="lazy"]');
                a.forEach(function(e) {
                    e.src = e.dataset.src
                })
            } else {
                var o = document.createElement("script");
                o.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js",
                document.body.appendChild(o)
            }
        }
    }, {
        key: "inview",
        value: function() {
            inView.offset({
                top: 0,
                right: 0,
                bottom: 100,
                left: 0
            }),
            this.inviewWatcher = inView(".inview---delayed").on("enter", function(e) {
                var t = $(e).data("delay") / 1e3 + "s";
                $(e).css({
                    "transition-delay": t
                })
            }),
            this.inviewWatcher = inView(".inview").on("enter", function(e) {
                $(e).hasClass("inview---whoop") ? $(e).addClass("inview--whoop-animation") : (e = $(e)).alterClass("inview--*", "")
            })
        }
    }, {
        key: "bgMorphInit",
        value: function() {
            if (anime.remove(this.bgMorphSvgPath),
            anime.remove(this.bgMorphSvg),
            this.bgMorphSections = [],
            this.bgMorphShapes = [],
            this.bgMorphWatchers = [],
            this.bgMorphStep = null,
            $(window).width() >= 576) {
                this.bgMorphSections = [].slice.call(document.querySelectorAll("[js-bg-morph]"));
                for (var e = [0, 1, 2, 3, 4, 3, 5, 6], t = 0; t < this.bgMorphSections.length - 1; t++)
                    this.bgMorphShapes.push(_.clone(BACKGROUND_MORPH_SHAPES[e[t % e.length]]));
                this.bgMorphShapes.length && (this.bgMorphShapes.unshift(_.clone(this.bgMorphShapes[0])),
                this.bgMorphShapes[0].opacity = 0,
                this.bgMorphShapes.push(_.clone(this.bgMorphShapes[this.bgMorphShapes.length - 1])),
                this.bgMorphShapes[this.bgMorphShapes.length - 1].opacity = 0),
                this.$bgMorph.removeClass("morph-wrap--hidden"),
                this.bgMorphShapeAnimation(),
                this.bgMorphScrollWatchers()
            }
        }
    }, {
        key: "bgMorphShapeLoop",
        value: function(e) {
            e = e || 0,
            anime.remove(this.bgMorphSvgPath),
            anime({
                targets: this.bgMorphSvgPath,
                easing: "linear",
                d: [{
                    value: this.bgMorphShapes[e].pathAlt,
                    duration: 3500
                }, {
                    value: this.bgMorphShapes[e].path,
                    duration: 3500
                }],
                loop: !0,
                opacity: this.bgMorphShapes[e].opacity,
                fill: {
                    value: this.bgMorphShapes[e].fill.color,
                    duration: this.bgMorphShapes[e].fill.duration,
                    easing: this.bgMorphShapes[e].fill.easing
                },
                direction: "alternate"
            })
        }
    }, {
        key: "bgMorphShapeAnimation",
        value: function() {
            anime.remove(this.bgMorphSvg),
            this.bgMorphShapes[0] && (anime({
                targets: this.bgMorphSvg,
                duration: 1,
                easing: "linear",
                scaleX: this.bgMorphShapes[0].scaleX,
                scaleY: this.bgMorphShapes[0].scaleY,
                translateX: this.bgMorphShapes[0].tx + "px",
                translateY: this.bgMorphShapes[0].ty + "px",
                rotate: this.bgMorphShapes[0].rotate + "deg"
            }),
            this.bgMorphShapeLoop())
        }
    }, {
        key: "bgMorphScrollWatchers",
        value: function() {
            var e = this;
            this.bgMorphSections.forEach(function(t, a) {
                if (a) {
                    var o = a ? e.bgMorphSections[a] : e.zou;
                    a = a ? a : e.bgMorphSections.length,
                    e.bgMorphWatchers[a] = scrollMonitor.create(o, {
                        top: -150,
                        bottom: -300
                    }),
                    e.bgMorphWatchers[a].enterViewport(function() {
                        e.bgMorphStep = a,
                        anime.remove(e.bgMorphSvgPath),
                        anime({
                            targets: e.bgMorphSvgPath,
                            duration: e.bgMorphShapes[a].animation.path.duration,
                            easing: e.bgMorphShapes[a].animation.path.easing,
                            elasticity: e.bgMorphShapes[a].animation.path.elasticity || 0,
                            d: e.bgMorphShapes[a].path,
                            opacity: e.bgMorphShapes[a].opacity,
                            fill: {
                                value: e.bgMorphShapes[a].fill.color,
                                duration: e.bgMorphShapes[a].fill.duration,
                                easing: e.bgMorphShapes[a].fill.easing
                            },
                            complete: function() {
                                e.bgMorphShapeLoop(a)
                            }
                        }),
                        anime.remove(e.bgMorphSvg),
                        anime({
                            targets: e.bgMorphSvg,
                            duration: e.bgMorphShapes[a].animation.svg.duration,
                            easing: e.bgMorphShapes[a].animation.svg.easing,
                            elasticity: e.bgMorphShapes[a].animation.svg.elasticity || 0,
                            scaleX: e.bgMorphShapes[a].scaleX,
                            scaleY: e.bgMorphShapes[a].scaleY,
                            translateX: e.bgMorphShapes[a].tx + "px",
                            translateY: e.bgMorphShapes[a].ty + "px",
                            rotate: e.bgMorphShapes[a].rotate + "deg"
                        })
                    }),
                    e.bgMorphWatchers[a].exitViewport(function() {
                        var t = e.bgMorphWatchers[a].isAboveViewport ? a + 1 : a - 1;
                        t <= e.bgMorphSections.length && e.bgMorphStep !== t && (e.bgMorphStep = t,
                        anime.remove(e.bgMorphSvgPath),
                        anime({
                            targets: e.bgMorphSvgPath,
                            duration: e.bgMorphShapes[t].animation.path.duration,
                            easing: e.bgMorphShapes[t].animation.path.easing,
                            elasticity: e.bgMorphShapes[t].animation.path.elasticity || 0,
                            d: e.bgMorphShapes[t].path,
                            opacity: e.bgMorphShapes[a].opacity,
                            fill: {
                                value: e.bgMorphShapes[t].fill.color,
                                duration: e.bgMorphShapes[t].fill.duration,
                                easing: e.bgMorphShapes[t].fill.easing
                            },
                            complete: function() {
                                e.bgMorphShapeLoop(t)
                            }
                        }),
                        anime.remove(e.bgMorphSvg),
                        anime({
                            targets: e.bgMorphSvg,
                            duration: e.bgMorphShapes[t].animation.svg.duration,
                            easing: e.bgMorphShapes[t].animation.svg.easing,
                            elasticity: e.bgMorphShapes[t].animation.svg.elasticity || 0,
                            scaleX: e.bgMorphShapes[t].scaleX,
                            scaleY: e.bgMorphShapes[t].scaleY,
                            translateX: e.bgMorphShapes[t].tx + "px",
                            translateY: e.bgMorphShapes[t].ty + "px",
                            rotate: e.bgMorphShapes[t].rotate + "deg"
                        }))
                    })
                }
            })
        }
    }]),
    e
}();
$(document).ready(function() {
    new MainApp
});
"use strict";
!function(e, t, n) {
    function i(e) {
        t.querySelectorAll(e = e || "select.init-fsb-select").forEach(a)
    }
    function a(e) {
        if (!e.nextElementSibling || !e.nextElementSibling.classList.contains("fsb-select")) {
            var n = e.children
              , i = e.parentNode
              , a = t.createElement("span")
              , l = t.createElement("span")
              , o = t.createElement("button")
              , c = t.createElement("span")
              , d = t.createElement("span")
              , u = v++;
            e.classList.add("fsb-original-select"),
            l.id = "fsb_" + u + "_label",
            l.className = "fsb-label",
            l.textContent = r(e, i),
            o.id = "fsb_" + u + "_button",
            o.className = "fsb-button",
            o.textContent = "&nbsp;",
            o.setAttribute("aria-disabled", e.disabled),
            o.setAttribute("aria-haspopup", "listbox"),
            o.setAttribute("aria-expanded", "false"),
            o.setAttribute("aria-labelledby", "fsb_" + u + "_label fsb_" + u + "_button"),
            c.className = "fsb-list",
            c.setAttribute("role", "listbox"),
            c.setAttribute("tabindex", "-1"),
            c.setAttribute("aria-labelledby", "fsb_" + u + "_label");
            for (var f = 0, b = n.length; f < b; f++) {
                var p = s(n[f])
                  , m = p.item
                  , h = p.selected
                  , p = p.itemLabel;
                c.appendChild(m),
                h && (o.innerHTML = p)
            }
            a.className = "fsb-select",
            a.appendChild(l),
            a.appendChild(o),
            a.appendChild(c),
            a.appendChild(d),
            e.nextSibling ? i.insertBefore(a, e.nextSibling) : i.appendChild(a),
            c.firstElementChild && ((a = t.createElement("span")).setAttribute("style", "width: " + c.firstElementChild.offsetWidth + "px;"),
            d.className = "fsb-resize",
            d.appendChild(a))
        }
    }
    function l(e) {
        var n = e.children
          , i = e.parentNode
          , a = e.nextElementSibling;
        if (a && a.classList.contains("fsb-select")) {
            var l = a.firstElementChild
              , o = l.nextElementSibling
              , c = o.nextElementSibling
              , a = c.nextElementSibling
              , d = t.createDocumentFragment();
            l.textContent = r(e, i),
            o.setAttribute("aria-disabled", e.disabled);
            for (var u = 0, f = n.length; u < f; u++) {
                var b = s(n[u])
                  , p = b.item
                  , m = b.selected
                  , b = b.itemLabel;
                d.appendChild(p),
                m && (o.innerHTML = b)
            }
            for (; c.firstChild; )
                c.removeChild(c.firstChild);
            c.appendChild(d),
            c.firstElementChild && a.firstElementChild.setAttribute("style", "width: " + c.firstElementChild.offsetWidth + "px;")
        }
    }
    function r(e, n) {
        if (e = e.id,
        "LABEL" === n.nodeName ? i = n : void 0 !== e && (i = t.querySelector('label[for="' + e + '"]')),
        i) {
            var i = [].filter.call(i.childNodes, function(e) {
                return 3 === e.nodeType
            }).map(function(e) {
                return e.textContent.replace(/\s+/g, " ").trim()
            }).filter(function(e) {
                return "" !== e
            })[0];
            if (i)
                return i
        }
        return ""
    }
    function s(e) {
        var n = t.createElement("span")
          , i = e.selected
          , a = e.text
          , e = e.getAttribute("data-icon")
          , a = "" !== a ? a : "&nbsp;";
        return null !== e && (a = '<svg aria-hidden="true"><use href="' + e + '"></use></svg> <span>' + a + "</span>"),
        n.className = "fsb-option",
        n.innerHTML = a,
        n.setAttribute("role", "option"),
        n.setAttribute("tabindex", "-1"),
        n.setAttribute("aria-selected", i),
        {
            item: n,
            selected: i,
            itemLabel: a
        }
    }
    function o(e) {
        var n = e.getBoundingClientRect()
          , i = e.nextElementSibling
          , a = (a = i.querySelector('[aria-selected="true"]')) || i.firstElementChild;
        e.parentNode.className = "fsb-select",
        e.setAttribute("aria-expanded", "true"),
        a.focus(),
        n.y + n.height + i.offsetHeight > t.documentElement.clientHeight && (e.parentNode.className = "fsb-select fsb-top")
    }
    function c(e) {
        var n = t.querySelector('.fsb-button[aria-expanded="true"]');
        n && (n.setAttribute("aria-expanded", "false"),
        e && n.focus(),
        E = "",
        g = null)
    }
    function d(e) {
        var t = e.parentNode
          , n = t.previousElementSibling
          , i = [].indexOf.call(t.children, e)
          , a = t.querySelector('[aria-selected="true"]')
          , t = t.parentNode.previousElementSibling;
        a && a.setAttribute("aria-selected", "false"),
        e.setAttribute("aria-selected", "true"),
        n.innerHTML = e.innerHTML,
        t.selectedIndex = i,
        t.dispatchEvent(new Event("input",{
            bubbles: !0
        })),
        t.dispatchEvent(new Event("change",{
            bubbles: !0
        }))
    }
    function u(e) {
        e = function(e, t) {
            var n, i = [].map.call(e.children, function(e) {
                return e.textContent.trim().toLowerCase()
            }), a = f(i, t)[0];
            return a ? e.children[i.indexOf(a)] : (n = t.split("")).every(function(e) {
                return e === n[0]
            }) ? (a = f(i, t[0]),
            a = a[(t.length - 1) % a.length],
            e.children[i.indexOf(a)]) : null
        }(e, E),
        e && e.focus()
    }
    function f(e, t) {
        return e.filter(function(e) {
            return 0 === e.indexOf(t.toLowerCase())
        })
    }
    function b(t) {
        var n = t.key
          , i = t.altKey
          , a = t.ctrlKey
          , t = t.metaKey;
        return !(1 !== n.length || i || a || t) && (g && e.clearTimeout(g),
        g = e.setTimeout(function() {
            E = ""
        }, 500),
        E += n,
        1)
    }
    function p(e, t, n, i) {
        var a = Element.prototype.matches || Element.prototype.msMatchesSelector;
        "string" == typeof n ? e.addEventListener(t, function(e) {
            a.call(e.target, n) && i.call(e.target, e)
        }) : (i = n,
        e.addEventListener(t, i))
    }
    function m(e, n) {
        n = void 0 !== n ? n : [],
        "loading" !== t.readyState ? e.apply(void 0, n) : t.addEventListener("DOMContentLoaded", function() {
            e.apply(void 0, n)
        })
    }
    function h() {
        m(i)
    }
    var E = ""
      , g = null
      , v = 0;
    p(t, "click", ".fsb-button", function(e) {
        c(),
        o(e.target),
        e.preventDefault(),
        e.stopImmediatePropagation()
    }),
    p(t, "keydown", ".fsb-button", function(e) {
        var t = e.target
          , n = t.nextElementSibling
          , i = !0;
        switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "Enter":
        case " ":
            o(t);
            break;
        default:
            b(e) ? (o(t),
            u(n)) : i = !1
        }
        i && e.preventDefault()
    }),
    p(t.documentElement, "mousemove", ".fsb-option", function(e) {
        e.target.focus()
    }),
    p(t, "click", ".fsb-option", function(e) {
        d(e.target),
        c(!0)
    }),
    p(t, "keydown", ".fsb-option", function(e) {
        var t = e.target
          , n = t.parentNode
          , i = !0;
        switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft":
            t.previousElementSibling && t.previousElementSibling.focus();
            break;
        case "ArrowDown":
        case "ArrowRight":
            t.nextElementSibling && t.nextElementSibling.focus();
            break;
        case "Home":
            n.firstElementChild.focus();
            break;
        case "End":
            n.lastElementChild.focus();
            break;
        case "PageUp":
        case "PageDown":
            break;
        case "Tab":
            d(t),
            c(),
            i = !1;
            break;
        case "Enter":
        case " ":
            d(t);
        case "Escape":
            c(!0);
            break;
        default:
            b(e) ? u(n) : i = !1
        }
        i && e.preventDefault()
    }),
    p(t, "click", function(e) {
        c()
    }),
    e.FancySelect = (h.init = i,
    h.update = l,
    h),
    n && m(i)
}(window, document, "undefined" == typeof FancySelectAutoInitialize || FancySelectAutoInitialize);
"use strict";
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.enumerable = s.enumerable || !1,
            s.configurable = !0,
            "value"in s && (s.writable = !0),
            Object.defineProperty(e, s.key, s)
        }
    }
    return function(t, i, s) {
        return i && e(t.prototype, i),
        s && e(t, s),
        t
    }
}()
  , InstaPics = function() {
    function e(t) {
        var i = this;
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        _classCallCheck(this, e);
        var s = document.querySelector(t) || document.querySelector("body");
        this.activeIndex = 0,
        this.selectPrevious = function() {
            i.select(i.activeIndex - 1)
        }
        ,
        this.selectNext = function() {
            i.select(i.activeIndex + 1)
        }
        ,
        this.init(s)
    }
    return _createClass(e, [{
        key: "init",
        value: function(e) {
            this.pics = Array.from(e.querySelectorAll(".instapics__pic-wrapper") || []),
            this.pics.length <= 0 || (this.btPrev = e.querySelector(".instapics__nav-bt--previous"),
            this.btNext = e.querySelector(".instapics__nav-bt--next"),
            this.activeIndex = this.pics.findIndex(function(e) {
                return e.classList.contains("active")
            }) || 0,
            this.addListeners(),
            this.select(this.activeIndex))
        }
    }, {
        key: "select",
        value: function(e) {
            var t = (e % this.pics.length + this.pics.length) % this.pics.length;
            this.pics[this.activeIndex].classList.remove("active"),
            this.pics[t].classList.add("active"),
            this.activeIndex = t
        }
    }, {
        key: "addListeners",
        value: function() {
            this.btPrev && this.btPrev.addEventListener("click", this.selectPrevious),
            this.btNext && this.btNext.addEventListener("click", this.selectNext)
        }
    }, {
        key: "removeListeners",
        value: function() {
            this.btPrev && this.btPrev.removeEventListener("click", this.selectPrevious),
            this.btNext && this.btNext.removeEventListener("click", this.selectNext)
        }
    }, {
        key: "destroy",
        value: function() {
            this.removeListeners()
        }
    }]),
    e
}();
"use strict";
function _classCallCheck(e, n) {
    if (!(e instanceof n))
        throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var i = n[t];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
    }
    return function(n, t, i) {
        return t && e(n.prototype, t),
        i && e(n, i),
        n
    }
}()
  , componentMenu = function() {
    function e() {
        _classCallCheck(this, e),
        this.menuToggler = $(".js-menu-toggler"),
        this.menuTogglerInner = this.menuToggler.find(".menu-toggler-inner"),
        this.menuAnimationWhite = $(".gsap--menu-animation-white"),
        this.menuAnimationSvg = $(".gsap--menu-animation-svg"),
        this.menuContent = $(".gsap--menu-content"),
        this.menuList = $(".gsap--menu-list"),
        this.menuListLink = $(".gsap--menu-list-link"),
        this.menuListAfter = $(".gsap--menu-list-after"),
        this.menuContactTitle = $(".gsap--menu-contact-title"),
        this.menuContactAddress = $(".gsap--menu-contact-address"),
        this.menuContactMail = $(".gsap--menu-contact-mail"),
        this.menuContactSocials = $(".gsap--menu-contact-social"),
        this.menuContactLink = $(".gsap--menu-contact-link"),
        this.menu = $(".js-menu"),
        this.menuInner = $(".js-menu-inner"),
        this.MobileDetect = new MobileDetect(window.navigator.userAgent),
        this.setTimelineSvg(),
        this.setTimelineList(),
        this.setTimelineContact(),
        this.attachEventsListeners()
    }
    return _createClass(e, [{
        key: "attachEventsListeners",
        value: function() {
            var e = this;
            e.menuToggler.on("click", _.debounce(function(n) {
                n.preventDefault(),
                IS_MENU_TOGGLABLE && e.toggleMenu()
            }, 300, {
                leading: !0,
                trailing: !1
            }))
        }
    }, {
        key: "toggleMenu",
        value: function() {
            var e = this;
            e.menuTogglerInner.hasClass("menu-toggler-inner--open") ? (e.menuTogglerInner.removeClass("menu-toggler-inner--open").addClass("menu-toggler-inner--close"),
            e.playOpeningAnimation()) : e.menuTogglerInner.hasClass("menu-toggler-inner--close") && (e.menuTogglerInner.removeClass("menu-toggler-inner--close").addClass("menu-toggler-inner--open"),
            e.menuList.addClass("gsap--menu-list--hidden-before"),
            e.playClosingAnimation())
        }
    }, {
        key: "playOpeningAnimation",
        value: function() {
            var e = this;
            e.onOpeningAnimationStart(),
            e.canShowDesktopAnimation() ? e.timelineSvgDesktop.timeScale(1).play() : e.timelineSvgMobile.timeScale(1).play()
        }
    }, {
        key: "onOpeningAnimationStart",
        value: function() {
            IS_MENU_TOGGLABLE = !1,
            IS_MENU_OPEN = !0,
            $("html").addClass("html--no-scroll"),
            $(".navbar-brand").css("background-image", 'url("/build/img/logo.svg")')
        }
    }, {
        key: "onOpeningAnimationComplete",
        value: function() {
            var e = this;
            IS_MENU_TOGGLABLE = !0,
            e.menuList.removeClass("gsap--menu-list--hidden-before")
        }
    }, {
        key: "playClosingAnimation",
        value: function() {
            var e = this;
            e.onClosingAnimationStart(),
            e.canShowDesktopAnimation() ? (e.timelineListDesktop.timeScale(5).reverse(0),
            e.timelineContactDesktop.timeScale(5).reverse(0)) : (e.timelineListDesktop.timeScale(5).reverse(0),
            e.timelineContactDesktop.timeScale(5).reverse(0))
        }
    }, {
        key: "onClosingAnimationStart",
        value: function() {
            IS_MENU_TOGGLABLE = !1
        }
    }, {
        key: "onClosingAnimationComplete",
        value: function() {
            IS_MENU_TOGGLABLE = !0,
            IS_MENU_OPEN = !1,
            $("html").removeClass("html--no-scroll"),
            $(".navbar-brand").css("background-image", 'url("/build/img/logo-white.svg")')
        }
    }, {
        key: "setTimelineSvg",
        value: function() {
            var e = this;
            e.timelineSvgDesktop = new TimelineMax({
                paused: !0,
                onComplete: function() {
                    e.timelineListDesktop.timeScale(2.5).play(),
                    e.timelineContactDesktop.timeScale(1.5).play()
                },
                onReverseComplete: function() {
                    e.onClosingAnimationComplete()
                }
            }).add(TweenLite.to(e.menuAnimationWhite, .5, {
                top: "-50vh",
                right: "-35vw",
                width: "180vw",
                height: "180vw",
                ease: Power4.easeOut
            }), "-=0").add(TweenLite.to(e.menuAnimationSvg, .75, {
                top: "17vh",
                right: "0",
                width: "35vw",
                height: "100vh",
                ease: Back.easeOut
            }), "-=0.375").add(TweenLite.to(e.menuContent, .001, {
                display: "block"
            }), "-=0"),
            e.timelineSvgMobile = new TimelineMax({
                paused: !0,
                onStart: function() {
                    e.menu.addClass("menu--mobile")
                },
                onComplete: function() {
                    e.timelineContactDesktop.timeScale(1.5).play(),
                    e.timelineListDesktop.timeScale(1.5).play()
                },
                onReverseComplete: function() {
                    e.onClosingAnimationComplete(),
                    e.menu.removeClass("menu--mobile")
                }
            }).add(TweenLite.to(e.menuInner, 1e-4, {
                opacity: "0"
            }), "-=0").add(TweenLite.to(e.menuContent, 1e-4, {
                display: "block"
            }), "-=0").add(TweenLite.to(e.menuInner, .5, {
                opacity: "1",
                "background-color": "#fff"
            }), "-=0")
        }
    }, {
        key: "setTimelineList",
        value: function() {
            var e = this;
            e.timelineListDesktop = new TimelineMax({
                paused: !0,
                onComplete: function() {
                    e.onOpeningAnimationComplete()
                },
                onReverseComplete: function() {
                    e.canShowDesktopAnimation() ? e.timelineSvgDesktop.timeScale(2).reverse(0) : e.timelineSvgMobile.timeScale(1.5).reverse(0)
                }
            }),
            e.menuListLink.each(function() {
                $(this).find("span").each(function() {
                    e.timelineListDesktop.add(TweenLite.to($(this), .74, {
                        opacity: 1,
                        top: 0,
                        ease: Power4.easeOut
                    }), "-=0.725")
                })
            }),
            e.timelineListDesktop.add(TweenLite.to(e.menuListAfter, .375, {
                transform: "none",
                ease: Back.easeOut
            }), "-=0.05")
        }
    }, {
        key: "setTimelineContact",
        value: function() {
            var e = this;
            e.timelineContactDesktop = new TimelineMax({
                paused: !0
            }).add(TweenLite.to(e.menuContactTitle, .5, {
                opacity: 1,
                transform: "none"
            }), "-=0").add(TweenLite.to(e.menuContactAddress, .5, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").add(TweenLite.to(e.menuContactMail, .5, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").add(TweenLite.to(e.menuContactLink, .5, {
                opacity: 1,
                transform: "none"
            }), "-=0.375"),
            e.menuContactSocials.each(function() {
                e.timelineContactDesktop.add(TweenLite.to($(this), .25, {
                    opacity: 1,
                    transform: "none"
                }), "-=0.225")
            })
        }
    }, {
        key: "canShowDesktopAnimation",
        value: function() {
            var e = this
              , n = _.isNull(e.MobileDetect.mobile());
            return window.innerHeight > 700 && window.innerWidth >= 1440 && n
        }
    }]),
    e
}();
$(document).ready(function() {
    new componentMenu
});
"use strict";
function _classCallCheck(e, n) {
    if (!(e instanceof n))
        throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var a = n[t];
            a.enumerable = a.enumerable || !1,
            a.configurable = !0,
            "value"in a && (a.writable = !0),
            Object.defineProperty(e, a.key, a)
        }
    }
    return function(n, t, a) {
        return t && e(n.prototype, t),
        a && e(n, a),
        n
    }
}()
  , Page = function() {
    function e(n) {
        _classCallCheck(this, e),
        this.$element = n
    }
    return _createClass(e, [{
        key: "onOpeningAnimationComplete",
        value: function() {
            this.pageScripts()
        }
    }, {
        key: "openingAnimation",
        value: function() {}
    }, {
        key: "pageScripts",
        value: function() {}
    }, {
        key: "onLeave",
        value: function() {}
    }]),
    e
}();
"use strict";
function _classCallCheck(e, n) {
    if (!(e instanceof n))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, n) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !n || "object" != typeof n && "function" != typeof n ? e : n
}
function _inherits(e, n) {
    if ("function" != typeof n && null !== n)
        throw new TypeError("Super expression must either be null or a function, not " + typeof n);
    e.prototype = Object.create(n && n.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n)
}
var _createClass = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var a = n[t];
            a.enumerable = a.enumerable || !1,
            a.configurable = !0,
            "value"in a && (a.writable = !0),
            Object.defineProperty(e, a.key, a)
        }
    }
    return function(n, t, a) {
        return t && e(n.prototype, t),
        a && e(n, a),
        n
    }
}()
  , pageAgence = function(e) {
    function n(e) {
        _classCallCheck(this, n);
        var t = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this));
        return t.$element = e,
        t.$headerSvg = $(".gsap--header-svg"),
        t.$headerTitle = $(".gsap--header-title"),
        t.$headerImage = $(".gsap--header-image"),
        t.$headerText = $(".gsap--header-text"),
        t.$headerLink = $(".gsap--header-link"),
        t.$headerContent = $(".gsap--header-content"),
        t.onFrame = function() {}
        ,
        t.instaPicsDesktop = new InstaPics(".agence-insta .instapics__interactive--desktop"),
        t.instaPicsMobile = new InstaPics(".agence-insta .instapics__interactive--mobile"),
        t
    }
    return _inherits(n, e),
    _createClass(n, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    IS_BACKGROUND_MORPH_ENABLED = !0,
                    BREATHING_SVGS = ["instapics__bg > path"],
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerImage, .25, {
                opacity: 1
            }), "-=0.75").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }, {
        key: "pageScripts",
        value: function() {
            var e = this
              , n = $(".agence-commandements-bubbles-big")
              , t = $(".agence-commandements-bubbles-first, .agence-commandements-bubbles-second, .agence-commandements-bubbles-third, .agence-commandements-bubbles-hide-left, .agence-commandements-bubbles-hide-right")
              , a = $(".agence-commandements-bubbles-big-text").length
              , s = function(e, n) {
                return (e % n + n) % n
            }
              , i = function(e) {
                var n = void 0;
                b = s(e, a),
                prev = s(e - 1, a),
                pprev = s(e - 2, a),
                next = s(e + 1, a),
                nnext = s(e + 2, a),
                $(".agence-commandements-bubbles-big-text").removeClass("agence-commandements-bubbles-big-text-visible"),
                $('.agence-commandements-bubbles-big-text[data-idtext="' + (b + 1) + '"]').addClass("agence-commandements-bubbles-big-text-visible"),
                Array.from(t).forEach(function(e, t) {
                    switch (n = $(e),
                    n.removeClass("agence-commandements-bubbles-first agence-commandements-bubbles-second agence-commandements-bubbles-third agence-commandements-bubbles-hide-left agence-commandements-bubbles-hide-right"),
                    t) {
                    case pprev:
                        n.addClass("agence-commandements-bubbles-hide-left");
                        break;
                    case prev:
                        n.addClass("agence-commandements-bubbles-first");
                        break;
                    case b:
                        n.addClass("agence-commandements-bubbles-second");
                        break;
                    case next:
                        n.addClass("agence-commandements-bubbles-third");
                        break;
                    case nnext:
                    default:
                        n.addClass("agence-commandements-bubbles-hide-right")
                    }
                })
            };
            this.onFrame = function() {
                o = r,
                r = window.performance.now(),
                c -= r - o,
                c <= 0 && (i(b + 1),
                c = 4e3),
                requestAnimationFrame(function() {
                    return e.onFrame()
                })
            }
            ;
            var o = window.performance.now()
              , r = o
              , c = 4e3
              , b = 0;
            n.on("click", ".agence-commandements-bubbles-third", function(e) {
                e.preventDefault(),
                i(b + 1),
                c = 2e4
            }),
            n.on("click", ".agence-commandements-bubbles-first", function(e) {
                e.preventDefault(),
                i(b - 1),
                c = 2e4
            }),
            document.addEventListener("touchstart", function() {}, !0),
            this.onFrame()
        }
    }, {
        key: "onLeave",
        value: function() {
            this.onFrame = function() {}
            ,
            this.instaPicsDesktop.destroy(),
            this.instaPicsMobile.destroy()
        }
    }]),
    n
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageAgile = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerContent = $(".gsap--header-content"),
        n.$headerLetters = $(".gsap--header-letters span"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            var e = new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375")
              , t = .85;
            Array.from(this.$headerLetters).forEach(function(n, r) {
                e.add(TweenLite.to(n, t, {
                    opacity: 1,
                    transform: "none"
                }), "-=" + (t + .5 * Math.random()))
            }),
            e.play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n),
        o && e(t, o),
        t
    }
}()
  , pageBlog = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerContent = $(".gsap--header-content"),
        n.$headerLink = $(".gsap--header-link"),
        n.$pageSeoPath = "agence-digitale",
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            var e = .6
              , t = {
                opacity: 1,
                transform: "none",
                ease: Power4.easeOut
            }
              , n = Array.from(document.querySelectorAll(".article"))
              , o = (n.map(function(e, t) {
                return '.article[data-index="' + t + '"] svg > path'
            }),
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, e, t), 0).add(TweenLite.to(this.$headerTitle, e, t), .5 * e).add(TweenLite.to(this.$headerText, e, t), .75 * e).add(TweenLite.to(this.$headerLink, e, t), .75 * e));
            o.play(),
            !1 === window.location.pathname.includes(this.$pageSeoPath) && !function() {
                if (null === document.getElementById("botman-widget-script")) {
                    var e = document.createElement("script");
                    e.src = "https://cdn.jsdelivr.net/npm/botman-web-widget@0/build/js/widget.js",
                    e.id = "botman-widget-script";
                    var t = document.getElementsByTagName("body")[0];
                    t.appendChild(e);
                    var n = "Salutations visiteur curieux, tu es sur le blog de ZOL, l’agora des problématiques digitales. Trépignes-tu d’impatience à l’idée de nous soumettre une question/devinette à laquelle nous répondrons par un joli article détaillé ?"
                      , o = window.location.origin + "/build/img/home/header/pantoufleSmall.png";
                    botmanWidget = {
                        title: "Une idée d'article ?",
                        placeholderText: "Ecris un message",
                        aboutText: "",
                        introMessage: n,
                        bubbleAvatarUrl: o
                    }
                }
                for (var a = Array.from(document.querySelectorAll("div.gist")), i = function(e) {
                    $.ajax({
                        url: a[e].dataset.src + ".json",
                        dataType: "jsonp",
                        timeout: 1e3,
                        success: function(t) {
                            $(document.head).append('<link href="' + t.stylesheet + '" rel="stylesheet">'),
                            $(a[e]).append(t.div)
                        }
                    })
                }, r = 0; r < a.length; r++)
                    i(r)
            }()
        }
    }, {
        key: "pageScripts",
        value: function() {
            if (!1 === window.location.pathname.includes(this.$pageSeoPath)) {
                var e = document.querySelector("#botmanWidgetRoot");
                null === e && window.dispatchEvent(new Event("load")),
                "undefined" != typeof botmanChatWidget && (this.displayTooltip(),
                this.manageBodyScroll())
            }
        }
    }, {
        key: "displayTooltip",
        value: function() {
            var e = document.querySelector("#botmanWidgetRoot")
              , t = e.firstChild
              , n = document.createElement("div")
              , o = document.createElement("span")
              , a = document.createTextNode("Une idée d'article ?");
            n.classList.add("botman-tooltip"),
            setTimeout(function() {
                n.classList.add("animated", "fadeInAnimation")
            }, 800),
            o.appendChild(a),
            n.appendChild(o),
            t.append(n);
            var i = document.querySelector(".botman-tooltip");
            i.onclick = function() {
                botmanChatWidget.open()
            }
        }
    }, {
        key: "manageBodyScroll",
        value: function() {
            var e = document.querySelector(".botman-tooltip")
              , t = document.querySelector(".desktop-closed-message-avatar")
              , n = document.querySelector(".mobile-closed-message-avatar")
              , o = document.querySelector("#botmanWidgetRoot");
            [e, t, n].forEach(function(e) {
                null !== e && "undefined" != typeof e && e.addEventListener("click", function() {
                    document.documentElement.style.overflow = "hidden",
                    document.body.style.overflow = "hidden";
                    var e = o.firstChild.firstChild
                      , t = e.children[1];
                    [e, t].forEach(function(e) {
                        null !== e && "undefined" != typeof e && e.addEventListener("click", function() {
                            document.documentElement.style.removeProperty("overflow"),
                            document.body.style.removeProperty("overflow")
                        })
                    })
                })
            })
        }
    }, {
        key: "onLeave",
        value: function() {
            !1 === window.location.pathname.includes(this.$pageSeoPath) && document.getElementById("botmanWidgetRoot").remove()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var n = t[a];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n)
        }
    }
    return function(t, a, n) {
        return a && e(t.prototype, a),
        n && e(t, n),
        t
    }
}()
  , pageContact = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var a = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return a.$element = e,
        a.$headerSvg = $(".gsap--header-svg"),
        a.$headerTitle = $(".gsap--header-title"),
        a.$headerContent = $(".gsap--header-content"),
        a.$headerImage = $(".gsap--header-image--contact"),
        a.$form = $(".gsap--contact-form"),
        a.map = document.getElementsByClassName("js-contact-map")[0],
        a.fileInput = document.getElementsByClassName("contact-body-form-file")[0],
        a.fileInputLabel = document.getElementsByClassName("js-contact-form-file")[0],
        a.onLeaveQueue = [],
        a.adjustFormBoxOffset(),
        a.renderDynamicInputSize(),
        a
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerContent, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerImage, .75, {
                opacity: 1,
                transform: "none"
            }), "-=1").add(TweenLite.to(this.$form, .75, {
                opacity: 1,
                transform: "none"
            }), "-=1").play()
        }
    }, {
        key: "adjustFormBoxOffset",
        value: function() {
            var e = $("#contactFormBox")
              , t = $("#contactIntro")
              , a = $("#contactHeaderWrapper")
              , n = function() {
                var n = e.offset().top + e.outerHeight()
                  , o = t.offset().top + t.outerHeight()
                  , r = n - o;
                a.css("margin-bottom", r > 0 ? r + "px" : 0),
                e.css("margin-bottom", r > 0 ? "-" + r + "px" : 0)
            };
            e.length && t.length && a.length && (n(),
            $(window).resize(function() {
                return n()
            }))
        }
    }, {
        key: "handleRightStickyLink",
        value: function() {
            var e = $(".stickylink-joinus")
              , t = $("#changeStickyColor")
              , a = $("#stopStickyTrigger");
            e.length && $(window).on("scroll", function() {
                var n = e.offset().top + e.outerHeight();
                if (t.length) {
                    var o = t.offset().top + t.outerHeight();
                    e.css("color", n > o - 300 ? "#000" : "#fff")
                }
                if (a.length) {
                    var r = a.offset().top;
                    e.css("opacity", n > r ? "0" : "1")
                }
            })
        }
    }, {
        key: "renderDynamicInputSize",
        value: function() {
            var e = $(".adapt-input-fields");
            e.each(function(t) {
                var a = e[t];
                $(a).wrap('<div class="adapt-input__wrapper"></div>'),
                $(a).after('<p id="adaptField' + t + '" class="adapt-input__ref">' + $(a).attr("placeholder") + "</p>"),
                $(a).on("input", function() {
                    var e = "" === $(this).val() ? $(this).attr("placeholder") : $(this).val().replace(/ /g, "&nbsp;");
                    $("#adaptField" + t).html(e)
                })
            })
        }
    }, {
        key: "addFileToForm",
        value: function() {
            var e = $(".contact-file-input")
              , t = $("#contactJoinFileName")
              , a = $("#contactJoinFileButton")
              , n = $("#contactJoinFileWrapper")
              , o = $("#contactJoinFileReset")
              , r = $("#contactFileGuide");
            if (e.length && t.length && a.length && n.length && o.length) {
                a.on("click", function() {
                    return e.trigger("click")
                });
                var i = function() {
                    var a = e.get(0).files[0];
                    t.text(a ? a.name : ""),
                    n.css("display", a ? "block" : "none")
                }
                  , l = function() {
                    var t = e.get(0).files[0]
                      , a = 31457280;
                    $("#fileTooLarge").length && $("#fileTooLarge").remove(),
                    t && (t.size <= a ? i() : (e.val(""),
                    r.length && r.after('<p id="fileTooLarge" class="file-row__too-large">Le fichier est trop volumineux (' + t.size / 1024 / 1024 + " MO). Merci d'importer un fichier dont la taille n'exède pas 30 MO.</p>")))
                };
                e.on("change", function() {
                    return l()
                }),
                o.on("click", function() {
                    e.val(""),
                    i()
                })
            }
        }
    }, {
        key: "displayErrorsOnSubmit",
        value: function() {
            var e = $(".js-contact-form")
              , t = $("#contactFormSubmitBtn");
            t.length && t.on("click", function() {
                var a = $("#contactFormMissingFields")
                  , n = t.find(".js-contact-submit");
                if (a.length && n.length && "disabled" === n.attr("disabled")) {
                    a.css("display", "block");
                    var o = a.offset().top - 70;
                    $("html, body").animate({
                        scrollTop: o
                    }, 500);
                    var r = e[0].elements;
                    r.length && $(r).each(function(e) {
                        $(r[e]).removeClass("invalid-field")
                    }),
                    e[0].reportValidity();
                    var i = e.find(":invalid");
                    i.length && i.each(function(e) {
                        return $(i[e]).addClass("invalid-field")
                    })
                }
            })
        }
    }, {
        key: "pageScripts",
        value: function() {
            var e = this
              , t = $(".js-contact-form")
              , a = $(".js-contact-submit");
            this.displayErrorsOnSubmit(),
            a.length && a.on("click", function(t) {
                "disabled" !== a.attr("disabled") && e.submitForm(t)
            }),
            t.length && a.length && (a.attr("disabled", !0),
            t.on("change", function() {
                a.attr("disabled", !t[0].checkValidity())
            })),
            new Promise(function(e, t) {
                IS_GMAPS_LOADED ? e() : jQuery.ajax({
                    url: "https://maps.googleapis.com/maps/api/js?key=" + KEY_GMAPS,
                    dataType: "script",
                    async: !1,
                    success: function() {
                        IS_GMAPS_LOADED = !0,
                        e()
                    }
                })
            }
            ).then(function() {
                e.renderMap(),
                e.initTabs(),
                e.fileInput.addEventListener("change", function() {
                    e.customFileInput()
                })
            }),
            this.handleRightStickyLink();
            var n = $("#establishing_contact_synopsis");
            n.on("input", function() {
                n.css("height", "1px"),
                n.css("height", n[0].scrollHeight)
            }),
            this.addFileToForm()
        }
    }, {
        key: "renderMap",
        value: function() {
            var e = {
                zoom: 15,
                disableDefaultUI: !0,
                styles: [{
                    elementType: "geometry",
                    stylers: [{
                        color: "#f5f5f5"
                    }]
                }, {
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#616161"
                    }]
                }, {
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#f5f5f5"
                    }]
                }, {
                    featureType: "administrative.land_parcel",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#bdbdbd"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{
                        color: "#eeeeee"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#757575"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{
                        color: "#e5e5e5"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#9e9e9e"
                    }]
                }, {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{
                        color: "#ffffff"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#757575"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{
                        color: "#dadada"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#616161"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#9e9e9e"
                    }]
                }, {
                    featureType: "transit.line",
                    elementType: "geometry",
                    stylers: [{
                        color: "#e5e5e5"
                    }]
                }, {
                    featureType: "transit.station",
                    elementType: "geometry",
                    stylers: [{
                        color: "#eeeeee"
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{
                        color: "#c9c9c9"
                    }]
                }, {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#9e9e9e"
                    }]
                }]
            }
              , t = Array.from(document.getElementsByClassName("js-contact-map") || [])
              , a = function(t) {
                var a = {
                    lat: parseFloat(t.getAttribute("data-lat")) || 45.764163,
                    lng: parseFloat(t.getAttribute("data-lng")) || 4.848126
                }
                  , n = a
                  , o = new google.maps.Map(t,Object.assign(e, {
                    center: n
                }));
                new google.maps.Marker({
                    position: a,
                    map: o,
                    icon: "/build/img/ui/pin.svg"
                })
            };
            t.forEach(a)
        }
    }, {
        key: "initTabs",
        value: function() {
            var e = this
              , t = function(e) {
                return Array.from(document.querySelectorAll(e))
            }
              , a = t("[data-tabs-for]")
              , n = function(e) {
                return e.classList.contains("active") ? null : e.classList.add("active")
            }
              , o = function(e) {
                return e.classList.remove("active")
            }
              , r = function(e) {
                var a = e.target.getAttribute("data-tabs-for")
                  , r = e.target.getAttribute("data-tabs-group")
                  , i = t('[data-tabs-for][data-tabs-group="' + r + '"]') || t("[data-tabs-for]")
                  , l = t('[data-tabs-id][data-tabs-group="' + r + '"]') || t("[data-tabs-for]")
                  , s = i.filter(function(e) {
                    return e.getAttribute("data-tabs-for") === a
                })
                  , c = l.filter(function(e) {
                    return e.getAttribute("data-tabs-id") === a
                });
                i.forEach(o),
                l.forEach(o),
                s.forEach(n),
                c.forEach(n)
            };
            a.forEach(function(t) {
                t.addEventListener("click", r),
                e.onLeaveQueue.push(function() {
                    t && t.removeEventListener("click", r)
                })
            })
        }
    }, {
        key: "customFileInput",
        value: function() {
            var e = this.fileInput.value.split("\\")
              , t = e.length;
            this.fileInputLabel.querySelector("span").innerHTML = _.truncate(e[t - 1], {
                length: 15
            }),
            this.fileInput.value.length > 0 && (document.getElementsByClassName("js-file-arrow")[0].classList.add("d-none"),
            document.getElementsByClassName("js-file-selected")[0].classList.remove("d-none"))
        }
    }, {
        key: "afterSubmit",
        value: function() {
            var e = $("#contactDefault")
              , t = $("#contactConfirmation")
              , a = 0;
            if (e.length && t.length) {
                var n = $("#contactFormBox").offset().top - 100;
                $("html, body").animate({
                    scrollTop: n
                }, 500),
                e.css("display", "none"),
                t.css("display", "block");
                var o = $("#contactLocations");
                o.length && (a = o.css("margin-top"),
                o.css("margin-top", "70px"),
                this.adjustFormBoxOffset())
            }
        }
    }, {
        key: "submitForm",
        value: function(e) {
            var t = this;
            e.preventDefault();
            var a = $(".js-contact-form");
            if (a) {
                var n = grecaptcha.getResponse();
                if ("" === n) {
                    var o = $("#recaptchaError");
                    o.length && o.css("display", "block")
                } else
                    a[0].checkValidity() ? $.ajax({
                        url: a.attr("action"),
                        type: "POST",
                        data: new FormData(a[0]),
                        contentType: !1,
                        processData: !1,
                        success: function() {
                            t.afterSubmit(),
                            grecaptcha.reset(),
                            "undefined" != typeof ga && ga("send", "event", "Contact", "Envoyer")
                        },
                        error: function(e) {
                            console.error(e.responseJSON);
                            var t = e.responseJSON
                              , a = $("#contactDefault")
                              , n = $("#contactFormBox");
                            if (a && t) {
                                var o = Object.values(t);
                                if (o && o.length > 0) {
                                    var r = n.length ? n.offset().top - 70 : 0;
                                    $("html, body").animate({
                                        scrollTop: r
                                    }, 500),
                                    o.forEach(function(e) {
                                        a.prepend('<p class="contact-form__errors show">' + e + "</p>")
                                    })
                                }
                            }
                            grecaptcha.reset()
                        }
                    }) : a[0].reportValidity()
            }
        }
    }, {
        key: "onLeave",
        value: function() {
            this.onLeaveQueue.forEach(function(e) {
                "function" == typeof e && e()
            })
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageData = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerContent = $(".gsap--header-content"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    IS_BACKGROUND_MORPH_ENABLED = !0,
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageDesign = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerContent = $(".gsap--header-content"),
        n.$headerLetters = $(".gsap--header-letters span"),
        n.scrollBubbles = Array.from(document.querySelectorAll(".section-ref1, .section-ref2")),
        n.frameLoop = new FrameLoop,
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            var e = new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375")
              , t = .85;
            Array.from(this.$headerLetters).forEach(function(n, r) {
                e.add(TweenLite.to(n, t, {
                    opacity: 1,
                    transform: "none"
                }), "-=" + (t + .5 * Math.random()))
            }),
            e.play()
        }
    }, {
        key: "pageScripts",
        value: function() {
            var e = [];
            this.scrollBubbles.forEach(function(t) {
                var n = 200
                  , r = t.querySelector("img")
                  , o = .5 * (n - 100)
                  , a = function() {
                    i -= .1 * (i - s),
                    r.style.transform = "translate3d(calc(-50% + " + i + "vw), 0, 0)"
                }
                  , i = -o
                  , s = i;
                t.style.width = n + "vw",
                e.push(a),
                inviewPercent.add(t, function(e) {
                    var t = e.status
                      , n = e.value
                      , r = void 0 === n ? 0 : n;
                    switch (t) {
                    case "ENTER":
                    case "EXIT":
                        break;
                    case "PERCENT":
                    default:
                        s = (r - .5) * o * 2
                    }
                })
            }),
            this.frameLoop.callback = function() {
                e.forEach(function(e) {
                    e()
                })
            }
            ,
            this.frameLoop.start()
        }
    }, {
        key: "onLeave",
        value: function() {
            this.frameLoop.stop(),
            this.scrollBubbles.forEach(function(e) {
                e.style.border = "",
                inviewPercent.remove(e)
            })
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageExpertiseConseil = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerLinkExpert = $(".expertise-headerlink"),
        n.$headerLinkExpertSlide = $(".gsap--expertise-headerlink"),
        n.$headerContent = $(".gsap--header-content"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    IS_BACKGROUND_MORPH_ENABLED = !0,
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").add(TweenLite.to(this.$headerLinkExpertSlide, .75, {
                opacity: 1,
                visibility: "visible"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageExpertiseDev = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerLinkExpertSlide = $(".gsap--expertise-headerlink"),
        n.$headerLinkExpert = $(".expertise-headerlink"),
        n.$headerContent = $(".gsap--header-content"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").add(TweenLite.to(this.$headerLinkExpertSlide, .75, {
                opacity: 1,
                visibility: "visible"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n)
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r),
        n && e(t, n),
        t
    }
}()
  , pageExpertiseEcommerce = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var r = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        r.$element = e,
        r.$headerSvg = $(".gsap--header-svg"),
        r.$headerTitle = $(".gsap--header-title"),
        r.$headerText = $(".gsap--header-text"),
        r.$headerLink = $(".gsap--header-link"),
        r.$headerLinkExpertSlide = $(".gsap--expertise-headerlink"),
        r.$headerLinkExpert = $(".expertise-headerlink"),
        r.$headerContent = $(".gsap--header-content");
        var n = document.querySelector("body .content");
        return n.style.overflow = "initial",
        n.style.overflowX = "initial",
        r.initSlider(),
        r.initOnScroll(),
        r
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "initSlider",
        value: function() {
            var e = document.querySelector(".testimonials-slider")
              , t = document.querySelectorAll(".carousel-cell")
              , r = Math.floor(Math.random() * t.length);
            t.forEach(function(e, t) {
                t !== r && e.remove()
            }),
            this.$testimonialsSlider = new Flickity(e,{
                cellAlign: "left",
                lazyLoad: !1,
                pageDots: !1
            })
        }
    }, {
        key: "initOnScroll",
        value: function() {
            var e = Array.from(document.querySelectorAll("#performer-nav ul li a")).reverse()
              , t = {
                "#performer-heart": document.querySelector("#performer-heart"),
                "#performer-business": document.querySelector("#performer-business"),
                "#performer-compta": document.querySelector("#performer-compta"),
                "#performer-relation": document.querySelector("#performer-relation"),
                "#performer-delivery": document.querySelector("#performer-delivery")
            };
            $(window).on("scroll", function() {
                var r = null;
                e.forEach(function(e) {
                    e.parentNode.classList = "",
                    t[e.dataset.target].getBoundingClientRect().top < e.getBoundingClientRect().top && null == r && (r = e.parentNode,
                    e.parentNode.classList = "focused")
                })
            })
        }
    }, {
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").add(TweenLite.to(this.$headerLinkExpertSlide, .75, {
                opacity: 1,
                visibility: "visible"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n),
        o && e(t, o),
        t
    }
}()
  , pageExpertiseSolution = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerLinkExpertSlide = $(".gsap--expertise-headerlink"),
        n.$headerLinkExpert = $(".expertise-headerlink"),
        n.$headerContent = $(".gsap--header-content"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    IS_HEADER_SVG_ANIMABLE = !0,
                    BREATHING_SVGS = [".js-team-svg > path", ".js-expertise-svg > path", ".js-zou-svg > path", ".js-expertise-solution-cto-svg > path", ".js-expertise-solution-amoa-svg > path", ".js-expertise-solution-recrutement-svg > path", ".section-temoignage .section-temoignage-quote-svg svg > path", ".section-temoignage .section-temoignage-author-svg > defs > mask > path"],
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").add(TweenLite.to(this.$headerLinkExpertSlide, .75, {
                opacity: 1,
                visibility: "visible"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n)
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o),
        n && e(t, n),
        t
    }
}()
  , pageHome = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var o = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return o.$element = e,
        o.$headerSvg = $(".gsap--header-svg"),
        o.$headerImage = $(".gsap--header-image"),
        o.$headerTitle = $(".gsap--header-title"),
        o.$headerText = $(".gsap--header-text"),
        o.$headerLink = $(".gsap--header-link"),
        o.initSlider(),
        o
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    IS_BACKGROUND_MORPH_ENABLED = !0,
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerImage, .25, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }, {
        key: "pageScripts",
        value: function() {
            $(".js-sur-mesure-bubbles, .js-vous-bubbles").find(".page-home-bubble-color svg > g").on("mouseenter", function(e) {
                e.stopPropagation();
                var t = $(this).attr("data-selector");
                $(t + " >.page-home-bubble-color").addClass("page-home-bubble-color--hovered"),
                $(t + " > .page-home-bubble-white").addClass("page-home-bubble-white--visible"),
                $(".page-home-bubble:not(" + t + ") > .page-home-bubble-color").addClass("page-home-bubble-color--hidden")
            }).on("mouseleave", function(e) {
                var t = $(this).attr("data-selector");
                $(t + " >.page-home-bubble-color").removeClass("page-home-bubble-color--hovered"),
                $(t + " > .page-home-bubble-white").removeClass("page-home-bubble-white--visible"),
                $(".page-home-bubble:not(" + t + ") > .page-home-bubble-color").removeClass("page-home-bubble-color--hidden")
            }),
            $(".section-sur-mesure").on("click", function() {})
        }
    }, {
        key: "initSlider",
        value: function() {
            this.$testimonialsSlider = new Flickity(".testimonials-slider",{
                cellAlign: "left",
                lazyLoad: !1,
                prevNextButtons: !1,
                pageDots: !1,
                cellSelector: ".flickity"
            })
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageJob = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerContent = $(".gsap--header-content"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1,
            a.configurable = !0,
            "value"in a && (a.writable = !0),
            Object.defineProperty(e, a.key, a)
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n),
        a && e(t, a),
        t
    }
}()
  , pageLandingPage = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        n.$element = e,
        n.$morphBg = $(".morph-wrap"),
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerContent = $(".gsap--header-content"),
        n.clients = $(".clients-slider").children().length,
        n.isSubmitting = !1;
        new Flickity(".steps-slider",{
            cellAlign: "left",
            lazyLoad: !0,
            prevNextButtons: n.clients > 1,
            pageDots: !1
        }),
        new Flickity(".clients-slider",{
            cellAlign: "center",
            lazyLoad: !0,
            prevNextButtons: n.clients > 1,
            pageDots: !1
        });
        return window.addEventListener("scroll", function() {
            window.scrollY > $(".header-svg").height() && 1 !== n.$morphBg.css("opacity") ? n.$morphBg.css("opacity", 1) : window.scrollY <= $(".header-svg").height() && 0 !== n.$morphBg.css("opacity") && n.$morphBg.css("opacity", 0)
        }),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    IS_BACKGROUND_MORPH_ENABLED = !0,
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                opacity: .99
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }, {
        key: "pageScripts",
        value: function() {
            var e = this;
            $(".js-contact-submit").on("click", function(t) {
                e.submitForm(t)
            }),
            this.handlePhoneValidity()
        }
    }, {
        key: "handlePhoneValidity",
        value: function() {
            $("#landing_page_contact_phone").on("blur", function(e) {
                e.currentTarget.checkValidity() || e.currentTarget.classList.add("is-invalid")
            }),
            $("#landing_page_contact_phone").on("focus", function(e) {
                e.currentTarget.classList.remove("is-invalid")
            })
        }
    }, {
        key: "submitForm",
        value: function(e) {
            var t = this;
            if (e.preventDefault(),
            !this.isSubmitting) {
                var n = $(".js-contact-form")
                  , a = $(".g-recaptcha .form-error-message");
                if ($(".is-invalid").removeClass("is-invalid"),
                a.remove(),
                $("#seo_master_page_contact_phone")[0] && !$("#seo_master_page_contact_phone")[0].checkValidity())
                    return void $("#landingContact .g-recaptcha").append('<span class="form-error-message">Merci d\'entrer un format de numéro de téléphone valide</span>');
                if ($("#landing_page_contact_phone")[0] && !$("#landing_page_contact_phone")[0].checkValidity())
                    return void $("#landingContact .g-recaptcha").append('<span class="form-error-message">Merci d\'entrer un format de numéro de téléphone valide</span>');
                this.isSubmitting = !0,
                $.ajax({
                    url: n.attr("action"),
                    type: "POST",
                    data: new FormData(n[0]),
                    contentType: !1,
                    processData: !1,
                    success: function(e) {
                        $("#landingContact").fadeOut({
                            complete: function() {
                                $(this).html(e).fadeIn()
                            }
                        }),
                        window.matchMedia("(max-width: 992px)").matches ? $("html, body").animate({
                            scrollTop: $("#landingContact").offset().top - 150
                        }, 300) : $("html, body").animate({
                            scrollTop: $("#landingContact").offset().top - 400
                        }, 300)
                    },
                    error: this.submitError,
                    complete: function() {
                        t.isSubmitting = !1
                    }
                }),
                $(document).on("input", ".is-invalid", function() {
                    $(this).removeClass("is-invalid")
                }),
                "undefined" != typeof ga && ga("send", "event", "Contact", "Envoyer"),
                grecaptcha.reset()
            }
        }
    }, {
        key: "submitError",
        value: function(e) {
            var t = {};
            try {
                t = jQuery.parseJSON(e.responseText)
            } catch (e) {
                return void console.error("Mauvais format JSON reçu")
            }
            var n = $(".g-recaptcha .form-error-message");
            $.each(t, function(e) {
                if ($("#landing_page_contact_" + e).addClass("is-invalid"),
                "recaptcha" === e) {
                    var a = t.recaptcha;
                    0 === n.length && $("#landingContact .g-recaptcha").append('<span class="form-error-message">' + a + "</span>")
                }
            }),
            Object.keys(t).length > 0 && Object.keys(t).some(function(e) {
                return "recaptcha" != e
            }) && $("#landingContact .g-recaptcha").append('<span class="form-error-message">Merci de renseigner les champs obligatoires ci-dessus</span>')
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageMobile = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerImage = $(".gsap--header-image"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerLinks = $(".gsap--expertise-headerlink"),
        n.$headerContent = $(".gsap--header-content"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    IS_BACKGROUND_MORPH_ENABLED = !0,
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerImage, .25, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").add(TweenLite.to(this.$headerLinks, .75, {
                opacity: 1,
                visibility: "visible"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageReact = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerContent = $(".gsap--header-content"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    IS_BACKGROUND_MORPH_ENABLED = !0,
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n)
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o),
        n && e(t, n),
        t
    }
}()
  , pageReference = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var o = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        o.$element = e,
        o.$headerSvg = $(".gsap--header-svg"),
        o.$headerTitle = $(".gsap--header-title"),
        o.$headerText = $(".gsap--header-text"),
        o.$headerLink = $(".gsap--header-link"),
        o.$headerImage = $(".gsap--header-image");
        var n = $("#stopStickyTrigger");
        return window.location.hash && ($("html, body").animate({
            scrollTop: $(window.location.hash).offset().top + 60
        }, 2e3),
        $("html, body").animate({
            scrollTop: $(window.location.hash).offset().top - 50
        }, 1e3)),
        $.fn.isInViewport = function() {
            var e = $(this).offset()
              , t = null != e ? e.top : null
              , o = t + $(this).outerHeight()
              , n = $(window).scrollTop()
              , r = n + $(window).height();
            return o > n && t < r
        }
        ,
        $(window).on("resize scroll", function() {
            var e = ["welcome", "mission", "teamwork", "looklike", "results"];
            e.forEach(function(e) {
                $("#" + e).isInViewport() ? ($(".page-anchor").removeClass("visible"),
                $(".page-anchor--" + e).addClass("visible")) : $(".page-anchor--" + e).removeClass("visible")
            }),
            $(document).scrollTop() > 1200 ? $(".page-anchors-wrapper").addClass("sticky") : $(".page-anchors-wrapper").removeClass("sticky");
            var t = $(".page-anchor").offset().top + $(".page-anchor").outerHeight();
            if (n.length) {
                var o = n.offset().top;
                $(".page-anchors").css("transition", "all 1s"),
                $(".page-anchors").css("opacity", t > o ? "0" : "1")
            }
        }),
        document.querySelectorAll('a[href^="#"]').forEach(function(e) {
            e.addEventListener("click", function(e) {
                e.preventDefault(),
                document.querySelector(this.getAttribute("href")).scrollIntoView({
                    behavior: "smooth"
                })
            })
        }),
        o
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerImage, 1, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "rotateZ(-3deg)",
                transformOrigin: "-40% 0%"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var s = 0; s < t.length; s++) {
            var i = t[s];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
    }
    return function(t, s, i) {
        return s && e(t.prototype, s),
        i && e(t, i),
        t
    }
}()
  , pageReferences = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var s = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        s.$element = e,
        s.$headerSvg = $(".gsap--header-svg"),
        s.$headerTitle = $(".gsap--header-title"),
        s.$headerText = $(".gsap--header-text"),
        s.$headerLink = $(".gsap--header-link"),
        s.$reference = $(".js-reference"),
        s.$customerCases = $("#cases"),
        s.$filtersSector = $("#filters-sector"),
        s.$filtersType = $("#filters-type"),
        s.$filtersReset = $(".reset"),
        s.$filterCheckboxes = $(".filter"),
        s.$logosItem = $(".references-logos-item"),
        s.$logosWrapper = $(".references-logos-filters-wrapper"),
        s.$testimonialsItem = $(".testimonials-item"),
        s.$customerCasesItem = $(".reference"),
        s.$buttonSectorActivity = $("#sector-activity"),
        s.$buttonAccompaniement = $("#accompaniement");
        var i = $(".stickylink-cases")
          , r = $("#references")
          , n = $(".testimonials-container")
          , o = parseInt(i.css("top").split("px")[0]);
        s.initSlider();
        var a = function() {
            var e = window.scrollY + o;
            e > n.offset().top + 150 ? i.css({
                right: "-40px"
            }) : i.css({
                right: "40px"
            }),
            e > r.offset().top && e < n.offset().top ? i.css({
                color: "#252C3D"
            }) : i.css({
                color: "white"
            }),
            i.css({
                opacity: "0.85"
            })
        };
        return a(),
        document.addEventListener("scroll", function(e) {
            window.requestAnimationFrame(a)
        }),
        s.filterClients(),
        s.updateResults(),
        s
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "initSlider",
        value: function() {
            this.$testimonialsSlider = new Flickity(".testimonials-slider",{
                cellAlign: "left",
                lazyLoad: !1,
                prevNextButtons: !0,
                pageDots: !1,
                cellSelector: ".flickity"
            })
        }
    }, {
        key: "updateResults",
        value: function() {
            var e = []
              , t = [];
            this.$filtersSector.find("input:checked").each(function() {
                e.push($(this).val())
            }),
            this.$filtersType.find("input:checked").each(function() {
                t.push($(this).val())
            });
            var s = function(s, i) {
                var r = $(i).data("sectors").split(",")
                  , n = $(i).data("accompaniments").split(",");
                if (0 === e.length && 0 === t.length)
                    return !0;
                for (var o = 0; o < e.length; o++)
                    if ($.inArray(e[o], r) !== -1)
                        return !0;
                for (var a = 0; a < t.length; a++)
                    if ($.inArray(t[a], n) !== -1)
                        return !0;
                return !1
            };
            this.$logosItem.removeClass("inview---delayed").addClass("hidden").filter(s).removeClass("hidden");
            var i = this.$testimonialsItem.filter(s).length > 0 ? this.$testimonialsItem.filter(s) : this.$testimonialsItem;
            this.$testimonialsItem.removeClass("inview---delayed").removeClass("flickity").hide().filter(i).addClass("flickity").show(),
            this.$testimonialsSlider.destroy(),
            this.initSlider();
            var r = this.$customerCasesItem.sort(function() {
                return Math.round(Math.random()) - .5
            })
              , n = 0 === r.not(s).length
              , o = $.merge(r.filter(s), r.not(s))
              , a = this.$customerCases.data("bubble-viewbox-odd")
              , l = this.$customerCases.data("bubble-values-odd")
              , c = this.$customerCases.data("bubble-viewbox-even")
              , d = this.$customerCases.data("bubble-values-even");
            o.each(function(e) {
                var t = $(this).find(".js-references-illustration-background-svg")
                  , s = t.find("animate");
                e % 2 === 1 ? ($(this).addClass("reference--alt"),
                t.attr("viewBox", a),
                s.attr("values", l)) : ($(this).removeClass("reference--alt"),
                t.attr("viewBox", c),
                s.attr("values", d)),
                e < 7 || n ? $(this).show() : $(this).hide()
            }),
            this.$customerCases.empty(),
            this.$customerCases.append(o)
        }
    }, {
        key: "filterClients",
        value: function() {
            var e = this;
            this.$buttonSectorActivity.on("click", function() {
                e.$filtersSector.removeClass("hidden"),
                e.$filtersType.addClass("hidden"),
                e.$filterCheckboxes.prop("checked", !1),
                e.$logosItem.removeClass("hidden"),
                e.$testimonialsItem.removeClass("hidden"),
                e.$customerCasesItem.removeClass("hidden"),
                e.$logosWrapper.height(e.$filtersSector.innerHeight()),
                e.updateResults()
            }),
            this.$buttonAccompaniement.on("click", function() {
                e.$filtersSector.addClass("hidden"),
                e.$filtersType.removeClass("hidden"),
                e.$filterCheckboxes.prop("checked", !1),
                e.$logosItem.removeClass("hidden"),
                e.$testimonialsItem.removeClass("hidden"),
                e.$customerCasesItem.removeClass("hidden"),
                e.$logosWrapper.height(e.$filtersType.innerHeight()),
                e.updateResults()
            }),
            this.$filtersReset.on("click", function() {
                e.$buttonSectorActivity.prop("checked", !1),
                e.$buttonAccompaniement.prop("checked", !1),
                e.$filterCheckboxes.prop("checked", !1),
                e.$filtersSector.addClass("hidden"),
                e.$filtersType.addClass("hidden"),
                e.$logosItem.removeClass("hidden"),
                e.$testimonialsItem.removeClass("hidden"),
                e.$customerCasesItem.removeClass("hidden"),
                e.$logosWrapper.height(0),
                e.updateResults()
            }),
            this.$filterCheckboxes.on("change", function() {
                return e.updateResults()
            })
        }
    }, {
        key: "openingAnimation",
        value: function() {
            this.$reference.removeClass("reference--hidden"),
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    IS_BACKGROUND_MORPH_ENABLED = !0,
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgFlat"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n)
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r),
        n && e(t, n),
        t
    }
}()
  , pageSeoMasterPage = function(e) {
    function t() {
        _classCallCheck(this, t);
        var e = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return window.addEventListener("scroll", function() {
            window.scrollY > $(".header-svg").height() + 100 && 1 !== e.$morphBg.css("opacity") ? e.$morphBg.css("opacity", 1) : window.scrollY <= $(".header-svg").height() + 100 && 0 !== e.$morphBg.css("opacity") && e.$morphBg.css("opacity", 0)
        }),
        e
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "handlePhoneValidity",
        value: function() {
            $("#seo_master_page_contact_phone").on("blur", function(e) {
                e.currentTarget.checkValidity() || e.currentTarget.classList.add("is-invalid")
            }),
            $("#seo_master_page_contact_phone").on("focus", function(e) {
                e.currentTarget.classList.remove("is-invalid")
            })
        }
    }, {
        key: "submitError",
        value: function(e) {
            var t = {};
            try {
                t = jQuery.parseJSON(e.responseText)
            } catch (e) {
                return void console.error("Mauvais format JSON reçu")
            }
            var r = $(".g-recaptcha .form-error-message");
            $.each(t, function(e) {
                if ($("#seo_master_page_contact_" + e).addClass("is-invalid"),
                "recaptcha" === e) {
                    var n = t.recaptcha;
                    0 === r.length && $("#landingContact .g-recaptcha").append('<span class="form-error-message">' + n + "</span>")
                }
            }),
            Object.keys(t).length > 0 && Object.keys(t).some(function(e) {
                return "recaptcha" != e
            }) && $("#landingContact .g-recaptcha").append('<span class="form-error-message">Merci de renseigner les champs obligatoires ci-dessus</span>')
        }
    }]),
    t
}(pageLandingPage);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageSitemap = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerContent = $(".gsap--header-content"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageSurMesure = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerContent = $(".gsap--header-content"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageSymfonyLovers = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerImage = $(".gsap--header-image"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerContent = $(".gsap--header-content"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    IS_BACKGROUND_MORPH_ENABLED = !0,
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerImage, .25, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n),
        o && e(t, o),
        t
    }
}()
  , pageTeam = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerContent = $(".gsap--header-content"),
        n.astroArray = ["Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poisson"],
        n.teamArray = ["Team GP", "Team Biz", "Team Tech", "Team Data", "Team Management et Team GP", "Team Management et Team Conseil", "Team Conseil", "Team Management", "Team Communication", "Team UX/UI"],
        window.location.hash && ($("html, body").animate({
            scrollTop: $(window.location.hash).offset().top + 60
        }, 2e3),
        $("html, body").animate({
            scrollTop: $(window.location.hash).offset().top - 50
        }, 1e3));
        var o = $(".stickylink-joinus")
          , a = $(".need-you-content .page-title").offset().top - $(window).height() / 2
          , r = $(".need-you-content .page-title").offset().top
          , i = $(".stickylink-geeks")
          , s = $("#geeks")
          , c = $(".team-jobs")
          , l = $(".zou").offset().top + $(".zou").height()
          , u = o.width()
          , p = i.width()
          , d = parseInt(o.css("top").split("px")[0])
          , f = function() {
            var e = window.scrollY + window.innerHeight
              , t = window.scrollY + d
              , n = a - (u + t)
              , f = Math.max(Math.min(100, n), u * -2);
            f != parseInt(o.css("top").split("px")[0]) && o.css({
                top: f + "px"
            });
            var m = r - t
              , h = e < l + 100 ? 100 : l + 200 - e
              , y = Math.min(Math.max(h, m), e + p);
            y != parseInt(i.css("top").split("px")[0]) && i.css({
                top: y + "px"
            }),
            t > s.offset().top && t < c.offset().top ? o.css({
                color: "#252C3D"
            }) : o.css({
                color: "white"
            }),
            t > c.offset().top && t < c.offset().top + c.height() ? i.css({
                color: "white"
            }) : i.css({
                color: "#252C3D"
            }),
            o.css({
                opacity: "0.85"
            }),
            i.css({
                opacity: "0.85"
            })
        };
        return f(),
        document.addEventListener("scroll", function(e) {
            window.requestAnimationFrame(f)
        }),
        n.initSortDoudous(),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "initSortDoudous",
        value: function() {
            var e = $(".dropdown-btn")
              , t = $(".blob-btn__element")
              , n = this;
            t.each(function() {
                var t = $(".blob-btn__first")
                  , o = $(this);
                o.on("click", function() {
                    var a = o.text()
                      , r = o.data("type");
                    o.text(t.text()),
                    o.data("type", t.data("type")),
                    t.text(a),
                    t.data("type", r),
                    e.blur(),
                    n.sortDoudous(r)
                })
            }),
            this.sortDoudous("size")
        }
    }, {
        key: "sortDoudous",
        value: function(e) {
            var t = this
              , n = $(".team-members-blocks").children().sort(function(n, o) {
                if ("size" === e) {
                    var a = parseInt($(n).data("size"), 10)
                      , r = parseInt($(o).data("size"), 10);
                    return r - a
                }
                if ("astro" === e) {
                    var i = t.astroArray.findIndex(function(e) {
                        return e === $(n).data("astro")
                    })
                      , s = t.astroArray.findIndex(function(e) {
                        return e === $(o).data("astro")
                    });
                    return s - i
                }
                if ("team" === e) {
                    var c = t.teamArray.findIndex(function(e) {
                        return e === $(n).data("team")
                    })
                      , l = t.teamArray.findIndex(function(e) {
                        return e === $(o).data("team")
                    });
                    return l - c
                }
            });
            $(n).each(function(e) {
                n[e].classList.remove("inview---delayed"),
                e > 3 && n[e].classList.add("inview---delayed")
            }),
            $(".team-members-blocks").empty(),
            $(".team-members-blocks").append(n)
        }
    }, {
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "scale(1.35)",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
"use strict";
"use strict";
"use strict";
"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _possibleConstructorReturn(e, t) {
    if (!e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t
    }
}()
  , pageUx = function(e) {
    function t(e) {
        _classCallCheck(this, t);
        var n = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        return n.$element = e,
        n.$headerSvg = $(".gsap--header-svg"),
        n.$headerTitle = $(".gsap--header-title"),
        n.$headerText = $(".gsap--header-text"),
        n.$headerLink = $(".gsap--header-link"),
        n.$headerContent = $(".gsap--header-content"),
        n
    }
    return _inherits(t, e),
    _createClass(t, [{
        key: "openingAnimation",
        value: function() {
            new TimelineMax({
                onStart: function() {
                    EV_EMITTER.emitEvent("openingAnimationStart")
                },
                onComplete: function() {
                    IS_BACKGROUND_MORPH_ENABLED = !0,
                    EV_EMITTER.emitEvent("openingAnimationComplete")
                }
            }).add(TweenLite.to(this.$headerSvg, 1.5, {
                transform: "none",
                ease: "headerSvgRound"
            }), "-=0").add(TweenLite.to(this.$headerTitle, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.75").add(TweenLite.to(this.$headerText, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.5").add(TweenLite.to(this.$headerLink, .75, {
                opacity: 1,
                transform: "none"
            }), "-=0.375").play()
        }
    }]),
    t
}(Page);
