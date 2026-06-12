# 🎉 Birthday Celebration PWA

A premium Progressive Web App dedicated to someone special, built with pure HTML5, CSS3, and Vanilla JavaScript.

## ✨ Features

### Phase 1: Landing Page & Countdown ✅
- **Hero Section**: Animated background with floating particles
- **Birthday Countdown Timer**: Real-time countdown
  - Days, Hours, Minutes, Seconds
  - Smooth number animations
  - Birthday mode trigger at zero
  - Confetti celebration effect
- **Navigation**: Responsive navbar with theme toggle
- **Theme System**: Dark/Light mode with system detection
- **PWA Ready**: Manifest, Service Worker, installable
- **Mobile First**: Fully responsive design
- **Premium Design**: Glassmorphism, gradients, smooth animations

### Phase 2: Coming Soon
- Interactive Digital Letter (envelope animation)
- Memory Timeline with photos
- Expandable timeline entries

### Phase 3: Coming Soon
- Photo Gallery with masonry layout
- Lightbox viewer
- Open When section (expandable cards)
- Daily Inspiration messages

### Phase 4: Coming Soon
- Floating Action Button (surprise feature)
- Digital Garden (localStorage persistence)
- Music player with playlist

### Phase 5: Coming Soon
- Performance optimization
- Accessibility refinements
- Additional polish

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- A web server (for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kigwas/birthday-pwa.git
   cd birthday-pwa
   ```

2. **Add your assets**
   - Add images to `/assets/images/`
   - Add audio files to `/assets/audio/`
   - Add icons to `/assets/icons/`

   Required images:
   - `background.jpg` - Hero section background
   - `hero.jpg` - Hero image (300x300px recommended)
   - `image1.jpg` - `image10.jpg` - Gallery images

   Required audio:
   - `background-music.mp3` - Background music
   - `song1.mp3` - `song5.mp3` - Playlist songs

   Required icons:
   - `icon-192.png` - App icon (192x192px)
   - `icon-512.png` - App icon (512x512px)

3. **Configure the birthday date**
   
   Edit `js/app.js` and update the `CONFIG.birthdayDate`:
   ```javascript
   birthdayDate: new Date(2026, 2, 3) // March 3, 2026
   ```

4. **Serve locally**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (http-server)
   npx http-server
   ```

5. **Open in browser**
   ```
   http://localhost:8000
   ```

### Deploy to GitHub Pages

```bash
# Push your changes to the main branch
git push origin main

# GitHub Pages will automatically build from the main branch
# Your site will be available at: https://kigwas.github.io/birthday-pwa
```

## 📁 Project Structure

```
birthday-pwa/
├── assets/
│   ├── images/           # Image assets
│   │   ├── background.jpg
│   │   ├── hero.jpg
│   │   └── image1-10.jpg
│   ├── audio/            # Audio files
│   │   ├── background-music.mp3
│   │   └── song1-5.mp3
│   └── icons/            # PWA icons
│       ├── icon-192.png
│       └── icon-512.png
├── css/
│   └── style.css         # All styles (Phase 1+)
├── js/
│   └── app.js            # Main application logic
├── index.html            # Main HTML
├── manifest.json         # PWA manifest
├── service-worker.js     # Service worker for offline
└── README.md             # This file
```

## 🎨 Design System

### Color Palette

**Light Mode:**
- Primary: `#ec4899` (Pink)
- Secondary: `#a78bfa` (Purple)
- Accent: `#06b6d4` (Cyan)
- Background: `#ffffff` (White)
- Text: `#1f2937` (Dark Gray)

**Dark Mode:**
- Background: `#0f172a` (Deep Blue)
- Text: `#f1f5f9` (Light Gray)
- Accent colors remain the same

### Typography

- **Font Family**: System fonts (-apple-system, Segoe UI, Roboto)
- **Headings**: 700-800 weight, tight letter-spacing
- **Body**: 400 weight, 1.6 line-height

### Effects

- **Glassmorphism**: Blur + semi-transparent backgrounds
- **Gradients**: Linear gradients with primary colors
- **Animations**: Smooth ease-out timing functions
- **Shadows**: Soft, layered shadows

## 🔧 Configuration

Edit the birthday date in `js/app.js`:

```javascript
const CONFIG = {
  birthdayDate: new Date(2026, 2, 3) // Month is 0-indexed: 2 = March
};
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

## ⚡ Performance

- Optimized CSS with minimal specificity
- Vanilla JavaScript (no frameworks)
- Service Worker for offline support
- Lazy loading for images
- Critical CSS in-line
- Lighthouse Score Target: 90+

## ♿ Accessibility

- Semantic HTML5
- ARIA labels for buttons
- Keyboard navigation support
- High contrast ratios
- Respects `prefers-reduced-motion`
- Focus indicators on interactive elements

## 🌙 Theme Toggle

Click the sun/moon icon in the navbar to toggle between light and dark modes:
- **Auto**: Follows system preference
- **Light**: Forces light mode
- **Dark**: Forces dark mode
- Theme preference is saved to localStorage

## 🔔 PWA Features

### Install on Home Screen
1. Open the app in a mobile browser
2. Tap the menu icon (three dots)
3. Select "Add to home screen" or "Install"
4. The app will install with a custom icon and splash screen

### Offline Support
- The Service Worker caches key assets
- App works offline once initially loaded
- Service Worker updates are automatic

## 📝 Phase Implementation Guide

### Adding Content for Future Phases

1. **Create new sections** in `index.html` with ID attributes
2. **Add CSS** to `css/style.css` for new components
3. **Add JavaScript** to `js/app.js` for interactivity
4. **Test responsive design** on mobile devices
5. **Update README** with new features

### Configuration Pattern

All configurable content should go in the `CONFIG` object in `js/app.js`:

```javascript
const CONFIG = {
  birthdayDate: new Date(2026, 2, 3),
  timeline: [
    { date: '2020-01-15', title: 'First memory', image: 'image1.jpg' },
    // Add more entries
  ],
  messages: [
    'Message 1',
    'Message 2',
    // Add more messages
  ]
};
```

## 🐛 Troubleshooting

### Assets not loading?
- Ensure files are in the correct `/assets/` subdirectories
- Check file names match exactly (case-sensitive on Linux/Mac)
- Verify image formats are supported (JPG, PNG, WebP)

### Service Worker not working?
- Check browser console for errors
- Service Worker requires HTTPS (except localhost)
- Clear cache and reload: `Ctrl+Shift+Delete` (Chrome)

### Theme not persisting?
- Check if localStorage is enabled
- Clear browser cache and try again
- Check browser console for errors

### Countdown not updating?
- Verify JavaScript is enabled
- Check browser console for errors
- Ensure birthday date is in the future

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [CSS Tricks](https://css-tricks.com/)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## 📄 License

This project is open source and available for personal use.

## 🎁 Credits

Built with ❤️ for someone special. Crafted with attention to detail and premium design principles.

---

**Version**: 1.0.0 (Phase 1)  
**Last Updated**: 2026  
**Made with**: HTML5, CSS3, Vanilla JavaScript