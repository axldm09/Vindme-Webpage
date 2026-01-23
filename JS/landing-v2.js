/* ==========================================
   VINDME LANDING PAGE V2 - JAVASCRIPT
   Award-Winning Interactive Experience
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initCustomCursor();
  initNavigation();
  initHeroCarousel();
  initRevealAnimations();
  initStatsCounter();
  initSmoothScroll();
  initMagneticButtons();
  initParallaxEffects();
  initTimelineProgress();
});

/* -------------------- CUSTOM CURSOR -------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  
  if (!dot || !ring || window.innerWidth <= 768) return;
  
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth animation loop
  function animateCursor() {
    // Dot follows closely
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
    
    // Ring follows with delay
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Hover effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .bento-card, .story-card, .testimonial-card, .pricing-card, .magnetic');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

/* -------------------- NAVIGATION -------------------- */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
  
  // Scroll effect
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu toggle
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('active');
      
      if (isOpen) {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
    
    // Close menu on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* -------------------- HERO CAROUSEL -------------------- */
function initHeroCarousel() {
  const screenshots = document.querySelectorAll('.screen-image');
  if (screenshots.length === 0) return;
  
  let currentIndex = 0;
  
  function showNext() {
    screenshots[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % screenshots.length;
    screenshots[currentIndex].classList.add('active');
  }
  
  // Auto-rotate every 4 seconds
  setInterval(showNext, 4000);
}

/* -------------------- REVEAL ANIMATIONS -------------------- */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

/* -------------------- STATS COUNTER -------------------- */
function initStatsCounter() {
  const statValues = document.querySelectorAll('.stat-value[data-count]');
  if (statValues.length === 0) return;
  
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
  
  statValues.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.count);
  const suffix = element.dataset.suffix || '';
  const duration = 2000;
  const startTime = performance.now();
  const startValue = 0;
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    
    const currentValue = startValue + (target - startValue) * easeOutQuart;
    
    if (target >= 1000) {
      element.textContent = Math.floor(currentValue).toLocaleString() + suffix;
    } else if (target % 1 !== 0) {
      element.textContent = currentValue.toFixed(1) + suffix;
    } else {
      element.textContent = Math.floor(currentValue) + suffix;
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

/* -------------------- SMOOTH SCROLL -------------------- */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* -------------------- MAGNETIC BUTTONS -------------------- */
function initMagneticButtons() {
  if (window.innerWidth <= 768) return;
  
  const magneticElements = document.querySelectorAll('.magnetic');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.2;
      const deltaY = (e.clientY - centerY) * 0.2;
      
      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

/* -------------------- PARALLAX EFFECTS -------------------- */
function initParallaxEffects() {
  const orbs = document.querySelectorAll('.gradient-orb, .cta-orb');
  
  if (window.innerWidth <= 768) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
          const speed = 0.1 + (index * 0.05);
          const yPos = scrollY * speed;
          orb.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

/* -------------------- TIMELINE PROGRESS -------------------- */
function initTimelineProgress() {
  const timeline = document.querySelector('.timeline');
  const timelineProgress = document.querySelector('.timeline-progress');
  
  if (!timeline || !timelineProgress) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: Array.from({ length: 101 }, (_, i) => i / 100)
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ratio = entry.intersectionRatio;
        const progress = Math.min(ratio * 1.5, 1) * 100;
        timelineProgress.style.height = `${progress}%`;
      }
    });
  }, observerOptions);
  
  observer.observe(timeline);
}

/* -------------------- TILT EFFECT (Phone) -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const tiltElement = document.querySelector('[data-tilt]');
  
  if (!tiltElement || window.innerWidth <= 900) return;
  
  const maxTilt = parseFloat(tiltElement.dataset.tiltMax) || 10;
  
  tiltElement.addEventListener('mousemove', (e) => {
    const rect = tiltElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    
    const tiltX = -percentY * maxTilt;
    const tiltY = percentX * maxTilt;
    
    tiltElement.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });
  
  tiltElement.addEventListener('mouseleave', () => {
    tiltElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

/* -------------------- HORIZONTAL SCROLL FOR STORY CARDS -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const storyWrapper = document.querySelector('.story-cards-wrapper');
  const storyCards = document.querySelector('.story-cards');
  
  if (!storyWrapper || !storyCards || window.innerWidth <= 768) return;
  
  let isDown = false;
  let startX;
  let scrollLeft;
  
  storyWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    storyWrapper.style.cursor = 'grabbing';
    startX = e.pageX - storyWrapper.offsetLeft;
    scrollLeft = storyWrapper.scrollLeft;
  });
  
  storyWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    storyWrapper.style.cursor = 'grab';
  });
  
  storyWrapper.addEventListener('mouseup', () => {
    isDown = false;
    storyWrapper.style.cursor = 'grab';
  });
  
  storyWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - storyWrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    storyWrapper.scrollLeft = scrollLeft - walk;
  });
  
  // Set initial cursor
  storyWrapper.style.cursor = 'grab';
});

/* -------------------- PAUSE MARQUEE ON HOVER -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const marqueeTrack = document.querySelector('.marquee-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  if (!marqueeTrack) return;
  
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    
    card.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  });
});

/* -------------------- LOADING ANIMATION -------------------- */
window.addEventListener('load', () => {
  // Trigger initial reveals for elements in viewport
  setTimeout(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);
});
