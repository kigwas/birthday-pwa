# 🎁 Birthday PWA - Asset Setup Guide

Complete instructions for adding and configuring all assets for your Birthday Celebration PWA.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Images Setup](#images-setup)
3. [Audio Setup](#audio-setup)
4. [Icons Setup](#icons-setup)
5. [Troubleshooting](#troubleshooting)
6. [Advanced Configuration](#advanced-configuration)

---

## 🚀 Quick Start

### Prerequisites

- A code editor (VS Code, Sublime Text, etc.)
- Image editing software (optional: Photoshop, GIMP, Figma)
- Audio files or audio editing software (optional: Audacity, Adobe Audition)
- Git (for version control)

### Basic Steps

1. **Clone the repository** (if you haven't already)
   ```bash
   git clone https://github.com/kigwas/birthday-pwa.git
   cd birthday-pwa
   ```

2. **Create asset folders** (if they don't exist)
   ```bash
   mkdir -p assets/images
   mkdir -p assets/audio
   mkdir -p assets/icons
   ```

3. **Add your assets** to the appropriate folders

4. **Serve locally**
   ```bash
   python -m http.server 8000
   # Open http://localhost:8000 in your browser
   ```

---

## 🖼️ Images Setup

### Required Images

#### 1. **background.jpg** (Hero Background)

**Purpose**: Full-screen background for the hero section

**Specifications**:
- Resolution: 1920px × 1080px (minimum)
- Format: JPG (for file size optimization)
- File Size: 200-500KB recommended
- Aspect Ratio: 16:9 or wider
- Color: Should complement the pink/purple gradient

**Tips**:
- Use high-quality landscape photos
- Avoid text or subjects that will be obscured by overlay
- Warm tones (sunsets, beaches) work well
- Can be semi-transparent (the overlay will add color)

**How to Source**:
- Unsplash (unsplash.com)
- Pexels (pexels.com)
- Pixabay (pixabay.com)
- Your own photography

**Implementation**:
```html
<!-- In index.html, this is already configured -->
<img src="/assets/images/background.jpg" alt="Background" class="hero-bg-image">
```

---

#### 2. **hero.jpg** (Hero Portrait)

**Purpose**: Featured image in the hero section (the profile picture)

**Specifications**:
- Resolution: 300px × 300px (minimum)
- Format: JPG or PNG
- File Size: 50-150KB
- Aspect Ratio: 1:1 (square)
- Style: Portrait, headshot, or meaningful photo

**Tips**:
- Use a high-quality portrait photo
- Works best with good lighting and clear subject
- Will be displayed in a rounded square frame
- Can have a subtle blur effect applied by CSS

**Implementation**:
```html
<img src="/assets/images/hero.jpg" alt="Someone Special" class="hero-image">
```

---

#### 3. **Gallery Images** (image1.jpg - image10.jpg)

**Purpose**: Memory timeline photos

**Specifications**:
- Resolution: 400px × 300px (minimum)
- Format: JPG or PNG
- File Size: 50-200KB each
- Aspect Ratio: Varies (masonry layout handles different sizes)
- Total Space: ~1-2MB recommended

**Usage in Timeline**:

These images are automatically used in the Memory Timeline. The mapping is configured in `js/app.js`:

```javascript
const CONFIG = {
  timeline: [
    {
      date: '2024-01-15',
      title: 'A Wonderful Beginning',
      description: 'This is when our story started.',
      image: 'image1.jpg',  // Links to /assets/images/image1.jpg
      year: 2024
    },
    {
      date: '2024-06-20',
      title: 'Summer Adventures',
      description: 'Making beautiful memories.',
      image: 'image2.jpg',  // Links to /assets/images/image2.jpg
      year: 2024
    },
    // ... more timeline items
  ]
};
```

**How to Add/Modify Timeline Images**:

1. Replace or add images to `/assets/images/`
2. Edit the `timeline` array in `js/app.js`
3. Update the `image` field to match your filename
4. Update `date`, `title`, `description`, and `year` as needed

**Example - Adding a New Timeline Entry**:

```javascript
{
  date: '2025-09-14',
  title: 'A Beautiful Moment',
  description: 'A special day we'll never forget.',
  image: 'image6.jpg',  // Make sure this file exists
  year: 2025
}
```

---

#### 4. **Icon Images** (icon-192.png, icon-512.png)

See [Icons Setup](#icons-setup) section below.

---

### Image Optimization Tips

#### Resize Images

**Using ImageMagick (Command Line)**:
```bash
# Resize to specific size
convert input.jpg -resize 1920x1080 output.jpg

# Reduce file size while maintaining quality
convert input.jpg -quality 85 output.jpg
```

**Using Python**:
```python
from PIL import Image

# Open and resize
img = Image.open('input.jpg')
img = img.resize((1920, 1080))
img.save('output.jpg', quality=85)
```

#### Compress Images

**Online Tools**:
- TinyJPG (tinyjpg.com)
- ImageOptim (imageoptim.com)
- Squoosh (squoosh.app)

**Command Line**:
```bash
# Using jpegoptim
jpegoptim --size=200k image.jpg

# Using pngquant
pngquant --quality=85 image.png
```

#### Create WebP Versions (Optional)

WebP provides better compression. Modern browsers support it.

```bash
# Convert to WebP
cwebp input.jpg -o output.webp
```

Then update image sources in CSS/HTML:
```html
<picture>
  <source srcset="/assets/images/hero.webp" type="image/webp">
  <source srcset="/assets/images/hero.jpg" type="image/jpeg">
  <img src="/assets/images/hero.jpg" alt="Hero">
</picture>
```

---

## 🎵 Audio Setup

### Background Music

**Purpose**: Ambient music playing in the background

**Specifications**:
- Format: MP3 (best compatibility)
- Duration: 2-5 minutes recommended
- File Size: 2-5MB
- Sample Rate: 44.1kHz
- Bitrate: 128-192kbps
- Style: Calm, elegant, instrumental

**Configuration in `js/app.js`**:
```javascript
// Music will be added in Phase 4
// For now, the audio setup is ready
```

**How to Find Background Music**:
- Unsplash Music (unsplash.com/music)
- Epidemic Sound (epidemicsound.com)
- Artlist (artlist.io)
- Free Music Archive (freemusicarchive.org)

---

### Playlist Songs

**Purpose**: Songs for the music player (Phase 4)

**Specifications**:
- Format: MP3
- Count: 5 songs (song1.mp3 - song5.mp3)
- Duration: 3-5 minutes each
- File Size: 3-8MB each
- Total Space: ~15-40MB
- Sample Rate: 44.1kHz
- Bitrate: 192-320kbps

**Configuration in `js/app.js` (Phase 4)**:
```javascript
const CONFIG = {
  playlist: [
    {
      title: 'Beautiful Moments',
      artist: 'Artist Name',
      file: 'song1.mp3'
    },
    {
      title: 'Special Day',
      artist: 'Artist Name',
      file: 'song2.mp3'
    },
    // ... more songs
  ]
};
```

---

### Audio Conversion and Optimization

#### Convert to MP3

**Using FFmpeg** (free, command line):
```bash
# Basic conversion
ffmpeg -i input.wav -b:a 192k output.mp3

# Convert with quality preservation
ffmpeg -i input.wav -q:a 2 output.mp3
```

**Using Audacity** (free, GUI):
1. Open your audio file
2. Select "File" → "Export" → "Export as MP3"
3. Choose quality settings (192kbps recommended)

#### Reduce File Size

```bash
# Lower bitrate (smaller file, acceptable quality)
ffmpeg -i input.mp3 -b:a 128k output.mp3

# Trim silence
ffmpeg -i input.mp3 -af silenceremove=1:0.5:0.5% output.mp3
```

#### Create a Intro/Outro

```bash
# Concatenate multiple audio files
ffmpeg -i "concat:intro.mp3|main.mp3|outro.mp3" -c copy output.mp3
```

---

## 🎨 Icons Setup

### PWA Icons

**Purpose**: App icons for installation on mobile/desktop

**Required Sizes**:

#### icon-192.png
- Size: 192px × 192px
- Format: PNG with transparency
- File Size: 20-50KB
- Purpose: Home screen icon, browser icon
- Use: Primary app icon

#### icon-512.png
- Size: 512px × 512px
- Format: PNG with transparency
- File Size: 50-150KB
- Purpose: Splash screen, app store
- Use: High-resolution app icon

---

### Creating Icons

#### Using Figma (Free)

1. Create a new file on figma.com
2. Create 512px × 512px artboard
3. Design your icon with gradient colors (pink #ec4899, purple #a78bfa, cyan #06b6d4)
4. Export as PNG with transparent background
5. Resize to 192px for the smaller version

#### Using Adobe XD

1. Create 512px × 512px canvas
2. Design icon
3. Export as PNG (ensure transparency)
4. Resize using ImageMagick or online tools

#### Using Online Tools

**Favicon Generator**:
- realfavicongenerator.net
- favicon-generator.org

1. Upload your image
2. Adjust settings
3. Download PNG files

---

### Icon Design Tips

✨ **Design Principles**:
- Use your brand colors (pink, purple, cyan)
- Keep it simple and recognizable
- Ensure readability at small sizes
- Use gradients for visual interest
- Add rounded corners for modern look
- Leave padding around edges (safe area)

✨ **Color Combinations**:
```css
/* Linear Gradient (Recommended) */
background: linear-gradient(135deg, #ec4899, #a78bfa);

/* Radial Gradient */
background: radial-gradient(circle, #ec4899, #06b6d4);

/* Multi-color */
background: linear-gradient(135deg, #ec4899, #a78bfa, #06b6d4);
```

---

### Icon Resizing

**Using ImageMagick**:
```bash
# Create 192px version from 512px
convert icon-512.png -resize 192x192 icon-192.png

# Optimize PNG
optipng -o2 icon-192.png
```

**Using Python**:
```python
from PIL import Image

img = Image.open('icon-512.png')
img_small = img.resize((192, 192), Image.Resampling.LANCZOS)
img_small.save('icon-192.png', 'PNG', optimize=True)
```

---

## 🎯 Customization Guide

### Updating Timeline Content

Edit the `timeline` array in `js/app.js`:

```javascript
const CONFIG = {
  timeline: [
    {
      date: 'YYYY-MM-DD',        // Date in ISO format
      title: 'Event Title',       // Main heading
      description: 'Description', // Subtitle
      image: 'image1.jpg',       // Must match filename
      year: 2024                  // Year shown on marker
    },
    // Add more entries...
  ]
};
```

**Tips**:
- Dates should be in `YYYY-MM-DD` format
- Images must exist in `/assets/images/`
- You can have as many timeline items as you want
- Order matters: they display top-to-bottom

---

### Updating Letter Content

Edit the `letter` object in `js/app.js`:

```javascript
const CONFIG = {
  letter: {
    title: 'A Letter for You',
    content: `
      <p>Dear Someone Special,</p>
      
      <p>Your custom message here...</p>
      
      <p>With love,<br>Your Name</p>
    `
  }
};
```

**Tips**:
- Use `<p>` tags for paragraphs
- Use `<br>` for line breaks
- You can use `<strong>` and `<em>` for formatting
- Keep it personal and heartfelt

---

### Updating Birthday Date

Edit the `birthdayDate` in `js/app.js`:

```javascript
const CONFIG = {
  // Month is 0-indexed: 0=January, 1=February, 2=March, etc.
  birthdayDate: new Date(2026, 2, 3) // March 3, 2026
};
```

**How to set any date**:
- January 15: `new Date(2026, 0, 15)`
- June 20: `new Date(2026, 5, 20)`
- December 25: `new Date(2026, 11, 25)`

---

### Changing Colors

Edit CSS variables in `css/style.css`:

```css
:root {
  /* Primary Colors */
  --color-primary: #ec4899;        /* Pink */
  --color-primary-light: #f472b6;  /* Light Pink */
  --color-secondary: #a78bfa;      /* Purple */
  --color-accent: #06b6d4;         /* Cyan */
  
  /* Background Colors */
  --bg-primary: #ffffff;           /* White */
  --bg-secondary: #f9fafb;         /* Light Gray */
  
  /* Text Colors */
  --text-primary: #1f2937;         /* Dark Gray */
  --text-secondary: #6b7280;       /* Medium Gray */
}
```

**Popular Color Combinations**:

💜 **Purple Theme**:
```css
--color-primary: #7c3aed;        /* Violet */
--color-secondary: #ec4899;      /* Pink */
--color-accent: #06b6d4;         /* Cyan */
```

💙 **Blue Theme**:
```css
--color-primary: #0ea5e9;        /* Sky Blue */
--color-secondary: #06b6d4;      /* Cyan */
--color-accent: #f43f5e;         /* Rose */
```

🔥 **Warm Theme**:
```css
--color-primary: #f97316;        /* Orange */
--color-secondary: #ea580c;      /* Red-Orange */
--color-accent: #fbbf24;         /* Amber */
```

---

## 🐛 Troubleshooting

### Images Not Loading

**Problem**: Images show broken icon

**Solutions**:
1. ✅ Check file names are exact match (case-sensitive on Mac/Linux)
2. ✅ Verify files are in correct folder: `/assets/images/`
3. ✅ Check browser console for 404 errors (F12 → Console)
4. ✅ Ensure you're serving with a web server (not opening `file://`)
5. ✅ Clear browser cache (Ctrl+Shift+Delete)

**Test Command**:
```bash
# Check if files exist
ls -la assets/images/

# Should show:
# background.jpg
# hero.jpg
# image1.jpg
# image2.jpg
# ...
```

---

### Audio Not Playing

**Problem**: No sound or audio won't load

**Solutions**:
1. ✅ Check file format is MP3 (not WAV, FLAC, etc.)
2. ✅ Check file size is reasonable (< 10MB)
3. ✅ Check browser supports MP3 (all modern browsers do)
4. ✅ Check browser hasn't blocked autoplay (requires user interaction)
5. ✅ Test audio file with `<audio>` tag directly

**Test Audio**:
```html
<audio controls>
  <source src="/assets/audio/background-music.mp3" type="audio/mpeg">
</audio>
```

---

### Icons Not Showing on Mobile

**Problem**: App doesn't show custom icon when installed

**Solutions**:
1. ✅ Verify icons exist at `/assets/icons/icon-192.png` and `icon-512.png`
2. ✅ Clear service worker cache
3. ✅ Reinstall the app
4. ✅ Check manifest.json has correct icon paths
5. ✅ Verify icons are PNG format (not JPG)

**Clear Cache**:
```javascript
// Open DevTools Console and run:
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

---

### Timeline Images Not Appearing

**Problem**: Timeline shows but images are missing

**Solutions**:
1. ✅ Check image filename in `CONFIG.timeline` matches actual file
2. ✅ Verify image files exist in `/assets/images/`
3. ✅ Check browser console for specific 404 errors
4. ✅ Ensure filename matches exactly (case-sensitive)

**Debug**:
```javascript
// Open DevTools Console and run:
console.log(CONFIG.timeline);
// Check if image filenames are correct
```

---

### Slow Loading

**Problem**: Page takes too long to load

**Solutions**:
1. ✅ Compress images using TinyJPG or Squoosh
2. ✅ Use appropriate file sizes (not full 4K photos)
3. ✅ Enable gzip compression on server
4. ✅ Use Service Worker caching (already enabled)
5. ✅ Consider using WebP format for faster loading

**Check Image Size**:
```bash
# Check file sizes
du -sh assets/images/*

# Reduce if > 200KB each
convert input.jpg -quality 80 -resize 1920x1080 output.jpg
```

---

## 📚 File Organization Best Practices

### Folder Structure

```
birthday-pwa/
├── assets/
│   ├── images/
│   │   ├── background.jpg          (1920x1080, 300KB)
│   │   ├── hero.jpg                (300x300, 50KB)
│   │   ├── image1.jpg              (400x300, 100KB)
│   │   ├── image2.jpg              (400x300, 100KB)
│   │   └── ... (image3-10.jpg)
│   ├── audio/
│   │   ├── background-music.mp3    (3-5 min, 5MB)
│   │   ├── song1.mp3               (3-5 min, 8MB)
│   │   └── ... (song2-5.mp3)
│   └── icons/
│       ├── icon-192.png            (192x192, 30KB)
│       └── icon-512.png            (512x512, 100KB)
├── css/
│   └── style.css
├── js/
│   └── app.js
├── index.html
├── manifest.json
├── service-worker.js
└── README.md
```

### Naming Conventions

✅ **Use lowercase with hyphens**:
- `background.jpg` ✅
- `hero-image.jpg` ✅
- `Background.jpg` ❌
- `hero_image.jpg` ❌ (use hyphens)

✅ **Be descriptive**:
- `sunset-beach.jpg` ✅ Better than `bg1.jpg`
- `birthday-celebration.mp3` ✅ Better than `song.mp3`

✅ **Use sequential numbers for series**:
- `image1.jpg`, `image2.jpg`, ... ✅
- `song1.mp3`, `song2.mp3`, ... ✅

---

## 🚀 Deployment Checklist

Before deploying, verify:

- [ ] All images are compressed and optimized
- [ ] All audio files are in MP3 format
- [ ] Icons are PNG format with transparency
- [ ] All file paths in config match actual filenames
- [ ] Birthday date is set correctly
- [ ] Letter content is personalized
- [ ] Timeline events are accurate
- [ ] Images load without 404 errors
- [ ] App works offline (Service Worker)
- [ ] Responsive design looks good on mobile
- [ ] Theme toggle works (light/dark mode)
- [ ] All animations smooth at 60fps

---

## 📞 Getting Help

### Common Issues

**Q: How do I add more timeline items?**
A: Edit the `timeline` array in `js/app.js` and add new objects with `date`, `title`, `description`, `image`, and `year` properties.

**Q: Can I use JPEG instead of PNG for icons?**
A: Not recommended. PNG supports transparency which looks better. But you can try JPG if needed.

**Q: How do I change the birthday date?**
A: Edit `CONFIG.birthdayDate` in `js/app.js`. Use format: `new Date(year, month-1, day)`

**Q: Can I add more than 10 images?**
A: Yes! Just add more image files and timeline entries in the config.

**Q: How do I change the colors?**
A: Edit CSS variables in `:root` at the top of `css/style.css`.

---

## 🎓 Resources

### Image Resources
- Unsplash: unsplash.com
- Pexels: pexels.com
- Pixabay: pixabay.com

### Audio Resources
- Unsplash Music: unsplash.com/music
- Free Music Archive: freemusicarchive.org
- Epidemic Sound: epidemicsound.com

### Tools
- Image Optimization: tinyjpg.com, squoosh.app
- Audio Conversion: ffmpeg.org, audacityteam.org
- Icon Design: figma.com, adobe.com/xd

### Learning
- MDN Web Docs: developer.mozilla.org
- Web.dev: web.dev
- CSS Tricks: css-tricks.com

---

## ✅ Setup Complete!

Once you've added all assets:

1. Test locally: `python -m http.server 8000`
2. Open: `http://localhost:8000`
3. Verify all assets load
4. Test on mobile
5. Deploy to GitHub Pages

**Enjoy your Birthday PWA! 🎉**

---

**Need more help?** Check the main README.md or GitHub Issues section.