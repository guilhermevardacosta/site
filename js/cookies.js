(function () {
  const COOKIE_CONSENT_KEY = "cookie_consent_status";
  const ADSENSE_CLIENT = "ca-pub-7902987740979369";

  function getConsentStatus() {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  }

  function setConsentStatus(status) {
    localStorage.setItem(COOKIE_CONSENT_KEY, status);
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

  function initCookies() {
    const banner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("cookie-accept");
    const rejectButton = document.getElementById("cookie-reject");
    const manageButton = document.getElementById("manage-cookies");

    if (!banner) return;

    function hideBanner() {
      banner.hidden = true;
    }

    function showBanner() {
      banner.hidden = false;
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

    function manageCookies() {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      showBanner();
    }

    const consent = getConsentStatus();

    if (acceptButton) {
      acceptButton.addEventListener("click", acceptCookies);
    }

    if (rejectButton) {
      rejectButton.addEventListener("click", rejectCookies);
    }

    if (manageButton) {
      manageButton.addEventListener("click", manageCookies);
    }

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

  document.addEventListener("componentsLoaded", initCookies);
})();