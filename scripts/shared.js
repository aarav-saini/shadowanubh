document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /* ===== Smooth Scroll ===== */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  window.lenis = lenis;

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /* ===== Cursor ===== */
  const cursor = document.querySelector(".custom-cursor");
  const xTo = gsap.quickTo(cursor, "left", { duration: 0.35, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "top", { duration: 0.35, ease: "power3" });
  let morphedEl = null;
  const morphPadding = 10;

  document.addEventListener("mousemove", (e) => {
    if (!morphedEl) {
      xTo(e.clientX);
      yTo(e.clientY);
    }
  });

  function morphTo(el) {
    const rect = el.getBoundingClientRect();
    const w = rect.width + morphPadding * 2;
    const h = rect.height + morphPadding * 2;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    gsap.to(cursor, {
      left: cx,
      top: cy,
      width: w-10,
      height: h-10,
      borderRadius: "15px",
      duration: 0.35,
      ease: "power3.out",
    });
  }

  function morphReset() {
    gsap.to(cursor, {
      width: 30,
      height: 30,
      borderRadius: "50%",
      duration: 0.35,
      ease: "power3.out",
    });
  }

  document.querySelectorAll(".navbar-item").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      morphedEl = el;
      morphTo(el);
    });
    el.addEventListener("mouseleave", () => {
      morphedEl = null;
      morphReset();
    });
    window.addEventListener("resize", () => {
      if (morphedEl === el) morphTo(el);
    });
  });
});
