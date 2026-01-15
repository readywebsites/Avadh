/*===========================================
  PREMIUM ANIMATION ENGINE
  Advanced JavaScript for smooth interactions,
  scroll animations, and interactive effects
============================================*/

class PremiumAnimationEngine {
  constructor() {
    this.animationElements = [];
    this.scrollThreshold = 0.15;
    this.isEnabled = !this.prefersReducedMotion();
    this.init();
  }

  init() {
    if (!this.isEnabled) return;

    this.cacheElements();
    this.setupIntersectionObserver();
    this.setupEventListeners();
    this.addScrollParallax();
    this.initializeCounters();
  }

  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  cacheElements() {
    // Cache all animatable elements
    this.fadeInElements = document.querySelectorAll('.fade-in-scroll');
    this.slideLeftElements = document.querySelectorAll('.slide-left-scroll');
    this.slideRightElements = document.querySelectorAll('.slide-right-scroll');
    this.scaleUpElements = document.querySelectorAll('.scale-up-scroll');
    this.rotateInElements = document.querySelectorAll('.rotate-in-scroll');
    this.blurFocusElements = document.querySelectorAll('.blur-focus-scroll');
    this.staggerItems = document.querySelectorAll('.stagger-item');
    this.cardElements = document.querySelectorAll('.card-lift');
    this.buttons = document.querySelectorAll('.btn-premium');
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: `0px 0px -${100 - this.scrollThreshold * 100}% 0px`,
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all animation elements
    [
      ...this.fadeInElements,
      ...this.slideLeftElements,
      ...this.slideRightElements,
      ...this.scaleUpElements,
      ...this.rotateInElements,
      ...this.blurFocusElements,
      ...this.staggerItems,
      ...this.cardElements
    ].forEach(el => observer.observe(el));
  }

  animateElement(element) {
    // Add in-view class with stagger for items
    if (element.classList.contains('stagger-item')) {
      const index = Array.from(this.staggerItems).indexOf(element);
      const delay = index * 100;
      setTimeout(() => {
        element.classList.add('reveal');
      }, delay);
    } else {
      element.classList.add('in-view');
    }
  }

  setupEventListeners() {
    // Button click effects
    this.buttons.forEach(btn => {
      btn.addEventListener('click', (e) => this.createRipple(e));
      btn.addEventListener('mouseenter', () => this.addButtonGlow(btn));
      btn.addEventListener('mouseleave', () => this.removeButtonGlow(btn));
    });

    // Link animations
    document.querySelectorAll('a:not([href^="http"])').forEach(link => {
      link.addEventListener('click', (e) => this.smoothLinkTransition(e));
    });

    // Form interactions
    this.setupFormAnimations();

    // Window events
    window.addEventListener('resize', () => this.handleResize());
  }

  createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  addButtonGlow(button) {
    if (!button.style.boxShadow) {
      const color = window.getComputedStyle(button).backgroundColor;
      button.style.boxShadow = `0 0 20px rgba(201, 162, 39, 0.5)`;
    }
  }

  removeButtonGlow(button) {
    button.style.boxShadow = '';
  }

  setupFormAnimations() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      // Focus glow effect
      input.addEventListener('focus', () => {
        input.parentElement?.classList.add('input-focused');
      });
      input.addEventListener('blur', () => {
        input.parentElement?.classList.remove('input-focused');
      });

      // Floating label effect
      if (input.placeholder) {
        input.addEventListener('input', (e) => {
          e.target.classList.toggle('has-value', e.target.value !== '');
        });
      }
    });
  }

  smoothLinkTransition(event) {
    const href = event.currentTarget.getAttribute('href');
    if (href.startsWith('#')) {
      event.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  addScrollParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementOffset = element.offsetTop;
        const yPos = (scrollPosition - elementOffset) * 0.5;
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, { passive: true });
  }

  initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    const observerOptions = {
      threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16);
    let current = 0;

    element.classList.add('animate');

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  }

  handleResize() {
    // Re-cache elements on resize for proper calculations
    this.cacheElements();
  }

  // Public methods for manual animation control
  animate(element, animationClass) {
    element.classList.add(animationClass);
    element.classList.add('in-view');
  }

  removeAnimation(element, animationClass) {
    element.classList.remove(animationClass, 'in-view');
  }

  staggerElements(elements, delayMs = 100) {
    elements.forEach((el, index) => {
      setTimeout(() => {
        this.animate(el, 'fade-in-scroll');
      }, index * delayMs);
    });
  }
}

// Text reveal effect
class TextRevealEffect {
  constructor() {
    this.initializeRevealElements();
  }

