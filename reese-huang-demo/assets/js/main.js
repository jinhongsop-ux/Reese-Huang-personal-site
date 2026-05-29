(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pageRoots = document.querySelectorAll(".reese-space, .reese-projects");

  pageRoots.forEach(function (root) {
    root.classList.add("is-reveal-ready");
  });

  function initNavigation() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var nav = toggle ? toggle.closest(".rs-nav") : null;
    var links = document.querySelectorAll('a[href^="#"], a[href*=".html#"]');

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var isOpen = nav.classList.toggle("menu-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    }

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var href = link.getAttribute("href");
        if (!href || href.indexOf("#") === -1) return;

        var currentPage = window.location.pathname.split("/").pop() || "index.html";
        var parts = href.split("#");
        var targetPage = parts[0];
        var targetId = parts[1];

        if (!targetId) return;
        if (targetPage && targetPage !== currentPage) return;

        var target = document.getElementById(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
        if (nav) {
          nav.classList.remove("menu-open");
          toggle.setAttribute("aria-expanded", "false");
        }
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
      var track = gallery.querySelector(".rh-gallery-track");
      if (!track || track.getAttribute("data-rh-cloned") === "true") return;

      var originalItems = Array.prototype.slice.call(track.children);
      originalItems.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("tabindex", "-1");
        track.appendChild(clone);
      });
      track.setAttribute("data-rh-cloned", "true");

      var isDragging = false;
      var isPaused = false;
      var isVisible = true;
      var startX = 0;
      var startScroll = 0;
      var lastTime = 0;
      var speed = 18;

      function getLoopPoint() {
        return Math.max(1, track.scrollWidth / 2);
      }

      function normalizeScroll() {
        var loopPoint = getLoopPoint();
        if (gallery.scrollLeft >= loopPoint) {
          gallery.scrollLeft -= loopPoint;
        } else if (gallery.scrollLeft < 0) {
          gallery.scrollLeft += loopPoint;
        }
      }

      function setPaused(value) {
        isPaused = value;
      }

      function tick(time) {
        if (!lastTime) lastTime = time;
        var delta = Math.min(34, time - lastTime);
        lastTime = time;

        if (!isPaused && !isDragging && isVisible && window.innerWidth > 760) {
          gallery.scrollLeft += (speed * delta) / 1000;
          normalizeScroll();
        }

        window.requestAnimationFrame(tick);
      }

      gallery.addEventListener("wheel", function (event) {
        if (window.innerWidth <= 760) return;
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

        event.preventDefault();
        gallery.scrollLeft += event.deltaY;
        normalizeScroll();
      }, { passive: false });

      gallery.addEventListener("pointerenter", function () {
        setPaused(true);
      });

      gallery.addEventListener("pointerleave", function () {
        if (!isDragging) setPaused(false);
      });

      gallery.addEventListener("focusin", function () {
        setPaused(true);
      });

      gallery.addEventListener("focusout", function () {
        setPaused(false);
      });

      gallery.addEventListener("pointerdown", function (event) {
        if (window.innerWidth <= 760) return;
        isDragging = true;
        setPaused(true);
        startX = event.clientX;
        startScroll = gallery.scrollLeft;
        gallery.setPointerCapture(event.pointerId);
      });

      gallery.addEventListener("pointermove", function (event) {
        if (!isDragging) return;
        gallery.scrollLeft = startScroll - (event.clientX - startX);
        normalizeScroll();
      });

      gallery.addEventListener("pointerup", function (event) {
        isDragging = false;
        if (gallery.hasPointerCapture(event.pointerId)) {
          gallery.releasePointerCapture(event.pointerId);
        }
        if (!gallery.matches(":hover")) setPaused(false);
      });

      gallery.addEventListener("pointercancel", function () {
        isDragging = false;
        if (!gallery.matches(":hover")) setPaused(false);
      });

      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            isVisible = entry.isIntersecting;
          });
        }, { threshold: 0.05 });
        observer.observe(gallery);
      }

      window.requestAnimationFrame(tick);
    });
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
})();
