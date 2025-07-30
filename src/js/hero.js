class HeroSlider {
  constructor() {
    this.currentSlide = 0;
    this.isAnimating = false;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 10000; // 10 секунд

    this.init();
  }

  init() {
    this.elements = {
      slides: document.querySelectorAll('.hero__slide'),
      buttons: document.querySelectorAll('.button.hero-nav-button'),
      indicator: document.querySelector('.indicator'),
      progressFill: document.querySelector('.progress-fill'),
      bgCurrent: document.querySelector('.hero-background.current'),
      bgNext: document.querySelector('.hero-background.next')
    };

    this.backgroundImages = [
      'url("/images/hero/image1.jpg")',
      'url("/images/hero/image2.jpg")',
      'url("/images/hero/image3.jpg")',
      'url("/images/hero/image4.jpg")'
    ];

    this.setupEventListeners();
    this.initializeFirstSlide();
    this.startAutoPlay();
  }

  setupEventListeners() {
    // Кнопки навігації
    this.elements.buttons.forEach((button, index) => {
      button.addEventListener('click', () => this.goToSlide(index));
    });

    // Пауза автопрокрутки при ховері
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => this.pauseAutoPlay());
      heroSection.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    // Клавіатура
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previousSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });

    // Свайп для мобільних
    this.setupTouchEvents();
  }

  setupTouchEvents() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    let startX = 0;
    let endX = 0;

    heroSection.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    heroSection.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });
  }

  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    }
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentSlide) return;

    this.isAnimating = true;
    const direction = index > this.currentSlide ? 'right' : 'left';

    this.updateSlides(index, direction);
    this.updateBackground(index, direction);
    this.updateNavigation(index);

    this.currentSlide = index;

    // Скидаємо автопрокрутку
    this.resetAutoPlay();

    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
  }

  updateSlides(index, direction) {
    this.elements.slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        slide.style.animation =
          direction === 'left'
            ? 'slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Анімація контенту
        const content = slide.querySelector('.hero__content');
        if (content) {
          content.style.animation = 'none';
          setTimeout(() => {
            content.style.animation =
              'textFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards';
          }, 50);
        }
      } else {
        slide.classList.remove('active');
        slide.style.animation = '';
      }
    });
  }

  updateBackground(index, direction) {
    // Підготовка наступного фону
    this.elements.bgNext.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), ${this.backgroundImages[index]}`;

    // Видалення старих класів анімації
    this.elements.bgCurrent.classList.remove(
      'slide-out-right',
      'slide-out-left'
    );
    this.elements.bgNext.classList.remove('slide-in-right', 'slide-in-left');

    // Застосування нових анімацій
    if (direction === 'right') {
      this.elements.bgCurrent.classList.add('slide-out-left');
      this.elements.bgNext.classList.add('slide-in-right');
    } else {
      this.elements.bgCurrent.classList.add('slide-out-right');
      this.elements.bgNext.classList.add('slide-in-left');
    }

    // Після завершення анімації
    setTimeout(() => {
      this.elements.bgCurrent.style.backgroundImage =
        this.elements.bgNext.style.backgroundImage;
      this.elements.bgCurrent.classList.remove(
        'slide-out-right',
        'slide-out-left'
      );
      this.elements.bgNext.classList.remove('slide-in-right', 'slide-in-left');
      this.elements.bgCurrent.style.opacity = 1;
      this.elements.bgNext.style.opacity = 0;
    }, 800);
  }

  updateNavigation(index) {
    // Оновлення кнопок
    this.elements.buttons.forEach((btn, i) => {
      btn.classList.toggle('is-selected', i === index);
    });

    // Оновлення індикатора
    const activeButton = this.elements.buttons[index];
    if (this.elements.indicator && activeButton) {
      this.elements.indicator.style.width = `${activeButton.offsetWidth}px`;
      this.elements.indicator.style.left = `${activeButton.offsetLeft}px`;
    }
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.elements.slides.length;
    this.goToSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex =
      this.currentSlide === 0
        ? this.elements.slides.length - 1
        : this.currentSlide - 1;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    if (this.autoPlayInterval) return;

    // Запуск прогрес-бару
    this.startProgressBar();

    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    this.pauseProgressBar();
  }

  resetAutoPlay() {
    this.pauseAutoPlay();
    this.resetProgressBar();
    this.startAutoPlay();
  }

  initializeFirstSlide() {
    this.elements.bgCurrent.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), ${this.backgroundImages[0]}`;
    this.updateNavigation(0);
  }

  startProgressBar() {
    if (this.elements.progressFill) {
      this.elements.progressFill.style.width = '0%';
      this.elements.progressFill.style.transition = `width ${this.autoPlayDelay}ms linear`;
      setTimeout(() => {
        this.elements.progressFill.style.width = '100%';
      }, 100);
    }
  }

  pauseProgressBar() {
    if (this.elements.progressFill) {
      this.elements.progressFill.style.transition = 'none';
    }
  }

  resetProgressBar() {
    if (this.elements.progressFill) {
      this.elements.progressFill.style.width = '0%';
      this.elements.progressFill.style.transition = 'none';
    }
  }
}

// Ініціалізація при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
  new HeroSlider();
});
