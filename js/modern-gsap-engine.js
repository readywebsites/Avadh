/* ============================================
   GSAP-STYLE MODERN ANIMATION ENGINE
   Smooth Scroll, Parallax, Typography, Micro-interactions
   ============================================ */

class ModernAnimationEngine {
  constructor() {
    this.elements = new Map();
    this.observers = new Map();
    this.scrollProgress = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    this.setupScrollListener();
    this.setupMouseListener();
    this.setupIntersectionObserver();
    this.setupResizeListener();
    this.cacheElements();
  }

  setupScrollListener() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollProgress();
          this.updateParallax();
          this.triggerScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  setupMouseListener() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }, { passive: true });
  }

  setupIntersectionObserver() {
    const options = {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '50px'
    };

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Trigger scroll animations
          this.triggerElement(element);
          
          // Handle staggered children
          if (element.classList.contains('section-stagger')) {
            element.classList.add('active');
          }
        }
      });
    };

    this.intersectionObserver = new IntersectionObserver(callback, options);
    
    // Observe scroll animations
    document.querySelectorAll('[class*="scroll-"]').forEach(el => {
      this.intersectionObserver.observe(el);
    });

    // Observe staggered sections
    document.querySelectorAll('.section-stagger').forEach(el => {
      this.intersectionObserver.observe(el);
    });

    // Observe stagger items
    document.querySelectorAll('.stagger-item').forEach(el => {
      this.intersectionObserver.observe(el);
    });

    // Observe parallax elements
    document.querySelectorAll('.parallax-element').forEach(el => {
      this.intersectionObserver.observe(el);
    });
  }

  setupResizeListener() {
    window.addEventListener('resize', () => {
      this.updateParallax();
    }, { passive: true });
  }

  cacheElements() {
    // Cache scroll animation elements
    document.querySelectorAll('[class*="scroll-"]').forEach(el => {
      this.elements.set(el, { type: 'scroll' });
    });

    // Cache parallax elements
    document.querySelectorAll('.parallax-element').forEach(el => {
      const speed = parseFloat(el.dataset.parallaxSpeed) || 0.5;
      this.elements.set(el, { type: 'parallax', speed });
    });

    // Cache micro-interaction elements
    document.querySelectorAll('[class*="btn-"], [class*="input-"]').forEach(el => {
      this.elements.set(el, { type: 'micro' });
    });
  }

  updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

    // Update scroll progress bar if exists
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
      progressBar.style.width = (this.scrollProgress * 100) + '%';
    }
  }

  updateParallax() {
    const scrollY = window.scrollY;
    
    document.querySelectorAll('.parallax-element').forEach(el => {
      const speed = parseFloat(el.dataset.parallaxSpeed) || 0.5;
      const offset = scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });

    document.querySelectorAll('.parallax-bg').forEach(el => {
      const speed = parseFloat(el.dataset.parallaxSpeed) || 0.3;
      const offset = scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  triggerScrollAnimations() {
    document.querySelectorAll('[class*="scroll-"]:not(.scroll-animated)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        el.classList.add('scroll-animated');
      }
    });
  }

  triggerElement(element) {
    if (element.classList.contains('stagger-item') && !element.classList.contains('active')) {
      element.classList.add('active');
    }
  }

  /* ==========================================
     SCROLL-BASED ANIMATIONS
     ========================================== */

  animateOnScroll(selector, animationClass, triggerPoint = 0.8) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(el => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
          }
        });
      }, { threshold: triggerPoint });

      observer.observe(el);
    });
  }

  /* ==========================================
     TEXT ANIMATIONS
     ========================================== */

  splitTextLetters(element) {
    const text = element.textContent;
    element.innerHTML = '';

    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.className = 'text-reveal';
      span.textContent = char;
      span.style.animationDelay = `${index * 0.05}s`;
      element.appendChild(span);
    });
  }

  splitTextWords(element) {
    const text = element.textContent;
    element.innerHTML = '';

    text.split(' ').forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'text-reveal';
      span.textContent = word + ' ';
      span.style.animationDelay = `${index * 0.1}s`;
      element.appendChild(span);
    });
  }

  animateTypeWriter(element, text, speed = 50) {
    element.textContent = '';
    let charIndex = 0;

    const type = () => {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  animateCounter(element, target, duration = 1000) {
    const start = 0;
    const range = target - start;
    const increment = range / (duration / 16);
    let current = start;

    const count = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(count);
      } else {
        element.textContent = target;
      }
    };

    count();
  }

  /* ==========================================
     PARALLAX SYSTEM
     ========================================== */

  enableParallax(selector, speed = 0.5) {
    document.querySelectorAll(selector).forEach(el => {
      el.dataset.parallaxSpeed = speed;
      el.classList.add('parallax-element');
      el.style.will_change = 'transform';
    });
  }

  /* ==========================================
     SECTION REVEALS
     ========================================== */

  revealSection(selector, options = {}) {
    const {
      trigger = 'scroll',
      delay = 0,
      duration = 1,
      animation = 'fade'
    } = options;

    document.querySelectorAll(selector).forEach(el => {
      if (trigger === 'scroll') {
        this.animateOnScroll(selector, 'section-reveal');
      }
    });
  }

  staggerChildren(selector, delay = 0.1, threshold = 0.5) {
    const container = document.querySelector(selector);
    if (!container) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('> *');
          children.forEach((child, index) => {
            child.style.animationDelay = `${index * delay}s`;
            child.classList.add('stagger-child');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    observer.observe(container);
  }

  /* ==========================================
     MICRO-INTERACTIONS
     ========================================== */

  enableSmoothHover(selector) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
      });

      el.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  enableAccordion(selector) {
    document.querySelectorAll(selector).forEach(accordion => {
      accordion.addEventListener('click', () => {
        accordion.classList.toggle('active');

        document.querySelectorAll(selector).forEach(item => {
          if (item !== accordion) {
            item.classList.remove('active');
          }
        });
      });
    });
  }

  /* ==========================================
     SCROLL PROGRESS
     ========================================== */

  createScrollProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    bar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #978667, #c9a227);
      z-index: 9999;
      width: 0%;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(bar);
  }

  /* ==========================================
     ANIMATION UTILITIES
     ========================================== */

  animate(element, options = {}) {
    const {
      duration = 0.6,
      delay = 0,
      ease = 'ease-power3-out',
      from = {},
      to = {}
    } = options;

    Object.assign(element.style, from);
    
    setTimeout(() => {
      element.style.transition = `all ${duration}s var(--${ease})`;
      Object.assign(element.style, to);
    }, delay);
  }

  // Timeline for complex animations
  timeline(elements, options = {}) {
    const {
      stagger = 0.1,
      duration = 0.6
    } = options;

    elements.forEach((el, index) => {
      this.animate(el, {
        delay: index * stagger,
        duration
      });
    });
  }

  /* ==========================================
     EXPOSURE / DESTRUCTION
     ========================================== */

  dispose() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.elements.clear();
  }
}

