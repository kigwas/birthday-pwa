/**
 * BIRTHDAY CELEBRATION PWA - PHASE 1 & 2
 * Main Application JavaScript
 * Premium Glassmorphism PWA with Birthday Countdown, Letter & Timeline
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
    // Update countdown every second
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

    // Update display with animated values
    this.updateElement(this.elements.days, time.days);
    this.updateElement(this.elements.hours, time.hours);
    this.updateElement(this.elements.minutes, time.minutes);
    this.updateElement(this.elements.seconds, time.seconds);

    // Trigger birthday mode when countdown reaches zero
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

    // Show birthday message
    if (this.elements.birthdayMessage) {
      this.elements.birthdayMessage.style.display = 'block';
    }

    // Trigger confetti
    this.triggerConfetti();

    // Play notification sound if available
    this.playNotification();
  }

  triggerConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;

    // Create confetti pieces
    const confettiCount = CONFIG.confetti.particleCount;
    for (let i = 0; i < confettiCount; i++) {
      const confetto = document.createElement('div');
      const randomX = Math.random() * 100;
      const randomDelay = Math.random() * 0.5;
      const randomDuration = 2 + Math.random() * 1;
      const randomRotation = Math.random() * 360;
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

      // Clean up after animation
      setTimeout(() => confetto.remove(), (randomDuration + randomDelay) * 1000);
    }

    // Add confetti fall animation to stylesheet
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
    // Try to play a notification sound if available
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
      // Audio context not available, skip notification sound
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

    // Observe fade-in animations
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
    console.log('🎉 Birthday Celebration PWA - Phase 1 & 2 Initializing...');

    // Initialize managers
    new ThemeManager();
    new NavigationManager();
    new CountdownTimer(CONFIG.birthdayDate);
    new ScrollAnimations();

    // Initialize Phase 2 features
    new LetterFeature();
    new TimelineFeature();

    // Install prompt listener
    this.setupInstallPrompt();

    console.log('✨ Application ready!');
  }

  setupInstallPrompt() {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Show install button if needed in future phases
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