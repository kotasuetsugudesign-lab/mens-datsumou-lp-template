document.addEventListener("DOMContentLoaded", () => {

  /* =========================
  Fade-up Animation
  ========================= */

  const fadeElements = document.querySelectorAll(".fade-up");

  if (fadeElements.length > 0) {

    const fadeObserver = new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

  }



  /* =========================
  Stats Count Animation
  ========================= */

  const stats = document.querySelectorAll(".stat-number span");

  if (stats.length > 0) {

    const countObserver = new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const el = entry.target;
          const target = parseInt(el.textContent.replace(/,/g, ""));
          let count = 0;

          const duration = 1500;
          const step = target / (duration / 16);

          function update() {

            count += step;

            if (count < target) {

              el.textContent = Math.floor(count).toLocaleString();
              requestAnimationFrame(update);

            } else {

              el.textContent = target.toLocaleString();

            }

          }

          update();
          observer.unobserve(el);

        }

      });

    }, { threshold: 0.5 });

    stats.forEach(stat => countObserver.observe(stat));

  }



  /* =========================
  FAQ Accordion
  ========================= */

  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {

    faqItems.forEach(item => {

      const question = item.querySelector(".faq-q");
      const answer = item.querySelector(".faq-a");

      if (!question || !answer) return;

      question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach(otherItem => {

          otherItem.classList.remove("active");

          const otherAnswer = otherItem.querySelector(".faq-a");
          if (otherAnswer) otherAnswer.style.maxHeight = null;

        });

        if (!isActive) {

          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";

        }

      });

    });

  }



  /* =========================
  Header Scroll Effect
  ========================= */

  const header = document.querySelector("header");
  const fv = document.querySelector(".fv");

  function handleScroll() {

    const scrollY = window.scrollY;

    if (header) {

      if (scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

    }

  }

  let ticking = false;

  window.addEventListener("scroll", () => {

    if (!ticking) {

      window.requestAnimationFrame(() => {

        handleScroll();
        ticking = false;

      });

      ticking = true;

    }

  }, { passive: true });



  /* =========================
  Smooth Scroll
  ========================= */

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(anchor => {

    anchor.addEventListener("click", function(e) {

      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight + 10 : 0;

      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });



  /* =========================
  Hamburger Menu
  ========================= */

  const hamburger = document.querySelector(".hamburger");
  const spMenu = document.querySelector(".sp-menu");
  const spLinks = document.querySelectorAll(".sp-nav a");

  if (hamburger && spMenu) {

    hamburger.addEventListener("click", () => {

      hamburger.classList.toggle("active");
      spMenu.classList.toggle("active");

      document.body.classList.toggle("menu-open");

    });

    spLinks.forEach(link => {

      link.addEventListener("click", () => {

        hamburger.classList.remove("active");
        spMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

      });

    });

  }

});