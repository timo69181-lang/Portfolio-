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

  // Shared helper: builds a client logo card (no name)
  function createClientCard(client) {
    const card = document.createElement('a');
    card.href = client.project ? `project.html?id=${encodeURIComponent(client.project)}` : 'clients.html';
    card.className = 'client-card';
    card.setAttribute('title', client.name);

    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'client-card-media';

    const img = document.createElement('img');
    if (client.logo) {
      img.src = `assets/logos/${encodeURIComponent(client.logo)}`;
      img.alt = client.name;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = () => {
        img.remove();
        const fallback = document.createElement('span');
        fallback.className = 'client-name-fallback';
        fallback.textContent = client.name;
        mediaWrap.appendChild(fallback);
      };
      mediaWrap.appendChild(img);
    } else {
      const fallback = document.createElement('span');
      fallback.className = 'client-name-fallback';
      fallback.textContent = client.name;
      mediaWrap.appendChild(fallback);
    }

    card.appendChild(mediaWrap);
    return card;
  }

  // Shared helper: builds a marquee slide containing a client logo card
  function createClientSlide(client) {
    const slide = document.createElement('div');
    slide.className = 'marquee-slide';
    slide.appendChild(createClientCard(client));
    return slide;
  }

  function fillMarqueeWithClients(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = '';
    CLIENTS.forEach(client => containerEl.appendChild(createClientSlide(client)));
  }

  function fillClientsGrid(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = '';
    CLIENTS.forEach(client => containerEl.appendChild(createClientCard(client)));
  }

  // --- CLIENTS PAGE GRID ---
  fillClientsGrid(document.getElementById('clients-grid'));

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

  // --- MARQUEE INFINITE LOOP SETUP ---
  document.querySelectorAll('.slider-marquee-track').forEach(function(track) {
    if (track.getAttribute('data-marquee-ready') === 'true') return;
    track.setAttribute('data-marquee-ready', 'true');

    var originals = Array.prototype.slice.call(track.children);
    if (originals.length === 0) return;

    // Seamless infinite loop: the CSS keyframe translates the track -50%,
    // so exactly 2 identical halves are enough. Using only 2 copies means
    // every logo/image is repeated at most twice instead of four to ten.
    var copies = 2;

    for (var c = 1; c < copies; c += 1) {
      originals.forEach(function(s) {
        var clone = s.cloneNode(true);
        clone.removeAttribute('id');
        track.appendChild(clone);
      });
    }
  });

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




