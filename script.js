document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.getElementById('themeToggle');
  const scrollTop = document.querySelector('.scroll-top');
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');
  const visitorCount = document.getElementById('visitorCount');

  let lastScroll = 0;
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2000);

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverElements = document.querySelectorAll('a, button, .btn, .social-links a, .service-card, .skill-card, .project-card, .stat, .contact-item, .filter-btn, .theme-toggle');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

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

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTop.classList.add('active');
    } else {
      scrollTop.classList.remove('active');
    }
    
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    const currentScroll = window.scrollY;
    if (currentScroll <= 0) {
      navbar.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animateSkillBars(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });

  function animateSkillBars(section) {
    if (section.id === 'skills') {
      const progressBars = section.querySelectorAll('.progress');
      progressBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width') || bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, index * 150);
      });
    }
    
    if (section.id === 'languages') {
      const levelFills = section.querySelectorAll('.level-fill');
      levelFills.forEach((bar, index) => {
        const width = bar.getAttribute('data-width') || bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, index * 200);
      });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
    const subtitleWords = ['Full Stack Engineer', 'Web Developer', 'Problem Solver', 'Creative Coder'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = subtitleWords[wordIndex];
      
      if (isDeleting) {
        typewriter.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriter.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % subtitleWords.length;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 2000);
  }

  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 1000 } },
        color: { value: '#00d9ff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00d9ff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' }
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }

  const statNumbers = document.querySelectorAll('.stat h4');
  statNumbers.forEach(stat => {
    const target = parseInt(stat.textContent) || 0;
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + '+';
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current) + '+';
      }
    }, 30);
  });

  const magneticBtns = document.querySelectorAll('.magnetic');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialPrev = document.querySelector('.testimonial-prev');
  const testimonialNext = document.querySelector('.testimonial-next');
  const testimonialDotsContainer = document.querySelector('.testimonial-dots');
  let currentTestimonial = 0;

  testimonialCards.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    testimonialDotsContainer.appendChild(dot);
  });

  const testimonialDots = document.querySelectorAll('.testimonial-dot');

  function goToTestimonial(index) {
    testimonialCards.forEach(card => card.style.display = 'none');
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[index].style.display = 'block';
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
  }

  testimonialCards.forEach((card, index) => {
    if (index !== 0) card.style.display = 'none';
  });

  testimonialPrev.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    goToTestimonial(currentTestimonial);
  });

  testimonialNext.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    goToTestimonial(currentTestimonial);
  });

  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    goToTestimonial(currentTestimonial);
  }, 5000);

  const contactForm = document.getElementById('contactForm');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        contactForm.reset();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Message saved! (Server not running - contact form will work when deployed)');
      contactForm.reset();
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  let viewCount = parseInt(localStorage.getItem('viewCount') || '0');
  viewCount++;
  localStorage.setItem('viewCount', viewCount);
  
  if (visitorCount) {
    visitorCount.textContent = viewCount;
    animateCounter(visitorCount, viewCount);
  }

  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 30);
  }

  document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });

  const faqItemsAnimated = document.querySelectorAll('.faq-item');
  faqItemsAnimated.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
  });

  const statElements = document.querySelectorAll('.stat');
  statElements.forEach((stat, index) => {
    stat.style.animationDelay = `${index * 0.2}s`;
  });

  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});

function shareOn(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent('Check out Alex Olajide - Full Stack Engineer Portfolio');
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp: `https://wa.me/?text=${title}%20${url}`
  };
  
  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('visibilitychange', () => {
  const loader = document.querySelector('.loader');
  if (document.hidden) {
    document.title = 'Come back soon... | Alex Olajide';
  } else {
    document.title = 'Alex Olajide | Full Stack Engineer';
  }
});
