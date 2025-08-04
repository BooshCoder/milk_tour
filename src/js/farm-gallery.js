// Farm Gallery Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('farm-gallery-modal');
  const closeBtn = modal.querySelector('.farm-gallery-close');
  const overlay = modal.querySelector('.farm-gallery-overlay');
  const galleryButtons = document.querySelectorAll('.farm-gallery-btn');
  const galleryImage = modal.querySelector('.farm-gallery-image');
  const galleryTitle = modal.querySelector('.farm-gallery-title');
  const currentSlide = modal.querySelector('.current-slide');
  const totalSlides = modal.querySelector('.total-slides');
  const prevBtn = modal.querySelector('.farm-gallery-prev');
  const nextBtn = modal.querySelector('.farm-gallery-next');
  const thumbnailsContainer = modal.querySelector('.farm-gallery-thumbnails');

  // Farm data with images
  const farmData = {
    'luck-e-holstein': {
      title: 'Luck E Holstein',
      images: [
        '/images/farms/01_Homestead/Homestead2.webp',
        '/images/farms/01_Homestead/Homestead1.webp',
        '/images/farms/01_Homestead/Homestead4.webp',
        '/images/farms/01_Homestead/Homestead6.webp',
        '/images/farms/01_Homestead/Homestead11.webp'
      ]
    },
    homestead: {
      title: 'Homestead Dairy',
      images: [
        '/images/farms/01_Homestead/Homestead1.webp',
        '/images/farms/01_Homestead/Homestead2.webp',
        '/images/farms/01_Homestead/Homestead4.webp',
        '/images/farms/01_Homestead/Homestead6.webp',
        '/images/farms/01_Homestead/Homestead11.webp'
      ]
    },
    larsons: {
      title: 'Larson Acres',
      images: [
        '/images/farms/03_Larsons/main_Larsons5.webp',
        '/images/farms/03_Larsons/Larsons1.webp',
        '/images/farms/03_Larsons/Larsons2.webp',
        '/images/farms/03_Larsons/Larsons3.webp',
        '/images/farms/03_Larsons/Larsons4.webp',
        '/images/farms/03_Larsons/Larsons6.webp',
        '/images/farms/03_Larsons/Larsons7.webp'
      ]
    },
    crave: {
      title: 'Crave Brothers',
      images: [
        '/images/farms/04_Crave/MainCraveBrothers1.webp',
        '/images/farms/04_Crave/Crave2.webp',
        '/images/farms/04_Crave/Crave3.webp',
        '/images/farms/04_Crave/Crave4.webp',
        '/images/farms/04_Crave/Crave5.webp',
        '/images/farms/04_Crave/Crave8.webp',
        '/images/farms/04_Crave/Crave9.webp',
        '/images/farms/04_Crave/Crave10.webp'
      ]
    },
    milksource: {
      title: 'Milksource Dairy',
      images: [
        '/images/farms/05_Milksource/main_Milksource3.webp',
        '/images/farms/05_Milksource/Milksource1.webp',
        '/images/farms/05_Milksource/Milksource2.webp'
      ]
    },
    univer: {
      title: 'Університет Вісконсин–Медісон',
      images: [
        '/images/farms/08_univer/main_univer.webp',
        '/images/farms/08_univer/univer1.webp',
        '/images/farms/08_univer/univer2.webp',
        '/images/farms/08_univer/univer3.webp'
      ]
    },
    miltrim: {
      title: 'Miltrim Dairy Farm',
      images: [
        '/images/farms/07_Miltrim/main_Miltrim1.webp',
        '/images/farms/07_Miltrim/Miltrim2.webp',
        '/images/farms/07_Miltrim/Miltrim3.webp'
      ]
    },
    zavod: {
      title: 'Mullins Cheese & Whey',
      images: [
        '/images/farms/06_Zavod/main_zavod.webp',
        '/images/farms/06_Zavod/Zavid1.webp',
        '/images/farms/06_Zavod/Zavod3.webp',
        '/images/farms/06_Zavod/Zavod4.webp',
        '/images/farms/06_Zavod/Zavod6.webp',
        '/images/farms/06_Zavod/Zavod7.webp'
      ]
    },
    northside: {
      title: 'Комбікормовий завод Northside Elevator',
      images: [
        '/images/farms/02_Northside/main_Northside_elevator2.webp',
        '/images/farms/02_Northside/Northside1.webp',
        '/images/farms/02_Northside/Northside3.webp',
        '/images/farms/02_Northside/Northside4.webp'
      ]
    }
  };

  let currentFarm = null;
  let currentImageIndex = 0;
  let images = [];

  // Open modal
  function openGallery(farmKey) {
    currentFarm = farmKey;
    const farm = farmData[farmKey];
    if (!farm) return;

    images = farm.images;
    currentImageIndex = 0;
    
    galleryTitle.textContent = farm.title;
    totalSlides.textContent = images.length;
    
    loadImage(0);
    createThumbnails();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Load image
  function loadImage(index) {
    if (index < 0 || index >= images.length) return;
    
    currentImageIndex = index;
    galleryImage.src = images[index];
    galleryImage.alt = `${farmData[currentFarm].title} - фото ${index + 1}`;
    currentSlide.textContent = index + 1;
    
    // Update thumbnails
    const thumbnails = thumbnailsContainer.querySelectorAll('.farm-gallery-thumbnail');
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
    
    // Update navigation buttons
    prevBtn.style.display = index === 0 ? 'none' : 'flex';
    nextBtn.style.display = index === images.length - 1 ? 'none' : 'flex';
  }

  // Create thumbnails
  function createThumbnails() {
    thumbnailsContainer.innerHTML = '';
    
    images.forEach((image, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'farm-gallery-thumbnail';
      thumbnail.classList.toggle('active', index === 0);
      
      const img = document.createElement('img');
      img.src = image;
      img.alt = `Мініатюра ${index + 1}`;
      
      thumbnail.appendChild(img);
      thumbnail.addEventListener('click', () => loadImage(index));
      
      thumbnailsContainer.appendChild(thumbnail);
    });
  }

  // Close modal
  function closeGallery() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentFarm = null;
    currentImageIndex = 0;
    images = [];
  }

  // Event listeners
  galleryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const farmKey = btn.getAttribute('data-farm');
      openGallery(farmKey);
    });
  });

  closeBtn.addEventListener('click', closeGallery);
  overlay.addEventListener('click', closeGallery);

  prevBtn.addEventListener('click', () => {
    if (currentImageIndex > 0) {
      loadImage(currentImageIndex - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentImageIndex < images.length - 1) {
      loadImage(currentImageIndex + 1);
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeGallery();
        break;
      case 'ArrowLeft':
        if (currentImageIndex > 0) {
          loadImage(currentImageIndex - 1);
        }
        break;
      case 'ArrowRight':
        if (currentImageIndex < images.length - 1) {
          loadImage(currentImageIndex + 1);
        }
        break;
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentImageIndex < images.length - 1) {
        // Swipe left - next image
        loadImage(currentImageIndex + 1);
      } else if (diff < 0 && currentImageIndex > 0) {
        // Swipe right - previous image
        loadImage(currentImageIndex - 1);
      }
    }
  }
}); 