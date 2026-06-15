(function () {
  if (!document.querySelector('style[data-resource-dropdown-style]')) {
    const style = document.createElement("style");
    style.dataset.resourceDropdownStyle = "true";
    style.textContent = `
      .nav-dropdown {
        position: relative;
        display: inline-flex;
        justify-content: center;
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 50%;
        z-index: 10;
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
    pages: new Set(["resources.html", "whatadas.html", "whyadas.html", "compliance.html", "commonadas.html"]),
    links: [
      { href: "whatadas.html", label: "What is ADAS?" },
      { href: "whyadas.html", label: "Why is ADAS Critical?" },
      { href: "compliance.html", label: "Regulatory Compliance" },
      { href: "commonadas.html", label: "Common ADAS Calibrations" },
    ],
  });
})();
