(function () {
  if (document.querySelector(".bottom-anchor")) {
    return;
  }

  const anchor = document.createElement("section");
  anchor.className = "bottom-anchor";
  anchor.setAttribute("aria-label", "Quick links and service contact");
  anchor.innerHTML = `
    <style>
      .bottom-anchor {
        width: 100%;
        margin-top: clamp(56px, 7vw, 110px);
        background: #f5f5f5;
        color: #000;
        font-family: Arial, Helvetica, sans-serif;
      }

      .bottom-anchor__inner {
        width: min(1760px, calc(100% - 64px));
        margin: 0 auto;
        min-height: 250px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        gap: clamp(34px, 6vw, 90px);
        padding: clamp(34px, 5vw, 58px) 0;
      }

      .bottom-anchor__help,
      .bottom-anchor__links,
      .bottom-anchor__brand {
        display: grid;
        justify-items: center;
      }

      .bottom-anchor__help {
        justify-items: start;
        gap: 42px;
      }

      .bottom-anchor h2 {
        margin: 0;
        font-size: clamp(1.35rem, 1.8vw, 2rem);
        line-height: 1.15;
        font-weight: 900;
      }

      .bottom-anchor__button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 250px;
        min-height: 68px;
        padding: 16px 30px;
        border-radius: 14px;
        border: 1px solid #b98422;
        background: #22D8B4;
        color: #fff;
        font-size: 1rem;
        font-weight: 900;
        letter-spacing: 0.04em;
        text-align: center;
        text-transform: uppercase;
        text-decoration: none;
        box-shadow: 0 16px 28px rgba(0, 0, 0, 0.22);
      }

      .bottom-anchor__links {
        gap: 18px;
        text-align: center;
      }

      .bottom-anchor__links nav {
        display: grid;
        gap: 6px;
      }

      .bottom-anchor__links a {
        color: #000;
        font-size: 1rem;
        line-height: 1.12;
        text-decoration: none;
      }

      .bottom-anchor__links a:hover {
        color: #22D8B4;
      }

      .bottom-anchor__brand {
        gap: 22px;
      }

      .bottom-anchor__logo {
        width: min(100%, 230px);
        height: auto;
      }

      .bottom-anchor__phone {
        display: inline-flex;
        align-items: center;
        gap: 16px;
        color: #000;
        font-size: clamp(1.25rem, 1.6vw, 1.75rem);
        font-weight: 900;
        text-decoration: none;
      }

      .bottom-anchor__phone img {
        width: 38px;
        height: 38px;
        object-fit: contain;
      }

      @media (max-width: 900px) {
        .bottom-anchor__inner {
          width: min(100%, calc(100% - 32px));
          grid-template-columns: 1fr;
          justify-items: center;
          text-align: center;
          gap: 34px;
        }

        .bottom-anchor__help {
          justify-items: center;
          gap: 24px;
        }
      }

      @media (max-width: 520px) {
        .bottom-anchor {
          margin-top: 46px;
        }

        .bottom-anchor__button {
          width: min(100%, 270px);
          min-width: 0;
        }
      }
    </style>
    <div class="bottom-anchor__inner">
      <div class="bottom-anchor__help">
        <h2>Need help with your car?</h2>
        <a class="bottom-anchor__button" href="/schedule">Schedule Service</a>
      </div>

      <div class="bottom-anchor__links">
        <h2>Quick Links</h2>
        <nav aria-label="Quick links">
          <a href="/">Home</a>
          <a href="/schedule">Schedule Calibration</a>
          <a href="/about">About Us</a>
          <a href="/services">Our Services</a>
          <a href="/partner">Become a Partner</a>
          <a href="/resources">Resources</a>
          <a href="/careers">Careers</a>
          <a href="mailto:submissions@lightningautoservice.com">Contact</a>
        </nav>
      </div>

      <div class="bottom-anchor__brand">
        <img class="bottom-anchor__logo" src="images/lightning%20logo.png" alt="Lightning Auto Service">
        <a class="bottom-anchor__phone" href="tel:+18562027494">
          <img src="images/Phone.png" alt="">
          <span>(856) 202-7494</span>
        </a>
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
