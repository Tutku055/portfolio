// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeThemeToggle();
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeStatCounters();
    initializeBinaryAnimation();
    initializeParticleBackground();
    initializeProfileImage();
    
    // Initialize modal first, then project links
    initializeModal();
    initializeProjectLinks();
    
    initializeContactLinks();
});

// Profile Image Initialization - Handle loading states and fallbacks
function initializeProfileImage() {
    const profilePhoto = document.querySelector('.profile-photo');
    const profileFallback = document.querySelector('.profile-fallback');
    
    if (!profilePhoto) {
        console.log('No profile photo element found');
        if (profileFallback) {
            profileFallback.style.opacity = '1';
        }
        return;
    }
    
    // Apply proper styling for character head and body focus
    profilePhoto.style.position = 'absolute';
    profilePhoto.style.top = '0';
    profilePhoto.style.left = '0';
    profilePhoto.style.width = '100%';
    profilePhoto.style.height = '100%';
    profilePhoto.style.objectFit = 'fill'; // Keep aspect ratio, fit entire image within circle
    profilePhoto.style.objectPosition = 'center';
    profilePhoto.style.borderRadius = '50%';
    
    // Function to detect system theme preference
    function getSystemThemePreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    }
    
    // Determine initial theme - check saved theme or use system default
    let savedTheme = localStorage.getItem('theme');
    let currentTheme = savedTheme || getSystemThemePreference();
    const isLightTheme = currentTheme === 'light';
    
    // Set correct initial image source based on theme
    const initialImageSrc = isLightTheme ? 'images/Hero_Light.png' : 'images/Hero_Dark.png';
    profilePhoto.src = initialImageSrc;
    
    // Set initial state - show fallback, hide image until loaded
    profilePhoto.style.display = 'none';
    profilePhoto.style.opacity = '0';
    if (profileFallback) {
        profileFallback.style.opacity = '1';
    }
    
    // Function to update image based on theme
    function updateImageForTheme() {
        const isCurrentLightTheme = document.body.classList.contains('light-theme');
        const newImageSrc = isCurrentLightTheme ? 'images/Hero_Light.png' : 'images/Hero_Dark.png';
        
        // Only update if the src is different
        if (profilePhoto.src !== newImageSrc && !profilePhoto.src.endsWith(newImageSrc)) {
            console.log(`Switching to ${isCurrentLightTheme ? 'light' : 'dark'} theme image: ${newImageSrc}`);
            
            // Hide current image and show fallback during transition
            profilePhoto.style.opacity = '0';
            profilePhoto.style.display = 'none';
            if (profileFallback) {
                profileFallback.style.opacity = '1';
            }
            
            // Update the src
            profilePhoto.src = newImageSrc;
        }
    }
    
    // Handle successful image load
    profilePhoto.addEventListener('load', function() {
        console.log('Profile image loaded successfully:', this.src);
        this.style.display = 'block';
        
        // Hide fallback first
        if (profileFallback) {
            profileFallback.style.opacity = '0';
        }
        
        // Add fade-in animation for image
        setTimeout(() => {
            this.style.transition = 'opacity 0.5s ease';
            this.style.opacity = '1';
        }, 100);
    });
    
    // Handle image load error
    profilePhoto.addEventListener('error', function() {
        console.log('Profile image failed to load, showing fallback:', this.src);
        this.style.display = 'none';
        this.style.opacity = '0';
        if (profileFallback) {
            profileFallback.style.opacity = '1';
        }
    });
    
    // Listen for theme changes
    const themeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                updateImageForTheme();
            }
        });
    });
    
    // Start observing theme changes
    themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
}