  initializeRevealElements() {
    const revealElements = document.querySelectorAll('.reveal-text');
    revealElements.forEach(element => {
      this.wrapLetters(element);
    });
  }

  wrapLetters(element) {
    const text = element.textContent;
    element.textContent = '';
    
    [...text].forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.animationDelay = `${index * 0.05}s`;
      element.appendChild(span);
    });
  }
}

// Mouse follower for creative effects
class MouseFollower {
  constructor() {
    this.mouse = { x: 0, y: 0 };
    this.followers = [];
    this.init();
  }

  init() {
    const followElements = document.querySelectorAll('.mouse-follow');
    if (followElements.length === 0) return;

    followElements.forEach(el => {
      this.followers.push({
        element: el,
        x: 0,
        y: 0,
        speed: 0.2
      });
    });

    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }

  onMouseMove(event) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;

    this.followers.forEach(follower => {
      follower.x += (this.mouse.x - follower.x) * follower.speed;
      follower.y += (this.mouse.y - follower.y) * follower.speed;
      
      follower.element.style.transform = `translate(${follower.x}px, ${follower.y}px)`;
    });
  }
}

// Section background animation on scroll
class SectionBackgroundAnimation {
  constructor() {
    this.sections = document.querySelectorAll('.section-animate-bg');
    this.init();
  }

  init() {
    if (this.sections.length === 0) return;

    window.addEventListener('scroll', () => {
      this.updateBackgrounds();
    }, { passive: true });
  }

  updateBackgrounds() {
    this.sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const scrollPercent = 1 - Math.max(0, Math.min(1, rect.top / window.innerHeight));
      section.style.backgroundColor = `rgba(151, 134, 103, ${scrollPercent * 0.1})`;
    });
  }
}

// Timeline animation
class TimelineAnimation {
  constructor() {
    this.items = document.querySelectorAll('.timeline-item');
    this.init();
  }

  init() {
    if (this.items.length === 0) return;

    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 200);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.items.forEach(item => observer.observe(item));
  }
}

// Scroll progress indicator
class ScrollProgressIndicator {
  constructor() {
    this.progressBar = document.querySelector('.scroll-progress');
    if (!this.progressBar) return;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.updateProgress();
    }, { passive: true });
  }

  updateProgress() {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    this.progressBar.style.width = `${scrollPercent}%`;
  }
}

// Typing animation
class TypingAnimation {
  constructor() {
    this.typingElements = document.querySelectorAll('.typing-text');
    this.init();
  }

  init() {
    this.typingElements.forEach(element => {
      this.typeText(element);
    });
  }

  typeText(element) {
    const text = element.textContent;
    const speed = parseInt(element.getAttribute('data-speed')) || 100;
    element.textContent = '';

    let index = 0;

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };

    type();
  }
}

// Floating particles background
class FloatingParticles {
  constructor() {
    this.canvas = document.querySelector('.particles-canvas');
    if (!this.canvas) return;
    this.init();
  }

  init() {
    this.ctx = this.canvas.getContext('2d');
    this.setCanvasSize();
    this.particles = this.createParticles();
    this.animate();
    window.addEventListener('resize', () => this.setCanvasSize());
  }

  setCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles(count = 50) {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    return particles;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgba(201, 162, 39, 0.3)';

    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.y > this.canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = this.canvas.height;

      this.ctx.globalAlpha = particle.opacity;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Main animation engine
  window.animationEngine = new PremiumAnimationEngine();

  // Text reveal
  window.textReveal = new TextRevealEffect();

  // Mouse follower (optional)
  window.mouseFollower = new MouseFollower();

  // Background animations
  window.bgAnimation = new SectionBackgroundAnimation();

  // Timeline
  window.timeline = new TimelineAnimation();

  // Scroll progress
  window.scrollProgress = new ScrollProgressIndicator();

  // Typing
  window.typing = new TypingAnimation();

  // Floating particles
  window.particles = new FloatingParticles();

  console.log('✨ Premium Animation Engine Initialized');
});

// Smooth scroll polyfill for older browsers
if (!window.CSS || !window.CSS.supports('scroll-behavior', 'smooth')) {
  document.addEventListener('click', (e) => {
    if (e.target.href?.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

// Export classes for external use
window.PremiumAnimationEngine = PremiumAnimationEngine;
window.TextRevealEffect = TextRevealEffect;
window.MouseFollower = MouseFollower;
window.SectionBackgroundAnimation = SectionBackgroundAnimation;
window.TimelineAnimation = TimelineAnimation;
window.ScrollProgressIndicator = ScrollProgressIndicator;
window.TypingAnimation = TypingAnimation;
window.FloatingParticles = FloatingParticles;
