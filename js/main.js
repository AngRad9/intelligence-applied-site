/* ============================================
   Intelligence Applied AI - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeAccordions();
});

/* ============================================
   Mobile Menu Functionality
   ============================================ */

function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ============================================
   Accordion Functionality
   ============================================ */

function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');
            const isOpen = this.getAttribute('aria-expanded') === 'true';

            // Close all other accordion items in the same accordion
            const accordion = this.closest('.accordion');
            if (accordion) {
                accordion.querySelectorAll('.accordion-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherHeader = otherItem.querySelector('.accordion-header');
                        const otherContent = otherItem.querySelector('.accordion-content');
                        otherHeader.setAttribute('aria-expanded', 'false');
                        otherContent.classList.remove('open');
                    }
                });
            }

            // Toggle current item
            this.setAttribute('aria-expanded', !isOpen);
            content.classList.toggle('open');
        });
    });
}

/* ============================================
   Smooth Scroll for Anchor Links
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   Add Active Class to Navigation Link
   ============================================ */

function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();

        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Run on page load
updateActiveNav();

/* ============================================
   Intersection Observer for Scroll Reveals
   ============================================ */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(element => {
    observer.observe(element);
});

/* ============================================
   Utility Functions
   ============================================ */

// Prevent default link behavior for smooth transitions
function preventDefaultLink(e) {
    if (e.target.tagName === 'A' && e.target.href === window.location.href) {
        e.preventDefault();
    }
}

// Add loading class to body when navigating
window.addEventListener('beforeunload', function() {
    document.body.classList.add('loading');
});

// Log initialization
console.log('Intelligence Applied AI - Main JS Initialized');
