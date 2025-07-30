class MobileMenu {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.elements = {
      toggle: document.querySelector('.mobile-menu-toggle'),
      overlay: document.querySelector('.mobile-menu-overlay'),
      close: document.querySelector('.mobile-menu-close'),
      menu: document.querySelector('.mobile-menu'),
      navItems: document.querySelectorAll('.mobile-nav-item')
    };

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Відкриття меню
    this.elements.toggle.addEventListener('click', () => this.openMenu());

    // Закриття меню
    this.elements.close.addEventListener('click', () => this.closeMenu());
    this.elements.overlay.addEventListener('click', (e) => {
      if (e.target === this.elements.overlay) {
        this.closeMenu();
      }
    });

    // Закриття при натисканні Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    // Закриття при кліку на пункт меню
    this.elements.navItems.forEach(item => {
      item.addEventListener('click', () => {
        setTimeout(() => this.closeMenu(), 300);
      });
    });
  }

  openMenu() {
    if (this.isOpen) return;

    this.isOpen = true;
    document.body.style.overflow = 'hidden';

    // Анімація кнопки
    this.elements.toggle.classList.add('active');

    // Анімація overlay
    this.elements.overlay.classList.add('active');

    // Анімація пунктів меню
    this.elements.navItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(20px)';
      
      setTimeout(() => {
        item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, 100 + index * 100);
    });
  }

  closeMenu() {
    if (!this.isOpen) return;

    this.isOpen = false;
    document.body.style.overflow = '';

    // Анімація кнопки
    this.elements.toggle.classList.remove('active');

    // Анімація пунктів меню
    this.elements.navItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.transition = 'all 0.2s ease';
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
      }, index * 50);
    });

    // Закриття overlay
    setTimeout(() => {
      this.elements.overlay.classList.remove('active');
      
      // Скидання стилів пунктів меню
      this.elements.navItems.forEach(item => {
        item.style.transition = '';
        item.style.opacity = '';
        item.style.transform = '';
      });
    }, 300);
  }
}

// Ініціалізація при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();
}); 