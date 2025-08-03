// Видалення класу no-js для активації анімацій
document.documentElement.classList.remove('no-js');

// Scroll Animations System - Тільки для заголовків
class ScrollAnimations {
  constructor() {
    this.observers = [];
    console.log('ScrollAnimations ініціалізовано');
    this.init();
  }

  init() {
    // Перевірка підтримки IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver не підтримується, анімації будуть відключені');
      this.fallbackAnimation();
      return;
    }

    try {
      // Перевірка наявності елементів
      const textRevealElements = document.querySelectorAll('.text-reveal');
      const fadeSlideUpElements = document.querySelectorAll('.fade-slide-up');
      
      console.log(`Знайдено ${textRevealElements.length} елементів text-reveal`);
      console.log(`Знайдено ${fadeSlideUpElements.length} елементів fade-slide-up`);

      // Text Reveal для заголовків
      this.createObserver('.text-reveal', {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }, (entry) => {
        console.log('Анімація text-reveal активована для:', entry.target);
        entry.target.style.transform = 'translateX(0)';
        entry.target.style.opacity = '1';
        entry.target.classList.add('animated');
      });

      // Fade In + Slide Up для заголовків
      this.createObserver('.fade-slide-up', {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }, (entry) => {
        console.log('Анімація fade-slide-up активована для:', entry.target);
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
        entry.target.classList.add('animated');
      });
    } catch (error) {
      console.error('Помилка ініціалізації анімацій:', error);
      this.fallbackAnimation();
    }
  }

  createObserver(selector, options, callback) {
    try {
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
      console.log(`Створено обсервер для ${selector} з ${elements.length} елементами`);
    } catch (error) {
      console.error(`Помилка створення обсервера для ${selector}:`, error);
    }
  }

  // Fallback анімація для браузерів без підтримки IntersectionObserver
  fallbackAnimation() {
    const elements = document.querySelectorAll('.text-reveal, .fade-slide-up');
    console.log(`Fallback анімація для ${elements.length} елементів`);
    elements.forEach(el => {
      el.style.transform = 'none';
      el.style.opacity = '1';
      el.classList.add('animated');
    });
  }
}

// Ініціалізація при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM завантажено, ініціалізація ScrollAnimations...');
  try {
    new ScrollAnimations();
  } catch (error) {
    console.error('Помилка ініціалізації ScrollAnimations:', error);
  }
}); 