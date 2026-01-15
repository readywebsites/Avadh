# 🎬 GSAP-STYLE MODERN ANIMATIONS FRAMEWORK
## Premium, Smooth, Highly Interactive Motion Design

---

## 📋 Quick Start

### 1. Include CSS & JavaScript
```html
<!-- Add to head -->
<link href="css/modern-gsap-animations.css" rel="stylesheet">
<link href="css/modern-premium-effects.css" rel="stylesheet">

<!-- Add before closing body -->
<script src="js/modern-gsap-engine.js"></script>
```

### 2. Apply Animation Classes
```html
<!-- Scroll animations (auto-trigger) -->
<div class="scroll-fade-in">Content fades in</div>
<div class="scroll-slide-left">Content slides from left</div>
<div class="scroll-scale-up">Content scales up</div>

<!-- Text animations -->
<h1 class="gradient-text">Gradient Text</h1>
<p class="neon-text">Glowing Text</p>

<!-- Interactive elements -->
<button class="btn-smooth-hover">Hover Button</button>
<button class="btn-ripple">Click Ripple</button>
```

### 3. Use JavaScript API
```javascript
// Access the animation engine
const engine = window.animationEngine;

// Animate on scroll
engine.animateOnScroll('.my-element', 'scroll-fade-in');

// Stagger children
engine.staggerChildren('.my-container', 0.1);

// Enable parallax
engine.enableParallax('.parallax-element', 0.5);
```

---

## 🎨 SCROLL ANIMATIONS

Automatically trigger when elements enter viewport!

### Fade In
```html
<div class="scroll-fade-in">Element fades in smoothly</div>
```
**Easing**: Power3 Out | **Duration**: 0.8s

### Slide Animations
```html
<div class="scroll-slide-left">Slides from left</div>
<div class="scroll-slide-right">Slides from right</div>
<div class="scroll-slide-up">Slides from bottom</div>
```
**Easing**: Power3 Out | **Duration**: 0.8s | **Distance**: 60px

### Scale Up
```html
<div class="scroll-scale-up">Scales from 0.85 to 1</div>
```
**Easing**: Power3 Out | **Duration**: 0.9s | **Scale**: 0.85→1

### Rotate In
```html
<div class="scroll-rotate-in">Rotates in 3D</div>
```
**Easing**: Power3 Out | **Duration**: 0.9s | **Rotation**: 90deg Y-axis

### Blur to Focus
```html
<div class="scroll-blur-focus">Blurs to sharp focus</div>
```
**Easing**: Power3 Out | **Duration**: 1s | **Blur**: 10px→0

---

## 📝 TYPOGRAPHY ANIMATIONS

### Gradient Text
```html
<h1 class="gradient-text">Beautiful Gradient Text</h1>
```
**Features**: Animated gradient shifting (6s loop)
**Colors**: #978667 → #c9a227 → #ebd7b2

### Neon Glow
```html
<h2 class="neon-text">Glowing Neon</h2>
```
**Features**: Pulsing glow with realistic flicker
**Glow**: 0-40px radius with color transitions

### Text Reveal (via API)
```javascript
// Split by letters
const element = document.querySelector('h1');
window.animationEngine.splitTextLetters(element);

// Split by words
window.animationEngine.splitTextWords(element);
```
**Delay**: 0.05s per letter or 0.1s per word

### Type Writer Effect (via API)
```javascript
const element = document.querySelector('#text');
window.animationEngine.animateTypeWriter(element, 'Your text here', 50);
```
**Speed**: 50ms per character (adjustable)

### Counter Animation (via API)
```javascript
const counter = document.querySelector('.counter');
window.animationEngine.animateCounter(counter, 1000, 1000);
```
**Animation Time**: 1000ms to count to 1000

---

## 🎪 SECTION REVEALS

### Basic Reveal
```html
<section class="section-reveal">
    Content reveals smoothly on scroll
</section>
```
**Easing**: Power2 Out | **Duration**: 1s

### Staggered Children
```html
<section class="section-stagger">
    <div>Item 1 - animates first</div>
    <div>Item 2 - 0.1s delay</div>
    <div>Item 3 - 0.2s delay</div>
</section>
```
**Base Delay**: 0.1s between items
**Automatic**: Triggers when section enters viewport

### Curtain Reveal
```html
<div class="curtain-reveal">
    Content revealed with curtain effect
</div>
```
**Direction**: Right to left
**Duration**: 1s Power3 In/Out

