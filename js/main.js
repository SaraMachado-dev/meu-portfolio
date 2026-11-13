(function () {
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".rv").forEach(function (el) {
    io.observe(el);
  });
  var links = [].slice.call(document.querySelectorAll("#nav a"));
  var so = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) {
            l.classList.toggle(
              "on",
              l.getAttribute("href") === "#" + e.target.id,
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  document.querySelectorAll("section[id]").forEach(function (s) {
    so.observe(s);
  });
  var en = false;
  var translations = {
    "Portfólio de Sara Machado, estudante de Engenharia de Software. Java, desenvolvimento web e back-end.":
      "Portfolio of Sara Machado, Software Engineering student. Java, web development and back-end.",
    "Sara Machado | Portfólio": "Sara Machado | Portfolio",
    "Foto de Sara Machado": "Photo of Sara Machado",
    "Foto de Sara Machado sorrindo de leve, de camiseta preta":
      "Sara Machado smiling slightly, wearing a black shirt",
    "Olá 👋, eu sou": "Hi 👋, I am",
    "Engenharia de Software · Back-end": "Software Engineering · Back-end",
    "🎓 Estudante de Engenharia de Software": "🎓 Software Engineering student",
    "☕ Desenvolvedora Back-end": "☕ Back-end developer",
    "🚀 Futura Desenvolvedora Full Stack": "🚀 Future Full Stack developer",
    "🇧🇷 Brasil": "🇧🇷 Brazil",
    "☕ Desenvolvedora Back-end": "☕ Back-end developer",
    "🇧🇷 Brasil": "🇧🇷 Brazil",
    "Apaixonada por tecnologia e desenvolvimento de software. Atualmente estou focada em desenvolvimento back-end com Java, construindo uma base sólida em programação orientada a objetos, bancos de dados e desenvolvimento back-end moderno.":
      "Passionate about technology and software development. I am currently focused on back-end development with Java, building a solid foundation in object-oriented programming, databases, and modern back-end development.",
    "Estou constantemente estudando, criando projetos e aprimorando minhas habilidades passo a passo em minha jornada como desenvolvedora.":
      "I am constantly studying, building projects, and improving my skills step by step on my journey as a developer.",
    Formação: "Education",
    "Engenharia de Software (previsão janeiro de 2030)":
      "Software Engineering (expected January 2030)",
    Residência: "Location",
    "Brasília, DF": "Brasília, DF",
    Idiomas: "Languages",
    "Português (nativo), Inglês (intermediário), Espanhol (básico)":
      "Portuguese (native), English (intermediate), Spanish (basic)",
    Disponibilidade: "Availability",
    "Remoto, híbrido ou presencial": "Remote, hybrid, or on-site",
    "E-mail": "Email",
    "Linguagens": "Languages",
    Ferramentas: "Tools",
    Tecnologia: "Technology",
    "Lógica de programação": "Programming logic",
    "Desenvolvimento web": "Web development",
    "Áreas de foco": "Focus areas",
    "Programação Orientada a Objetos (POO)": "Object-Oriented Programming (OOP)",
    "MySQL e Fundamentos de Banco de Dados": "MySQL and Database Fundamentals",
    "Inteligência Artificial": "Artificial Intelligence",
    "Engenharia de prompt": "Prompt engineering",
    "Imagem do projeto": "Project image",
    "Nome do Projeto 1": "Project Name 1",
    "Nome do Projeto 2": "Project Name 2",
    "Nome do Projeto 3": "Project Name 3",
    "Descreva em uma ou duas frases o que o projeto faz e qual problema resolve.":
      "Describe in one or two sentences what the project does and which problem it solves.",
    "Descreva o objetivo e o resultado.": "Describe the goal and outcome.",
    "Descreva as tecnologias usadas.": "Describe the technologies used.",
    "Acessar projeto →": "Open project →",
    "Ver no GitHub →": "View on GitHub →",
    Período: "Period",
    "Cargo ou experiência 1": "Role or experience 1",
    "Cargo ou experiência 2": "Role or experience 2",
    "Resuma suas responsabilidades e o que aprendeu.":
      "Summarize your responsibilities and what you learned.",
    "Estágio, freelance, voluntariado ou projetos acadêmicos.":
      "Internship, freelance, volunteering, or academic projects.",
    "Harvard University · edX": "Harvard University · edX",
    "Alura · Imersão": "Alura · Immersion",
    "Curso em Vídeo": "Curso em Vídeo",
    "Panorama da IA e Aplicações no Dia a Dia":
      "AI Overview and Everyday Applications",
    "Princípios de Desenvolvimento de Software Colaborativo":
      "Principles of Collaborative Software Development",
    "Lógica de programação: mergulhe em programação com JavaScript":
      "Programming logic: dive into programming with JavaScript",
    "Algoritmos e Lógica de Programação": "Algorithms and Programming Logic",
    "Bases Numéricas": "Number Bases",
    "Experiência interativa": "Interactive experience",
    "Dev Runner · corra pelo código": "Dev Runner · run through the code",
    "Compile sem erros: colete blocos de sintaxe correta e desvie de bugs e erros de compilação.":
      "Compile without errors: collect correct syntax blocks and avoid bugs and compilation errors.",
    "Como jogar:": "How to play:",
    "Espaço ou ↑ pula, segure ↓ ou S para abaixar, P pausa. No celular, toque na tela para pular e use o botão Abaixar. O jogo pausa sozinho quando você sai da seção.":
      "Space or ↑ jumps, hold ↓ or S to duck, P pauses. On mobile, tap the screen to jump and use the Duck button. The game pauses automatically when you leave the section.",
    "Blocos de sintaxe": "Syntax blocks",
    "{ } ( ) ; => e companhia. Cada bloco vale 10 pontos.":
      "{ } ( ) ; => and friends. Each block is worth 10 points.",
    Bugs: "Bugs",
    "Ficam no chão. Pule por cima.": "They stay on the ground. Jump over them.",
    "Erros de compilação": "Compilation errors",
    "Alguns bloqueiam o chão, outros flutuam no ar. Pule ou abaixe.":
      "Some block the ground, others float in the air. Jump or duck.",
    "Vamos Conversar": "Let's Talk",
    "Tem uma oportunidade? Adoraria ouvir sobre ela.":
      "Have an opportunity? I would love to hear about it.",
    "Seu nome": "Your name",
    "Seu e-mail": "Your email",
    Assunto: "Subject",
    "Sua mensagem": "Your message",
    "➤ Enviar mensagem": "➤ Send message",
    "Informações de Contato": "Contact Information",
    "Busco estágio, vaga CLT ou freelance em tecnologia. Vamos conversar!":
      "I am looking for an internship, full-time role, or freelance work in technology. Let's talk!",
    Telefone: "Phone",
    Endereço: "Address",
    "Brasília, Distrito Federal": "Brasília, Federal District",
    "Conecte-se": "Connect",
    "© 2026 Sara Machado · Brasília, DF": "© 2026 Sara Machado · Brasília, DF",
    "Introdução à Ciência da Computação (CS50x)":
      "Introduction to Computer Science (CS50x)",
    "Imersão Engenharia de Software: Dev na Era da IA":
      "Software Engineering Immersion: Development in the AI Era",
    "Imersão Front-end com IA": "Front-end Immersion with AI",
    "HTML5 e CSS3 (módulo 1 de 5)": "HTML5 and CSS3 (module 1 of 5)",
    "Git e GitHub": "Git and GitHub",
    "nov.": "Nov.",
    "abr.": "Apr.",
    "fev.": "Feb.",
    "out.": "Oct.",
    "4 h · nov. 2026": "4 h · Nov. 2026",
    "2 h · abr. 2026": "2 h · Apr. 2026",
    "10 h · abr. 2026": "10 h · Apr. 2026",
    "9 h · out. 2025": "9 h · Oct. 2025",
    "6 h · fev. 2025": "6 h · Feb. 2025",
    "Espaço ou ↑ pula, segure ↓ ou S para abaixar, P pausa. No celular, toque na tela para pular e use o botão Abaixar. O jogo pausa sozinho quando você sai da seção.":
      "Space or ↑ jumps, hold ↓ or S to duck, P pauses. On mobile, tap the screen to jump and use the Duck button. The game pauses automatically when you leave the section.",
    "Pontos 0": "Score 0",
    "Blocos 0": "Blocks 0",
    "Recorde 0": "Best 0",
    Começar: "Start",
    Pausar: "Pause",
    "Pular ↑": "Jump ↑",
    "Abaixar ↓": "Duck ↓",
  };
  var textNodes = [];
  var attributes = [
    ["html", "lang", "pt-BR", "en"],
    ["meta[name='description']", "content", document.querySelector("meta[name='description']").content, translations[document.querySelector("meta[name='description']").content]],
    ["title", "textContent", document.title, translations[document.title]],
    ["#theme", "aria-label", "Alternar tema", "Toggle theme"],
    ["#cv", "aria-label", "Minigame Dev Runner", "Dev Runner minigame"],
    ["#f", "aria-label", "", ""],
    ["#fn", "placeholder", "Seu nome", "Your name"],
    ["#fe", "placeholder", "Seu e-mail", "Your email"],
    ["#fs", "placeholder", "Assunto", "Subject"],
    ["#fm", "placeholder", "Sua mensagem", "Your message"],
    [".photo img", "alt", "Foto de Sara Machado", "Photo of Sara Machado"],
    [
      "#sobre .photo img",
      "alt",
      "Sara Machado sorrindo de leve, de camiseta preta",
      "Sara Machado smiling slightly, wearing a black shirt",
    ],
  ];
  function translatedText(value) {
    var key = value.trim().replace(/\s+/g, " ");
    return translations[key] || value;
  }
  function collectText(node) {
    node.childNodes.forEach(function (child) {
      if (child.nodeType === 3 && child.textContent.trim()) {
        textNodes.push({
          node: child,
          pt: child.textContent,
          en: child.textContent.replace(child.textContent.trim(), translatedText(child.textContent)),
        });
      } else if (child.nodeType === 1 && !child.hasAttribute("data-en")) {
        collectText(child);
      }
    });
  }
  collectText(document.body);
  document.querySelectorAll("[data-en]").forEach(function (el) {
    el.dataset.pt = el.textContent;
  });
  function applyLanguage() {
    document.documentElement.lang = en ? "en" : "pt-BR";
    document.querySelectorAll("[data-en]").forEach(function (el) {
      el.textContent = en ? el.dataset.en : el.dataset.pt;
    });
    textNodes.forEach(function (item) {
      item.node.textContent = en ? item.en : item.pt;
    });
    attributes.forEach(function (item) {
      var el = item[0] === "html" ? document.documentElement : document.querySelector(item[0]);
      if (!el || !item[3]) return;
      el[item[1]] = en ? item[3] : item[2];
    });
    document.getElementById("lang").textContent = en ? "🌐 PT" : "🌐 EN";
    dispatchEvent(new CustomEvent("languagechange"));
  }
  document.getElementById("lang").onclick = function () {
    en = !en;
    applyLanguage();
  };
  applyLanguage();
  document.getElementById("f").onsubmit = function (e) {
    e.preventDefault();
    var n = fn.value,
      m = fm.value + "\n\n" + n + " (" + fe.value + ")";
    location.href =
      "mailto:devsaramachado@gmail.com?subject=" +
      encodeURIComponent((fs.value || "Contato pelo portfólio") + " - " + n) +
      "&body=" +
      encodeURIComponent(m);
  };
  var rt = document.documentElement,
    bar = document.getElementById("bar");
  addEventListener(
    "scroll",
    function () {
      var m = rt.scrollHeight - innerHeight;
      bar.style.width = (m > 0 ? (scrollY / m) * 100 : 0) + "%";
    },
    { passive: true },
  );
  document.getElementById("theme").onclick = function () {
    var l = rt.dataset.mode === "light";
    rt.dataset.mode = l ? "dark" : "light";
    this.textContent = l ? "☀" : "🌙";
    dispatchEvent(new Event("themechange"));
  };
  var roles = [
      ["Estudante de Engenharia de Software", "Software Engineering student"],
      ["Back-end com Java", "Back-end with Java"],
      ["Desenvolvimento Web", "Web development"],
      ["Full Stack em formação", "Aspiring Full Stack developer"],
    ],
    ty = document.getElementById("ty");
  var ri = 0,
    ci = 0,
    del = false;
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
    ty.textContent = roles[en ? 0 : 0][en ? 1 : 0];
  } else {
    (function t() {
      var r = roles[ri][en ? 1 : 0];
      ci += del ? -1 : 1;
      ty.textContent = r.slice(0, ci);
      var d = del ? 35 : 75;
      if (!del && ci === r.length) {
        del = true;
        d = 1600;
      } else if (del && ci === 0) {
        del = false;
        ri = (ri + 1) % roles.length;
        d = 350;
      }
      setTimeout(t, d);
    })();
  }
  addEventListener("languagechange", function () {
    ty.textContent = roles[ri][en ? 1 : 0];
  });

  var nl = document.getElementById("nl"),
    nt;
  function ld() {
    clearTimeout(nt);
    nl.style.transition = "none";
    nl.style.width = "0";
    nl.style.opacity = "1";
    void nl.offsetWidth;
    nl.style.transition = "width .5s ease,opacity .3s";
    nl.style.width = "75%";
    nt = setTimeout(function () {
      nl.style.width = "100%";
      nt = setTimeout(function () {
        nl.style.opacity = "0";
      }, 350);
    }, 650);
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest('a[href^="#"],#lang,#theme,.btn')) ld();
  });
  document.addEventListener("pointermove", function (e) {
    var c = e.target.closest && e.target.closest(".card");
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px");
    c.style.setProperty("--my", e.clientY - r.top + "px");
  });
  function net(sec) {
    var c = document.createElement("canvas");
    c.className = "net";
    sec.prepend(c);
    var x = c.getContext("2d"),
      n = [],
      w = 0,
      hh = 0,
      vis = false,
      dpr = Math.min(devicePixelRatio || 1, 2),
      calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
    function size() {
      w = sec.clientWidth;
      hh = sec.clientHeight;
      c.width = w * dpr;
      c.height = hh * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      var k = Math.max(14, Math.round((w * hh) / 24000));
      n = [];
      for (var i = 0; i < k; i++)
        n.push({
          x: Math.random() * w,
          y: Math.random() * hh,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 1 + Math.random() * 1.8,
          p: Math.random() * 6,
        });
    }
    function f(t) {
      x.clearRect(0, 0, w, hh);
      var i,
        j,
        a,
        b,
        d,
        lt = document.documentElement.dataset.mode === "light",
        lc = lt ? "224,112,0" : "255,165,31";
      for (i = 0; i < n.length; i++) {
        a = n[i];
        if (!calm) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > hh) a.vy *= -1;
        }
      }
      for (i = 0; i < n.length; i++)
        for (j = i + 1; j < n.length; j++) {
          a = n[i];
          b = n[j];
          d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 150) {
            x.strokeStyle =
              "rgba(" + lc + "," + (lt ? 0.4 : 0.22) * (1 - d / 150) + ")";
            x.lineWidth = 1;
            x.beginPath();
            x.moveTo(a.x, a.y);
            x.lineTo(b.x, b.y);
            x.stroke();
          }
        }
      for (i = 0; i < n.length; i++) {
        a = n[i];
        var g = 0.55 + 0.45 * Math.sin(t / 700 + a.p);
        x.shadowColor = lt ? "rgba(224,112,0,.5)" : "#ffa51f";
        x.shadowBlur = lt ? 6 : 10;
        x.fillStyle = lt
          ? "rgba(224,112,0," + g + ")"
          : "rgba(255,190,80," + g + ")";
        x.beginPath();
        x.arc(a.x, a.y, a.r, 0, 7);
        x.fill();
      }
      x.shadowBlur = 0;
      if (vis && !calm) requestAnimationFrame(f);
    }
    size();
    addEventListener("themechange", function () {
      if (!vis || calm) f(0);
    });
    new ResizeObserver(function () {
      size();
      if (!vis) f(0);
    }).observe(sec);
    new IntersectionObserver(function (es) {
      var v = es[0].isIntersecting;
      if (v && !vis) {
        vis = true;
        requestAnimationFrame(f);
      }
      vis = v;
    }).observe(sec);
    f(0);
  }
  ["habilidades", "certificacoes"].forEach(function (id) {
    net(document.getElementById(id));
  });
})();
