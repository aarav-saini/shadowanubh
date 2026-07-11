document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* ===== Hero ===== */
  gsap.to(".t.mask", {
    scale: 50,
    scrollTrigger: {
      trigger: ".hero",
      scrub: 1,
      pin: true,
      start: "top top",
      end: "+=500",
    },
  });

  /* ===== Three.js Background ===== */
  gsap.to("#three-bg", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".hero",
      scrub: 1,
      start: "top top",
      end: "+=500",
    },
  });

  /* ===== Navbar ===== */
  gsap.to(".navbar", {
    opacity: 1,
    pointerEvents: "auto",
    scrollTrigger: {
      trigger: "#about",
      scrub: 1,
      start: "top top",
      end: "+=100",
    },
  });
});
