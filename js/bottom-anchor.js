(function () {
  if (document.querySelector(".bottom-anchor")) {
    return;
  }

  const anchor = document.createElement("section");
  anchor.className = "bottom-anchor";
  anchor.setAttribute("aria-label", "Lightning Auto Service partnership and contact");
  anchor.innerHTML = `
    <div class="bottom-anchor__inner">
      <div class="bottom-anchor__hero">
        <div class="bottom-anchor__message">
          <h2 class="bottom-anchor__title">
            Ready to turn<br>
            calibrations <span>into</span><br>
            <span>profit?</span>
          </h2>
          <p class="bottom-anchor__copy">Partner with Lightning Auto Service for reliable, mobile ADAS calibrations, diagnostics, and programming—without the overhead of building your own calibration department.</p>
        </div>

        <div class="bottom-anchor__actions" aria-label="Contact Lightning Auto Service">
          <a class="bottom-anchor__button bottom-anchor__button--call" href="tel:+18562027494">Call Lightning Auto Service</a>
          <a class="bottom-anchor__button bottom-anchor__button--text" href="sms:+18562027494">Text Us to Get Started</a>
        </div>
      </div>

      <ul class="bottom-anchor__benefits" aria-label="Partnership benefits">
        <li>Mobile service at your facility</li>
        <li>Same-day scheduling opportunities</li>
        <li>OEM-aligned calibration procedures</li>
        <li>Detailed documentation</li>
        <li>No equipment investment required</li>
      </ul>

      <div class="bottom-anchor__links">
        <nav aria-label="Quick links" class="bottom-anchor__nav">
          <a href="/">Home</a>
          <a href="/schedule">Schedule Calibration</a>
          <a href="/about">About Us</a>
          <a href="/services">Our Services</a>
          <a href="https://lightningautoservice.printful.me/">Swag Store</a>
          <a href="/partner">Become a Partner</a>
          <a href="/education">ADAS Education</a>
          <a href="/careers">Careers</a>
        </nav>
        <nav aria-label="Legal links" class="bottom-anchor__nav bottom-anchor__nav--legal">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms and Conditions</a>
          <a href="/accessibility">Accessibility</a>
        </nav>
      </div>

      <div class="bottom-anchor__social" aria-label="Lightning Auto Service social media links">
        <span>Find Us On:</span>
        <nav class="bottom-anchor__social-links" aria-label="Social media">
          <a href="https://www.instagram.com/lightning.adas" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=61563176451572" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.linkedin.com/company/lightning-adas" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.youtube.com/@LightningAutoService" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="http://x.com/lightningadas" target="_blank" rel="noopener noreferrer">X</a>
        </nav>
      </div>
    </div>
  `;

  const footer = document.querySelector(".site-footer");
  if (footer) {
    footer.before(anchor);
    return;
  }

  document.currentScript.before(anchor);
})();
