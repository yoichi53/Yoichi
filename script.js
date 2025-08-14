// Enhanced JavaScript with Apple-like animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    
    

    
    // Navigation functionality
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
            
            // Animate hamburger menu
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Smooth scrolling with Apple-like easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                // Custom smooth scroll with easing
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function easeInOutCubic(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t * t + b;
                    t -= 2;
                    return c / 2 * (t * t * t + 2) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
    

    
    // Enhanced Intersection Observer for professional scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill bars with smooth progression
                if (entry.target.classList.contains('skill-item')) {
                    const skillProgress = entry.target.querySelector('.skill-progress');
                    const width = skillProgress.getAttribute('data-width');
                    setTimeout(() => {
                        skillProgress.style.width = width + '%';
                        skillProgress.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 200);
                }
                
                // Stagger animations for cards with professional timing
                if (entry.target.classList.contains('experience-card') || 
                    entry.target.classList.contains('skill-card')) {
                    const cards = Array.from(entry.target.parentNode.children);
                    const index = cards.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.15}s`;
                    entry.target.style.animation = 'scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                }
                
                // Enhanced text animations
                if (entry.target.classList.contains('about-text')) {
                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        p.style.animationDelay = `${index * 0.2}s`;
                        p.style.animation = 'slideInFromLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for enhanced professional animations
    const animateElements = document.querySelectorAll('.experience-card, .skill-card, .skill-item, .about-text, .contact-info, .contact-form, .quality, .section-header, .hero-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Enhanced parallax effects for professional floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.08);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * 0.05;
            element.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
            
            // Subtle opacity change for depth
            const opacity = 0.03 - (scrolled * 0.00001);
            element.style.opacity = Math.max(opacity, 0.01);
        });
    });
    
    // Enhanced form interactions
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        const label = input.previousElementSibling;
        
        input.addEventListener('focus', () => {
            label.style.transform = 'translateY(-25px) scale(0.8)';
            label.style.color = '#ffffff';
            input.style.borderColor = '#ffffff';
            input.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.transform = 'translateY(0) scale(1)';
                label.style.color = '#999999';
            }
            input.style.borderColor = '#333333';
            input.style.boxShadow = 'none';
        });
        
        // Check if input has value on load
        if (input.value) {
            label.style.transform = 'translateY(-25px) scale(0.8)';
            label.style.color = '#ffffff';
        }
    });
    
    // Button press effects
    const buttons = document.querySelectorAll('button, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
    
    // Contact form submission with Formspree
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let Formspree handle the submission
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Form will be submitted to Formspree automatically
            // Formspree will redirect back to your page after submission
            // The loading state will show while the form processes
        });
        
        // Handle form submission responses
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.get('success') === 'true') {
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Message Sent Successfully!';
            submitBtn.style.background = '#4CAF50';
            submitBtn.style.color = '#ffffff';
            
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                contactForm.reset();
                
                // Reset label positions
                const labels = contactForm.querySelectorAll('label');
                labels.forEach(label => {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = '#999999';
                });
            }, 3000);
        } else if (urlParams.get('error') === 'true') {
            // Show error message
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Error Sending Message';
            submitBtn.style.background = '#f44336';
            submitBtn.style.color = '#ffffff';
            
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
                submitBtn.style.color = '';
            }, 3000);
        }
    }
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
});