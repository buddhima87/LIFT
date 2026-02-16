/* ============================================
   LIFT FITNESS — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  const registerFloat = document.getElementById('registerFloat');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
      if (registerFloat) registerFloat.style.opacity = '1';
    } else {
      navbar.classList.remove('scrolled');
      if (registerFloat) registerFloat.style.opacity = '0';
    }
  });

  // Initially hide floating register on hero
  if (registerFloat) registerFloat.style.opacity = '0';
  if (registerFloat) registerFloat.style.transition = 'opacity 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease';

  // ---- Mobile Menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a:not(.btn)').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.ceil(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ---- Location Tabs (Membership Page) ----
  const locationTabs = document.querySelectorAll('.location-tab');
  const locationContents = document.querySelectorAll('.location-content');

  locationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const location = tab.getAttribute('data-location');

      // Update tabs
      locationTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update content
      locationContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === location) {
          content.classList.add('active');
        }
      });
    });
  });

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ---- Contact Form (FormSubmit.co) ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    let isSubmitting = false;

    contactForm.addEventListener('submit', () => {
      isSubmitting = true;
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = '⏳ Sending...';
      btn.style.background = '#eab308'; // optional: change to yellow/warning color while sending
      btn.disabled = true;
    });

    const hiddenIframe = document.querySelector('iframe[name="hiddenFrame"]');
    if (hiddenIframe) {
      hiddenIframe.addEventListener('load', () => {
        if (isSubmitting) {
          const btn = contactForm.querySelector('button[type="submit"]');
          btn.textContent = '✓ Message Sent!';
          btn.style.background = '#22c55e';
          btn.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.3)';

          contactForm.reset();
          isSubmitting = false;

          // Reset button after 3 seconds
          setTimeout(() => {
            btn.textContent = 'Send Message →';
            btn.style.background = '';
            btn.style.boxShadow = '';
            btn.disabled = false;
          }, 3000);
        }
      });
    }
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const hrefValue = this.getAttribute('href');
      if (hrefValue === '#') return;

      e.preventDefault();
      const target = document.querySelector(hrefValue);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Scroll-Spy Active Link Highlighting ----
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a:not(.btn)');

  const scrollSpy = () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href');
          if (href === `#${id}` || href === `index.html#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Run on load

});
