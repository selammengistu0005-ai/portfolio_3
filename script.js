/**
 * Selam Mengistu | Portfolio Script
 * Optimized for performance and accessibility
 */

// 1. SELECT ELEMENTS
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const typingElement = document.getElementById('typing-text');
const caseStudyButtons = document.querySelectorAll('.toggle-case-study');

const initializeTheme = () => {
    const savedTheme = localStorage.getItem('selam-portfolio-theme');
    // If the user previously chose dark, or their system prefers dark
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-mode');
    }
};

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('selam-portfolio-theme', isDark ? 'dark' : 'light');
});

// 3. TYPING EFFECT
const introText = "Hello, I'm Selam Mengistu.\nI build AI agents for websites."; 
let index = 0;

const typeEffect = () => {
    if (index < introText.length) {
        if (introText.charAt(index) === "\n") {
            typingElement.innerHTML += "<br>"; 
        } else {
            typingElement.innerHTML += introText.charAt(index);
        }
        index++;
        const speed = Math.floor(Math.random() * 50) + 70;
        setTimeout(typeEffect, speed);
    }
};

// 4. ACCESSIBLE CASE STUDY TOGGLE
caseStudyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Toggle state
        button.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('active');
        
        // Update text
        button.textContent = isExpanded ? "Review Case Study" : "Close Case Study";
    });
});

// 5. SCROLL ANIMATION (Pro Feature)
// Adds a "reveal" animation when elements enter the viewport
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-frame, .value-container').forEach(el => {
    observer.observe(el);
});

// 7. CIRCULAR PROJECT CAROUSEL
const track = document.querySelector('.carousel-track');
const projects = Array.from(document.querySelectorAll('.project-frame'));
const pNextBtn = document.getElementById('next-project');
const pPrevBtn = document.getElementById('prev-project');
let currentIndex = 0;

const updateCarousel = () => {
    projects.forEach((card, i) => {
        // Remove all positional classes first
        card.classList.remove('active-card', 'left-card', 'right-card', 'hidden-card');

        if (i === currentIndex) {
            card.classList.add('active-card');
        } else if (i === (currentIndex - 1 + projects.length) % projects.length) {
            card.classList.add('left-card');
        } else if (i === (currentIndex + 1) % projects.length) {
            card.classList.add('right-card');
        } else {
            card.classList.add('hidden-card');
        }
    });
};

// Click-to-Focus Logic
projects.forEach((card, i) => {
    card.addEventListener('click', () => {
        if (currentIndex !== i) {
            currentIndex = i;
            updateCarousel();
        }
    });
});

// Button Controls
if (pNextBtn && pPrevBtn) {
    pNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % projects.length;
        updateCarousel();
    });

    pPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateCarousel();
    });
}

// 8. FINAL INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setTimeout(typeEffect, 500);
    updateCarousel(); // Initialize the first 3D state
});