// ============================================
// ADVANCED SCROLL SYNC SYSTEM
// ============================================

class ScrollSyncAnimation {
  constructor() {
    this.animations = new Map();
    this.scrollProgress = 0;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.updateScrollProgress();
      this.syncAnimations();
    }, { passive: true });
  }

  updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
  }

  syncAnimations() {
    this.animations.forEach((config, element) => {
      const progress = Math.max(0, Math.min(1, this.scrollProgress));
      
      if (config.rotate) {
        element.style.transform = `rotate(${config.rotate * progress}deg)`;
      }
      if (config.scale) {
        element.style.transform = `scale(${1 + (config.scale - 1) * progress})`;
      }
      if (config.opacity) {
        element.style.opacity = config.opacity * progress;
      }
    });
  }

  register(element, config) {
    this.animations.set(element, config);
  }

  unregister(element) {
    this.animations.delete(element);
  }
}

// ============================================
// MAGNETIC CURSOR EFFECTS
// ============================================

class MagneticCursor {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.updateMagnetic();
    }, { passive: true });
  }

  updateMagnetic() {
    this.elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = this.mouseX - centerX;
      const distY = this.mouseY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < 100) {
        const angle = Math.atan2(distY, distX);
        const force = (100 - distance) / 100;
        
        el.style.transform = `translate(${Math.cos(angle) * force * 20}px, ${Math.sin(angle) * force * 20}px)`;
      } else {
        el.style.transform = 'translate(0, 0)';
      }
    });
  }
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          this.smoothScrollTo(target);
        }
      });
    });
  }

  smoothScrollTo(element, duration = 1000) {
    const startY = window.scrollY;
    const elementY = element.getBoundingClientRect().top + window.scrollY;
    const distance = elementY - startY;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      window.scrollY !== startY + distance * easeProgress && 
        window.scrollTo(0, startY + distance * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize main engine
  window.animationEngine = new ModernAnimationEngine();
  
  // Create scroll progress bar
  window.animationEngine.createScrollProgressBar();

  // Initialize advanced systems
  window.scrollSyncAnimation = new ScrollSyncAnimation();
  window.smoothScroll = new SmoothScroll();

  // Magnetic cursor on buttons (optional)
  // new MagneticCursor('.btn-smooth-hover, .btn-ripple');

  // Auto-enable smooth hover on buttons
  document.querySelectorAll('.btn-smooth-hover').forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.animationEngine.createRipple(btn, e);
    });
  });

  // Auto-enable accordion behavior
  window.animationEngine.enableAccordion('.accordion-item');

  // Log initialization
  console.log('✨ Modern GSAP-Style Animation Engine initialized!');
  console.log('Available: window.animationEngine, window.scrollSyncAnimation, window.smoothScroll');
});

// ============================================
// EXPORT FOR MODULE SYSTEMS
// ============================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ModernAnimationEngine,
    ScrollSyncAnimation,
    MagneticCursor,
    SmoothScroll
  };
}