### Split Reveal
```html
<div class="split-reveal">
    Content revealed from both sides
</div>
```
**Direction**: Left and right split
**Duration**: 1s Power3 In/Out

---

## 🖼️ PARALLAX EFFECTS

### Enable Parallax
```html
<!-- HTML -->
<div class="parallax-element" data-parallax-speed="0.5">
    Content moves slower than scroll
</div>

<!-- Or via JavaScript -->
<script>
    window.animationEngine.enableParallax('.parallax-element', 0.5);
</script>
```

### Speed Values
- **0.1-0.3**: Subtle background movement
- **0.5**: Standard parallax depth
- **0.7-1.0**: More pronounced effect
- **1.0+**: Reverse parallax (moves faster)

### Parallax Background
```html
<div class="parallax-container">
    <div class="parallax-bg" data-parallax-speed="0.3">
        Background layer
    </div>
    <div class="content">
        Main content on top
    </div>
</div>
```

---

## 🔘 MICRO-INTERACTIONS

### Smooth Hover Button
```html
<button class="btn-smooth-hover">Hover Me</button>
```
**Features**: 
- Lift on hover (4px translateY)
- Ripple background effect
- Shadow elevation

### Ripple Effect Button
```html
<button class="btn-ripple" onclick="handleRipple(event)">Click Me</button>
```
**Features**: Material Design ripple on click
**Animation**: 0.6s ease-out

### Gradient Shift Button
```html
<button class="btn-gradient-shift">Gradient Button</button>
```
**Features**: Animated gradient flowing
**Duration**: 3s infinite
**Hover**: Lift and shadow

### Shimmer Button
```html
<button class="btn-shimmer">Shimmer Effect</button>
```
**Features**: Light sweep animation
**Duration**: 2s infinite
**Direction**: Left to right

### Expanding Background Button
```html
<button class="btn-expand-bg">Expand on Hover</button>
```
**Features**: Background expands from center
**Duration**: 0.5s
**Size**: Expands to 300px radius

### Glass Effect Card
```html
<div class="card-glass">
    Frosted glass morphism effect
</div>
```
**Features**: 
- Backdrop blur (10px)
- 60% opacity
- Subtle border

### Enhanced Input Fields
```html
<input type="text" class="input-smooth" placeholder="Type here">
```
**Features**:
- Smooth focus animation
- Color transition
- Shadow elevation
- Floating label support

### Floating Labels
```html
<div class="label-float">
    <input type="text" class="input-enhanced" placeholder=" ">
    <label>Your Label</label>
</div>
```
**Features**: Auto-floating on focus/input

### Checkbox Animation
```html
<input type="checkbox" class="checkbox-smooth">
```
**Features**: Scale pulse on check
**Duration**: 0.3s Power2 Out

### Image Hover Zoom
```html
<div class="image-hover-zoom">
    <img src="image.jpg" alt="">
</div>
```
**Features**: Smooth zoom on hover
**Scale**: 1 → 1.1
**Duration**: 0.8s Power2 In/Out

---

## 🎬 ADVANCED EFFECTS

### Morphing Shapes
```html
<div class="morph-blob" style="width: 200px; height: 200px; background: #978667;"></div>
```
**Animation**: 8s infinite ease-in-out
**Shape Changes**: 5 different organic forms

### Glitch Text
```html
<h1 class="glitch-text" data-text="GLITCH">GLITCH</h1>
```
**Features**: 
- Chromatic aberration
- Clip-path animation
- Multi-color displacement

### Wave Text
```html
<div class="wave-text">
    <span>W</span><span>a</span><span>v</span><span>e</span>
</div>
```
**Features**: Wave motion through letters
**Duration**: 0.6s per wave
**Amplitude**: 20px

### Rotating Border Card
```html
<div class="card-rotating-border">
    Content with animated gradient border
</div>
```
**Features**: Gradient border animation
**Duration**: 4s infinite
**Colors**: #978667 → #c9a227 → #ebd7b2

### Blur In Effect
```html
<h1 class="blur-in">Content blurs to focus</h1>
```
**Blur**: 10px → 0
**Duration**: 1s ease-out

---

## 🎨 CSS VARIABLES (Customization)

Edit these in `modern-gsap-animations.css`:

### Timing Variables
```css
--timing-fast: 0.3s;      /* Quick interactions */
--timing-normal: 0.6s;    /* Standard animations */
--timing-slow: 1s;        /* Cinematic timing */
--timing-xl: 1.5s;        /* Ultra-smooth */
--timing-xxl: 2s;         /* Epic animations */
```

