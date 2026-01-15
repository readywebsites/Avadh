/* ============================================
   GSAP-POWERED 3D TILT REVIEW ENGINE
   Interactive Hover, Parallax, Depth Effects
   ============================================ */

class TiltReviewEngine {
  constructor(options = {}) {
    this.cards = [];
    this.activeCard = null;
    this.mousePos = { x: 0, y: 0 };
    this.options = {
      maxTilt: options.maxTilt || 15,
      scale: options.scale || 1.05,
      shadowAmount: options.shadowAmount || 30,
      glowIntensity: options.glowIntensity || 0.8,
      ...options
    };
    
    this.init();
  }

  init() {
    this.cacheElements();
    this.setupEventListeners();
    this.setupIntersectionObserver();
    console.log('✨ 3D Tilt Review Engine initialized!');
  }

  cacheElements() {
    this.cards = Array.from(document.querySelectorAll('.review-card'));
    this.cards.forEach((card, index) => {
      card.dataset.index = index;
      card.style.perspective = '1200px';
    });
  }

  setupEventListeners() {
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e), { passive: true });
    
    this.cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => this.handleCardEnter(e));
      card.addEventListener('mouseleave', (e) => this.handleCardLeave(e));
      card.addEventListener('mousemove', (e) => this.handleCardMouseMove(e), { passive: true });
      card.addEventListener('click', (e) => this.handleCardClick(e));
    });

    window.addEventListener('resize', () => this.handleResize());
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal');
          
          // Animate star rating
          this.animateStarRating(entry.target);
        }
      });
    }, { threshold: 0.3 });

    this.cards.forEach(card => observer.observe(card));
  }

  handleMouseMove(e) {
    this.mousePos = { 
      x: e.clientX, 
      y: e.clientY 
    };
  }

  handleCardEnter(e) {
    const card = e.currentTarget;
    const inner = card.querySelector('.review-card-inner');
    
    this.activeCard = card;
    
    // Trigger entrance animation
    this.animateCardEntrance(card);
    
    // Add glow effect
    this.enableGlowEffect(card);
  }

  handleCardLeave(e) {
    const card = e.currentTarget;
    const inner = card.querySelector('.review-card-inner');
    
    // Reset transforms
    this.resetCardTransform(card);
    
    this.activeCard = null;
  }

  handleCardMouseMove(e) {
    if (!this.activeCard) return;
    
    const card = e.currentTarget;
    const inner = card.querySelector('.review-card-inner');
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles
    const tiltY = ((x - centerX) / centerX) * this.options.maxTilt;
    const tiltX = ((centerY - y) / centerY) * this.options.maxTilt;
    
    // Apply 3D transform
    this.applyTiltTransform(card, tiltX, tiltY);
    
    // Update parallax layers
    this.updateParallaxLayers(card, x, y, rect.width, rect.height);
    
    // Update light ray position
    this.updateLightRay(card, x, y, rect.width, rect.height);
  }

  applyTiltTransform(card, tiltX, tiltY) {
    const inner = card.querySelector('.review-card-inner');
    if (!inner) return;
    
    const scale = this.options.scale;
    inner.style.transform = `
      perspective(1200px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      translateZ(20px)
      scale(${scale})
    `;
  }

  updateParallaxLayers(card, x, y, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    
    const offsetX = (x - centerX) * 0.1;
    const offsetY = (y - centerY) * 0.1;
    
    const stars = card.querySelector('.review-stars');
    const text = card.querySelector('.review-text');
    const profile = card.querySelector('.reviewer-profile');
    
    if (stars) {
      stars.style.transform = `translateZ(20px) translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)`;
    }
    
    if (text) {
      text.style.transform = `translateZ(15px) translate(${offsetX * 0.7}px, ${offsetY * 0.7}px)`;
    }
    
    if (profile) {
      profile.style.transform = `translateZ(10px) translate(${offsetX * 0.3}px, ${offsetY * 0.3}px)`;
    }
  }

  updateLightRay(card, x, y, width, height) {
    const ray = card.querySelector('.review-light-ray');
    if (!ray) return;
    
    const angle = Math.atan2(y - height / 2, x - width / 2) * (180 / Math.PI);
    ray.style.transform = `rotate(${angle}deg)`;
  }

  resetCardTransform(card) {
    const inner = card.querySelector('.review-card-inner');
    if (inner) {
      inner.style.transform = '';
    }
    
    const stars = card.querySelector('.review-stars');
    const text = card.querySelector('.review-text');
    const profile = card.querySelector('.reviewer-profile');
    
    if (stars) stars.style.transform = '';
    if (text) text.style.transform = '';
    if (profile) profile.style.transform = '';
  }

  animateCardEntrance(card) {
    const inner = card.querySelector('.review-card-inner');
    if (!inner) return;
    
    // Ripple effect from center
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: radial-gradient(circle, rgba(201, 162, 39, 0.3) 0%, transparent 70%);
      animation: rippleOut 0.6s ease-out;
      pointer-events: none;
    `;
    
    inner.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  animateStarRating(card) {
    const stars = card.querySelectorAll('.star.filled');
    
    stars.forEach((star, index) => {
      star.style.animation = `none`;
      setTimeout(() => {
        star.style.animation = `starPulse 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`;
      }, index * 50);
    });
  }

  enableGlowEffect(card) {
    const glow = card.querySelector('.review-glow');
    if (glow) {
      glow.style.opacity = '1';
    }
  }

  handleCardClick(e) {
    const card = e.currentTarget;
    
    // Create click ripple
    this.createClickRipple(card, e);
    
    // Emit custom event
    const event = new CustomEvent('reviewCardClicked', {
      detail: {
        index: card.dataset.index,
        card: card
      }
    });
    document.dispatchEvent(event);
  }

  createClickRipple(card, e) {
    const inner = card.querySelector('.review-card-inner');
    const rect = inner.getBoundingClientRect();
    
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: rgba(201, 162, 39, 0.5);
      border-radius: 50%;
      pointer-events: none;
      animation: clickRipple 0.8s ease-out;
      z-index: 5;
    `;
    
    inner.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  }

  handleResize() {
    this.cards.forEach(card => {
      this.resetCardTransform(card);
    });
  }

  /* ==========================================
     ADVANCED FEATURES
     ========================================== */

  // Magnetic effect - cards follow cursor
  enableMagneticEffect(card) {
    const distanceThreshold = 150;
    
    const handleMagneticMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - cardCenterX, 2) + 
        Math.pow(e.clientY - cardCenterY, 2)
      );
      
      if (distance < distanceThreshold) {
        const angle = Math.atan2(e.clientY - cardCenterY, e.clientX - cardCenterX);
        const force = (distanceThreshold - distance) / distanceThreshold;
        
        const moveX = Math.cos(angle) * force * 10;
        const moveY = Math.sin(angle) * force * 10;
        
        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        card.style.transform = '';
      }
    };
    
    document.addEventListener('mousemove', handleMagneticMove);
  }

  // Animate counter
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

  // Get card data
  getCardData(index) {
    const card = this.cards[index];
    if (!card) return null;
    
    return {
      text: card.querySelector('.review-text')?.textContent,
      rating: card.querySelectorAll('.star.filled').length,
      name: card.querySelector('.reviewer-name')?.textContent,
      title: card.querySelector('.reviewer-title')?.textContent
    };
  }

  // Destroy
  destroy() {
    this.cards.forEach(card => {
      card.removeEventListener('mouseenter', this.handleCardEnter);
      card.removeEventListener('mouseleave', this.handleCardLeave);
      card.removeEventListener('mousemove', this.handleCardMouseMove);
      card.removeEventListener('click', this.handleCardClick);
    });
    
    document.removeEventListener('mousemove', this.handleMouseMove);
  }
}

