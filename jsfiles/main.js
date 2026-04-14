/* =============================================
   YOUTH EMPOWERMENT RWANDA — MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== 1. NAVBAR SCROLL BEHAVIOR ===== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ===== 2. HAMBURGER MENU ===== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ===== 3. DARK / LIGHT MODE TOGGLE ===== */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  // Load saved theme
  const savedTheme = localStorage.getItem('yer-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('yer-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  /* ===== 4. BACK TO TOP BUTTON ===== */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== 5. NEWSLETTER FORM ===== */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      if (emailInput && emailInput.value) {
        emailInput.value = '';
        emailInput.placeholder = '✓ Subscribed! Thank you.';
        emailInput.style.color = '#10B981';
        setTimeout(() => {
          emailInput.placeholder = 'Your email address';
          emailInput.style.color = '';
        }, 3000);
      }
    });
  }

  /* ===== 6. SCROLL REVEAL ANIMATIONS ===== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add scroll-reveal class to elements
  document.querySelectorAll(
    '.program-card, .news-card, .impact-num, .value-pill, .partner-logo, .team-card, .blog-card, .gallery-item'
  ).forEach((el, i) => {
    el.classList.add('scroll-reveal');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });

  // Add CSS for scroll reveal
  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .scroll-reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .scroll-reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(revealStyle);

  /* ===== 7. FORM VALIDATION UTILITY ===== */
  window.validateField = function(input, errorMsg) {
    const group = input.closest('.form-group');
    const msgEl = group?.querySelector('.error-msg');
    const value = input.value.trim();
    let isValid = true;
    let message = '';

    if (!value) {
      isValid = false;
      message = 'This field is required.';
    } else if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Please enter a valid email address.';
      }
    } else if (input.type === 'tel') {
      const telRegex = /^[\+]?[\d\s\-\(\)]{7,15}$/;
      if (!telRegex.test(value)) {
        isValid = false;
        message = 'Please enter a valid phone number.';
      }
    } else if (input.minLength && value.length < input.minLength) {
      isValid = false;
      message = `Minimum ${input.minLength} characters required.`;
    }

    if (group) {
      group.classList.toggle('error', !isValid);
    }
    if (msgEl) {
      msgEl.textContent = message;
    }

    return isValid;
  };

  /* ===== 8. REAL-TIME CLOCK (for pages that use it) ===== */
  function updateClock() {
    const clockEl = document.getElementById('liveClock');
    if (clockEl) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      clockEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()} — ${hours}:${mins}:${secs}`;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ===== 9. DYNAMIC GREETING ===== */
  const greetingEl = document.getElementById('dynamicGreeting');
  if (greetingEl) {
    const hour = new Date().getHours();
    let greeting = '';
    if (hour >= 5 && hour < 12) greeting = '🌅 Good Morning!';
    else if (hour >= 12 && hour < 17) greeting = '☀️ Good Afternoon!';
    else if (hour >= 17 && hour < 21) greeting = '🌆 Good Evening!';
    else greeting = '🌙 Good Night!';
    greetingEl.textContent = greeting;
  }

  // Active nav link highlight based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

});
