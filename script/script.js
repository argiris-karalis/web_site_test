/* ==========================================================================
   LAW FIRM INTERACTIVE FUNCTIONS - OPTIMIZED SCRIPT
   ========================================================================== */

// 1. MOBILE HAMBURGER MENU
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault(); 
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    document.addEventListener('click', (e) => {
        if (mainNav.classList.contains('active')) {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        }
    });

    function closeMenu() {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// 2. ABOUT TEAM SLIDER
const slides = document.querySelectorAll('.about-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

if (slides.length > 0 && prevBtn && nextBtn) {
    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
}

// 3. BACK TO TOP BUTTON
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    history.pushState("", document.title, window.location.pathname + window.location.search);
}

window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// 4. ANIMATION ΜΕΤΡΗΤΗ
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const duration = 2000;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const progressRatio = Math.min(progress / duration, 1);
            const currentCount = Math.floor(progressRatio * target);

            counter.innerText = currentCount;

            if (progress < duration) {
                requestAnimationFrame(step);
            } else {
                counter.innerText = target;
            }
        };

        requestAnimationFrame(step);
    });
};

const statsSection = document.querySelector('.stats-counter-container');

if (statsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
}

// 5. AI CHAT WIDGET & ROUTING
let isBotTyped = false;

// Τηλέφωνο Γραμματείας (μορφή: 3069XXXXXXXX)
const SECRETARY_PHONE = "306900000000"; 

function toggleAiChat() {
    const chatWindow = document.getElementById('aiChatWindow');
    const typingIndicator = document.getElementById('aiTyping');
    const welcomeMessage = document.getElementById('aiWelcomeMessage');
    const initialOptions = document.getElementById('initialOptions');

    if (!chatWindow) return;

    chatWindow.classList.toggle('open');

    if (chatWindow.classList.contains('open') && !isBotTyped) {
        setTimeout(() => {
            if (typingIndicator) typingIndicator.style.display = 'none';
            if (welcomeMessage) welcomeMessage.style.display = 'block';
            if (initialOptions) initialOptions.style.display = 'flex';
            isBotTyped = true;
        }, 1200); 
    }
}

function routeUser(type) {
    const initialOptions = document.getElementById('initialOptions');
    const secretaryMessage = document.getElementById('aiSecretaryMessage');
    const lawyerPromptMessage = document.getElementById('aiLawyerPromptMessage');
    const lawyersList = document.getElementById('lawyersList');

    if (initialOptions) initialOptions.style.display = 'none';

    if (type === 'new') {
        if (secretaryMessage) secretaryMessage.style.display = 'block';
        updateContactLinks(SECRETARY_PHONE);
    } else if (type === 'existing') {
        if (lawyerPromptMessage) lawyerPromptMessage.style.display = 'block';
        if (lawyersList) lawyersList.style.display = 'flex';
    }
    
    autoScroll();
}

function selectLawyer(name, phoneNumber) {
    const selectionMessage = document.getElementById('aiSelectionMessage');
    const selectedLawyerName = document.getElementById('selectedLawyerName');
    
    if (selectedLawyerName) selectedLawyerName.textContent = name;
    if (selectionMessage) selectionMessage.style.display = 'block';
    
    updateContactLinks(phoneNumber);
    autoScroll();
}

// Helper για την ενημέρωση των συνδέσμων Viber & Τηλεφώνου
function updateContactLinks(phone) {
    const viberBtn = document.getElementById('viberLink');
    const callBtn = document.getElementById('callLink');
    const aiFooter = document.getElementById('aiFooter');

    const cleanPhone = phone.replace(/[^0-9]/g, '');

    if (viberBtn) viberBtn.href = `viber://chat?number=%2B${cleanPhone}`;
    if (callBtn) callBtn.href = `tel:+${cleanPhone}`;
    if (aiFooter) aiFooter.style.display = 'block';
}

function autoScroll() {
    const chatBody = document.getElementById('aiChatBody');
    if (chatBody) {
        setTimeout(() => {
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 50);
    }
}

// 6. CURRENT YEAR FOOTER AUTO-UPDATE
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}