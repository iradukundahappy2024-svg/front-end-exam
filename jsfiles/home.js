/* =============================================
   HOME PAGE JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== STATS COUNTER ANIMATION ===== */
  const statNums = document.querySelectorAll('.stat-num[data-target]');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(num => countObserver.observe(num));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  /* ===== TESTIMONIAL SLIDER ===== */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  let autoplayInterval;

  function goToSlide(index) {
    slides[currentSlide]?.classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoplay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  if (slides.length > 0) startAutoplay();

  /* ===== WELCOME MODAL ===== */
  const modal = document.getElementById('welcomeModal');
  const modalClose = document.getElementById('modalClose');
  const modalSkip = document.getElementById('modalSkip');

  // Show modal after 2.5 seconds (only if not already shown this session)
  if (modal && !sessionStorage.getItem('yer-modal-shown')) {
    setTimeout(() => {
      modal.classList.add('active');
    }, 2500);
    sessionStorage.setItem('yer-modal-shown', 'true');
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalSkip) modalSkip.addEventListener('click', closeModal);

  // Close on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

});
