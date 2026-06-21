/* ==========================================================================
   WARM MINIMALIST CORE PORTFOLIO ENGINE - DHARMIK VYAS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. NAVIGATION & LAYOUT CONTROLS
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });

        // Close menu on nav link clicks (mobile view)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Navbar scroll styles
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 120; // Offset for header height

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ==========================================================================
       2. TYPEWRITER EFFECT (HERO)
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter-text');
    const words = ["impactful applications.", "robust databases.", "scalable systems.", "efficient servers."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typewriterElement) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2200; // Pause at the end of the word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing the next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typewriterElement) {
        setTimeout(type, 1000);
    }

    /* ==========================================================================
       3. PROJECTS CARD CATEGORY FILTERS
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Visual transition out
                card.style.opacity = '0';
                card.style.transform = 'scale(0.96) translateY(8px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    /* ==========================================================================
       4. PROJECT CARD CLICK NAVIGATION (DIRECT TO GIT REPO)
       ========================================================================== */
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Avoid double navigation if they clicked the precise link icon
            if (e.target.closest('.project-link')) return;

            const repoUrl = card.getAttribute('data-repo');
            if (repoUrl) {
                window.open(repoUrl, '_blank');
            }
        });
    });

    /* ==========================================================================
       5. DYNAMIC SCROLL REVEALS
       ========================================================================== */
    // Inject reveal animation CSS directly to guarantee seamless loading
    const revealStyles = document.createElement('style');
    revealStyles.textContent = `
        .scroll-reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyles);

    const revealElements = document.querySelectorAll('.project-card, .stat-card, .tech-card, .timeline-item, .cert-card, .about-avatar-container, .section-header, .contact-title-container, .contact-info-panel, .contact-form');
    revealElements.forEach(el => el.classList.add('scroll-reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       6. CONTACT FORM SUBMISSION HANDLING
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate messaging api response
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                formFeedback.textContent = 'Thank you for reaching out! I will get back to you shortly.';
                formFeedback.classList.add('success');
                contactForm.reset();
                
                // Reset form feedback state after 4 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    formFeedback.textContent = '';
                    formFeedback.classList.remove('success');
                }, 4000);
            }, 1200);
        });
    }

});