// Enhanced Theme Toggle Functionality with proper transitions
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-checkbox');
    const body = document.body;
    
    if (!themeToggle) {
        console.error('Theme toggle not found!');
        return;
    }
    
    // Function to detect system theme preference
    function getSystemThemePreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    }
    
    // Check for saved theme preference or use system default
    let savedTheme = localStorage.getItem('theme');
    let currentTheme;
    
    if (!savedTheme) {
        // No saved preference, use system default
        currentTheme = getSystemThemePreference();
        console.log('No saved theme found, using system preference:', currentTheme);
    } else {
        currentTheme = savedTheme;
        console.log('Using saved theme preference:', currentTheme);
    }
    
    // Apply theme
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.checked = true;
        // Initialize light theme background
        setTimeout(() => triggerLightThemeAnimations(), 100);
    } else {
        body.classList.remove('light-theme');
        themeToggle.checked = false;
        // Initialize dark theme background
        setTimeout(() => triggerDarkThemeAnimations(), 100);
    }
    
    // Listen for system theme changes (if user hasn't manually set a preference)
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        mediaQuery.addListener(function(e) {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'light' : 'dark';
                console.log('System theme changed to:', newTheme);
                
                if (newTheme === 'light') {
                    body.classList.add('light-theme');
                    themeToggle.checked = true;
                    triggerLightThemeAnimations();
                } else {
                    body.classList.remove('light-theme');
                    themeToggle.checked = false;
                    triggerDarkThemeAnimations();
                }
                
                updateNavigationTheme(newTheme);
            }
        });
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        console.log('Theme toggle clicked:', this.checked);
        
        // Add transition class for smooth animations
        body.classList.add('theme-switching');
        
        if (this.checked) {
            // Switch to light theme
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            console.log('Switching to light theme');
            
            // Enhanced light theme animations
            triggerLightThemeAnimations();
            
            // Add special transition effects
            createThemeTransitionEffect('light');
            
            // Update navigation theme
            updateNavigationTheme('light');
        } else {
            // Switch to dark theme
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            console.log('Switching to dark theme');
            
            // Enhanced dark theme animations
            triggerDarkThemeAnimations();
            
            // Add special transition effects
            createThemeTransitionEffect('dark');
            
            // Update navigation theme
            updateNavigationTheme('dark');
        }
        
        // Remove transition class after animation
        setTimeout(() => {
            body.classList.remove('theme-switching');
        }, 600);
    });
}

