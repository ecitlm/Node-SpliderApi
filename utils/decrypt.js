const MYMD5 = require('md5')
const btoa = require('btoa')
const atob = require('atob')
const window = global
var Decrypt = (function (n, x, f) {
  var k = 'DECODE'
  var x = x || ''
  var f = f || 0
  var g = 4
  x = md5(x)
  var w = md5(x.substr(0, 16))
  var u = md5(x.substr(16, 16))
  if (g) {
    if (k == 'DECODE') {
      var b = md5(microtime())
      var d = b.length - g
      var t = b.substr(d, g)
    }
  } else {
    var t = ''
  }
  var r = w + md5(w + t)
  var m
  if (k == 'DECODE') {
    f = f ? f + time() : 0
    tmpstr = f.toString()
    if (tmpstr.length >= 10) {
      n = tmpstr.substr(0, 10) + md5(n + u).substr(0, 16) + n
    } else {
      var e = 10 - tmpstr.length
      for (var p = 0; p < e; p++) {
        tmpstr = '0' + tmpstr
      }
      n = tmpstr + md5(n + u).substr(0, 16) + n
    }
    m = n
  }
  var h = new Array(256)
  for (var p = 0; p < 256; p++) {
    h[p] = p
  }
  var q = []
  for (var p = 0; p < 256; p++) {
    q[p] = r.charCodeAt(p % r.length)
  }
  for (var o = (p = 0); p < 256; p++) {
    o = (o + h[p] + q[p]) % 256
    tmp = h[p]
    h[p] = h[o]
    h[o] = tmp
  }
  var l = ''
  m = m.split('')
  for (var v = (o = p = 0); p < m.length; p++) {
    v = (v + 1) % 256
    o = (o + h[v]) % 256
    tmp = h[v]
    h[v] = h[o]
    h[o] = tmp
    l += chr(ord(m[p]) ^ h[(h[v] + h[o]) % 256])
  }
  if (k == 'DECODE') {
    l = base64_encode(l)
    var c = new RegExp('=', 'g')
    l = l.replace(c, '')
    l = t + l
  }
  return l
})(
  (function () {
    var b =
      typeof exports !== 'undefined'
        ? exports
        : typeof self !== 'undefined'
          ? self
          : $.global
    var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

    function a (d) {
      this.message = d
    }
    a.prototype = new Error()
    a.prototype.name = 'InvalidCharacterError'
    b.btoa ||
      (b.btoa = function (g) {
        var j = String(g)
        for (
          var i, e, d = 0, h = c, f = '';
          j.charAt(d | 0) || ((h = '='), d % 1);
          f += h.charAt(63 & (i >> (8 - (d % 1) * 8)))
        ) {
          e = j.charCodeAt((d += 3 / 4))
          if (e > 255) {
            throw new a(
              "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
            )
          }
          i = (i << 8) | e
        }
        return f
      })
    b.atob ||
      (b.atob = function (g) {
        var j = String(g).replace(/[=]+$/, '')
        if (j.length % 4 == 1) {
          throw new a(
            "'atob' failed: The string to be decoded is not correctly encoded."
          )
        }
        for (
          var i = 0, h, e, d = 0, f = '';
          (e = j.charAt(d++));
          ~e && ((h = i % 4 ? h * 64 + e : e), i++ % 4)
            ? (f += String.fromCharCode(255 & (h >> ((-2 * i) & 6))))
            : 0
        ) {
          e = c.indexOf(e)
        }
        return f
      })
  })()
)

function base64_encode (a) {
  return btoa(a)
}

