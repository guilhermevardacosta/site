(function () {
  const COOKIE_CONSENT_KEY = "cookie_consent_status";
  const ADSENSE_CLIENT = "ca-pub-7902987740979369";

  const banner = document.getElementById("cookie-banner");
  const acceptButton = document.getElementById("cookie-accept");
  const rejectButton = document.getElementById("cookie-reject");

  function getConsentStatus() {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  }

  function setConsentStatus(status) {
    localStorage.setItem(COOKIE_CONSENT_KEY, status);
  }

  function hideBanner() {
    if (banner) {
      banner.hidden = true;
    }
  }

  function showBanner() {
    if (banner) {
      banner.hidden = false;
    }
  }

  function loadAdSense() {
    if (document.querySelector('script[data-cookie-ad="adsense"]')) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-cookie-ad", "adsense");

    document.head.appendChild(script);
  }

  function acceptCookies() {
    setConsentStatus("accepted");
    loadAdSense();
    hideBanner();
  }

  function rejectCookies() {
    setConsentStatus("rejected");
    hideBanner();
  }

  function init() {
    const consent = getConsentStatus();

    if (consent === "accepted") {
      loadAdSense();
      hideBanner();
      return;
    }

    if (consent === "rejected") {
      hideBanner();
      return;
    }

    showBanner();
  }

  if (acceptButton) {
    acceptButton.addEventListener("click", acceptCookies);
  }

  if (rejectButton) {
    rejectButton.addEventListener("click", rejectCookies);
  }

  document.addEventListener("DOMContentLoaded", init);
})();

const manageButton = document.getElementById("manage-cookies");

if (manageButton) {
  manageButton.addEventListener("click", function () {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    showBanner();
  });
}