### Easing Functions
```css
--ease-power1-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
--ease-power1-out: cubic-bezier(0.215, 0.61, 0.355, 1);
--ease-power1-inout: cubic-bezier(0.645, 0.045, 0.355, 1);

--ease-power2-in: cubic-bezier(0.695, 0.13, 0.805, 0.27);
--ease-power2-out: cubic-bezier(0.19, 1, 0.22, 1);
--ease-power2-inout: cubic-bezier(0.645, 0.045, 0.355, 1);

--ease-power3-in: cubic-bezier(0.755, 0.05, 0.855, 0.06);
--ease-power3-out: cubic-bezier(0.165, 0.84, 0.44, 1);
--ease-power3-inout: cubic-bezier(0.645, 0.045, 0.355, 1);

--ease-back-in: cubic-bezier(0.6, -0.28, 0.735, 0.045);
--ease-back-out: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--ease-back-inout: cubic-bezier(0.68, -0.55, 0.265, 1.55);

--ease-bounce-in: cubic-bezier(0.6, 0.04, 0.98, 0.335);
--ease-bounce-out: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Color Variables
```css
--primary: #978667;
--accent: #c9a227;
--light: #ebd7b2;
--dark: #2c2416;
--text: #333;
```

### Custom Variables
```css
:root {
  --primary: #000;           /* Change primary color */
  --accent: #ff6b6b;         /* Change accent */
  --timing-normal: 0.8s;     /* Speed up/down */
  --ease-power3-out: your-custom-easing;
}
```

---

## 🚀 JAVASCRIPT API

### ModernAnimationEngine

```javascript
// Access the engine
const engine = window.animationEngine;

// Scroll animations
engine.animateOnScroll(selector, animationClass, triggerPoint);
// Example:
engine.animateOnScroll('.cards', 'scroll-fade-in', 0.8);

// Text animations
engine.splitTextLetters(element);      // Split to letters with delay
engine.splitTextWords(element);        // Split to words with delay
engine.animateTypeWriter(element, text, speed);
engine.animateCounter(element, target, duration);

// Parallax
engine.enableParallax(selector, speed);

// Stagger animations
engine.staggerChildren(selector, delay, threshold);

// Smooth hover
engine.enableSmoothHover(selector);

// Accordion
engine.enableAccordion(selector);

// Ripple effect
engine.createRipple(element, event);

// Timeline
engine.timeline(elements, { stagger: 0.1, duration: 0.6 });
```

### ScrollSyncAnimation

```javascript
// Access scroll sync
const scrollSync = window.scrollSyncAnimation;

// Register element for scroll-sync animation
scrollSync.register(element, {
    rotate: 360,     // Rotate 360deg by end
    scale: 1.5,      // Scale to 1.5x
    opacity: 0.5     // Fade to 50% opacity
});

// Unregister when done
scrollSync.unregister(element);
```

### SmoothScroll

```javascript
// Smooth scroll activated on #anchor links
// Click any <a href="#section"> to smooth scroll
// Or programmatically:
window.smoothScroll.smoothScrollTo(element, 1000);
```

### MagneticCursor (Optional)

```javascript
// Create magnetic effect on elements
const magnetic = new MagneticCursor('.btn-smooth-hover, .btn-ripple');
```

---

## ⚡ PERFORMANCE OPTIMIZATIONS

### Built-in Optimizations
- **GPU Acceleration**: `will-change: transform`, `translateZ(0)`
- **Passive Event Listeners**: Scroll/mouse events are passive
- **RequestAnimationFrame**: Synced with browser refresh rate
- **Intersection Observer**: Efficient scroll detection
- **CSS Contain**: Layout/style/paint containment
- **Lazy Animation**: Only animate visible elements

### Performance Tips
1. **Use `scroll-*` classes** instead of manual triggers
2. **Limit stagger delay** to reasonable values (0.05-0.2s)
3. **Use `will-change` sparingly** (only on animated elements)
4. **Prefer transforms/opacity** over layout-affecting properties
5. **Test on mobile** - some effects may need adjustment

### Mobile Optimizations
- Parallax disabled on mobile (performance)
- Reduced stagger delays
- Touch-optimized button sizes
- Respects prefers-reduced-motion

---

## 📱 RESPONSIVE DESIGN

All animations are mobile-responsive. For mobile-specific tweaks:

```css
@media (max-width: 768px) {
  /* Reduce animation complexity */
  .parallax-element {
    animation-duration: 0 !important;
  }

  /* Slower animations for mobile */
  .scroll-slide-left {
    animation-duration: 0.6s;
  }

  /* Adjust stagger */
  .section-stagger.active > :nth-child(n+4) {
    animation-delay: 0.3s;
  }
}
```

---

## ♿ ACCESSIBILITY

### Prefers Reduced Motion
All animations respect `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Best Practices
- ✅ Animations enhance, don't block interactions
- ✅ Text remains readable during animation
- ✅ No animated GIFs or flashing content
- ✅ Color not sole indicator of state change
- ✅ Focus indicators visible at all times

