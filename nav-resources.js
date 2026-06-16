(function () {
  if (!document.querySelector('style[data-resource-dropdown-style]')) {
    const style = document.createElement("style");
    style.dataset.resourceDropdownStyle = "true";
    style.textContent = `
      .site-nav,
      .nav-inner,
      .nav-links {
        overflow: visible;
      }

      .site-nav {
        position: relative;
        z-index: 100;
      }

      .nav-dropdown {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 50px;
      }

      .nav-dropdown::after {
        position: absolute;
        top: 100%;
        right: -18px;
        left: -18px;
        height: 16px;
        content: "";
      }

      .dropdown-menu {
        position: absolute;
        top: calc(100% + 8px);
        left: 50%;
        z-index: 1000;
        display: none;
        min-width: 210px;
        padding: 14px;
        transform: translateX(-50%);
        background: #000;
        border: 1px solid rgba(255, 255, 255, 0.16);
        box-shadow: 0 16px 34px rgba(0, 0, 0, 0.42);
      }

      .dropdown-menu a {
        display: block;
        padding: 8px 10px;
        color: #b98422;
        text-align: left;
        text-decoration: none;
        white-space: nowrap;
      }

      .dropdown-menu a:hover,
      .dropdown-menu a.active {
        color: #fff;
      }

      .nav-dropdown:hover .dropdown-menu,
      .nav-dropdown:focus-within .dropdown-menu {
        display: grid;
      }

      @media (max-width: 820px) {
        .nav-dropdown {
          display: grid;
          justify-content: start;
          gap: 8px;
          min-height: 0;
        }

        .nav-dropdown::after {
          display: none;
        }

        .dropdown-menu {
          position: static;
          display: grid;
          min-width: 0;
          padding: 0 0 0 16px;
          transform: none;
          border: 0;
          box-shadow: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  function buildDropdown({ href, label, className, pages, links }) {
    const navLink = Array.from(document.querySelectorAll(".nav-links a")).find((link) => {
      return link.getAttribute("href") === href;
    });

    if (!navLink) {
      return;
    }

    const existingWrapper = navLink.closest(".nav-dropdown");
    const wrapper = existingWrapper || document.createElement("div");
    wrapper.classList.add("nav-dropdown", className);

    const trigger = navLink;
    trigger.href = href;
    trigger.textContent = label;
    if (navLink.classList.contains("active") || pages.has(currentPage)) {
      trigger.className = "active";
    } else {
      trigger.classList.remove("active");
    }

    const menu = wrapper.querySelector(".dropdown-menu") || document.createElement("div");
    menu.className = "dropdown-menu";
    menu.replaceChildren();
    links.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      if (item.href === currentPage) {
        link.classList.add("active");
      }
      menu.appendChild(link);
    });

    if (existingWrapper) {
      if (!menu.parentElement) {
        wrapper.appendChild(menu);
      }
      return;
    }

    navLink.replaceWith(wrapper);
    wrapper.append(trigger, menu);
  }

  buildDropdown({
    href: "about.html",
    label: "About Us",
    className: "about-dropdown",
    pages: new Set(["about.html", "john.html", "chris.html", "aaron.html", "locations.html"]),
    links: [
      { href: "about.html", label: "About Us" },
      { href: "locations.html", label: "Locations" },
    ],
  });

  buildDropdown({
    href: "services.html",
    label: "Services",
    className: "services-dropdown",
    pages: new Set(["services.html", "adas.html", "diagnostics.html", "wiring.html"]),
    links: [
      { href: "adas.html", label: "ADAS Calibrations" },
      { href: "diagnostics.html", label: "Diagnostics" },
      { href: "wiring.html", label: "Wiring Harness Repair" },
    ],
  });

  buildDropdown({
    href: "resources.html",
    label: "Resources",
    className: "resources-dropdown",
    pages: new Set(["resources.html", "whatisadas.html", "whatisadas.html#why-adas-critical", "compliance.html", "commonadas.html"]),
    links: [
      { href: "whatisadas.html", label: "What is ADAS?" },
      { href: "whatisadas.html#why-adas-critical", label: "Why is ADAS Critical?" },
      { href: "compliance.html", label: "Regulatory Compliance" },
      { href: "commonadas.html", label: "Common ADAS Calibrations" },
    ],
  });
})();
