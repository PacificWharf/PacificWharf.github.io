const revealItems = document.querySelectorAll(".reveal");
const sectionNavLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const trackedSections = document.querySelectorAll("main section[id]");
const yearNode = document.getElementById("current-year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const updateSectionNavState = () => {
  if (sectionNavLinks.length === 0 || trackedSections.length === 0) {
    return;
  }

  const headerOffset = 120;
  const marker = window.scrollY + headerOffset;
  let activeSectionId = trackedSections[0]?.id ?? "";

  trackedSections.forEach((section) => {
    if (section.offsetTop <= marker) {
      activeSectionId = section.id;
    }
  });

  sectionNavLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${activeSectionId}`;
    if (isCurrent) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

if ("IntersectionObserver" in window) {
  if (revealItems[0]) {
    revealItems[0].classList.add("is-visible");
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}

let navUpdateScheduled = false;

const requestNavUpdate = () => {
  if (navUpdateScheduled) {
    return;
  }

  navUpdateScheduled = true;
  window.requestAnimationFrame(() => {
    updateSectionNavState();
    navUpdateScheduled = false;
  });
};

if (sectionNavLinks.length > 0 && trackedSections.length > 0) {
  updateSectionNavState();
  window.addEventListener("scroll", requestNavUpdate, { passive: true });
  window.addEventListener("resize", requestNavUpdate);
  window.addEventListener("hashchange", requestNavUpdate);
}

const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (siteHeader && menuToggle && siteNav) {
  const closeMenu = () => {
    siteHeader.classList.remove("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("is-menu-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

const archiveSearchInput = document.getElementById("archive-search");
const archiveCards = document.querySelectorAll("[data-filter-card]");
const archiveEmptyState = document.getElementById("archive-empty-state");

if (archiveSearchInput && archiveCards.length > 0) {
  const getCardText = (card) => {
    const title = card.querySelector("h3")?.textContent ?? "";
    const summary = card.querySelector("p")?.textContent ?? "";
    return `${title} ${summary}`.toLowerCase();
  };

  const filterArchiveCards = () => {
    const query = archiveSearchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    archiveCards.forEach((card) => {
      const matches = query.length === 0 || getCardText(card).includes(query);

      if (matches) {
        visibleCount += 1;
        card.removeAttribute("aria-hidden");
        card.removeAttribute("tabindex");

        if (card.classList.contains("is-filtered-out")) {
          card.classList.remove("is-filtered-out");
          card.classList.add("is-filtered-in");

          window.setTimeout(() => {
            card.classList.remove("is-filtered-in");
          }, 280);
        }

        return;
      }

      card.classList.remove("is-filtered-in");
      card.classList.add("is-filtered-out");
      card.setAttribute("aria-hidden", "true");
      card.setAttribute("tabindex", "-1");
    });

    if (archiveEmptyState) {
      archiveEmptyState.hidden = visibleCount !== 0;
    }
  };

  archiveSearchInput.addEventListener("input", filterArchiveCards);
}
