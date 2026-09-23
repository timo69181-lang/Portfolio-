(function () {
  'use strict';

  // Helper function to create clean project card with hover overlay (NO text under card)
  function createProjectCardHTML(project) {
    return `
      <div class="project-thumb-wrap">
        <img src="${getCoverImage(project)}" alt="${project.name}" loading="lazy" decoding="async" class="project-img">
        
        <div class="project-hover-overlay">
          <span class="project-hover-cat">${project.category}</span>
          <h3 class="project-hover-title">${project.name}</h3>
          <div class="project-hover-btn">
            <span>View Project</span>
          </div>
        </div>
      </div>
    `;
  }

  function setupPageTransitions() {
    document.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener('click', event => {
        const url = new URL(link.href, window.location.href);
        if (event.defaultPrevented || link.target === '_blank' || url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
        event.preventDefault();
        document.body.classList.add('is-leaving');
        window.setTimeout(() => { window.location.href = url.href; }, 380);
      });
    });
  }

  setupPageTransitions();

  // --- FEATURED CLIENTS ON HOMEPAGE (CLIENT LOGO MARQUEE) ---
  fillMarqueeWithClients(document.getElementById('featured-works-grid'));

  // --- WORKS PAGE LOGIC ---
  const worksGridEl = document.getElementById('works-grid');
  if (worksGridEl) {
    worksGridEl.innerHTML = '';

    const importantOrder = ['huawei', 'waqep', 'amlak', 'stc-pay', 'sukarah', 'danikin', 'stc-bank', 'elm', 'unity', 'valorant', 'shatana'];
    const importantProjects = importantOrder.map(id => getProject(id)).filter(Boolean);
    const otherProjects = PROJECTS.filter(p => !importantOrder.includes(p.id));

    [...importantProjects, ...otherProjects].forEach(project => {
      const card = document.createElement('a');
      card.href = `project.html?id=${encodeURIComponent(project.id)}`;
      card.className = 'project-card';
      card.innerHTML = createProjectCardHTML(project);
      worksGridEl.appendChild(card);
    });
  }

  // Only clients that actually have a logo file are ever rendered.
  function getClientsWithLogos() {
    return CLIENTS.filter(client => client.logo && String(client.logo).trim() !== '');
  }

  // Shared helper: builds a client logo card.
  function createClientCard(client, showName = true) {
    const card = document.createElement('a');
    card.href = client.project ? `project.html?id=${encodeURIComponent(client.project)}` : 'clients.html';
    card.className = 'client-card';
    card.setAttribute('title', client.name);

    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'client-card-media';

    const img = document.createElement('img');
    img.src = `assets/logos/${encodeURIComponent(client.logo)}`;
    img.alt = client.name;
    img.loading = 'lazy';
    img.decoding = 'async';
    // A logo that fails to load must never fall back to a text label:
    // the whole card (and its marquee slide) is dropped instead.
    img.onerror = () => {
      const slide = card.closest('.marquee-slide');
      (slide || card).remove();
    };
    mediaWrap.appendChild(img);

    card.appendChild(mediaWrap);
    if (showName) {
      const name = document.createElement('span');
      name.className = 'client-card-name';
      name.textContent = client.name;
      card.appendChild(name);
    }
    return card;
  }

  // Shared helper: builds a marquee slide containing a client logo card (logo only, no caption)
  function createClientSlide(client) {
    const slide = document.createElement('div');
    slide.className = 'marquee-slide';
    slide.appendChild(createClientCard(client, false));
    return slide;
  }

  function fillMarqueeWithClients(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = '';
    getClientsWithLogos().forEach(client => containerEl.appendChild(createClientSlide(client)));
  }

  function fillClientsGrid(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = '';
    getClientsWithLogos().forEach(client => containerEl.appendChild(createClientCard(client)));
  }

  // --- CLIENTS PAGE GRID ---
  fillClientsGrid(document.getElementById('clients-grid'));

  // --- INFINITE AUTO-SCROLLING MARQUEE ---
  // Drives the track with requestAnimationFrame instead of a percentage-based CSS
  // keyframe, so it stays smooth and seamless no matter how many slides exist or
  // when lazy-loaded logos change the track width.
  function initInfiniteMarquee(track) {
    if (!track || track.getAttribute('data-marquee-ready') === 'true') return;

    var originals = Array.prototype.slice.call(track.children);
    if (originals.length === 0) return;

    track.setAttribute('data-marquee-ready', 'true');

    var viewport = track.parentElement;
    var SPEED = parseFloat(track.getAttribute('data-marquee-speed')) || 45; // pixels per second
    var offset = 0;
    var loopWidth = 0;
    var paused = false;
    var lastTime = 0;
    var rafId = 0;

    // Duplicate the original slides until the track is at least twice as wide as
    // the viewport. That guarantees there is always content filling the gap when
    // the offset wraps back around, so the loop never shows empty space.
    function buildClones() {
      Array.prototype.slice.call(track.querySelectorAll('[data-marquee-clone="true"]'))
        .forEach(function (clone) { clone.remove(); });

      var liveOriginals = Array.prototype.slice.call(track.children);
      if (liveOriginals.length === 0) return;

      var baseWidth = measureWidth(liveOriginals);
      if (baseWidth <= 0) return;

      var viewportWidth = viewport ? viewport.clientWidth : window.innerWidth;
      var setsNeeded = Math.max(2, Math.ceil((viewportWidth * 2) / baseWidth) + 1);

      for (var set = 1; set < setsNeeded; set += 1) {
        liveOriginals.forEach(function (slide) {
          var clone = slide.cloneNode(true);
          clone.removeAttribute('id');
          clone.setAttribute('data-marquee-clone', 'true');
          clone.setAttribute('aria-hidden', 'true');
          Array.prototype.slice.call(clone.querySelectorAll('a')).forEach(function (link) {
            link.setAttribute('tabindex', '-1');
          });
          track.appendChild(clone);
        });
      }

      loopWidth = baseWidth;
    }

    function measureWidth(slides) {
      var total = 0;
      slides.forEach(function (slide) {
        var styles = window.getComputedStyle(slide);
        total += slide.getBoundingClientRect().width +
          parseFloat(styles.marginLeft || 0) +
          parseFloat(styles.marginRight || 0);
      });
      // Include the flex gap between the slides of one full set.
      var trackStyles = window.getComputedStyle(track);
      var gap = parseFloat(trackStyles.columnGap || trackStyles.gap || 0) || 0;
      if (gap && slides.length > 0) total += gap * slides.length;
      return total;
    }

    function step(now) {
      if (!lastTime) lastTime = now;
      var delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!paused && loopWidth > 0) {
        offset += SPEED * delta;
        // Seamless wrap: one full set of slides has scrolled by, so reset.
        if (offset >= loopWidth) offset -= loopWidth;
        track.style.transform = 'translate3d(' + (-offset).toFixed(2) + 'px, 0, 0)';
      }

      rafId = window.requestAnimationFrame(step);
    }

    function refresh() {
      buildClones();
      if (loopWidth > 0) offset = offset % loopWidth;
    }

    function start() {
      if (rafId) return;
      lastTime = 0;
      rafId = window.requestAnimationFrame(step);
    }

    function stop() {
      if (!rafId) return;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

    // The CSS keyframe animation is disabled; JS owns the movement now.
    track.style.animation = 'none';
    track.style.willChange = 'transform';

    refresh();

    if (reduceMotion && reduceMotion.matches) {
      track.style.transform = 'translate3d(0, 0, 0)';
    } else {
      start();
    }

    // Pause on hover / keyboard focus so users can click a logo.
    if (viewport) {
      viewport.addEventListener('mouseenter', function () { paused = true; });
      viewport.addEventListener('mouseleave', function () { paused = false; });
      viewport.addEventListener('focusin', function () { paused = true; });
      viewport.addEventListener('focusout', function () { paused = false; });
    }

    // Don't burn frames while the tab is hidden.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else if (!(reduceMotion && reduceMotion.matches)) start();
    });

    // Re-measure once every logo has decoded and whenever the layout changes.
    Array.prototype.slice.call(track.querySelectorAll('img')).forEach(function (img) {
      img.loading = 'eager';
      if (!img.complete) {
        img.addEventListener('load', refresh, { once: true });
        img.addEventListener('error', refresh, { once: true });
      }
    });
    window.addEventListener('load', refresh);

    var resizeTimer = 0;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 150);
    });
  }

  document.querySelectorAll('.slider-marquee-track').forEach(initInfiniteMarquee);

  // --- PROJECT DETAIL PAGE LOGIC ---
  const projectTitleEl = document.getElementById('project-title');
  const projectDescEl = document.getElementById('project-desc');
  const projectCatBadgeEl = document.getElementById('project-category-badge');
  const projectGalleryEl = document.getElementById('project-gallery');

  if (projectTitleEl && projectGalleryEl) {
    const urlParams = new URLSearchParams(window.location.search);
    const rawId = urlParams.get('id') || PROJECTS[0].id;
    const project = getProject(rawId) || getProject(decodeURIComponent(rawId)) || PROJECTS[0];

    document.title = `${project.name} — Mustafa Ali 3D Portfolio`;
    projectTitleEl.textContent = project.name;
    if (projectCatBadgeEl) projectCatBadgeEl.textContent = project.category;
    if (projectDescEl) projectDescEl.textContent = project.description;
    const projectBehanceLinkEl = document.getElementById('project-behance-link');
    if (projectBehanceLinkEl && project.behanceUrl) projectBehanceLinkEl.href = project.behanceUrl;
    projectGalleryEl.dataset.projectId = project.id;

    projectGalleryEl.innerHTML = '';
    const images = getProjectImages(project);

    images.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${project.name} Render ${idx + 1}`;
      img.loading = idx < 2 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.onerror = () => { img.style.display = 'none'; };
      projectGalleryEl.appendChild(img);
    });
  }

  // --- CONTACT FORM SUBMIT LOGIC ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (contactForm.querySelector('input[type="text"]').value || '').trim();
      const email = (contactForm.querySelector('input[type="email"]').value || '').trim();
      const message = (contactForm.querySelector('textarea').value || '').trim();

      const subject = encodeURIComponent(`New project inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const url = `https://mail.google.com/mail/?view=cm&fs=1&to=mustafaali22011@gmail.com&su=${subject}&body=${body}`;
      window.open(url, '_blank');

      contactForm.reset();
    });
  }
})();




