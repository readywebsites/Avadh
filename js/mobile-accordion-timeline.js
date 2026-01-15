/*===============================================================================*/
/* MOBILE ACCORDION TIMELINE - JavaScript Enhancement */
/* Handles accordion expand/collapse with smooth animations */
/*===============================================================================*/

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on mobile (768px or less)
    const isMobile = () => window.innerWidth <= 768;

    // Timeline Data (matches the existing data structure)
    const timelineData = {
        2010: {
            headline: "2010 – Foundation Year",
            projectName: "Avadh Group Established",
            achievements: [
                "Founded with vision to build premium residential spaces",
                "Registered as Real Estate Developer in Surat",
                "Team of 15 professionals"
            ],
            growth: [
                "Launch of first office in Magob, Surat"
            ]
        },
        2012: {
            headline: "2012 – First Residential Project",
            projectName: "Avadh Residency Phase 1",
            achievements: [
                "Launched first residential project with 50+ units",
                "Pioneered quality construction standards",
                "Successfully delivered 100% on schedule"
            ],
            growth: [
                "Expanded team to 50+ professionals"
            ]
        },
        2015: {
            headline: "2015 – Rapid Expansion",
            projectName: "Multiple Projects Ongoing",
            achievements: [
                "Launched 3 new residential projects simultaneously",
                "Total portfolio reached 300+ units",
                "Won Best Developer Award"
            ],
            growth: [
                "Opened satellite office in Athwa, Surat"
            ]
        },
        2016: {
            headline: "2016 – Major Milestone",
            projectName: "500+ Homes Delivered",
            achievements: [
                "Successfully delivered 500+ residential units",
                "98% customer satisfaction rating",
                "Recognition from Gujarat Real Estate Authority"
            ],
            growth: [
                "Became one of Surat's top 10 developers"
            ]
        },
        2018: {
            headline: "2018 – Diversification",
            projectName: "Commercial Real Estate Entry",
            achievements: [
                "Launched first commercial project",
                "Portfolio includes retail and office spaces",
                "Strategic partnerships with major retailers"
            ],
            growth: [
                "Team strength increased to 200+ professionals"
            ]
        },
        2019: {
            headline: "2019 – Commercial Leadership",
            projectName: "Avadh Business Park",
            achievements: [
                "Entered commercial real estate with premium business park",
                "2 lakh sq ft of Grade-A office space",
                "Attracted MNCs and corporate clients"
            ],
            growth: [
                "Expanded operations to 3 new regions"
            ]
        },
        2021: {
            headline: "2021 – Pandemic Success",
            projectName: "Resilience & Growth",
            achievements: [
                "Continued growth despite pandemic challenges",
                "Completed 1000+ residential units",
                "Launched digital virtual tours and booking"
            ],
            growth: [
                "Achieved ₹500 Cr annual turnover"
            ]
        },
        2022: {
            headline: "2022 – Landmark Township",
            projectName: "Avadh Smart City Township",
            achievements: [
                "Announced flagship township project in Surat",
                "500+ acre integrated development",
                "Focus on sustainable and smart city features"
            ],
            growth: [
                "Won Multiple Excellence Awards in Real Estate"
            ]
        },
        2024: {
            headline: "2024 – Luxury Segment",
            projectName: "Premium Housing Launch",
            achievements: [
                "Entered luxury housing segment with high-end villas",
                "Focus on ultra-luxury amenities and design",
                "2000+ sq ft residential units with smart home features"
            ],
            growth: [
                "Expanded to ₹1000 Cr+ investment portfolio"
            ]
        },
        2025: {
            headline: "2025 – Expansion & Innovation",
            projectName: "Next-Gen Premium Housing",
            achievements: [
                "Launched innovative eco-friendly luxury projects",
                "Integration of AI and IoT in smart homes",
                "Expansion into retail and hospitality segments"
            ],
            growth: [
                "Achieved 15 years of excellence in real estate",
                "5000+ happy homeowners"
            ]
        },
        2026: {
            headline: "2026 – Global Vision",
            projectName: "International Expansion",
            achievements: [
                "Exploring international real estate opportunities",
                "Partnerships with global developers",
                "Investment in sustainable construction technologies"
            ],
            growth: [
                "Vision to become a leading global real estate player"
            ]
        }
    };

    class MobileAccordionTimeline {
        constructor() {
            this.contentContainer = document.getElementById('timelineContent');
            this.yearsContainer = document.getElementById('timelineYears');
            this.defaultYear = 2022;
            this.currentYear = this.defaultYear;
            
            if (!this.contentContainer) return;
            
            this.init();
            this.setupResizeListener();
        }

        init() {
            if (!isMobile()) return;
            
            this.renderAccordion();
            this.attachEventListeners();
        }

        renderAccordion() {
            let accordionHTML = '';
            const years = Object.keys(timelineData).sort((a, b) => b - a); // Reverse chronological
            
            years.forEach((year, index) => {
                const data = timelineData[year];
                const isActive = year == this.defaultYear ? 'active' : '';
                
                accordionHTML += `
                    <div class="accordion-item ${isActive}" data-year="${year}">
                        <button class="accordion-header" type="button" aria-expanded="${year == this.defaultYear ? 'true' : 'false'}" aria-controls="content-${year}">
                            <div class="accordion-header-content">
                                <div class="accordion-year">${year}</div>
                                <div class="accordion-headline">${data.headline.split(' – ')[1] || data.headline}</div>
                            </div>
                            <div class="accordion-toggle" aria-hidden="true">▼</div>
                        </button>
                        <div class="accordion-body" id="content-${year}">
                            <div class="accordion-project-name">${data.projectName}</div>
                            
                            <div class="accordion-section">
                                <span class="accordion-section-title">Key Achievements</span>
                                <ul class="accordion-bullets">
                                    ${data.achievements.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                            
                            ${data.growth && data.growth.length ? `
                                <div class="accordion-section">
                                    <span class="accordion-section-title">Growth Milestone</span>
                                    <ul class="accordion-bullets">
                                        ${data.growth.map(item => `<li>${item}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            });
            
            this.contentContainer.innerHTML = accordionHTML;
        }

        attachEventListeners() {
            const accordionHeaders = this.contentContainer.querySelectorAll('.accordion-header');
            
            accordionHeaders.forEach(header => {
                header.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleAccordion(header);
                });
                
                // Keyboard support
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleAccordion(header);
                    }
                });
            });
        }

        toggleAccordion(header) {
            const item = header.closest('.accordion-item');
            const isActive = item.classList.contains('active');
            
            // Close all others (optional - allow single open)
            // Comment out below to allow multiple open accordions
            /*
            this.contentContainer.querySelectorAll('.accordion-item').forEach(el => {
                if (el !== item) {
                    el.classList.remove('active');
                    el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                }
            });
            */
            
            // Toggle current
            item.classList.toggle('active');
            header.setAttribute('aria-expanded', !isActive);
            
            // Update current year
            this.currentYear = item.dataset.year;
        }

        setupResizeListener() {
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    if (isMobile() && !this.contentContainer.querySelector('.accordion-item')) {
                        this.renderAccordion();
                        this.attachEventListeners();
                    }
                }, 250);
            });
        }
    }

    // Initialize accordion timeline on mobile
    const mobileAccordion = new MobileAccordionTimeline();

    // Prevent default scrolling behavior on mobile
    document.addEventListener('touchmove', (e) => {
        const target = e.target.closest('.timeline-years-mobile');
        if (!target) return; // Only allow scroll on year list
    }, { passive: true });
});

/*===============================================================================*/
/* END MOBILE ACCORDION TIMELINE - JavaScript */
/*===============================================================================*/
