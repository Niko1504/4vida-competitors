(function () {
  'use strict';

  // Chapter menu
  var btn = document.querySelector('.menu-btn');
  var toc = document.getElementById('toc');
  function setMenu(open) {
    btn.setAttribute('aria-expanded', String(open));
    toc.hidden = !open;
  }
  btn.addEventListener('click', function () {
    setMenu(btn.getAttribute('aria-expanded') !== 'true');
  });
  toc.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !toc.hidden) { setMenu(false); btn.focus(); }
  });

  // Comparison company switcher (used on narrow screens)
  var wrap = document.querySelector('.matrix-wrap');
  var switches = wrap.querySelectorAll('.switch button');
  switches.forEach(function (b) {
    b.addEventListener('click', function () {
      wrap.dataset.active = b.dataset.co;
      switches.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
    });
  });

  // Lightbox with source caption
  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  var boxCap = box.querySelector('.cap');
  var opener = null;
  document.querySelectorAll('.ph button').forEach(function (b) {
    b.addEventListener('click', function () {
      var img = b.querySelector('img');
      var cap = b.closest('figure').querySelector('figcaption');
      boxImg.src = img.currentSrc || img.src;
      boxImg.alt = img.alt;
      boxCap.innerHTML = cap ? cap.innerHTML : '';
      opener = b;
      box.showModal();
    });
  });
  box.addEventListener('click', function (e) {
    if (e.target === box || e.target.hasAttribute('data-close')) box.close();
  });
  box.addEventListener('close', function () {
    boxImg.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
