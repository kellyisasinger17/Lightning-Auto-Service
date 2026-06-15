(function () {
  if (document.querySelector('style[data-resource-dropdown-style]')) {
    return;
  }

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

  const resourcesLink = Array.from(document.querySelectorAll(".nav-links a")).find((link) => {
    return link.getAttribute("href") === "resources.html" && link.textContent.trim().toLowerCase() === "resources";
  });

  if (!resourcesLink || resourcesLink.closest(".nav-dropdown")) {
    return;
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const resourcesPages = new Set(["resources.html", "whatadas.html", "whyadas.html", "compliance.html", "commonadas.html"]);
  const wrapper = document.createElement("div");
  wrapper.className = "nav-dropdown resources-dropdown";

  const trigger = document.createElement("a");
  trigger.href = "resources.html";
  trigger.textContent = "Resources";
  if (resourcesLink.classList.contains("active") || resourcesPages.has(currentPage)) {
    trigger.className = "active";
  }

  const menu = document.createElement("div");
  menu.className = "dropdown-menu";
  menu.innerHTML = `
    <a href="whatadas.html">What is ADAS?</a>
    <a href="whyadas.html">Why is ADAS Important?</a>
    <a href="compliance.html">Regulatory Compliance</a>
    <a href="commonadas.html">Common ADAS Calibrations</a>
  `;

  menu.querySelectorAll("a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  wrapper.append(trigger, menu);
  resourcesLink.replaceWith(wrapper);
})();