/* ============================================
   ACCESSIBILITY SUPPORT
   ============================================ */

class AccessibleTiltReview {
  static setupKeyboardNavigation(cards) {
    cards.forEach((card, index) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'article');
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  static setupAriaLabels(card) {
    const rating = card.querySelectorAll('.star.filled').length;
    const name = card.querySelector('.reviewer-name')?.textContent || 'Reviewer';
    
    card.setAttribute('aria-label', `${name}'s review - ${rating} stars`);
  }
}

/* ============================================
   INITIALIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize tilt engine
  window.tiltReviewEngine = new TiltReviewEngine({
    maxTilt: 15,
    scale: 1.05,
    glowIntensity: 0.8
  });

  // Setup accessibility
  const cards = document.querySelectorAll('.review-card');
  AccessibleTiltReview.setupKeyboardNavigation(cards);
  
  cards.forEach(card => {
    AccessibleTiltReview.setupAriaLabels(card);
  });

  // Listen for card clicks
  document.addEventListener('reviewCardClicked', (e) => {
    console.log('Review card clicked:', e.detail.index);
    console.log('Card data:', window.tiltReviewEngine.getCardData(e.detail.index));
  });

  // Add ripple animation keyframes if not already present
  if (!document.querySelector('style:contains("rippleOut")')) {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleOut {
        from {
          width: 0;
          height: 0;
          opacity: 0.8;
        }
        to {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
      
      @keyframes clickRipple {
        from {
          width: 20px;
          height: 20px;
          opacity: 0.8;
        }
        to {
          width: 300px;
          height: 300px;
          opacity: 0;
        }
      }
      
      @keyframes slideInDown {
        from {
          opacity: 0;
          transform: translateY(-30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  console.log('🎬 3D Tilt Review System ready!');
});

/* ============================================
   EXPORT FOR MODULE USE
   ============================================ */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TiltReviewEngine, AccessibleTiltReview };
}
