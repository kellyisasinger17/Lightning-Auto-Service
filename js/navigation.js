(function () {
  const currentPage = window.location.pathname.split("/").pop() || "";

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
      if (item.href.split("#")[0] === window.location.pathname) {
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
    href: "/about",
    label: "About Us",
    className: "about-dropdown",
    pages: new Set(["about", "john", "chris", "aaron", "locations"]),
    links: [
      { href: "/about", label: "About Us" },
      { href: "/locations", label: "Locations" },
    ],
  });

  buildDropdown({
    href: "/services",
    label: "Services",
    className: "services-dropdown",
    pages: new Set(["services", "insurance"]),
    links: [
      { href: "/services#oems-heading", label: "OEMs We Service" },
      { href: "/services#adas-service-heading", label: "ADAS Calibrations" },
      { href: "/services#diagnostics-service-heading", label: "Diagnostics" },
      { href: "/services#wiring-service-heading", label: "Wiring Harness Repair" },
      { href: "/insurance", label: "Comparison Request" },
    ],
  });

  buildDropdown({
    href: "/partner",
    label: "Partnerships",
    className: "partnerships-dropdown",
    pages: new Set(["partner", "careers"]),
    links: [
      { href: "/partner", label: "Become a Partner" },
      { href: "/careers", label: "Careers" },
    ],
  });

  buildDropdown({
    href: "/resources",
    label: "Resources",
    className: "resources-dropdown",
    pages: new Set(["resources", "blog", "education", "commonadas"]),
    links: [
      { href: "/resources", label: "FAQ" },
      { href: "/blog", label: "Blog" },
      { href: "/education", label: "Education" },
      { href: "/commonadas", label: "Common ADAS Calibrations" },
    ],
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }
})();
