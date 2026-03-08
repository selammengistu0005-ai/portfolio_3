/**
 * Selam Mengistu | Portfolio Script
 * Optimized for performance and accessibility
 */

// 1. SELECT ELEMENTS
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const typingElement = document.getElementById('typing-text');
const caseStudyButtons = document.querySelectorAll('.toggle-case-study');

// 2. THEME PERSISTENCE
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('selam-portfolio-theme') || 'light';
    if (savedTheme === 'dark') body.classList.add('dark-mode');
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
    el.style.opacity = '0'; // Set initial state
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// 6. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setTimeout(typeEffect, 500);
});

// 7. MOCKUP SLIDER LOGIC (New)
const mockups = document.querySelectorAll('.mockup-chat');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-mockup');
const nextBtn = document.getElementById('next-mockup');
let currentSlide = 0;

if (nextBtn && prevBtn) {
    const updateSlider = (index) => {
        // Remove active class from all
        mockups.forEach(m => m.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        // Add to current
        mockups[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % mockups.length;
        updateSlider(currentSlide);
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + mockups.length) % mockups.length;
        updateSlider(currentSlide);
    });
}
