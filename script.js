document.addEventListener('DOMContentLoaded', () => {

  // Preloader
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 600);

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- Theme Toggle ----
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) html.setAttribute('data-bs-theme', savedTheme);
  if (savedTheme === 'light') icon.className = 'bi bi-sun-fill fs-5';

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-bs-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', next);
    icon.className = next === 'dark' ? 'bi bi-moon-fill fs-5' : 'bi bi-sun-fill fs-5';
    localStorage.setItem('theme', next);
    reapplyCustomAccent();
  });

  // ---- Color Picker ----
  const colorPicker = document.getElementById('colorPicker');
  const colorPickerBtn = document.getElementById('colorPickerBtn');

  function hexToRgb(hex) {
    const v = parseInt(hex.replace('#', ''), 16);
    return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
  }

  function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function hexToHSL(hex) {
    const { r, g, b } = hexToRgb(hex);
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const mx = Math.max(rn, gn, bn), mn = Math.min(rn, gn, bn);
    const l = (mx + mn) / 2;
    if (mx === mn) return { h: 0, s: 0, l: l * 100 };
    const d = mx - mn;
    const s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    let h;
    switch (mx) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  function deriveAccent2(hex) {
    const hsl = hexToHSL(hex);
    const h = (hsl.h + 298) % 360;
    const s = Math.max(hsl.s - 15, 30);
    const l = Math.max(hsl.l - 20, 25);
    return hslToHex(h, s, l);
  }

  function applyAccentColor(hex) {
    const { r, g, b } = hexToRgb(hex);
    const accent2 = deriveAccent2(hex);
    const { r: r2, g: g2, b: b2 } = hexToRgb(accent2);
    const root = document.documentElement;
    root.style.setProperty('--accent', hex);
    root.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
    root.style.setProperty('--accent2', accent2);
    root.style.setProperty('--accent2-rgb', `${r2}, ${g2}, ${b2}`);
    root.style.setProperty('--glow', `rgba(${r}, ${g}, ${b}, 0.25)`);
    localStorage.setItem('custom_accent', hex);
  }

  function reapplyCustomAccent() {
    const saved = localStorage.getItem('custom_accent');
    if (saved) applyAccentColor(saved);
  }

  const savedAccent = localStorage.getItem('custom_accent');
  if (savedAccent) {
    colorPicker.value = savedAccent;
    applyAccentColor(savedAccent);
  }

  colorPickerBtn.addEventListener('click', () => colorPicker.click());
  colorPicker.addEventListener('input', e => applyAccentColor(e.target.value));

  // ---- Mobile menu ----
  const menuToggle = document.getElementById('menuToggle');
  const navbarCollapse = document.getElementById('navbarNav');
  const hamburger = menuToggle.querySelector('.hamburger');

  menuToggle.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarCollapse.classList.toggle('show');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbarCollapse.classList.remove('show');
      hamburger.classList.remove('active');
    });
  });

  // ---- Typing Effect ----
  const titles = ['Software Engineer', 'Full Stack Developer', 'UI/UX Designer', 'Problem Solver'];
  const typedEl = document.getElementById('typedText');
  let titleIndex = 0, charIndex = 0, isDeleting = false;

  function typeEffect() {
    const current = titles[titleIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) { isDeleting = false; titleIndex = (titleIndex + 1) % titles.length; }
    } else {
      typedEl.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) { isDeleting = true; setTimeout(typeEffect, 1200); return; }
    }
    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }
  typeEffect();

  // ---- Tilt Cards ----
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = (y - cy) / cy * -8;
      const ry = (x - cx) / cx * 8;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ---- Smooth Scroll ----
  function scrollToSection(id) {
    const el = document.querySelector(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      e.preventDefault();
      scrollToSection(id);
    });
  });

  // ---- Fade In on Scroll ----
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  // ---- Stat Counter ----
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(stat => {
          const target = parseInt(stat.dataset.target);
          if (target === 0) { stat.textContent = '0'; return; }
          let current = 0;
          const step = Math.ceil(target / 50);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(interval); }
            stat.textContent = current + '+';
          }, 30);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsGrid = document.getElementById('statsGrid');
  if (statsGrid) statObserver.observe(statsGrid);

  // ---- Skill Bar Animation ----
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-item').forEach(item => {
          const bar = item.querySelector('.progress-bar');
          const target = bar.style.width;
          bar.style.setProperty('--target', target);
          item.classList.add('animated');
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillObserver.observe(skillsSection);

  // ---- Circular Gauge Animation ----
  const circularObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const rings = entry.target.querySelectorAll('.progress-ring');
        rings.forEach(ring => {
          const percent = parseInt(ring.dataset.percent) || 0;
          const radius = parseInt(ring.getAttribute('r')) || 40;
          const circ = 2 * Math.PI * radius;
          ring.style.transition = 'none';
          ring.style.strokeDasharray = circ;
          ring.style.strokeDashoffset = circ;
          ring.getBoundingClientRect();
          ring.style.transition = '';
          requestAnimationFrame(() => {
            ring.style.strokeDashoffset = circ * (1 - percent / 100);
          });
        });
        circularObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const circularSkills = document.getElementById('circularSkills');
  if (circularSkills) circularObserver.observe(circularSkills);

  // ---- Back to Top ----
  const backToTop = document.getElementById('backToTop');
  const backToTopRing = document.getElementById('backToTopRing');
  const ringCirc = 2 * Math.PI * 20;
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---- Language Selector ----
  const savedLang = localStorage.getItem('preferred_lang') || 'en';
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === savedLang) btn.classList.add('active');
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('preferred_lang', btn.dataset.lang);
    });
  });

  // ---- Download CV ----
  document.getElementById('downloadCv').addEventListener('click', async () => {
    try {
      const response = await fetch('Alex_Olajide_CV.pdf');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Alex_Olajide_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      const link = document.createElement('a');
      link.href = 'Alex_Olajide_CV.pdf';
      link.download = 'Alex_Olajide_CV.pdf';
      link.click();
    }
  });

  // ---- Send Message (Netlify Forms) ----
  const contactForm = document.querySelector('form[name="contact"]');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();
      const status = document.getElementById('formStatus');
      if (!name || !email || !message) {
        status.className = 'mt-3 text-warning';
        status.textContent = 'Please fill in all fields';
        status.classList.remove('d-none');
        return;
      }
      const data = new URLSearchParams(new FormData(contactForm));
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString()
      })
        .then(res => {
          if (res.ok) {
            contactForm.reset();
            status.className = 'mt-3 text-success';
            status.textContent = 'Message sent successfully!';
          } else {
            throw new Error('Submission failed');
          }
        })
        .catch(() => {
          status.className = 'mt-3 text-danger';
          status.textContent = 'Something went wrong. Please try again.';
        })
        .finally(() => status.classList.remove('d-none'));
    });
  }

  // ---- Book Meeting ----
  document.getElementById('bookMeeting').addEventListener('click', e => {
    e.preventDefault();
    window.open('https://calendly.com/aolajide210', '_blank');
  });

  // ---- Consolidated Scroll Handler ----
  const sections = document.querySelectorAll('section[id]');
  const navDots = document.querySelectorAll('.nav-dot');
  const mainNav = document.getElementById('mainNav');
  const scrollProgress = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;

    mainNav.classList.toggle('scrolled', scrollY > 50);
    backToTop.classList.toggle('show', scrollY > 400);

    const pct = Math.min(scrollY / h, 1);
    backToTopRing.style.strokeDashoffset = ringCirc * (1 - pct);
    scrollProgress.style.width = (pct * 100) + '%';

    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY > top && scrollY < bottom);
      }
    });

    navDots.forEach(dot => {
      const section = document.getElementById(dot.dataset.section);
      if (section) {
        const top = section.offsetTop - 150;
        const bottom = top + section.offsetHeight;
        dot.classList.toggle('active', scrollY > top && scrollY < bottom);
      }
    });
  });
});
