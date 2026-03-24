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
let projects = Array.from(document.querySelectorAll('.project-frame')); // Changed 'const' to 'let'
const pNextBtn = document.getElementById('next-project');
const pPrevBtn = document.getElementById('prev-project');
let currentIndex = 0;;

/* Replace the entire updateCarousel function with this */
/* Replace your updateCarousel logic around Line 90 */
const updateCarousel = () => {
    const total = projects.length;

    projects.forEach((card, i) => {
        // 1. Reset all 3D classes
        card.classList.remove('active-card', 'left-card', 'right-card', 'far-left-card', 'far-right-card', 'hidden-card');

        // 2. Calculate shortest distance for circular loop
        let dist = i - currentIndex;
        if (dist > total / 2) dist -= total;
        if (dist < -total / 2) dist += total;

        // 3. Set physical stacking (Z-Index)
        // We use 100 as base so it's always above background elements
        const absDist = Math.abs(dist);
        card.style.zIndex = 100 - absDist;

        // 4. Apply 3D perspective classes
        if (dist === 0) {
            card.classList.add('active-card');
            card.style.zIndex = 110; // Ensure center is ALWAYS on top
        } else if (dist === 1 || (dist === -(total - 1) && total > 2)) {
            card.classList.add('right-card');
        } else if (dist === -1 || (dist === (total - 1) && total > 2)) {
            card.classList.add('left-card');
        } else if (dist === 2 || (dist === -(total - 2) && total > 4)) {
            card.classList.add('far-right-card');
        } else if (dist === -2 || (dist === (total - 2) && total > 4)) {
            card.classList.add('far-left-card');
        } else {
            card.classList.add('hidden-card');
        }

        // 5. Accessibility: Hide non-active cards from Screen Readers
        card.setAttribute('aria-hidden', dist !== 0);
    });
};
// Add Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

const handleSwipe = () => {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped Left -> Next Card
        currentIndex = (currentIndex + 1) % projects.length;
        updateCarousel();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped Right -> Previous Card
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateCarousel();
    }
};
//clikc to focus
projects.forEach((card, i) => {
    card.addEventListener('click', (e) => {
        // If clicking the active card, allow buttons to work normally
        if (currentIndex === i) return;

        // If clicking a SIDE card, jump to it and stop the button from firing
        e.preventDefault();
        e.stopPropagation();
        currentIndex = i;
        updateCarousel();
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
        const total = projects.length;
        currentIndex = (currentIndex - 1 + total) % total;
        updateCarousel();
    });
}

// 6. MOCKUP SLIDER (Value Section)
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
    nextMockBtn.addEventListener('click', () => {
        let next = (currentMockup + 1) % mockups.length;
        updateMockup(next);
    });

    prevMockBtn.addEventListener('click', () => {
        let prev = (currentMockup - 1 + mockups.length) % mockups.length;
        updateMockup(prev);
    });
}

// Allow clicking the dots directly
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateMockup(i));
});

// 8. FINAL INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    
    // Refresh the projects list (Assigning to the global variable, not redeclaring)
    projects = Array.from(document.querySelectorAll('.project-frame'));
    
    // Initialize the states
    updateCarousel(); 
    updateMockup(0); 
    
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        carouselTrack.style.opacity = "1";
        carouselTrack.style.visibility = "visible"; // Extra safety
    }
    
    if (typingElement) {
        typingElement.innerHTML = ""; 
        setTimeout(typeEffect, 500);
    }
});
