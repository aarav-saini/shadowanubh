document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  gsap.to(".t.mask", {
    scale: 50,
    scrollTrigger: {
      trigger: ".hero",
      scrub: 1,
      pin: true,
      start: "top top",
      end: "+=1000",
    },
  });

  SplitText.create(".quote", {
    type: "lines, words",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        y: 50,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: "#quote",
          scrub: 1,
          pin: true,
          start: "top top",
          end: "+=500",
        },
      });
    },
  });
  gsap.to(".navbar", {
    opacity: 1,
    pointerEvents: "auto",
    scrollTrigger: {
      trigger: "#about",
      scrub: 1,
      start: "top top",
      end: "+=500",
    },
  });
});
