// ===== Mobile nav toggle =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Scroll-reveal animation =====
// Content is visible by default (see CSS). Here we only pre-hide
// elements that start below the fold, then reveal them on scroll.
// If IntersectionObserver isn't supported, we skip this entirely
// and everything just stays visible.
if ("IntersectionObserver" in window) {
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          entry.target.classList.remove("pre");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    // Only pre-hide elements that aren't already on screen.
    if (rect.top > window.innerHeight || rect.bottom < 0) {
      el.classList.add("pre");
    }
    revealObserver.observe(el);
  });
}

// ===== Active nav link highlighting =====
const sections = document.querySelectorAll("main section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinkEls.forEach((link) => {
          link.classList.toggle("active", link.dataset.nav === id);
        });
      }
    });
  },
  { threshold: 0.4, rootMargin: "-80px 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));
