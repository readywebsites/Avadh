/* ============================================
   CREATIVE CONNECT SECTION
   GSAP Animation Engine
   ============================================ */

class CreativeConnectAnimations {
    constructor() {
        this.section = document.querySelector('.creative-connect-section');
        this.isInitialized = false;

        // Only initialize if GSAP is available
        if (typeof gsap !== 'undefined') {
            this.init();
        } else {
            console.warn('GSAP not loaded. CreativeConnect animations disabled.');
        }
    }

    init() {
        this.createAnimationTimeline();
        this.setupScrollTriggers();
        this.attachCardHoverAnimations();
        this.attachStatCounters();
        this.attachSocialHoverAnimations();
        this.isInitialized = true;
    }

    /**
     * Main animation timeline - fires on page load
     */
    createAnimationTimeline() {
        const tl = gsap.timeline();

        // Staggered headline words
        tl.from('.headline-word', {
            duration: 0.7,
            opacity: 0,
            y: 30,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, 0.2)
            .from('.headline-accent', {
                duration: 0.7,
                opacity: 0,
                y: 30,
                ease: 'back.out(1.7)'
            }, 0.5);

        // Subheadline
        tl.from('.subheadline', {
            duration: 0.6,
            opacity: 0,
            y: 20,
            ease: 'power2.out'
        }, 0.6);

        // Floating background shapes - continuous animation
        this.animateFloatingShapes();

        // Stats appear on scroll
        this.setupStatsAnimation();
    }

    /**
     * Animate floating background shapes continuously
     */
    animateFloatingShapes() {
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            gsap.to(shape, {
                duration: 6 + index * 2,
                y: -40,
                x: 30,
                rotation: 360,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });

        // Pulse glow orbs
        const orbs = document.querySelectorAll('.glow-orb');
        orbs.forEach((orb, index) => {
            gsap.to(orb, {
                duration: 4 + index,
                boxShadow: `0 0 80px rgba(201, 162, 39, ${0.5 + index * 0.2})`,
                scale: 1.2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
    }

    /**
     * Setup stats animation on scroll
     */
    setupStatsAnimation() {
        const stats = document.querySelectorAll('.stat-item');

        stats.forEach((stat, index) => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    once: true
                },
                duration: 0.8,
                opacity: 0,
                y: 30,
                stagger: 0.15,
                ease: 'back.out(1.5)'
            });
        });
    }

    /**
     * Scroll-triggered animations
     */
    setupScrollTriggers() {
        const cards = document.querySelectorAll('.cta-card');

        cards.forEach((card, index) => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    once: true
                },
                duration: 0.8,
                opacity: 0,
                y: 40,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });

        // Trust badge animation
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.trust-badge', {
            scrollTrigger: {
                trigger: '.trust-badge',
                start: 'top 80%',
                once: true
            },
            duration: 0.8,
            opacity: 0,
            scale: 0.8,
            ease: 'back.out(1.5)'
        });
    }

    /**
     * Attach hover animations to cards
     */
    attachCardHoverAnimations() {
        const cards = document.querySelectorAll('.cta-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.cardEnterAnimation(card);
            });

            card.addEventListener('mouseleave', (e) => {
                this.cardLeaveAnimation(card);
            });
        });
    }

    cardEnterAnimation(card) {
        gsap.to(card, {
            duration: 0.4,
            y: -15,
            boxShadow: '0 30px 80px rgba(201, 162, 39, 0.3)',
            overwrite: 'auto',
            ease: 'power2.out'
        });

        gsap.to(card.querySelector('.card-icon'), {
            duration: 0.4,
            scale: 1.2,
            rotation: 10,
            overwrite: 'auto'
        });

        gsap.to(card.querySelector('.card-glow'), {
            duration: 0.4,
            opacity: 1,
            overwrite: 'auto'
        });
    }

    cardLeaveAnimation(card) {
        gsap.to(card, {
            duration: 0.4,
            y: 0,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            overwrite: 'auto',
            ease: 'power2.out'
        });

        gsap.to(card.querySelector('.card-icon'), {
            duration: 0.4,
            scale: 1,
            rotation: 0,
            overwrite: 'auto'
        });

        gsap.to(card.querySelector('.card-glow'), {
            duration: 0.4,
            opacity: 0,
            overwrite: 'auto'
        });
    }

    /**
     * Stat counter animation
     */
    attachStatCounters() {
        const stats = document.querySelectorAll('.stat-number');

        stats.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.match(/\d+/)[0]);

            // Only animate on scroll into view
            gsap.registerPlugin(ScrollTrigger);

            gsap.from({ value: 0 }, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    once: true
                },
                value: numericValue,
                duration: 2.5,
                onUpdate: function() {
                    const displayValue = Math.ceil(this.targets()[0].value);
                    const suffix = finalValue.replace(/[0-9]/g, '');
                    stat.textContent = displayValue + suffix;
                },
                ease: 'power2.out'
            });
        });
    }

    /**
     * Social icon hover animations
     */
    attachSocialHoverAnimations() {
        const socialIcons = document.querySelectorAll('.social-icon');

        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    duration: 0.5,
                    y: -8,
                    scale: 1.2,
                    rotation: 360,
                    ease: 'back.out(1.7)'
                });
            });

            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    duration: 0.4,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    ease: 'power2.out'
                });
            });
        });
    }

    /**
     * Trigger stat counters animation manually
     */
    triggerCounters() {
        this.attachStatCounters();
    }

    /**
     * Reset and replay animations
     */
    resetAnimations() {
        gsap.set([
            '.headline-word',
            '.headline-accent',
            '.subheadline',
            '.stat-item',
            '.cta-card',
            '.trust-badge'
        ], { opacity: 1, y: 0 });

        this.createAnimationTimeline();
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.creativeConnect = new CreativeConnectAnimations();
    });
} else {
    window.creativeConnect = new CreativeConnectAnimations();
}

/**
 * Optional: Export for use in other modules
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CreativeConnectAnimations;
}
