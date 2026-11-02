// Google Tag Manager. Paste your container ID between the quotes, for example 'GTM-AB12CD3'.
// While it is empty, nothing is tracked.
window.GTM_ID = '';

(function (w, d, id) {
  w.dataLayer = w.dataLayer || [];
  if (!id) return;
  w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var s = d.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + id;
  d.head.appendChild(s);
})(window, document, window.GTM_ID);
