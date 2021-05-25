parcelRequire = (function (e, r, t, n) {
  var i,
    o = 'function' == typeof parcelRequire && parcelRequire,
    u = 'function' == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = 'function' == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && 'string' == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = 'MODULE_NOT_FOUND'), c);
      }
      (p.resolve = function (r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function (e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function (r, t) {
      e[r] = [
        function (e, r) {
          r.exports = t;
        },
        {}
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = l)
      : 'function' == typeof define && define.amd
      ? define(function () {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    tcB6: [
      function (require, module, exports) {
        'use strict';
        function e() {
          fill('yellow'), circle(width / 2, height / 2, 20);
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.myCircle = void 0),
          (exports.myCircle = e);
      },
      {}
    ],
    mMvg: [
      function (require, module, exports) {
        'use strict';
        function e() {
          for (var t = [], o = 0; o < arguments.length; o++)
            t[o] = arguments[o];
          var r = t[0],
            i = t[1],
            n = t[2],
            s = t[3],
            p = t[4];
          fill(237, 34, 93),
            textSize(98),
            noStroke(),
            i < r.length &&
              (text(r.substring(0, i + 1), n, s),
              (i += 1),
              setTimeout(function () {
                e(r, i, n, s, p);
              }, p),
              noLoop());
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.typeWriter = void 0),
          (exports.typeWriter = e);
      },
      {}
    ],
    ndqK: [
      function (require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.default = void 0);
        var n = {
            update: null,
            begin: null,
            loopBegin: null,
            changeBegin: null,
            change: null,
            changeComplete: null,
            loopComplete: null,
            complete: null,
            loop: 1,
            direction: 'normal',
            autoplay: !0,
            timelineOffset: 0
          },
          e = {
            duration: 1e3,
            delay: 0,
            endDelay: 0,
            easing: 'easeOutElastic(1, .5)',
            round: 0
          },
          t = [
            'translateX',
            'translateY',
            'translateZ',
            'rotate',
            'rotateX',
            'rotateY',
            'rotateZ',
            'scale',
            'scaleX',
            'scaleY',
            'scaleZ',
            'skew',
            'skewX',
            'skewY',
            'perspective',
            'matrix',
            'matrix3d'
          ],
          r = { CSS: {}, springs: {} };
        function a(n, e, t) {
          return Math.min(Math.max(n, e), t);
        }
        function u(n, e) {
          return n.indexOf(e) > -1;
        }
        function o(n, e) {
          return n.apply(null, e);
        }
        var i = {
          arr: function (n) {
            return Array.isArray(n);
          },
          obj: function (n) {
            return u(Object.prototype.toString.call(n), 'Object');
          },
          pth: function (n) {
            return i.obj(n) && n.hasOwnProperty('totalLength');
          },
          svg: function (n) {
            return n instanceof SVGElement;
          },
          inp: function (n) {
            return n instanceof HTMLInputElement;
          },
          dom: function (n) {
            return n.nodeType || i.svg(n);
          },
          str: function (n) {
            return 'string' == typeof n;
          },
          fnc: function (n) {
            return 'function' == typeof n;
          },
          und: function (n) {
            return void 0 === n;
          },
          nil: function (n) {
            return i.und(n) || null === n;
          },
          hex: function (n) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n);
          },
          rgb: function (n) {
            return /^rgb/.test(n);
          },
          hsl: function (n) {
            return /^hsl/.test(n);
          },
          col: function (n) {
            return i.hex(n) || i.rgb(n) || i.hsl(n);
          },
          key: function (t) {
            return (
              !n.hasOwnProperty(t) &&
              !e.hasOwnProperty(t) &&
              'targets' !== t &&
              'keyframes' !== t
            );
          }
        };
        function c(n) {
          var e = /\(([^)]+)\)/.exec(n);
          return e
            ? e[1].split(',').map(function (n) {
                return parseFloat(n);
              })
            : [];
        }
        function s(n, e) {
          var t = c(n),
            u = a(i.und(t[0]) ? 1 : t[0], 0.1, 100),
            o = a(i.und(t[1]) ? 100 : t[1], 0.1, 100),
            s = a(i.und(t[2]) ? 10 : t[2], 0.1, 100),
            f = a(i.und(t[3]) ? 0 : t[3], 0.1, 100),
            l = Math.sqrt(o / u),
            d = s / (2 * Math.sqrt(o * u)),
            p = d < 1 ? l * Math.sqrt(1 - d * d) : 0,
            v = 1,
            h = d < 1 ? (d * l - f) / p : -f + l;
          function g(n) {
            var t = e ? (e * n) / 1e3 : n;
            return (
              (t =
                d < 1
                  ? Math.exp(-t * d * l) *
                    (v * Math.cos(p * t) + h * Math.sin(p * t))
                  : (v + h * t) * Math.exp(-t * l)),
              0 === n || 1 === n ? n : 1 - t
            );
          }
          return e
            ? g
            : function () {
                var e = r.springs[n];
                if (e) return e;
                for (var t = 0, a = 0; ; )
                  if (1 === g((t += 1 / 6))) {
                    if (++a >= 16) break;
                  } else a = 0;
                var u = t * (1 / 6) * 1e3;
                return (r.springs[n] = u), u;
              };
        }
        function f(n) {
          return (
            void 0 === n && (n = 10),
            function (e) {
              return Math.ceil(a(e, 1e-6, 1) * n) * (1 / n);
            }
          );
        }
        var l = (function () {
            var n = 11,
              e = 1 / (n - 1);
            function t(n, e) {
              return 1 - 3 * e + 3 * n;
            }
            function r(n, e) {
              return 3 * e - 6 * n;
            }
            function a(n) {
              return 3 * n;
            }
            function u(n, e, u) {
              return ((t(e, u) * n + r(e, u)) * n + a(e)) * n;
            }
            function o(n, e, u) {
              return 3 * t(e, u) * n * n + 2 * r(e, u) * n + a(e);
            }
            return function (t, r, a, i) {
              if (0 <= t && t <= 1 && 0 <= a && a <= 1) {
                var c = new Float32Array(n);
                if (t !== r || a !== i)
                  for (var s = 0; s < n; ++s) c[s] = u(s * e, t, a);
                return function (n) {
                  return t === r && a === i
                    ? n
                    : 0 === n || 1 === n
                    ? n
                    : u(f(n), r, i);
                };
              }
              function f(r) {
                for (var i = 0, s = 1, f = n - 1; s !== f && c[s] <= r; ++s)
                  i += e;
                var l = i + ((r - c[--s]) / (c[s + 1] - c[s])) * e,
                  d = o(l, t, a);
                return d >= 0.001
                  ? (function (n, e, t, r) {
                      for (var a = 0; a < 4; ++a) {
                        var i = o(e, t, r);
                        if (0 === i) return e;
                        e -= (u(e, t, r) - n) / i;
                      }
                      return e;
                    })(r, l, t, a)
                  : 0 === d
                  ? l
                  : (function (n, e, t, r, a) {
                      var o,
                        i,
                        c = 0;
                      do {
                        (o = u((i = e + (t - e) / 2), r, a) - n) > 0
                          ? (t = i)
                          : (e = i);
                      } while (Math.abs(o) > 1e-7 && ++c < 10);
                      return i;
                    })(r, i, i + e, t, a);
              }
            };
          })(),
          d = (function () {
            var n = {
                linear: function () {
                  return function (n) {
                    return n;
                  };
                }
              },
              e = {
                Sine: function () {
                  return function (n) {
                    return 1 - Math.cos((n * Math.PI) / 2);
                  };
                },
                Circ: function () {
                  return function (n) {
                    return 1 - Math.sqrt(1 - n * n);
                  };
                },
                Back: function () {
                  return function (n) {
                    return n * n * (3 * n - 2);
                  };
                },
                Bounce: function () {
                  return function (n) {
                    for (var e, t = 4; n < ((e = Math.pow(2, --t)) - 1) / 11; );
                    return (
                      1 / Math.pow(4, 3 - t) -
                      7.5625 * Math.pow((3 * e - 2) / 22 - n, 2)
                    );
                  };
                },
                Elastic: function (n, e) {
                  void 0 === n && (n = 1), void 0 === e && (e = 0.5);
                  var t = a(n, 1, 10),
                    r = a(e, 0.1, 2);
                  return function (n) {
                    return 0 === n || 1 === n
                      ? n
                      : -t *
                          Math.pow(2, 10 * (n - 1)) *
                          Math.sin(
                            ((n - 1 - (r / (2 * Math.PI)) * Math.asin(1 / t)) *
                              (2 * Math.PI)) /
                              r
                          );
                  };
                }
              };
            return (
              ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'].forEach(function (
                n,
                t
              ) {
                e[n] = function () {
                  return function (n) {
                    return Math.pow(n, t + 2);
                  };
                };
              }),
              Object.keys(e).forEach(function (t) {
                var r = e[t];
                (n['easeIn' + t] = r),
                  (n['easeOut' + t] = function (n, e) {
                    return function (t) {
                      return 1 - r(n, e)(1 - t);
                    };
                  }),
                  (n['easeInOut' + t] = function (n, e) {
                    return function (t) {
                      return t < 0.5
                        ? r(n, e)(2 * t) / 2
                        : 1 - r(n, e)(-2 * t + 2) / 2;
                    };
                  }),
                  (n['easeOutIn' + t] = function (n, e) {
                    return function (t) {
                      return t < 0.5
                        ? (1 - r(n, e)(1 - 2 * t)) / 2
                        : (r(n, e)(2 * t - 1) + 1) / 2;
                    };
                  });
              }),
              n
            );
          })();
        function p(n, e) {
          if (i.fnc(n)) return n;
          var t = n.split('(')[0],
            r = d[t],
            a = c(n);
          switch (t) {
            case 'spring':
              return s(n, e);
            case 'cubicBezier':
              return o(l, a);
            case 'steps':
              return o(f, a);
            default:
              return o(r, a);
          }
        }
        function v(n) {
          try {
            return document.querySelectorAll(n);
          } catch (e) {
            return;
          }
        }
        function h(n, e) {
          for (
            var t = n.length,
              r = arguments.length >= 2 ? arguments[1] : void 0,
              a = [],
              u = 0;
            u < t;
            u++
          )
            if (u in n) {
              var o = n[u];
              e.call(r, o, u, n) && a.push(o);
            }
          return a;
        }
        function g(n) {
          return n.reduce(function (n, e) {
            return n.concat(i.arr(e) ? g(e) : e);
          }, []);
        }
        function m(n) {
          return i.arr(n)
            ? n
            : (i.str(n) && (n = v(n) || n),
              n instanceof NodeList || n instanceof HTMLCollection
                ? [].slice.call(n)
                : [n]);
        }
        function y(n, e) {
          return n.some(function (n) {
            return n === e;
          });
        }
        function b(n) {
          var e = {};
          for (var t in n) e[t] = n[t];
          return e;
        }
        function M(n, e) {
          var t = b(n);
          for (var r in n) t[r] = e.hasOwnProperty(r) ? e[r] : n[r];
          return t;
        }
        function x(n, e) {
          var t = b(n);
          for (var r in e) t[r] = i.und(n[r]) ? e[r] : n[r];
          return t;
        }
        function w(n) {
          var e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(n);
          return e ? 'rgba(' + e[1] + ',1)' : n;
        }
        function O(n) {
          var e = n.replace(
              /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              function (n, e, t, r) {
                return e + e + t + t + r + r;
              }
            ),
            t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
          return (
            'rgba(' +
            parseInt(t[1], 16) +
            ',' +
            parseInt(t[2], 16) +
            ',' +
            parseInt(t[3], 16) +
            ',1)'
          );
        }
        function k(n) {
          var e,
            t,
            r,
            a =
              /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n) ||
              /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n),
            u = parseInt(a[1], 10) / 360,
            o = parseInt(a[2], 10) / 100,
            i = parseInt(a[3], 10) / 100,
            c = a[4] || 1;
          function s(n, e, t) {
            return (
              t < 0 && (t += 1),
              t > 1 && (t -= 1),
              t < 1 / 6
                ? n + 6 * (e - n) * t
                : t < 0.5
                ? e
                : t < 2 / 3
                ? n + (e - n) * (2 / 3 - t) * 6
                : n
            );
          }
          if (0 == o) e = t = r = i;
          else {
            var f = i < 0.5 ? i * (1 + o) : i + o - i * o,
              l = 2 * i - f;
            (e = s(l, f, u + 1 / 3)),
              (t = s(l, f, u)),
              (r = s(l, f, u - 1 / 3));
          }
          return (
            'rgba(' + 255 * e + ',' + 255 * t + ',' + 255 * r + ',' + c + ')'
          );
        }
        function P(n) {
          return i.rgb(n) ? w(n) : i.hex(n) ? O(n) : i.hsl(n) ? k(n) : void 0;
        }
        function C(n) {
          var e =
            /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
              n
            );
          if (e) return e[1];
        }
        function I(n) {
          return u(n, 'translate') || 'perspective' === n
            ? 'px'
            : u(n, 'rotate') || u(n, 'skew')
            ? 'deg'
            : void 0;
        }
        function D(n, e) {
          return i.fnc(n) ? n(e.target, e.id, e.total) : n;
        }
        function B(n, e) {
          return n.getAttribute(e);
        }
        function T(n, e, t) {
          if (y([t, 'deg', 'rad', 'turn'], C(e))) return e;
          var a = r.CSS[e + t];
          if (!i.und(a)) return a;
          var u = document.createElement(n.tagName),
            o =
              n.parentNode && n.parentNode !== document
                ? n.parentNode
                : document.body;
          o.appendChild(u),
            (u.style.position = 'absolute'),
            (u.style.width = 100 + t);
          var c = 100 / u.offsetWidth;
          o.removeChild(u);
          var s = c * parseFloat(e);
          return (r.CSS[e + t] = s), s;
        }
        function E(n, e, t) {
          if (e in n.style) {
            var r = e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
              a = n.style[e] || getComputedStyle(n).getPropertyValue(r) || '0';
            return t ? T(n, a, t) : a;
          }
        }
        function F(n, e) {
          return i.dom(n) &&
            !i.inp(n) &&
            (!i.nil(B(n, e)) || (i.svg(n) && n[e]))
            ? 'attribute'
            : i.dom(n) && y(t, e)
            ? 'transform'
            : i.dom(n) && 'transform' !== e && E(n, e)
            ? 'css'
            : null != n[e]
            ? 'object'
            : void 0;
        }
        function A(n) {
          if (i.dom(n)) {
            for (
              var e,
                t = n.style.transform || '',
                r = /(\w+)\(([^)]*)\)/g,
                a = new Map();
              (e = r.exec(t));

            )
              a.set(e[1], e[2]);
            return a;
          }
        }
        function N(n, e, t, r) {
          var a = u(e, 'scale') ? 1 : 0 + I(e),
            o = A(n).get(e) || a;
          return (
            t && (t.transforms.list.set(e, o), (t.transforms.last = e)),
            r ? T(n, o, r) : o
          );
        }
        function S(n, e, t, r) {
          switch (F(n, e)) {
            case 'transform':
              return N(n, e, r, t);
            case 'css':
              return E(n, e, t);
            case 'attribute':
              return B(n, e);
            default:
              return n[e] || 0;
          }
        }
        function L(n, e) {
          var t = /^(\*=|\+=|-=)/.exec(n);
          if (!t) return n;
          var r = C(n) || 0,
            a = parseFloat(e),
            u = parseFloat(n.replace(t[0], ''));
          switch (t[0][0]) {
            case '+':
              return a + u + r;
            case '-':
              return a - u + r;
            case '*':
              return a * u + r;
          }
        }
        function j(n, e) {
          if (i.col(n)) return P(n);
          if (/\s/g.test(n)) return n;
          var t = C(n),
            r = t ? n.substr(0, n.length - t.length) : n;
          return e ? r + e : r;
        }
        function q(n, e) {
          return Math.sqrt(Math.pow(e.x - n.x, 2) + Math.pow(e.y - n.y, 2));
        }
        function H(n) {
          return 2 * Math.PI * B(n, 'r');
        }
        function V(n) {
          return 2 * B(n, 'width') + 2 * B(n, 'height');
        }
        function $(n) {
          return q(
            { x: B(n, 'x1'), y: B(n, 'y1') },
            { x: B(n, 'x2'), y: B(n, 'y2') }
          );
        }
        function W(n) {
          for (var e, t = n.points, r = 0, a = 0; a < t.numberOfItems; a++) {
            var u = t.getItem(a);
            a > 0 && (r += q(e, u)), (e = u);
          }
          return r;
        }
        function X(n) {
          var e = n.points;
          return W(n) + q(e.getItem(e.numberOfItems - 1), e.getItem(0));
        }
        function Y(n) {
          if (n.getTotalLength) return n.getTotalLength();
          switch (n.tagName.toLowerCase()) {
            case 'circle':
              return H(n);
            case 'rect':
              return V(n);
            case 'line':
              return $(n);
            case 'polyline':
              return W(n);
            case 'polygon':
              return X(n);
          }
        }
        function Z(n) {
          var e = Y(n);
          return n.setAttribute('stroke-dasharray', e), e;
        }
        function _(n) {
          for (var e = n.parentNode; i.svg(e) && i.svg(e.parentNode); )
            e = e.parentNode;
          return e;
        }
        function G(n, e) {
          var t = e || {},
            r = t.el || _(n),
            a = r.getBoundingClientRect(),
            u = B(r, 'viewBox'),
            o = a.width,
            i = a.height,
            c = t.viewBox || (u ? u.split(' ') : [0, 0, o, i]);
          return {
            el: r,
            viewBox: c,
            x: c[0] / 1,
            y: c[1] / 1,
            w: o,
            h: i,
            vW: c[2],
            vH: c[3]
          };
        }
        function Q(n, e) {
          var t = i.str(n) ? v(n)[0] : n,
            r = e || 100;
          return function (n) {
            return {
              property: n,
              el: t,
              svg: G(t),
              totalLength: Y(t) * (r / 100)
            };
          };
        }
        function z(n, e, t) {
          function r(t) {
            void 0 === t && (t = 0);
            var r = e + t >= 1 ? e + t : 0;
            return n.el.getPointAtLength(r);
          }
          var a = G(n.el, n.svg),
            u = r(),
            o = r(-1),
            i = r(1),
            c = t ? 1 : a.w / a.vW,
            s = t ? 1 : a.h / a.vH;
          switch (n.property) {
            case 'x':
              return (u.x - a.x) * c;
            case 'y':
              return (u.y - a.y) * s;
            case 'angle':
              return (180 * Math.atan2(i.y - o.y, i.x - o.x)) / Math.PI;
          }
        }
        function R(n, e) {
          var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
            r = j(i.pth(n) ? n.totalLength : n, e) + '';
          return {
            original: r,
            numbers: r.match(t) ? r.match(t).map(Number) : [0],
            strings: i.str(n) || e ? r.split(t) : []
          };
        }
        function J(n) {
          return h(n ? g(i.arr(n) ? n.map(m) : m(n)) : [], function (n, e, t) {
            return t.indexOf(n) === e;
          });
        }
        function K(n) {
          var e = J(n);
          return e.map(function (n, t) {
            return {
              target: n,
              id: t,
              total: e.length,
              transforms: { list: A(n) }
            };
          });
        }
        function U(n, e) {
          var t = b(e);
          if (
            (/^spring/.test(t.easing) && (t.duration = s(t.easing)), i.arr(n))
          ) {
            var r = n.length;
            2 === r && !i.obj(n[0])
              ? (n = { value: n })
              : i.fnc(e.duration) || (t.duration = e.duration / r);
          }
          var a = i.arr(n) ? n : [n];
          return a
            .map(function (n, t) {
              var r = i.obj(n) && !i.pth(n) ? n : { value: n };
              return (
                i.und(r.delay) && (r.delay = t ? 0 : e.delay),
                i.und(r.endDelay) &&
                  (r.endDelay = t === a.length - 1 ? e.endDelay : 0),
                r
              );
            })
            .map(function (n) {
              return x(n, t);
            });
        }
        function nn(n) {
          for (
            var e = h(
                g(
                  n.map(function (n) {
                    return Object.keys(n);
                  })
                ),
                function (n) {
                  return i.key(n);
                }
              ).reduce(function (n, e) {
                return n.indexOf(e) < 0 && n.push(e), n;
              }, []),
              t = {},
              r = function (r) {
                var a = e[r];
                t[a] = n.map(function (n) {
                  var e = {};
                  for (var t in n)
                    i.key(t) ? t == a && (e.value = n[t]) : (e[t] = n[t]);
                  return e;
                });
              },
              a = 0;
            a < e.length;
            a++
          )
            r(a);
          return t;
        }
        function en(n, e) {
          var t = [],
            r = e.keyframes;
          for (var a in (r && (e = x(nn(r), e)), e))
            i.key(a) && t.push({ name: a, tweens: U(e[a], n) });
          return t;
        }
        function tn(n, e) {
          var t = {};
          for (var r in n) {
            var a = D(n[r], e);
            i.arr(a) &&
              1 ===
                (a = a.map(function (n) {
                  return D(n, e);
                })).length &&
              (a = a[0]),
              (t[r] = a);
          }
          return (
            (t.duration = parseFloat(t.duration)),
            (t.delay = parseFloat(t.delay)),
            t
          );
        }
        function rn(n, e) {
          var t;
          return n.tweens.map(function (r) {
            var a = tn(r, e),
              u = a.value,
              o = i.arr(u) ? u[1] : u,
              c = C(o),
              s = S(e.target, n.name, c, e),
              f = t ? t.to.original : s,
              l = i.arr(u) ? u[0] : f,
              d = C(l) || C(s),
              v = c || d;
            return (
              i.und(o) && (o = f),
              (a.from = R(l, v)),
              (a.to = R(L(o, l), v)),
              (a.start = t ? t.end : 0),
              (a.end = a.start + a.delay + a.duration + a.endDelay),
              (a.easing = p(a.easing, a.duration)),
              (a.isPath = i.pth(u)),
              (a.isPathTargetInsideSVG = a.isPath && i.svg(e.target)),
              (a.isColor = i.col(a.from.original)),
              a.isColor && (a.round = 1),
              (t = a),
              a
            );
          });
        }
        var an = {
          css: function (n, e, t) {
            return (n.style[e] = t);
          },
          attribute: function (n, e, t) {
            return n.setAttribute(e, t);
          },
          object: function (n, e, t) {
            return (n[e] = t);
          },
          transform: function (n, e, t, r, a) {
            if ((r.list.set(e, t), e === r.last || a)) {
              var u = '';
              r.list.forEach(function (n, e) {
                u += e + '(' + n + ') ';
              }),
                (n.style.transform = u);
            }
          }
        };
        function un(n, e) {
          K(n).forEach(function (n) {
            for (var t in e) {
              var r = D(e[t], n),
                a = n.target,
                u = C(r),
                o = S(a, t, u, n),
                i = L(j(r, u || C(o)), o),
                c = F(a, t);
              an[c](a, t, i, n.transforms, !0);
            }
          });
        }
        function on(n, e) {
          var t = F(n.target, e.name);
          if (t) {
            var r = rn(e, n),
              a = r[r.length - 1];
            return {
              type: t,
              property: e.name,
              animatable: n,
              tweens: r,
              duration: a.end,
              delay: r[0].delay,
              endDelay: a.endDelay
            };
          }
        }
        function cn(n, e) {
          return h(
            g(
              n.map(function (n) {
                return e.map(function (e) {
                  return on(n, e);
                });
              })
            ),
            function (n) {
              return !i.und(n);
            }
          );
        }
        function sn(n, e) {
          var t = n.length,
            r = function (n) {
              return n.timelineOffset ? n.timelineOffset : 0;
            },
            a = {};
          return (
            (a.duration = t
              ? Math.max.apply(
                  Math,
                  n.map(function (n) {
                    return r(n) + n.duration;
                  })
                )
              : e.duration),
            (a.delay = t
              ? Math.min.apply(
                  Math,
                  n.map(function (n) {
                    return r(n) + n.delay;
                  })
                )
              : e.delay),
            (a.endDelay = t
              ? a.duration -
                Math.max.apply(
                  Math,
                  n.map(function (n) {
                    return r(n) + n.duration - n.endDelay;
                  })
                )
              : e.endDelay),
            a
          );
        }
        var fn = 0;
        function ln(t) {
          var r = M(n, t),
            a = M(e, t),
            u = en(a, t),
            o = K(t.targets),
            i = cn(o, u),
            c = sn(i, a),
            s = fn;
          return (
            fn++,
            x(r, {
              id: s,
              children: [],
              animatables: o,
              animations: i,
              duration: c.duration,
              delay: c.delay,
              endDelay: c.endDelay
            })
          );
        }
        var dn = [],
          pn = (function () {
            var n;
            function e(t) {
              for (var r = dn.length, a = 0; a < r; ) {
                var u = dn[a];
                u.paused ? (dn.splice(a, 1), r--) : (u.tick(t), a++);
              }
              n = a > 0 ? requestAnimationFrame(e) : void 0;
            }
            return (
              'undefined' != typeof document &&
                document.addEventListener('visibilitychange', function () {
                  hn.suspendWhenDocumentHidden &&
                    (vn()
                      ? (n = cancelAnimationFrame(n))
                      : (dn.forEach(function (n) {
                          return n._onDocumentVisibility();
                        }),
                        pn()));
                }),
              function () {
                n ||
                  (vn() && hn.suspendWhenDocumentHidden) ||
                  !(dn.length > 0) ||
                  (n = requestAnimationFrame(e));
              }
            );
          })();
        function vn() {
          return !!document && document.hidden;
        }
        function hn(n) {
          void 0 === n && (n = {});
          var e,
            t = 0,
            r = 0,
            u = 0,
            o = 0,
            i = null;
          function c(n) {
            var e =
              window.Promise &&
              new Promise(function (n) {
                return (i = n);
              });
            return (n.finished = e), e;
          }
          var s = ln(n);
          c(s);
          function f() {
            var n = s.direction;
            'alternate' !== n &&
              (s.direction = 'normal' !== n ? 'normal' : 'reverse'),
              (s.reversed = !s.reversed),
              e.forEach(function (n) {
                return (n.reversed = s.reversed);
              });
          }
          function l(n) {
            return s.reversed ? s.duration - n : n;
          }
          function d() {
            (t = 0), (r = l(s.currentTime) * (1 / hn.speed));
          }
          function p(n, e) {
            e && e.seek(n - e.timelineOffset);
          }
          function v(n) {
            for (var e = 0, t = s.animations, r = t.length; e < r; ) {
              var u = t[e],
                o = u.animatable,
                i = u.tweens,
                c = i.length - 1,
                f = i[c];
              c &&
                (f =
                  h(i, function (e) {
                    return n < e.end;
                  })[0] || f);
              for (
                var l = a(n - f.start - f.delay, 0, f.duration) / f.duration,
                  d = isNaN(l) ? 1 : f.easing(l),
                  p = f.to.strings,
                  v = f.round,
                  g = [],
                  m = f.to.numbers.length,
                  y = void 0,
                  b = 0;
                b < m;
                b++
              ) {
                var M = void 0,
                  x = f.to.numbers[b],
                  w = f.from.numbers[b] || 0;
                (M = f.isPath
                  ? z(f.value, d * x, f.isPathTargetInsideSVG)
                  : w + d * (x - w)),
                  v && ((f.isColor && b > 2) || (M = Math.round(M * v) / v)),
                  g.push(M);
              }
              var O = p.length;
              if (O) {
                y = p[0];
                for (var k = 0; k < O; k++) {
                  p[k];
                  var P = p[k + 1],
                    C = g[k];
                  isNaN(C) || (y += P ? C + P : C + ' ');
                }
              } else y = g[0];
              an[u.type](o.target, u.property, y, o.transforms),
                (u.currentValue = y),
                e++;
            }
          }
          function g(n) {
            s[n] && !s.passThrough && s[n](s);
          }
          function m(n) {
            var d = s.duration,
              h = s.delay,
              m = d - s.endDelay,
              y = l(n);
            (s.progress = a((y / d) * 100, 0, 100)),
              (s.reversePlayback = y < s.currentTime),
              e &&
                (function (n) {
                  if (s.reversePlayback) for (var t = o; t--; ) p(n, e[t]);
                  else for (var r = 0; r < o; r++) p(n, e[r]);
                })(y),
              !s.began && s.currentTime > 0 && ((s.began = !0), g('begin')),
              !s.loopBegan &&
                s.currentTime > 0 &&
                ((s.loopBegan = !0), g('loopBegin')),
              y <= h && 0 !== s.currentTime && v(0),
              ((y >= m && s.currentTime !== d) || !d) && v(d),
              y > h && y < m
                ? (s.changeBegan ||
                    ((s.changeBegan = !0),
                    (s.changeCompleted = !1),
                    g('changeBegin')),
                  g('change'),
                  v(y))
                : s.changeBegan &&
                  ((s.changeCompleted = !0),
                  (s.changeBegan = !1),
                  g('changeComplete')),
              (s.currentTime = a(y, 0, d)),
              s.began && g('update'),
              n >= d &&
                ((r = 0),
                s.remaining && !0 !== s.remaining && s.remaining--,
                s.remaining
                  ? ((t = u),
                    g('loopComplete'),
                    (s.loopBegan = !1),
                    'alternate' === s.direction && f())
                  : ((s.paused = !0),
                    s.completed ||
                      ((s.completed = !0),
                      g('loopComplete'),
                      g('complete'),
                      !s.passThrough && 'Promise' in window && (i(), c(s)))));
          }
          return (
            (s.reset = function () {
              var n = s.direction;
              (s.passThrough = !1),
                (s.currentTime = 0),
                (s.progress = 0),
                (s.paused = !0),
                (s.began = !1),
                (s.loopBegan = !1),
                (s.changeBegan = !1),
                (s.completed = !1),
                (s.changeCompleted = !1),
                (s.reversePlayback = !1),
                (s.reversed = 'reverse' === n),
                (s.remaining = s.loop),
                (e = s.children);
              for (var t = (o = e.length); t--; ) s.children[t].reset();
              ((s.reversed && !0 !== s.loop) ||
                ('alternate' === n && 1 === s.loop)) &&
                s.remaining++,
                v(s.reversed ? s.duration : 0);
            }),
            (s._onDocumentVisibility = d),
            (s.set = function (n, e) {
              return un(n, e), s;
            }),
            (s.tick = function (n) {
              (u = n), t || (t = u), m((u + (r - t)) * hn.speed);
            }),
            (s.seek = function (n) {
              m(l(n));
            }),
            (s.pause = function () {
              (s.paused = !0), d();
            }),
            (s.play = function () {
              s.paused &&
                (s.completed && s.reset(),
                (s.paused = !1),
                dn.push(s),
                d(),
                pn());
            }),
            (s.reverse = function () {
              f(), (s.completed = !s.reversed), d();
            }),
            (s.restart = function () {
              s.reset(), s.play();
            }),
            (s.remove = function (n) {
              mn(J(n), s);
            }),
            s.reset(),
            s.autoplay && s.play(),
            s
          );
        }
        function gn(n, e) {
          for (var t = e.length; t--; )
            y(n, e[t].animatable.target) && e.splice(t, 1);
        }
        function mn(n, e) {
          var t = e.animations,
            r = e.children;
          gn(n, t);
          for (var a = r.length; a--; ) {
            var u = r[a],
              o = u.animations;
            gn(n, o), o.length || u.children.length || r.splice(a, 1);
          }
          t.length || r.length || e.pause();
        }
        function yn(n) {
          for (var e = J(n), t = dn.length; t--; ) {
            mn(e, dn[t]);
          }
        }
        function bn(n, e) {
          void 0 === e && (e = {});
          var t = e.direction || 'normal',
            r = e.easing ? p(e.easing) : null,
            a = e.grid,
            u = e.axis,
            o = e.from || 0,
            c = 'first' === o,
            s = 'center' === o,
            f = 'last' === o,
            l = i.arr(n),
            d = l ? parseFloat(n[0]) : parseFloat(n),
            v = l ? parseFloat(n[1]) : 0,
            h = C(l ? n[1] : n) || 0,
            g = e.start || 0 + (l ? d : 0),
            m = [],
            y = 0;
          return function (n, e, i) {
            if (
              (c && (o = 0),
              s && (o = (i - 1) / 2),
              f && (o = i - 1),
              !m.length)
            ) {
              for (var p = 0; p < i; p++) {
                if (a) {
                  var b = s ? (a[0] - 1) / 2 : o % a[0],
                    M = s ? (a[1] - 1) / 2 : Math.floor(o / a[0]),
                    x = b - (p % a[0]),
                    w = M - Math.floor(p / a[0]),
                    O = Math.sqrt(x * x + w * w);
                  'x' === u && (O = -x), 'y' === u && (O = -w), m.push(O);
                } else m.push(Math.abs(o - p));
                y = Math.max.apply(Math, m);
              }
              r &&
                (m = m.map(function (n) {
                  return r(n / y) * y;
                })),
                'reverse' === t &&
                  (m = m.map(function (n) {
                    return u ? (n < 0 ? -1 * n : -n) : Math.abs(y - n);
                  }));
            }
            return (
              g + (l ? (v - d) / y : d) * (Math.round(100 * m[e]) / 100) + h
            );
          };
        }
        function Mn(n) {
          void 0 === n && (n = {});
          var t = hn(n);
          return (
            (t.duration = 0),
            (t.add = function (r, a) {
              var u = dn.indexOf(t),
                o = t.children;
              function c(n) {
                n.passThrough = !0;
              }
              u > -1 && dn.splice(u, 1);
              for (var s = 0; s < o.length; s++) c(o[s]);
              var f = x(r, M(e, n));
              f.targets = f.targets || n.targets;
              var l = t.duration;
              (f.autoplay = !1),
                (f.direction = t.direction),
                (f.timelineOffset = i.und(a) ? l : L(a, l)),
                c(t),
                t.seek(f.timelineOffset);
              var d = hn(f);
              c(d), o.push(d);
              var p = sn(o, n);
              return (
                (t.delay = p.delay),
                (t.endDelay = p.endDelay),
                (t.duration = p.duration),
                t.seek(0),
                t.reset(),
                t.autoplay && t.play(),
                t
              );
            }),
            t
          );
        }
        (hn.version = '3.2.1'),
          (hn.speed = 1),
          (hn.suspendWhenDocumentHidden = !0),
          (hn.running = dn),
          (hn.remove = yn),
          (hn.get = S),
          (hn.set = un),
          (hn.convertPx = T),
          (hn.path = Q),
          (hn.setDashoffset = Z),
          (hn.stagger = bn),
          (hn.timeline = Mn),
          (hn.easing = p),
          (hn.penner = d),
          (hn.random = function (n, e) {
            return Math.floor(Math.random() * (e - n + 1)) + n;
          });
        var xn = hn;
        exports.default = xn;
      },
      {}
    ],
    pZPe: [
      function (require, module, exports) {
        'use strict';
        var t =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.animeJSWriter = void 0);
        var e = t(require('animejs'));
        function r() {
          for (var t = [], r = 0; r < arguments.length; r++)
            t[r] = arguments[r];
          var o = createDiv(
            '<svg width="200" height="220" viewBox="0 0 1000 1000"> <path id="MJX-5-TEX-I-3C0" d="M132 -11Q98 -11 98 22V33L111 61Q186 219 220 334L228 358H196Q158 358 142 355T103 336Q92 329 81 318T62 297T53 285Q51 284 38 284Q19 284 19 294Q19 300 38 329T93 391T164 429Q171 431 389 431Q549 431 553 430Q573 423 573 402Q573 371 541 360Q535 358 472 358H408L405 341Q393 269 393 222Q393 170 402 129T421 65T431 37Q431 20 417 5T381 -10Q370 -10 363 -7T347 17T331 77Q330 86 330 121Q330 170 339 226T357 318T367 358H269L268 354Q268 351 249 275T206 114T175 17Q164 -11 132 -11Z"></path></svg>'
          );
          o.style('transform', 'rotate(180deg)'),
            o.id('anime-demo'),
            o.position(10, 0);
          for (
            var i = document.querySelectorAll('path'), s = 0;
            s < i.length;
            s++
          ) {
            var a = i[s],
              n = e.default.setDashoffset(a);
            a.setAttribute('stroke-dashoffset', n),
              e.default({
                targets: a,
                strokeDashoffset: [e.default.setDashoffset, 0],
                easing: 'easeInOutCubic',
                duration: 4e3,
                begin: function (t) {
                  a.setAttribute('stroke', 'black'),
                    a.setAttribute('fill', 'none');
                },
                complete: function (t) {
                  a.setAttribute('fill', 'black');
                },
                autoplay: !0
              });
          }
          noLoop();
        }
        exports.animeJSWriter = r;
      },
      { animejs: 'ndqK' }
    ],
    QCba: [
      function (require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var e = globalThis,
          r = require('./lib/myCircle');
        e.myCircle = r.myCircle;
        var i = require('./lib/typeWriter');
        e.typeWriter = i.typeWriter;
        var t = require('./lib/animeJSWriter');
        e.animeJSWriter = t.animeJSWriter;
      },
      {
        './lib/myCircle': 'tcB6',
        './lib/typeWriter': 'mMvg',
        './lib/animeJSWriter': 'pZPe'
      }
    ]
  },
  {},
  ['QCba'],
  null
);
