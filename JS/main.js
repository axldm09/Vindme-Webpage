/**
 * Vindme - Main JavaScript
 * Optimized for performance
 */

'use strict';

// Prevent horizontal scroll
document.body.style.overflowX = "hidden";

// Initialize Owl Carousel when jQuery is ready
$(document).ready(function () {
  var owl = $('.owl-carousel');
  if (owl.length) {
    owl.owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      margin: 25,
      smartSpeed: 1500,
      lazyLoad: true,
      nav: false,
      dots: true,
      onTranslated: function (event) {
        $(".owl-carousel .owl-item").removeClass("center");
        $(".owl-carousel .owl-item.active.center").each(function () {
          $(this).find(".owl-item").addClass("center");
        });
      },
    });
  }
});

/**
 * Animated counter with easing
 * Uses requestAnimationFrame for smooth animation
 */
function animateCounter(element, target, suffix = '', duration = 2000) {
  const startTime = performance.now();
  const startValue = 0;
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic for smooth deceleration
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = startValue + (target - startValue) * easeOut;
    
    if (Number.isInteger(target)) {
      element.textContent = Math.round(currentValue) + suffix;
    } else {
      element.textContent = currentValue.toFixed(1) + suffix;
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

/**
 * Start counters when they become visible
 */
function initCounters() {
  const feedbackCounter = document.getElementById('feedback-counter');
  const clientsCounter = document.getElementById('clients-counter');
  const downloadsCounter = document.getElementById('downloads-counter');
  
  if (!feedbackCounter || !clientsCounter || !downloadsCounter) return;
  
  let hasAnimated = false;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        
        // Stagger the animations slightly
        setTimeout(() => animateCounter(feedbackCounter, 99.5, '%', 2000), 0);
        setTimeout(() => animateCounter(clientsCounter, 50, '', 2200), 100);
        setTimeout(() => animateCounter(downloadsCounter, 100, '', 2400), 200);
        
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(feedbackCounter.closest('.stats-container') || feedbackCounter);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initCounters);