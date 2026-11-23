(() => {
  const ids = ["leafboat", "monster-ranch", "maya", "academy-mist", "archeditor", "bamiyan"];
  const projects = ids.map((id) => document.getElementById(id)).filter(Boolean);
  const rail = document.querySelector(".project-rail");
  const mobile = document.querySelector(".mobile-index");
  const select = document.getElementById("mobile-project-select");
  const railCount = document.getElementById("rail-count");
  const mobileCount = document.getElementById("mobile-count");
  const progress = document.getElementById("rail-progress");
  const works = document.getElementById("works");

  function setActive(id) {
    const index = Math.max(0, ids.indexOf(id));
    document.querySelectorAll("[data-project-link]").forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    const label = `${String(index + 1).padStart(2, "0")} / ${String(ids.length).padStart(2, "0")}`;
    railCount.textContent = label;
    mobileCount.textContent = label;
    progress.style.width = `${((index + 1) / ids.length) * 100}%`;
    if (select.value !== id) select.value = id;
  }

  let ticking = false;
  function update() {
    const marker = window.innerHeight * 0.34;
    let active = ids[0];
    projects.forEach((project) => {
      if (project.getBoundingClientRect().top <= marker) active = project.id;
    });
    setActive(active);
    const visible = works.getBoundingClientRect().top <= window.innerHeight * 0.25 && works.getBoundingClientRect().bottom > 150;
    rail.classList.toggle("is-visible", visible);
    mobile.classList.toggle("is-visible", visible);
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener("resize", update);
  select.addEventListener("change", () => {
    const target = document.getElementById(select.value);
    if (target) target.scrollIntoView({ block: "start" });
  });
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ block: "start" });
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });
  update();
})();
