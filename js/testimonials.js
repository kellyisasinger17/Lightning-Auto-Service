(() => {
  "use strict";

  const carousels = new WeakMap();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("[data-testimonial-carousel]").forEach((root) => {
    if (carousels.has(root)) return;

    const viewport = root.querySelector(".testimonial-viewport");
    const track = root.querySelector(".testimonial-track");
    const controls = root.querySelector(".testimonial-controls");
    const dotsContainer = root.querySelector(".testimonial-dots");
    const previousButton = root.querySelector(".testimonial-prev");
    const nextButton = root.querySelector(".testimonial-next");
    const originals = Array.from(track?.querySelectorAll(":scope > .testimonial-slide") || []);

    if (!viewport || !track || !controls || !dotsContainer || !previousButton || !nextButton || !originals.length) return;

    const state = {
      index: 0,
      position: originals.length > 1 ? 1 : 0,
      timer: null,
      animating: false,
      hovered: false,
      focused: false,
      pointerId: null,
      startX: 0,
      startY: 0
    };

    const listeners = [];
    const listen = (target, event, handler, options) => {
      target.addEventListener(event, handler, options);
      listeners.push(() => target.removeEventListener(event, handler, options));
    };

    originals.forEach((slide, index) => {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${index + 1} of ${originals.length}`);
    });

    if (originals.length > 1) {
      const firstClone = originals[0].cloneNode(true);
      const lastClone = originals[originals.length - 1].cloneNode(true);
      firstClone.setAttribute("aria-hidden", "true");
      lastClone.setAttribute("aria-hidden", "true");
      firstClone.removeAttribute("aria-label");
      lastClone.removeAttribute("aria-label");
      track.prepend(lastClone);
      track.append(firstClone);
    } else {
      controls.hidden = true;
    }

    const allSlides = () => Array.from(track.children);
    const setHeight = () => {
      const tallest = Math.max(...allSlides().map((slide) => slide.scrollHeight));
      viewport.style.height = `${tallest}px`;
    };

    const updateAccessibility = () => {
      originals.forEach((slide, index) => slide.setAttribute("aria-hidden", String(index !== state.index)));
      Array.from(dotsContainer.children).forEach((dot, index) => {
        if (index === state.index) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    const render = (animate = true) => {
      track.style.transitionDuration = animate && !reduceMotion.matches ? "550ms" : "0ms";
      track.style.transform = `translate3d(${-state.position * 100}%, 0, 0)`;
      updateAccessibility();
    };

    const clearTimer = () => {
      if (state.timer !== null) window.clearTimeout(state.timer);
      state.timer = null;
    };

    const canRotate = () => originals.length > 1 && !reduceMotion.matches && !state.hovered && !state.focused && !document.hidden;
    const schedule = () => {
      clearTimer();
      if (canRotate()) state.timer = window.setTimeout(() => move(1), 5000);
    };

    const goTo = (index, direction = 0) => {
      if (state.animating || originals.length < 2) return;
      const target = (index + originals.length) % originals.length;
      if (target === state.index) {
        schedule();
        return;
      }
      const wrappingForward = state.index === originals.length - 1 && target === 0 && direction >= 0;
      const wrappingBackward = state.index === 0 && target === originals.length - 1 && direction <= 0;
      state.index = target;
      state.position = wrappingForward ? originals.length + 1 : wrappingBackward ? 0 : target + 1;
      state.animating = !reduceMotion.matches;
      render(true);
      schedule();
      if (!state.animating) normalizePosition();
    };

    const move = (direction) => goTo(state.index + direction, direction);

    const normalizePosition = () => {
      state.position = state.index + 1;
      state.animating = false;
      render(false);
    };

    originals.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "testimonial-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Show testimonial ${index + 1} of ${originals.length}`);
      listen(dot, "click", () => {
        const forwardDistance = (index - state.index + originals.length) % originals.length;
        const backwardDistance = (state.index - index + originals.length) % originals.length;
        goTo(index, forwardDistance <= backwardDistance ? 1 : -1);
      });
      dotsContainer.append(dot);
    });

    listen(previousButton, "click", () => move(-1));
    listen(nextButton, "click", () => move(1));
    listen(track, "transitionend", (event) => {
      if (event.propertyName === "transform") normalizePosition();
    });
    listen(root, "mouseenter", () => { state.hovered = true; clearTimer(); });
    listen(root, "mouseleave", () => { state.hovered = false; schedule(); });
    listen(root, "focusin", () => { state.focused = true; clearTimer(); });
    listen(root, "focusout", (event) => {
      if (!root.contains(event.relatedTarget)) {
        state.focused = false;
        schedule();
      }
    });
    listen(document, "visibilitychange", schedule);
    listen(reduceMotion, "change", () => { render(false); schedule(); });
    listen(window, "resize", setHeight, { passive: true });

    listen(viewport, "pointerdown", (event) => {
      if (event.pointerType === "mouse") return;
      state.pointerId = event.pointerId;
      state.startX = event.clientX;
      state.startY = event.clientY;
      clearTimer();
    });
    listen(viewport, "pointerup", (event) => {
      if (event.pointerId !== state.pointerId) return;
      const deltaX = event.clientX - state.startX;
      const deltaY = event.clientY - state.startY;
      state.pointerId = null;
      if (Math.abs(deltaX) >= 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) move(deltaX < 0 ? 1 : -1);
      else schedule();
    });
    listen(viewport, "pointercancel", () => { state.pointerId = null; schedule(); });

    const destroy = () => {
      clearTimer();
      listeners.splice(0).forEach((remove) => remove());
      carousels.delete(root);
    };

    carousels.set(root, { destroy });
    setHeight();
    render(false);
    schedule();
  });
})();
