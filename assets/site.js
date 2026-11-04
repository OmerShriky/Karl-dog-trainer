// The site of Karl Dog Trainer. All texts, images and links are in /content.json
(async () => {
  let C;
  try { C = await fetch('content.json', { cache: 'no-cache' }).then(r => r.json()); }
  catch (e) {
    const local = location.protocol === 'file:';
    document.getElementById('app').innerHTML = `<div style="max-width:560px;margin:60px auto;padding:28px;border-radius:24px;background:#F1E8F6;color:#2A1A33;font:17px/1.6 Rubik,Arial,sans-serif;text-align:right">${local
      ? '<h2 style="margin:0 0 10px">האתר צריך שרת כדי לעבוד</h2><p>פתחתם את הקובץ ישירות מהמחשב. הדפדפן חוסם במצב הזה את טעינת קובץ התוכן, ולכן העמוד לא מוצג. ב-Vercel האתר יעבוד כרגיל.</p><p>לצפייה במחשב: פותחים טרמינל בתיקייה של האתר, מריצים את הפקודה הזו, ופותחים את הכתובת שמופיעה:</p><p dir="ltr" style="text-align:left"><code>npx serve .</code></p>'
      : '<p>האתר לא נטען. נסו לרענן את העמוד.</p>'}</div>`;
    return;
  }
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const S = (d, inner) => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const ICONS = {
  whatsapp: S(0, '<path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .9a5 5 0 0 1-2.8-2.8l.9-1-1-2z"/>'),
  instagram: S(0, '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>'),
  facebook: S(0, '<path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4a20 20 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.3H9v3h2.5V21"/>'),
  easy: S(0, '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
  uniform: S(0, '<path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'),
  email: S(0, '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>'),
  phone: S(0, '<path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/>'),
  paw: S(0, '<circle cx="7" cy="10" r="1.7"/><circle cx="10.3" cy="6.3" r="1.7"/><circle cx="13.7" cy="6.3" r="1.7"/><circle cx="17" cy="10" r="1.7"/><path d="M12 11.5c-2.5 0-5 3.3-5 5.3 0 1.6 1.4 2.4 2.8 2.1 1-.2 1.5-.6 2.2-.6s1.2.4 2.2.6c1.4.3 2.8-.5 2.8-2.1 0-2-2.5-5.3-5-5.3z"/>'),
  arrow: S(0, '<path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/>'),
  plus: S(0, '<path d="M12 5v14M5 12h14"/>'),
  google: S(0, '<path d="M20 12.2c0-.6 0-1.1-.1-1.7H12v3.3h4.5a3.9 3.9 0 0 1-1.7 2.5"/><path d="M14.8 16.3A5 5 0 0 1 7.3 13.6"/><path d="M7 12a5 5 0 0 1 8.2-3.8"/><circle cx="12" cy="12" r="8.5"/>')
};
const STAR = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2.8l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3.1 1.2-6.3L2.9 9.4l6.3-.8z"/></svg>';
// Turns a review date like "2026-10-02" into "לפני חודש"
const timeAgo = (date) => {
  const d = new Date(date + 'T00:00:00');
  if (isNaN(d)) return '';
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const days = Math.round((today - d) / 86400000);
  const pick = (n, one, two, many) => n === 1 ? one : n === 2 ? two : `לפני ${n} ${many}`;
  if (days < 1) return 'היום';
  if (days < 7) return days === 1 ? 'אתמול' : `לפני ${days} ימים`;
  if (days < 30) return pick(Math.floor(days / 7), 'לפני שבוע', 'לפני שבועיים', 'שבועות');
  const months = Math.floor(days / 30.44);
  if (months < 12) return pick(Math.max(1, months), 'לפני חודש', 'לפני חודשיים', 'חודשים');
  return pick(Math.floor(months / 12), 'לפני שנה', 'לפני שנתיים', 'שנים');
};
const wa = (text) => `https://wa.me/${C.brand.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`;
const ext = 'target="_blank" rel="noopener"';

const ui = {
  C, esc, wa, ext,
  icon: n => ICONS[n] || '',
  stars: n => `<span class="stars" aria-label="${n} כוכבים">${STAR.repeat(n)}</span>`,
  nav: cur => C.nav.map(n => `<a href="${n.href}" class="nav-link${n.id === cur ? ' is-current' : ''}"${n.id === cur ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`).join(''),
  paras: arr => arr.map(p => `<p>${esc(p)}</p>`).join(''),
  media: (m, cls = '') => m.type === 'video'
    ? `<figure class="media is-video ${cls}"><video src="${m.src}" poster="${m.poster || ''}" controls playsinline preload="none" aria-label="${esc(m.alt)}"></video></figure>`
    : `<figure class="media ${cls}"><img src="${m.src}" alt="${esc(m.alt)}" loading="lazy"></figure>`,
  faqList: () => C.faq.items.map((q, i) => `
    <details class="faq-item"${i === 0 ? ' open' : ''}>
      <summary><span class="faq-q">${esc(q.q)}</span><span class="faq-toggle" aria-hidden="true">${ICONS.plus}</span></summary>
      <div class="faq-a"><p>${esc(q.a)}</p></div>
    </details>`).join(''),
  serviceCards: () => C.services.items.map(s => `
    <details class="svc" id="svc-${s.id}">
      <summary>
        <span class="svc-head">
          <span class="svc-title">${esc(s.title)}</span>
          <span class="svc-short">${esc(s.short)}</span>
          <span class="svc-tags">${s.where.map(w => `<span class="tag">${esc(w)}</span>`).join('')}</span>
        </span>
        <span class="svc-toggle" aria-hidden="true">${ICONS.plus}</span>
      </summary>
      <div class="svc-body">
        <p>${esc(s.body)}</p>
        <ul class="svc-list">${s.includes.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <div class="svc-price">
          <span class="price">${esc(C.services.cardCtaText)}</span>
          <a class="btn btn-small" href="${wa('היי קרל, אשמח לשמוע על ' + s.title)}" ${ext}>${ICONS.whatsapp} ${esc(C.services.cardCtaButton)}</a>
        </div>
      </div>
    </details>`).join(''),
  reviewCards: () => C.reviews.items.map(r => `
    <figure class="review">
      ${ui.stars(r.stars)}
      <blockquote>${esc(r.text)}</blockquote>
      <figcaption><span class="r-avatar" aria-hidden="true">${esc(r.name[0])}</span><span><b>${esc(r.name)}</b><small>${esc(timeAgo(r.date))} · Google</small></span></figcaption>
    </figure>`).join(''),
  linkList: (cls = '', skip = []) => C.links.filter(l => !skip.includes(l.id)).map(l => `
    <a class="link-item ${cls}" href="${l.url}"${l.url.startsWith('mailto:') ? '' : ' ' + ext} data-track="${l.id}"><span class="link-ic">${ICONS[l.id]}</span><span class="link-txt"><b>${esc(l.label)}</b><small>${esc(l.detail)}</small></span></a>`).join(''),
  socialIcons: () => C.links.map(l => `<a class="soc" href="${l.url}"${l.url.startsWith('mailto:') ? '' : ' ' + ext} data-track="${l.id}" aria-label="${esc(l.label)}" title="${esc(l.label)}">${ICONS[l.id]}</a>`).join(''),
  contactForm: () => `
    <form class="contact-form" novalidate>
      <div class="field"><label for="f-name">${esc(C.contact.nameLabel)}</label><input id="f-name" name="name" autocomplete="name" required></div>
      <div class="field"><label for="f-phone">${esc(C.contact.phoneLabel)}</label><input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required></div>
      <div class="field field-wide"><label for="f-msg">${esc(C.contact.messageLabel)}</label><textarea id="f-msg" name="message" rows="4"></textarea></div>
      <div class="hp" aria-hidden="true"><label for="f-website">אתר</label><input id="f-website" name="website" tabindex="-1" autocomplete="off"></div>
      <div class="form-actions field-wide">
        <button class="btn" type="submit">${esc(C.contact.submit)}</button>
        <p class="form-status" role="status" aria-live="polite"></p>
      </div>
    </form>`,
};

function bindForm(root) {
  root.querySelectorAll('.contact-form').forEach(f => f.addEventListener('submit', async e => {
    e.preventDefault();
    const name = f.querySelector('#f-name'), phone = f.querySelector('#f-phone'), msg = f.querySelector('#f-msg');
    const status = f.querySelector('.form-status'), btn = f.querySelector('button[type="submit"]');
    [name, phone].forEach(i => i.removeAttribute('aria-invalid'));
    if (!name.value.trim()) { name.setAttribute('aria-invalid', 'true'); status.textContent = 'נא למלא שם.'; name.focus(); return; }
    if (phone.value.replace(/\D/g, '').length < 9) { phone.setAttribute('aria-invalid', 'true'); status.textContent = 'נא למלא מספר טלפון תקין, למשל 050-1234567.'; phone.focus(); return; }
    const text = `היי קרל, אני ${name.value.trim()} (${phone.value.trim()}).\n${msg.value.trim()}`;
    const waLink = `<a href="${wa(text)}" ${ext}>שליחה בוואטסאפ</a>`;
    const sheetsUrl = C.contact.sheetsUrl, w3fKey = C.contact.web3formsKey;
    // Nowhere to send yet: offer WhatsApp instead
    if (!sheetsUrl && !w3fKey) { status.innerHTML = `אפשר לשלוח לי את הפרטים בוואטסאפ: ${waLink}`; return; }
    // Hidden field that only bots fill in
    if (f.querySelector('#f-website').value) { status.textContent = C.contact.success; f.reset(); return; }
    const lead = { name: name.value.trim(), phone: phone.value.trim(), message: msg.value.trim(), page: location.pathname };
    btn.disabled = true; status.textContent = C.contact.sending;
    try {
      if (sheetsUrl) {
        // Google Apps Script: adds a row to the sheet and emails Karl. no-cors, so the reply can't be read.
        await fetch(sheetsUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(lead) });
      } else {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: w3fKey, subject: `פנייה חדשה מהאתר: ${lead.name}`, from_name: 'האתר של קרל', ...lead })
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
      }
      status.textContent = C.contact.success;
      f.reset(); f.classList.add('is-sent');
      track('generate_lead', { form: 'contact' });
    } catch (err) {
      status.innerHTML = `${esc(C.contact.error)} ${waLink}`;
    } finally { btn.disabled = false; }
  }));
}

