
document.addEventListener("DOMContentLoaded", () => {
  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-links a");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // CLOSE MENU WHEN A LINK IS CLICKED
  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  // REVEAL ELEMENTS ON SCROLL
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ANIMATED SKILL PROGRESS BARS
  const skillFills = document.querySelectorAll(".skill-fill");

  if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const level = bar.dataset.level;

            bar.style.setProperty("--level", level);
            bar.classList.add("animated");

            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.35 }
    );

    skillFills.forEach((bar) => {
      skillObserver.observe(bar);
    });
  } else {
    skillFills.forEach((bar) => {
      bar.style.setProperty("--level", bar.dataset.level);
      bar.classList.add("animated");
    });
  }

  // ACTIVE NAVIGATION SECTION
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navItems.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${entry.target.id}`
              );
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // AUTOMATIC COPYRIGHT YEAR
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // WARN IF A SAMPLE FIGMA LINK HAS NOT BEEN REPLACED
  // document.querySelectorAll(".prototype-link").forEach((link) => {
  //   link.addEventListener("click", (event) => {
  //     if (link.getAttribute("href") === "https://www.figma.com/design/pkazh7WlS4OVLrMujz11Py/Gpay-clone-app-design?node-id=0-1&t=bb6WKtdLbrIryi5G-1") {
  //       event.preventDefault();
  //       alert(
  //         "Please replace this sample link with your actual Figma prototype URL."
  //       );
  //     }
  //   });
  // });

});
