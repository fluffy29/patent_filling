// ==========================================
// DEMO DATA INITIALIZATION
// ==========================================

function initializeDemoData() {
    // Initialize demo patents if not exists
    if (!localStorage.getItem('demoPatents')) {
        const demoPatents = [
            {
                id: 'demo-1',
                title: 'Smart Water Bottle with Hydration Tracking',
                abstract: 'A water bottle equipped with sensors that track daily water intake and provide hydration reminders through a mobile app.',
                problem: 'People often forget to drink enough water throughout the day, leading to dehydration.',
                audience: 'Health-conscious individuals, athletes, and fitness enthusiasts.',
                description: 'The smart bottle uses capacitive sensors to detect water level changes and syncs with a mobile application via Bluetooth.',
                claims: '1. A water bottle comprising sensors for tracking fluid consumption...',
                status: 'approved',
                filedDate: '2024-08-15',
                user: 'demo',
                category: 'Health & Wellness'
            },
            {
                id: 'demo-2',
                title: 'AI-Powered Study Assistant App',
                abstract: 'Mobile application using artificial intelligence to create personalized study plans and track learning progress.',
                problem: 'Students struggle to organize study schedules effectively and retain information.',
                audience: 'Students, educators, and lifelong learners.',
                description: 'Uses machine learning algorithms to analyze study patterns and optimize learning schedules based on individual performance.',
                claims: '1. An educational application comprising AI algorithms for personalized learning...',
                status: 'reviewing',
                filedDate: '2024-10-22',
                user: 'demo',
                category: 'Education'
            },
            {
                id: 'demo-3',
                title: 'Biodegradable Food Packaging Material',
                abstract: 'Eco-friendly packaging material that decomposes naturally within 30 days without leaving harmful residue.',
                problem: 'Traditional plastic packaging contributes to environmental pollution.',
                audience: 'Food manufacturers, restaurants, and environmentally conscious consumers.',
                description: 'Made from plant-based polymers and natural fibers that break down through composting.',
                claims: '1. A biodegradable packaging material comprising plant-based polymers...',
                status: 'submitted',
                filedDate: '2024-11-05',
                user: 'demo',
                category: 'Environmental'
            }
        ];
        localStorage.setItem('demoPatents', JSON.stringify(demoPatents));
    }

    // Initialize demo attorneys if not exists
    if (!localStorage.getItem('demoAttorneys')) {
        const demoAttorneys = [
            {
                id: 'attorney-1',
                name: 'Dr. Sarah Johnson',
                specialty: 'Technology & Software Patents',
                experience: '15 years',
                rating: 4.9,
                consultations: 250,
                availability: 'available'
            },
            {
                id: 'attorney-2',
                name: 'Michael Chen',
                specialty: 'Mechanical & Engineering',
                experience: '12 years',
                rating: 4.8,
                consultations: 180,
                availability: 'available'
            },
            {
                id: 'attorney-3',
                name: 'Emily Rodriguez',
                specialty: 'Biotech & Pharmaceuticals',
                experience: '10 years',
                rating: 4.9,
                consultations: 200,
                availability: 'busy'
            }
        ];
        localStorage.setItem('demoAttorneys', JSON.stringify(demoAttorneys));
    }
}

// Call initialization on page load
initializeDemoData();

// ==========================================
// AUTHENTICATION & AUTHORIZATION
// ==========================================

function checkAuth() {
    const token = localStorage.getItem('token');
    const protectedPages = ['dashboard.html', 'wizard.html', 'file-patent.html', 'legal-help.html', 'manage-patents.html', 'search-patents.html', 'my-filings.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !token) {
        // For demo purposes, create a demo user
        const demoUser = {
            id: 'demo-user',
            name: 'Demo User',
            email: 'demo@patentplatform.com'
        };
        localStorage.setItem('user', JSON.stringify(demoUser));
        localStorage.setItem('token', 'demo-token-12345');
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// ==========================================
// MOBILE NAVIGATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Add active class to navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});

// ==========================================
// SMOOTH SCROLLING FOR LANDING PAGE
// ========================================== */

// ==========================================
// FORM VALIDATION HELPERS
// ==========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function clearError(elementId) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

// ==========================================
// API HELPERS
// ==========================================

async function apiCall(endpoint, method = 'GET', body = null, requireAuth = false) {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    if (requireAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    
    const options = {
        method,
        headers
    };
    
    if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(endpoint, options);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ==========================================
// LOADING STATES
// ==========================================

function showLoading(buttonElement, text = 'Loading...') {
    if (buttonElement) {
        buttonElement.disabled = true;
        buttonElement.dataset.originalText = buttonElement.textContent;
        buttonElement.textContent = text;
    }
}

function hideLoading(buttonElement) {
    if (buttonElement && buttonElement.dataset.originalText) {
        buttonElement.disabled = false;
        buttonElement.textContent = buttonElement.dataset.originalText;
    }
}

// ==========================================
// DATE FORMATTING
// ==========================================

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return formatDate(dateString);
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#34C759' : type === 'error' ? '#FF3B30' : '#3A59FF'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// LOCAL STORAGE HELPERS
// ==========================================

function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Storage error:', error);
        return false;
    }
}

function getFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Storage error:', error);
        return defaultValue;
    }
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Storage error:', error);
        return false;
    }
}

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add animation on scroll
    const observeElements = document.querySelectorAll('.slide, .feature-card, .problem-card');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    observeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// EXPORT FOR MODULE USAGE (if needed)
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkAuth,
        logout,
        validateEmail,
        validatePassword,
        apiCall,
        showToast,
        formatDate,
        formatRelativeTime
    };
}
