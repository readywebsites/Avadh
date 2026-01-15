<!-- ============================================
     GSAP-POWERED 3D REVIEW CARDS
     Complete Implementation Guide
     ============================================ -->

# 3D Tilt Review Cards - Complete Implementation Guide

## 📋 Overview

Your new 3D review card system is a premium, interactive component featuring:

- **3D Tilt Effects**: Mouse-tracked perspective transforms with real-time depth
- **Parallax Layers**: Multi-layered depth animations
- **Interactive Badges**: Verified badge pop-in animations
- **Star Ratings**: Animated star reveal with pulse effects
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: Full keyboard navigation and ARIA support
- **Dark Mode**: Automatic dark scheme support

## 🎯 Quick Start

### Step 1: CSS Integration

Link the 3D review styles in your `<head>`:

```html
<link href="css/review-cards-3d.css" rel="stylesheet">
```

### Step 2: JavaScript Engine

Load the tilt engine before closing `</body>`:

```html
<script src="js/review-tilt-engine.js" defer></script>
```

### Step 3: HTML Structure

Copy the review section from `review-section-template.html` into your page where desired.

**Minimal example:**

```html
<section class="reviews-section">
  <div class="container py-5">
    <div class="reviews-grid">
      <article class="review-card">
        <div class="review-card-inner">
          <div class="review-glow"></div>
          <div class="review-light-ray"></div>
          <div class="review-texture"></div>
          
          <div class="review-stars">
            <span class="star filled"><i class="bi bi-star-fill"></i></span>
            <span class="star filled"><i class="bi bi-star-fill"></i></span>
            <span class="star filled"><i class="bi bi-star-fill"></i></span>
            <span class="star filled"><i class="bi bi-star-fill"></i></span>
            <span class="star filled"><i class="bi bi-star-fill"></i></span>
          </div>

          <div class="review-quote-mark">
            <i class="bi bi-quote"></i>
          </div>

          <p class="review-text">
            "Your review text here..."
          </p>

          <div class="reviewer-profile">
            <div class="reviewer-avatar">
              <img src="your-image.jpg" alt="Name" loading="lazy">
              <div class="avatar-glow"></div>
            </div>
            <div class="reviewer-info">
              <h5 class="reviewer-name">Guest Name</h5>
              <p class="reviewer-title">Guest Type</p>
            </div>
            
            <div class="review-verified">
              <i class="bi bi-check-circle-fill"></i>
              <span>Verified</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>
```

## 🎨 CSS Classes & Structure

### Container Level

```css
.reviews-section
├── Background gradient
├── Decorative glow elements
└── reviews-grid
    └── Gap: 30px (responsive: 20px mobile)
```

### Card Structure

```css
.review-card                    // Outer wrapper (perspective context)
└── .review-card-inner          // Inner card (3D transforms applied here)
    ├── .review-glow            // Background glow effect
    ├── .review-light-ray       // Sweep animation overlay
    ├── .review-texture         // Subtle texture overlay
    ├── .review-stars           // Star rating container
    ├── .review-quote-mark      // Quote icon
    ├── .review-text            // Review text content
    └── .reviewer-profile       // Profile section
        ├── .reviewer-avatar    // Image + glow
        ├── .reviewer-info      // Name & title
        └── .review-verified    // Verification badge
```

## 🚀 JavaScript API

### Auto-Initialization

The engine auto-initializes on DOM load:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  window.tiltReviewEngine = new TiltReviewEngine({
    maxTilt: 15,           // Max rotation angle in degrees
    scale: 1.05,           // Hover scale factor
    glowIntensity: 0.8     // Glow opacity (0-1)
  });
});
```

### Manual Initialization

```javascript
// With custom options
const engine = new TiltReviewEngine({
  maxTilt: 20,
  scale: 1.08,
  shadowAmount: 40
});

// Access instance globally
window.tiltReviewEngine
```

### Available Methods

```javascript
// Get card data
const data = tiltReviewEngine.getCardData(0); // Returns { text, rating, name, title }

// Enable magnetic effect (cards follow cursor)
tiltReviewEngine.enableMagneticEffect(card);

