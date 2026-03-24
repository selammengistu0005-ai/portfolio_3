/**
 * Selam Mengistu | Portfolio Script
 * Optimized for 3D Carousel & UI Interactions
 */

// 1. SELECT ELEMENTS
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const typingElement = document.getElementById('typing-text');
const caseStudyButtons = document.querySelectorAll('.toggle-case-study');

// 2. THEME INITIALIZATION
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('selam-portfolio-theme');
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
let typeIndex = 0;

const typeEffect = () => {
    if (typeIndex < introText.length) {
        if (introText.charAt(typeIndex) === "\n") {
            typingElement.innerHTML += "<br>"; 
        } else {
            typingElement.innerHTML += introText.charAt(typeIndex);
        }
        typeIndex++;
        const speed = Math.floor(Math.random() * 50) + 70;
        setTimeout(typeEffect, speed);
    }
};

// 4. CASE STUDY TOGGLE
caseStudyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents carousel jump if card is clicked
        const content = button.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        button.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('active');
        button.textContent = isExpanded ? "Review Case Study" : "Close Case Study";
    });
});

// 5. SCROLL REVEAL OBSERVER
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.value-container').forEach(el => observer.observe(el));

// 6. 3D PROJECT CAROUSEL LOGIC
const track = document.querySelector('.carousel-track');
const pNextBtn = document.getElementById('next-project');
const pPrevBtn = document.getElementById('prev-project');
let projects = [];
let currentIndex = 0;

const updateCarousel = () => {
    const total = projects.length;
    if (total === 0) return;

    projects.forEach((card, i) => {
        // Clean slate
        card.classList.remove('active-card', 'left-card', 'right-card', 'far-left-card', 'far-right-card', 'hidden-card');

        // Circular Distance Logic
        let dist = i - currentIndex;
        if (dist > total / 2) dist -= total;
        if (dist < -total / 2) dist += total;

        // Apply 3D Classes
        if (dist === 0) {
            card.classList.add('active-card');
        } else if (dist === 1) {
            card.classList.add('right-card');
        } else if (dist === -1) {
            card.classList.add('left-card');
        } else if (dist === 2) {
            card.classList.add('far-right-card');
        } else if (dist === -2) {
            card.classList.add('far-left-card');
        } else {
            card.classList.add('hidden-card');
        }

        card.setAttribute('aria-hidden', dist !== 0);
    });
};

// Interaction: Click to focus
const setupClickToFocus = () => {
    projects.forEach((card, i) => {
        card.addEventListener('click', (e) => {
            if (currentIndex === i) return;
            // Prevent link clicks if card isn't active
            if (!e.target.classList.contains('frame-btn')) {
                e.preventDefault();
                currentIndex = i;
                updateCarousel();
            }
        });
    });
};

// Button Navigation
if (pNextBtn && pPrevBtn) {
    pNextBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % projects.length;
        updateCarousel();
    };
    pPrevBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateCarousel();
    };
}

// Swipe Support
let touchStartX = 0;
track.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive: true});
track.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) {
        currentIndex = (currentIndex + 1) % projects.length;
    } else if (touchEndX > touchStartX + 50) {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    }
    updateCarousel();
}, {passive: true});

// 7. MOCKUP SLIDER (Value Section)
const mockups = document.querySelectorAll('.mockup-chat');
const dots = document.querySelectorAll('.indicator .dot');
const prevMockBtn = document.getElementById('prev-mockup');
const nextMockBtn = document.getElementById('next-mockup');
let currentMockup = 0;

const updateMockup = (index) => {
    mockups.forEach(m => m.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    mockups[index].classList.add('active');
    dots[index].classList.add('active');
    currentMockup = index;
};

if (nextMockBtn && prevMockBtn) {
    nextMockBtn.onclick = () => updateMockup((currentMockup + 1) % mockups.length);
    prevMockBtn.onclick = () => updateMockup((currentMockup - 1 + mockups.length) % mockups.length);
}
dots.forEach((dot, i) => dot.onclick = () => updateMockup(i));

// 8. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    projects = Array.from(document.querySelectorAll('.project-frame'));
    
    setupClickToFocus();
    updateCarousel(); 
    updateMockup(0);
    
    if (typingElement) {
        typingElement.innerHTML = ""; 
        setTimeout(typeEffect, 500);
    }
});