// Analytics: events go to Google Tag Manager's dataLayer
function track(event, params = {}) { (window.dataLayer = window.dataLayer || []).push({ event, ...params }); }
document.addEventListener('click', e => {
  const a = e.target.closest('a'); if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.startsWith('https://wa.me')) track('whatsapp_click', { link_location: a.closest('header, footer, main section')?.className || '' });
  else if (href.startsWith('mailto:')) track('email_click');
  else if (a.dataset.track) track('social_click', { link_label: a.dataset.track });
});

// Services and FAQ tabs: which one was opened, and for how many seconds it stayed open
const openSince = new Map();
const itemInfo = d => ({ item_type: d.classList.contains('svc') ? 'service' : 'faq', item_name: (d.querySelector('.svc-title, .faq-q')?.textContent || '').trim() });
function endView(d, keep) {
  const t = openSince.get(d); if (t == null) return;
  const sec = Math.round((performance.now() - t) / 1000);
  if (keep) openSince.set(d, null); else openSince.delete(d);
  if (sec >= 1) track('item_view_time', { ...itemInfo(d), view_seconds: sec });
}
document.addEventListener('click', e => {
  const sum = e.target.closest('details.svc > summary, details.faq-item > summary'); if (!sum) return;
  const d = sum.parentElement;
  setTimeout(() => {
    if (d.open) { openSince.set(d, performance.now()); track('item_open', itemInfo(d)); }
    else endView(d);
  }, 0);
});
// Leaving the tab or the page ends the timer; coming back restarts it for tabs still open
document.addEventListener('visibilitychange', () => {
  openSince.forEach((t, d) => {
    if (document.hidden) endView(d, true);
    else if (t == null && d.open) openSince.set(d, performance.now());
  });
});

