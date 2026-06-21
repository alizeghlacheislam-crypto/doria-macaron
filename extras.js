/* ════════════════════════════════════════════════════════════
   DORI YUMS — Extras
   Splash · Scroll progress · Cart · Music
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function $(s,c){return (c||document).querySelector(s);}
  function $$(s,c){return Array.from((c||document).querySelectorAll(s));}
  function el(t,c){var e=document.createElement(t); if(c) e.className=c; return e;}
  function L(){return window.__LANG||document.documentElement.lang||'ar';}
  function localized(o){ return o[L()] || o.ar || o.en || ''; }
  function fmtN(n){ try{ return Number(n).toLocaleString(L()==='ar'?'ar-DZ':'fr-FR'); }catch(e){ return String(n); } }

  /* ────────────────────────── i18n ────────────────────────── */
  var T = {
    'cart.label':       {ar:'سلّتي',           fr:'Panier',         en:'Cart'},
    'cart.empty':       {ar:'سلّتك فارغة',     fr:'Panier vide',    en:'Your cart is empty'},
    'cart.emptyp':      {ar:'أضف علبتك المفضّلة لتبدأ', fr:'Ajoutez votre première boîte', en:'Add your first box to begin'},
    'cart.add':         {ar:'أضف للسلّة',       fr:'Ajouter au panier', en:'Add to cart'},
    'cart.added':       {ar:'أُضيف إلى سلّتك',  fr:'Ajouté au panier', en:'Added to cart'},
    'cart.view':        {ar:'عرض السلّة',       fr:'Voir le panier',   en:'View cart'},
    'cart.subtotal':    {ar:'المجموع الفرعي',    fr:'Sous-total',     en:'Subtotal'},
    'cart.delivery':    {ar:'التوصيل',          fr:'Livraison',       en:'Delivery'},
    'cart.delivery.tbd':{ar:'يُحدَّد لاحقاً',     fr:'à confirmer',    en:'to confirm'},
    'cart.total':       {ar:'الإجمالي',         fr:'Total',           en:'Total'},
    'cart.send':        {ar:'أرسل كل الطلب على واتساب', fr:'Envoyer tout sur WhatsApp', en:'Send entire order on WhatsApp'},
    'cart.toast.cta':   {ar:'فتح السلّة',       fr:'Ouvrir',         en:'Open'},
    'cart.box':         {ar:'علبة',            fr:'Boîte',           en:'Box'},
    'cart.pcs':         {ar:'قطعة',            fr:'pièces',         en:'pcs'},
    'cart.preset':      {ar:'خلطة الشيف',      fr:'Boîte du chef',  en:'Chef\u2019s box'},
    'cart.single':      {ar:'بنكهة واحدة',      fr:'Mono-saveur',    en:'Single flavour'},
    'cart.custom':      {ar:'مخصّصة',          fr:'Personnalisée',   en:'Custom'},
    'cart.curr':        {ar:'دج',              fr:'DA',              en:'DA'},
    'wa.cart.hdr':      {ar:'🌟 *Dori Yums — طلب جديد*', fr:'🌟 *Dori Yums — Nouvelle commande*', en:'🌟 *Dori Yums — New Order*'},
    'wa.cart.item':     {ar:'العلبة',           fr:'Article',         en:'Item'},
    'wa.cart.thanks':   {ar:'شكراً لاختياركم Dori Yums 🤎', fr:'Merci d\u2019avoir choisi Dori Yums 🤎', en:'Thank you for choosing Dori Yums 🤎'},
    'music.tip.on':     {ar:'تشغيل الموسيقى',    fr:'Activer la musique', en:'Play music'},
    'music.tip.off':    {ar:'إيقاف الموسيقى',    fr:'Couper la musique',  en:'Mute'}
  };
  function t(k){ return localized(T[k]||{}) || k; }

  /* ════════════════════════════════════════════════════════════
     1) SCROLL PROGRESS RIBBON
     ════════════════════════════════════════════════════════════ */
  function buildScrollRibbon(){
    if ($('.dy-scroll-rail')) return;
    var rail = el('div','dy-scroll-rail');
    var fill = el('div','dy-scroll-fill');
    rail.appendChild(fill);
    document.body.appendChild(rail);

    function upd(){
      var h = document.documentElement;
      var sc = h.scrollTop || document.body.scrollTop;
      var max = (h.scrollHeight - h.clientHeight) || 1;
      var pct = Math.max(0, Math.min(100, (sc / max) * 100));
      fill.style.width = pct + '%';
    }
    window.addEventListener('scroll', upd, { passive:true });
    window.addEventListener('resize', upd);
    upd();
  }

  /* ════════════════════════════════════════════════════════════
     3) CART
     ════════════════════════════════════════════════════════════ */
  var CART_KEY = 'dy-cart-v2';
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch(e){ cart = []; }
  if (!Array.isArray(cart)) cart = [];
  function persistCart(){ try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }catch(e){} }

  function cartCount(){ return cart.reduce(function(s,it){ return s + (it.size||0); }, 0); }
  function cartItemCount(){ return cart.length; }

  /* — nav button — */
  function injectCartButton(){
    var navList = $('.nav-menu .nav-links') || $('nav .nav-links');
    if (!navList) return;
    if ($('#dyCartNav', navList)) return;
    var li = el('li','dy-cart-nav-li');
    li.innerHTML =
      '<button id="dyCartNav" class="dy-cart-nav" type="button" aria-label="cart">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' +
          '<path d="M5 7h14l-1.4 11.2A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-1.98-1.8L5 7z"/>' +
          '<path d="M8 7V5a4 4 0 0 1 8 0v2"/>' +
        '</svg>' +
        '<span class="dy-cart-l" data-x-i18n="cart.label"></span>' +
        '<span class="dy-cart-badge" id="dyCartBadge">0</span>' +
      '</button>';
    navList.appendChild(li);
    $('#dyCartNav').addEventListener('click', openCart);
    applyI18n();
    refreshBadge();
  }

  function refreshBadge(){
    var b = $('#dyCartBadge'); if(!b) return;
    var n = cartItemCount();
    b.textContent = n;
    b.classList.toggle('is-on', n > 0);
  }

  /* — drawer shell — */
  function buildDrawer(){
    if ($('#dyCartVeil')) return;
    var veil = el('div','dy-cart-veil'); veil.id='dyCartVeil';
    document.body.appendChild(veil);
    veil.addEventListener('click', closeCart);

    var d = el('aside','dy-cart'); d.id='dyCart';
    d.innerHTML =
      '<div class="dy-cart-head">' +
        '<h3>' +
          '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6">' +
            '<path d="M5 7h14l-1.4 11.2A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-1.98-1.8L5 7z"/>' +
            '<path d="M8 7V5a4 4 0 0 1 8 0v2"/>' +
          '</svg>' +
          '<span data-x-i18n="cart.label"></span>' +
        '</h3>' +
        '<button class="dy-cart-close" id="dyCartClose" type="button" aria-label="close">×</button>' +
      '</div>' +
      '<div class="dy-cart-body" id="dyCartBody"></div>' +
      '<div class="dy-cart-foot" id="dyCartFoot" hidden>' +
        '<div class="dy-cart-totals">' +
          '<div class="dy-tline"><span data-x-i18n="cart.subtotal"></span><span class="v" id="dyCartSub"></span></div>' +
          '<div class="dy-tline"><span data-x-i18n="cart.delivery"></span><span class="v" id="dyCartFee"></span></div>' +
          '<div class="dy-tline grand"><span data-x-i18n="cart.total"></span><span class="v" id="dyCartGrand"></span></div>' +
        '</div>' +
        '<a class="dy-cart-send" id="dyCartSend" target="_blank" rel="noopener">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.92-9.91z"/></svg>' +
          '<span data-x-i18n="cart.send"></span>' +
        '</a>' +
      '</div>';
    document.body.appendChild(d);
    $('#dyCartClose').addEventListener('click', closeCart);
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && d.classList.contains('is-open')) closeCart();
    });
  }

  function openCart(){
    buildDrawer();
    renderCart();
    $('#dyCartVeil').classList.add('is-open');
    $('#dyCart').classList.add('is-open');
    document.body.style.overflow='hidden';
  }
  function closeCart(){
    var d = $('#dyCart'); if (!d) return;
    d.classList.remove('is-open');
    $('#dyCartVeil').classList.remove('is-open');
    document.body.style.overflow='';
  }

  function renderCart(){
    var body = $('#dyCartBody'); if (!body) return;
    body.innerHTML = '';
    if (cart.length === 0) {
      var empty = el('div','dy-cart-empty');
      empty.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">' +
          '<path d="M5 7h14l-1.4 11.2A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-1.98-1.8L5 7z"/>' +
          '<path d="M8 7V5a4 4 0 0 1 8 0v2"/>' +
        '</svg>' +
        '<h4>' + t('cart.empty') + '</h4>' +
        '<p>' + t('cart.emptyp') + '</p>';
      body.appendChild(empty);
      $('#dyCartFoot').hidden = true;
      return;
    }
    $('#dyCartFoot').hidden = false;

    cart.forEach(function(it, idx){
      var item = el('div','dy-cart-item');
      /* thumb: puck colored from item.shell / cream + size badge */
      var puckBg = 'radial-gradient(circle at 35% 30%,'+ (it.cream||'#e8b4b8') +','+ (it.shell||'#d4af37') +' 60%,'+ darker(it.shell||'#b8941f', .3) +')';
      var modeLbl = it.mode === 'preset' ? t('cart.preset')
                  : it.mode === 'custom' ? t('cart.custom')
                  : t('cart.single');
      var mixHtml = '';
      if (it.picks){
        var entries = Object.keys(it.picks).filter(function(k){ return it.picks[k]>0; });
        if (entries.length > 1) {
          mixHtml = '<div class="mix">' + entries.map(function(k){
            var name = (window.__getMacaronName ? window.__getMacaronName(+k) : '#'+k).split('·')[0].trim();
            return name + ' × ' + it.picks[k];
          }).join(' · ') + '</div>';
        }
      }
      item.innerHTML =
        '<div class="dy-cart-thumb">' +
          '<span class="puck" style="background:'+puckBg+';"></span>' +
          '<span class="badge-n">'+ it.size +'</span>' +
        '</div>' +
        '<div class="dy-cart-info">' +
          '<span class="nm">' + (it.name || '—') + '</span>' +
          '<span class="fl">' + (it.flavor || '') + '</span>' +
          '<div class="meta">' +
            '<span class="pill">' + t('cart.box') + ' · ' + it.size + ' ' + t('cart.pcs') + '</span>' +
            '<span class="pill">' + modeLbl + '</span>' +
          '</div>' +
          mixHtml +
        '</div>' +
        '<div class="dy-cart-side">' +
          '<span class="pr"><span class="lat">' + fmtN(it.price) + '</span> ' + t('cart.curr') + '</span>' +
          '<button class="dy-cart-rm" type="button" aria-label="remove" data-rm="'+idx+'">×</button>' +
        '</div>';
      body.appendChild(item);
    });
    body.querySelectorAll('.dy-cart-rm').forEach(function(b){
      b.addEventListener('click', function(){
        var i = +b.dataset.rm;
        cart.splice(i,1);
        persistCart(); refreshBadge(); renderCart();
      });
    });

    /* totals — only the LAST item's delivery counts (one delivery for the whole order) */
    var subtotal = cart.reduce(function(s,it){ return s + (it.price||0); }, 0);
    var fee = 0;
    var anyDelivery = cart.filter(function(it){ return it.del && it.del.mode && it.del.mode !== 'pickup'; });
    if (anyDelivery.length) {
      /* use the highest fee (e.g. wilaya > algiers) */
      fee = Math.max.apply(null, anyDelivery.map(function(it){ return it.fee || 0; }));
    }
    var grand = subtotal + fee;
    $('#dyCartSub').innerHTML = '<span class="lat">' + fmtN(subtotal) + '</span> ' + t('cart.curr');
    $('#dyCartFee').innerHTML = fee > 0 ? '<span class="lat">' + fmtN(fee) + '</span> ' + t('cart.curr') : '<em style="opacity:.6">'+t('cart.delivery.tbd')+'</em>';
    $('#dyCartGrand').innerHTML = '<span class="lat">' + fmtN(grand) + '</span> ' + t('cart.curr');

    /* WA link */
    $('#dyCartSend').href = buildCartWa(subtotal, fee, grand);
    applyI18n();
  }

  function darker(hex, amt){
    var c = hex.replace('#','');
    if (c.length === 3) c = c.split('').map(function(x){return x+x;}).join('');
    var n = parseInt(c,16);
    var r = Math.max(0, ((n>>16)&255) - Math.round(amt*255));
    var g = Math.max(0, ((n>>8)&255) - Math.round(amt*255));
    var b = Math.max(0, (n&255) - Math.round(amt*255));
    return 'rgb('+r+','+g+','+b+')';
  }

  function buildCartWa(subtotal, fee, grand){
    var wa = (window.__getWaNumber && window.__getWaNumber()) || '213551401704';
    var lang = L();
    var sep = '━━━━━━━━━━━━━━━━━━';
    var lines = [t('wa.cart.hdr'), sep, ''];
    cart.forEach(function(it, i){
      lines.push('*' + t('wa.cart.item') + ' ' + (i+1) + ' :*');
      lines.push('  ' + (it.name || '') + ' — ' + t('cart.box') + ' ' + it.size + ' ' + t('cart.pcs'));
      if (it.picks){
        Object.keys(it.picks).forEach(function(k){
          if (it.picks[k] > 0) {
            var nm = window.__getMacaronName ? window.__getMacaronName(+k) : '#'+k;
            lines.push('     • ' + nm.split('·')[0].trim() + ' × ' + it.picks[k]);
          }
        });
      }
      lines.push('     _' + fmtN(it.price) + ' ' + t('cart.curr') + '_');
      lines.push('');
    });
    /* delivery */
    var firstDel = cart.find(function(it){ return it.del && it.del.mode; });
    if (firstDel && firstDel.del.mode !== 'pickup' && (firstDel.del.phone || firstDel.del.addr)) {
      lines.push(sep);
      if (firstDel.del.phone) lines.push('📱 ' + firstDel.del.phone);
      if (firstDel.del.addr)  lines.push('📍 ' + firstDel.del.addr);
      if (firstDel.del.note)  lines.push('📝 ' + firstDel.del.note);
      lines.push('');
    }
    lines.push(sep);
    lines.push('*' + t('cart.subtotal') + ':* ' + fmtN(subtotal) + ' ' + t('cart.curr'));
    if (fee > 0) lines.push('*' + t('cart.delivery') + ':* ' + fmtN(fee) + ' ' + t('cart.curr'));
    lines.push('*' + t('cart.total') + ':* ' + fmtN(grand) + ' ' + t('cart.curr'));
    lines.push('');
    lines.push(t('wa.cart.thanks'));
    return 'https://wa.me/' + wa + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  /* — add-to-cart button injection into detail lightbox — */
  var detailObserver = null;
  function watchDetail(){
    if (detailObserver) return;
    detailObserver = new MutationObserver(function(){
      var detail = $('#detail') || $('.detail');
      if (detail && !detail._dyHook){
        detail._dyHook = true;
        injectAddCartBtn(detail);
      }
    });
    detailObserver.observe(document.body, { childList:true });
    /* try immediately */
    setTimeout(function(){
      var detail = $('#detail') || $('.detail');
      if (detail && !detail._dyHook){ detail._dyHook = true; injectAddCartBtn(detail); }
    }, 800);
  }

  function injectAddCartBtn(detail){
    var orderBtn = detail.querySelector('.di-order');
    if (!orderBtn) return;
    if (detail.querySelector('.dy-add-cart')) return;
    var addBtn = el('button','dy-add-cart');
    addBtn.type = 'button';
    addBtn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M6 8h12l-1.2 9.6A2 2 0 0 1 14.8 19.4H9.2a2 2 0 0 1-1.98-1.8L6 8z"/>' +
        '<path d="M9 8V6a3 3 0 0 1 6 0v2"/>' +
        '<path d="M12 11v4M10 13h4"/>' +
      '</svg>' +
      '<span data-x-i18n="cart.add"></span>';
    /* layout: stack the existing total + buttons in a row */
    orderBtn.parentNode.insertBefore(addBtn, orderBtn);
    orderBtn.parentNode.style.display = 'flex';
    orderBtn.parentNode.style.flexDirection = 'column';
    orderBtn.parentNode.style.gap = '10px';
    /* wrap the two buttons in a row — force same width & no wrap across languages */
    var row = el('div','dy-cta-row');
    row.style.display = 'grid';
    row.style.gridTemplateColumns = '1fr 1fr';
    row.style.gap = '10px';
    row.style.alignItems = 'stretch';
    addBtn.style.flex = '';
    orderBtn.style.flex = '';
    addBtn.style.width = '100%';
    orderBtn.style.width = '100%';
    addBtn.style.minWidth = '0';
    orderBtn.style.minWidth = '0';
    /* in RTL, put WhatsApp on the right (visually first); in LTR, put cart on the right too */
    orderBtn.parentNode.insertBefore(row, addBtn);
    row.appendChild(orderBtn);
    row.appendChild(addBtn);

    addBtn.addEventListener('click', function(){
      if (!window.__getDetailState) return;
      var pieces = window.__totalPiecesNow ? window.__totalPiecesNow() : 0;
      if (pieces === 0){
        addBtn.classList.add('shake');
        setTimeout(function(){ addBtn.classList.remove('shake'); }, 450);
        return;
      }
      var st = window.__getDetailState();
      if (!st) return;
      cart.push({
        ts: Date.now(),
        idx: st.idx,
        size: st.size,
        picks: st.picks,
        mode: st.mode,
        preset: st.preset,
        del: st.del,
        price: st.price,
        fee: st.fee,
        name: st.name,
        flavor: st.flavor,
        shell: st.shell,
        cream: st.cream
      });
      persistCart();
      refreshBadge();
      flyToCart(addBtn);
      showToast(t('cart.added'));
      if (window.__closeDetail) setTimeout(window.__closeDetail, 600);
    });
    applyI18n();
  }

  function flyToCart(srcBtn){
    var srcRect = srcBtn.getBoundingClientRect();
    var navBtn = $('#dyCartNav');
    if (!navBtn) return;
    var dstRect = navBtn.getBoundingClientRect();
    var fly = el('div');
    fly.style.cssText = 'position:fixed;left:'+(srcRect.left+srcRect.width/2-12)+'px;top:'+(srcRect.top+srcRect.height/2-12)+'px;'+
      'width:24px;height:24px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff,#d4af37 60%,#8a6b1f);'+
      'box-shadow:0 0 16px rgba(212,175,55,.8);z-index:99998;transition:transform .7s cubic-bezier(.5,1.4,.5,1),opacity .25s ease;pointer-events:none;';
    document.body.appendChild(fly);
    var dx = (dstRect.left+dstRect.width/2-12) - (srcRect.left+srcRect.width/2-12);
    var dy = (dstRect.top+dstRect.height/2-12) - (srcRect.top+srcRect.height/2-12);
    requestAnimationFrame(function(){
      fly.style.transform = 'translate('+dx+'px,'+dy+'px) scale(.4)';
    });
    setTimeout(function(){
      fly.style.opacity = '0';
      /* bounce badge */
      var badge = $('#dyCartBadge');
      if (badge){ badge.style.transform='scale(1.4)'; setTimeout(function(){badge.style.transform='';}, 220); }
    }, 700);
    setTimeout(function(){ fly.remove(); }, 1000);
  }

  /* — toast — */
  var toastEl=null, toastT=0;
  function showToast(msg){
    if (!toastEl){
      toastEl = el('div','dy-toast');
      toastEl.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 12l2.5 2.5L16 9"/></svg>' +
        '<span class="msg"></span>' +
        '<button type="button" data-x-i18n="cart.toast.cta"></button>';
      document.body.appendChild(toastEl);
      toastEl.querySelector('button').addEventListener('click', openCart);
    }
    toastEl.querySelector('.msg').textContent = msg;
    applyI18n();
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function(){ toastEl.classList.remove('is-on'); }, 3500);
  }

  /* ════════════════════════════════════════════════════════════
     4) MUSIC TOGGLE — ambient piano-pad via WebAudio
     ════════════════════════════════════════════════════════════ */
  var audioCtx=null, master=null, lfo=null, musicPlaying=false;
  var voices=[];
  /* C-pentatonic minor-ish: A3, C4, D4, E4, G4, A4 */
  var FREQS = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

  function buildMusic(){
    var btn = el('button','dy-music');
    btn.id='dyMusic';
    btn.type='button';
    btn.setAttribute('aria-label', t('music.tip.on'));
    btn.innerHTML =
      '<svg class="ic-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 10v4h4l5 5V5L7 10H3z"/><path d="M16 8a5 5 0 0 1 0 8"/><line x1="19" y1="5" x2="5" y2="19"/></svg>' +
      '<svg class="ic-on"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 10v4h4l5 5V5L7 10H3z"/><path d="M16 8a5 5 0 0 1 0 8"/><path d="M19 5a9 9 0 0 1 0 14"/></svg>';
    document.body.appendChild(btn);
    btn.addEventListener('click', toggleMusic);

    /* respect saved state — but DON'T auto-play (browsers block it; need user gesture) */
    try {
      if (localStorage.getItem('dy-music') === '1') {
        /* show visual on; will start on first click anyway */
      }
    } catch(e){}
  }

  function ensureAudio(){
    if (audioCtx) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      master = audioCtx.createGain();
      master.gain.value = 0;
      master.connect(audioCtx.destination);
    } catch(e){
      audioCtx = null;
    }
  }

  function playVoice(freq, delay, dur){
    if (!audioCtx) return;
    var t0 = audioCtx.currentTime + delay;
    /* layered sine + triangle for soft pad feel */
    var osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = freq;
    var osc2 = audioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = freq * 2.005; /* gentle detune */
    var g = audioCtx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.12, t0 + 0.8);
    g.gain.linearRampToValueAtTime(0, t0 + dur);
    var filt = audioCtx.createBiquadFilter();
    filt.type = 'lowpass'; filt.frequency.value = 1800; filt.Q.value = 1;
    osc1.connect(filt); osc2.connect(filt);
    filt.connect(g); g.connect(master);
    osc1.start(t0); osc2.start(t0);
    osc1.stop(t0 + dur + 0.1); osc2.stop(t0 + dur + 0.1);
    voices.push({o1:osc1, o2:osc2, g:g, end:t0+dur});
    /* trim old */
    voices = voices.filter(function(v){ return v.end > audioCtx.currentTime - 0.2; });
  }

  var musicTimer=null;
  function startMusicLoop(){
    if (!audioCtx) return;
    function next(){
      if (!musicPlaying) return;
      /* random chord pick: 2-3 notes */
      var n = 2 + (Math.random() < 0.5 ? 1 : 0);
      var picks = [];
      while (picks.length < n) {
        var f = FREQS[Math.floor(Math.random() * FREQS.length)];
        if (picks.indexOf(f) === -1) picks.push(f);
      }
      picks.forEach(function(f, i){
        playVoice(f, i * 0.05, 4.0 + Math.random());
      });
      /* schedule next chord 2-3s away */
      musicTimer = setTimeout(next, 2200 + Math.random() * 1400);
    }
    next();
  }

  function toggleMusic(){
    ensureAudio();
    if (!audioCtx) return;
    musicPlaying = !musicPlaying;
    var btn = $('#dyMusic');
    btn.classList.toggle('is-playing', musicPlaying);
    btn.setAttribute('aria-label', musicPlaying ? t('music.tip.off') : t('music.tip.on'));
    try { localStorage.setItem('dy-music', musicPlaying ? '1' : '0'); }catch(e){}
    if (musicPlaying){
      audioCtx.resume && audioCtx.resume();
      master.gain.cancelScheduledValues(audioCtx.currentTime);
      master.gain.setValueAtTime(master.gain.value, audioCtx.currentTime);
      master.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 1.5);
      startMusicLoop();
    } else {
      master.gain.cancelScheduledValues(audioCtx.currentTime);
      master.gain.setValueAtTime(master.gain.value, audioCtx.currentTime);
      master.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.2);
      clearTimeout(musicTimer); musicTimer = null;
    }
  }

  /* ════════════════════════════════════════════════════════════
     i18n APPLY
     ════════════════════════════════════════════════════════════ */
  function applyI18n(){
    $$('[data-x-i18n]').forEach(function(e){
      var k = e.getAttribute('data-x-i18n');
      var v = t(k);
      if (v) e.textContent = v;
    });
  }

  /* ════════════════════════════════════════════════════════════
     INIT
     ════════════════════════════════════════════════════════════ */
  function init(){
    buildScrollRibbon();
    injectCartButton();
    buildDrawer();
    watchDetail();
    applyI18n();

    /* re-apply when language changes */
    window.addEventListener('langchange', function(){
      applyI18n();
      injectCartButton();
    });

    /* re-injection if nav re-renders */
    var navObs = new MutationObserver(function(){
      if (!$('#dyCartNav')) injectCartButton();
    });
    var nav = $('.nav-menu') || $('nav');
    if (nav) navObs.observe(nav, { childList:true, subtree:true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
