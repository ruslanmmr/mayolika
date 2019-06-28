function Ceramic3DPanorama(t) {
  function U(e, d) {
    B = e;
    C = d;
    b.width = e;
    b.height = d;
    a.viewport(0, 0, e, d);
    j = !0
  }

  function V() {
    requestAnimationFrame(V);
    if (b.scrollWidth != B || b.scrollHeight != C) U(b.scrollWidth, b.scrollHeight), K = i - 1;
    if (D && (0 != E || 0 != F)) {
      var e = F;
      l += E * W;
      n += e * W;
      l > L ? l -= L : 0 >= l && (l += L);
      n > G ? n = G : n < -G && (n = -G);
      F = E = 0;
      j = !0
    }
    if (K != i) {
      K = i;
      j = !0;
      var d = B / C,
        e = 0.05 * Math.tan((Math.PI / 3 - i / 10) / 2),
        d = e * d,
        k = -d,
        h = -e,
        X = 1 / (d - k),
        g = 1 / (e - h),
        f = 1 / -9.95;
      c[0] = 0.1 * X;
      c[1] = 0;
      c[2] = 0;
      c[3] = 0;
      c[4] = 0;
      c[5] = 0.1 * g;
      c[6] = 0;
      c[7] = 0;
      c[8] = (k + d) * X;
      c[9] =
        (h + e) * g;
      c[10] = 10.05 * f;
      c[11] = -1;
      c[12] = 0;
      c[13] = 0;
      c[14] = 1 * f;
      c[15] = 0
    }
    j && (j = !1, e = Math.cos(l), d = Math.sin(l), k = Math.cos(n), h = Math.sin(n), m[0] = e, m[1] = d * h, m[2] = -(d * k), m[3] = 0, m[4] = k, m[5] = h, m[6] = d, m[7] = -(e * h), m[8] = e * k, a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT), a.useProgram(u), a.bindBuffer(a.ARRAY_BUFFER, M), a.vertexAttribPointer(N, 3, a.FLOAT, !1, 0, 0), a.uniformMatrix3fv(Y, !1, m), a.uniformMatrix4fv(Z, !1, c), a.uniform1f($, ia), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_CUBE_MAP, aa), a.uniform1i(ba, 0), a.drawArrays(a.TRIANGLES,
      0, 36))
  }

  function ja() {
    for (var a = new v(108), d = new v(3), k = new v(3), h = 0, b = 0; 3 > b; b++) {
      d[0] = b;
      d[1] = (b + 1) % 3;
      d[2] = (b + 2) % 3;
      for (var c = -1; 2 > c; c += 2)
        for (var g = 0, i = -1; 2 > i; i += 2)
          for (var j = -1; 2 > j; j += 2) {
            k[d[0]] = c;
            k[d[1]] = i;
            k[d[2]] = j;
            for (var f = 0; 3 > f; f++) a[3 * h + f] = k[f];
            if (1 == g || 2 == g)
              for (f = 0; 3 > f; f++) a[3 * (h + 2) + f] = k[f];
            2 == g && (h += 2);
            h++;
            g++
          }
    }
    return a
  }

  function ca(e, d) {
    var b = a.createShader(a.VERTEX_SHADER);
    a.shaderSource(b, e);
    a.compileShader(b);
    if (a.getShaderParameter(b, a.COMPILE_STATUS)) {
      var h = a.createShader(a.FRAGMENT_SHADER);
      a.shaderSource(h, d);
      a.compileShader(h);
      if (a.getShaderParameter(h, a.COMPILE_STATUS)) {
        var c = a.createProgram();
        a.attachShader(c, b);
        a.attachShader(c, h);
        a.linkProgram(c);
        if (a.getProgramParameter(c, a.LINK_STATUS)) return c;
        console.error(a.getProgramInfoLog(c))
      } else console.error(a.getShaderInfoLog(h))
    } else console.error(a.getShaderInfoLog(b))
  }

  function da() {
    ea || (requestAnimationFrame(da), (b.scrollWidth != B || b.scrollHeight != C) && U(b.scrollWidth, b.scrollHeight), j && (j = !1, a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT),
      a.useProgram(H), a.bindBuffer(a.ARRAY_BUFFER, O), a.vertexAttribPointer(P, 3, a.FLOAT, !1, 0, 0), a.uniform1f(fa, I), a.drawArrays(a.TRIANGLES, 0, 6)))
  }
  var I = 0,
    fa, P, O, H, ea = !1,
    B, C, b = t.canvas;
  "string" === typeof b && (b = document.getElementById(b));
  var a = b.getContext("webgl") || b.getContext("experimental-webgl"),
    aa, u, Y, Z, ba, $, N, M, j = !0,
    ia = 1 == t.cameraVersion ? 1 : -1;
  if (!v) var v = "undefined" !== typeof Float32Array ? Float32Array : Array;
  var K = -100,
    i = 0,
    c = new v(16),
    m = new v(9),
    W = Math.PI / 200,
    L = 2 * Math.PI,
    G = Math.PI / 2,
    l = 0,
    n = 0,
    ga = 0,
    ha = 0,
    D = !1,
    E = 0,
    F = 0;
  a.clearColor(1, 1, 1, 1);
  H = ca("attribute vec3 a; varying vec2 v; void main() {v = a.xy; gl_Position = vec4(a, 1.0);}", "precision mediump float; uniform float perc; varying vec2 v; void main() {if (abs(v.x) > 0.4 || abs(v.y) > 0.05) discard;if ((v.x + 0.4)/0.8 < perc) gl_FragColor = vec4(0.0, 0.7, 0.0, 1.0); else gl_FragColor = vec4(0.7, 0.7, 0.7, 1.0);}");
  fa = a.getUniformLocation(H, "perc");
  P = a.getAttribLocation(H, "a");
  a.enableVertexAttribArray(P);
  O = a.createBuffer();
  a.bindBuffer(a.ARRAY_BUFFER,
    O);
  a.bufferData(a.ARRAY_BUFFER, new v([-1, -1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0]), a.STATIC_DRAW);
  da();
  var Q = t.panorams[0],
    t = function () {
      u = ca("uniform mat3 vm; uniform mat4 pm; attribute vec3 a; varying vec3 v; void main() {v = a; gl_Position = pm * vec4(vm * a, 1.0);}", "precision mediump float; uniform samplerCube t; uniform float Ysign; varying vec3 v; void main() {gl_FragColor = textureCube(t, vec3(v.x, Ysign * v.z, -v.y));}");
      Y = a.getUniformLocation(u, "vm");
      Z = a.getUniformLocation(u, "pm");
      ba = a.getUniformLocation(u,
        "t");
      $ = a.getUniformLocation(u, "Ysign");
      N = a.getAttribLocation(u, "a");
      a.enableVertexAttribArray(N);
      M = a.createBuffer();
      a.bindBuffer(a.ARRAY_BUFFER, M);
      a.bufferData(a.ARRAY_BUFFER, ja(), a.STATIC_DRAW)
    },
    y = function () {
      R--;
      if (0 == R) {
        var e = f;
        b.onmousemove = function (a) {
          var e = a.pageX - b.offsetLeft,
            a = a.pageY - b.offsetTop;
          E = e - ga;
          F = a - ha;
          ga = e;
          ha = a
        };
        b.onmouseout = function () {
          D = !1
        };
        b.onmousedown = function (a) {
          1 == a.which && (D = !0)
        };
        b.onmouseup = function (a) {
          1 == a.which && (D = !1)
        };
        b.onwheel = function (a) {
          0 < a.wheelDelta ? i = Math.min(i + 1,
            6) : 0 > a.wheelDelta && (i = Math.max(i - 1, -10));
          0 > a.deltaY ? i = Math.min(i + 1, 6) : 0 < a.deltaY && (i = Math.max(i - 1, -10))
        };
        var d = a.createTexture();
        a.bindTexture(a.TEXTURE_CUBE_MAP, d);
        a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0);
        for (var c = 0; 6 > c; c++) a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + c, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, e[c]);
        a.generateMipmap(a.TEXTURE_CUBE_MAP);
        a.getError() == a.NO_ERROR ? a.texParameteri(a.TEXTURE_CUBE_MAP, a.TEXTURE_MIN_FILTER, a.LINEAR_MIPMAP_LINEAR) : a.texParameteri(a.TEXTURE_CUBE_MAP, a.TEXTURE_MIN_FILTER,
          a.LINEAR);
        a.texParameteri(a.TEXTURE_CUBE_MAP, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
        a.texParameteri(a.TEXTURE_CUBE_MAP, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
        a.texParameteri(a.TEXTURE_CUBE_MAP, a.TEXTURE_MAG_FILTER, a.LINEAR);
        a.bindTexture(a.TEXTURE_CUBE_MAP, null);
        aa = d;
        ea = !0;
        j = !1;
        V()
      }
    },
    ka = function (a) {
      return function (b) {
        isNaN(p[a]) && 0 < b.total && (p[a] = b.total, q[a] = 0, w += b.total, z--);
        !isNaN(p[a]) && b.loaded > q[a] && (r += b.loaded - q[a], q[a] = b.loaded, 0 == z && (I = r / w, j = !0))
      }
    },
    la = function (a, b) {
      return function () {
        isNaN(p[a]) ? z-- :
          p[a] > q[a] && (r += p[a] - q[a], q[a] = p[a], 0 == z && (I = r / w, j = !0));
        if (200 <= this.status && 400 > this.status)
          if (b) {
            var c = this.getAllResponseHeaders().match(/^Content-Type\:\s*(.*?)$/mi)[1] || "image/png",
              c = new Blob([this.response], {
                type: c
              });
            f[a] = new Image;
            f[a].onload = y;
            f[a].src = window.URL.createObjectURL(c)
          } else f[a] = this.response, y();
        else console.error("Unable to load file " + Q[a] + "!"), y()
      }
    },
    S = void 0 !== (new window.XMLHttpRequest).onprogress,
    s = Q.length,
    R = s;
  t && R++;
  var f = Array(s),
    q = Array(s),
    p = Array(s),
    r = 0,
    w = 0,
    z = s;
  if (!S) {
    for (var g =
        0; g < s; g++) q[g] = 0, p[g] = 1;
    w = s;
    z = 0
  }
  for (g = 0; g < s; g++) {
    var J = Q[g],
      x = J.substr(J.lastIndexOf(".")),
      T = ".jpg" == x || ".bmp" == x || ".png" == x,
      x = T || ".bin" == x;
    if (!S && T) f[g] = new Image, f[g].onload = function () {
      r++;
      I = r / w;
      j = !0;
      y()
    }, f[g].src = J;
    else {
      var A = new XMLHttpRequest;
      A.onload = la(g, T);
      S && (A.onprogress = ka(g));
      A.open("GET", J, !0);
      x && (A.responseType = "arraybuffer");
      A.send()
    }
  }
  t && (t(), y())
};