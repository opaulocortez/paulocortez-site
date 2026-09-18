/* ─────────────────────────────────────────────
   PAULO CORTEZ — Main Script
   Scroll reveal, carousel, header, FAQ,
   topic modal, WhatsApp, lazy-load
───────────────────────────────────────────── */

(function () {
  "use strict";

  /* ── HERO ENTER ─────────────────────────── */
  const heroBgImg = document.querySelector(".hero-bg-img");
  if (heroBgImg) {
    if (heroBgImg.complete) heroBgImg.classList.add("loaded");
    else heroBgImg.addEventListener("load", () => heroBgImg.classList.add("loaded"));
  }

  /* ── HEADER ─────────────────────────────── */
  const header = document.getElementById("header");
  const heroEl = document.getElementById("hero");

  function updateHeader() {
    const scrolled = window.scrollY > 40;
    header.classList.toggle("scrolled", scrolled);

    if (heroEl) {
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      header.classList.toggle("hero-active", heroBottom > 80);
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ── MOBILE NAV ──────────────────────────── */
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open);
    });

    mobileNav.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ── SCROLL REVEAL ───────────────────────── */
  const reveals = document.querySelectorAll(".reveal");

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => revealObs.observe(el));

  /* ── TESTIMONIALS CAROUSEL ───────────────── */
  const track = document.querySelector(".testimonials-track");
  const prevBtn = document.getElementById("tPrev");
  const nextBtn = document.getElementById("tNext");
  const dotsContainer = document.querySelector(".t-dots");

  if (track && prevBtn && nextBtn) {
    let idx = 0;

    function getPerPage() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 860) return 1;
      return 3;
    }

    function getCards() {
      return Array.from(track.querySelectorAll(".t-card"));
    }

    function getMax() {
      return Math.max(0, getCards().length - getPerPage());
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = "";
      const max = getMax();
      for (let i = 0; i <= max; i++) {
        const dot = document.createElement("button");
        dot.className = "t-dot" + (i === idx ? " active" : "");
        dot.setAttribute("aria-label", `Ir para depoimento ${i + 1}`);
        dot.type = "button";
        dot.addEventListener("click", () => { idx = i; render(); });
        dotsContainer.appendChild(dot);
      }
    }

    function render() {
      const cards = getCards();
      const max = getMax();
      if (idx > max) idx = max;
      if (idx < 0) idx = 0;

      if (cards.length === 0) return;
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      const cardW = cards[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${idx * (cardW + gap)}px)`;

      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx >= max;

      dotsContainer.querySelectorAll(".t-dot").forEach((d, i) =>
        d.classList.toggle("active", i === idx)
      );
    }

    prevBtn.addEventListener("click", () => { idx--; render(); });
    nextBtn.addEventListener("click", () => { idx++; render(); });

    buildDots();
    render();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { buildDots(); render(); }, 120);
    });

    /* Touch swipe */
    let touchStartX = 0;
    track.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", e => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) { if (dx > 0) { idx++; } else { idx--; } render(); }
    });
  }

  /* ── FAQ ACCORDION ───────────────────────── */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // close all
      document.querySelectorAll(".faq-item.open").forEach(i => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  // open first by default
  const firstFaq = document.querySelector(".faq-item");
  if (firstFaq) firstFaq.classList.add("open");

  /* ── TOPIC MODAL ─────────────────────────── */
  const overlay = document.getElementById("topicModal");
  const modalBody = document.getElementById("modalBody");

  const TOPICS = {
    ia: {
      banner: "linear-gradient(135deg,#0099B0,#013D49)",
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
      title: "IA e a Nova Produtividade",
      objetivo: "Ajudar profissionais e lideranças a incorporar inteligência artificial no dia a dia de trabalho de forma prática, sem depender de conhecimento técnico prévio.",
      modulos: ["Mudança de mentalidade: da resistência à adoção prática", "Ferramentas de IA para e-mails, relatórios, apresentações e decisões", "Como delegar tarefas repetitivas para ganhar foco", "Riscos e limites do uso de IA no ambiente corporativo", "Rotinas de produtividade combinando IA e método pessoal"],
      publico: "Equipes operacionais e lideranças que precisam de ganho real de produtividade."
    },
    neuro: {
      banner: "linear-gradient(135deg,#006478,#0F2A33)",
      icon: `<svg viewBox="0 0 24 24"><path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.5A2.5 2.5 0 0 0 4.5 7 2.5 2.5 0 0 0 2 9.5 2.5 2.5 0 0 0 4.5 12a2.5 2.5 0 0 0 0 5A2.5 2.5 0 0 0 7 19.5v.5A2.5 2.5 0 0 0 9.5 22h1a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 10.5 2h-1z"/><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v.5a2.5 2.5 0 0 1 2.5 2 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 0 1 0 5A2.5 2.5 0 0 1 17 19.5v.5a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-15A2.5 2.5 0 0 1 13.5 2h1z"/></svg>`,
      title: "Neurociência da Priorização e Foco",
      objetivo: "Usar princípios de neurociência aplicada para ajudar profissionais a identificar o que realmente importa em meio a excesso de demandas.",
      modulos: ["Como o cérebro processa prioridades e por que multitarefa não funciona", "Técnicas de foco baseadas em neurociência", "Identificação de ladrões de atenção no ambiente de trabalho", "Critérios claros de priorização para times e lideranças", "Rotinas práticas para sustentar foco ao longo do dia"],
      publico: "Lideranças e equipes com excesso de demandas simultâneas."
    },
    pnl: {
      banner: "linear-gradient(135deg,#00B4C8,#005F75)",
      icon: `<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
      title: "Liderança Humanizada com PNL",
      objetivo: "Desenvolver lideranças que comuniquem com clareza e empatia usando ferramentas de Programação Neurolinguística.",
      modulos: ["Fundamentos de PNL aplicados à liderança", "Como adaptar a comunicação ao perfil de cada liderado", "Técnicas de rapport para construir confiança rápida", "Feedback estruturado com PNL: firme e humano", "Gestão de estados emocionais em momentos de pressão"],
      publico: "Lideranças de primeiro nível que precisam melhorar a relação com a equipe."
    },
    tripla: {
      banner: "linear-gradient(135deg,#946818,#4a340c)",
      icon: `<svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6L12 2z"/></svg>`,
      title: "Inteligência Tripla",
      objetivo: "Desenvolver as três dimensões que sustentam o desempenho profissional: relação saudável com dinheiro, equilíbrio emocional e qualidade dos relacionamentos.",
      modulos: ["Inteligência financeira: educação financeira aplicada ao trabalho", "Inteligência emocional: autoconhecimento e regulação emocional", "Inteligência relacional: construção de confiança e cooperação", "Como as três dimensões se conectam e impactam o desempenho", "Ferramentas práticas para desenvolver cada dimensão"],
      publico: "Equipes e lideranças que precisam de desenvolvimento além da técnica."
    },
    disc: {
      banner: "linear-gradient(135deg,#0099B0,#004b5c)",
      icon: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
      title: "Liderança com Metodologia DISC",
      objetivo: "Usar o DISC como ferramenta prática para lideranças entenderem perfis comportamentais e adaptarem sua forma de liderar.",
      modulos: ["Fundamentos da metodologia DISC e os quatro perfis", "Aplicação do teste DISC na própria equipe", "Como liderar cada perfil de forma diferente e eficaz", "Formação de times equilibrados com perfis complementares", "Uso do DISC na resolução de conflitos"],
      publico: "Lideranças e RH que querem uma ferramenta validada para entender a equipe."
    },
    geracional: {
      banner: "linear-gradient(135deg,#3D5860,#0F2A33)",
      icon: `<svg viewBox="0 0 24 24"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 21v-2a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v2"/><path d="M12 21v-2a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v2"/></svg>`,
      title: "Sinergia Geracional e Conflitos",
      objetivo: "Ajudar equipes multigeracionais a transformar diferenças de geração em vantagem competitiva.",
      modulos: ["Características das gerações presentes no mercado hoje", "Origem dos conflitos geracionais mais comuns", "Como adaptar liderança e comunicação para cada geração", "Construção de pontes entre experiência e inovação", "Transformar diversidade geracional em resultado"],
      publico: "Organizações com equipes multigeracionais com atrito ou falta de integração."
    },
    performance: {
      banner: "linear-gradient(135deg,#006478,#00343F)",
      icon: `<svg viewBox="0 0 24 24"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>`,
      title: "Engenharia de Times de Alta Performance",
      objetivo: "Aplicar princípios de engenharia de processos e comportamento humano para estruturar equipes que entregam consistentemente acima da média.",
      modulos: ["O que diferencia times comuns de times de elite", "Estruturação de papéis, processos e fluxos de trabalho", "Cultura de feedback contínuo e accountability", "Gestão de metas e indicadores sem gerar desgaste", "Rituais de time que sustentam performance no longo prazo"],
      publico: "Gestores que querem elevar o padrão de entrega do time."
    },
    financeira: {
      banner: "linear-gradient(135deg,#946818,#5c4210)",
      icon: `<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      title: "Educação e Inteligência Financeira",
      objetivo: "Ajudar pessoas a organizarem a vida financeira na prática, desde decisões do dia a dia até os primeiros passos em investimentos.",
      modulos: ["Como escolher a taxa de juros certa e entender o custo real", "Qual dívida pagar primeiro: método prático de priorização", "Ciladas financeiras mais comuns e como se proteger", "Orçamento pessoal e controle de gastos no dia a dia", "Primeiros passos para sair do vermelho e começar a investir"],
      publico: "Público geral. Muito aplicado em SIPATs e empresas com colaboradores endividados."
    }
  };

  function openModal(key) {
    const t = TOPICS[key];
    if (!t || !overlay || !modalBody) return;

    const modulesHtml = t.modulos.map(m => `<li class="modal-module">${m}</li>`).join("");

    modalBody.innerHTML = `
      <div class="modal-banner" style="background:${t.banner}">
        <div class="modal-banner-icon">${t.icon}</div>
      </div>
      <div class="modal-body">
        <div class="modal-eyebrow">Detalhamento do programa</div>
        <h2 class="modal-title">${t.title}</h2>
        <div class="modal-section">
          <h4>Objetivo</h4>
          <p>${t.objetivo}</p>
        </div>
        <div class="modal-section">
          <h4>Módulos abordados</h4>
          <ul class="modal-modules">${modulesHtml}</ul>
        </div>
        <div class="modal-section">
          <h4>Para quem é indicado</h4>
          <p>${t.publico}</p>
        </div>
        <div class="modal-ctas">
          <a href="proposta.html" class="btn-primary">Solicitar Proposta</a>
          <a href="https://wa.me/5511920182998?text=Ola%20Paulo%2C%20quero%20saber%20mais%20sobre%20${encodeURIComponent(t.title)}." target="_blank" rel="noopener" class="btn-sec">Falar pelo WhatsApp</a>
        </div>
      </div>
    `;

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    overlay.querySelector(".modal-close").focus();
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (overlay) {
    overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
  }

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  window.openModal = openModal;
  window.closeModal = closeModal;

  /* ── MATERIAL FORM ───────────────────────── */
  const matForm = document.getElementById("formMaterial");
  const matOk = document.getElementById("matOk");

  if (matForm && matOk) {
    matForm.addEventListener("submit", e => {
      e.preventDefault();
      const body = new URLSearchParams(new FormData(matForm)).toString();
      fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body })
        .then(() => {
          matForm.style.display = "none";
          matOk.style.display = "flex";
        })
        .catch(() => alert("Erro ao enviar. Tente pelo WhatsApp: (11) 92018-2998"));
    });
  }

  /* ── SMOOTH SCROLL for anchors ───────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

})();
