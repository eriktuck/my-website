// Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.querySelector('.theme-label');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme') || 
                       (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle state and label
    if (currentTheme === 'dark') {
      themeToggle.checked = true;
      themeLabel.textContent = 'Light Mode';
    } else {
      themeLabel.textContent = 'Dark Mode';
    }
    
    // Handle toggle click
    themeToggle.addEventListener('click', () => {
      const newTheme = themeToggle.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update label text
      themeLabel.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
      
      // Add transition overlay
      const overlay = document.createElement('div');
      overlay.className = 'theme-transition-overlay';
      document.body.appendChild(overlay);
      
      // Trigger transition
      requestAnimationFrame(() => {
        overlay.classList.add('active');
      });
      
      // Remove overlay after transition
      setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 500);
      }, 500);
    });
  });

  // Scroll to Projects
  document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to hero button with offset for fixed header
    const heroButton = document.querySelector('.hero-buttons .secondary-button');
    if (heroButton) {
        heroButton.addEventListener('click', (e) => {
            e.preventDefault();
            const projectsSection = document.querySelector('.featured-projects');
            if (projectsSection) {
                const headerHeight = document.querySelector('.fixed-header').offsetHeight;
                const offset = headerHeight + 20; // Add some extra space
                const targetPosition = projectsSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
  });

  // Enhanced Carousel with Responsive Dots
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel elements
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let dots = [];
    let currentIndex = 0;
    let autoplayInterval;
    let slidesPerView = getSlidesPerView();
    let totalPositions = calculateTotalPositions();

    // Initialize carousel
    createDots();
    updateCarousel();
    setupEventListeners();
    startAutoplay();

    // Helper functions
    function getSlidesPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1200) return 2;
        return 3;
    }

    function calculateTotalPositions() {
        return Math.max(1, slides.length - slidesPerView + 1);
    }

    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        dots = [];
        totalPositions = calculateTotalPositions();
        
        for (let i = 0; i < totalPositions; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.dataset.slide = i;
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }
        
        updateDots();
    }

    function updateDots() {
        if (!dots.length) return;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });

        // Update button states
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= totalPositions - 1;
    }

    function updateCarousel() {
        const slide = document.querySelector('.carousel-slide');
        if (!slide) return;
        
        // Get the number of slides to show based on screen width
        slidesPerView = getSlidesPerView();
        
        // Calculate the slide width percentage
        const slideWidthPercentage = 100 / slidesPerView;
        
        // Calculate the transform value
        const transformValue = -currentIndex * slideWidthPercentage;
        
        // Apply the transform
        track.style.transform = `translateX(${transformValue}%)`;
        
        // Update dots and ARIA attributes
        updateDots();
        
        // Update slides' visibility for screen readers
        slides.forEach((slide, index) => {
            const isVisible = index >= currentIndex && index < currentIndex + slidesPerView;
            slide.setAttribute('aria-hidden', !isVisible);
            slide.setAttribute('tabindex', isVisible ? '0' : '-1');
        });
        
        // Update ARIA attributes
        slides.forEach((slide, index) => {
            const isVisible = index >= currentIndex && index < (currentIndex + slidesPerView);
            slide.setAttribute('aria-hidden', !isVisible);
            slide.setAttribute('tabindex', isVisible ? '0' : '-1');
        });

        updateDots();
    }

    function handlePrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    function handleNext() {
        if (currentIndex < totalPositions - 1) {
            currentIndex++;
            updateCarousel();
        }
    }

    function handleDotClick(index) {
        currentIndex = index;
        updateCarousel();
    }

    function handleSwipe(deltaX) {
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) handleNext();
            else handlePrev();
        }
    }

    // Event Handlers
    function setupEventListeners() {
        // Navigation buttons
        prevButton.addEventListener('click', handlePrev);
        nextButton.addEventListener('click', handleNext);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            else if (e.key === 'ArrowRight') handleNext();
        });

        // Dots
        dotsContainer.addEventListener('click', (e) => {
            const dot = e.target.closest('.carousel-dot');
            if (dot) handleDotClick(parseInt(dot.dataset.slide));
        });

        // Touch events
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            handleSwipe(touchEndX - touchStartX);
        }, { passive: true });

        // Window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newSlidesPerView = getSlidesPerView();
                if (newSlidesPerView !== slidesPerView) {
                    slidesPerView = newSlidesPerView;
                    createDots();
                    updateCarousel();
                }
            }, 250);
        });
    }

    // Autoplay functionality
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => {
            if (currentIndex < totalPositions - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 7000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Pause autoplay on hover/focus
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
        carouselContainer.addEventListener('focusin', stopAutoplay);
        carouselContainer.addEventListener('focusout', startAutoplay);
    }
});

  // Intersection Observer for animations
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    // Observe elements that should animate
    document.querySelectorAll('.project-card, .section-header').forEach(el => {
      observer.observe(el);
    });
  });

  // Particles initialization for footer
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing particles...');
    const particlesContainer = document.getElementById('particles-js');
    var currentTheme = document.documentElement.getAttribute('data-theme');
    console.log('Theme:', currentTheme);
    var isDark = currentTheme === 'dark'
    
    if (!particlesContainer) {
      console.error('Particles container not found');
      return;
    }
    
    if (typeof particlesJS !== 'function') {
      console.error('particlesJS function not found');
      return;
    }
    
    // Function to get theme-specific particle config
    function getParticleConfig(isDark) {
      const particleColor = isDark ? '#ffffff' : '#000000';
      const lineColor = isDark ? '#ffffff' : '#000000';
      
      return {
        "particles": {
          "number": {
            "value": 160,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": particleColor
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": particleColor
            },
            "polygon": {
              "nb_sides": 5
            },
          },
          "opacity": {
            "value": 1,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 4,
              "size_min": 0.3,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": lineColor,
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 600
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "bubble"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 110,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 110,
              "size": 20,
              "duration": 2,
              "opacity": 0,
              "speed": 3
            },
            "repulse": {
              "distance": 400,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      };
    }
    
    // Function to initialize or update particles
    let particlesInstance = null;
    function initParticles(isDark) {
      console.log(`Initializing particles for ${isDark ? 'dark' : 'light'} theme`);
      
      // Destroy existing particles if they exist
      if (particlesInstance) {
        particlesInstance.pJS.fn.vendors.destroypJS();
        particlesInstance = null;
      }
      
      // Initialize with new config
      const config = getParticleConfig(isDark);
      particlesInstance = particlesJS('particles-js', config);
    }
    
    // Initialize particles with current theme
    initParticles(isDark);
    
    // Watch for theme changes via data-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          console.log(`Theme changed to: ${newTheme}`);
          initParticles(newTheme === 'dark');
        }
      });
    });
    
    // Start observing the document element for attribute changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    // Also listen for the theme toggle click to catch immediate changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        console.log(`Theme toggle clicked: ${newTheme}`);
        initParticles(newTheme === 'dark');
      });
    }
    
    // Expose function to manually trigger theme change
    window.__setParticleTheme = (isDark) => {
      const newTheme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      initParticles(isDark);
    };
    
    // Expose function for manual theme updates if needed
    window.__reloadParticles = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      initParticles(currentTheme === 'dark');
    };
    
    // Check if canvas was created
    const canvas = document.querySelector('#particles-js canvas');
    console.log('Particles canvas:', canvas);
    
    if (canvas) {
      // Make canvas fill its container
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }
  });

// Simple hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-menu');
    
    if (!hamburger || !nav) return;
    
    // Add click event to hamburger
    hamburger.addEventListener('click', function(e) {
        
        // Toggle both classes to handle any case
        nav.classList.toggle('is-active');
        nav.classList.toggle('active');
        
        // Update aria-expanded
        const isExpanded = nav.classList.contains('is-active') || nav.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) return;
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            nav.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});