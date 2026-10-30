(function () {
    var cfg = window.RAUMIVO_SITE || {};
    var email = cfg.email || 'info@raumivo.de';
    var play = String(cfg.playStoreUrl || '').trim();
    var appStore = String(cfg.appStoreUrl || '').trim();
    var ustId = String(cfg.ustId || '').trim();

    document.querySelectorAll('[data-site-email]').forEach(function (el) {
        if (el.tagName === 'A') {
            el.href = 'mailto:' + email;
            if (!el.textContent.trim() || el.getAttribute('data-site-email') === 'fill') {
                el.textContent = email;
            }
        } else {
            el.textContent = email;
        }
    });

    function wireStore(el, url, soonLabel) {
        if (!el) return;
        if (url) {
            el.href = url;
            el.removeAttribute('aria-disabled');
            el.classList.remove('is-soon');
            el.target = '_blank';
            el.rel = 'noopener noreferrer';
            var live = el.getAttribute('data-label-live');
            if (live) el.textContent = live;
        } else {
            el.href = '#';
            el.classList.add('is-soon');
            el.setAttribute('aria-disabled', 'true');
            el.removeAttribute('target');
            el.removeAttribute('rel');
            var soon = el.getAttribute('data-label-soon') || soonLabel;
            if (soon) el.textContent = soon;
            el.addEventListener('click', function (e) {
                e.preventDefault();
            });
        }
    }

    document.querySelectorAll('[data-store="play"]').forEach(function (el) {
        wireStore(el, play, 'Demnächst bei Google Play');
    });
    document.querySelectorAll('[data-store="appstore"]').forEach(function (el) {
        wireStore(el, appStore, 'Demnächst im App Store');
    });

    var ustPending = document.getElementById('ust-pending');
    var ustLive = document.getElementById('ust-live');
    var ustValue = document.getElementById('ust-value');
    if (ustId && ustLive && ustValue) {
        ustValue.textContent = ustId;
        ustLive.hidden = false;
        if (ustPending) ustPending.hidden = true;
    } else if (ustPending) {
        ustPending.hidden = false;
        if (ustLive) ustLive.hidden = true;
    }
})();
