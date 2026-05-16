const form = document.querySelector("#schedule-form");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const heroImage = document.querySelector(".hero > img");

document.body.classList.add("js-ready");

const revealTargets = [
  ".section-heading",
  ".service-grid article",
  ".about-image",
  ".about-copy",
  ".gallery-grid figure",
  ".reviews-heading",
  ".review-grid blockquote",
  ".trust-band div",
  ".contact-info",
  ".schedule-form"
];

const revealElements = revealTargets.flatMap((selector) => Array.from(document.querySelectorAll(selector)));

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.18 }
  );

  revealElements.forEach((element) => observer.observe(element));

  window.requestAnimationFrame(() => {
    revealElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
        element.classList.add("is-visible");
      }
    });
  });
}

let ticking = false;

const updateScrollMotion = () => {
  const scrollY = window.scrollY || 0;
  header?.classList.toggle("is-scrolled", scrollY > 28);

  if (heroImage && !prefersReducedMotion) {
    const heroShift = Math.min(scrollY * 0.12, 42);
    const heroScale = 1.03 + Math.min(scrollY / 8000, 0.035);
    heroImage.style.setProperty("--hero-y", `${heroShift}px`);
    heroImage.style.setProperty("--hero-scale", heroScale.toFixed(3));
  }

  ticking = false;
};

const requestScrollMotion = () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollMotion);
    ticking = true;
  }
};

updateScrollMotion();
window.addEventListener("scroll", requestScrollMotion, { passive: true });

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get("name")?.toString().trim() || "Website visitor";
    const email = data.get("email")?.toString().trim() || "";
    const phone = data.get("phone")?.toString().trim() || "";
    const date = data.get("date")?.toString().trim() || "";
    const message = data.get("message")?.toString().trim() || "";

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Preferred date: ${date}`,
      "",
      "Piano / service notes:",
      message
    ].join("\n");

    const mailto = new URL("mailto:cookpianoservice@gmail.com");
    mailto.searchParams.set("subject", `Piano service request from ${name}`);
    mailto.searchParams.set("body", body);
    window.location.href = mailto.toString();
  });
}
