(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pageRoots = document.querySelectorAll(".reese-space, .reese-projects");

  pageRoots.forEach(function (root) {
    root.classList.add("is-reveal-ready");
  });

  function initNavigation() {
    var links = document.querySelectorAll('a[href*="#"]');

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var href = link.getAttribute("href");
        if (!href || href.indexOf("#") === -1) return;

        var url;
        try {
          url = new URL(href, window.location.href);
        } catch (error) {
          return;
        }

        var targetId = url.hash.slice(1);
        if (!targetId || url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;

        var target = document.getElementById(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      });
    });
  }

  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initProjectFilters() {
    var filters = document.querySelectorAll("[data-filter]");
    var cards = document.querySelectorAll(".rp-project-card[data-category]");
    if (!filters.length || !cards.length) return;

    filters.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-filter");

        filters.forEach(function (filterButton) {
          filterButton.classList.toggle("active", filterButton === button);
        });

        cards.forEach(function (card) {
          var categories = card.getAttribute("data-category") || "";
          var shouldShow = filter === "all" || categories.split(" ").indexOf(filter) !== -1;
          card.classList.toggle("is-hidden", !shouldShow);
        });
      });
    });
  }

  function initCardDepth() {
    if (prefersReducedMotion) return;

    var cards = document.querySelectorAll(".rp-project-card");
    cards.forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        var rect = card.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = "perspective(900px) rotateX(" + (-y * 3).toFixed(2) + "deg) rotateY(" + (x * 4).toFixed(2) + "deg) translateY(-3px)";
      });

      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  function initGalleryScroll() {
    var galleries = document.querySelectorAll("[data-rh-gallery]");
    if (!galleries.length || prefersReducedMotion) return;

    galleries.forEach(function (gallery) {
      if (window.innerWidth <= 760) return;

      var track = gallery.querySelector(".rh-gallery-track");
      if (!track || track.getAttribute("data-rh-cloned") === "true") return;

      var originalItems = Array.prototype.slice.call(track.children);
      var firstClone = null;

      originalItems.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("tabindex", "-1");
        if (!firstClone) firstClone = clone;
        track.appendChild(clone);
      });
      track.setAttribute("data-rh-cloned", "true");

      function setLoopDistance() {
        if (!firstClone) return;
        var distance = firstClone.offsetLeft;
        if (distance > 0) {
          track.style.setProperty("--rh-loop-distance", distance + "px");
          track.classList.add("is-auto-loop");
        }
      }

      window.requestAnimationFrame(setLoopDistance);

      gallery.addEventListener("focusin", function () {
        gallery.classList.add("is-gallery-paused");
      });

      gallery.addEventListener("focusout", function () {
        gallery.classList.remove("is-gallery-paused");
      });

      gallery.addEventListener("pointerdown", function (event) {
        if (window.innerWidth <= 760) return;
        gallery.classList.add("is-gallery-paused");
      });

      gallery.addEventListener("pointerup", function () {
        gallery.classList.remove("is-gallery-paused");
      });

      gallery.addEventListener("pointerleave", function () {
        gallery.classList.remove("is-gallery-paused");
      });

      gallery.addEventListener("pointercancel", function () {
        gallery.classList.remove("is-gallery-paused");
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth > 760) window.requestAnimationFrame(setLoopDistance);
      });
    });
  }

  function initNativeFooter() {
    var footerBar = document.querySelector(".site-info .copyright-bar");
    if (!footerBar) return;

    footerBar.innerHTML = '<span class="rh-footer-title">Reese Huang</span><span class="rh-footer-line">Personal Digital Space / SEO, AI, Independent Sites, and Quiet Experiments. © 2026</span>';
  }

  function initNativeFooterWhenReady() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initNativeFooter);
      return;
    }

    initNativeFooter();
  }

  function safeInit(fn) {
    try {
      fn();
    } catch (error) {
      pageRoots.forEach(function (root) {
        root.classList.remove("is-reveal-ready");
      });
      if (window.console && console.warn) {
        console.warn("Reese module skipped:", error);
      }
    }
  }

  safeInit(initNavigation);
  safeInit(initReveal);
  safeInit(initProjectFilters);
  safeInit(initCardDepth);
  safeInit(initGalleryScroll);
  safeInit(initNativeFooterWhenReady);
})();
