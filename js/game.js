(function () {
  /* Dev Runner */
  var cv = document.getElementById("cv"),
    cx = cv.getContext("2d"),
    W = 800,
    H = 320,
    G = 268,
    PX = 92,
    dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = W * dpr;
  cv.height = H * dpr;
  cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (!cx.roundRect)
    cx.roundRect = function (x, y, w, h) {
      this.rect(x, y, w, h);
    };
  var av = new Image(),
    avOK = false;
  av.onload = function () {
    avOK = true;
    draw();
  };
  av.src = "assets/img/avatar.webp";
  var PAL = ["#7c5cff", "#ffa51f", "#2fbf71", "#5ab0ff", "#ff5470", "#cfd5ff"],
    TOK = ["{ }", "( )", ";", "=>", "</>", "[ ]", "::", "&&"],
    AIR = ["SyntaxError", "cannot find symbol", "404", "NullPointer"];
  var MONO = '"JetBrains Mono",ui-monospace,Menlo,monospace',
    SANS = '"Space Grotesk",system-ui,sans-serif';
  var L = 1400,
    rows = [];
  for (var r = 0; r < 13; r++) {
    var rx = ((Math.random() * 4) | 0) * 32,
      ra = [];
    while (rx < L - 60) {
      var rw = 24 + ((Math.random() * 90) | 0);
      ra.push({ x: rx, w: rw, c: PAL[(Math.random() * PAL.length) | 0] });
      rx += rw + 10 + Math.random() * 12;
    }
    rows.push(ra);
  }
  var S,
    run = false,
    pause = false,
    last = 0,
    vis = false,
    best = 0,
    over = false,
    hc = 0;
  try {
    best = +localStorage.getItem("devrunner-best") || 0;
  } catch (e) {}
  var $ = function (i) {
      return document.getElementById(i);
    },
    go = $("go"),
    pa = $("pa"),
    du = $("du");
  function tr(pt, english) {
    return document.documentElement.lang === "en" ? english : pt;
  }
  function reset() {
    S = {
      l: 3,
      tk: 0,
      sp: 5.2,
      d: 0,
      y: G,
      vy: 0,
      duck: false,
      ob: [],
      tg: [],
      pop: [],
      nx: 320,
      inv: 0,
      t: 0,
      hit: 0,
    };
  }
  function score() {
    return Math.floor(S.d / 14) + S.tk * 10;
  }
  function hud() {
    $("hs").textContent = tr("Pontos ", "Score ") + score();
    $("hb").textContent = tr("Blocos ", "Blocks ") + S.tk;
    $("hl").textContent = "♥".repeat(S.l) + "♡".repeat(3 - S.l);
    $("hr").textContent = tr("Recorde ", "Best ") + best;
  }
  function spawn() {
    var o,
      x0 = W + 30;
    if (Math.random() < 0.38) {
      var n = AIR[(Math.random() * AIR.length) | 0];
      cx.font = "700 12px " + MONO;
      o = {
        x: x0,
        y: G - 84,
        w: Math.ceil(cx.measureText(n).width) + 26,
        h: 38,
        t: "air",
        n: n,
      };
    } else if (Math.random() < 0.55)
      o = { x: x0, y: G - 34, w: 44, h: 34, t: "bug" };
    else o = { x: x0, y: G - 38, w: 76, h: 38, t: "err", n: "ERROR" };
    S.ob.push(o);
    var gap = Math.round(300 + Math.random() * 140 + S.sp * 14);
    S.nx = gap;
    var tx = x0 + gap * 0.5 - 46,
      hs = Math.random() < 0.5 ? [50, 125, 50] : [50, 50, 50];
    for (var k = 0; k < 3; k++)
      S.tg.push({
        x: tx + k * 46,
        y: G - hs[k],
        s: TOK[(Math.random() * TOK.length) | 0],
        p: Math.random() * 6,
      });
  }
  function jump() {
    if (run && !pause && S.y >= G - 0.5) S.vy = -14.5;
  }
  function over_() {
    run = false;
    over = true;
    if (score() > best) {
      best = score();
      try {
        localStorage.setItem("devrunner-best", best);
      } catch (e) {}
    }
    go.textContent = tr("Jogar de novo", "Play again");
    hud();
  }
  function step(k) {
    var v,
      i,
      o,
      t,
      ph = S.duck && S.y >= G - 0.5 ? 38 : 62,
      top,
      bot;
    S.t += k;
    S.sp = Math.min(12, 5.2 + S.d / 2600);
    v = S.sp * k;
    S.d += v;
    S.vy += (0.78 + (S.duck && S.y < G ? 0.9 : 0)) * k;
    S.y += S.vy * k;
    if (S.y >= G) {
      S.y = G;
      S.vy = 0;
    }
    S.nx -= v;
    if (S.nx <= 0) spawn();
    top = S.y - ph;
    bot = S.y;
    for (i = S.ob.length - 1; i >= 0; i--) {
      o = S.ob[i];
      o.x -= v;
      if (o.x + o.w < -20) {
        S.ob.splice(i, 1);
        continue;
      }
      if (
        S.inv <= 0 &&
        o.x + 4 < PX + 44 &&
        o.x + o.w - 4 > PX + 10 &&
        top < o.y + o.h - 3 &&
        bot > o.y + 3
      ) {
        S.ob.splice(i, 1);
        S.l--;
        S.inv = 70;
        S.hit = 10;
        if (S.l <= 0) {
          over_();
          return;
        }
      }
    }
    for (i = S.tg.length - 1; i >= 0; i--) {
      t = S.tg[i];
      t.x -= v;
      if (t.x < -60) {
        S.tg.splice(i, 1);
        continue;
      }
      if (t.x < PX + 46 && t.x + 40 > PX + 8 && top < t.y + 30 && bot > t.y) {
        S.tg.splice(i, 1);
        S.tk++;
        S.pop.push({ x: t.x, y: t.y, t: 0 });
        hud();
      }
    }
    for (i = S.pop.length - 1; i >= 0; i--) {
      S.pop[i].t += k;
      if (S.pop[i].t > 40) S.pop.splice(i, 1);
    }
    if (S.inv > 0) S.inv -= k;
    if (S.hit > 0) S.hit -= k;
    if (++hc % 8 === 0) hud();
  }
  function rr(x, y, w, h, r) {
    cx.beginPath();
    cx.roundRect(x, y, w, h, r);
  }
  function draw() {
    var d = S.d,
      i,
      j,
      ra,
      t,
      o,
      off = (d * 0.3) % L,
      g;
    cx.save();
    if (S.hit > 0)
      cx.translate((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6);
    g = cx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#0b1130");
    g.addColorStop(1, "#070b1b");
    cx.fillStyle = g;
    cx.fillRect(-10, -10, W + 20, H + 20);
    cx.globalAlpha = 0.16;
    for (i = 0; i < rows.length; i++) {
      ra = rows[i];
      for (j = 0; j < ra.length; j++) {
        t = ra[j];
        cx.fillStyle = t.c;
        var tx = 44 + t.x - off;
        if (tx + t.w < 40) tx += L;
        if (tx < W) cx.fillRect(tx, 14 + i * 19, t.w, 7);
      }
    }
    cx.globalAlpha = 1;
    cx.fillStyle = "rgba(10,15,36,.96)";
    cx.fillRect(0, 0, 40, H);
    cx.fillStyle = "#1c2444";
    cx.fillRect(40, 0, 1, H);
    cx.fillStyle = "#3a4373";
    cx.font = "11px " + MONO;
    cx.textAlign = "right";
    for (i = 0; i < 13; i++) cx.fillText(i + 1, 30, 20 + i * 19);
    cx.fillStyle = "#0c1230";
    cx.fillRect(0, G, W, H - G);
    g = cx.createLinearGradient(0, 0, W, 0);
    g.addColorStop(0, "#7c5cff");
    g.addColorStop(1, "#ffa51f");
    cx.fillStyle = g;
    cx.fillRect(0, G, W, 2);
    cx.strokeStyle = "#27305a";
    cx.lineWidth = 2;
    cx.setLineDash([22, 20]);
    cx.lineDashOffset = d % 42;
    cx.beginPath();
    cx.moveTo(0, G + 22);
    cx.lineTo(W, G + 22);
    cx.stroke();
    cx.setLineDash([]);
    cx.textAlign = "center";
    for (i = 0; i < S.tg.length; i++) {
      t = S.tg[i];
      var by = t.y + Math.sin(S.t / 12 + t.p) * 3;
      cx.save();
      cx.shadowColor = "rgba(255,165,31,.7)";
      cx.shadowBlur = 14;
      g = cx.createLinearGradient(0, by, 0, by + 30);
      g.addColorStop(0, "#ffb02e");
      g.addColorStop(1, "#ff8a1f");
      cx.fillStyle = g;
      rr(t.x, by, 40, 30, 8);
      cx.fill();
      cx.restore();
      cx.fillStyle = "#1a1204";
      cx.font = "700 14px " + MONO;
      cx.fillText(t.s, t.x + 20, by + 20);
    }
    for (i = 0; i < S.ob.length; i++) {
      o = S.ob[i];
      cx.save();
      cx.shadowColor = "rgba(255,84,112,.6)";
      cx.shadowBlur = 12;
      if (o.t === "bug") {
        var wg = Math.sin(S.t / 3) * 3,
          bx = o.x + 22,
          by2 = o.y + 22;
        cx.strokeStyle = "#ff5470";
        cx.lineWidth = 2;
        cx.beginPath();
        for (j = -1; j <= 1; j++) {
          cx.moveTo(bx + j * 9, by2);
          cx.lineTo(bx + j * 13 + wg, by2 + 12);
          cx.moveTo(bx + j * 9, by2);
          cx.lineTo(bx + j * 13 - wg, by2 - 10);
        }
        cx.moveTo(bx + 18, by2 - 4);
        cx.lineTo(bx + 26, by2 - 14);
        cx.moveTo(bx + 20, by2 - 2);
        cx.lineTo(bx + 30, by2 - 9);
        cx.stroke();
        cx.fillStyle = "#ff5470";
        cx.beginPath();
        cx.ellipse(bx, by2, 15, 11, 0, 0, 7);
        cx.fill();
        cx.beginPath();
        cx.arc(bx + 16, by2, 7, 0, 7);
        cx.fill();
        cx.shadowBlur = 0;
        cx.fillStyle = "#fff";
        cx.beginPath();
        cx.arc(bx + 18, by2 - 2, 2, 0, 7);
        cx.fill();
        cx.fillStyle = "#7a1030";
        cx.beginPath();
        cx.arc(bx - 5, by2 - 3, 3, 0, 7);
        cx.arc(bx + 3, by2 + 3, 3, 0, 7);
        cx.fill();
      } else {
        cx.fillStyle = o.t === "err" ? "#3a0f1e" : "rgba(58,15,30,.9)";
        cx.strokeStyle = "#ff5470";
        cx.lineWidth = 2;
        rr(o.x, o.y, o.w, o.h, 9);
        cx.fill();
        cx.stroke();
        cx.shadowBlur = 0;
        cx.fillStyle = "#ffd0d8";
        cx.font = "700 12px " + MONO;
        if (o.t === "err")
          cx.fillText("✖ ERROR", o.x + o.w / 2, o.y + o.h / 2 + 4);
        else {
          cx.fillText(o.n, o.x + o.w / 2, o.y + o.h / 2 + 1);
          cx.strokeStyle = "#ff5470";
          cx.lineWidth = 1.5;
          cx.beginPath();
          var sx = o.x + 12,
            wy = o.y + o.h / 2 + 8;
          cx.moveTo(sx, wy);
          for (var q = 0; sx + q * 4 < o.x + o.w - 12; q++)
            cx.lineTo(sx + q * 4 + 2, wy + (q % 2 ? 0 : 3));
          cx.stroke();
        }
      }
      cx.restore();
    }
    var dk = S.duck && S.y >= G - 0.5,
      jh = G - S.y;
    cx.fillStyle = "rgba(255,165,31," + (0.22 - Math.min(0.16, jh / 700)) + ")";
    cx.beginPath();
    cx.ellipse(PX + 27, G + 3, 26 - jh / 12, 5, 0, 0, 7);
    cx.fill();
    if (!(S.inv > 0 && Math.floor(S.t / 5) % 2)) {
      var bob = run && !pause && !jh ? Math.abs(Math.sin(S.t * 0.28)) * 3 : 0;
      if (avOK) {
        var dh = dk ? 54 : 86,
          dw =
            dh *
            (dk ? 1.55 : av.width / av.height) *
            (dk ? av.width / av.height / 1.55 : 1);
        cx.save();
        cx.translate(PX + 27, S.y + 4 - bob);
        if (!dk && jh > 0) cx.rotate(-0.08);
        cx.drawImage(av, -dw / 2, -dh, dw, dh);
        cx.restore();
      } else {
        cx.fillStyle = "#ffa51f";
        cx.beginPath();
        cx.arc(PX + 27, S.y - 30, 26, 0, 7);
        cx.fill();
      }
    }
    cx.textAlign = "center";
    cx.font = "700 15px " + MONO;
    for (i = 0; i < S.pop.length; i++) {
      t = S.pop[i];
      cx.globalAlpha = 1 - t.t / 40;
      cx.fillStyle = "#ffd36b";
      cx.fillText("+10", t.x + 20, t.y - t.t * 0.8);
    }
    cx.globalAlpha = 1;
    cx.restore();
    if (!run || pause) {
      cx.fillStyle = "rgba(7,11,27,.74)";
      cx.fillRect(0, 0, W, H);
      cx.fillStyle = "#f4f5ff";
      cx.textAlign = "center";
      cx.font = "700 28px " + SANS;
      if (over) {
        cx.fillText(tr("Build falhou!", "Build failed!"), W / 2, 126);
        cx.font = "500 16px " + MONO;
        cx.fillStyle = "#ffa51f";
        cx.fillText(
          tr("Pontos ", "Score ") + score() + "  ·  " + tr("Recorde ", "Best ") + best,
          W / 2,
          158,
        );
        cx.fillStyle = "#97a0c9";
        cx.font = "15px " + SANS;
        cx.fillText(
          tr(
            "Toque aqui ou use o botão para jogar de novo",
            "Tap here or use the button to play again",
          ),
          W / 2,
          188,
        );
      } else if (pause) cx.fillText(tr("Pausado", "Paused"), W / 2, 160);
      else {
        cx.fillText(tr("Compile sem erros!", "Compile without errors!"), W / 2, 126);
        cx.fillStyle = "#97a0c9";
        cx.font = "15px " + SANS;
        cx.fillText(
          tr(
            "Colete blocos de sintaxe e desvie de bugs e erros de compilação.",
            "Collect syntax blocks and avoid bugs and compilation errors.",
          ),
          W / 2,
          158,
        );
        cx.fillText(
          tr("Espaço ou toque para pular · ↓ para abaixar", "Space or tap to jump · ↓ to duck"),
          W / 2,
          184,
        );
      }
    }
  }
  function loop(ts) {
    requestAnimationFrame(loop);
    var dt = last ? ts - last : 16.7;
    last = ts;
    if (!vis) return;
    var k = Math.min(2.5, dt / 16.67);
    if (run && !pause) step(k);
    draw();
  }
  function start() {
    reset();
    run = true;
    pause = false;
    over = false;
    go.textContent = tr("Reiniciar", "Restart");
    pa.textContent = tr("Pausar", "Pause");
    hud();
  }
  function setPause(p) {
    if (!run) return;
    pause = p;
    pa.textContent = p ? tr("Continuar", "Resume") : tr("Pausar", "Pause");
  }
  reset();
  hud();
  draw();
  requestAnimationFrame(loop);
  go.onclick = start;
  pa.onclick = function () {
    setPause(!pause);
  };
  $("ju").onclick = jump;
  function setDuck(v) {
    S.duck = v;
    du.classList.toggle("on", v);
    du.setAttribute("aria-pressed", v);
  }
  du.onclick = function () {
    setDuck(!S.duck);
  };
  cv.addEventListener("pointerdown", function () {
    if (run && !pause) jump();
    else if (!run) start();
    else setPause(false);
  });
  new IntersectionObserver(
    function (es) {
      vis = es[0].isIntersecting;
      if (!vis) setPause(true);
      else draw();
    },
    { threshold: 0.15 },
  ).observe($("jogo"));
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) setPause(true);
  });
  addEventListener("languagechange", function () {
    hud();
    if (run) {
      go.textContent = over ? tr("Jogar de novo", "Play again") : tr("Reiniciar", "Restart");
      pa.textContent = pause ? tr("Continuar", "Resume") : tr("Pausar", "Pause");
    }
    draw();
  });
  document.addEventListener("keydown", function (e) {
    if (!run || !vis || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    var k = e.key.toLowerCase();
    if (k === " " || k === "arrowup" || k === "w") {
      e.preventDefault();
      jump();
    } else if (k === "arrowdown" || k === "s") {
      e.preventDefault();
      setDuck(true);
    } else if (k === "p") setPause(!pause);
  });
  document.addEventListener("keyup", function (e) {
    var k = e.key.toLowerCase();
    if (k === "arrowdown" || k === "s") setDuck(false);
  });
})();
