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

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('selam-portfolio-theme', isDark ? 'dark' : 'light');
    });
}

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

// 7. CIRCULAR PROJECT CAROUSEL (Coverflow Optimized)
const track = document.querySelector('.carousel-track');
const projects = Array.from(document.querySelectorAll('.project-frame'));
const pNextBtn = document.getElementById('next-project');
const pPrevBtn = document.getElementById('prev-project');
let currentIndex = 0;

/* Replace the entire updateCarousel function with this */
const updateCarousel = () => {
    projects.forEach((card, i) => {
        // 1. Reset all position classes
        card.classList.remove('active-card', 'left-card', 'right-card', 'far-left-card', 'far-right-card', 'hidden-card');

        // 2. Calculate relative positions in a circular array
        const total = projects.length;
        const dist = (i - currentIndex + total) % total;

        if (i === currentIndex) {
            card.classList.add('active-card');
        } else if (dist === 1) {
            card.classList.add('right-card');
        } else if (dist === total - 1) {
            card.classList.add('left-card');
        } else if (dist === 2) {
            card.classList.add('far-right-card');
        } else if (dist === total - 2) {
            card.classList.add('far-left-card');
        } else {
            card.classList.add('hidden-card');
        }
    });
};

// Click-to-Focus: Clicking a side card brings it to the front
projects.forEach((card, i) => {
    card.addEventListener('click', () => {
        if (currentIndex !== i) {
            currentIndex = i;
            updateCarousel();
        }
    });
});

// Button Controls with Event Propagation fix
if (pNextBtn && pPrevBtn) {
    pNextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents click from bubbling to the card
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
// Replace your existing Line 116-121 with this:
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    
    // Small delay ensures the browser has calculated the 3D perspective
    setTimeout(() => {
        updateCarousel(); 
        typeEffect();
    }, 100); 
});
