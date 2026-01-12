// ==================== FORM VALIDATION ====================

/**
 * Contact Form Validation & Enhancement
 * Add this script to your HTML file before closing </body> tag
 */

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize form validation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Add event listener to email input for real-time validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmailField(this);
        });
    }
    
    // Add form submit handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Form is valid - you can submit it here
            console.log('Form submitted successfully');
            // submitForm(this);
            
            // For now, just show success message
            showSuccessMessage('Message sent successfully! I\'ll get back to you soon.');
            this.reset();
        }
    });
});

/**
 * Validate email field
 */
function validateEmailField(inputElement) {
    const email = inputElement.value.trim();
    
    if (!email) {
        inputElement.classList.remove('error');
        return true;
    }
    
    if (!isValidEmail(email)) {
        inputElement.classList.add('error');
        return false;
    }
    
    inputElement.classList.remove('error');
    return true;
}

/**
 * Validate entire form
 */
function validateForm(formElement) {
    let isValid = true;
    
    // Get all required inputs
    const requiredInputs = formElement.querySelectorAll('[required]');
    
    requiredInputs.forEach(input => {
        const value = input.value.trim();
        
        // Check if empty
        if (!value) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
        
        // Special validation for email
        if (input.type === 'email' && value) {
            if (!isValidEmail(value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    if (!isValid) {
        showErrorMessage('Please fill in all required fields correctly');
    }
    
    return isValid;
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    const messageDiv = createMessageElement(message, 'success');
    insertMessageAboveForm(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

/**
 * Show error message
 */
function showErrorMessage(message) {
    const messageDiv = createMessageElement(message, 'error');
    insertMessageAboveForm(messageDiv);
}

/**
 * Create message element
 */
function createMessageElement(message, type) {
    const div = document.createElement('div');
    div.className = `form-message form-message-${type}`;
    div.textContent = message;
    div.style.cssText = `
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        animation: slideInDown 0.3s ease;
        ${type === 'success' 
            ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    return div;
}

/**
 * Insert message above form
 */
function insertMessageAboveForm(messageElement) {
    const form = document.getElementById('contactForm');
    if (form) {
        form.parentNode.insertBefore(messageElement, form);
    }
}

// ==================== HERO SECTION ENHANCEMENTS ====================

/**
 * Smooth scroll for navigation links
 */
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
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
});

// ==================== PROFILE IMAGE ENHANCEMENT ====================

/**
 * Add subtle parallax effect to profile image on scroll
 */
document.addEventListener('DOMContentLoaded', function() {
    const profileCircle = document.querySelector('.profile-circle');
    
    if (!profileCircle) return;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Only apply parallax on desktop and when hero is visible
        if (window.innerWidth > 768 && scrollY < window.innerHeight) {
            profileCircle.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
    });
});

// ==================== SKILLS CARD ANIMATION ====================

/**
 * Animate skills cards on scroll into view
 */
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index
                entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        observer.observe(card);
    });
});

// ==================== UTILITY: ADD ANIMATIONS TO CSS ====================

/**
 * These animations should be added to your style.css file if not already present
 * But they can also be injected via JavaScript:
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
