// Consent handling for third-party services.
//
// - Google Analytics is only loaded after the visitor opted in via the consent banner
//   (GDPR Art. 6(1)(a), §25 TDDDG). Do Not Track and Global Privacy Control count as "no".
// - YouTube players are only loaded when the visitor clicks play (see _includes/youtube.html).
(function () {
  'use strict';

  var STORAGE_KEY = 'fk-consent-analytics';
  var config = window.fkConsentConfig || {};

  function readChoice() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeChoice(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // Storage blocked: the choice applies to this page view only.
    }
  }

  function browserSignalsOptOut() {
    return navigator.globalPrivacyControl === true ||
      window.doNotTrack === '1' || navigator.doNotTrack === '1' ||
      navigator.doNotTrack === 'yes' || navigator.msDoNotTrack === '1';
  }

  var analyticsLoaded = false;

  function loadAnalytics() {
    if (analyticsLoaded || !config.gaId) {
      return;
    }
    analyticsLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.gaId);
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', config.gaId);
  }

  function deleteAnalyticsCookies() {
    var host = window.location.hostname;
    var domains = ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0 || name === '_gid' || name === '_gat') {
        domains.forEach(function (domain) {
          document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
        });
      }
    });
  }

  function initAnalyticsConsent() {
    var banner = document.getElementById('consent-banner');
    if (!banner || !config.gaId) {
      return;
    }

    function showBanner(moveFocus) {
      banner.hidden = false;
      var first = banner.querySelector('button');
      if (moveFocus && first) {
        first.focus({ preventScroll: true });
      }
    }

    banner.addEventListener('click', function (event) {
      var button = event.target.closest('[data-consent]');
      if (!button) {
        return;
      }
      var granted = button.getAttribute('data-consent') === 'granted';
      var wasLoaded = analyticsLoaded;
      storeChoice(granted ? 'granted' : 'denied');
      banner.hidden = true;
      if (granted) {
        loadAnalytics();
      } else {
        // Stop gtag from writing cookies again before they are removed.
        window['ga-disable-' + config.gaId] = true;
        deleteAnalyticsCookies();
        if (wasLoaded) {
          // gtag cannot be unloaded; a reload guarantees nothing is sent any more.
          window.location.reload();
        }
      }
    });

    document.querySelectorAll('[data-consent-open]').forEach(function (link) {
      link.hidden = false;
      link.addEventListener('click', function (event) {
        event.preventDefault();
        showBanner(true);
      });
    });

    var choice = readChoice();
    if (choice === 'granted') {
      loadAnalytics();
      return;
    }
    // No consent: remove analytics cookies left over from an earlier, withdrawn consent.
    deleteAnalyticsCookies();
    if (choice === null && !browserSignalsOptOut()) {
      showBanner(false);
    }
  }

  function initVideoEmbeds() {
    document.querySelectorAll('.video-embed-play').forEach(function (button) {
      button.addEventListener('click', function () {
        var id = button.getAttribute('data-youtube-id');
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1';
        iframe.title = button.getAttribute('data-youtube-title') || 'YouTube video';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allowFullscreen = true;
        iframe.className = 'video-embed-frame';
        button.replaceWith(iframe);
      });
    });
  }

  function init() {
    initAnalyticsConsent();
    initVideoEmbeds();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
