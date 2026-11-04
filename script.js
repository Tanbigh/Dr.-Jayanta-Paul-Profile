document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  // Editorial intro: auto-dismiss after a short loading moment; users can enter immediately.
  const introLoader = document.getElementById("introLoader");
  const introEnter = document.getElementById("introEnter");
  const dismissIntro = () => {
    if (!introLoader || introLoader.classList.contains("is-leaving")) return;
    introLoader.classList.add("is-leaving");
    document.body.classList.remove("intro-active");
    window.setTimeout(() => introLoader.remove(), 500);
  };
  if (introLoader) {
    document.body.classList.add("intro-active");
    introEnter?.addEventListener("click", dismissIntro);
    window.setTimeout(dismissIntro, 1200);
  }


  const menuButton = document.getElementById("menuButton");
  const mainNav = document.getElementById("mainNav");
  menuButton?.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    menuButton.innerHTML = mainNav.classList.contains("open")
      ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  });

  mainNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  document.querySelectorAll(".reveal").forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 75}ms`;
    observer.observe(el);
  });

  const roles = ["Machine Learning", "Deep Learning", "Computer Vision", "Multimodal AI", "Natural Language Processing"];
  const roleEl = document.getElementById("rotatingRole");
  let roleIndex = 0;
  if (roleEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(() => {
      roleEl.classList.add("role-out");
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleEl.textContent = roles[roleIndex];
        roleEl.classList.remove("role-out");
      }, 250);
    }, 2300);
  }

  const progress = document.getElementById("scrollProgress");
  const updateProgress = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  document.getElementById("year").textContent = new Date().getFullYear();
});
