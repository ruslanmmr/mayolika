var path;
function Ceramic3DPanorama(e, r, t) {
  path = t,
    function (e) {
      function r(e) {
        var r = e;
        "string" == typeof r && (r = document.getElementById(r));
        var t, a, n, o, i, f, u, c, s, l, v, E, d, m, g, p, T, _, h, R, A = r.getContext("webgl") || r.getContext("experimental-webgl");
        if (!U) var U = "undefined" != typeof Float32Array ? Float32Array : Array;
        var P, L, w, I, M, B = new U(16),
          b = new U(9),
          F = Math.PI / 300,
          x = 2 * Math.PI,
          C = Math.PI / 2;

        function S(e, r, t, a, n) {
          var o, i, f, u, c, s, l, v, E, d = e / r,
            m = a * Math.tan(t / 2),
            g = m * d;
          l = 1 / ((i = g) - (o = -g)), v = 1 / ((u = m) - (f = -m)), E = 1 / ((c = a) - (s = n)), B[0] = 2 * c * l, B[1] = 0, B[2] = 0, B[3] = 0, B[4] = 0, B[5] = 2 * c * v, B[6] = 0, B[7] = 0, B[8] = (o + i) * l, B[9] = (f + u) * v, B[10] = (c + s) * E, B[11] = -1, B[12] = 0, B[13] = 0, B[14] = c * s * 2 * E, B[15] = 0
        }

        function y(e, t) {
          u = e, c = t, r.width = e, r.height = t, A.viewport(0, 0, e, t), T = !0, w = !1, I = 0, M = 0
        }

        function D() {
          var e, t, a, n, o, i, U, D;
          f && (r.scrollWidth == u && r.scrollHeight == c || (y(r.scrollWidth, r.scrollHeight), h = R - 1), !w || 0 == I && 0 == M || (L += M * F, (P += I * F) > x ? P -= x : P <= 0 && (P += x), L > C ? L = C : L < -C && (L = -C), I = 0, M = 0, T = !0), h != R && (h = R, T = !0, S(u, c, Math.PI / 3 - R / 10, .05, 10)), T && (T = !1, e = Math.cos(P), t = Math.sin(P), a = Math.cos(L), n = Math.sin(L), o = e * a, i = t * a, U = e * n, D = t * n, b[0] = e, b[1] = D, b[2] = -i, b[3] = 0, b[4] = a, b[5] = n, b[6] = t, b[7] = -U, b[8] = o, A.clear(A.COLOR_BUFFER_BIT | A.DEPTH_BUFFER_BIT), A.useProgram(l), A.bindBuffer(A.ARRAY_BUFFER, p), A.vertexAttribPointer(g, 3, A.FLOAT, !1, 0, 0), A.uniformMatrix3fv(v, !1, b), A.uniformMatrix4fv(E, !1, B), A.uniform1f(m, _), A.activeTexture(A.TEXTURE0), A.bindTexture(A.TEXTURE_CUBE_MAP, s), A.uniform1i(d, 0), A.drawArrays(A.TRIANGLES, 0, 36)))
        }

        function X(e, r) {
          var t = A.createShader(A.VERTEX_SHADER);
          if (A.shaderSource(t, e), A.compileShader(t), A.getShaderParameter(t, A.COMPILE_STATUS)) {
            var a = A.createShader(A.FRAGMENT_SHADER);
            if (A.shaderSource(a, r), A.compileShader(a), A.getShaderParameter(a, A.COMPILE_STATUS)) {
              var n = A.createProgram();
              if (A.attachShader(n, t), A.attachShader(n, a), A.linkProgram(n), A.getProgramParameter(n, A.LINK_STATUS)) return n;
              console.error(A.getProgramInfoLog(n))
            } else console.error(A.getShaderInfoLog(a))
          } else console.error(A.getShaderInfoLog(t))
        }

        function N(e) {
          s = function (e) {
            var r = A.createTexture();
            A.bindTexture(A.TEXTURE_CUBE_MAP, r), A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL, !0);
            for (var t = 0; t < 6; t++) A.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, A.RGBA, A.RGBA, A.UNSIGNED_BYTE, e[t]);
            return A.generateMipmap(A.TEXTURE_CUBE_MAP), A.getError() == A.NO_ERROR ? A.texParameteri(A.TEXTURE_CUBE_MAP, A.TEXTURE_MIN_FILTER, A.LINEAR_MIPMAP_LINEAR) : A.texParameteri(A.TEXTURE_CUBE_MAP, A.TEXTURE_MIN_FILTER, A.LINEAR), A.texParameteri(A.TEXTURE_CUBE_MAP, A.TEXTURE_WRAP_S, A.CLAMP_TO_EDGE), A.texParameteri(A.TEXTURE_CUBE_MAP, A.TEXTURE_WRAP_T, A.CLAMP_TO_EDGE), A.texParameteri(A.TEXTURE_CUBE_MAP, A.TEXTURE_MAG_FILTER, A.LINEAR), A.bindTexture(A.TEXTURE_CUBE_MAP, null), r
          }(e), f = !0, T = !1, D()
        }

        function Y() {
          f || (r.scrollWidth == u && r.scrollHeight == c || y(r.scrollWidth, r.scrollHeight), T && (T = !1, A.clear(A.COLOR_BUFFER_BIT | A.DEPTH_BUFFER_BIT), A.useProgram(i), A.bindBuffer(A.ARRAY_BUFFER, o), A.vertexAttribPointer(n, 3, A.FLOAT, !1, 0, 0), A.uniform1f(a, t), A.drawArrays(A.TRIANGLES, 0, 6)))
        }
        return A.clearColor(1, 1, 1, 1), i = X("attribute vec3 a; varying vec2 v; void main() {v = a.xy; gl_Position = vec4(a, 1.0);}", "precision mediump float; uniform float perc; varying vec2 v; void main() {if (abs(v.x) > 0.4 || abs(v.y) > 0.05) discard;if ((v.x + 0.4)/0.8 < perc) gl_FragColor = vec4(0.0, 0.7, 0.0, 1.0); else gl_FragColor = vec4(0.7, 0.7, 0.7, 1.0);}"), a = A.getUniformLocation(i, "perc"), n = A.getAttribLocation(i, "a"), A.enableVertexAttribArray(n), o = A.createBuffer(), A.bindBuffer(A.ARRAY_BUFFER, o), A.bufferData(A.ARRAY_BUFFER, new U([-1, -1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0]), A.STATIC_DRAW), l = X("uniform mat3 vm; uniform mat4 pm; attribute vec3 a; varying vec3 v; void main() {v = a; gl_Position = pm * vec4(vm * a, 1.0);}", "precision mediump float; uniform samplerCube t; uniform float Ysign; varying vec3 v; void main() {gl_FragColor = textureCube(t, vec3(v.x, Ysign * v.z, -v.y));}"), v = A.getUniformLocation(l, "vm"), E = A.getUniformLocation(l, "pm"), d = A.getUniformLocation(l, "t"), m = A.getUniformLocation(l, "Ysign"), g = A.getAttribLocation(l, "a"), A.enableVertexAttribArray(g), p = A.createBuffer(), A.bindBuffer(A.ARRAY_BUFFER, p), A.bufferData(A.ARRAY_BUFFER, function () {
            for (var e = new U(108), r = new U(3), t = new U(3), a = 0, n = 0; n < 3; n++) {
              r[0] = n, r[1] = (n + 1) % 3, r[2] = (n + 2) % 3;
              for (var o = -1; o < 2; o += 2)
                for (var i = 0, f = -1; f < 2; f += 2)
                  for (var u = -1; u < 2; u += 2) {
                    t[r[0]] = o, t[r[1]] = f, t[r[2]] = u;
                    for (var c = 0; c < 3; c++) e[3 * a + c] = t[c];
                    if (1 == i || 2 == i)
                      for (c = 0; c < 3; c++) e[3 * (a + 2) + c] = t[c];
                    2 == i && (a += 2), a++, i++
                  }
            }
            return e
          }(), A.STATIC_DRAW),
          function () {
            r.onmousedown = function (e) {
              return f ? (1 == e.which && (w = !0), e.preventDefault(), !1) : (e.preventDefault(), !1)
            }, r.addEventListener("touchstart", function (a) {
              if (!f) return a.preventDefault(), !1;
              w = !0;
              var n = a.changedTouches[0],
                o = (n.pageX - r.offsetLeft) / 3,
                i = (n.pageY - r.offsetTop) / 3;
              return e = o, t = i, a.preventDefault(), !1
            }, !1), window.addEventListener("mouseup", function (e) {
              return !!f && (1 == e.which && (w = !1), !1)
            }, !1), window.addEventListener("touchend", function (e) {
              return f ? (w = !1, e.preventDefault(), !1) : (e.preventDefault(), !1)
            }, !1), r.ontouchend = function (e) {
              return e.preventDefault(), !1
            };
            var e = 0,
              t = 0;
            window.addEventListener("mousemove", function (a) {
              if (!f) return !1;
              var n = a.pageX - r.offsetLeft,
                o = a.pageY - r.offsetTop;
              return I = n - e, M = o - t, e = n, t = o, D(), !1
            }, !1), window.addEventListener("touchmove", function (a) {
              if (!f) return a.preventDefault(), !1;
              var n = a.changedTouches[0],
                o = (n.pageX - r.offsetLeft) / 3,
                i = (n.pageY - r.offsetTop) / 3;
              return I = o - e, M = i - t, e = o, t = i, D(), a.preventDefault(), !1
            }, !1), r.ontouchmove = function (e) {
              return e.preventDefault(), !1
            }, r.onwheel = function (e) {
              return !!f && (e.wheelDelta > 0 ? R = Math.min(R + 1, 6) : e.wheelDelta < 0 && (R = Math.max(R - 1, -10)), e.deltaY < 0 ? R = Math.min(R + 1, 6) : e.deltaY > 0 && (R = Math.max(R - 1, -10)), D(), !1)
            }
          }(), {
            reload: function (e) {
              t = 0, f = !1, T = !0, _ = 1 == e.cameraVersion ? 1 : -1, h = -100, R = 0, P = 0, L = 0, w = !1, I = 0, M = 0, A.deleteTexture(s), Y(),
                function (e, r, t, a) {
                  var n = void 0 !== (new window.XMLHttpRequest).onprogress,
                    o = e.length,
                    i = o;
                  r && i++;
                  var f = new Array(o),
                    u = new Array(o),
                    c = new Array(o),
                    s = 0,
                    l = 0,
                    v = o;
                  if (!n) {
                    for (var E = 0; E < o; E++) u[E] = 0, c[E] = 1;
                    l = o, v = 0
                  }

                  function d() {
                    0 == --i && t(f)
                  }

                  function m(e) {
                    return function (r) {
                      isNaN(c[e]) && r.total > 0 && (c[e] = r.total, u[e] = 0, l += r.total, v--), !isNaN(c[e]) && r.loaded > u[e] && (s += r.loaded - u[e], u[e] = r.loaded, 0 == v && a(s / l))
                    }
                  }

                  function g(r, t) {
                    return function () {
                      if (isNaN(c[r]) ? v-- : c[r] > u[r] && (s += c[r] - u[r], u[r] = c[r], 0 == v && a(s / l)), this.status >= 200 && this.status < 400)
                        if (t) {
                          var n = this.getAllResponseHeaders().match(/^Content-Type\:\s*(.*?)$/im)[1] || "image/png",
                            o = new Blob([this.response], {
                              type: n
                            });
                          f[r] = new Image, f[r].onload = d, f[r].src = window.URL.createObjectURL(o)
                        } else f[r] = this.response, d();
                      else console.error("Unable to load file " + e[r] + "!"), d()
                    }
                  }
                  for (E = 0; E < o; E++) {
                    var p = e[E],
                      T = p.substr(p.lastIndexOf(".")),
                      _ = ".jpg" == T || ".bmp" == T || ".png" == T,
                      h = _ || ".bin" == T;
                    if (!n && _) f[E] = new Image, f[E].onload = function () {
                      a(++s / l), d()
                    }, f[E].src = p;
                    else {
                      var R = new XMLHttpRequest;
                      R.onload = g(E, _), n && (R.onprogress = m(E)), R.open("GET", p, !0), h && (R.responseType = "arraybuffer"), R.send()
                    }
                  }
                  r && (r(), d())
                }(e.panorams[0], null, N, function (e) {
                  t = e, T = !0, Y()
                })
            },
            redraw: function () {
              D()
            }
          }
      }! function () {
        var t, a;

        function n() {
          return !1
        }
        "string" == typeof (t = e.canvas) && (t = document.getElementById(t)), t.c3dpano = r(t), t.onselectstart = n, t.ondragstart = n, t.c3dpano.reload(((a = new Object).panorams = e.panorams, a.cameraVersion = e.cameraVersion, a))
      }()
    }({
      canvas: e,
      panorams: [
        [path + "/+X.jpg", path + "/-X.jpg", path + "/+Y.jpg", path + "/-Y.jpg", path + "/+Z.jpg", path + "/-Z.jpg"]
      ]
    })
}