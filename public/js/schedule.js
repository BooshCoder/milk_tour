// Schedule Accordion Enhancement
document.addEventListener('DOMContentLoaded', function() {
  const scheduleDays = document.querySelectorAll('.schedule-day');
  
  // Додаємо анімацію при відкритті/закритті
  scheduleDays.forEach(day => {
    const summary = day.querySelector('.schedule-summary');
    const description = day.querySelector('.schedule-description');
    
    // Ініціалізуємо висоту для плавної анімації
    if (description) {
      description.style.transition = 'all 0.3s ease';
    }
    
    // Додаємо клас для анімації
    summary.addEventListener('click', function() {
      setTimeout(() => {
        day.classList.add('schedule-animated');
      }, 10);
    });
  });
  
  // Додаємо анімацію при першому завантаженні
  scheduleDays.forEach((day, index) => {
    setTimeout(() => {
      day.style.opacity = '1';
      day.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// Додаємо клас для анімації в CSS
const style = document.createElement('style');
style.textContent = `
  .schedule-day {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .schedule-animated {
    animation: pulse 0.3s ease;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style); 