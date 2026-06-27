/* ════════════════════════════════════════════════════════════
   Dori Yums — Maison de Macarons · app.js (vanilla)
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── config ─── */
  var WA_NUMBER = '213551401704'; // ← ضع رقم واتساب هنا (بصيغة دولية بلا +)
  var IG_URL = 'https://www.instagram.com/dori_yums/';
  var FB_URL = 'https://web.facebook.com/Dori.Yums';
  var LANG_KEY = 'doriyums_lang';

  /* ─── language state ─── */
  var LANG = 'ar';
  try { LANG = localStorage.getItem(LANG_KEY) || 'ar'; } catch (e) {}
  if (LANG !== 'fr' && LANG !== 'en') LANG = 'ar';
  window.__LANG = LANG;

  /* ─── theme state (persisted separately so it survives lang switches) ─── */
  var THEME_KEY = 'doriyums_theme';

  /* ════════════════════════════════════════════════════════════
     I18N DICTIONARY
     ════════════════════════════════════════════════════════════ */
  var I18N = {
    ar: {
      'nav.gallery': 'المعرض', 'nav.collection': 'المجموعة', 'nav.story': 'القصة',
      'nav.contact': 'التواصل', 'nav.order': 'اطلب الآن',
      'hero.title': 'كلّ قطعةٍ تحفةٌ صغيرة',
      'hero.sub': 'ماكارون فرنسي صُنع يدويًا في الجزائر',
      'hero.drag': 'اسحب للتصفّح',
      'cat.eyebrow': 'La Collection', 'cat.title': 'المجموعة',
      'cat.sub': 'اثنتا عشرة قطعةً، كلُّ واحدةٍ لها قصّتها.',
      'story.eyebrow': 'قصّة المعرض', 'story.title': 'من الجزائر، بحبٍّ باريسي',
      'story.p1': 'بدأت الحكاية بشغفٍ صغير وميزانٍ دقيق: كيف نُعيد صياغة الماكارون الباريسي الأصيل بروحٍ جزائرية. كل صباحٍ نطحن اللوز، نخفق المرنغ الإيطالي، وننتظر القشرة حتى تكتسب لمعتها الحريرية.',
      'story.p2': 'لا نصنع بالكمية، بل بالقطعة. كل ماكارون يُختبر، يُوزن، ويوضع في إطاره كما تُعلّق لوحةٌ في معرض — لأنه عندنا ليس حلوى عابرة، بل لحظة تُقتنى.',
      'story.quote': '«الماكارون ليس حلوى، هو لحظة.»',
      'how.eyebrow': 'Comment Commander', 'how.title': 'خطوات الطلب',
      'how.s1t': 'اختر', 'how.s1p': 'تصفّح المعرض واختر نكهاتك المفضّلة من المجموعة.',
      'how.s2t': 'أرسل', 'how.s2p': 'راسلنا عبر واتساب بطلبك وعدد القطع والمناسبة.',
      'how.s3t': 'استلم', 'how.s3p': 'نوصّل طلبك بعناية خلال 24 إلى 48 ساعة.',
      'rev.eyebrow': 'Témoignages', 'rev.title': 'آراء الزبائن',
      'foot.tag': 'معرضُ الماكارون الفاخر — ماكارون فرنسي أصيل يُصنع يدويًا، قطعةً قطعة، في قلب الجزائر.',
      'foot.quick': 'روابط سريعة', 'foot.contact': 'تواصل معنا',
      'foot.addr': 'الجزائر العاصمة، الجزائر', 'foot.hours': 'كل يوم — 9 ص حتى 8 م',
      'foot.bottom': 'صُنع بحرفيةٍ في الجزائر',
      'card.order': 'اطلب', 'curr': 'دج',
      'card.details': 'التفاصيل',
      'detail.qty': 'الكمية', 'detail.total': 'الإجمالي', 'detail.order': 'اطلب عبر واتساب', 'wa.qty': 'الكمية',
      'detail.box': 'حجم العلبة', 'detail.pcs': 'قطعة',
      'detail.pick': 'وزّع النكهات',
      'detail.remaining': 'متبقّي', 'detail.of': 'من',
      'detail.full': 'العلبة مكتملة ✔',
      'detail.empty': 'لم تختر أي نكهة بعد',
      'wa.box': 'علبة', 'wa.items': 'النكهات', 'wa.total': 'المجموع',
      'mode.single': 'بنكهة واحدة', 'mode.preset': 'خلطة الشيف', 'mode.custom': 'مخصصة', 'mode.ai': 'إقتراح ذكي',
      'ai.label': 'لأي مناسبة؟', 'ai.placeholder': 'مثلاً: هدية عيد ميلاد / عشاء فاخر / للأطفال',
      'ai.suggest': 'اقترح الخلطة المثالية',
      'ai.loading': 'يستلهم الشيف خلطتك‍‍…',
      'ai.done': 'تمّ وتوزيع النكهات — الفتح على المخصصة للتعديل',
      'ai.error': 'لم يستطع الاستلهام — جرّب وصفاً أدق',
      'del.title': 'طريقة الاستلام', 'del.fee': 'رسوم التوصيل',
      'del.pickup': 'استلام من المحل', 'del.pickup.h': 'الجزائر · مجاناً',
      'del.alger': 'توصيل داخل الجزائر العاصمة', 'del.alger.h': 'Yalidine · 24–48س',
      'del.near': 'الولايات المجاورة', 'del.near.h': 'Yalidine · 48–72س',
      'del.far':  'باقي الولايات', 'del.far.h':  'عبر الشركات',
      'del.free': 'مجاناً',
      'del.phone.l': 'رقم الهاتف', 'del.phone.ph': 'مثل: 0551 23 45 67',
      'del.addr.l': 'العنوان أو البلدية', 'del.addr.ph': 'بلدية، حي، علامة مميّزة…',
      'del.note.l': 'ملاحظة إضافية (اختياري)', 'del.note.ph': 'رسالة على العلبة، وقت التوصيل،…',
      'del.summary': 'المجموع مع التوصيل',
      'wa.delivery': 'التوصيل', 'wa.phone': 'الهاتف', 'wa.addr': 'العنوان', 'wa.note': 'ملاحظة', 'wa.fee': 'رسوم التوصيل', 'wa.grand': 'المجموع النهائي',
      'note.classique': 'نكهة كلاسيكية خالدة بقشرة هشّة وحشوة حريرية، على الطريقة الفرنسية الأصيلة.',
      'note.prestige': 'تشكيلة فاخرة محدودة تُقدّم في المناسبات الراقية لمن يقدّر التميّز.',
      'note.fruits': 'انتعاش الفاكهة الطبيعية في قلب الماكارون، توازنٌ بين الحلاوة والحموضة.',
      'note.noix': 'غنى المكسّرات المحمّصة بنكهةٍ دافئة وقوامٍ كريميّ فاخر.',
      'note.chocolat': 'شوكولاتة نقيّة غنيّة لعشّاق الطعم العميق المخمليّ.',
      'note.saison': 'نكهة موسميّة تُحضّر بمكوّنات الموسم الطازجة، لفترةٍ محدودة.',
      'aria.menu': 'القائمة الرئيسية', 'aria.flavors': 'نكهات المعرض',
      'twk.title': 'التخصيص', 'twk.look': 'المظهر', 'twk.gold': 'الذهب',
      'twk.theme': 'النسق اللوني', 'twk.theme.gallery': 'معرض ذهبي', 'twk.theme.maison': 'دوري يومس',
      'twk.bg': 'الخلفية', 'twk.head': 'خط العناوين', 'twk.gallery': 'المعرض (Hero)',
      'twk.layout': 'التخطيط', 'twk.speed': 'سرعة الدوران', 'twk.cursor': 'مؤشر الماوس',
      'twk.motion': 'شدّة الحركة', 'twk.mot.subtle': 'هادئ', 'twk.mot.balanced': 'متوازن', 'twk.mot.dramatic': 'دراماتيكي',
      'twk.dir': 'اتجاه الدوران', 'twk.dir.fwd': 'يمين←يسار', 'twk.dir.back': 'يسار←يمين', 'twk.dir.off': 'متوقف',
      'twk.bg.charcoal': 'فحمي', 'twk.bg.deep': 'أعمق', 'twk.bg.warm': 'دافئ',
      'twk.lay.coverflow': 'ثلاثي الأبعاد', 'twk.lay.flat': 'مسطّح', 'twk.lay.spotlight': 'مفرد',
      'twk.cur.off': 'بدون', 'twk.cur.dot': 'نقطة', 'twk.cur.ring': 'هالة',
      'twk.off': 'متوقف', 'twk.sec': 'ث',
      'wa.greet': 'السلام عليكم 🌿 أرغب في طلب ماكارون من Dori Yums', 'wa.flavor': 'النكهة',
      'cat.all': 'الكل', 'cat.classique': 'كلاسيك', 'cat.prestige': 'فاخر',
      'cat.fruits': 'فواكه', 'cat.noix': 'مكسرات', 'cat.chocolat': 'شوكولاتة', 'cat.saison': 'موسمي',
      'trust.0': 'صُنع طازج يوميًا', 'trust.1': 'توصيل لكل ولايات الجزائر',
      'trust.2': 'طلب فوري عبر واتساب', 'trust.3': 'وصفات فرنسية أصيلة',
      'rev.0.q': 'طلبتُ علبة لعيد ميلاد أمي، وكانت أجمل من أيّ هدية اشتريتها. النكهات دقيقة والتغليف يليق بالمناسبة.',
      'rev.0.who': 'أمينة ب.', 'rev.0.city': 'الجزائر العاصمة',
      'rev.1.q': 'أخيرًا ماكارون بقشرةٍ حقيقية وقدمٍ مثالية. الفستق الحلبي لا يُقاوَم — صرتُ زبونة دائمة.',
      'rev.1.who': 'ياسمين خ.', 'rev.1.city': 'سطيف',
      'rev.2.q': 'فخامة في التفاصيل من أول رسالة واتساب حتى التوصيل. خدمة راقية وذوق رفيع، شكراً DORYYEMS.',
      'rev.2.who': 'سفيان م.', 'rev.2.city': 'وهران'
    },
    fr: {
      'nav.gallery': 'La Galerie', 'nav.collection': 'La Collection', 'nav.story': "L'Histoire",
      'nav.contact': 'Contact', 'nav.order': 'Commander',
      'hero.title': "Chaque pièce, une œuvre d'art",
      'hero.sub': 'Macarons français faits main à Alger',
      'hero.drag': 'Glissez pour parcourir',
      'cat.eyebrow': 'La Collection', 'cat.title': 'La Collection',
      'cat.sub': 'Douze pièces, chacune avec sa propre histoire.',
      'story.eyebrow': 'Notre histoire', 'story.title': "D'Alger, avec un amour parisien",
      'story.p1': "Tout a commencé par une petite passion et une balance précise : réinventer l'authentique macaron parisien avec une âme algérienne. Chaque matin, nous broyons l'amande, montons la meringue italienne, et attendons que la coque prenne son éclat soyeux.",
      'story.p2': "Nous ne produisons pas en quantité, mais à la pièce. Chaque macaron est goûté, pesé, et placé dans son cadre comme on accroche un tableau dans une galerie — car ici, ce n'est pas une douceur passagère, mais un instant que l'on collectionne.",
      'story.quote': "« Le macaron n'est pas une douceur, c'est un instant. »",
      'how.eyebrow': 'Comment Commander', 'how.title': 'Comment commander',
      'how.s1t': 'Choisissez', 'how.s1p': 'Parcourez la galerie et choisissez vos saveurs préférées.',
      'how.s2t': 'Envoyez', 'how.s2p': 'Écrivez-nous sur WhatsApp : votre commande, le nombre et l’occasion.',
      'how.s3t': 'Recevez', 'how.s3p': 'Nous livrons votre commande avec soin sous 24 à 48 heures.',
      'rev.eyebrow': 'Témoignages', 'rev.title': 'Témoignages',
      'foot.tag': "La galerie du macaron de prestige — macarons français authentiques, faits main, pièce par pièce, au cœur d'Alger.",
      'foot.quick': 'Liens rapides', 'foot.contact': 'Contactez-nous',
      'foot.addr': 'Alger, Algérie', 'foot.hours': 'Tous les jours — 9h à 20h',
      'foot.bottom': "Fait avec savoir-faire à Alger",
      'card.order': 'Commander', 'curr': 'DA',
      'card.details': 'Détails',
      'detail.qty': 'Quantité', 'detail.total': 'Total', 'detail.order': 'Commander sur WhatsApp', 'wa.qty': 'Quantité',
      'detail.box': 'Taille de la boîte', 'detail.pcs': 'pièces',
      'detail.pick': 'Choisissez vos saveurs',
      'detail.remaining': 'Restant', 'detail.of': 'sur',
      'detail.full': 'Boîte complète ✔',
      'detail.empty': 'Aucune saveur sélectionnée',
      'wa.box': 'Boîte', 'wa.items': 'Saveurs', 'wa.total': 'Total',
      'mode.single': 'Une saveur', 'mode.preset': 'Boîte du chef', 'mode.custom': 'Personnalisée', 'mode.ai': 'Suggestion IA',
      'ai.label': 'Pour quelle occasion ?', 'ai.placeholder': 'Ex : anniversaire, dîner raffiné, enfants…',
      'ai.suggest': 'Suggérer la composition idéale',
      'ai.loading': 'Le chef compose votre mélange‍‍…',
      'ai.done': 'Boîte composée — ouverture du mode personnalisé pour ajustement',
      'ai.error': "L'inspiration s'est dispersée — essayez une description plus précise",
      'del.title': 'Mode de livraison', 'del.fee': 'Frais de livraison',
      'del.pickup': 'Retrait à la boutique', 'del.pickup.h': 'Alger · Gratuit',
      'del.alger': 'Livraison Alger', 'del.alger.h': 'Yalidine · 24–48h',
      'del.near': 'Wilayas voisines', 'del.near.h': 'Yalidine · 48–72h',
      'del.far':  'Autres wilayas', 'del.far.h':  'Via transporteurs',
      'del.free': 'Gratuit',
      'del.phone.l': 'Téléphone', 'del.phone.ph': 'Ex : 0551 23 45 67',
      'del.addr.l': 'Adresse ou commune', 'del.addr.ph': 'Commune, quartier, point de repère…',
      'del.note.l': 'Note (optionnel)', 'del.note.ph': 'Message sur la boîte, horaire préféré…',
      'del.summary': 'Total livré',
      'wa.delivery': 'Livraison', 'wa.phone': 'Téléphone', 'wa.addr': 'Adresse', 'wa.note': 'Note', 'wa.fee': 'Frais', 'wa.grand': 'TOTAL',
      'note.classique': "Une saveur classique intemporelle — coque craquante, cœur soyeux, dans la pure tradition française.",
      'note.prestige': 'Une sélection rare et raffinée, pour les grandes occasions et les palais exigeants.',
      'note.fruits': "La fraîcheur du fruit au cœur du macaron — un équilibre parfait entre douceur et acidité.",
      'note.noix': 'La richesse des fruits secs torréfiés — une saveur chaleureuse et une texture crémeuse.',
      'note.chocolat': 'Un chocolat pur et intense, pour les amateurs de goût profond et velouté.',
      'note.saison': 'Une saveur de saison préparée avec des ingrédients frais, pour une durée limitée.',
      'aria.menu': 'Menu principal', 'aria.flavors': 'Saveurs de la galerie',
      'twk.title': 'Personnaliser', 'twk.look': 'Apparence', 'twk.gold': 'Or',
      'twk.theme': 'Palette', 'twk.theme.gallery': 'Galerie d’or', 'twk.theme.maison': 'Dori Yums',
      'twk.bg': 'Fond', 'twk.head': 'Police des titres', 'twk.gallery': 'Galerie (Hero)',
      'twk.layout': 'Disposition', 'twk.speed': 'Vitesse de rotation', 'twk.cursor': 'Curseur',
      'twk.motion': 'Intensité du mouvement', 'twk.mot.subtle': 'Doux', 'twk.mot.balanced': 'Équilibré', 'twk.mot.dramatic': 'Dramatique',
      'twk.dir': 'Sens de rotation', 'twk.dir.fwd': 'D→G', 'twk.dir.back': 'G→D', 'twk.dir.off': 'Arrêt',
      'twk.bg.charcoal': 'Charbon', 'twk.bg.deep': 'Profond', 'twk.bg.warm': 'Chaud',
      'twk.lay.coverflow': '3D', 'twk.lay.flat': 'Plat', 'twk.lay.spotlight': 'Solo',
      'twk.cur.off': 'Aucun', 'twk.cur.dot': 'Point', 'twk.cur.ring': 'Halo',
      'twk.off': 'Arrêt', 'twk.sec': 's',
      'wa.greet': 'Bonjour 🌿 je souhaite commander des macarons chez Dori Yums', 'wa.flavor': 'Saveur',
      'cat.all': 'Tout', 'cat.classique': 'Classique', 'cat.prestige': 'Prestige',
      'cat.fruits': 'Fruits', 'cat.noix': 'Fruits secs', 'cat.chocolat': 'Chocolat', 'cat.saison': 'Saison',
      'trust.0': 'Fait frais chaque jour', 'trust.1': "Livraison dans toute l'Algérie",
      'trust.2': 'Commande directe via WhatsApp', 'trust.3': 'Recettes françaises authentiques',
      'rev.0.q': "J'ai commandé un coffret pour l'anniversaire de ma mère : plus beau que n'importe quel cadeau. Saveurs précises, écrin à la hauteur de l'occasion.",
      'rev.0.who': 'Amina B.', 'rev.0.city': 'Alger',
      'rev.1.q': 'Enfin un macaron à la coque parfaite et au pied impeccable. La pistache est irrésistible — je suis devenue une cliente fidèle.',
      'rev.1.who': 'Yasmine K.', 'rev.1.city': 'Sétif',
      'rev.2.q': "Du premier message WhatsApp à la livraison, tout respire le raffinement. Service haut de gamme et goût exquis, merci Dori Yums.",
      'rev.2.who': 'Sofiane M.', 'rev.2.city': 'Oran'
    },
    en: {
      'nav.gallery': 'The Gallery', 'nav.collection': 'The Collection', 'nav.story': 'Our Story',
      'nav.contact': 'Contact', 'nav.order': 'Order Now',
      'hero.title': 'Each piece, a work of art',
      'hero.sub': 'French macarons, handmade in Algiers',
      'hero.drag': 'Drag to browse',
      'cat.eyebrow': 'The Collection', 'cat.title': 'The Collection',
      'cat.sub': 'Twelve pieces, each with its own story.',
      'story.eyebrow': 'Our Story', 'story.title': 'From Algiers, with a Parisian love',
      'story.p1': "It began with a small passion and a precise scale: how to reimagine the authentic Parisian macaron with an Algerian soul. Every morning we grind the almonds, whip the Italian meringue, and wait for the shell to take on its silky sheen.",
      'story.p2': "We don't make by the batch, but by the piece. Each macaron is tasted, weighed, and placed in its frame the way a painting is hung in a gallery — because here it isn't a passing sweet, but a moment to be collected.",
      'story.quote': '“A macaron is not a sweet — it is a moment.”',
      'how.eyebrow': 'How to Order', 'how.title': 'How to Order',
      'how.s1t': 'Choose', 'how.s1p': 'Browse the gallery and pick your favourite flavours.',
      'how.s2t': 'Send', 'how.s2p': 'Message us on WhatsApp with your order, quantity and occasion.',
      'how.s3t': 'Receive', 'how.s3p': 'We deliver your order with care within 24 to 48 hours.',
      'rev.eyebrow': 'Testimonials', 'rev.title': 'What Our Clients Say',
      'foot.tag': "The gallery of fine macarons — authentic French macarons, handmade piece by piece, in the heart of Algiers.",
      'foot.quick': 'Quick Links', 'foot.contact': 'Get in Touch',
      'foot.addr': 'Algiers, Algeria', 'foot.hours': 'Every day — 9 AM to 8 PM',
      'foot.bottom': 'Crafted with care in Algiers',
      'card.order': 'Order', 'curr': 'DA',
      'card.details': 'Details',
      'detail.qty': 'Quantity', 'detail.total': 'Total', 'detail.order': 'Order on WhatsApp', 'wa.qty': 'Quantity',
      'detail.box': 'Box size', 'detail.pcs': 'pieces',
      'detail.pick': 'Choose your flavours',
      'detail.remaining': 'Remaining', 'detail.of': 'of',
      'detail.full': 'Box complete ✔',
      'detail.empty': 'No flavours chosen yet',
      'wa.box': 'Box', 'wa.items': 'Flavours', 'wa.total': 'Total',
      'mode.single': 'Single flavour', 'mode.preset': "Chef's box", 'mode.custom': 'Custom', 'mode.ai': 'AI suggest',
      'ai.label': 'For what occasion?', 'ai.placeholder': 'e.g. birthday gift, refined dinner, kids…',
      'ai.suggest': 'Suggest the perfect mix',
      'ai.loading': 'The chef is composing your selection‍‍…',
      'ai.done': 'Mix ready — opening custom mode to fine-tune',
      'ai.error': "Inspiration faded — try a more specific description",
      'del.title': 'Delivery method', 'del.fee': 'Delivery fee',
      'del.pickup': 'Pickup in-store', 'del.pickup.h': 'Algiers · Free',
      'del.alger': 'Algiers delivery', 'del.alger.h': 'Yalidine · 24–48h',
      'del.near': 'Nearby wilayas', 'del.near.h': 'Yalidine · 48–72h',
      'del.far':  'Other wilayas', 'del.far.h':  'Via carrier',
      'del.free': 'Free',
      'del.phone.l': 'Phone', 'del.phone.ph': 'e.g. 0551 23 45 67',
      'del.addr.l': 'Address or commune', 'del.addr.ph': 'Commune, neighbourhood, landmark…',
      'del.note.l': 'Note (optional)', 'del.note.ph': 'Message on the box, preferred time…',
      'del.summary': 'Total delivered',
      'wa.delivery': 'Delivery', 'wa.phone': 'Phone', 'wa.addr': 'Address', 'wa.note': 'Note', 'wa.fee': 'Fee', 'wa.grand': 'TOTAL',
      'note.classique': 'A timeless classic — crisp shell, silky heart, in the pure French tradition.',
      'note.prestige': 'A rare, refined selection for grand occasions and discerning palates.',
      'note.fruits': 'The freshness of real fruit at the heart of the macaron — a perfect balance of sweet and tart.',
      'note.noix': 'The richness of roasted nuts — a warm flavour and a creamy texture.',
      'note.chocolat': 'Pure, intense chocolate for lovers of deep, velvety taste.',
      'note.saison': 'A seasonal flavour made with fresh ingredients, available for a limited time.',
      'aria.menu': 'Main menu', 'aria.flavors': 'Gallery flavours',
      'twk.title': 'Customize', 'twk.look': 'Appearance', 'twk.gold': 'Gold',
      'twk.theme': 'Palette', 'twk.theme.gallery': 'Gold Gallery', 'twk.theme.maison': 'Dori Yums',
      'twk.bg': 'Background', 'twk.head': 'Heading font', 'twk.gallery': 'Gallery (Hero)',
      'twk.layout': 'Layout', 'twk.speed': 'Rotation speed', 'twk.cursor': 'Cursor',
      'twk.motion': 'Motion intensity', 'twk.mot.subtle': 'Subtle', 'twk.mot.balanced': 'Balanced', 'twk.mot.dramatic': 'Dramatic',
      'twk.dir': 'Rotation direction', 'twk.dir.fwd': 'R→L', 'twk.dir.back': 'L→R', 'twk.dir.off': 'Off',
      'twk.bg.charcoal': 'Charcoal', 'twk.bg.deep': 'Deeper', 'twk.bg.warm': 'Warm',
      'twk.lay.coverflow': '3D', 'twk.lay.flat': 'Flat', 'twk.lay.spotlight': 'Solo',
      'twk.cur.off': 'Off', 'twk.cur.dot': 'Dot', 'twk.cur.ring': 'Ring',
      'twk.off': 'Off', 'twk.sec': 's',
      'wa.greet': 'Hello 🌿 I would like to order macarons from Dori Yums', 'wa.flavor': 'Flavour',
      'cat.all': 'All', 'cat.classique': 'Classic', 'cat.prestige': 'Prestige',
      'cat.fruits': 'Fruits', 'cat.noix': 'Nuts', 'cat.chocolat': 'Chocolate', 'cat.saison': 'Seasonal',
      'trust.0': 'Made fresh daily', 'trust.1': 'Delivery across Algeria',
      'trust.2': 'Order directly on WhatsApp', 'trust.3': 'Authentic French recipes',
      'rev.0.q': "I ordered a box for my mother's birthday — more beautiful than any gift I've bought. Precise flavours, packaging worthy of the occasion.",
      'rev.0.who': 'Amina B.', 'rev.0.city': 'Algiers',
      'rev.1.q': 'Finally a macaron with a real shell and a perfect foot. The pistachio is irresistible — I am now a loyal customer.',
      'rev.1.who': 'Yasmine K.', 'rev.1.city': 'Sétif',
      'rev.2.q': 'From the first WhatsApp message to delivery, everything breathes refinement. High-end service and exquisite taste, thank you Dori Yums.',
      'rev.2.who': 'Sofiane M.', 'rev.2.city': 'Oran'
    }
  };
  function t(key) { return (I18N[LANG] && I18N[LANG][key] != null) ? I18N[LANG][key] : (I18N.ar[key] || key); }

  /* ─── data ─── */
  var ROMAN = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ', 'Ⅻ', 'XIII', 'XIV', 'XV', 'XVI'];

  // name = الاسم العربي · flavor = le nom français · cat = clé de catégorie
  var MACARONS = [
    { name: 'الفراولة',                  flavor: 'Fraise',               cat: 'fruits',    price: 180, shell: '#E8B4B8', cream: '#F2D9DC', photo: ((window.__resources && window.__resources['macRose']) || 'images/m-rose.webp') },
    { name: 'الفستق الحلبي',        flavor: "Pistache d'Alep",      cat: 'noix',      price: 200, shell: '#A7B89A', cream: '#CBD6BE', photo: ((window.__resources && window.__resources['macPistachio']) || 'images/m-pistachio.webp') },
    { name: 'الشوكولاتة السوداء',     flavor: 'Chocolat Noir 70%',    cat: 'chocolat',  price: 190, shell: '#5C3A2E', cream: '#8A5E48', photo: ((window.__resources && window.__resources['macChocolate']) || 'images/m-chocolate.webp') },
    { name: 'موز بالشوكولاتة',         flavor: 'Banane Chocolat',      cat: 'chocolat',  price: 180, shell: '#D4B896', cream: '#ECDABA', photo: ((window.__resources && window.__resources['macBanana']) || 'images/m-banana.webp') },
    { name: 'فراولة بالتوت',           flavor: 'Fraise Framboise',     cat: 'fruits',    price: 180, shell: '#B8475C', cream: '#D67E8E', photo: ((window.__resources && window.__resources['macStrawberry']) || 'images/m-strawberry.webp') },
    { name: 'الليمون',                  flavor: 'Citron',               cat: 'fruits',    price: 170, shell: '#E8C547', cream: '#F2DE8A', photo: ((window.__resources && window.__resources['macLemon']) || 'images/m-lemon.webp') },
    { name: 'الأناناس',                  flavor: 'Ananas',               cat: 'fruits',    price: 200, shell: '#F2D04B', cream: '#F7E580', photo: ((window.__resources && window.__resources['macCoconut']) || 'images/m-coconut.webp') },
    { name: 'البندق والبرالين',       flavor: 'Noisette Praliné',     cat: 'noix',      price: 210, shell: '#B79268', cream: '#D2B48C', photo: ((window.__resources && window.__resources['macPecan']) || 'images/m-pecan.webp') },
    { name: 'الفانيلا بالكراميل',     flavor: 'Vanille Caramel',      cat: 'classique', price: 170, shell: '#EAD9B0', cream: '#F4E9CC', photo: ((window.__resources && window.__resources['macVanilla']) || 'images/m-vanilla.webp') },
    { name: 'كرز بالشوكولاتة',         flavor: 'Cerise au Chocolat',   cat: 'fruits',    price: 180, shell: '#A8253A', cream: '#C9434E', photo: ((window.__resources && window.__resources['macCherry']) || 'images/m-cherry.webp') },
    { name: 'جوز الهند بالشوكولاتة',  flavor: 'Coco Chocolat',        cat: 'chocolat',  price: 190, shell: '#A9794E', cream: '#C99E72', photo: ((window.__resources && window.__resources['macCoconutChoc']) || 'images/m-coconut-choc.webp') },
    { name: 'برتقال',                       flavor: 'Orange',               cat: 'fruits',    price: 190, shell: '#F0A040', cream: '#F7C580', photo: ((window.__resources && window.__resources['macOrange']) || 'images/m-orange.webp') }
  ];

  /* show all macarons in the hero carousel */
  var HERO = MACARONS.map(function (_, i) { return i; });
  var FILTERS = ['all', 'classique', 'prestige', 'fruits', 'noix', 'chocolat', 'saison'];

  // primary/secondary names depend on language
  function pName(m) { return LANG === 'ar' ? m.name : m.flavor; }
  function pSub(m)  { return LANG === 'ar' ? m.flavor : m.name; }
  function priceHTML(m) { return '<span class="lat">' + m.price + '</span> ' + t('curr'); }

  /* ─── helpers ─── */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function setArt(slot, uri) {
    if (!slot) return;
    slot.setAttribute('src', uri);
    var p = slot.parentElement;
    if (p) { p.style.backgroundImage = 'url("' + uri + '")'; p.style.backgroundSize = 'cover'; p.style.backgroundPosition = 'center'; }
  }

  /* ════════════════════════════════════════════════════════════
     MACARON SVG GENERATOR
     ════════════════════════════════════════════════════════════ */
  function shellPath(cx, hw, by, h, color) {
    var b = h > 0 ? 13 : -13;
    return '<path d="M' + (cx - hw) + ' ' + by +
      ' C' + (cx - hw) + ' ' + (by - h * 0.86) + ' ' + (cx - hw * 0.42) + ' ' + (by - h) + ' ' + cx + ' ' + (by - h) +
      ' C' + (cx + hw * 0.42) + ' ' + (by - h) + ' ' + (cx + hw) + ' ' + (by - h * 0.86) + ' ' + (cx + hw) + ' ' + by +
      ' C' + (cx + hw) + ' ' + (by + b) + ' ' + (cx + hw * 0.5) + ' ' + (by + b * 1.25) + ' ' + cx + ' ' + (by + b * 1.25) +
      ' C' + (cx - hw * 0.5) + ' ' + (by + b * 1.25) + ' ' + (cx - hw) + ' ' + (by + b) + ' ' + (cx - hw) + ' ' + by + ' Z" fill="' + color + '"/>';
  }
  function feet(cx, hw, y, color, up) {
    var s = '', i, n = 7, step = (hw * 2) / (n - 1), x, ry = up ? -5 : 5;
    for (i = 0; i < n; i++) {
      x = cx - hw + step * i;
      s += '<ellipse cx="' + x.toFixed(1) + '" cy="' + (y + ry * 0.4).toFixed(1) + '" rx="6.5" ry="5.5" fill="' + color + '"/>';
    }
    return s;
  }
  function macaronURI(m, seed) {
    if (m && m.photo) return m.photo;
    seed = seed || 0;
    var cx = 150, hw = 92;
    var topBy = 196, botBy = 214, domeH = 60, fillY = 188, fillH = 30;
    var sp = '', i, r, x, y, rad;
    for (i = 0; i < 8; i++) {
      r = (Math.sin((seed + 1) * 9.13 + i * 2.7) * 0.5 + 0.5);
      var r2 = (Math.cos((seed + 1) * 4.7 + i * 3.1) * 0.5 + 0.5);
      x = 24 + r * 252; y = 30 + r2 * 340; rad = 1.4 + ((i % 3) * 1.3);
      if (x > 70 && x < 230 && y > 150 && y < 280) { x = x < 150 ? x - 70 : x + 70; }
      sp += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + rad.toFixed(1) + '" fill="#D4AF37" opacity="' + (0.18 + (i % 4) * 0.07).toFixed(2) + '"/>';
    }
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#1F1F1F"/><stop offset="1" stop-color="#0A0A0A"/></linearGradient>' +
        '<radialGradient id="sheen" cx="0.36" cy="0.3" r="0.7">' +
          '<stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/><stop offset="0.6" stop-color="#ffffff" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="floor" cx="0.5" cy="0.5" r="0.5">' +
          '<stop offset="0" stop-color="#000" stop-opacity="0.5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<rect width="300" height="400" fill="url(#bg)"/>' +
      sp +
      '<ellipse cx="150" cy="292" rx="104" ry="20" fill="url(#floor)"/>' +
      shellPath(cx, hw, botBy, -domeH, m.shell) +
      feet(cx, hw - 6, botBy + 6, shade(m.shell, -14), false) +
      '<path d="M' + (cx - hw + 4) + ' ' + fillY + ' Q' + cx + ' ' + (fillY - 7) + ' ' + (cx + hw - 4) + ' ' + fillY +
        ' L' + (cx + hw - 4) + ' ' + (fillY + fillH) + ' Q' + cx + ' ' + (fillY + fillH + 7) + ' ' + (cx - hw + 4) + ' ' + (fillY + fillH) + ' Z" fill="' + m.cream + '"/>' +
      feet(cx, hw - 6, topBy - 4, shade(m.shell, -14), true) +
      shellPath(cx, hw, topBy, domeH, m.shell) +
      '<path d="M' + (cx - hw) + ' ' + topBy +
        ' C' + (cx - hw) + ' ' + (topBy - domeH * 0.86) + ' ' + (cx - hw * 0.42) + ' ' + (topBy - domeH) + ' ' + cx + ' ' + (topBy - domeH) +
        ' C' + (cx + hw * 0.42) + ' ' + (topBy - domeH) + ' ' + (cx + hw) + ' ' + (topBy - domeH * 0.86) + ' ' + (cx + hw) + ' ' + topBy + ' Z" fill="url(#sheen)"/>' +
      '</svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }
  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16);
    var r = Math.max(0, Math.min(255, (n >> 16) + amt));
    var g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
    var b = Math.max(0, Math.min(255, (n & 255) + amt));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  function portraitURI() {
    var en = (LANG !== 'ar');
    var l1 = LANG === 'fr' ? "Photo de l'atelier / l'artisane" : LANG === 'en' ? 'Photo of the workshop / artisan' : 'صورة الورشة / الصانع';
    var l2 = LANG === 'fr' ? 'Déposez votre image ici' : LANG === 'en' ? 'Drop your image here' : 'اسحب صورتك هنا لاستبدالها';
    var fam = en ? 'Inter, sans-serif' : 'Tajawal, sans-serif';
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">' +
      '<defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#181818"/><stop offset="1" stop-color="#0B0B0B"/></linearGradient></defs>' +
      '<rect width="400" height="500" fill="url(#pg)"/>' +
      '<g fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.5"><circle cx="200" cy="210" r="78"/></g>' +
      '<text x="200" y="240" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="92" fill="#D4AF37" opacity="0.9">D</text>' +
      '<text x="200" y="330" text-anchor="middle" font-family="' + fam + '" font-size="18" fill="#8A8A8A" letter-spacing="1">' + l1 + '</text>' +
      '<text x="200" y="360" text-anchor="middle" font-family="' + fam + '" font-size="13" fill="#5a5a5a">' + l2 + '</text>' +
      '</svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  /* ─── ICONS ─── */
  var ICON = {
    fresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c2.5 3 4 5.2 4 7.5a4 4 0 1 1-8 0C8 7.2 9.5 5 12 2z"/><path d="M5 21h14"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="13" height="10" rx="1"/><path d="M14 9h4l3 3v4h-7"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1 4.6-12 8.4 8.4 0 0 1 11.5 8.2z"/></svg>',
    medal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M9 14.5 7 22l5-3 5 3-2-7.5"/><path d="M12 6.5l1 2 2.2.2-1.6 1.5.5 2.1-2.1-1.1-2.1 1.1.5-2.1L8.8 8.7 11 8.5z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.52 11.97c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.48 1.07 2.48.71 2.93.67.45-.04 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3H13.5V9.5c0-.3.2-.5.5-.5z"/></svg>'
  };

  /* ════════════════════════════════════════════════════════════
     RENDER (language-aware)
     ════════════════════════════════════════════════════════════ */
  function applyStaticI18n() {
    $$('[data-i18n]').forEach(function (n) { n.textContent = t(n.getAttribute('data-i18n')); });
    $('#navMenu') && $('#navMenu').setAttribute('aria-label', t('aria.menu'));
    $('#dots') && $('#dots').setAttribute('aria-label', t('aria.flavors'));
    $('#story-portrait') && $('#story-portrait').setAttribute('placeholder', LANG === 'fr' ? "Photo de l'atelier" : LANG === 'en' ? 'Workshop photo' : 'صورة الصانع / الورشة');
  }

  function buildTrust() {
    var g = $('#trustGrid'); if (!g) return;
    g.innerHTML = '';
    var icons = [ICON.fresh, ICON.truck, ICON.chat, ICON.medal];
    icons.forEach(function (ic, i) {
      var d = el('div', 'trust-item reveal');
      d.style.transitionDelay = (i * 0.08) + 's';
      d.innerHTML = ic + '<span>' + t('trust.' + i) + '</span>';
      g.appendChild(d);
    });
  }

  function buildCatalog() {
    var grid = $('#grid'); if (!grid) return;
    grid.innerHTML = '';
    MACARONS.forEach(function (m, i) {
      var card = el('article', 'card reveal');
      card.dataset.cat = m.cat;
      card.dataset.idx = i;
      card.style.transitionDelay = ((i % 4) * 0.07) + 's';
      card.innerHTML =
        '<div class="card-frame gframe">' +
          '<div class="mat"><div class="art">' +
            '<image-slot id="cat-' + i + '" fit="cover" placeholder="' + pName(m) + '"></image-slot>' +
            '<span class="glass"></span>' +
            '<div class="card-reveal">' +
              '<div class="cr-name">' + pName(m) + '</div>' +
              '<div class="cr-flavor">' + pSub(m) + '</div>' +
              '<div class="cr-rule"></div>' +
              '<div class="cr-price">' + priceHTML(m) + '</div>' +
              '<button class="cr-order" type="button">' + t('card.details') + '</button>' +
            '</div>' +
          '</div></div>' +
        '</div>';
      grid.appendChild(card);
      setArt(card.querySelector('image-slot'), macaronURI(m, i));
    });
  }

  function buildFilters() {
    var f = $('#filters'); if (!f) return;
    f.innerHTML = '';
    FILTERS.forEach(function (key, i) {
      var b = el('button', 'filter' + (i === 0 ? ' active' : ''), t('cat.' + key));
      b.type = 'button'; b.dataset.val = key;
      b.addEventListener('click', function () {
        $$('.filter', f).forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        $$('.card').forEach(function (c) {
          var show = (key === 'all') || c.dataset.cat === key;
          c.classList.toggle('hide', !show);
        });
      });
      f.appendChild(b);
    });
  }

  function buildReviews() {
    var c = $('#tcards'); if (!c) return;
    c.innerHTML = '';
    [0, 1, 2].forEach(function (i) {
      var d = el('article', 'tcard reveal');
      d.style.transitionDelay = (i * 0.1) + 's';
      d.innerHTML =
        '<div class="mark">”</div>' +
        '<div class="stars">★★★★★</div>' +
        '<p>' + t('rev.' + i + '.q') + '</p>' +
        '<div class="who"><b>' + t('rev.' + i + '.who') + '</b>' + t('rev.' + i + '.city') + '</div>';
      c.appendChild(d);
    });
  }

  function buildSocials() {
    var s = $('#socials'); if (!s) return;
    s.innerHTML = '';
    var items = [
      { u: IG_URL, i: ICON.ig, l: 'Instagram' },
      { u: waLink(), i: ICON.wa, l: 'WhatsApp' },
      { u: FB_URL, i: ICON.fb, l: 'Facebook' }
    ];
    items.forEach(function (it) {
      var a = el('a', null, it.i);
      a.href = it.u; a.target = '_blank'; a.rel = 'noopener';
      a.setAttribute('aria-label', it.l);
      s.appendChild(a);
    });
  }

  /* ─── WHATSAPP ─── */
  /* skip wa.me which redirects to the often-blocked api.whatsapp.com.
     On mobile: whatsapp:// (opens the app). On desktop: web.whatsapp.com. */
  function waBase() {
    var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    return isMobile
      ? 'whatsapp://send?phone=' + WA_NUMBER + '&text='
      : 'https://web.whatsapp.com/send?phone=' + WA_NUMBER + '&text=';
  }
  function waLink(name) {
    var msg = t('wa.greet');
    if (name) msg += '\n' + t('wa.flavor') + ': ' + name;
    return waBase() + encodeURIComponent(msg);
  }
  function wireOrder() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.order-btn');
      if (!b) return;
      e.preventDefault();
      window.open(waLink(b.dataset.name || ''), '_blank', 'noopener');
    });
    refreshWa();
  }
  function refreshWa() {
    var wf = $('#waFloat');
    if (wf) {
      wf.href = waLink();
      wf.target = '_blank';
      wf.rel = 'noopener';
    }
    var badge = $('#waBadge');
    if (badge) {
      var labels = { ar: 'اطلب الآن', fr: 'Commander', en: 'Order' };
      badge.textContent = labels[LANG] || labels.ar;
    }
    $$('.wa-num').forEach(function (n) {
      var d = WA_NUMBER;
      n.textContent = '+' + d.slice(0, 3) + ' ' + d.slice(3).replace(/(\d{3})(?=\d)/g, '$1 ').trim();
    });
  }

  /* ════════════════════════════════════════════════════════════
     HERO 3D GALLERY
     ════════════════════════════════════════════════════════════ */
  var active = 0, n = HERO.length, frames = [], autoTimer = null, gallery, track;

  function buildHero() {
    gallery = $('.gallery'); track = $('#track');
    if (!track) return;
    HERO.forEach(function (idx, i) {
      var m = MACARONS[idx];
      var f = el('article', 'frame gframe');
      f.innerHTML = '<div class="mat"><div class="art"><image-slot id="hero-' + i + '" fit="cover" placeholder="' + pName(m) + '"></image-slot><span class="glass"></span></div></div>';
      f.addEventListener('click', function () { if (i !== active) go(i); });
      track.appendChild(f);
      setArt(f.querySelector('image-slot'), macaronURI(m, idx));
      frames.push(f);
    });
    var dots = $('#dots');
    HERO.forEach(function (idx, i) {
      var d = el('button', 'dot'); d.type = 'button';
      d.setAttribute('role', 'tab');
      d.addEventListener('click', function () { go(i); });
      dots.appendChild(d);
    });
    layout(); updatePlacard(true);
    wireHeroDrag();
    startAuto();
    gallery.addEventListener('mouseenter', stopAuto);
    gallery.addEventListener('mouseleave', startAuto);
  }

  /* drag-to-navigate: grab a frame and pull left/right to step through */
  function wireHeroDrag() {
    var stage = $('#stage');
    if (!stage || !track) return;
    var dragging = false, hasMoved = false, startX = 0, startY = 0, dx = 0, spacing = 300;

    function getSpacing() {
      var fw = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--frame-w')) || 300;
      var mobile = window.innerWidth <= 540;
      var variant = gallery.dataset.variant || 'coverflow';
      if (variant === 'spotlight') return fw * 1.4;
      if (variant === 'flat')      return fw * 1.05;
      return mobile ? fw * 0.6 : fw * 0.82;
    }

    function begin(x) {
      dragging = true; hasMoved = false;
      startX = x; dx = 0;
      spacing = getSpacing();
      stage.classList.add('is-dragging');
      gallery.classList.add('dragged-once');
      track.style.transition = 'none';
      stopAuto();
    }

    function update(x) {
      if (!dragging) return;
      dx = x - startX;
      if (Math.abs(dx) > 4) hasMoved = true;
      // resistance after one frame's worth of travel
      var damp = dx;
      if (Math.abs(dx) > spacing) {
        var over = Math.abs(dx) - spacing;
        damp = Math.sign(dx) * (spacing + over * 0.45);
      }
      track.style.transform = 'translateX(' + damp + 'px)';
      // edge glow follows direction
      gallery.dataset.mzone = dx > 12 ? 'right-pull' : (dx < -12 ? 'left-pull' : '');
    }

    function finish() {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove('is-dragging');
      track.style.transition = 'transform .55s cubic-bezier(.5,1.2,.3,1)';
      track.style.transform = 'translateX(0)';
      gallery.removeAttribute('data-mzone');
      var threshold = spacing * 0.28;
      if (Math.abs(dx) > threshold) {
        // drag right (dx>0) reveals previous frame (active-1)
        // drag left  (dx<0) reveals next frame    (active+1)
        var step = dx > 0 ? -1 : 1;
        // strong fling → jump 2
        if (Math.abs(dx) > spacing * 1.1) step *= 2;
        go(active + step);
      }
      setTimeout(function () {
        track.style.transition = '';
        track.style.transform = '';
      }, 600);
      startAuto();
    }

    /* mouse */
    stage.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      begin(e.clientX);
    });
    window.addEventListener('mousemove', function (e) { if (dragging) update(e.clientX); });
    window.addEventListener('mouseup',   finish);
    window.addEventListener('blur',      finish);

    /* prevent the frame click from firing after a drag */
    stage.addEventListener('click', function (e) {
      if (hasMoved) { e.stopPropagation(); e.preventDefault(); hasMoved = false; }
    }, true);

    /* touch */
    stage.addEventListener('touchstart', function (e) {
      startY = e.touches[0].clientY;
      begin(e.touches[0].clientX);
    }, { passive: true });
    stage.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      var adx = Math.abs(e.touches[0].clientX - startX);
      var ady = Math.abs(e.touches[0].clientY - startY);
      if (adx > ady && adx > 6) e.preventDefault();
      else { dragging = false; return; }
      update(e.touches[0].clientX);
    }, { passive: false });
    stage.addEventListener('touchend',    finish);
    stage.addEventListener('touchcancel', finish);
  }

  function mod(x) { return ((x % n) + n) % n; }
  function go(i) { active = mod(i); layout(); updatePlacard(); restartAuto(); }

  function layout() {
    if (!frames.length) return;
    var variant = gallery.dataset.variant || 'coverflow';
    var fw = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--frame-w')) || 300;
    var mobile = window.innerWidth <= 540;
    frames.forEach(function (f, i) {
      var p = i - active;
      if (p > n / 2) p -= n;
      if (p < -n / 2) p += n;
      var ap = Math.abs(p);
      var tx = 0, tz = 0, ry = 0, sc = 1, op = 1, vis = true;
      /* motion intensity multiplier from Tweaks */
      var motionKey = (window.__T && window.__T.heroMotion) || 'balanced';
      var mFac = motionKey === 'subtle' ? 0.7 : motionKey === 'dramatic' ? 1.3 : 1;
      if (variant === 'spotlight') {
        tx = p * fw * 1.4 * mFac; op = p === 0 ? 1 : 0; vis = p === 0; sc = p === 0 ? 1 : 0.8;
      } else if (variant === 'flat') {
        tx = p * (fw * 1.05) * mFac; sc = p === 0 ? 1 : Math.max(0.7, 0.82 - (mFac - 1) * 0.08);
        op = ap <= 1 ? (p === 0 ? 1 : 0.5) : 0; vis = ap <= 1;
      } else {
        /* portrait sides (3:4) + landscape center (16:9 \u2014 ~640px wide).
           push side frames clear of the wider active frame. */
        var sp = (mobile ? fw * 1.5 : fw * 1.95) * mFac;
        tx = p * sp;
        ry = -p * (mobile ? 26 : 34) * mFac;
        tz = -ap * (mobile ? 100 : 160) * mFac;
        sc = 1 - ap * (0.16 * mFac); op = ap > 2 ? 0 : 1; vis = ap <= 2;
      }
      f.style.transform = 'translate(-50%,-50%) translateX(' + tx + 'px) translateZ(' + tz + 'px) rotateY(' + ry + 'deg) scale(' + sc + ')';
      f.style.opacity = op;
      f.style.zIndex = String(100 - ap * 10 + (p === 0 ? 6 : 0));
      f.style.pointerEvents = vis ? 'auto' : 'none';
      f.classList.toggle('is-active', p === 0);
    });
  }

  function catLabel(key) {
    var s = t('cat.' + key);
    if (!s || s === 'cat.' + key) return key;
    return s;
  }

  function updatePlacard(instant) {
    var m = MACARONS[HERO[active]];
    var card = $('#placard');
    var apply = function () {
      $('#pRoman').textContent = ROMAN[active];
      $('#pName').textContent = pName(m);
      $('#pFlavor').textContent = pSub(m);
      var cat = $('#pCat'); if (cat) cat.textContent = catLabel(m.cat);
      var no = $('#pNo'); if (no) {
        var idx = HERO[active] + 1;
        no.textContent = String(idx).padStart(2, '0') + '/' + String(MACARONS.length).padStart(2, '0');
      }
      card.classList.remove('swap');
      /* trigger the staggered reveal animation by re-toggling the class */
      card.classList.remove('is-revealing');
      // force a reflow so the next add restarts the transitions/animation
      void card.offsetWidth;
      card.classList.add('is-revealing');
    };
    $$('.dot').forEach(function (d, i) { d.setAttribute('aria-current', i === active ? 'true' : 'false'); });
    if (instant) { apply(); return; }
    card.classList.add('swap');
    card.classList.remove('is-revealing');
    setTimeout(apply, 260);
  }

  function startAuto() {
    stopAuto();
    var TT = window.__T || {};
    var s = TT.heroSpeed; if (s == null) s = 7;
    var dir = TT.heroDirection || 'fwd';
    if (s <= 0 || dir === 'off') return;
    var step = (dir === 'back') ? -1 : 1;
    autoTimer = setInterval(function () { go(active + step); }, s * 1000);
  }
  function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
  function restartAuto() { startAuto(); }

  function bindSwipe() { /* superseded by wireHeroDrag */ }

  /* ════════════════════════════════════════════════════════════
     LANGUAGE SWITCH
     ════════════════════════════════════════════════════════════ */
  function setLang(lang, skipStore) {
    lang = (lang === 'fr' || lang === 'en') ? lang : 'ar';
    LANG = lang;
    if (!skipStore) { try { localStorage.setItem(LANG_KEY, lang); } catch (e) {} }
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // switch buttons state
    $$('#langSwitch button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });

    // re-render text + data sections
    applyStaticI18n();
    buildTrust();
    buildFilters();
    buildCatalog();
    buildReviews();
    buildSocials();
    refreshWa();
    updatePlacard(true);
    var sp = $('#story-portrait'); if (sp) setArt(sp, portraitURI());
    buildDetail();

    // headings font: in FR drop the AR-head inline override so the stylesheet's Latin font wins
    applyTweaks();
    buildTweaksPanel();   // rebuild panel labels in the active language
    wireReveal();         // re-observe freshly built reveal nodes

    // notify feature modules of language change
    window.__LANG = lang;
    window.dispatchEvent(new Event('langchange'));
  }

  function wireLang() {
    var sw = $('#langSwitch'); if (!sw) return;
    sw.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      setLang(b.dataset.lang);
    });
  }

  /* ════════════════════════════════════════════════════════════
     NAV / SCROLL / REVEAL / CURSOR / PARALLAX
     ════════════════════════════════════════════════════════════ */
  function wireThemeToggle() {
    var tt = $('#themeToggle'); if (!tt) return;
    if (tt.__bound) return; tt.__bound = true;
    tt.addEventListener('click', function () {
      setTweak('theme', T.theme === 'maison' ? 'gallery' : 'maison');
    });
  }

  function wireNav() {
    var nav = $('#nav');
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 30); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }

  var revealIO = null;
  function wireReveal() {
    if (!('IntersectionObserver' in window)) { $$('.reveal').forEach(function (e) { e.classList.add('in'); }); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }
    $$('.reveal').forEach(function (e) { if (!e.classList.contains('in')) revealIO.observe(e); });
  }

  function wireKeys() {
    window.addEventListener('keydown', function (e) {
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === 'ArrowLeft') go(active + 1);
      else if (e.key === 'ArrowRight') go(active - 1);
    });
  }

  function wireParallax() {
    var head = $('.hero-head'), ticking = false;
    function upd() {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        head.style.transform = 'translateY(' + (y * 0.18) + 'px)';
        head.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.6)));
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  }

  /* ─── cursor: off / dot / ring ─── */
  var cursorInit = false;
  function wireCursor(style) {
    var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    document.body.classList.remove('cur-dot', 'cur-ring');
    if (!fine || style === 'off') { document.body.classList.remove('cur-ready'); return; }
    document.body.classList.add(style === 'ring' ? 'cur-ring' : 'cur-dot');
    if (cursorInit) return;
    cursorInit = true;
    var dot = $('#curDot'), ring = $('#curRing');
    var rx = window.innerWidth / 2, ry = window.innerHeight / 2, tx = rx, ty = ry;
    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = 'translate(' + tx + 'px,' + ty + 'px) translate(-50%,-50%)';
      document.body.classList.add('cur-ready');
    });
    (function loop() {
      rx += (tx - rx) * 0.3; ry += (ty - ry) * 0.3;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      var hot = e.target.closest && e.target.closest('a,button,.frame,.dot,.filter,.card');
      dot.classList.toggle('hot', !!hot);
      ring.classList.toggle('hot', !!hot);
    });
  }

  /* ════════════════════════════════════════════════════════════
     TWEAKS  (vanilla — host protocol compatible)
     ════════════════════════════════════════════════════════════ */
  var TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "maison",
    "goldTone": ["#D4AF37", "#E8C547", "#9A7B26"],
    "bgDepth": "charcoal",
    "arHead": "Amiri",
    "heroVariant": "coverflow",
    "heroMotion": "balanced",
    "heroDirection": "fwd",
    "heroSpeed": 5,
    "cursorStyle": "dot"
  }/*EDITMODE-END*/;

  var T = window.__T = Object.assign({}, TWEAK_DEFAULTS);
  T.theme = 'maison';

  var BG = {
    charcoal: ['#0A0A0A', '#141414', '#080808', '#050505'],
    deep:     ['#050505', '#101010', '#030303', '#000000'],
    warm:     ['#0C0A08', '#161310', '#0A0806', '#070504']
  };

  function applyTweaks() {
    var rs = document.documentElement.style;
    // theme attribute on <html>
    if (T.theme === 'maison') {
      document.documentElement.setAttribute('data-theme', 'maison');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try { localStorage.setItem(THEME_KEY, T.theme); } catch (e) {}
    var tt = $('#themeToggle');
    if (tt) tt.setAttribute('aria-pressed', T.theme === 'maison' ? 'true' : 'false');
    // gold tone only meaningful in gallery theme
    if (T.theme !== 'maison') {
      var g = Array.isArray(T.goldTone) ? T.goldTone : [T.goldTone, T.goldTone, T.goldTone];
      rs.setProperty('--gold', g[0]);
      rs.setProperty('--gold-light', g[1] || g[0]);
      rs.setProperty('--gold-deep', g[2] || g[0]);
      var b = BG[T.bgDepth] || BG.charcoal;
      rs.setProperty('--bg', b[0]); rs.setProperty('--bg-2', b[1]); rs.setProperty('--bg-3', b[2]); rs.setProperty('--bg-4', b[3]);
    } else {
      // let the [data-theme="maison"] block win
      rs.removeProperty('--gold');
      rs.removeProperty('--gold-light');
      rs.removeProperty('--gold-deep');
      rs.removeProperty('--bg');
      rs.removeProperty('--bg-2');
      rs.removeProperty('--bg-3');
      rs.removeProperty('--bg-4');
    }
    // heading font: in FR/EN drop the AR-head inline override so the stylesheet's Latin font wins
    if (LANG !== 'ar') {
      rs.removeProperty('--ar-head');
    } else {
      var fonts = { 'Amiri': "'Amiri', serif", 'Aref Ruqaa': "'Aref Ruqaa', serif", 'Reem Kufi': "'Reem Kufi', sans-serif" };
      rs.setProperty('--ar-head', fonts[T.arHead] || fonts.Amiri);
    }
    if (gallery) { gallery.dataset.variant = T.heroVariant; layout(); }
    startAuto();
    wireCursor(T.cursorStyle);
  }

  function setTweak(key, val) {
    T[key] = val;
    var edits = {}; edits[key] = val;
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: edits }, '*'); } catch (e) {}
    applyTweaks();
    if (key === 'theme') buildTweaksPanel(); // rebuild to hide/show gold/bg/font controls
  }

  var tweakMsgBound = false;
  function buildTweaksPanel() {
    var mount = $('#tweaksMount'); if (!mount) return;
    if (!$('#twkStyle')) { var st = el('style'); st.id = 'twkStyle'; st.textContent = TWK_CSS; document.head.appendChild(st); }
    var existing = $('.twk', mount);
    var wasOpen = existing ? (existing.style.display === 'flex') : false;
    mount.innerHTML = '';

    var panel = el('div', 'twk'); panel.setAttribute('dir', LANG === 'ar' ? 'rtl' : 'ltr');
    panel.style.display = wasOpen ? 'flex' : 'none';
    panel.innerHTML =
      '<div class="twk-hd"><b>' + t('twk.title') + '</b><button class="twk-x" aria-label="✕">✕</button></div>' +
      '<div class="twk-bd"></div>';
    mount.appendChild(panel);
    var bd = $('.twk-bd', panel);

    bd.appendChild(section(t('twk.look')));
    bd.appendChild(seg(t('twk.theme'), 'theme', [['gallery', t('twk.theme.gallery')], ['maison', t('twk.theme.maison')]]));
    if (T.theme !== 'maison') {
      bd.appendChild(swatches(t('twk.gold'), 'goldTone', [
      ['#D4AF37', '#E8C547', '#9A7B26'],
      ['#C9A227', '#E4C95B', '#8A6E1F'],
      ['#CBB378', '#E6D29A', '#9A8450'],
      ['#B8915A', '#D8B584', '#86643A']
    ]));
    bd.appendChild(seg(t('twk.bg'), 'bgDepth', [['charcoal', t('twk.bg.charcoal')], ['deep', t('twk.bg.deep')], ['warm', t('twk.bg.warm')]]));
    }
    if (LANG === 'ar' && T.theme !== 'maison') bd.appendChild(selectCtl(t('twk.head'), 'arHead', ['Amiri', 'Aref Ruqaa', 'Reem Kufi']));

    bd.appendChild(section(t('twk.gallery')));
    bd.appendChild(seg(t('twk.layout'), 'heroVariant', [['coverflow', t('twk.lay.coverflow')], ['flat', t('twk.lay.flat')], ['spotlight', t('twk.lay.spotlight')]]));
    bd.appendChild(seg(t('twk.motion'), 'heroMotion', [['subtle', t('twk.mot.subtle')], ['balanced', t('twk.mot.balanced')], ['dramatic', t('twk.mot.dramatic')]]));
    bd.appendChild(seg(t('twk.dir'), 'heroDirection', [['fwd', t('twk.dir.fwd')], ['back', t('twk.dir.back')], ['off', t('twk.dir.off')]]));
    bd.appendChild(slider(t('twk.speed'), 'heroSpeed', 0, 15, 1, t('twk.sec')));
    bd.appendChild(seg(t('twk.cursor'), 'cursorStyle', [['off', t('twk.cur.off')], ['dot', t('twk.cur.dot')], ['ring', t('twk.cur.ring')]]));

    $('.twk-x', panel).addEventListener('click', function () {
      panel.style.display = 'none';
      try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
    });

    if (!tweakMsgBound) {
      tweakMsgBound = true;
      window.addEventListener('message', function (e) {
        var ty = e && e.data && e.data.type;
        var p = $('.twk', $('#tweaksMount'));
        if (!p) return;
        if (ty === '__activate_edit_mode') p.style.display = 'flex';
        else if (ty === '__deactivate_edit_mode') p.style.display = 'none';
      });
      try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
    }

    /* ── control factories ── */
    function section(label) { return el('div', 'twk-sect', label); }
    function row(label) { var r = el('div', 'twk-row'); r.innerHTML = '<div class="twk-lbl"><span>' + label + '</span></div>'; return r; }

    function swatches(label, key, opts) {
      var r = row(label), chips = el('div', 'twk-chips');
      opts.forEach(function (pal) {
        var c = el('button', 'twk-chip'); c.type = 'button';
        c.style.background = pal[0];
        c.innerHTML = '<span><i style="background:' + (pal[1] || pal[0]) + '"></i><i style="background:' + (pal[2] || pal[0]) + '"></i></span>';
        if (JSON.stringify(T[key]) === JSON.stringify(pal)) c.dataset.on = '1';
        c.addEventListener('click', function () {
          setTweak(key, pal);
          $$('.twk-chip', chips).forEach(function (x) { x.dataset.on = '0'; });
          c.dataset.on = '1';
        });
        chips.appendChild(c);
      });
      r.appendChild(chips); return r;
    }

    function seg(label, key, opts) {
      var r = row(label), s = el('div', 'twk-seg');
      opts.forEach(function (o) {
        var b = el('button', null, o[1]); b.type = 'button'; b.dataset.val = o[0];
        if (T[key] === o[0]) b.dataset.on = '1';
        b.addEventListener('click', function () {
          setTweak(key, o[0]);
          $$('button', s).forEach(function (x) { x.dataset.on = '0'; });
          b.dataset.on = '1';
        });
        s.appendChild(b);
      });
      r.appendChild(s); return r;
    }

    function selectCtl(label, key, opts) {
      var r = row(label), sel = el('select', 'twk-field');
      opts.forEach(function (o) { var op = el('option', null, o); op.value = o; if (T[key] === o) op.selected = true; sel.appendChild(op); });
      sel.style.fontFamily = "'Amiri', serif";
      sel.addEventListener('change', function () { setTweak(key, sel.value); });
      r.appendChild(sel); return r;
    }

    function slider(label, key, min, max, step, unit) {
      var r = el('div', 'twk-row');
      r.innerHTML = '<div class="twk-lbl"><span>' + label + '</span><span class="twk-val">' + tval(T[key], unit) + '</span></div>';
      var inp = el('input', 'twk-slider'); inp.type = 'range'; inp.min = min; inp.max = max; inp.step = step; inp.value = T[key];
      inp.addEventListener('input', function () {
        var v = Number(inp.value); $('.twk-val', r).textContent = tval(v, unit); setTweak(key, v);
      });
      r.appendChild(inp); return r;
    }
    function tval(v, unit) { return v <= 0 ? t('twk.off') : (v + ' ' + unit); }
  }

  var TWK_CSS =
    '.twk{position:fixed;inset-inline-start:16px;bottom:16px;z-index:2147483646;width:264px;max-height:calc(100vh - 32px);' +
    'display:flex;flex-direction:column;background:rgba(16,15,13,.86);color:#F5F1E8;' +
    '-webkit-backdrop-filter:blur(22px) saturate(150%);backdrop-filter:blur(22px) saturate(150%);' +
    'border:.5px solid rgba(212,175,55,.35);border-radius:14px;box-shadow:0 16px 50px rgba(0,0,0,.5);' +
    "font:12px/1.5 'Tajawal',system-ui,sans-serif;overflow:hidden}" +
    '.twk-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:.5px solid rgba(212,175,55,.18)}' +
    ".twk-hd b{font-family:'Amiri',serif;font-size:15px;color:#D4AF37;font-weight:700}" +
    '.twk-x{border:0;background:transparent;color:rgba(245,241,232,.5);width:24px;height:24px;border-radius:6px;font-size:13px}' +
    '.twk-x:hover{background:rgba(255,255,255,.08);color:#F5F1E8}' +
    '.twk-bd{padding:6px 14px 16px;display:flex;flex-direction:column;gap:11px;overflow-y:auto;scrollbar-width:thin}' +
    '.twk-bd::-webkit-scrollbar{width:7px}.twk-bd::-webkit-scrollbar-thumb{background:rgba(212,175,55,.25);border-radius:4px}' +
    '.twk-sect{font-size:10px;font-weight:700;letter-spacing:.08em;color:rgba(212,175,55,.7);padding-top:8px}.twk-sect:first-child{padding-top:2px}' +
    '.twk-row{display:flex;flex-direction:column;gap:7px}.twk-row-h{flex-direction:row;align-items:center;justify-content:space-between}' +
    '.twk-lbl{display:flex;justify-content:space-between;align-items:baseline;color:rgba(245,241,232,.85)}.twk-lbl>span:first-child{font-weight:500}' +
    ".twk-val{color:rgba(212,175,55,.85);font-family:'Cormorant Garamond',serif;font-size:14px}" +
    '.twk-chips{display:flex;gap:7px}' +
    '.twk-chip{position:relative;flex:1;height:42px;border:0;border-radius:7px;overflow:hidden;cursor:pointer;' +
    'box-shadow:0 0 0 .5px rgba(255,255,255,.15)}' +
    '.twk-chip[data-on="1"]{box-shadow:0 0 0 2px #D4AF37,0 2px 8px rgba(0,0,0,.4)}' +
    '.twk-chip>span{position:absolute;top:0;bottom:0;inset-inline-start:0;width:34%;display:flex;flex-direction:column}' +
    '.twk-chip>span>i{flex:1}' +
    '.twk-seg{display:flex;padding:3px;border-radius:9px;background:rgba(255,255,255,.07);gap:2px}' +
    '.twk-seg button{flex:1;border:0;background:transparent;color:rgba(245,241,232,.7);font:inherit;font-weight:500;' +
    'padding:6px 4px;border-radius:6px;cursor:pointer;transition:all .2s}' +
    '.twk-seg button[data-on="1"]{background:#D4AF37;color:#0A0A0A}' +
    '.twk-field{width:100%;height:30px;padding:0 10px;border:.5px solid rgba(212,175,55,.3);border-radius:7px;' +
    'background:rgba(255,255,255,.05);color:#F5F1E8;font:inherit;outline:none}' +
    '.twk-field option{background:#161310;color:#F5F1E8}' +
    '.twk-slider{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:99px;background:rgba(212,175,55,.25);outline:none}' +
    '.twk-slider::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#D4AF37;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.5)}' +
    '.twk-slider::-moz-range-thumb{width:15px;height:15px;border:0;border-radius:50%;background:#D4AF37;cursor:pointer}';

  /* ════════════════════════════════════════════════════════════
     DETAIL LIGHTBOX  (cinematic FLIP + golden star burst)
     ════════════════════════════════════════════════════════════ */
  var detailEl = null, dCurIdx = 0, dCurM = null, dOrigin = null;
  var BOX_SIZES = [6, 12, 20, 50];
  var dBoxSize = 6;
  var dPicks = {};   /* idx -> count */
  var DMODE = 'single';   /* 'single' | 'preset' | 'custom' | 'ai' */
  var dPresetKey = null;

  /* delivery state — persisted across opens so the user re-orders quickly */
  var DEL_KEY = 'doriyums_del';
  var DEL_OPTIONS = [
    { key:'pickup', fee:0,    labelK:'del.pickup', hintK:'del.pickup.h' },
    { key:'alger',  fee:500,  labelK:'del.alger',  hintK:'del.alger.h'  },
    { key:'near',   fee:800,  labelK:'del.near',   hintK:'del.near.h'   },
    { key:'far',    fee:1000, labelK:'del.far',    hintK:'del.far.h'    }
  ];
  var dDel = { mode:'pickup', phone:'', addr:'', note:'' };
  try { var saved = JSON.parse(localStorage.getItem(DEL_KEY) || 'null'); if (saved) Object.assign(dDel, saved); } catch (e) {}
  function delFee() { var o = DEL_OPTIONS.filter(function(o){return o.key===dDel.mode;})[0]; return o ? o.fee : 0; }
  function persistDel() { try { localStorage.setItem(DEL_KEY, JSON.stringify(dDel)); } catch (e) {} }

  /* curated chef's mixes per box size — every preset sums to its box size */
  var PRESETS = {
    6: [
      { key:'class', picks:{ 0:2, 2:2, 8:2 },
        name:{ ar:'الكلاسيك', fr:'Classique', en:'Classic' },
        hint:{ ar:'ورد · شوكولا · فانيلا', fr:'Rose · Chocolat · Vanille', en:'Rose · Chocolate · Vanilla' } },
      { key:'trad', picks:{ 3:2, 1:2, 8:2 },
        name:{ ar:'التقليدية', fr:'Tradition', en:'Tradition' },
        hint:{ ar:'كراميل · فستق · فانيلا', fr:'Caramel · Pistache · Vanille', en:'Caramel · Pistachio · Vanilla' } },
      { key:'gold', picks:{ 0:2, 10:2, 1:2 },
        name:{ ar:'الذهبيّة', fr:"Galerie d'or", en:'Gold Gallery' },
        hint:{ ar:'ورد · كراميل · فستق', fr:'Rose · Caramel · Pistache', en:'Rose · Caramel · Pistachio' } }
    ],
    12: [
      { key:'fam', picks:{ 0:2, 2:2, 9:2, 3:2, 1:2, 8:2 },
        name:{ ar:'العائلية', fr:'Famille', en:'Family' },
        hint:{ ar:'ستّ نكهات خالدة', fr:'Six classiques intemporels', en:'Six timeless classics' } },
      { key:'disco', picks:{ 0:1, 1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 7:1, 8:1, 9:1, 10:1, 11:1 },
        name:{ ar:'رحلة الاستكشاف', fr:'Découverte', en:'Discovery' },
        hint:{ ar:'كلّ النكهات في علبة واحدة', fr:'Toutes les saveurs en une boîte', en:'Every flavour in one box' } },
      { key:'lux', picks:{ 0:2, 10:2, 1:2, 11:2, 6:2, 7:2 },
        name:{ ar:'الفاخرة', fr:'Premium', en:'Premium' },
        hint:{ ar:'تشكيلة راقية للمناسبات', fr:'Sélection raffinée', en:'Refined selection' } }
    ],
    20: [
      { key:'grand', picks:{ 0:3, 2:3, 9:3, 3:2, 1:2, 8:2, 4:2, 6:2, 7:1 },
        name:{ ar:'الكبرى', fr:'Grande Sélection', en:'Grand Selection' },
        hint:{ ar:'توازن بين الكلاسيك والفواكه', fr:'Équilibre classiques & fruits', en:'Classics & fruit, balanced' } },
      { key:'wed', picks:{ 0:3, 1:3, 10:2, 9:3, 6:2, 7:2, 11:2, 2:3 },
        name:{ ar:'العرس', fr:'Mariage', en:'Wedding' },
        hint:{ ar:'للحفلات الثمينة', fr:'Pour les grandes célébrations', en:'For grand celebrations' } }
    ],
    50: [
      { key:'rec', picks:{ 0:5, 1:5, 2:5, 3:5, 9:5, 8:4, 4:4, 6:4, 7:4, 5:4, 10:3, 11:2 },
        name:{ ar:'الاستقبال', fr:'Réception', en:'Reception' },
        hint:{ ar:'كلّ النكهات، توزيع خبير', fr:'Toutes les saveurs, dosées', en:'Every flavour, perfectly dosed' } },
      { key:'lux50', picks:{ 0:6, 10:5, 1:5, 11:5, 9:4, 2:4, 3:4, 6:4, 7:4, 5:3, 8:3, 4:3 },
        name:{ ar:'الملوكية', fr:'Royale', en:'Royal' },
        hint:{ ar:'تركيز على التوقيعات الفاخرة', fr:'Cap sur les signatures prestige', en:'Prestige signatures, generously' } }
    ]
  };

  var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.52 11.97c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.48 1.07 2.48.71 2.93.67.45-.04 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18z"/></svg>';

  function buildDetail() {
    if (detailEl) detailEl.remove();
    detailEl = el('div', 'detail'); detailEl.id = 'detail'; detailEl.hidden = true;
    detailEl.innerHTML =
      '<div class="detail-backdrop"></div>' +
      '<button class="detail-close" type="button" aria-label="close">✕</button>' +
      '<div class="detail-inner">' +
        '<div class="detail-stage">' +
          '<div class="detail-frame gframe"><div class="mat"><div class="art">' +
            '<img class="detail-img" alt="" />' +
            '<span class="glass"></span>' +
          '</div></div></div>' +
        '</div>' +
        '<div class="detail-info">' +
          '<div class="di-roman"></div>' +
          '<h3 class="di-name"></h3>' +
          '<div class="di-flavor"></div>' +
          '<p class="di-note"></p>' +
          '<div class="di-rule"></div>' +

          '<div class="di-modes" role="tablist"></div>' +

          '<div class="di-section">' +
            '<div class="di-section-h"><span class="di-section-l"></span><span class="di-box-cap"></span></div>' +
            '<div class="di-boxes" role="radiogroup"></div>' +
          '</div>' +

          '<div class="di-mode-body"></div>' +

          '<div class="di-section di-delivery">' +
            '<div class="di-section-h"><span class="di-del-l"></span><span class="di-del-fee lat"></span></div>' +
            '<div class="del-opts" role="radiogroup"></div>' +
            '<div class="del-form"></div>' +
          '</div>' +

          '<div class="di-total"></div>' +
          '<button class="di-order" type="button"><span class="di-order-t"></span>' + WA_ICON + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(detailEl);

    $('.detail-close', detailEl).addEventListener('click', closeDetail);
    $('.detail-backdrop', detailEl).addEventListener('click', closeDetail);
    $('.di-order', detailEl).addEventListener('click', function () {
      if (totalPieces() === 0) { flashEmpty(); return; }
      if (dDel.mode !== 'pickup' && !dDel.phone.trim()) { flashDeliveryField('.del-phone'); return; }
      if (dDel.mode !== 'pickup' && !dDel.addr.trim()) { flashDeliveryField('.del-addr'); return; }
      var r = this.getBoundingClientRect();
      starBurst(r.left + r.width / 2, r.top + r.height / 2);
      setTimeout(function () { starBurst(window.innerWidth / 2, window.innerHeight * 0.42, true); }, 130);
      var url = waOrder();
      setTimeout(function () { window.open(url, '_blank', 'noopener'); }, 1000);
    });
  }

  function flashDeliveryField(sel) {
    var f = $(sel, detailEl); if (!f) return;
    f.classList.add('shake'); f.focus();
    setTimeout(function () { f.classList.remove('shake'); }, 500);
  }

  function flashEmpty() {
    var btn = $('.di-order', detailEl);
    btn.classList.add('shake'); setTimeout(function () { btn.classList.remove('shake'); }, 500);
  }

  function totalPieces() {
    var s = 0; for (var k in dPicks) s += dPicks[k] || 0; return s;
  }
  function totalPrice() {
    var s = 0; for (var k in dPicks) { var q = dPicks[k] || 0; if (q) s += MACARONS[k].price * q; } return s;
  }

  /* ── MODE TABS ── */
  var MODE_ICONS = {
    single:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/></svg>',
    preset:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><circle cx="12" cy="16" r="3"/></svg>',
    custom:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h11"/><path d="M5 7h7"/><path d="M5 17h13"/><circle cx="19" cy="12" r="2"/><circle cx="15" cy="7" r="2"/></svg>',
    ai:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l1.4 4.6L18 10l-4.6 1.4L12 16l-1.4-4.6L6 10l4.6-1.4z"/></svg>'
  };

  function renderModeTabs() {
    var host = $('.di-modes', detailEl);
    host.innerHTML = '';
    ['single','custom'].forEach(function (m) {
      var b = el('button', 'di-mode' + (m === DMODE ? ' on' : ''));
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', m === DMODE ? 'true' : 'false');
      b.innerHTML = MODE_ICONS[m] + '<span>' + t('mode.' + m) + '</span>';
      b.addEventListener('click', function () { switchMode(m); });
      host.appendChild(b);
    });
  }

  function switchMode(m) {
    if (m === DMODE) return;
    DMODE = m;
    if (m === 'single') {
      dPicks = {}; dPicks[dCurIdx] = dBoxSize;
      dPresetKey = null;
    } else if (m === 'preset') {
      dPresetKey = null;
      dPicks = {};
    } else if (m === 'ai') {
      /* keep picks for review */
    }
    renderModeTabs(); renderModeBody(); renderTotals();
  }

  function renderModeBody() {
    var body = $('.di-mode-body', detailEl);
    body.innerHTML = '';
    if (DMODE === 'single')      body.appendChild(renderSingleMode());
    else if (DMODE === 'preset') body.appendChild(renderPresetMode());
    else if (DMODE === 'custom') body.appendChild(renderCustomMode());
    else if (DMODE === 'ai')     body.appendChild(renderAIMode());
  }

  /* ── BOX SIZE ── */
  function renderBoxes() {
    var host = $('.di-boxes', detailEl);
    host.innerHTML = '';
    BOX_SIZES.forEach(function (n) {
      var b = el('button', 'di-box' + (n === dBoxSize ? ' on' : ''));
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', n === dBoxSize ? 'true' : 'false');
      b.innerHTML =
        '<span class="di-box-n lat">' + n + '</span>' +
        '<span class="di-box-u">' + t('detail.pcs') + '</span>';
      b.addEventListener('click', function () { setBoxSize(n); });
      host.appendChild(b);
    });
    $('.di-box-cap', detailEl).innerHTML = '<span class="lat">' + dBoxSize + '</span> ' + t('detail.pcs');
  }

  function setBoxSize(n) {
    dBoxSize = n;
    if (DMODE === 'single') {
      dPicks = {}; dPicks[dCurIdx] = dBoxSize;
    } else if (DMODE === 'preset') {
      dPresetKey = null; dPicks = {};
    } else if (DMODE === 'custom') {
      /* trim from highest-qty flavors */
      var keys = Object.keys(dPicks).sort(function (a, b) { return (dPicks[b] || 0) - (dPicks[a] || 0); });
      while (totalPieces() > dBoxSize) {
        for (var i = 0; i < keys.length && totalPieces() > dBoxSize; i++) {
          if (dPicks[keys[i]] > 0) dPicks[keys[i]]--;
        }
      }
    } else if (DMODE === 'ai') {
      dPicks = {};
    }
    renderBoxes(); renderModeBody(); renderTotals();
  }

  /* ── MODE: SINGLE ── */
  function renderSingleMode() {
    var wrap = el('div', 'mode-single');
    var disc = '<span class="ms-disc" style="background:' + dCurM.shell + ';">' +
      '<span class="ms-cream" style="background:' + dCurM.cream + ';"></span></span>';
    wrap.innerHTML =
      '<div class="ms-card">' +
        disc +
        '<div class="ms-meta">' +
          '<div class="ms-l">' + t('detail.box') + ' · <span class="lat">' + dBoxSize + '</span> ' + t('detail.pcs') + '</div>' +
          '<div class="ms-name">' + pName(dCurM) + '</div>' +
          '<div class="ms-flavor">' + pSub(dCurM) + '</div>' +
        '</div>' +
      '</div>';
    return wrap;
  }

  /* ── MODE: PRESET ── */
  function renderPresetMode() {
    var wrap = el('div', 'mode-preset');
    var list = PRESETS[dBoxSize] || [];
    list.forEach(function (p) {
      var card = el('button', 'mp-card' + (p.key === dPresetKey ? ' on' : ''));
      card.type = 'button';
      var pickList = Object.keys(p.picks);
      var total = pickList.reduce(function (s, idx) { return s + MACARONS[idx].price * p.picks[idx]; }, 0);
      var swatches = pickList.map(function (idx) {
        return '<span class="mp-sw" style="background:' + MACARONS[idx].shell + ';" title="' + pName(MACARONS[idx]) + '"></span>';
      }).join('');
      card.innerHTML =
        '<div class="mp-swatches">' + swatches + '</div>' +
        '<div class="mp-meta">' +
          '<div class="mp-name">' + (p.name[LANG] || p.name.ar) + '</div>' +
          '<div class="mp-hint">' + (p.hint[LANG] || p.hint.ar) + '</div>' +
        '</div>' +
        '<div class="mp-price lat">' + total.toLocaleString('fr-FR') + ' ' + t('curr') + '</div>';
      card.addEventListener('click', function () {
        dPresetKey = p.key;
        dPicks = {};
        Object.keys(p.picks).forEach(function (idx) { dPicks[idx] = p.picks[idx]; });
        renderModeBody(); renderTotals();
      });
      wrap.appendChild(card);
    });
    return wrap;
  }

  /* ── MODE: CUSTOM ── */
  function renderCustomMode() {
    var wrap = el('div', 'mode-custom');
    wrap.innerHTML =
      '<div class="di-section-h cm-h"><span class="di-pick-l">' + t('detail.pick') + '</span><span class="di-remain"></span></div>' +
      '<div class="di-flavors"></div>';
    var host = $('.di-flavors', wrap);
    MACARONS.forEach(function (m, idx) {
      var q = dPicks[idx] || 0;
      var row = el('div', 'fv-row' + (q > 0 ? ' picked' : '') + (idx === dCurIdx ? ' featured' : ''));
      row.dataset.idx = idx;
      row.innerHTML =
        '<span class="fv-swatch" style="background:' + m.shell + ';"></span>' +
        '<span class="fv-meta">' +
          '<span class="fv-name">' + pName(m) + '</span>' +
          '<span class="fv-price lat">' + m.price + ' ' + t('curr') + '</span>' +
        '</span>' +
        '<span class="fv-step">' +
          '<button type="button" class="fv-minus" aria-label="-">−</button>' +
          '<span class="fv-q lat">' + q + '</span>' +
          '<button type="button" class="fv-plus" aria-label="+">+</button>' +
        '</span>';
      row.querySelector('.fv-minus').addEventListener('click', function () { bumpPick(idx, -1); });
      row.querySelector('.fv-plus').addEventListener('click',  function () { bumpPick(idx,  1); });
      host.appendChild(row);
    });
    return wrap;
  }

  function bumpPick(idx, d) {
    var cur = dPicks[idx] || 0;
    var next = cur + d;
    if (next < 0) next = 0;
    var others = totalPieces() - cur;
    if (next + others > dBoxSize && idx !== dCurIdx && (dPicks[dCurIdx] || 0) > 0) {
      var need = (next + others) - dBoxSize;
      var take = Math.min(need, dPicks[dCurIdx]);
      dPicks[dCurIdx] -= take;
      others -= take;
    }
    if (next + others > dBoxSize) next = dBoxSize - others;
    if (next < 0) next = 0;
    if (next === cur) return;
    dPicks[idx] = next;
    renderModeBody(); renderTotals();
  }

  /* ── MODE: AI ── */
  function renderAIMode() {
    var wrap = el('div', 'mode-ai');
    wrap.innerHTML =
      '<label class="ai-l">' + t('ai.label') + '</label>' +
      '<div class="ai-input-row">' +
        '<input type="text" class="ai-input" placeholder="' + t('ai.placeholder') + '" />' +
        '<button type="button" class="ai-suggest">' + MODE_ICONS.ai + '<span>' + t('ai.suggest') + '</span></button>' +
      '</div>' +
      '<div class="ai-status" aria-live="polite"></div>';
    var input = $('.ai-input', wrap);
    var btn = $('.ai-suggest', wrap);
    var status = $('.ai-status', wrap);
    function go() {
      var occ = (input.value || '').trim();
      if (!occ) { input.focus(); return; }
      runAI(occ, status, btn);
    }
    btn.addEventListener('click', go);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
    setTimeout(function () { try { input.focus(); } catch (e) {} }, 60);
    return wrap;
  }

  function runAI(occasion, status, btn) {
    btn.disabled = true;
    status.className = 'ai-status loading';
    status.innerHTML = '<span class="ai-spin"></span>' + t('ai.loading');

    var menu = MACARONS.map(function (m, i) { return i + '. ' + m.flavor + ' (' + m.price + ' DA, ' + m.cat + ')'; }).join('\n');
    var prompt =
      'You are a French pastry chef at Dori Yums, a fine macaron house in Algiers.\n' +
      'Compose a box of EXACTLY ' + dBoxSize + ' macarons that perfectly fits this occasion: "' + occasion + '".\n\n' +
      'Menu (indices are stable):\n' + menu + '\n\n' +
      'Rules:\n' +
      '- Use 3 to ' + Math.min(dBoxSize, 8) + ' different flavours.\n' +
      '- Quantities must sum to EXACTLY ' + dBoxSize + '.\n' +
      '- Match the flavours to the occasion (e.g. wedding → rose/prestige; kids → sweeter classics; dinner → chocolate/coffee/refined).\n\n' +
      'Return ONLY a JSON object — no prose, no markdown:\n' +
      '{"picks":[{"idx":<number>,"qty":<number>}, ...]}';

    function ok(out) {
      try {
        var match = String(out).match(/\{[\s\S]*\}/);
        if (!match) throw new Error('no json');
        var json = JSON.parse(match[0]);
        if (!json.picks || !json.picks.length) throw new Error('empty');
        var picks = {}; var total = 0;
        json.picks.forEach(function (p) {
          var i = +p.idx, q = +p.qty;
          if (i >= 0 && i < MACARONS.length && q > 0) { picks[i] = (picks[i] || 0) + q; total += q; }
        });
        if (total === 0) throw new Error('zero');
        /* normalize to exactly dBoxSize if model under/overshot */
        if (total !== dBoxSize) {
          var diff = dBoxSize - total;
          var keys = Object.keys(picks);
          if (diff > 0) {
            for (var k = 0; k < diff; k++) picks[keys[k % keys.length]]++;
          } else {
            keys.sort(function (a, b) { return picks[b] - picks[a]; });
            for (var j = 0; j < -diff; j++) {
              if (picks[keys[j % keys.length]] > 1) picks[keys[j % keys.length]]--;
            }
          }
        }
        dPicks = picks; dPresetKey = null;
        renderTotals();
        status.className = 'ai-status done';
        status.textContent = t('ai.done');
        setTimeout(function () { switchMode('custom'); }, 1100);
      } catch (e) {
        status.className = 'ai-status error';
        status.textContent = t('ai.error');
        btn.disabled = false;
      }
    }
    function fail() {
      /* fallback: pick a sensible default mix locally */
      var seed = occasion.length;
      var picks = {}, left = dBoxSize;
      var pool = [0, 11, 2, 3, 1, 9, 15, 12, 8, 14, 13].filter(function (i) { return i < MACARONS.length; });
      var per = Math.max(1, Math.floor(dBoxSize / 5));
      for (var i = 0; i < 5 && left > 0; i++) {
        var idx = pool[(i + seed) % pool.length];
        var q = Math.min(per, left);
        picks[idx] = (picks[idx] || 0) + q;
        left -= q;
      }
      while (left > 0) { var k = Object.keys(picks)[0]; picks[k]++; left--; }
      dPicks = picks; dPresetKey = null;
      renderTotals();
      status.className = 'ai-status done';
      status.textContent = t('ai.done');
      setTimeout(function () { switchMode('custom'); }, 1100);
    }

    if (window.claude && typeof window.claude.complete === 'function') {
      try {
        var p = window.claude.complete(prompt);
        if (p && typeof p.then === 'function') {
          p.then(ok).catch(function () { fail(); });
        } else { ok(p); }
      } catch (e) { fail(); }
    } else {
      setTimeout(fail, 900);
    }
  }

  /* ── TOTALS ── */
  function renderDelivery() {
    $('.di-del-l', detailEl).textContent = t('del.title');
    var fee = delFee();
    $('.di-del-fee', detailEl).innerHTML = fee === 0
      ? '<span class="del-free-tag">' + t('del.free') + '</span>'
      : t('del.fee') + ' · <b>' + fee.toLocaleString('fr-FR') + ' ' + t('curr') + '</b>';

    var opts = $('.del-opts', detailEl); opts.innerHTML = '';
    DEL_OPTIONS.forEach(function (o) {
      var b = el('button', 'del-opt' + (o.key === dDel.mode ? ' on' : ''));
      b.type = 'button'; b.setAttribute('role','radio'); b.setAttribute('aria-checked', o.key === dDel.mode ? 'true' : 'false');
      b.innerHTML =
        '<span class="del-opt-l">' + t(o.labelK) + '</span>' +
        '<span class="del-opt-h">' + t(o.hintK) + '</span>' +
        '<span class="del-opt-f lat">' + (o.fee === 0 ? t('del.free') : '+' + o.fee + ' ' + t('curr')) + '</span>';
      b.addEventListener('click', function () {
        dDel.mode = o.key;
        persistDel();
        renderDelivery(); renderTotals();
      });
      opts.appendChild(b);
    });

    var form = $('.del-form', detailEl);
    if (dDel.mode === 'pickup') {
      form.innerHTML =
        '<div class="del-pickup-card">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
          '<div><b>Alger</b> · <span class="del-pickup-phone lat"></span></div>' +
        '</div>' +
        '<div class="del-field">' +
          '<label class="del-l">' + t('del.phone.l') + '</label>' +
          '<input type="tel" class="del-phone lat" placeholder="' + t('del.phone.ph') + '" value="' + esc(dDel.phone) + '" inputmode="tel" />' +
        '</div>' +
        '<div class="del-field">' +
          '<label class="del-l">' + t('del.note.l') + '</label>' +
          '<textarea class="del-note" rows="2" placeholder="' + t('del.note.ph') + '">' + esc(dDel.note) + '</textarea>' +
        '</div>';
      var d = WA_NUMBER;
      $('.del-pickup-phone', detailEl).textContent = '+' + d.slice(0, 3) + ' ' + d.slice(3).replace(/(\d{3})(?=\d)/g, '$1 ').trim();
    } else {
      form.innerHTML =
        '<div class="del-field">' +
          '<label class="del-l">' + t('del.phone.l') + ' <span class="req">*</span></label>' +
          '<input type="tel" class="del-phone lat" placeholder="' + t('del.phone.ph') + '" value="' + esc(dDel.phone) + '" inputmode="tel" />' +
        '</div>' +
        '<div class="del-field">' +
          '<label class="del-l">' + t('del.addr.l') + ' <span class="req">*</span></label>' +
          '<input type="text" class="del-addr" placeholder="' + t('del.addr.ph') + '" value="' + esc(dDel.addr) + '" />' +
        '</div>' +
        '<div class="del-field">' +
          '<label class="del-l">' + t('del.note.l') + '</label>' +
          '<textarea class="del-note" rows="2" placeholder="' + t('del.note.ph') + '">' + esc(dDel.note) + '</textarea>' +
        '</div>';
    }

    var ph = $('.del-phone', detailEl); if (ph) ph.addEventListener('input', function () { dDel.phone = ph.value; persistDel(); });
    var ad = $('.del-addr',  detailEl); if (ad) ad.addEventListener('input', function () { dDel.addr  = ad.value; persistDel(); });
    var no = $('.del-note',  detailEl); if (no) no.addEventListener('input', function () { dDel.note  = no.value; persistDel(); });
  }

  function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }

  function renderTotals() {
    var have = totalPieces();
    var remain = Math.max(0, dBoxSize - have);
    var rem = $('.di-remain', detailEl);
    if (rem) {
      if (have === 0) {
        rem.innerHTML = '<em>' + t('detail.empty') + '</em>';
        rem.className = 'di-remain is-empty';
      } else if (remain === 0) {
        rem.innerHTML = '<span class="di-full">' + t('detail.full') + '</span>';
        rem.className = 'di-remain is-full';
      } else {
        rem.innerHTML = t('detail.remaining') + ' · <b class="lat">' + remain + '</b> ' + t('detail.of') + ' <span class="lat">' + dBoxSize + '</span>';
        rem.className = 'di-remain';
      }
    }
    var pieces = totalPrice();
    var fee = delFee();
    var grand = pieces + fee;
    var html = t('detail.total') + ' · <b><span class="lat">' + pieces.toLocaleString('fr-FR') + '</span> ' + t('curr') + '</b>';
    if (fee > 0) {
      html += '<span class="di-total-add">+ <span class="lat">' + fee.toLocaleString('fr-FR') + '</span> ' + t('curr') + ' ' + t('del.fee').toLowerCase() + '</span>';
      html += '<span class="di-total-grand">' + t('del.summary') + ' · <b><span class="lat">' + grand.toLocaleString('fr-FR') + '</span> ' + t('curr') + '</b></span>';
    }
    $('.di-total', detailEl).innerHTML = html;
  }

  function waOrder() {
    var lines = [t('wa.greet')];
    lines.push('');
    lines.push(t('wa.box') + ': ' + dBoxSize + ' ' + t('detail.pcs'));
    lines.push(t('wa.items') + ':');
    MACARONS.forEach(function (m, idx) {
      var q = dPicks[idx] || 0;
      if (q > 0) lines.push('  • ' + pName(m) + ' × ' + q);
    });
    lines.push('');
    var opt = DEL_OPTIONS.filter(function(o){return o.key===dDel.mode;})[0];
    lines.push(t('wa.delivery') + ': ' + t(opt.labelK) + ' (' + t(opt.hintK) + ')');
    if (dDel.phone) lines.push(t('wa.phone') + ': ' + dDel.phone);
    if (dDel.addr)  lines.push(t('wa.addr')  + ': ' + dDel.addr);
    if (dDel.note)  lines.push(t('wa.note')  + ': ' + dDel.note);
    lines.push('');
    lines.push(t('wa.total') + ': ' + totalPrice() + ' ' + t('curr'));
    if (delFee() > 0) {
      lines.push(t('wa.fee')   + ': ' + delFee()    + ' ' + t('curr'));
      lines.push(t('wa.grand') + ': ' + (totalPrice() + delFee()) + ' ' + t('curr'));
    }
    return waBase() + encodeURIComponent(lines.join('\n'));
  }

  /* expose detail state to extras (cart) */
  window.__getDetailState = function () {
    if (!dCurM) return null;
    return {
      idx: dCurIdx, size: dBoxSize,
      picks: Object.assign({}, dPicks),
      mode: DMODE, preset: dPresetKey,
      del: Object.assign({}, dDel),
      price: totalPrice(), fee: delFee(),
      name: pName(dCurM), flavor: pSub(dCurM),
      shell: dCurM.shell, cream: dCurM.cream
    };
  };
  window.__getMacaronName = function (idx) {
    var m = MACARONS[idx]; if (!m) return '';
    return pName(m) + ' · ' + pSub(m);
  };
  window.__getWaNumber = function () { return WA_NUMBER; };
  window.__totalPiecesNow = function () { return totalPieces(); };
  window.__closeDetail = function () { closeDetail(); };

  function fillDetail(idx) {
    var m = MACARONS[idx]; dCurM = m; dCurIdx = idx;
    DMODE = 'single';
    dPresetKey = null;
    dPicks = {}; dPicks[idx] = dBoxSize;
    $('.di-roman', detailEl).textContent = ROMAN[idx] || '';
    $('.di-name', detailEl).textContent = pName(m);
    $('.di-flavor', detailEl).textContent = pSub(m);
    $('.di-note', detailEl).textContent = t('note.' + m.cat) || '';
    $('.di-section-l', detailEl).textContent = t('detail.box');
    $('.di-order-t', detailEl).textContent = t('detail.order');
    renderModeTabs(); renderBoxes(); renderModeBody(); renderDelivery(); renderTotals();
  }

  function openDetail(idx, frameEl) {
    if (!detailEl) buildDetail();
    dOrigin = frameEl;
    fillDetail(idx);
    // mirror whatever the card currently shows (default art or a dropped photo)
    var src = macaronURI(MACARONS[idx], idx);
    try {
      var slot = frameEl.querySelector('image-slot');
      var im = slot && slot.shadowRoot && slot.shadowRoot.querySelector('.frame img');
      if (im && im.getAttribute('src')) src = im.src;
    } catch (e) {}
    $('.detail-img', detailEl).src = src;

    detailEl.hidden = false;
    document.body.classList.add('no-scroll');
    var df = $('.detail-frame', detailEl);
    df.style.transition = 'none';
    df.style.transform = 'none';
    var r1 = df.getBoundingClientRect();
    var r0 = frameEl.getBoundingClientRect();
    var dx = r0.left - r1.left, dy = r0.top - r1.top;
    var sx = r0.width / r1.width, sy = r0.height / r1.height;
    df.style.transformOrigin = 'top left';
    df.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
    df.getBoundingClientRect(); // force reflow
    requestAnimationFrame(function () {
      detailEl.classList.add('open');
      document.body.classList.add('detail-open');
      df.style.transition = 'transform .74s cubic-bezier(.66,0,.2,1)';
      df.style.transform = 'none';
    });
  }

  function closeDetail() {
    if (!detailEl || detailEl.hidden) return;
    var df = $('.detail-frame', detailEl);
    var r1 = df.getBoundingClientRect();
    detailEl.classList.remove('open');
    document.body.classList.remove('detail-open');
    if (dOrigin) {
      var r0 = dOrigin.getBoundingClientRect();
      var dx = r0.left - r1.left, dy = r0.top - r1.top;
      var sx = r0.width / r1.width, sy = r0.height / r1.height;
      df.style.transition = 'transform .55s cubic-bezier(.6,0,.3,1)';
      df.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
    }
    setTimeout(function () {
      detailEl.hidden = true;
      df.style.transition = 'none'; df.style.transform = 'none';
      document.body.classList.remove('no-scroll');
    }, 540);
  }

  /* ── golden star burst ── */
  var GOLDS = ['#D4AF37', '#E8C547', '#F2DE8A', '#C9A227', '#FAF3E0'];
  function starShape(color, sparkle) {
    var glow = 'filter:drop-shadow(0 0 4px ' + color + 'cc)';
    if (sparkle) return '<svg viewBox="0 0 24 24" fill="' + color + '" style="' + glow + '"><path d="M12 0c1.1 6.4 5.5 10.8 12 12-6.5 1.2-10.9 5.6-12 12-1.1-6.4-5.5-10.8-12-12 6.5-1.2 10.9-5.6 12-12z"/></svg>';
    return '<svg viewBox="0 0 24 24" fill="' + color + '" style="' + glow + '"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4 7.3 13.6 2.2 9.6l6.9-1z"/></svg>';
  }
  function starBurst(x, y, big) {
    var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    var layer = el('div', 'fx-layer'); document.body.appendChild(layer);

    var flash = el('div', 'fx-flash');
    flash.style.left = x + 'px'; flash.style.top = y + 'px';
    flash.style.width = flash.style.height = '180px';
    flash.style.animation = 'fxflash .5s ease-out forwards';
    layer.appendChild(flash);

    var ring = el('div', 'fx-ring');
    ring.style.left = x + 'px'; ring.style.top = y + 'px';
    ring.style.width = ring.style.height = '130px';
    ring.style.animation = 'fxshock .7s cubic-bezier(.2,.8,.2,1) forwards';
    layer.appendChild(ring);

    var N = reduce ? (big ? 28 : 22) : (big ? 70 : 50);
    var maxD = big ? 460 : 340;
    for (var i = 0; i < N; i++) {
      var s = el('div', 'fx-star');
      var ang = Math.random() * Math.PI * 2;
      var dist = 70 + Math.random() * maxD;
      var tx = Math.cos(ang) * dist, ty = Math.sin(ang) * dist - 50;
      var sc = 0.45 + Math.random() * 1.7;
      var rot = (Math.random() * 760 - 380) + 'deg';
      var size = 9 + Math.random() * 17;
      var col = GOLDS[i % GOLDS.length];
      s.style.left = x + 'px'; s.style.top = y + 'px';
      s.style.width = s.style.height = size + 'px';
      s.style.setProperty('--tx', tx + 'px');
      s.style.setProperty('--ty', ty + 'px');
      s.style.setProperty('--sc', sc);
      s.style.setProperty('--rot', rot);
      s.innerHTML = starShape(col, i % 4 === 0);
      var dur = 0.8 + Math.random() * 0.75;
      s.style.animation = 'fxfly ' + dur + 's cubic-bezier(.15,.7,.25,1) forwards';
      s.style.animationDelay = (Math.random() * 0.14) + 's';
      layer.appendChild(s);
    }
    setTimeout(function () { layer.remove(); }, 1900);
  }

  function wireDetailOpen() {
    var grid = $('#grid'); if (!grid) return;
    grid.addEventListener('click', function (e) {
      var hit = e.target.closest && e.target.closest('.cr-order, .card-frame');
      if (!hit) return;
      var card = hit.closest('.card'); if (!card) return;
      e.preventDefault();
      openDetail(parseInt(card.dataset.idx, 10), card.querySelector('.card-frame'));
    });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDetail(); });
  }

  /* ════════════════════════════════════════════════════════════
     INIT
     ════════════════════════════════════════════════════════════ */
  function init() {
    document.documentElement.lang = LANG;
    document.documentElement.dir = (LANG === 'ar') ? 'rtl' : 'ltr';
    $$('#langSwitch button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lang === LANG ? 'true' : 'false'); });

    applyStaticI18n();
    buildTrust();
    buildFilters();
    buildCatalog();
    buildReviews();
    buildSocials();
    buildHero();
    var sp = $('#story-portrait'); if (sp) setArt(sp, portraitURI());
    wireOrder();
    wireNav();
    wireLang();
    wireThemeToggle();
    buildDetail();
    wireDetailOpen();
    wireReveal();
    wireKeys();
    wireParallax();
    buildTweaksPanel();
    applyTweaks();
    window.addEventListener('resize', function () { layout(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