function base64_decode (a) {
  return atob(a)
}
;(function (g) {
  function o (u, z) {
    var w = (u & 65535) + (z & 65535),
      v = (u >> 16) + (z >> 16) + (w >> 16)
    return (v << 16) | (w & 65535)
  }

  function s (u, v) {
    return (u << v) | (u >>> (32 - v))
  }

  function c (A, w, v, u, z, y) {
    return o(s(o(o(w, A), o(u, y)), z), v)
  }

  function b (w, v, B, A, u, z, y) {
    return c((v & B) | (~v & A), w, v, u, z, y)
  }

  function i (w, v, B, A, u, z, y) {
    return c((v & A) | (B & ~A), w, v, u, z, y)
  }

  function n (w, v, B, A, u, z, y) {
    return c(v ^ B ^ A, w, v, u, z, y)
  }

  function a (w, v, B, A, u, z, y) {
    return c(B ^ (v | ~A), w, v, u, z, y)
  }

  function d (F, A) {
    F[A >> 5] |= 128 << (A % 32)
    F[(((A + 64) >>> 9) << 4) + 14] = A
    var w,
      z,
      y,
      v,
      u,
      E = 1732584193,
      D = -271733879,
      C = -1732584194,
      B = 271733878
    for (w = 0; w < F.length; w += 16) {
      z = E
      y = D
      v = C
      u = B
      E = b(E, D, C, B, F[w], 7, -680876936)
      B = b(B, E, D, C, F[w + 1], 12, -389564586)
      C = b(C, B, E, D, F[w + 2], 17, 606105819)
      D = b(D, C, B, E, F[w + 3], 22, -1044525330)
      E = b(E, D, C, B, F[w + 4], 7, -176418897)
      B = b(B, E, D, C, F[w + 5], 12, 1200080426)
      C = b(C, B, E, D, F[w + 6], 17, -1473231341)
      D = b(D, C, B, E, F[w + 7], 22, -45705983)
      E = b(E, D, C, B, F[w + 8], 7, 1770035416)
      B = b(B, E, D, C, F[w + 9], 12, -1958414417)
      C = b(C, B, E, D, F[w + 10], 17, -42063)
      D = b(D, C, B, E, F[w + 11], 22, -1990404162)
      E = b(E, D, C, B, F[w + 12], 7, 1804603682)
      B = b(B, E, D, C, F[w + 13], 12, -40341101)
      C = b(C, B, E, D, F[w + 14], 17, -1502002290)
      D = b(D, C, B, E, F[w + 15], 22, 1236535329)
      E = i(E, D, C, B, F[w + 1], 5, -165796510)
      B = i(B, E, D, C, F[w + 6], 9, -1069501632)
      C = i(C, B, E, D, F[w + 11], 14, 643717713)
      D = i(D, C, B, E, F[w], 20, -373897302)
      E = i(E, D, C, B, F[w + 5], 5, -701558691)
      B = i(B, E, D, C, F[w + 10], 9, 38016083)
      C = i(C, B, E, D, F[w + 15], 14, -660478335)
      D = i(D, C, B, E, F[w + 4], 20, -405537848)
      E = i(E, D, C, B, F[w + 9], 5, 568446438)
      B = i(B, E, D, C, F[w + 14], 9, -1019803690)
      C = i(C, B, E, D, F[w + 3], 14, -187363961)
      D = i(D, C, B, E, F[w + 8], 20, 1163531501)
      E = i(E, D, C, B, F[w + 13], 5, -1444681467)
      B = i(B, E, D, C, F[w + 2], 9, -51403784)
      C = i(C, B, E, D, F[w + 7], 14, 1735328473)
      D = i(D, C, B, E, F[w + 12], 20, -1926607734)
      E = n(E, D, C, B, F[w + 5], 4, -378558)
      B = n(B, E, D, C, F[w + 8], 11, -2022574463)
      C = n(C, B, E, D, F[w + 11], 16, 1839030562)
      D = n(D, C, B, E, F[w + 14], 23, -35309556)
      E = n(E, D, C, B, F[w + 1], 4, -1530992060)
      B = n(B, E, D, C, F[w + 4], 11, 1272893353)
      C = n(C, B, E, D, F[w + 7], 16, -155497632)
      D = n(D, C, B, E, F[w + 10], 23, -1094730640)
      E = n(E, D, C, B, F[w + 13], 4, 681279174)
      B = n(B, E, D, C, F[w], 11, -358537222)
      C = n(C, B, E, D, F[w + 3], 16, -722521979)
      D = n(D, C, B, E, F[w + 6], 23, 76029189)
      E = n(E, D, C, B, F[w + 9], 4, -640364487)
      B = n(B, E, D, C, F[w + 12], 11, -421815835)
      C = n(C, B, E, D, F[w + 15], 16, 530742520)
      D = n(D, C, B, E, F[w + 2], 23, -995338651)
      E = a(E, D, C, B, F[w], 6, -198630844)
      B = a(B, E, D, C, F[w + 7], 10, 1126891415)
      C = a(C, B, E, D, F[w + 14], 15, -1416354905)
      D = a(D, C, B, E, F[w + 5], 21, -57434055)
      E = a(E, D, C, B, F[w + 12], 6, 1700485571)
      B = a(B, E, D, C, F[w + 3], 10, -1894986606)
      C = a(C, B, E, D, F[w + 10], 15, -1051523)
      D = a(D, C, B, E, F[w + 1], 21, -2054922799)
      E = a(E, D, C, B, F[w + 8], 6, 1873313359)
      B = a(B, E, D, C, F[w + 15], 10, -30611744)
      C = a(C, B, E, D, F[w + 6], 15, -1560198380)
      D = a(D, C, B, E, F[w + 13], 21, 1309151649)
      E = a(E, D, C, B, F[w + 4], 6, -145523070)
      B = a(B, E, D, C, F[w + 11], 10, -1120210379)
      C = a(C, B, E, D, F[w + 2], 15, 718787259)
      D = a(D, C, B, E, F[w + 9], 21, -343485551)
      E = o(E, z)
      D = o(D, y)
      C = o(C, v)
      B = o(B, u)
    }
    return [E, D, C, B]
  }

  function p (v) {
    var w,
      u = ''
    for (w = 0; w < v.length * 32; w += 8) {
      u += String.fromCharCode((v[w >> 5] >>> (w % 32)) & 255)
    }
    return u
  }

  function j (v) {
    var w,
      u = []
    u[(v.length >> 2) - 1] = undefined
    for (w = 0; w < u.length; w += 1) {
      u[w] = 0
    }
    for (w = 0; w < v.length * 8; w += 8) {
      u[w >> 5] |= (v.charCodeAt(w / 8) & 255) << (w % 32)
    }
    return u
  }

  function k (u) {
    return p(d(j(u), u.length * 8))
  }

  function e (w, z) {
    var v,
      y = j(w),
      u = [],
      x = [],
      A
    u[15] = x[15] = undefined
    if (y.length > 16) {
      y = d(y, w.length * 8)
    }
    for (v = 0; v < 16; v += 1) {
      u[v] = y[v] ^ 909522486
      x[v] = y[v] ^ 1549556828
    }
    A = d(u.concat(j(z)), 512 + z.length * 8)
    return p(d(x.concat(A), 512 + 128))
  }

  function t (w) {
    var z = '0123456789abcdef',
      v = '',
      u,
      y
    for (y = 0; y < w.length; y += 1) {
      u = w.charCodeAt(y)
      v += z.charAt((u >>> 4) & 15) + z.charAt(u & 15)
    }
    return v
  }

  function m (u) {
    return unescape(encodeURIComponent(u))
  }

  function q (u) {
    return k(m(u))
  }

  function l (u) {
    return t(q(u))
  }

  function h (u, v) {
    return e(m(u), m(v))
  }

  function r (u, v) {
    return t(h(u, v))
  }

  function f (v, w, u) {
    if (!w) {
      if (!u) {
        return l(v)
      }
      return q(v)
    }
    if (!u) {
      return r(w, v)
    }
    return h(w, v)
  }
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return f
    })
  } else {
    g.md5 = f
  }
})(this)
;(function () {
  var b =
    typeof exports !== 'undefined'
      ? exports
      : typeof self !== 'undefined'
        ? self
        : $.global
  var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

  function a (d) {
    this.message = d
  }
  a.prototype = new Error()
  a.prototype.name = 'InvalidCharacterError'
  b.btoa ||
    (b.btoa = function (g) {
      var j = String(g)
      for (
        var i, e, d = 0, h = c, f = '';
        j.charAt(d | 0) || ((h = '='), d % 1);
        f += h.charAt(63 & (i >> (8 - (d % 1) * 8)))
      ) {
        e = j.charCodeAt((d += 3 / 4))
        if (e > 255) {
          throw new a(
            "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
          )
        }
        i = (i << 8) | e
      }
      return f
    })
  b.atob ||
    (b.atob = function (g) {
      var j = String(g).replace(/[=]+$/, '')
      if (j.length % 4 == 1) {
        throw new a(
          "'atob' failed: The string to be decoded is not correctly encoded."
        )
      }
      for (
        var i = 0, h, e, d = 0, f = '';
        (e = j.charAt(d++));
        ~e && ((h = i % 4 ? h * 64 + e : e), i++ % 4)
          ? (f += String.fromCharCode(255 & (h >> ((-2 * i) & 6))))
          : 0
      ) {
        e = c.indexOf(e)
      }
      return f
    })
})()

