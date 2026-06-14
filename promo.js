/* ════════════════════════════════════════════════════════════
   DORI YUMS — Promo bar (rotating) + PWA install
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.from((c || document).querySelectorAll(s)); }

  /* ─── offers (translated 3 langs) ─── */
  var OFFERS = {
    ar: [
      { badge: 'عرض اليوم',  copy: 'اشترِ <b>علبة 20</b> واحصل على <b>2 مجاناً</b>' },
      { badge: 'عرض كبير',   copy: 'اشترِ <b>علبة 50</b> واحصل على <b>4 مجاناً</b>' },
      { badge: 'الأفخم',     copy: 'اشترِ <b>100 قطعة</b> واحصل على <b>6 مجاناً</b> <span class="dot"></span> <b>توصيل مجاني</b>' }
    ],
    fr: [
      { badge: 'Offre du jour',  copy: 'Achetez <b>boîte de 20</b> et recevez <b>2 macarons offerts</b>' },
      { badge: 'Grande offre',   copy: 'Achetez <b>boîte de 50</b> et recevez <b>4 macarons offerts</b>' },
      { badge: 'Premium',        copy: 'Achetez <b>100 pièces</b> et recevez <b>6 offertes</b> <span class="dot"></span> <b>Livraison gratuite</b>' }
    ],
    en: [
      { badge: 'Today\u2019s Offer',  copy: 'Buy a <b>box of 20</b> and get <b>2 free</b>' },
      { badge: 'Big Offer',           copy: 'Buy a <b>box of 50</b> and get <b>4 free</b>' },
      { badge: 'Premium',             copy: 'Buy <b>100 pieces</b> and get <b>6 free</b> <span class="dot"></span> <b>Free delivery</b>' }
    ]
  };

  var CTA_LABEL = { ar: 'اطلب عبر واتساب', fr: 'Commander', en: 'Order Now' };
  var WA_DEFAULT = '213551401704';
  function waNum() { return (window.__WA_NUMBER) || WA_DEFAULT; }
  function waLink(offerLabel) {
    var L = lang();
    var msg = L === 'ar'
      ? '✨ *Dori Yums* — مرحباً، أرغب بالاستفادة من عرض: ' + offerLabel
      : L === 'fr'
      ? '✨ *Dori Yums* — Bonjour, je souhaite profiter de l\'offre : ' + offerLabel
      : '✨ *Dori Yums* — Hello, I would like to take the offer: ' + offerLabel;
    return 'https://wa.me/' + waNum() + '?text=' + encodeURIComponent(msg);
  }

  var CLOSE_KEY = 'doriyums_promo_closed_v2';
  var promoIdx = 0;
  var promoTimer = null;

  function lang() {
    return (window.__LANG) || document.documentElement.lang || 'ar';
  }

  function buildPromoBar() {
    /* skip if user dismissed in this session */
    try { if (sessionStorage.getItem(CLOSE_KEY) === '1') return; } catch (e) {}

    var bar = document.createElement('div');
    bar.className = 'promo-bar';
    bar.id = 'promoBar';
    bar.innerHTML = '' +
      '<div class="promo-stage" id="promoStage"></div>' +
      '<div class="promo-pips" id="promoPips"></div>' +
      '<button class="promo-close" type="button" aria-label="close" id="promoClose">×</button>';
    document.body.insertBefore(bar, document.body.firstChild);
    document.body.classList.add('has-promo');

    renderPromo();
    rotatePromo();

    $('#promoClose').addEventListener('click', function () {
      bar.style.transform = 'translateY(-100%)';
      bar.style.transition = 'transform .4s ease';
      setTimeout(function () {
        document.body.classList.remove('has-promo');
        bar.remove();
      }, 420);
      try { sessionStorage.setItem(CLOSE_KEY, '1'); } catch (e) {}
      clearInterval(promoTimer);
    });

    /* re-render on language change */
    window.addEventListener('langchange', function () {
      promoIdx = 0;
      renderPromo();
    });
  }

  function renderPromo() {
    var L = lang();
    var offers = OFFERS[L] || OFFERS.ar;
    var stage = $('#promoStage');
    var pips = $('#promoPips');
    if (!stage || !pips) return;

    stage.innerHTML = offers.map(function (o, i) {
      /* strip HTML tags from copy for the offer label sent in WA message */
      var plain = o.copy.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      var ctaLabel = CTA_LABEL[L] || CTA_LABEL.ar;
      return '<div class="promo-slide' + (i === promoIdx ? ' is-active' : '') + '" data-i="' + i + '">' +
        '<span class="badge">' + o.badge + '</span>' +
        '<span class="copy">' + o.copy + '</span>' +
        '<a class="promo-cta" href="' + waLink(plain) + '" target="_blank" rel="noopener">' +
          '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.92-9.91zm5.83 14.16c-.25.7-1.43 1.32-2.01 1.4-.52.07-1.18.1-1.91-.12-.44-.14-1.01-.32-1.74-.64-3.06-1.32-5.06-4.4-5.21-4.6-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.27-.3.6-.37.8-.37s.4 0 .57.01c.18.01.43-.07.67.51.25.6.85 2.09.92 2.24.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.32.4-.45.53-.15.15-.3.31-.13.6.18.3.78 1.29 1.68 2.08 1.16 1.03 2.13 1.35 2.43 1.5.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.12.07.72-.18 1.42z"/></svg>' +
          '<span>' + ctaLabel + '</span>' +
        '</a>' +
      '</div>';
    }).join('');

    pips.innerHTML = offers.map(function (_, i) {
      return '<button class="promo-pip' + (i === promoIdx ? ' is-active' : '') + '" data-i="' + i + '" aria-label="' + (i + 1) + '"></button>';
    }).join('');

    $$('.promo-pip', pips).forEach(function (p) {
      p.addEventListener('click', function () {
        goPromo(parseInt(p.dataset.i, 10));
        rotatePromo();
      });
    });
  }

  function goPromo(next) {
    var slides = $$('#promoStage .promo-slide');
    var pips = $$('#promoPips .promo-pip');
    if (!slides.length) return;
    next = ((next % slides.length) + slides.length) % slides.length;
    var cur = slides.findIndex(function (s) { return s.classList.contains('is-active'); });
    if (cur === next) return;
    slides[cur]?.classList.replace('is-active', 'is-leaving');
    setTimeout(function () { slides[cur]?.classList.remove('is-leaving'); }, 700);
    slides[next].classList.add('is-active');
    pips.forEach(function (p, i) { p.classList.toggle('is-active', i === next); });
    promoIdx = next;
  }

  function rotatePromo() {
    if (promoTimer) clearInterval(promoTimer);
    promoTimer = setInterval(function () {
      var slides = $$('#promoStage .promo-slide');
      if (!slides.length) return;
      goPromo((promoIdx + 1) % slides.length);
    }, 4500);
  }

  /* ════════════════════════════════════════════════════════════
     PWA — install banner
     ════════════════════════════════════════════════════════════ */
  var INSTALL_DISMISS_KEY = 'doriyums_pwa_dismissed_v1';
  var deferredPrompt = null;

  var PWA_TEXT = {
    ar: { h: 'ثبّت Dori Yums', p: 'افتح متجرنا كتطبيق من شاشتك الرئيسية', install: 'تثبيت', later: 'لاحقاً' },
    fr: { h: 'Installer Dori Yums', p: 'Ouvrez notre boutique depuis votre écran d\u2019accueil', install: 'Installer', later: 'Plus tard' },
    en: { h: 'Install Dori Yums', p: 'Open our shop from your home screen', install: 'Install', later: 'Later' }
  };

  function buildPwaBanner() {
    var b = document.createElement('div');
    b.className = 'pwa-install';
    b.id = 'pwaInstall';
    b.innerHTML = '' +
      '<div class="icon">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/>' +
        '</svg>' +
      '</div>' +
      '<div class="text">' +
        '<h4 id="pwaH"></h4>' +
        '<p id="pwaP"></p>' +
      '</div>' +
      '<div class="actions">' +
        '<button class="install" id="pwaInstallBtn"></button>' +
        '<button class="later" id="pwaLaterBtn"></button>' +
      '</div>';
    document.body.appendChild(b);
    applyPwaText();
    window.addEventListener('langchange', applyPwaText);

    $('#pwaInstallBtn').addEventListener('click', function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function () {
        deferredPrompt = null;
        hidePwa();
      });
    });
    $('#pwaLaterBtn').addEventListener('click', function () {
      try { localStorage.setItem(INSTALL_DISMISS_KEY, String(Date.now())); } catch (e) {}
      hidePwa();
    });
  }

  function applyPwaText() {
    var L = lang();
    var t = PWA_TEXT[L] || PWA_TEXT.ar;
    var h = $('#pwaH'), p = $('#pwaP');
    if (h) h.textContent = t.h;
    if (p) p.textContent = t.p;
    var ib = $('#pwaInstallBtn'); if (ib) ib.textContent = t.install;
    var lb = $('#pwaLaterBtn'); if (lb) lb.textContent = t.later;
  }

  function showPwa() {
    /* respect 7-day dismissal */
    try {
      var d = parseInt(localStorage.getItem(INSTALL_DISMISS_KEY) || '0', 10);
      if (d && (Date.now() - d) < 7 * 24 * 3600 * 1000) return;
    } catch (e) {}
    var b = $('#pwaInstall'); if (!b) return;
    setTimeout(function () { b.classList.add('is-shown'); }, 6000);
  }
  function hidePwa() {
    var b = $('#pwaInstall'); if (b) b.classList.remove('is-shown');
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    buildPwaBanner();
    showPwa();
  });

  /* register service worker (best effort) */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }

  /* ─── init ─── */
  function init() {
    buildPromoBar();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
