/**
 * BIRTHDAY CELEBRATION PWA - PHASE 1, 2 & 3
 * Main Application JavaScript
 * Premium Glassmorphism PWA with Birthday Countdown, Letter, Timeline, Gallery & Open When
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  // Birthday date: March 3 of current year
  // UPDATE THIS with the actual birthday date
  birthdayDate: new Date(new Date().getFullYear(), 2, 3), // Month is 0-indexed, so 2 = March
  
  // Theme preferences
  theme: {
    storageKey: 'birthday-celebration-theme',
    light: 'light',
    dark: 'dark'
  },
  
  // Confetti configuration
  confetti: {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  },

  // Letter content - Customize this
  letter: {
    title: 'A Letter for You',
    content: `
      <p>Dear Someone Special,</p>
      
      <p>As your birthday approaches, I wanted to take a moment to tell you how much you mean to me. This digital experience is a small token of my appreciation for all the joy and light you bring into my life.</p>
      
      <p>You deserve all the happiness in the world, and I hope this celebration brings you even a fraction of the smile you give others.</p>
      
      <p>Thank you for being exactly who you are.</p>
      
      <p>With all my love,<br>Your Admirer</p>
    `
  },

  // Timeline events - Customize with your memories
  timeline: [
    {
      date: '2024-01-15',
      title: 'A Wonderful Beginning',
      description: 'This is when our story started. A moment that changed everything.',
      image: 'image1.jpg',
      year: 2024
    },
    {
      date: '2024-06-20',
      title: 'Summer Adventures',
      description: 'Making beautiful memories under the sun. These moments will stay with us forever.',
      image: 'image2.jpg',
      year: 2024
    },
    {
      date: '2024-12-01',
      title: 'Year End Reflections',
      description: 'Another year of joy and growth. Thank you for every moment.',
      image: 'image3.jpg',
      year: 2024
    },
    {
      date: '2025-03-10',
      title: 'Special Birthday Celebration',
      description: 'Another year older, more wise, and more amazing than before.',
      image: 'image4.jpg',
      year: 2025
    },
    {
      date: '2025-08-15',
      title: 'Dreams and Goals',
      description: 'Watching you achieve your dreams brings me so much happiness.',
      image: 'image5.jpg',
      year: 2025
    }
  ],

  // Gallery images - Customize with your photos
  gallery: [
    { id: 1, image: 'image1.jpg', title: 'First Memory', category: 'all recent', favorite: false },
    { id: 2, image: 'image2.jpg', title: 'Summer Days', category: 'all', favorite: true },
    { id: 3, image: 'image3.jpg', title: 'Golden Hour', category: 'all', favorite: true },
    { id: 4, image: 'image4.jpg', title: 'Celebration', category: 'all recent', favorite: true },
    { id: 5, image: 'image5.jpg', title: 'Dreams', category: 'all', favorite: false },
    { id: 6, image: 'image6.jpg', title: 'Adventure', category: 'all recent', favorite: false },
    { id: 7, image: 'image7.jpg', title: 'Laughter', category: 'all favorites', favorite: true },
    { id: 8, image: 'image8.jpg', title: 'Moments', category: 'all', favorite: false },
    { id: 9, image: 'image9.jpg', title: 'Joy', category: 'all recent favorites', favorite: true },
    { id: 10, image: 'image10.jpg', title: 'Forever', category: 'all', favorite: false }
  ],

  // Open When cards - Customize messages
  openWhen: [
    {
      title: '💚 Open when you are happy',
      icon: '😊',
      message: 'Share your happiness with the world! Your smile is contagious, and I love seeing you radiant with joy. Keep shining!'
    },
    {
      title: '💙 Open when you are sad',
      icon: '😢',
      message: 'It\'s okay to feel sad sometimes. Remember, even the darkest nights give way to beautiful sunrises. You are stronger than you know.'
    },
    {
      title: '💜 Open when you are stressed',
      icon: '😰',
      message: 'Take a deep breath. You\'ve overcome challenges before, and you\'ll overcome this one too. Be kind to yourself. Rest is not laziness.'
    },
    {
      title: '🧡 Open when you need motivation',
      icon: '💪',
      message: 'You are capable of amazing things. Every expert was once a beginner. Keep going, believe in yourself, and never give up on your dreams.'
    },
    {
      title: '❤️ Open when you need encouragement',
      icon: '🌟',
      message: 'I believe in you. You are worthy. You are enough. Your potential is limitless, and I\'m cheering for you every step of the way.'
    },
    {
      title: '💛 Open when you miss me',
      icon: '🫂',
      message: 'Distance is just a number. My thoughts are always with you. You mean the world to me, and our connection transcends time and space.'
    }
  ],

  // Daily inspiration messages
  inspirationMessages: [
    '✨ You are braver than you believe, stronger than you seem, and smarter than you think.',
    '🌟 Today is a perfect day to start something beautiful.',
    '💫 Your potential is limitless. Your future is bright.',
    '🌈 Every challenge is an opportunity to grow.',
    '🎯 You deserve all the good things that are coming your way.',
    '✨ Progress, not perfection. Keep moving forward.',
    '💪 You are stronger than yesterday.',
    '🌸 Be gentle with yourself. Growth takes time.',
    '🎨 Your story is unique and beautiful.',
    '🚀 You are capable of extraordinary things.',
    '💖 You matter more than you know.',
    '🌺 Bloom where you are planted.',
    '✨ Every day is a fresh start.',
    '🎪 Life is what you make it. Make it amazing.',
    '🌟 You are a work in progress, and that\'s beautiful.',
  ]
};

// Adjust if birthday has passed this year
if (CONFIG.birthdayDate < new Date()) {
  CONFIG.birthdayDate = new Date(new Date().getFullYear() + 1, 2, 3);
}

// ============================================
// THEME MANAGEMENT
// ============================================

class ThemeManager {
  constructor() {
    this.storageKey = CONFIG.theme.storageKey;
    this.lightClass = CONFIG.theme.light;
    this.darkClass = CONFIG.theme.dark;
    this.themeToggle = document.getElementById('themeToggle');
    this.init();
  }

  init() {
    this.detectSystemTheme();
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggle());
    }
  }

  detectSystemTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme(this.darkClass);
    } else {
      this.setTheme(this.lightClass);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(this.storageKey)) {
        this.setTheme(e.matches ? this.darkClass : this.lightClass);
      }
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
  }

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === this.lightClass ? this.darkClass : this.lightClass;
    this.setTheme(newTheme);
  }
}

// ============================================
// COUNTDOWN TIMER
// ============================================

class CountdownTimer {
  constructor(targetDate) {
    this.targetDate = targetDate;
    this.elements = {
      days: document.getElementById('countdownDays'),
      hours: document.getElementById('countdownHours'),
      minutes: document.getElementById('countdownMinutes'),
      seconds: document.getElementById('countdownSeconds'),
      birthdayMessage: document.getElementById('birthdayMessage')
    };
    this.isBirthdayMode = false;
    this.init();
  }

  init() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  calculateTimeRemaining() {
    const now = new Date().getTime();
    const targetTime = this.targetDate.getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isZero: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isZero: false };
  }

  update() {
    const time = this.calculateTimeRemaining();

    this.updateElement(this.elements.days, time.days);
    this.updateElement(this.elements.hours, time.hours);
    this.updateElement(this.elements.minutes, time.minutes);
    this.updateElement(this.elements.seconds, time.seconds);

    if (time.isZero && !this.isBirthdayMode) {
      this.triggerBirthdayMode();
    }
  }

  updateElement(element, value) {
    if (element && element.textContent !== String(value).padStart(2, '0')) {
      element.textContent = String(value).padStart(2, '0');
      element.style.animation = 'none';
      setTimeout(() => {
        element.style.animation = '';
      }, 10);
    }
  }

  triggerBirthdayMode() {
    this.isBirthdayMode = true;
    clearInterval(this.interval);

    if (this.elements.birthdayMessage) {
      this.elements.birthdayMessage.style.display = 'block';
    }

    this.triggerConfetti();
    this.playNotification();
  }

  triggerConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;

    const confettiCount = CONFIG.confetti.particleCount;
    for (let i = 0; i < confettiCount; i++) {
      const confetto = document.createElement('div');
      const randomX = Math.random() * 100;
      const randomDelay = Math.random() * 0.5;
      const randomDuration = 2 + Math.random() * 1;
      const colors = ['#ec4899', '#a78bfa', '#06b6d4', '#f472b6', '#c084fc'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      confetto.style.cssText = `
        position: absolute;
        left: ${randomX}%;
        top: -10px;
        width: 10px;
        height: 10px;
        background: ${randomColor};
        pointer-events: none;
        animation: confettiFall ${randomDuration}s linear forwards;
        animation-delay: ${randomDelay}s;
        border-radius: 50%;
      `;

      container.appendChild(confetto);
      setTimeout(() => confetto.remove(), (randomDuration + randomDelay) * 1000);
    }

    if (!document.getElementById('confetti-style')) {
      const style = document.createElement('style');
      style.id = 'confetti-style';
      style.textContent = `
        @keyframes confettiFall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  playNotification() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      // Audio context not available
    }
  }
}

// ============================================
// LETTER FEATURE (PHASE 2)
// ============================================

class LetterFeature {
  constructor() {
    this.envelope = document.getElementById('envelope');
    this.letterContent = document.getElementById('letterContent');
    this.letterBody = document.getElementById('letterBody');
    this.init();
  }

  init() {
    if (this.envelope) {
      this.envelope.addEventListener('click', () => this.toggleLetter());
    }
    this.renderLetter();
  }

  renderLetter() {
    if (this.letterBody) {
      this.letterBody.innerHTML = CONFIG.letter.content;
    }
  }

  toggleLetter() {
    if (this.letterContent && this.envelope) {
      const isOpen = this.letterContent.style.display !== 'none';
      this.letterContent.style.display = isOpen ? 'none' : 'block';
      this.envelope.classList.toggle('opened');
    }
  }
}

// ============================================
// TIMELINE FEATURE (PHASE 2)
// ============================================

class TimelineFeature {
  constructor() {
    this.timelineItems = document.getElementById('timelineItems');
    this.init();
  }

  init() {
    this.renderTimeline();
    this.attachEventListeners();
  }

  renderTimeline() {
    if (!this.timelineItems) return;

    this.timelineItems.innerHTML = '';

    CONFIG.timeline.forEach((item, index) => {
      const timelineItem = document.createElement('div');
      timelineItem.className = 'timeline-item fade-in-animation';
      timelineItem.style.animationDelay = `${index * 0.1}s`;
      timelineItem.innerHTML = `
        <div class="timeline-marker">${item.year}</div>
        <div class="timeline-content">
          <div class="timeline-card">
            <div class="timeline-image-wrapper">
              <img src="/assets/images/${item.image}" alt="${item.title}" class="timeline-image" loading="lazy">
            </div>
            <div class="timeline-text">
              <h3>${item.title}</h3>
              <p class="timeline-date">${this.formatDate(item.date)}</p>
              <p>${item.description}</p>
            </div>
          </div>
        </div>
      `;

      this.timelineItems.appendChild(timelineItem);
    });
  }

  formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  attachEventListeners() {
    const cards = document.querySelectorAll('.timeline-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('expanded');
      });
    });
  }
}

// ============================================
// GALLERY FEATURE (PHASE 3)
// ============================================

class GalleryFeature {
  constructor() {
    this.galleryContainer = document.getElementById('galleryContainer');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.currentImages = CONFIG.gallery;
    this.init();
  }

  init() {
    this.renderGallery(this.currentImages);
    this.attachFilterListeners();
  }

  renderGallery(items) {
    if (!this.galleryContainer) return;
    
    this.galleryContainer.innerHTML = '';

    items.forEach((item, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item fade-in-animation';
      galleryItem.style.animationDelay = `${index * 0.05}s`;
      galleryItem.innerHTML = `
        <div class="gallery-image-wrapper" onclick="openLightbox(${item.id})">
          <img src="/assets/images/${item.image}" alt="${item.title}" class="gallery-image" loading="lazy">
          <div class="gallery-overlay">
            <button class="gallery-btn">${item.favorite ? '❤️' : '🤍'}</button>
          </div>
        </div>
        <div class="gallery-info">
          <h3>${item.title}</h3>
        </div>
      `;

      this.galleryContainer.appendChild(galleryItem);
    });
  }

  attachFilterListeners() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filterGallery(btn.dataset.filter);
      });
    });
  }

  filterGallery(filter) {
    if (filter === 'all') {
      this.currentImages = CONFIG.gallery;
    } else if (filter === 'favorites') {
      this.currentImages = CONFIG.gallery.filter(item => item.favorite);
    } else if (filter === 'recent') {
      this.currentImages = CONFIG.gallery.slice(-5);
    }
    this.renderGallery(this.currentImages);
  }
}

// Global lightbox functions
let currentLightboxIndex = 0;
let lightboxImages = CONFIG.gallery;

function openLightbox(id) {
  const lightbox = document.getElementById('lightbox');
  lightboxImages = CONFIG.gallery;
  currentLightboxIndex = lightboxImages.findIndex(img => img.id === id);
  updateLightbox();
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
}

function nextImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
  updateLightbox();
}

function prevImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightbox();
}

function updateLightbox() {
  const image = lightboxImages[currentLightboxIndex];
  document.getElementById('lightboxImage').src = `/assets/images/${image.image}`;
  document.getElementById('lightboxTitle').textContent = image.title;
  document.getElementById('lightboxDescription').textContent = `Image ${currentLightboxIndex + 1} of ${lightboxImages.length}`;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
  }
});

// ============================================
// OPEN WHEN FEATURE (PHASE 3)
// ============================================

class OpenWhenFeature {
  constructor() {
    this.openWhenGrid = document.getElementById('openWhenGrid');
    this.init();
  }

  init() {
    this.renderOpenWhenCards();
  }

  renderOpenWhenCards() {
    if (!this.openWhenGrid) return;

    this.openWhenGrid.innerHTML = '';

    CONFIG.openWhen.forEach((card, index) => {
      const openWhenCard = document.createElement('div');
      openWhenCard.className = 'open-when-card fade-in-animation';
      openWhenCard.style.animationDelay = `${index * 0.1}s`;
      openWhenCard.innerHTML = `
        <div class="open-when-header">
          <span class="open-when-icon">${card.icon}</span>
          <h3>${card.title}</h3>
        </div>
        <div class="open-when-content" style="display: none;">
          <p>${card.message}</p>
        </div>
      `;

      openWhenCard.addEventListener('click', () => this.toggleCard(openWhenCard));
      this.openWhenGrid.appendChild(openWhenCard);
    });
  }

  toggleCard(card) {
    const content = card.querySelector('.open-when-content');
    const isOpen = content.style.display !== 'none';
    content.style.display = isOpen ? 'none' : 'block';
    card.classList.toggle('opened');
  }
}

// ============================================
// DAILY INSPIRATION
// ============================================

function generateInspiration() {
  const messages = CONFIG.inspirationMessages;
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const messageElement = document.getElementById('inspirationMessage');
  
  if (messageElement) {
    messageElement.style.opacity = '0';
    setTimeout(() => {
      messageElement.textContent = randomMessage;
      messageElement.style.opacity = '1';
    }, 300);
  }
}

// ============================================
// NAVIGATION MENU
// ============================================

class NavigationManager {
  constructor() {
    this.menuToggle = document.getElementById('menuToggle');
    this.navMenu = document.getElementById('navbarMenu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
    }

    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    if (this.navMenu) {
      this.navMenu.classList.toggle('active');
    }
  }

  closeMenu() {
    if (this.navMenu) {
      this.navMenu.classList.remove('active');
    }
  }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    document.querySelectorAll('.fade-in-animation').forEach(el => {
      observer.observe(el);
    });
  }
}

// ============================================
// APP INITIALIZATION
// ============================================

class App {
  constructor() {
    this.init();
  }

  init() {
    console.log('🎉 Birthday Celebration PWA - Phase 1, 2 & 3 Initializing...');

    new ThemeManager();
    new NavigationManager();
    new CountdownTimer(CONFIG.birthdayDate);
    new ScrollAnimations();

    // Phase 2 features
    new LetterFeature();
    new TimelineFeature();

    // Phase 3 features
    new GalleryFeature();
    new OpenWhenFeature();
    generateInspiration();

    this.setupInstallPrompt();

    console.log('✨ Application ready!');
  }

  setupInstallPrompt() {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });

    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA installed successfully!');
    });
  }
}

// ============================================
// START APP WHEN DOM IS READY
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new App();
  });
} else {
  new App();
}