function time () {
  var a = new Date().getTime()
  return parseInt(a / 1000)
}

function microtime (b) {
  var a = new Date().getTime()
  var c = parseInt(a / 1000)
  return b ? a / 1000 : (a - c * 1000) / 1000 + ' ' + c
}

function chr (a) {
  return String.fromCharCode(a)
}

function ord (a) {
  return a.charCodeAt()
}

function md5 (a) {
  return MYMD5(a)
}
var Decrypt = function (m, r, d) {
  var e = 'DECODE'
  var r = r || ''
  var d = d || 0
  var q = 4
  r = md5(r)
  var o = md5(r.substr(0, 16))
  var n = md5(r.substr(16, 16))
  if (q) {
    if (e == 'DECODE') {
      var l = m.substr(0, q)
    }
  } else {
    var l = ''
  }
  var c = o + md5(o + l)
  var k
  if (e == 'DECODE') {
    m = m.substr(q)
    k = base64_decode(m)
  }
  var h = new Array(256)
  for (var g = 0; g < 256; g++) {
    h[g] = g
  }
  var b = []
  for (var g = 0; g < 256; g++) {
    b[g] = c.charCodeAt(g % c.length)
  }
  for (var f = (g = 0); g < 256; g++) {
    f = (f + h[g] + b[g]) % 256
    tmp = h[g]
    h[g] = h[f]
    h[f] = tmp
  }
  var t = ''
  k = k.split('')
  for (var p = (f = g = 0); g < k.length; g++) {
    p = (p + 1) % 256
    f = (f + h[p]) % 256
    tmp = h[p]
    h[p] = h[f]
    h[f] = tmp
    t += chr(ord(k[g]) ^ h[(h[p] + h[f]) % 256])
  }
  if (e == 'DECODE') {
    if (
      (t.substr(0, 10) == 0 || t.substr(0, 10) - time() > 0) &&
      t.substr(10, 16) == md5(t.substr(26) + n).substr(0, 16)
    ) {
      t = t.substr(26)
    } else {
      t = ''
    }
  }
  return t
}

var getSrc = function (hash) {
  var src = Decrypt(hash, 'hRjfspAULf8uY5e5xoRuayFW720hzIsQ')
  return src
}
//
//  f.remove();
// var c = jdSbHeTuv8eKma4dSbjSLg9uBNpK2EwZco(e, "");
// KgExNCEdN23zvEotcA3OYPotDU92ftMZ
// ugPz7LXXsrHVGePsFk2fVBOSq0S5xRL2
// QlbwafYuTdFLt9lnbhvSvON6SGdiigj9
// Aw9P1Fjfo2fJ0cigUoM094bJ4g8FPzop
// D11nyw0jmDtziL9rGhWpVG09WBdwjwWW
module.exports = {
  getSrc
}
