// ============================================
// GROQ API CONFIGURATION - PASTE YOUR API KEY HERE
// ============================================
const GROQ_API_KEY = "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";
const GROQ_MODEL = "llama-3.1-8b-instant";

// Global variables
let isInitialized = false;
let scrollObserver;

// Initialize immediately when script loads
initializeApp();

function initializeApp() {
    if (isInitialized) return;
    
    console.log("🚀 Initializing Zephyrinx AI...");
    
    // Create space background immediately
    createSpaceBackground();
    
    // Initialize everything when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeComponents);
    } else {
        initializeComponents();
    }
    
    isInitialized = true;
}

function initializeComponents() {
    console.log("📦 Initializing components...");
    
    // Initialize navigation immediately
    initializeNavigation();
    
    // Initialize chat functionality
    initializeChat();
    
    // Initialize scroll animations immediately
    initScrollAnimations();
    
    // Pre-animate visible elements
    setTimeout(preAnimateVisibleElements, 10);
    
    console.log("✅ All components initialized");
}

// Create space background elements
function createSpaceBackground() {
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;
    
    const starsCount = 80; // Much fewer stars for better performance
    
    // Clear existing stars
    starsContainer.innerHTML = '';
    
    // Create stars with minimal animation
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 1.5 + 0.3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = 1 + Math.random() * 2; // Much faster animation
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${Math.random() * 1}s`;
        star.style.opacity = '0.3'; // Start visible
        
        starsContainer.appendChild(star);
    }
    
    // Create shooting stars less frequently
    setTimeout(() => {
        createShootingStar();
    }, 1000);
    
    setInterval(() => {
        createShootingStar();
    }, 8000); // Much less frequent
}

function createShootingStar() {
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;
    
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    
    const startX = Math.random() * 20;
    const startY = Math.random() * 20;
    
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = `${startY}%`;
    shootingStar.style.animation = `shootingStar ${0.8 + Math.random() * 0.4}s ease-out`; // Faster
    
    starsContainer.appendChild(shootingStar);
    
    // Remove shooting star after animation
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 2000);
}

// Initialize navigation system
function initializeNavigation() {
    console.log("🧭 Initializing navigation...");
    
    const pages = {
        'home': document.getElementById('home-page'),
        'features': document.getElementById('features-page'),
        'chat': document.getElementById('chat-page'),
        'about': document.getElementById('about-page')
    };

    const navLinks = {
        'home': document.getElementById('home-nav-link'),
        'features': document.getElementById('features-nav-link'),
        'chat': document.getElementById('chat-nav-link'),
        'about': document.getElementById('about-nav-link')
    };

    // Navigation functions
    function navigateTo(pageId) {
        const page = pages[pageId];
        const navLink = navLinks[pageId];
        
        if (!page || !navLink) return;
        
        // Hide all pages
        Object.values(pages).forEach(p => {
            if (p) p.classList.remove('active');
        });
        
        // Show target page
        page.classList.add('active');
        
        // Update active nav link
        Object.values(navLinks).forEach(link => {
            if (link) link.classList.remove('active');
        });
        navLink.classList.add('active');
        
        // Scroll to top and close mobile menu
        window.scrollTo(0, 0);
        closeMobileMenu();
        
        // Fast re-initialize scroll animations
        setTimeout(initScrollAnimations, 10);
    }

    function closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) navMenu.classList.remove('active');
    }

    // Event listeners for navigation
    Object.entries(navLinks).forEach(([pageId, link]) => {
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(pageId);
            });
        }
    });

    // Home link
    const homeLink = document.getElementById('home-link');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
        });
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });

        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) navMenu.classList.toggle('active');
        });
    }

    // Home page buttons
    const startChatHome = document.getElementById('start-chat-home');
    if (startChatHome) {
        startChatHome.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('chat');
        });
    }

    const learnMore = document.getElementById('learn-more');
    if (learnMore) {
        learnMore.addEventListener('click', (e) => {
            e.preventDefault();
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Footer navigation
    const footerLinks = document.querySelectorAll('.footer-nav-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (pages[target]) {
                navigateTo(target);
            }
        });
    });

    console.log("✅ Navigation initialized");
}

// Initialize chat functionality
function initializeChat() {
    console.log("💬 Initializing chat...");
    
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    if (!chatMessages || !userInput || !sendButton) return;

    // Chat state
    let conversationHistory = [
        { role: 'assistant', content: "Hello! I'm Zephyrinx AI, your intelligent AI assistant. How can I help you today?" }
    ];

    // Function to add message to chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = text;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        contentDiv.appendChild(messageText);
        contentDiv.appendChild(timeSpan);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        conversationHistory.push({
            role: isUser ? 'user' : 'assistant',
            content: text
        });
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return typingDiv;
    }
    
    // Function to call GROQ API
    async function callGroqAPI(userMessage) {
        try {
            sendButton.innerHTML = '<div class="spinner"></div>';
            sendButton.disabled = true;
            
            conversationHistory.push({ role: 'user', content: userMessage });
            
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": GROQ_MODEL,
                    "messages": conversationHistory,
                    "temperature": 0.7,
                    "max_tokens": 1024,
                    "stream": false
                })
            });
            
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            
            const data = await response.json();
            sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
            sendButton.disabled = false;
            
            return data.choices?.[0]?.message?.content || 'No response from AI';
            
        } catch (error) {
            console.error('API Error:', error);
            sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
            sendButton.disabled = false;
            throw error;
        }
    }
    
    // Function to handle bot response
    async function botRespond(userMessage) {
        const typingIndicator = showTypingIndicator();
        
        try {
            const response = await callGroqAPI(userMessage);
            if (typingIndicator.parentNode) {
                chatMessages.removeChild(typingIndicator);
            }
            addMessage(response, false);
        } catch (error) {
            if (typingIndicator.parentNode) {
                chatMessages.removeChild(typingIndicator);
            }
            
            let errorMessage = "Sorry, an error occurred. Please try again.";
            if (error.message.includes('API error: 401') || error.message.includes('API error: 403')) {
                errorMessage = "API access issue. Please check your API key.";
            } else if (error.message.includes('API error: 429')) {
                errorMessage = "Too many requests. Please wait a moment.";
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage = "Connection issue. Check your internet.";
            }
            
            addMessage(errorMessage, false);
        }
    }
    
    // Event listeners for chat
    sendButton.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            botRespond(message);
        }
    });
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, true);
                userInput.value = '';
                botRespond(message);
            }
        }
    });

    console.log("✅ Chat initialized");
}

// Fast Scroll Animation Functionality
function initScrollAnimations() {
    // Disconnect previous observer
    if (scrollObserver) {
        scrollObserver.disconnect();
    }
    
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    // Reset all animations first
    animatedElements.forEach(element => {
        element.classList.remove('animated');
    });
    
    // Create fast observer with immediate trigger
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Immediate animation with minimal delay
                const element = entry.target;
                const delay = Math.min(Array.from(animatedElements).indexOf(element) * 50, 300); // Max 300ms delay
                
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay);
            }
        });
    }, {
        threshold: 0.05, // Lower threshold for faster triggering
        rootMargin: '0px 0px -10px 0px' // Trigger earlier
    });
    
    // Observe all elements
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    console.log(`🎯 Scroll animations initialized for ${animatedElements.length} elements`);
}

// Pre-animate elements that are already visible
function preAnimateVisibleElements() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    const viewportHeight = window.innerHeight;
    
    animatedElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        
        // If element is in viewport, animate immediately
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const delay = Math.min(index * 30, 200); // Very short delays
            setTimeout(() => {
                element.classList.add('animated');
            }, delay);
        }
    });
}

// Performance optimizations
window.addEventListener('load', function() {
    console.log("📄 Page fully loaded - optimizing animations");
    // Re-trigger animations for any missed elements
    setTimeout(initScrollAnimations, 100);
});

// Handle resize for responsive animations
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initScrollAnimations, 100);
});

// Check if API key is set
if (GROQ_API_KEY === "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") {
    console.warn("⚠️ GROQ API key is not set. Please replace the GROQ_API_KEY value with your API key.");
}

// Global access
window.ZephyrinxAI = {
    initializeApp,
    initScrollAnimations,
    navigateToPage: function(page) {
        const pages = ['home', 'features', 'chat', 'about'];
        if (pages.includes(page)) {
            const navLink = document.getElementById(`${page}-nav-link`);
            if (navLink) navLink.click();
        }
    }
};