// Animate counter
tiltReviewEngine.animateCounter(element, 1200, 1000);

// Cleanup
tiltReviewEngine.destroy();
```

### Events

Listen for card clicks:

```javascript
document.addEventListener('reviewCardClicked', (e) => {
  console.log('Card index:', e.detail.index);
  console.log('Card element:', e.detail.card);
  console.log('Card data:', window.tiltReviewEngine.getCardData(e.detail.index));
});
```

## 🎬 Animation Details

### Scroll Reveal

Cards automatically fade in and stagger on scroll visibility:

```css
.review-card:nth-child(1) { animation-delay: 0s; }
.review-card:nth-child(2) { animation-delay: 0.15s; }
.review-card:nth-child(3) { animation-delay: 0.3s; }
.review-card:nth-child(4) { animation-delay: 0.45s; }
/* ... continues for 6 cards total ... */
```

### Hover Transforms

**3D Tilt**: 
- rotateX (up/down): -8deg to +8deg
- rotateY (left/right): -8deg to +8deg
- Scale: 1.05x
- TranslateZ: 20px forward

**Parallax Layers**:
- Stars: 50% parallax offset
- Text: 70% parallax offset
- Profile: 30% parallax offset

**Light Ray**:
- Rotates to follow cursor angle
- Creates directional lighting effect

### Star Animation

On scroll reveal:
```css
@keyframes starPulse
- 0%: opacity 0, scale 0.5
- 50%: opacity 1
- 100%: opacity 1, scale 1
Duration: 0.4s
Easing: cubic-bezier(0.34, 1.56, 0.64, 1) [bounce effect]
```

### Badge Animation

On hover:
```css
@keyframes badgePop
- 0%: opacity 0, scale 0
- 50%: scale 1.1
- 100%: opacity 1, scale 1
Duration: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)
```

## 🎨 Customization

### Color Scheme

Edit `review-cards-3d.css` variables:

```css
/* Primary Gold Accent */
--color-gold: #c9a227;
--color-gold-light: #d4af37;
--color-dark: #2c2c2c;
--color-light: #f8f6f1;

/* Override in your custom CSS */
.review-stars .star.filled {
  color: #your-color;
}

.review-verified {
  background: #your-verified-color;
}
```

### Tilt Amount

```javascript
// Increase maximum tilt
const engine = new TiltReviewEngine({
  maxTilt: 25  // Default: 15 degrees
});

// For mobile (auto-adjusted via CSS media queries)
@media (max-width: 768px) {
  /* Tilt reduced to 6deg */
}
```

### Parallax Intensity

Modify in JavaScript:

```javascript
// In updateParallaxLayers method
const offsetX = (x - centerX) * 0.15;  // Increase from 0.1 for more parallax
const offsetY = (y - centerY) * 0.15;
```

### Animation Timing

```css
/* Stagger increment */
animation-delay: calc(var(--index) * 0.15s);
/* Change 0.15s for faster/slower reveal */

/* Transition speed */
transition: transform 0.3s ease-out;
/* Adjust for snappier/smoother feel */
```

## 📱 Responsive Behavior

### Desktop (1024px+)
- Full 3D tilt: 8deg per axis
- Max scale: 1.05
- Full parallax effects
- Grid: 3 columns

### Tablet (768px - 1023px)
- Reduced tilt: 6deg per axis
- Max scale: 1.04
- Moderate parallax
- Grid: 2 columns

### Mobile (480px - 767px)
- Minimal tilt: 4deg per axis
- Max scale: 1.02
- Subtle parallax
- Grid: 1 column

### Extra Small (<480px)
- Tilt disabled (optional via prefers-reduced-motion)
- Simple hover effects
- Single column
- Touch-friendly spacing

## ♿ Accessibility

### Keyboard Navigation

```
TAB         - Focus card
ENTER/SPACE - Activate card
RETURN      - Same as ENTER
```

### Screen Reader Support

```html
<!-- Automatic ARIA labels -->
<article class="review-card" 
  aria-label="Sarah Johnson's review - 5 stars"
  role="article" 
  tabindex="0">
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled */
  /* Transforms still work for visual feedback */
}
```

### Dark Mode Support

```css
@media (prefers-color-scheme: dark) {
  /* Automatic color inversion */
  /* Gold becomes warmer */
  /* Backgrounds adapt */
}
```

## 🔧 Advanced Features

### Magnetic Effect

Cards gravitate toward cursor:

```javascript
const card = document.querySelector('.review-card');
tiltReviewEngine.enableMagneticEffect(card);

