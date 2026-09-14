document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');
  const themeToggle = document.getElementById('themeToggle');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  /* ---------- Theme ---------- */
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  /* ---------- Mobile menu ---------- */
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  /* ---------- Navbar / scroll-to-top on scroll ---------- */
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
    scrollTop.classList.toggle('active', window.scrollY > 400);

    // Active section highlight
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Smooth scroll for hash links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---------- Typewriter ---------- */
  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
    const words = ['Full Stack Engineer', 'React & Angular Developer', 'Laravel & Node.js Developer', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const word = words[wordIndex];
      if (deleting) {
        typewriter.textContent = word.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriter.textContent = word.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = deleting ? 40 : 90;

      if (!deleting && charIndex === word.length) {
        speed = 1800;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }

      setTimeout(type, speed);
    }
    setTimeout(type, 500);
  }

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- Skill bars ---------- */
  const skillsSection = document.getElementById('skills');
  let barsAnimated = false;

  const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !barsAnimated) {
        barsAnimated = true;
        document.querySelectorAll('.skill-progress').forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.getAttribute('data-width') + '%';
          }, index * 90);
        });
        skillsObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });

  if (skillsSection) skillsObserver.observe(skillsSection);

  /* ---------- Project filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const show = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const original = submitBtn.innerHTML;
      const statusEl = document.createElement('div');
      statusEl.className = 'form-status';
      contactForm.appendChild(statusEl);

      const data = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value
      };

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          statusEl.className = 'form-status success';
          statusEl.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
          contactForm.reset();
        } else {
          throw new Error('Request failed');
        }
      } catch {
        // Static hosting fallback: open the visitor's email client with the message pre-filled.
        const subject = encodeURIComponent(data.subject || `Portfolio inquiry from ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\n- ${data.name}\n${data.email}`);
        window.location.href = `mailto:aolajide210@gmail.com?subject=${subject}&body=${body}`;
        statusEl.className = 'form-status success';
        statusEl.textContent = 'Opening your email app to send the message...';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = original;
        setTimeout(() => statusEl.remove(), 8000);
      }
    });
  }
});