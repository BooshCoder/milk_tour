// Scroll Animations System - Тільки для заголовків
class ScrollAnimations {
  constructor() {
    this.observers = [];
    this.init();
  }

  init() {
    // Text Reveal для заголовків
    this.createObserver('.text-reveal', {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }, (entry) => {
      entry.target.style.transform = 'translateX(0)';
      entry.target.style.opacity = '1';
    });

    // Fade In + Slide Up для заголовків
    this.createObserver('.fade-slide-up', {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }, (entry) => {
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
    });
  }

  createObserver(selector, options, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const elements = document.querySelectorAll(selector);
    elements.forEach(el => observer.observe(el));
    
    this.observers.push(observer);
  }
}

// Ініціалізація при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
}); 