// Main JavaScript functionality for Robotic Concrete website

// Configuration
const CONFIG = {
    apiEndpoint: 'https://api.roboticconcrete.com/contact', // Replace with actual API endpoint
    bearerToken: 'your-bearer-token-here', // Replace with actual Bearer token
    chatEndpoint: 'https://api.roboticconcrete.com/chat', // Replace with your Azure OpenAI endpoint
    chatBearerToken: 'your-chat-bearer-token-here', // Replace with your chat API token
    animationOffset: 100,
    scrollDuration: 800
};

// DOM Elements
const elements = {
    mobileToggle: document.getElementById('mobile-toggle'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    contactForm: document.getElementById('contact-form'),
    formMessage: document.getElementById('form-message'),
    portfolioItems: document.querySelectorAll('.portfolio-item'),
    header: document.querySelector('.header'),
    // Chat elements
    chatToggle: document.getElementById('chat-toggle'),
    chatToggleFloat: document.getElementById('chat-toggle-float'),
    chatWidget: document.getElementById('chat-widget'),
    chatClose: document.getElementById('chat-close'),
    chatMessages: document.getElementById('chat-messages'),
    chatInput: document.getElementById('chat-input'),
    chatSend: document.getElementById('chat-send'),
    chatTyping: document.getElementById('chat-typing'),
    chatBadge: document.getElementById('chat-badge')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScroll();
    initializeFormHandling();
    initializeAnimations();
    initializePortfolio();
    initializeHeaderScroll();
    initializeChat();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    if (elements.mobileToggle && elements.navMenu) {
        elements.mobileToggle.addEventListener('click', function() {
            elements.navMenu.classList.toggle('active');
            elements.mobileToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        elements.navLinks.forEach(link => {
            link.addEventListener('click', function() {
                elements.navMenu.classList.remove('active');
                elements.mobileToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!elements.navMenu.contains(event.target) && !elements.mobileToggle.contains(event.target)) {
                elements.navMenu.classList.remove('active');
                elements.mobileToggle.classList.remove('active');
            }
        });
    }
}

// Smooth scroll functionality
function initializeSmoothScroll() {
    elements.navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = elements.header ? elements.header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Form handling with API integration
function initializeFormHandling() {
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Add timestamp
            formObject.timestamp = new Date().toISOString();
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                const response = await fetch(CONFIG.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${CONFIG.bearerToken}`
                    },
                    body: JSON.stringify(formObject)
                });
                
                if (response.ok) {
                    showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
                    this.reset();
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

// Show form messages
function showFormMessage(message, type) {
    if (elements.formMessage) {
        elements.formMessage.textContent = message;
        elements.formMessage.className = `form-message ${type}`;
        elements.formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            elements.formMessage.style.display = 'none';
        }, 5000);
        
        // Scroll to message
        elements.formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: `0px 0px -${CONFIG.animationOffset}px 0px`
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .benefit-card, .step, .testimonial, .portfolio-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Portfolio functionality
function initializePortfolio() {
    elements.portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                // Toggle overlay visibility
                overlay.style.transform = overlay.style.transform === 'translateY(0px)' ? 'translateY(100%)' : 'translateY(0px)';
            }
        });
    });
}

// Header scroll behavior
function initializeHeaderScroll() {
    if (elements.header) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                elements.header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                elements.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                elements.header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                elements.header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--error-red)';
        } else {
            field.style.borderColor = 'var(--medium-gray)';
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = 'var(--error-red)';
        }
    }
    
    // Phone validation
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phoneField.value.replace(/\D/g, ''))) {
            isValid = false;
            phoneField.style.borderColor = 'var(--error-red)';
        }
    }
    
    return isValid;
}

// Contact form validation integration
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showFormMessage('Please fill in all required fields correctly.', 'error');
            }
        });
    }
});

// Add loading states for better UX
function addLoadingState(element, text = 'Loading...') {
    element.disabled = true;
    element.dataset.originalText = element.textContent;
    element.textContent = text;
}

function removeLoadingState(element) {
    element.disabled = false;
    element.textContent = element.dataset.originalText || element.textContent;
}

// Handle contact type changes
document.addEventListener('DOMContentLoaded', function() {
    const contactTypeSelect = document.getElementById('contact-type');
    const messageField = document.getElementById('message');
    
    if (contactTypeSelect && messageField) {
        contactTypeSelect.addEventListener('change', function() {
            const placeholderTexts = {
                'partnership': 'Tell us about your company and how you\'d like to partner with Robotic Concrete...',
                'demo': 'What type of project would you like to see demonstrated? When would be a good time?',
                'info': 'What specific information are you looking for? Any particular projects or services?',
                'consultation': 'Describe your project needs and timeline for a free consultation...',
                '': 'Tell us about your project or partnership goals...'
            };
            
            messageField.placeholder = placeholderTexts[this.value] || placeholderTexts[''];
        });
    }
});

// Add smooth reveal animation for hero content
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Initialize hero animation styles
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
}

// Add intersection observer for better performance
const resizeObserver = new ResizeObserver(entries => {
    // Handle any responsive adjustments if needed
});

// Observe main container for responsive adjustments
const mainContainer = document.querySelector('.container');
if (mainContainer) {
    resizeObserver.observe(mainContainer);
}

// Chat functionality
function initializeChat() {
    // Chat toggle functionality
    if (elements.chatToggle) {
        elements.chatToggle.addEventListener('click', toggleChat);
    }
    
    if (elements.chatToggleFloat) {
        elements.chatToggleFloat.addEventListener('click', toggleChat);
    }
    
    if (elements.chatClose) {
        elements.chatClose.addEventListener('click', closeChat);
    }
    
    // Chat input handling
    if (elements.chatInput) {
        elements.chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    if (elements.chatSend) {
        elements.chatSend.addEventListener('click', sendMessage);
    }
    
    // Hide floating button when chat is open
    if (elements.chatWidget) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (elements.chatWidget.classList.contains('active')) {
                        elements.chatToggleFloat.style.display = 'none';
                    } else {
                        elements.chatToggleFloat.style.display = 'flex';
                    }
                }
            });
        });
        observer.observe(elements.chatWidget, { attributes: true });
    }
}

function toggleChat() {
    if (elements.chatWidget) {
        elements.chatWidget.classList.toggle('active');
        if (elements.chatWidget.classList.contains('active')) {
            elements.chatInput.focus();
            hideChatBadge();
        }
    }
}

function closeChat() {
    if (elements.chatWidget) {
        elements.chatWidget.classList.remove('active');
    }
}

function sendMessage() {
    const message = elements.chatInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    elements.chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Send to Azure OpenAI
    sendToChatAPI(message);
}

function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    if (sender === 'user') {
        avatar.textContent = '👤';
    } else {
        // Use CeeCee's image for bot messages
        const ceeceeImg = document.createElement('img');
        ceeceeImg.src = 'images/CeeCee.png';
        ceeceeImg.alt = 'CeeCee';
        ceeceeImg.className = 'ceecee-message-avatar';
        avatar.appendChild(ceeceeImg);
    }
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = `<p>${content}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    elements.chatMessages.appendChild(messageDiv);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function showTypingIndicator() {
    elements.chatTyping.style.display = 'flex';
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    elements.chatTyping.style.display = 'none';
}

function showChatBadge() {
    if (elements.chatBadge) {
        elements.chatBadge.style.display = 'flex';
    }
}

function hideChatBadge() {
    if (elements.chatBadge) {
        elements.chatBadge.style.display = 'none';
    }
}

async function sendToChatAPI(message) {
    try {
        const response = await fetch(CONFIG.chatEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.chatBearerToken}`
            },
            body: JSON.stringify({
                message: message,
                context: '3d_concrete_printing',
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            hideTypingIndicator();
            addMessage(data.response, 'bot');
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Chat API error:', error);
        hideTypingIndicator();
        addMessage('Sorry, I\'m having trouble connecting right now. Please try again later or contact us directly.', 'bot');
    }
}

// Fallback responses for when API is not available
const fallbackResponses = {
    'hello': 'Hello! I\'m CeeCee, your 3D concrete printing assistant. How can I help you today?',
    'services': 'We offer hardscapes, outbuildings, custom fireplaces, outdoor kitchens, and outdoor signs. We also have homes coming soon!',
    'technology': 'Our 3D concrete printing technology uses computer-controlled robotic systems to create complex architectural forms with precision and speed.',
    'partnership': 'We offer comprehensive partnership opportunities including training, co-marketing, and technical support. Contact us to learn more!',
    'pricing': 'Pricing varies based on project complexity and materials. Contact us for a free consultation and quote.',
    'contact': 'You can reach us at (555) 123-4567 or partners@roboticconcrete.com. We serve the Greater Boston area.'
};

function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return 'That\'s a great question! I\'d be happy to connect you with our team for more detailed information. Would you like to schedule a consultation?';
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        showFormMessage,
        CONFIG,
        toggleChat,
        sendMessage,
        addMessage
    };
}
