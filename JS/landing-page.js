/* ==========================================
   VINDME LANDING PAGE - JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavbar();
  initHeroCarousel();
  initScrollAnimations();
  initStatsCounter();
  initSmoothScroll();
  initParallax();
});

/* -------------------- NAVBAR -------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  // Scroll effect
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks?.classList.toggle('active');
    });
  }
}

/* -------------------- HERO CAROUSEL -------------------- */
function initHeroCarousel() {
  const screenshots = document.querySelectorAll('.app-screenshot');
  if (screenshots.length === 0) return;
  
  let currentIndex = 0;
  
  function showNext() {
    screenshots[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % screenshots.length;
    screenshots[currentIndex].classList.add('active');
  }
  
  // Auto-rotate every 3 seconds
  setInterval(showNext, 3000);
}

/* -------------------- SCROLL ANIMATIONS -------------------- */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        
        // For staggered children animations
        const children = entry.target.querySelectorAll('[data-animate-child]');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animate-visible');
          }, index * 100);
        });
      }
    });
  }, observerOptions);
  
  // Observe elements with scroll animations
  const animatedElements = document.querySelectorAll(
    '.feature-card, .step, .testimonial-card, .pricing-card, .section-header'
  );
  
  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
  
  // Add CSS for scroll animations dynamically
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-on-scroll.animate-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .step:nth-child(2) { transition-delay: 0.1s; }
    .step:nth-child(3) { transition-delay: 0.2s; }
    
    .feature-card:nth-child(2) { transition-delay: 0.1s; }
    .feature-card:nth-child(3) { transition-delay: 0.2s; }
    .feature-card:nth-child(4) { transition-delay: 0.3s; }
    .feature-card:nth-child(5) { transition-delay: 0.4s; }
    
    .testimonial-card:nth-child(2) { transition-delay: 0.15s; }
    .testimonial-card:nth-child(3) { transition-delay: 0.3s; }
    
    .pricing-card:nth-child(2) { transition-delay: 0.15s; }
    .pricing-card:nth-child(3) { transition-delay: 0.3s; }
  `;
  document.head.appendChild(style);
}

/* -------------------- STATS COUNTER -------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.target);
  const suffix = element.dataset.suffix || '';
  const duration = 2000;
  const isDecimal = target % 1 !== 0;
  
  let startTime = null;
  
  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out-cubic)
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    const current = target * easeProgress;
    
    if (isDecimal) {
      element.textContent = current.toFixed(1) + suffix;
    } else {
      element.textContent = Math.floor(current).toLocaleString() + suffix;
    }
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

/* -------------------- SMOOTH SCROLL -------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });
}

/* -------------------- PARALLAX EFFECTS -------------------- */
function initParallax() {
  const floatingCards = document.querySelectorAll('.floating-card');
  const orbs = document.querySelectorAll('.floating-orb');
  
  let ticking = false;
  
  window.addEventListener('mousemove', (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        floatingCards.forEach((card, index) => {
          const speed = (index + 1) * 5;
          card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
        
        orbs.forEach((orb, index) => {
          const speed = (index + 1) * 10;
          orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

/* -------------------- ADDITIONAL INTERACTIONS -------------------- */

// Add hover effects for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button, .pricing-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn-primary, .btn-secondary, .cta-button, .pricing-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Typing effect for hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Magnetic effect for CTA buttons
document.querySelectorAll('.cta-button, .nav-cta').forEach(button => {
  button.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Add smooth reveal for sections
const revealSections = () => {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.85) {
      section.classList.add('section-visible');
    }
  });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Add section visibility styles
const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
  section {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  section.section-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero {
    opacity: 1 !important;
    transform: none !important;
  }
`;
document.head.appendChild(sectionStyle);

// Console branding
console.log('%c🛡️ Vindme', 'font-size: 24px; font-weight: bold; color: #8B5CF6;');
console.log('%cConnect with confidence, locate with ease.', 'font-size: 14px; color: #7ADFBB;');