// Cards will "pull" toward cursor within 150px radius
// Force increases as cursor gets closer
```

### Counter Animation

Animate number reveals:

```javascript
const element = document.querySelector('.stat-number');
tiltReviewEngine.animateCounter(element, 1200, 1000);
// Animates from 0 to 1200 over 1000ms
```

### Ripple Effects

Two built-in ripple animations:

1. **Entrance Ripple** (auto-triggered on hover)
   - Radiates from center
   - 0.6s duration
   - Semi-transparent gold

2. **Click Ripple** (auto-triggered on click)
   - Material Design style
   - Ripples from click point
   - 0.8s duration

## 🐛 Troubleshooting

### Cards not tilting

1. ✅ Check CSS file is linked
2. ✅ Check JS file is loaded before closing `</body>`
3. ✅ Verify `.review-card` classes exist
4. ✅ Open browser console for errors

### Parallax not working

1. ✅ Verify `.review-stars`, `.review-text`, `.reviewer-profile` exist
2. ✅ Check `will-change: transform` is set (performance)
3. ✅ Ensure parent has `perspective: 1200px`

### Mobile not responsive

1. ✅ Verify media queries are in CSS (768px, 480px breakpoints)
2. ✅ Check viewport meta tag exists
3. ✅ Clear browser cache and hard refresh

### Performance issues

1. ✅ Check `will-change: transform` optimization is present
2. ✅ Verify GPU acceleration (`transform` vs left/top)
3. ✅ Consider reducing number of parallax layers
4. ✅ Check no console errors (memory leaks)

## 📊 Performance Metrics

Optimal performance achieved through:

- ✅ GPU-accelerated transforms (no layout thrashing)
- ✅ `will-change` hints for browser optimization
- ✅ Passive event listeners (`{ passive: true }`)
- ✅ RequestAnimationFrame for smooth animations
- ✅ Efficient Intersection Observer for scroll reveal

**Expected Performance**:
- 60 FPS on desktop with 6 cards
- 30-45 FPS on mobile with optimizations
- < 100ms interaction latency

## 📁 File Structure

```
review-cards-3d.css          ✅ Complete 3D styling
review-tilt-engine.js         ✅ Interactive engine
review-section-template.html  ✅ HTML structure (6 cards)
index.html                    ✅ Integration point

// Existing dependencies (already in project)
css/bootstrap.min.css
css/custom.css
js/jquery-3.7.1.min.js
js/bootstrap.bundle.min.js
```

## 🎓 Learning Resources

### 3D CSS Transforms
- `perspective`: Creates 3D space
- `transform-style: preserve-3d`: Enables 3D children
- `rotateX/Y`: Tilt angles
- `translateZ`: Depth positioning

### Animation Techniques
- Intersection Observer: Scroll detection
- RequestAnimationFrame: Smooth 60fps
- Custom events: Card interactions
- Stagger delays: Sequential reveals

## 🚀 Next Steps

1. **Customize** review cards with your guest data
2. **Update** placeholder images (6 guest avatars)
3. **Test** on multiple devices and browsers
4. **Monitor** performance in DevTools
5. **Adjust** tilt angles and parallax to preference
6. **Deploy** and collect real guest reviews!

## 📞 Support

For issues or customizations:

1. Check console for JavaScript errors
2. Verify file paths are correct
3. Clear browser cache (Ctrl+Shift+Del)
4. Test in different browser
5. Review troubleshooting section above

---

**System Generated**: January 15, 2026
**Engine Version**: GSAP-Style 3D v1.0
**Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