---

## 🌓 DARK MODE

CSS supports dark mode automatically:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --text: #fff;
    --dark: #1a1410;
  }

  .card-glass {
    background: rgba(0, 0, 0, 0.2);
  }
}
```

---

## 📊 BROWSER SUPPORT

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ 90+ | Full support |
| Firefox | ✅ 88+ | Full support |
| Safari | ✅ 14+ | Full support |
| Edge | ✅ 90+ | Full support |
| Mobile Chrome | ✅ Latest | Full support |
| Mobile Safari | ✅ 14+ | Full support |

---

## 🎬 REAL-WORLD EXAMPLES

### Hero Section
```html
<section class="hero-showcase">
    <h1 class="gradient-text scroll-slide-up">Welcome</h1>
    <p class="neon-text scroll-fade-in">Premium Experience</p>
    <button class="btn-smooth-hover scroll-scale-up">Get Started</button>
</section>
```

### Property Cards
```html
<div class="property_card card-lift card-shine fade-in-scroll scroll-scale-up">
    <div class="property_image image-zoom image-overlay">
        <img src="property.jpg" alt="">
        <span class="badge-pulse">Featured</span>
    </div>
    <div class="property_content">
        <h3>Property Name</h3>
        <p>Description</p>
    </div>
</div>
```

### Feature Section
```html
<section class="section-stagger">
    <div class="stagger-item scroll-slide-left">Feature 1</div>
    <div class="stagger-item scroll-slide-up">Feature 2</div>
    <div class="stagger-item scroll-slide-right">Feature 3</div>
</section>
```

### Contact Form
```html
<form>
    <div class="label-float">
        <input type="email" class="input-smooth">
        <label>Email</label>
    </div>
    <button type="submit" class="btn-gradient-shift">Send</button>
</form>
```

---

## 🎯 FILES INCLUDED

### CSS Files
- `modern-gsap-animations.css` (900+ lines) - Main animation library
- `modern-premium-effects.css` (600+ lines) - Advanced effects

### JavaScript Files
- `modern-gsap-engine.js` (400+ lines) - Animation engine

### HTML Files
- `modern-animations-showcase.html` - Live demo page
- `index.html` - Enhanced with animations

### Documentation
- `MODERN_ANIMATIONS_GUIDE.md` - This file
- Additional guides included

---

## 🚀 NEXT STEPS

1. **View the showcase**: Open `modern-animations-showcase.html`
2. **Explore classes**: Check CSS for all available animations
3. **Apply to your pages**: Add classes to any HTML element
4. **Customize**: Edit CSS variables for your brand
5. **Test**: Verify on desktop and mobile

---

## 💡 TIPS & TRICKS

### Quick Animation Application
```html
<!-- Just add a class! -->
<div class="scroll-fade-in">Done!</div>
```

### Custom Timing
```html
<style>
  .my-element {
    --timing-normal: 2s;  /* Override duration */
  }
</style>
<div class="my-element scroll-fade-in">Slow animation</div>
```

### Combining Animations
```html
<div class="scroll-fade-in scroll-slide-left">
  Multiple animations stack!
</div>
```

### Stagger Effect
```javascript
// Stagger multiple elements with API
engine.staggerChildren('.items', 0.15);
```

---

## 📞 SUPPORT

For detailed GSAP concepts (this framework is inspired by GSAP):
- Visit: https://gsap.com
- Docs: https://gsap.com/docs

For browser-specific CSS animation issues:
- MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation

---

## ✨ CREDITS

Modern GSAP-Style Animation Framework
- Smooth scroll-based animations
- Cinematic section reveals
- Parallax effects
- Animated typography
- Micro-interactions system
- Premium easing functions
- Performance-optimized
- Fully accessible

**Version**: 1.0.0 | **Year**: 2026

---

**Your premium animation framework is ready to make your website feel alive!** 🎉
