/* ════════════════════════════════════════════════════════════
   DORI YUMS — Feature Modules JS
   Behind the Scenes · Flavor Quiz · Box Builder · Weddings
   Photo Testimonials · Gift Card · Smart WA Receipt
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* short helpers (mirror app.js to avoid coupling) */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.from((c || document).querySelectorAll(s)); }
  function el(t, c) { var e = document.createElement(t); if (c) e.className = c; return e; }

  /* ─── i18n strings ─── */
  var I18N = {
    ar: {
      'atelier.eye': 'خلف الكواليس',
      'atelier.title': 'لحظةٌ من الصنع',
      'atelier.sub': 'كل ماكارون يولد بيدٍ تحبّ ما تفعل.',
      'atelier.c1': 'طحن اللوز',
      'atelier.c2': 'القشرة الذهبية',
      'atelier.c3': 'الحشوة الحريرية',
      'atelier.c4': 'الإطار الأخير',
      'atelier.c5': 'العلبة',
      'atelier.c6': 'لحظة التقديم',

      'quiz.eye': 'اختبار الذوق',
      'quiz.title': 'اعثر على نكهتك',
      'quiz.sub': 'ثلاثة أسئلة، وسنقترح لك علبتك المثالية.',
      'quiz.q1': 'في فنجان قهوتك المفضّل، تختار:',
      'quiz.q1.a': 'الشوكولاتة الداكنة', 'quiz.q1.b': 'الفانيليا والكراميل', 'quiz.q1.c': 'الفواكه الطازجة',
      'quiz.q2': 'النكهة التي تجذبك:',
      'quiz.q2.a': 'جريئة وعميقة', 'quiz.q2.b': 'متوازنة وحريرية', 'quiz.q2.c': 'منعشة ومضيئة',
      'quiz.q3': 'هذه العلبة لمن؟',
      'quiz.q3.a': 'هديةٌ لشخصٍ مميّز', 'quiz.q3.b': 'لذاتي', 'quiz.q3.c': 'مناسبةٌ خاصّة',
      'quiz.result.eye': 'اختيارك',
      'quiz.result.title': 'نقترح لك',
      'quiz.result.cta': 'أضفها للعلبة',
      'quiz.result.restart': 'أعد الاختبار',

      'build.eye': 'بنّي علبتك',
      'build.title': 'علبتك، بذوقك',
      'build.sub': 'اختر العلبة، اسحب نكهاتك إلى داخلها، وأرسل طلبك بنقرة.',
      'build.pal': 'اختر نكهتك',
      'build.pal.sub': 'انقر لإضافة قطعة إلى العلبة',
      'build.box': 'علبتك',
      'build.size.6': 'علبة 6', 'build.size.12': 'علبة 12', 'build.size.20': 'علبة 20', 'build.size.50': 'علبة 50',
      'build.count': 'مملوءة',
      'build.total': 'المجموع',
      'build.fill.random': 'املأ عشوائياً', 'build.fill.clear': 'أفرغ',
      'build.gift': 'بطاقة هدية',
      'build.gift.sub': 'أضف رسالة شخصية تُطبع على بطاقة أنيقة',
      'build.gift.to': 'إلى من؟ (الاسم)',
      'build.gift.from': 'من؟',
      'build.gift.msg': 'رسالتك… (اختياري)',
      'build.cta': 'أرسل الطلب على واتساب',
      'build.cta.empty': 'أضف على الأقل قطعة',

      'wed.eye': 'للمناسبات الكبرى',
      'wed.title': 'يومُك الكبير… بحلاوةٍ تليق',
      'wed.lede': 'لأعراسكم، خطوباتكم، ومناسباتكم العائلية: علب مخصّصة بألوانكم، نكهات مختارة بعناية، تغليف فاخر، وكميات تكفي ضيوفكم.',
      'wed.f1t': 'تغليفٌ مخصّص', 'wed.f1p': 'ألوانٌ تناسب ثيمتكم',
      'wed.f2t': 'نكهاتٌ منتقاة', 'wed.f2p': 'استشارة قبل الطلب',
      'wed.f3t': 'بطاقة شُكر', 'wed.f3p': 'مع اسمَي العروسين',
      'wed.f4t': 'توصيل في الموعد', 'wed.f4p': 'يوم الحفل، بدون قلق',
      'wed.t1q': '50 قطعة', 'wed.t1f': 'تبدأ من',
      'wed.t2q': '100 قطعة', 'wed.t2f': 'الأنسب',
      'wed.t3q': '+200 قطعة', 'wed.t3f': 'حسب الطلب',
      'wed.cta': 'استشارة مجانية على واتساب',

      'ptest.eye': 'تعليقات على Instagram',
      'ptest.title': 'لحظاتٌ مع Dori Yums',
      'ptest.q1': 'وصلت العلبة وكأنها لوحة. نكهة الورد فيها أُسطورة.',
      'ptest.q2': 'طلبت لأعرس أختي. الكلّ سأل: من أين هذه؟ سيظل سرّي.',
      'ptest.q3': 'كل صباح ماكارون مع قهوتي. صار طقساً.',
      'ptest.a1': 'أمينة • العاصمة', 'ptest.a2': 'لينا • وهران', 'ptest.a3': 'سامي • قسنطينة',
      'ptest.tag': 'Instagram',

      'rcp.title': 'مراجعة طلبك',
      'rcp.tag': 'Maison de Macarons — Est. 2026',
      'rcp.num': 'طلب رقم',
      'rcp.items': 'تفاصيل العلبة',
      'rcp.gift': 'بطاقة هدية',
      'rcp.gift.to': 'إلى', 'rcp.gift.from': 'من', 'rcp.gift.msg': 'الرسالة',
      'rcp.total': 'الإجمالي',
      'rcp.send': 'تأكيد عبر واتساب',
      'rcp.edit': 'تعديل',

      'nav.builder': 'بنّي علبتك',
      'nav.weddings': 'الزفاف',
    },
    fr: {
      'atelier.eye': 'Coulisses',
      'atelier.title': "L'instant créatif",
      'atelier.sub': "Chaque macaron naît d'une main qui aime ce qu'elle fait.",
      'atelier.c1': 'Amandes moulues',
      'atelier.c2': 'La coque dorée',
      'atelier.c3': 'La ganache soyeuse',
      'atelier.c4': 'Le cadre final',
      'atelier.c5': 'L\u2019\u00e9crin',
      'atelier.c6': 'L\u2019instant de service',

      'quiz.eye': 'Test des saveurs',
      'quiz.title': 'Trouvez votre saveur',
      'quiz.sub': 'Trois questions, et nous vous proposerons votre boîte idéale.',
      'quiz.q1': 'Dans votre café préféré, vous prenez :',
      'quiz.q1.a': 'Chocolat noir', 'quiz.q1.b': 'Vanille & caramel', 'quiz.q1.c': 'Fruits frais',
      'quiz.q2': 'La saveur qui vous attire :',
      'quiz.q2.a': 'Audacieuse, profonde', 'quiz.q2.b': 'Équilibrée, soyeuse', 'quiz.q2.c': 'Fraîche, lumineuse',
      'quiz.q3': 'Cette boîte, pour qui ?',
      'quiz.q3.a': "Un cadeau pour quelqu'un de spécial", 'quiz.q3.b': 'Pour moi', 'quiz.q3.c': 'Une occasion particulière',
      'quiz.result.eye': 'Votre profil',
      'quiz.result.title': 'Nous suggérons',
      'quiz.result.cta': 'Ajouter à la boîte',
      'quiz.result.restart': 'Recommencer',

      'build.eye': 'Composez votre boîte',
      'build.title': 'Votre boîte, à votre goût',
      'build.sub': 'Choisissez la taille, ajoutez vos saveurs, envoyez par WhatsApp.',
      'build.pal': 'Choisissez vos saveurs',
      'build.pal.sub': 'Cliquez pour ajouter à la boîte',
      'build.box': 'Votre boîte',
      'build.size.6': 'Boîte 6', 'build.size.12': 'Boîte 12', 'build.size.20': 'Boîte 20', 'build.size.50': 'Boîte 50',
      'build.count': 'Remplie',
      'build.total': 'Total',
      'build.fill.random': 'Remplir au hasard', 'build.fill.clear': 'Vider',
      'build.gift': 'Carte cadeau',
      'build.gift.sub': 'Ajoutez un message personnel sur une carte élégante',
      'build.gift.to': 'À qui ? (Nom)',
      'build.gift.from': 'De ?',
      'build.gift.msg': 'Votre message… (optionnel)',
      'build.cta': 'Envoyer la commande sur WhatsApp',
      'build.cta.empty': 'Ajoutez au moins une pièce',

      'wed.eye': 'Pour les grandes occasions',
      'wed.title': 'Votre grand jour… avec la douceur qu\u2019il mérite',
      'wed.lede': "Pour vos mariages, fiançailles et fêtes familiales : boîtes personnalisées à vos couleurs, saveurs choisies, présentation luxueuse, quantités pour tous vos invités.",
      'wed.f1t': 'Présentation sur mesure', 'wed.f1p': 'Aux couleurs de votre thème',
      'wed.f2t': 'Saveurs sélectionnées', 'wed.f2p': 'Conseil avant commande',
      'wed.f3t': 'Carte de remerciement', 'wed.f3p': 'Aux prénoms des mariés',
      'wed.f4t': 'Livraison à l\u2019heure', 'wed.f4p': 'Le jour J, sans souci',
      'wed.t1q': '50 pièces', 'wed.t1f': 'À partir de',
      'wed.t2q': '100 pièces', 'wed.t2f': 'Recommandé',
      'wed.t3q': '+200 pièces', 'wed.t3f': 'Sur demande',
      'wed.cta': 'Consultation gratuite sur WhatsApp',

      'ptest.eye': 'Commentaires Instagram',
      'ptest.title': 'Des instants Dori Yums',
      'ptest.q1': 'La boîte est arrivée comme un tableau. La saveur rose est légendaire.',
      'ptest.q2': "Commandé pour le mariage de ma sœur. Tout le monde a demandé d'où ça venait. Ce sera mon secret.",
      'ptest.q3': '« Chaque matin, un macaron avec mon café. C\u2019est devenu un rituel. »',
      'ptest.a1': 'Amina · Alger', 'ptest.a2': 'Lina · Oran', 'ptest.a3': 'Sami · Constantine',
      'ptest.tag': 'Instagram',

      'rcp.title': 'Récapitulatif',
      'rcp.tag': 'Maison de Macarons — Est. 2026',
      'rcp.num': 'Commande nº',
      'rcp.items': 'Contenu de la boîte',
      'rcp.gift': 'Carte cadeau',
      'rcp.gift.to': 'À', 'rcp.gift.from': 'De', 'rcp.gift.msg': 'Message',
      'rcp.total': 'Total',
      'rcp.send': 'Confirmer sur WhatsApp',
      'rcp.edit': 'Modifier',

      'nav.builder': 'Composer',
      'nav.weddings': 'Mariages',
    },
    en: {
      'atelier.eye': 'Behind the Scenes',
      'atelier.title': 'A Moment of Craft',
      'atelier.sub': 'Every macaron is born from a hand that loves what it does.',
      'atelier.c1': 'Ground Almonds',
      'atelier.c2': 'The Gilded Shell',
      'atelier.c3': 'Silky Ganache',
      'atelier.c4': 'The Final Frame',
      'atelier.c5': 'The Écrin',
      'atelier.c6': 'The Moment of Service',

      'quiz.eye': 'Flavor Quiz',
      'quiz.title': 'Find Your Flavor',
      'quiz.sub': 'Three questions, and we\u2019ll suggest your perfect box.',
      'quiz.q1': 'In your favorite coffee cup, you choose:',
      'quiz.q1.a': 'Dark Chocolate', 'quiz.q1.b': 'Vanilla & Caramel', 'quiz.q1.c': 'Fresh Fruit',
      'quiz.q2': 'The flavor that draws you:',
      'quiz.q2.a': 'Bold, deep', 'quiz.q2.b': 'Balanced, silky', 'quiz.q2.c': 'Bright, refreshing',
      'quiz.q3': 'This box is for:',
      'quiz.q3.a': 'A gift for someone special', 'quiz.q3.b': 'For myself', 'quiz.q3.c': 'A special occasion',
      'quiz.result.eye': 'Your Profile',
      'quiz.result.title': 'We suggest',
      'quiz.result.cta': 'Add to Box',
      'quiz.result.restart': 'Restart',

      'build.eye': 'Build Your Box',
      'build.title': 'Your Box, Your Way',
      'build.sub': 'Pick a size, add your flavors, send your order in one tap.',
      'build.pal': 'Choose your flavors',
      'build.pal.sub': 'Click to add a piece to the box',
      'build.box': 'Your Box',
      'build.size.6': 'Box of 6', 'build.size.12': 'Box of 12', 'build.size.20': 'Box of 20', 'build.size.50': 'Box of 50',
      'build.count': 'Filled',
      'build.total': 'Total',
      'build.fill.random': 'Fill randomly', 'build.fill.clear': 'Clear',
      'build.gift': 'Gift Card',
      'build.gift.sub': 'Add a personal message printed on an elegant card',
      'build.gift.to': 'To whom? (Name)',
      'build.gift.from': 'From?',
      'build.gift.msg': 'Your message… (optional)',
      'build.cta': 'Send Order on WhatsApp',
      'build.cta.empty': 'Add at least one piece',

      'wed.eye': 'For the Grand Occasions',
      'wed.title': 'Your Big Day… with the Sweetness it Deserves',
      'wed.lede': "For your weddings, engagements and family events: custom boxes in your colors, carefully chosen flavors, luxurious packaging, quantities for every guest.",
      'wed.f1t': 'Custom presentation', 'wed.f1p': 'In your theme colors',
      'wed.f2t': 'Selected flavors', 'wed.f2p': 'Consultation before ordering',
      'wed.f3t': 'Thank-you card', 'wed.f3p': 'With the couple\u2019s names',
      'wed.f4t': 'On-time delivery', 'wed.f4p': 'Day of the event, worry-free',
      'wed.t1q': '50 pieces', 'wed.t1f': 'Starting at',
      'wed.t2q': '100 pieces', 'wed.t2f': 'Recommended',
      'wed.t3q': '+200 pieces', 'wed.t3f': 'On request',
      'wed.cta': 'Free WhatsApp consultation',

      'ptest.eye': 'Instagram Comments',
      'ptest.title': 'Dori Yums Moments',
      'ptest.q1': 'The box arrived like a painting. The rose flavor is legendary.',
      'ptest.q2': '"I ordered for my sister\u2019s wedding. Everyone asked where they came from. It\u2019ll be my secret."',
      'ptest.q3': 'Every morning, a macaron with my coffee. It has become a ritual.',
      'ptest.a1': 'Amina · Algiers', 'ptest.a2': 'Lina · Oran', 'ptest.a3': 'Sami · Constantine',
      'ptest.tag': 'Instagram',

      'rcp.title': 'Order Summary',
      'rcp.tag': 'Maison de Macarons — Est. 2026',
      'rcp.num': 'Order Nº',
      'rcp.items': 'Box Contents',
      'rcp.gift': 'Gift Card',
      'rcp.gift.to': 'To', 'rcp.gift.from': 'From', 'rcp.gift.msg': 'Message',
      'rcp.total': 'Total',
      'rcp.send': 'Confirm on WhatsApp',
      'rcp.edit': 'Edit',

      'nav.builder': 'Compose',
      'nav.weddings': 'Weddings',
    }
  };

  function L() { return window.__LANG || document.documentElement.lang || 'ar'; }
  function t(key, fb) {
    var lang = L();
    return (I18N[lang] && I18N[lang][key]) || (I18N.ar && I18N.ar[key]) || fb || key;
  }
  window.__FEAT_T = t;

  /* ─── macaron color palette (matches existing MACARONS hues) ─── */
  /* keep in sync with app.js MACARONS index order */
  var MACS = [
    { id: 'rose',     ar: 'وردة دمشقية',      fr: 'Rose de Damas',          en: 'Damask Rose',          color: '#e8a5b8', accent: '#9b3a52' },
    { id: 'pistache', ar: 'فستق سيسيلي',       fr: 'Pistache de Sicile',     en: 'Sicilian Pistachio',   color: '#a8c47a', accent: '#4a6b1f' },
    { id: 'vanille',  ar: 'فانيليا بوربون',    fr: 'Vanille Bourbon',        en: 'Bourbon Vanilla',      color: '#f0e0a8', accent: '#8a6b1f' },
    { id: 'fraise',   ar: 'فراولة',           fr: 'Fraise des Bois',        en: 'Wild Strawberry',      color: '#e07590', accent: '#8a1f3a' },
    { id: 'choco',    ar: 'شوكولا 70%',       fr: 'Chocolat 70%',           en: 'Chocolate 70%',        color: '#7a4a2a', accent: '#3a1f10' },
    { id: 'caramel',  ar: 'كراميل بالملح',     fr: 'Caramel au sel',         en: 'Salted Caramel',       color: '#cc8c4a', accent: '#6b3a10' },
    { id: 'cafe',     ar: 'قهوة عربية',        fr: 'Café Arabica',           en: 'Arabica Coffee',       color: '#8a5a3a', accent: '#3a1f10' },
    { id: 'orange',   ar: 'برتقال الزهر',      fr: 'Fleur d\u2019Oranger',    en: 'Orange Blossom',       color: '#f0b070', accent: '#8a4a1f' },
    { id: 'mangue',   ar: 'مانغو ألفونسو',     fr: 'Mangue Alphonso',        en: 'Alphonso Mango',       color: '#f0a050', accent: '#8a4a1f' },
    { id: 'noix',     ar: 'بندق نوتيلا',       fr: 'Noisette Praliné',       en: 'Hazelnut Praliné',     color: '#a06030', accent: '#4a2010' },
    { id: 'lavende',  ar: 'لافندر بروفنس',     fr: 'Lavande de Provence',    en: 'Provence Lavender',    color: '#b8a0d0', accent: '#4a3a6b' },
    { id: 'menthe',   ar: 'نعناع شوكو',        fr: 'Menthe Chocolat',        en: 'Mint Chocolate',       color: '#90c8a0', accent: '#1f4a3a' },
    { id: 'citron',   ar: 'ليمون اسكتلندي',    fr: 'Citron de Menton',       en: 'Menton Lemon',         color: '#f0e070', accent: '#8a6b10' },
    { id: 'framb',    ar: 'توت العليق',        fr: 'Framboise',              en: 'Raspberry',            color: '#d04060', accent: '#6b1f3a' },
    { id: 'cassis',   ar: 'كاسيس',            fr: 'Cassis',                 en: 'Blackcurrant',         color: '#6a3a6a', accent: '#2a103a' },
    { id: 'tiramisu', ar: 'تيراميسو',          fr: 'Tiramisu',               en: 'Tiramisu',             color: '#c8a878', accent: '#6b3a1f' }
  ];

  /* ─── price ladder per box size (in DZD) ─── */
  var BOX_PRICE = { 6: 1500, 12: 2800, 20: 4400, 50: 10000 };
  var GIFT_CARD_PRICE = 300;
  var WED_BASE = { 50: 12000, 100: 22000 };

  /* ─── HTML BUILDERS ─── */

  function buildAtelier() {
    var host = $('#atelier-section'); if (!host) return;
    var captions = ['atelier.c1','atelier.c2','atelier.c3','atelier.c4'];
    var srcs = [
      'atelier-0.webp',
      'macarons_hero.webp',
      'atelier-2.webp',
      'atelier-3.webp'
    ];
    /* uniform 2×2 grid */
    var cells = ['','','',''];
    var html = '' +
      '<div class="wrap">' +
        '<div class="section-head center reveal">' +
          '<span class="eyebrow" data-feat-i18n="atelier.eye"></span>' +
          '<h2 class="section-title" data-feat-i18n="atelier.title"></h2>' +
          '<div class="gold-rule"></div>' +
          '<p class="section-sub" style="margin-inline:auto" data-feat-i18n="atelier.sub"></p>' +
        '</div>' +
        '<div class="atelier-grid reveal">';
    captions.forEach(function (k, i) {
      html += '<div class="atelier-cell ' + cells[i] + '">' +
        '<image-slot id="atelier-' + i + '" fit="cover" src="' + srcs[i] + '" placeholder="' + t(k) + '"></image-slot>' +
      '</div>';
    });
    html += '</div></div>';
    host.innerHTML = html;
  }

  /* ─── FLAVOR QUIZ ─── */

  /* answer code → picked macaron IDs */
  var QUIZ_PROFILES = {
    'aaa': { eye: 'L\u2019Audacieux', picks: ['choco','cafe','noix'] },
    'aab': { eye: 'L\u2019Audacieux', picks: ['choco','tiramisu','noix'] },
    'aac': { eye: 'L\u2019Audacieux', picks: ['choco','caramel','noix'] },
    'aba': { eye: 'Le Soyeux', picks: ['choco','tiramisu','vanille'] },
    'abb': { eye: 'Le Soyeux', picks: ['caramel','vanille','tiramisu'] },
    'abc': { eye: 'Le Soyeux', picks: ['caramel','vanille','noix'] },
    'aca': { eye: 'Le Bouquet', picks: ['choco','framb','rose'] },
    'acb': { eye: 'Le Bouquet', picks: ['framb','citron','rose'] },
    'acc': { eye: 'Le Bouquet', picks: ['fraise','framb','orange'] },
    'baa': { eye: 'Le Classique', picks: ['vanille','caramel','choco'] },
    'bab': { eye: 'Le Classique', picks: ['vanille','caramel','noix'] },
    'bac': { eye: 'Le Classique', picks: ['vanille','caramel','rose'] },
    'bba': { eye: 'Le Délicat', picks: ['vanille','pistache','caramel'] },
    'bbb': { eye: 'Le Délicat', picks: ['vanille','pistache','rose'] },
    'bbc': { eye: 'Le Délicat', picks: ['vanille','pistache','orange'] },
    'bca': { eye: 'Le Fleuri', picks: ['vanille','rose','orange'] },
    'bcb': { eye: 'Le Fleuri', picks: ['vanille','lavende','rose'] },
    'bcc': { eye: 'Le Fleuri', picks: ['orange','rose','framb'] },
    'caa': { eye: 'Le Solaire', picks: ['mangue','orange','choco'] },
    'cab': { eye: 'Le Solaire', picks: ['mangue','orange','noix'] },
    'cac': { eye: 'Le Solaire', picks: ['mangue','orange','fraise'] },
    'cba': { eye: 'Le Frais', picks: ['fraise','citron','vanille'] },
    'cbb': { eye: 'Le Frais', picks: ['fraise','citron','menthe'] },
    'cbc': { eye: 'Le Frais', picks: ['citron','framb','orange'] },
    'cca': { eye: 'Le Jardin', picks: ['rose','framb','cassis'] },
    'ccb': { eye: 'Le Jardin', picks: ['lavende','rose','citron'] },
    'ccc': { eye: 'Le Jardin', picks: ['framb','fraise','orange'] }
  };

  var quizState = { step: 0, ans: ['','',''] };

  function buildQuiz() {
    var host = $('#quiz-section'); if (!host) return;
    var opts = function (qkey, letters) {
      var icons = {
        a: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V5a3 3 0 0 1 6 0v3"/></svg>',
        b: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.5 7.1 18.2 8 12.7 4 8.8 9.5 8z"/></svg>',
        c: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>'
      };
      return letters.map(function (lt) {
        var k = qkey + '.' + lt;
        return '<button type="button" class="quiz-opt" data-ans="' + lt + '">' +
          '<span class="icon">' + icons[lt] + '</span>' +
          '<span data-feat-i18n="' + k + '"></span>' +
        '</button>';
      }).join('');
    };

    var html = '' +
      '<div class="wrap">' +
        '<div class="section-head center reveal">' +
          '<span class="eyebrow" data-feat-i18n="quiz.eye"></span>' +
          '<h2 class="section-title" data-feat-i18n="quiz.title"></h2>' +
          '<div class="gold-rule"></div>' +
          '<p class="section-sub" style="margin-inline:auto" data-feat-i18n="quiz.sub"></p>' +
        '</div>' +
        '<div class="quiz reveal">' +
          '<div class="quiz-stage" id="quizStage">' +
            '<div class="quiz-step is-active" data-q="0">' +
              '<div class="quiz-q" data-feat-i18n="quiz.q1"></div>' +
              '<div class="quiz-options">' + opts('quiz.q1', ['a','b','c']) + '</div>' +
            '</div>' +
            '<div class="quiz-step" data-q="1">' +
              '<div class="quiz-q" data-feat-i18n="quiz.q2"></div>' +
              '<div class="quiz-options">' + opts('quiz.q2', ['a','b','c']) + '</div>' +
            '</div>' +
            '<div class="quiz-step" data-q="2">' +
              '<div class="quiz-q" data-feat-i18n="quiz.q3"></div>' +
              '<div class="quiz-options">' + opts('quiz.q3', ['a','b','c']) + '</div>' +
            '</div>' +
            '<div class="quiz-step quiz-result-step" data-q="3">' +
              '<div class="quiz-result">' +
                '<span class="eyebrow" data-feat-i18n="quiz.result.eye"></span>' +
                '<h3 id="quizProfileName"></h3>' +
                '<div class="picks" id="quizPicks"></div>' +
                '<div class="quiz-actions">' +
                  '<button class="quiz-restart" type="button" data-feat-i18n="quiz.result.restart"></button>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="quiz-progress" id="quizProgress">' +
            '<span class="pip is-done"></span><span class="pip"></span><span class="pip"></span>' +
          '</div>' +
        '</div>' +
      '</div>';
    host.innerHTML = html;

    $$('.quiz-opt', host).forEach(function (b) {
      b.addEventListener('click', function () {
        var step = parseInt(b.closest('.quiz-step').dataset.q, 10);
        quizState.ans[step] = b.dataset.ans;
        if (step < 2) goQuizStep(step + 1);
        else showQuizResult();
      });
    });
    $('.quiz-restart', host).addEventListener('click', function () {
      quizState = { step: 0, ans: ['','',''] };
      goQuizStep(0);
    });
  }

  function goQuizStep(n) {
    quizState.step = n;
    $$('.quiz-step').forEach(function (s) { s.classList.toggle('is-active', parseInt(s.dataset.q,10) === n); });
    $$('#quizProgress .pip').forEach(function (p, i) { p.classList.toggle('is-done', i <= n); });
  }

  function showQuizResult() {
    var code = quizState.ans.join('');
    var profile = QUIZ_PROFILES[code] || QUIZ_PROFILES['bbb'];
    $('#quizProfileName').textContent = profile.eye;
    var picks = $('#quizPicks'); picks.innerHTML = '';
    profile.picks.forEach(function (id) {
      var m = MACS.find(function (x) { return x.id === id; });
      if (!m) return;
      var lang = L();
      var name = m[lang] || m.ar;
      var div = el('div', 'pick');
      div.innerHTML = '<span class="puck" style="background:radial-gradient(circle at 35% 30%,' + lighten(m.color, .25) + ',' + m.color + ' 60%,' + m.accent + ');"></span>' +
        '<span>' + name + '</span>';
      div.addEventListener('click', function () {
        addToBoxFromQuiz(profile.picks);
        document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth' });
      });
      picks.appendChild(div);
    });
    goQuizStep(3);
  }

  function addToBoxFromQuiz(ids) {
    var size = builderState.size || 6;
    builderState.box = new Array(size).fill(null);
    var i = 0;
    while (i < size) {
      ids.forEach(function (id) { if (i < size) { builderState.box[i++] = id; } });
    }
    renderBox();
  }

  function lighten(hex, amt) {
    var c = hex.replace('#','');
    if (c.length === 3) c = c.split('').map(function (x) { return x + x; }).join('');
    var n = parseInt(c, 16);
    var r = Math.min(255, ((n >> 16) & 255) + Math.round(amt * 255));
    var g = Math.min(255, ((n >> 8) & 255) + Math.round(amt * 255));
    var b = Math.min(255, (n & 255) + Math.round(amt * 255));
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  /* ════════════════════════════════════════════════════════════
     BOX BUILDER
     ════════════════════════════════════════════════════════════ */
  var builderState = {
    size: 6,
    box: new Array(6).fill(null),
    selectedMac: null,
    gift: false,
    giftTo: '',
    giftFrom: '',
    giftMsg: ''
  };
  /* persist between sessions */
  try {
    var saved = JSON.parse(localStorage.getItem('dy-box') || 'null');
    if (saved && saved.size) Object.assign(builderState, saved);
  } catch (e) {}

  function saveBoxState() {
    try { localStorage.setItem('dy-box', JSON.stringify(builderState)); } catch (e) {}
  }

  function buildBuilder() {
    var host = $('#builder-section'); if (!host) return;
    var palette = MACS.map(function (m, i) {
      var lang = L();
      var name = m[lang] || m.ar;
      return '<div class="pal-mac" data-mac="' + m.id + '" data-i="' + i + '">' +
        '<span class="puck" style="background:radial-gradient(circle at 35% 30%,' + lighten(m.color, .3) + ',' + m.color + ' 55%,' + m.accent + ');"></span>' +
        '<span class="lbl">' + name + '</span>' +
      '</div>';
    }).join('');

    var html = '' +
      '<div class="wrap">' +
        '<div class="section-head center reveal">' +
          '<span class="eyebrow" data-feat-i18n="build.eye"></span>' +
          '<div class="gold-rule"></div>' +
          '<p class="section-sub" style="margin-inline:auto" data-feat-i18n="build.sub"></p>' +
        '</div>' +
        '<div class="builder-wrap reveal">' +
          '<div class="builder-palette">' +
            '<h3 data-feat-i18n="build.pal"></h3>' +
            '<p class="pal-sub" data-feat-i18n="build.pal.sub"></p>' +
            '<div class="pal-grid">' + palette + '</div>' +
          '</div>' +
          '<div class="builder-stage">' +
            '<h3 data-feat-i18n="build.box"></h3>' +
            '<div class="box-sizes" id="boxSizes">' +
              '<button class="box-size-btn" data-size="6" data-feat-i18n="build.size.6"></button>' +
              '<button class="box-size-btn" data-size="12" data-feat-i18n="build.size.12"></button>' +
              '<button class="box-size-btn" data-size="20" data-feat-i18n="build.size.20"></button>' +
              '<button class="box-size-btn" data-size="50" data-feat-i18n="build.size.50"></button>' +
            '</div>' +
            '<div class="box-cradle">' +
              '<div class="box-slots s-6" id="boxSlots"></div>' +
            '</div>' +
            '<div class="box-fill-actions">' +
              '<button id="boxRandom" data-feat-i18n="build.fill.random"></button>' +
              '<button id="boxClear" data-feat-i18n="build.fill.clear"></button>' +
            '</div>' +
            '<div class="box-counter">' +
              '<span class="lbl" data-feat-i18n="build.count"></span>' +
              '<span class="val"><span id="boxFilled" class="lat">0</span><span class="lat">/</span><span id="boxCap" class="lat">6</span></span>' +
            '</div>' +
            '<div class="gift-toggle" id="giftToggle">' +
              '<button class="gift-check" id="giftCheck" type="button" aria-checked="false" aria-label="gift card">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="5 12 10 17 19 8"/></svg>' +
              '</button>' +
              '<div class="gift-info">' +
                '<span class="lbl" data-feat-i18n="build.gift"></span>' +
                '<span class="sub" data-feat-i18n="build.gift.sub"></span>' +
                '<div class="gift-fields" id="giftFields">' +
                  '<input type="text" id="giftTo" placeholder="">' +
                  '<input type="text" id="giftFrom" placeholder="">' +
                  '<textarea id="giftMsg" rows="2" placeholder=""></textarea>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="box-counter" style="margin-top:10px">' +
              '<span class="lbl" data-feat-i18n="build.total"></span>' +
              '<span class="val"><span id="boxTotal" class="lat">1 500</span> <span data-feat-i18n="cat.dz" class="lat" style="font-size:14px">دج</span></span>' +
            '</div>' +
            '<button class="box-checkout" id="boxCheckout" type="button" data-feat-i18n="build.cta"></button>' +
          '</div>' +
        '</div>' +
      '</div>';
    host.innerHTML = html;

    wireBuilder();
    renderBox();
  }

  function wireBuilder() {
    /* size selection */
    $$('#boxSizes .box-size-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        setBoxSize(parseInt(b.dataset.size, 10));
      });
    });
    /* palette click → add to first empty slot */
    $$('#builder-section .pal-mac').forEach(function (p) {
      p.addEventListener('click', function () {
        addToBox(p.dataset.mac);
        flashPalette(p);
      });
    });
    $('#boxRandom').addEventListener('click', fillRandom);
    $('#boxClear').addEventListener('click', clearBox);
    $('#boxCheckout').addEventListener('click', openReceipt);

    /* gift card */
    $('#giftCheck').addEventListener('click', function () {
      builderState.gift = !builderState.gift;
      this.setAttribute('aria-checked', builderState.gift ? 'true' : 'false');
      $('#giftFields').classList.toggle('is-open', builderState.gift);
      renderTotal();
      saveBoxState();
    });
    ['giftTo','giftFrom','giftMsg'].forEach(function (id) {
      var k = id.replace('gift','').toLowerCase();
      var key = 'gift' + id.replace('gift','');
      $('#' + id).addEventListener('input', function () {
        builderState[id === 'giftTo' ? 'giftTo' : id === 'giftFrom' ? 'giftFrom' : 'giftMsg'] = this.value;
        saveBoxState();
      });
    });

    setBoxSize(builderState.size || 6, true);
  }

  function setBoxSize(size, fromInit) {
    builderState.size = size;
    /* preserve existing filled items, truncate or extend */
    var oldBox = builderState.box || [];
    builderState.box = new Array(size).fill(null);
    for (var i = 0; i < Math.min(oldBox.length, size); i++) builderState.box[i] = oldBox[i];

    $$('#boxSizes .box-size-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', parseInt(b.dataset.size, 10) === size ? 'true' : 'false');
    });
    renderBox();
  }

  function addToBox(macId) {
    var idx = builderState.box.findIndex(function (x) { return x === null; });
    if (idx === -1) return; /* full */
    builderState.box[idx] = macId;
    renderBox();
  }
  function removeFromBox(idx) {
    builderState.box[idx] = null;
    /* shift later items left so empty slots stay at end */
    builderState.box = builderState.box.filter(function (x) { return x !== null; });
    while (builderState.box.length < builderState.size) builderState.box.push(null);
    renderBox();
  }
  function clearBox() {
    builderState.box = new Array(builderState.size).fill(null);
    renderBox();
  }
  function fillRandom() {
    var ids = MACS.map(function (m) { return m.id; });
    builderState.box = builderState.box.map(function () {
      return ids[Math.floor(Math.random() * ids.length)];
    });
    renderBox();
  }

  function renderBox() {
    var slots = $('#boxSlots'); if (!slots) return;
    slots.className = 'box-slots s-' + builderState.size + (builderState.size === 50 ? ' s-50' : '');
    slots.innerHTML = '';
    builderState.box.forEach(function (id, i) {
      var slot = el('div', 'box-slot' + (id ? ' has-mac' : ''));
      if (builderState.size === 50) slot.classList.add('s-50');
      if (id) {
        var m = MACS.find(function (x) { return x.id === id; });
        if (m) {
          slot.innerHTML = '<span class="puck" style="background:radial-gradient(circle at 35% 30%,' + lighten(m.color, .3) + ',' + m.color + ' 55%,' + m.accent + ');"></span>' +
            '<button class="remove-mac" type="button" aria-label="remove">×</button>';
          slot.querySelector('.remove-mac').addEventListener('click', function (e) {
            e.stopPropagation();
            removeFromBox(i);
          });
        }
      }
      slots.appendChild(slot);
    });

    var filled = builderState.box.filter(function (x) { return x; }).length;
    $('#boxFilled').textContent = filled;
    $('#boxCap').textContent = builderState.size;
    renderTotal();

    var btn = $('#boxCheckout');
    if (btn) {
      if (filled === 0) {
        btn.textContent = t('build.cta.empty');
        btn.disabled = true;
      } else {
        btn.textContent = t('build.cta');
        btn.disabled = false;
      }
    }
    saveBoxState();
  }

  function renderTotal() {
    var price = BOX_PRICE[builderState.size] || 0;
    if (builderState.gift) price += GIFT_CARD_PRICE;
    var lang = L();
    var formatted = price.toLocaleString(lang === 'ar' ? 'ar-DZ' : 'fr-FR');
    var elT = $('#boxTotal'); if (elT) elT.textContent = formatted;
  }

  function flashPalette(p) {
    p.style.transform = 'scale(1.18)';
    setTimeout(function () { p.style.transform = ''; }, 220);
  }

  /* ════════════════════════════════════════════════════════════
     SMART RECEIPT + WA
     ════════════════════════════════════════════════════════════ */
  var WA_DEFAULT = '213551401704';
  function waNum() { return (window.__WA_NUMBER) || WA_DEFAULT; }

  function openReceipt() {
    var veil = $('#confirmVeil');
    if (!veil) buildReceiptShell();
    veil = $('#confirmVeil');
    populateReceipt();
    veil.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeReceipt() {
    var veil = $('#confirmVeil');
    if (!veil) return;
    veil.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function buildReceiptShell() {
    var v = el('div', 'confirm-veil'); v.id = 'confirmVeil';
    v.innerHTML = '' +
      '<div class="receipt">' +
        '<button class="receipt-close" id="rcpClose" type="button" aria-label="close">×</button>' +
        '<div class="receipt-inner">' +
          '<div class="receipt-head">' +
            '<div class="brand">Dori Yums</div>' +
            '<div class="tag" data-feat-i18n="rcp.tag"></div>' +
            '<div class="num"><span data-feat-i18n="rcp.num"></span> <span id="rcpNum" class="lat"></span></div>' +
          '</div>' +
          '<div class="receipt-section">' +
            '<div class="label" data-feat-i18n="rcp.items"></div>' +
            '<div id="rcpItems"></div>' +
          '</div>' +
          '<div class="receipt-gift" id="rcpGift" style="display:none">' +
            '<div class="label" data-feat-i18n="rcp.gift"></div>' +
            '<div class="to"><span data-feat-i18n="rcp.gift.to"></span>: <span id="rcpGiftTo"></span> <span style="opacity:.5">·</span> <span data-feat-i18n="rcp.gift.from"></span>: <span id="rcpGiftFrom"></span></div>' +
            '<div class="msg" id="rcpGiftMsg"></div>' +
          '</div>' +
          '<div class="receipt-total">' +
            '<span class="t-lbl" data-feat-i18n="rcp.total"></span>' +
            '<span class="t-val"><span id="rcpTotal"></span> دج</span>' +
          '</div>' +
          '<div class="receipt-actions">' +
            '<button class="receipt-btn secondary" id="rcpEdit" data-feat-i18n="rcp.edit"></button>' +
            '<a class="receipt-btn primary" id="rcpSend" target="_blank" rel="noopener">' +
              '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.92-9.91z"/></svg>' +
              '<span data-feat-i18n="rcp.send"></span>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(v);
    $('#rcpClose').addEventListener('click', closeReceipt);
    $('#rcpEdit').addEventListener('click', closeReceipt);
    v.addEventListener('click', function (e) { if (e.target === v) closeReceipt(); });
    applyFeatI18n();
  }

  function populateReceipt() {
    /* group identical pieces */
    var counts = {};
    builderState.box.forEach(function (id) { if (id) counts[id] = (counts[id] || 0) + 1; });
    var lang = L();
    var items = $('#rcpItems'); items.innerHTML = '';
    Object.keys(counts).forEach(function (id) {
      var m = MACS.find(function (x) { return x.id === id; });
      if (!m) return;
      var name = m[lang] || m.ar;
      var line = el('div', 'receipt-line');
      line.innerHTML = '<span>' + name + '</span><span class="qty">×' + counts[id] + '</span>';
      items.appendChild(line);
    });
    /* box-size line */
    var head = el('div', 'receipt-line');
    head.style.fontWeight = '700';
    head.style.borderBottom = '1px solid rgba(60,40,20,.3)';
    head.style.marginBottom = '6px';
    head.innerHTML = '<span>' + t('build.size.' + builderState.size) + '</span><span class="qty lat">' + BOX_PRICE[builderState.size].toLocaleString('fr-FR') + ' دج</span>';
    items.insertBefore(head, items.firstChild);

    /* gift card */
    var giftBlock = $('#rcpGift');
    if (builderState.gift && (builderState.giftTo || builderState.giftFrom || builderState.giftMsg)) {
      giftBlock.style.display = 'block';
      $('#rcpGiftTo').textContent = builderState.giftTo || '—';
      $('#rcpGiftFrom').textContent = builderState.giftFrom || '—';
      $('#rcpGiftMsg').textContent = builderState.giftMsg ? '« ' + builderState.giftMsg + ' »' : '';
    } else {
      giftBlock.style.display = 'none';
    }

    /* total */
    var price = BOX_PRICE[builderState.size] || 0;
    if (builderState.gift) price += GIFT_CARD_PRICE;
    $('#rcpTotal').textContent = price.toLocaleString('fr-FR');

    /* order number */
    var num = 'DY-' + (Date.now() % 100000).toString().padStart(5, '0');
    $('#rcpNum').textContent = num;

    /* WA link */
    var msg = buildWaMessage(num, counts, price);
    $('#rcpSend').href = 'https://wa.me/' + waNum() + '?text=' + encodeURIComponent(msg);
  }

  function buildWaMessage(num, counts, price) {
    var lang = L();
    var lines = [];
    var sep = '━━━━━━━━━━━━━━━━━━━';

    if (lang === 'ar') {
      lines.push('🌟 *Dori Yums — طلب جديد*');
      lines.push(sep);
      lines.push('*رقم الطلب:* `' + num + '`');
      lines.push('*' + t('build.size.' + builderState.size) + '*');
      lines.push('');
      lines.push('*🎨 المحتوى:*');
      Object.keys(counts).forEach(function (id) {
        var m = MACS.find(function (x) { return x.id === id; });
        if (m) lines.push('  • ' + (m.ar || m.id) + ' × ' + counts[id]);
      });
      if (builderState.gift) {
        lines.push('');
        lines.push('*🎁 بطاقة هدية:*');
        if (builderState.giftTo) lines.push('  إلى: ' + builderState.giftTo);
        if (builderState.giftFrom) lines.push('  من: ' + builderState.giftFrom);
        if (builderState.giftMsg) lines.push('  «' + builderState.giftMsg + '»');
      }
      lines.push('');
      lines.push(sep);
      lines.push('*الإجمالي: ' + price.toLocaleString('fr-FR') + ' دج*');
      lines.push('');
      lines.push('شكراً لاختياركم Dori Yums 🤎');
    } else if (lang === 'fr') {
      lines.push('🌟 *Dori Yums — Nouvelle commande*');
      lines.push(sep);
      lines.push('*Nº de commande :* `' + num + '`');
      lines.push('*' + t('build.size.' + builderState.size) + '*');
      lines.push('');
      lines.push('*🎨 Contenu :*');
      Object.keys(counts).forEach(function (id) {
        var m = MACS.find(function (x) { return x.id === id; });
        if (m) lines.push('  • ' + (m.fr || m.id) + ' × ' + counts[id]);
      });
      if (builderState.gift) {
        lines.push('');
        lines.push('*🎁 Carte cadeau :*');
        if (builderState.giftTo) lines.push('  Pour : ' + builderState.giftTo);
        if (builderState.giftFrom) lines.push('  De : ' + builderState.giftFrom);
        if (builderState.giftMsg) lines.push('  «' + builderState.giftMsg + '»');
      }
      lines.push('');
      lines.push(sep);
      lines.push('*Total : ' + price.toLocaleString('fr-FR') + ' DZD*');
      lines.push('');
      lines.push('Merci d\u2019avoir choisi Dori Yums 🤎');
    } else {
      lines.push('🌟 *Dori Yums — New Order*');
      lines.push(sep);
      lines.push('*Order Nº:* `' + num + '`');
      lines.push('*' + t('build.size.' + builderState.size) + '*');
      lines.push('');
      lines.push('*🎨 Contents:*');
      Object.keys(counts).forEach(function (id) {
        var m = MACS.find(function (x) { return x.id === id; });
        if (m) lines.push('  • ' + (m.en || m.id) + ' × ' + counts[id]);
      });
      if (builderState.gift) {
        lines.push('');
        lines.push('*🎁 Gift Card:*');
        if (builderState.giftTo) lines.push('  To: ' + builderState.giftTo);
        if (builderState.giftFrom) lines.push('  From: ' + builderState.giftFrom);
        if (builderState.giftMsg) lines.push('  "' + builderState.giftMsg + '"');
      }
      lines.push('');
      lines.push(sep);
      lines.push('*Total: ' + price.toLocaleString('en-US') + ' DZD*');
      lines.push('');
      lines.push('Thank you for choosing Dori Yums 🤎');
    }
    return lines.join('\n');
  }

  /* ════════════════════════════════════════════════════════════
     WEDDINGS & EVENTS
     ════════════════════════════════════════════════════════════ */
  function buildWeddings() {
    var host = $('#weddings-section'); if (!host) return;
    var icons = {
      f1: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h18l-2 14H5L3 7z"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/></svg>',
      f2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>',
      f3: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="7" width="16" height="13" rx="1"/><path d="M4 11h16"/><path d="M12 3v4M8 3v4M16 3v4"/></svg>',
      f4: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h13v10H3z"/><path d="M16 10h4l1 3v4h-5z"/><circle cx="7" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></svg>'
    };
    var html = '' +
      '<div class="wrap wed-wrap reveal">' +
        '<div class="wed-feature-frame gframe">' +
          '<div class="mat"><div class="art">' +
            '<image-slot id="wed-hero" fit="cover" placeholder="Wedding box"></image-slot>' +
            '<span class="glass"></span>' +
          '</div></div>' +
        '</div>' +
        '<div class="wed-text">' +
          '<h2 data-feat-i18n="wed.title"></h2>' +
          '<p class="wed-lede" data-feat-i18n="wed.lede"></p>' +
          '<div class="wed-features">' +
            ['f1','f2','f3','f4'].map(function (k) {
              return '<div class="wed-feat">' +
                '<span class="ic">' + icons[k] + '</span>' +
                '<div><h4 data-feat-i18n="wed.' + k + 't"></h4><p data-feat-i18n="wed.' + k + 'p"></p></div>' +
              '</div>';
            }).join('') +
          '</div>' +
          '<div class="wed-tiers">' +
            '<div class="wed-tier"><span class="lat" data-feat-i18n="wed.t1f"></span><span class="qty" data-feat-i18n="wed.t1q"></span><span class="from"><b class="lat">' + WED_BASE[50].toLocaleString('fr-FR') + ' دج</b></span></div>' +
            '<div class="wed-tier"><span class="lat" data-feat-i18n="wed.t2f"></span><span class="qty" data-feat-i18n="wed.t2q"></span><span class="from"><b class="lat">' + WED_BASE[100].toLocaleString('fr-FR') + ' دج</b></span></div>' +
            '<div class="wed-tier"><span class="lat" data-feat-i18n="wed.t3f"></span><span class="qty" data-feat-i18n="wed.t3q"></span><span class="from">—</span></div>' +
          '</div>' +
          '<a class="wed-cta" id="wedCta" target="_blank" rel="noopener">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.92-9.91z"/></svg>' +
            '<span data-feat-i18n="wed.cta"></span>' +
          '</a>' +
        '</div>' +
      '</div>';
    host.innerHTML = html;

    /* wire wedding CTA */
    var cta = $('#wedCta');
    if (cta) {
      cta.addEventListener('click', function (e) {
        var lang = L();
        var msg = lang === 'ar'
          ? '✨ *استشارة زفاف — Dori Yums*\n\nمرحباً، أرغب بطلب ماكارون لمناسبة. أرجو إفادتي بالتفاصيل والخيارات. شكراً.'
          : lang === 'fr'
          ? '✨ *Consultation Mariage — Dori Yums*\n\nBonjour, je souhaite commander des macarons pour un événement. Pourriez-vous me donner les détails et options ? Merci.'
          : '✨ *Wedding Consultation — Dori Yums*\n\nHello, I would like to order macarons for an event. Could you share the details and options? Thank you.';
        cta.href = 'https://wa.me/' + waNum() + '?text=' + encodeURIComponent(msg);
      });
      cta.dispatchEvent(new Event('click'));
    }
  }

  /* ════════════════════════════════════════════════════════════
     PHOTO TESTIMONIALS (replace the existing text-only)
     ════════════════════════════════════════════════════════════ */
  /* ════════════════════════════════════════════
     IG-style comment testimonials (real comments from @dori_yums)
     ════════════════════════════════════════════ */

  /* preset avatar palette: gradient initials when no img */
  function initialAv(name, hue) {
    var letter = (name || '?').replace('_','').replace('.','').charAt(0).toUpperCase();
    return '<div class="cmt-av" style="background:linear-gradient(135deg,hsl(' + hue + ' 65% 65%),hsl(' + ((hue + 40) % 360) + ' 60% 45%));">' + letter + '</div>';
  }
  function imgAv(src) {
    return '<div class="cmt-av" style="background-image:url(' + src + ');"></div>';
  }
  function svgHeart(filled) {
    if (filled) {
      return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.35-9.5-9C.5 8.5 3 4 7 4c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 4 0 6.5 4.5 4.5 8-2.5 4.65-9.5 9-9.5 9z"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.35-9.5-9C.5 8.5 3 4 7 4c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 4 0 6.5 4.5 4.5 8-2.5 4.65-9.5 9-9.5 9z"/></svg>';
  }

  function buildPhotoTestimonials() {
    var section = $('#reviews'); if (!section) return;
    var inner = $('.wrap', section); if (!inner) return;
    var tcards = $('#tcards', inner); if (!tcards) return;

    var eye = $('.eyebrow', inner); if (eye) eye.setAttribute('data-feat-i18n', 'ptest.eye');
    var ttl = $('.section-title', inner); if (ttl) ttl.setAttribute('data-feat-i18n', 'ptest.title');

    /* sanitize past .ptest-grid class */
    tcards.className = '';
    tcards.style.display = 'block';

    var heartFilled = svgHeart(true);
    var heartEmpty = svgHeart(false);

    var comments = [
      {
        user: 'perrie_chapier', ts: '6w', byAuthor: true, hue: 280,
        text: '\uD83D\uDE0D\uD83D\uDE0D\uD83D\uDE0D\uD83D\uDE0D masterpiece',
        likes: 1, actions: ['Reply','Reply with a reel','Hide']
      },
      {
        user: 'doria.park', ts: '6w', byAuthor: true, hue: 200,
        text: '', hasImg: true, likes: 1, actions: ['Reply','Hide'],
        reply: { user: 'dori_yums', ts: '6w', author: true, hue: 35, text: '<span class="at">@doria.park</span> \u263A\uFE0F \u2764\uFE0F', actions: ['Reply'], likes: 0 }
      },
      {
        user: 'sabrinahalouane', ts: '4w', byAuthor: true, hue: 330,
        text: 'Je confirme c\u2019est un d\u00e9lice au palais et un plaisir \u00e0 d\u00e9guster \uD83E\uDD70',
        likes: 1, actions: ['Reply','Reply with a reel','Hide'],
        moreReplies: '1 more reply'
      },
      {
        user: 'efyoos_', ts: '1w', hue: 20,
        text: '<span class="at">@dori_yums</span> the best in the market \uD83D\uDDA4 \uD83D\uDE0D',
        likes: 5, actions: ['Reply'],
        moreReplies: '2 more replies'
      },
      {
        user: 'bnalydia', ts: '1w', hue: 160,
        text: 'Bravoo\uD83D\uDE4C \u2764\uFE0F  <span class="at">@doria.park</span>',
        likes: 2, actions: ['Reply'],
        moreReplies: '1 more reply'
      },
      {
        user: '_meriem_mer._', ts: '1w', hue: 90,
        text: 'Je valide a 100% les meilleurs \u2764\uFE0F mais vraiment la vari\u00e9t\u00e9 des go\u00fbts parfait \uD83D\uDC4D',
        likes: 2, actions: ['Reply'],
        moreReplies: '1 more reply'
      },
      {
        user: 'myriamben._', ts: '1w', hue: 240,
        text: '<span class="at">@dori_yums</span> vraiment meilleures macarons 3end la meilleure do\u2764\uFE0F',
        likes: 5, actions: ['Reply']
      }
    ];

    var threadHtml = comments.map(function (c) {
      var av = initialAv(c.user, c.hue);
      var meta = '<span class="user">' + c.user + '</span>' +
                 '<span class="ts">' + c.ts + '</span>' +
                 (c.byAuthor ? '<span class="by-author">by author</span>' : '');
      var img = c.hasImg ? '<div class="cmt-img gorgeous" aria-hidden="true"></div>' : '';
      var text = c.text ? '<span class="text">' + c.text + '</span>' : '';
      var actions = '<div class="actions">' + c.actions.map(function (a) { return '<span>' + a + '</span>'; }).join('') + '</div>';
      var more = c.moreReplies ? '<div class="more-replies">View ' + c.moreReplies + '</div>' : '';
      var heart = c.likes > 0 ?
        '<div class="cmt-heart">' + heartFilled + '<span>' + c.likes + '</span></div>' :
        '<div class="cmt-heart empty">' + heartEmpty + '</div>';

      var html = '<div class="ig-cmt">' +
        av +
        '<div class="cmt-body">' + meta + text + img + actions + more + '</div>' +
        heart +
      '</div>';

      if (c.reply) {
        var r = c.reply;
        var rAv = initialAv(r.user, r.hue);
        var rMeta = '<span class="user">' + r.user + '</span>' +
                    '<span class="ts">' + r.ts + '</span>' +
                    (r.author ? '<span class="by-author" style="">\u2022 Author</span>' : '');
        var rActions = '<div class="actions">' + r.actions.map(function (a) { return '<span>' + a + '</span>'; }).join('') + '</div>';
        var rHeart = '<div class="cmt-heart empty">' + heartEmpty + '</div>';
        html += '<div class="ig-cmt indent">' +
          rAv +
          '<div class="cmt-body">' + rMeta + '<span class="text">' + r.text + '</span>' + rActions + '</div>' +
          rHeart +
        '</div>';
      }
      return html;
    }).join('');

    var hostHtml = '' +
      '<div class="ig-frame reveal">' +
        '<div class="ig-head">' +
          '<div class="av"><div class="av-inner"><img src="logo.webp" alt="Dori Yums" onerror="this.style.display=\'none\'"/></div></div>' +
          '<div class="meta"><b>dori_yums</b><div class="sub">Algeria \u00b7 P\u00e2tisserie</div></div>' +
          '<span class="more" aria-hidden="true">\u2022\u2022\u2022</span>' +
        '</div>' +
        '<div class="ig-thread">' + threadHtml + '</div>' +
        '<div class="ig-foot">' +
          '<div class="row">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.35-9.5-9C.5 8.5 3 4 7 4c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 4 0 6.5 4.5 4.5 8-2.5 4.65-9.5 9-9.5 9z"/></svg>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
            '<span class="grow"></span>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
          '</div>' +
          '<div class="likes">Liked by <b>doria.park</b> and others</div>' +
          '<div class="src">From <a href="https://www.instagram.com/dori_yums/" target="_blank" rel="noopener">@dori_yums</a> on Instagram</div>' +
        '</div>' +
      '</div>';

    tcards.innerHTML = hostHtml;
  }

  /* ════════════════════════════════════════════════════════════
     i18n APPLY
     ════════════════════════════════════════════════════════════ */
  function applyFeatI18n() {
    $$('[data-feat-i18n]').forEach(function (e) {
      var k = e.getAttribute('data-feat-i18n');
      var v = t(k);
      if (v) e.textContent = v;
    });
    /* placeholder fields */
    var to = $('#giftTo'), from = $('#giftFrom'), msg = $('#giftMsg');
    if (to) to.placeholder = t('build.gift.to');
    if (from) from.placeholder = t('build.gift.from');
    if (msg) msg.placeholder = t('build.gift.msg');
  }
  window.__FEAT_APPLY_I18N = applyFeatI18n;

  /* ─── nav links injection ─── */
  function injectNavLinks() { /* sections removed — no nav links */ }

  /* ─── init ─── */
  function init() {
    buildAtelier();
    buildQuiz();
    buildBuilder();
    buildWeddings();
    buildPhotoTestimonials();
    injectNavLinks();
    applyFeatI18n();
    /* re-apply when language changes */
    window.addEventListener('langchange', function () {
      buildBuilder();   /* re-renders macaron labels */
      applyFeatI18n();
      renderBox();
    });
    /* reveal observer (if present) re-scan */
    if (window.IntersectionObserver) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add('is-in');
        });
      }, { threshold: .12 });
      $$('.feat-section .reveal').forEach(function (n) { obs.observe(n); });
    } else {
      $$('.feat-section .reveal').forEach(function (n) { n.classList.add('is-in'); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