// Function to update navigation theme immediately
function updateNavigationTheme(theme) {
    const navbar = document.querySelector('.navbar');
    const isScrolled = window.scrollY > 50;
    
    if (theme === 'light') {
        if (isScrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.borderBottomColor = 'rgba(26, 32, 44, 0.15)';
    } else {
        if (isScrolled) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    }
}

// Enhanced theme transition effect
function createThemeTransitionEffect(theme) {
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'theme-transition-overlay';
    
    if (theme === 'light') {
        transitionOverlay.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)';
    } else {
        transitionOverlay.style.background = 'radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, transparent 70%)';
    }
    
    transitionOverlay.style.cssText += `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(transitionOverlay);
    
    // Animate overlay
    requestAnimationFrame(() => {
        transitionOverlay.style.opacity = '1';
        
        setTimeout(() => {
            transitionOverlay.style.opacity = '0';
            
            setTimeout(() => {
                if (document.body.contains(transitionOverlay)) {
                    document.body.removeChild(transitionOverlay);
                }
            }, 300);
        }, 200);
    });
}

// Trigger light theme specific animations
function triggerLightThemeAnimations() {
    const particles = document.querySelector('.particles');
    const lightBackground = document.querySelector('.light-background');
    const clouds = document.querySelectorAll('.cloud');
    const sunRays = document.querySelector('.sun-rays');
    const shapes = document.querySelectorAll('.shape');
    
    console.log('Triggering light theme animations');
    
    // Hide particles (stars)
    if (particles) {
        particles.style.opacity = '0';
    }
    
    // Show light background
    if (lightBackground) {
        lightBackground.style.opacity = '1';
    }
    
    // Restart cloud animations with staggered timing
    clouds.forEach((cloud, index) => {
        cloud.style.animation = 'none';
        cloud.offsetHeight; // Trigger reflow
        const duration = 25 + index * 5;
        const delay = -index * 3;
        cloud.style.animation = `cloudFloat ${duration}s linear infinite ${delay}s`;
        
        // Add entrance animation
        cloud.style.transform = 'scale(0.8) translateY(20px)';
        cloud.style.opacity = '0';
        
        setTimeout(() => {
            cloud.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            cloud.style.transform = 'scale(1) translateY(0)';
            cloud.style.opacity = '0.8';
        }, index * 200);
    });
    
    // Enhanced sun rays animation
    if (sunRays) {
        sunRays.style.animation = 'none';
        sunRays.style.transform = 'scale(0.5)';
        sunRays.style.opacity = '0';
        sunRays.offsetHeight; // Trigger reflow
        
        setTimeout(() => {
            sunRays.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            sunRays.style.transform = 'scale(1)';
            sunRays.style.opacity = '0.7';
            sunRays.style.animation = 'sunRotate 30s linear infinite';
        }, 300);
    }
    
    // Enhanced shape animations
    shapes.forEach((shape, index) => {
        shape.style.animation = 'none';
        shape.style.transform = 'scale(0) rotate(180deg)';
        shape.style.opacity = '0';
        shape.offsetHeight; // Trigger reflow
        
        const duration = 12 + index * 2;
        const delay = -index * 3;
        
        setTimeout(() => {
            shape.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            shape.style.transform = 'scale(1) rotate(0deg)';
            shape.style.opacity = '0.6';
            shape.style.animation = `shapeFloat ${duration}s ease-in-out infinite ${delay}s`;
        }, 400 + index * 100);
    });
}

// Trigger dark theme specific animations
function triggerDarkThemeAnimations() {
    const particles = document.querySelector('.particles');
    const lightBackground = document.querySelector('.light-background');
    const lightElements = document.querySelectorAll('.cloud, .sun-rays, .shape');
    
    console.log('Triggering dark theme animations');
    
    // Hide light background
    if (lightBackground) {
        lightBackground.style.opacity = '0';
    }
    
    // Show particles (stars)
    if (particles) {
        particles.style.opacity = '1';
        
        // Clear existing stars and recreate
        particles.innerHTML = '';
        
        // Recreate star field with entrance animation
        setTimeout(() => {
            createProfessionalStarField(particles);
            
            // Animate stars entrance
            const stars = particles.querySelectorAll('.star');
            stars.forEach((star, index) => {
                star.style.opacity = '0';
                star.style.transform = 'scale(0)';
                
                setTimeout(() => {
                    star.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    star.style.opacity = star.dataset.originalOpacity || '0.5';
                    star.style.transform = 'scale(1)';
                }, index * 30); // Faster animation
            });
        }, 100);
    }
    
    // Fade out light theme elements
    lightElements.forEach((element, index) => {
        element.style.transition = 'all 0.5s ease-out';
        element.style.transform = 'scale(0.8) translateY(-20px)';
        element.style.opacity = '0';
    });
}

// Navigation functionality - Enhanced with proper theme handling
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
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

    // Enhanced navbar scroll behavior that respects theme
    function updateNavbarOnScroll() {
        const body = document.body;
        const isLightTheme = body.classList.contains('light-theme');
        
        if (window.scrollY > 50) {
            if (isLightTheme) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.borderBottomColor = 'rgba(26, 32, 44, 0.15)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
            }
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            if (isLightTheme) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.borderBottomColor = 'rgba(26, 32, 44, 0.15)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
            }
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Initial navbar setup
    updateNavbarOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', updateNavbarOnScroll);
}

// Project links functionality - Updated to handle both preview and code links
function initializeProjectLinks() {
    console.log('Initializing project links...');
    
    const codeLinks = document.querySelectorAll('.code-link');
    const previewLinks = document.querySelectorAll('.preview-link');
    const privacyModal = document.getElementById('privacy-modal');
    const previewModal = document.getElementById('preview-modal');
    
    console.log('Found code links:', codeLinks.length);
    console.log('Found preview links:', previewLinks.length);
    console.log('Privacy modal element:', privacyModal);
    console.log('Preview modal element:', previewModal);
    
    if (!privacyModal) {
        console.error('Privacy modal not found!');
    }
    
    if (!previewModal) {
        console.error('Preview modal not found!');
    }
    
    // Handle source code links
    codeLinks.forEach((link, index) => {
        console.log(`Setting up code link ${index}:`, link);
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Code link clicked, showing privacy modal...');
            
            if (privacyModal) {
                showModal(privacyModal);
            }
        });
    });
    
    // Handle project preview links
    previewLinks.forEach((link, index) => {
        console.log(`Setting up preview link ${index}:`, link);
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Preview link clicked, showing preview modal...');
            
            if (previewModal) {
                showModal(previewModal);
            }
        });
    });
}

// Helper function to show modals with consistent behavior
function showModal(modal) {
    // Show modal with proper display and animation
    modal.style.display = 'block';
    modal.style.opacity = '0';
    
    // Force reflow to ensure display is applied
    modal.offsetHeight;
    
    // Fade in
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    }, 10);
    
    // Add active class for additional styling if needed
    modal.classList.add('active');
    
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Modal functionality - Enhanced to handle both modals
function initializeModal() {
    const privacyModal = document.getElementById('privacy-modal');
    const previewModal = document.getElementById('preview-modal');
    
    if (!privacyModal && !previewModal) {
        console.error('No modals found during initialization');
        return;
    }
    
    console.log('Initializing modal functionality...');
    
    // Function to close modal
    function closeModal(modal) {
        console.log('Closing modal...');
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable body scroll
        }, 300);
    }
    
    // Setup modal controls for privacy modal
    if (privacyModal) {
        setupModalControls(privacyModal, closeModal);
    }
    
    // Setup modal controls for preview modal
    if (previewModal) {
        setupModalControls(previewModal, closeModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (privacyModal && privacyModal.style.display === 'block') {
                closeModal(privacyModal);
            }
            if (previewModal && previewModal.style.display === 'block') {
                closeModal(previewModal);
            }
        }
    });
}

// Helper function to setup modal controls
function setupModalControls(modal, closeModalFn) {
    const closeBtn = modal.querySelector('.close');
    const modalBtn = modal.querySelector('.modal-btn');
    const modalContent = modal.querySelector('.modal-content');
    
    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModalFn(modal);
        });
    }
    
    // Close modal when clicking button
    if (modalBtn) {
        modalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModalFn(modal);
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFn(modal);
        }
    });
    
    // Prevent modal content clicks from closing modal
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// Contact links functionality
function initializeContactLinks() {
    const contactBtns = document.querySelectorAll('.contact-btn');
    
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add click effect animation
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track click type for analytics (optional)
            const contactType = this.href.includes('mailto') ? 'email' : 
                               this.href.includes('linkedin') ? 'linkedin' : 
                               this.href.includes('github') ? 'github' : 
                               this.href.includes('maps') ? 'location' : 'unknown';
            
            console.log(`Contact ${contactType} clicked`);
        });
        
        // Add hover sound effect (optional)
        btn.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });
}

// Typing effect for hero section
function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'Computer Engineering Student',
        'Backend Developer',
        'Problem Solver',
        'Tech Enthusiast',
        'Analytical Thinker'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing effect
    setTimeout(typeText, 1000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars();
                }
                
                // Trigger counter animations when about section is visible
                if (entry.target.classList.contains('about-section')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe individual elements
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .stat-item, .contact-item');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress', progress + '%');
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, index * 200);
    });
}

// Counter animations for statistics
function initializeStatCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        counter.textContent = '0';
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1200; // 1.2 seconds animation
        const startTime = performance.now();
        
        // For small numbers, use a different approach to ensure smooth animation
        const minSteps = Math.max(target * 10, 30); // Minimum 30 steps, or 10 per target number
        const stepDuration = duration / minSteps;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // Ensure progress never exceeds 1
            
            // Use easing function for smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
            
            // Better calculation for small numbers
            let current;
            if (target <= 10) {
                // For small numbers, use more granular steps
                current = Math.min(Math.floor(easedProgress * target * 10) / 10, target);
                // Round to nearest integer for display
                current = Math.round(current);
            } else {
                current = Math.floor(easedProgress * target);
            }
            
            // Ensure we never exceed the target
            current = Math.min(current, target);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure we always end exactly at the target
                counter.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    });
}

// Binary code animation for about section
function initializeBinaryAnimation() {
    const binaryAnimation = document.querySelector('.binary-animation');
    
    if (binaryAnimation) {
        // Create binary code background
        setInterval(() => {
            const binary = generateBinaryString(50);
            binaryAnimation.setAttribute('data-binary', binary);
        }, 100);
    }
}

function generateBinaryString(length) {
    let binary = '';
    for (let i = 0; i < length; i++) {
        binary += Math.random() < 0.5 ? '0' : '1';
    }
    return binary;
}

// Enhanced particle background with smooth, professional animation
function initializeParticleBackground() {
    const particlesContainer = document.querySelector('.particles');
    
    if (!particlesContainer) {
        console.error('Particles container not found');
        return;
    }
    
    console.log('Initializing particle background');
    
    // Check current theme and initialize accordingly
    const body = document.body;
    const isLightTheme = body.classList.contains('light-theme');
    
    if (!isLightTheme) {
        // Create stars for dark theme
        createProfessionalStarField(particlesContainer);
    }
    
    // Add smooth scroll-based effects
    window.addEventListener('scroll', throttle(updateSmoothParallax, 16));
    
    // Add mouse interaction for subtle movement
    window.addEventListener('mousemove', throttle(handleMouseMove, 32));
}

function createProfessionalStarField(container) {
    console.log('Creating professional star field');
    
    // Clear existing particles
    container.innerHTML = '';
    
    // Create three layers of stars with different properties
    createStarLayer(container, 'layer-1', 25, { minSize: 1, maxSize: 2, speed: 1, opacity: [0.3, 0.7] });
    createStarLayer(container, 'layer-2', 15, { minSize: 2, maxSize: 3, speed: 0.7, opacity: [0.5, 0.9] });
    createStarLayer(container, 'layer-3', 12, { minSize: 1, maxSize: 1.5, speed: 1.3, opacity: [0.2, 0.5] });
    
    // Add some shooting stars occasionally
    setInterval(() => {
        if (Math.random() < 0.3 && !document.body.classList.contains('light-theme')) {
            createShootingStar(container);
        }
    }, 3000);
}

function createStarLayer(container, layerClass, count, config) {
    for (let i = 0; i < count; i++) {
        createProfessionalStar(container, layerClass, config);
    }
}

function createProfessionalStar(container, layerClass, config) {
    const star = document.createElement('div');
    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const colors = ['#00d4ff', '#ff00ff', '#00ff88', '#ffffff', '#ffd700'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = Math.random() * (config.opacity[1] - config.opacity[0]) + config.opacity[0];
    
    star.className = `star ${layerClass}`;
    star.dataset.originalOpacity = opacity;
    
    star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${opacity};
        box-shadow: 0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}40;
        pointer-events: none;
        z-index: -1;
    `;
    
    // Add twinkle animation
    const twinkleDuration = Math.random() * 3 + 2; // 2-5 seconds
    const delay = Math.random() * 2; // 0-2 seconds delay
    
    star.style.animation = `
        starTwinkle ${twinkleDuration}s ${delay}s infinite ease-in-out,
        starFloat ${20 + Math.random() * 10}s linear infinite
    `;
    
    // Add floating movement based on layer
    const floatDistance = layerClass === 'layer-1' ? 20 : layerClass === 'layer-2' ? 15 : 10;
    star.style.setProperty('--float-distance', `${floatDistance}px`);
    
    container.appendChild(star);
}

