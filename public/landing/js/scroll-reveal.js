/* The landing is served as static HTML, separate from the Next.js app. */
(() => {
  function init() {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new WeakSet();
    const reveal = (el, type = "up", delay = 0) => {
      if (!el || seen.has(el)) return;
      seen.add(el);
      el.dataset.akReveal = type;
      el.style.setProperty("--ak-delay", `${Math.min(delay, 280)}ms`);

      const rect = el.getBoundingClientRect();
      if (rect.top < innerHeight * .94 && rect.bottom > 0) {
        enter(el);
      } else {
        el.classList.add("ak-reveal-pending");
        observer.observe(el);
      }
    };

    function enter(el) {
      observer.unobserve(el);
      el.classList.remove("ak-reveal-pending");
      const finish = (event) => {
        if (event.target !== el) return;
        el.classList.remove("ak-reveal-enter");
        el.removeEventListener("animationend", finish);
      };
      el.addEventListener("animationend", finish);
      el.classList.add("ak-reveal-enter");
    }

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && enter(entry.target)),
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );

    const single = (selector, direction = "up", delay = 0) =>
      document.querySelectorAll(selector).forEach(el => reveal(el, direction, delay));
    const stagger = (selector, direction = "up") =>
      document.querySelectorAll(selector).forEach((el, i) =>
        reveal(el, direction, (i % 4) * 85));

    // Never animate navigation, assistance links, or other quick-exit controls.
    single(".home-banner-text-wrap");
    single(".home-banner-title", "up", 90);
    single(".banner-content-wrap", "up", 160);
    single(".about-banner-button-wrap", "up", 220);
    stagger(".home-banner-card-area > .home-banner-card-holder");
    single(".experts-section .brand-title-wrapper");
    single(".experts-section .brand-logo-area", "scale");
    single(".award-section .award-image-area", "left");
    single(".award-section .award-content-wrap", "right");
    single(".service-section .align-center");
    stagger(".service-grid > .service-card");
    single(".information .text-section", "left");
    single(".faq-section-title-area");
    stagger(".faq-whole-wrap > .faq-wrap");
    single(".foot1 .studio", "left");
    single(".foot1 .navigation", "right");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
