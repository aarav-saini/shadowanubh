gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
    smooth: true,
    lerp: 0.1,
});
lenis.on("scroll", () => {
    ScrollTrigger.update();
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
const navLinks = document.querySelectorAll('.navLink[goto^="#"]');
navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("goto");
        if (!target) return;
        lenis.scrollTo(target, {
            duration: 1.2,
            offset: 0,
        });
    });
});
const heroTl = gsap.timeline();
heroTl.fromTo(
    ".heroBg h1",
    { "--flame-blur": "40px" },
    { "--flame-blur": "15px", duration: 0.5, ease: "power3.out" }
);
heroTl.from(".heroBg h1", {
    scale: 0.6,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
});
heroTl.from(
    ".heroContent .so",
    {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
    },
    "-=0.6"
);
gsap.to(".heroContent .so", {
    y: -10,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
});