function createShootingStar(container) {
    const shootingStarContainer = document.createElement('div');
    const startX = Math.random() * 80 + 10; // 10% - 90% arası
    const startY = Math.random() * 40 + 10; // 10% - 50% arası

    shootingStarContainer.style.cssText = `
    position: absolute;
    left: ${startX}%;
    top: ${startY}%;
    pointer-events: none;
    z-index: 1; /* -1 bazı düzenlerde görünmezliğe sebep oluyor */
  `;

    
    // Main shooting star
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.cssText = `
  position: absolute;
  width: 2.2px;
  height: 2.2px;
  background: radial-gradient(circle, #ffffff 0%, #00d4ff 70%, transparent 100%);
  border-radius: 50%;
  box-shadow:
    0 0 6px #ffffff,
    0 0 12px #00d4ff,
    0 0 18px rgba(0, 212, 255, 0.5);
  will-change: transform, opacity;
  animation: shootingStar 3.5s linear forwards;
`;

    
    // Main trail
    const mainTrail = document.createElement('div');
    mainTrail.className = 'shooting-star-trail';
    mainTrail.style.cssText = `
  position: absolute;
  width: 60px;
  height: 2.2px;
  background: linear-gradient(to left,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(0, 212, 255, 0.6) 45%,
    rgba(255, 255, 255, 0.1) 100%);
  border-radius: 2px;
  transform-origin: right center;
  left: 0px;
  top: 0px;
  will-change: transform, opacity;
  animation: shootingStarTrail 2.5s ease-out forwards;
`;



    
    /// Other Particle effects
    const trailParticle1 = document.createElement('div');
    trailParticle1.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    background: rgba(255, 255, 255, 0.65);
    border-radius: 50%;
    left: -8px;
    top: -4px;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
    will-change: transform, opacity;
    animation: trailParticle1 2.2s ease-out forwards;
    animation-delay: 0.1s;
  `;

    const trailParticle2 = document.createElement('div');
    trailParticle2.style.cssText = `
    position: absolute;
    width: 0.8px;
    height: 0.8px;
    background: rgba(0, 212, 255, 0.55);
    border-radius: 50%;
    left: -16px;
    top: -8px;
    box-shadow: 0 0 3px rgba(0, 212, 255, 0.3);
    will-change: transform, opacity;
    animation: trailParticle2 2.2s ease-out forwards;
    animation-delay: 0.15s;
  `;

    
    // Apply animations
    shootingStar.style.animation = 'shootingStar 2.2s ease-out forwards';
    mainTrail.style.animation = 'shootingStarTrail 2.2s ease-out forwards';
    trailParticle1.style.animation = 'trailParticle1 2.2s ease-out forwards';
    trailParticle2.style.animation = 'trailParticle2 2.2s ease-out forwards';
    
    // Add slight delay for trail particles
    trailParticle1.style.animationDelay = '0.1s';
    trailParticle2.style.animationDelay = '0.15s';
    
    // Assemble the shooting star
    shootingStarContainer.appendChild(mainTrail);
    shootingStarContainer.appendChild(trailParticle1);
    shootingStarContainer.appendChild(trailParticle2);
    shootingStarContainer.appendChild(shootingStar);
    
    container.appendChild(shootingStarContainer);
    
    // Remove after animation completes
    setTimeout(() => {
        if (container.contains(shootingStarContainer)) {
            container.removeChild(shootingStarContainer);
        }
    }, 2400); // Slightly longer than animation duration
}

function updateSmoothParallax() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollProgress = scrolled / (documentHeight - windowHeight);
    
    // Get all star layers
    const layer1Stars = document.querySelectorAll('.star.layer-1');
    const layer2Stars = document.querySelectorAll('.star.layer-2');
    const layer3Stars = document.querySelectorAll('.star.layer-3');
    
    // Apply different parallax speeds to each layer
    layer1Stars.forEach((star, index) => {
        const speed = 0.2 + (index % 3) * 0.1; // Varied speed: 0.2, 0.3, 0.4
        const yOffset = scrolled * speed;
        star.style.transform = `translateY(${yOffset}px) translateX(${Math.sin(scrollProgress * Math.PI * 2 + index) * 10}px)`;
    });
    
    layer2Stars.forEach((star, index) => {
        const speed = 0.4 + (index % 3) * 0.1; // Varied speed: 0.4, 0.5, 0.6
        const yOffset = scrolled * speed;
        star.style.transform = `translateY(${yOffset}px) translateX(${Math.cos(scrollProgress * Math.PI * 2 + index) * 8}px)`;
    });
    
    layer3Stars.forEach((star, index) => {
        const speed = 0.1 + (index % 2) * 0.05; // Varied speed: 0.1, 0.15
        const yOffset = scrolled * speed;
        star.style.transform = `translateY(${yOffset}px)`;
    });
    
    // Smooth opacity transition based on scroll
    const backgroundElement = document.querySelector('.background-animation');
    if (backgroundElement) {
        const opacity = Math.max(0.7, 1 - scrollProgress * 0.3); // Fade from 1 to 0.7
        backgroundElement.style.opacity = opacity;
    }
}

function handleMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    const mouseY = (event.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    
    // Subtle mouse-based movement for layer-1 stars only
    const layer1Stars = document.querySelectorAll('.star.layer-1');
    layer1Stars.forEach((star, index) => {
        const intensity = 0.5 + (index % 3) * 0.2; // 0.5, 0.7, 0.9
        const currentTransform = star.style.transform || '';
        const mouseOffset = `translate(${mouseX * intensity}px, ${mouseY * intensity}px)`;
        
        // Preserve existing transform and add mouse effect
        if (currentTransform.includes('translateY')) {
            star.style.transform = currentTransform.replace(/translate\([^)]*\)/, mouseOffset);
        } else {
            star.style.transform = `${currentTransform} ${mouseOffset}`;
        }
    });
}

// Enhanced throttle function with better performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add viewport visibility optimization
let isVisible = true;
document.addEventListener('visibilitychange', function() {
    isVisible = !document.hidden;
    
    // Pause/resume animations based on visibility
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        if (isVisible) {
            star.style.animationPlayState = 'running';
        } else {
            star.style.animationPlayState = 'paused';
        }
    });
});

// Add resize handler to maintain responsive behavior
window.addEventListener('resize', throttle(() => {
    // Recalculate star positions on resize
    const container = document.querySelector('.particles');
    if (container && window.innerWidth !== container.dataset.lastWidth) {
        container.dataset.lastWidth = window.innerWidth;
        // Recreate star field for new dimensions if in dark theme
        if (!document.body.classList.contains('light-theme')) {
            setTimeout(() => createProfessionalStarField(container), 100);
        }
    }
}, 250));

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Console welcome message
console.log(`
%c🚀 Welcome to Tutku's Portfolio! 
%cBuilt with modern web technologies and lots of ❤️
%cFeel free to explore the code!
`, 
'color: #00d4ff; font-size: 20px; font-weight: bold;',
'color: #ff00ff; font-size: 14px;',
'color: #00ff88; font-size: 12px;'
);