function render() {
  const view = document.body.dataset.view || 'home';
  const D = window.DESIGN;
  const app = document.getElementById('app');
  const seo = C.seo[view];
  if (seo) { document.title = seo.title; document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description); }
  app.innerHTML = D.header(view) + `<main id="main" class="view view-${view}">${D[view]()}</main>` + D.footer();
  bindForm(app);
}

window.DESIGN = (() => {
  const { C, esc, icon, nav, paras, media, wa, ext } = ui;
  const H = C.home;
  const uniformUrl = C.links.find(l => l.id === 'uniform').url;
  const hlIcons = ['easy', 'paw', 'whatsapp'];
  return {
    header: cur => `
      <header class="site-header"><div class="wrap header-row">
        <a class="brand" href="/" aria-label="${esc(C.brand.name)}"><span class="brand-logo"><img src="/media/logo.png" alt="Karl Dog Trainer"></span></a>
        <nav class="nav" aria-label="ניווט ראשי">${nav(cur)}</nav>
        <div class="header-ctas">
          <a class="btn btn-small btn-mail" href="mailto:${C.brand.email}" aria-label="מייל: ${esc(C.brand.email)}">${icon('email')}<span class="header-cta-text" dir="ltr">${esc(C.brand.email)}</span></a>
          <a class="btn btn-small" href="${wa()}" ${ext}>${icon('whatsapp')}<span class="header-cta-text">${esc(C.brand.phoneDisplay)}</span></a>
        </div>
      </div></header>`,

    home: () => `
      <section class="b-hero"><div class="wrap">
        <div>
          <span class="kicker">${icon('paw')} ${esc(H.eyebrow)}</span>
          <h1>${esc(H.heroTitle).replace('בית רגוע', '<mark class="hl-mark">בית רגוע</mark>')}</h1>
          <p class="lead">${esc(H.heroText)}</p>
          <div class="ctas">
            <a class="btn" href="${wa()}" ${ext}>${icon('whatsapp')} ${esc(H.ctaPrimary)}</a>
            <a class="btn btn-sun" href="/services">${esc(H.ctaSecondary)}</a>
          </div>
        </div>
        <div class="b-blob">
          ${media({ type: 'image', src: H.heroImage, alt: H.heroImageAlt })}
          <a class="b-chip c2" href="${uniformUrl}" ${ext}>${icon('uniform')} ${esc(C.brand.reservist)}</a>
        </div>
      </div></section>


      <section class="b-about"><div class="wrap"><div class="box">
        ${media({ type: 'image', src: H.aboutImage, alt: H.aboutImageAlt })}
        <div class="text">
          <h2 class="b-title">${esc(H.aboutTitle)}</h2>
          ${paras([...H.about, C.brand.reservistText])}
        </div>
      </div>
      <div class="b-hls">
        ${H.highlights.map((h, i) => `<div class="hl"><span class="ic">${icon(hlIcons[i])}</span><h3>${esc(h.title)}</h3><p>${esc(h.text)}</p></div>`).join('')}
      </div></div></section>


      <section class="b-gallery"><div class="wrap">
        <h2 class="b-title">${esc(H.galleryTitle)}</h2>
        <div class="b-strip">${H.gallery.map(m => media(m)).join('')}</div>
      </div></section>

      <section class="b-reviews"><div class="wrap">
        <div class="b-reviews-head">
          <div><h2 class="b-title">${esc(C.reviews.title)}</h2></div>
          <a class="b-score" href="${C.reviews.link}" ${ext} style="text-decoration:none"><span class="g">${icon('google')}</span><b>${esc(C.reviews.rating)}</b>${ui.stars(5)}</a>
        </div>
        <div class="cards">${ui.reviewCards()}</div>
      </div></section>

      <section class="b-svc-cta"><div class="wrap"><div class="box">
        <div class="txt"><h2>${esc(H.servicesCta.title)}</h2><p>${esc(H.servicesCta.text)}</p></div>
        <a class="btn" href="/services">${esc(H.servicesCta.button)} ${icon('arrow')}</a>
      </div></div></section>

      <section class="b-links"><div class="wrap">
        <h2 class="b-title" style="font-size:28px">${esc(H.followTitle)}</h2>
        <div class="row">${ui.linkList('', ['whatsapp'])}</div>
      </div></section>`,

    faq: () => `
      <section class="b-pagehead"><div class="wrap" style="max-width:860px"><span class="kicker">${icon('paw')} ${esc(C.faq.kicker)}</span><h1>${esc(C.faq.title)}</h1><p>${esc(C.faq.intro)}</p></div></section>
      <section class="b-faq"><div class="wrap">
        <div class="faq-list">${ui.faqList()}</div>
        <div class="b-ask">
          <img src="${H.heroImage}" alt="קרל">
          <div class="txt"><h3>${esc(C.faq.askTitle)}</h3><p>${esc(C.faq.askText)}</p></div>
          <a class="btn" href="${wa()}" ${ext}>${icon('whatsapp')} ${esc(C.faq.askButton)}</a>
        </div>
      </div></section>`,

    services: () => `
      <section class="b-pagehead"><div class="wrap"><span class="kicker">${icon('paw')} ${esc(C.services.kicker)}</span><h1>${esc(C.services.title)}</h1><p>${esc(C.services.intro)}</p></div></section>
      <section class="b-services"><div class="wrap">
        <div class="svc-grid">${ui.serviceCards()}</div>
        <div class="svc-cta"><h3>${esc(C.services.ctaTitle)}</h3><a class="btn" href="${wa(C.services.ctaMessage)}" ${ext}>${icon('whatsapp')} ${esc(C.services.ctaButton)}</a></div>
      </div></section>`,

    footer: () => `
      <footer class="b-footer" id="contact">
        <div class="wrap contact">
          <div>
            <h2>${esc(C.contact.title)}</h2>
            <p>${esc(C.contact.text)}</p>
            <a class="phone" href="${wa()}" ${ext}>${icon('whatsapp')} ${esc(C.brand.phoneDisplay)}</a>
          </div>
          ${ui.contactForm()}
        </div>
        <div class="wrap bottom">
          <span class="brand-logo small"><img src="/media/logo.png" alt="Karl Dog Trainer"></span>
          <span>${esc(C.footer.copyright)}</span>
          <div class="socials">${ui.socialIcons()}</div>
        </div>
      </footer>`
  };
})();

render();
})();
