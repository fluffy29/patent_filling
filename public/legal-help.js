// Legal Help Page JavaScript
checkAuth();

// Load user name
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    document.getElementById('userName').textContent = user.name;
}

// Load attorneys from localStorage
function loadAttorneys() {
    const attorneys = JSON.parse(localStorage.getItem('demoAttorneys') || '[]');
    const container = document.getElementById('attorneysList');
    
    if (container && attorneys.length > 0) {
        // Update attorney cards if they exist in HTML
        attorneys.forEach((attorney, index) => {
            const card = document.querySelector(`.attorney-card[data-index="${index}"]`);
            if (card) {
                card.querySelector('.attorney-name').textContent = attorney.name;
                card.querySelector('.attorney-specialty').textContent = attorney.specialty;
                card.querySelector('.attorney-experience').textContent = attorney.experience;
                card.querySelector('.attorney-rating').textContent = attorney.rating;
            }
        });
    }
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAttorneys);
} else {
    loadAttorneys();
}

// Open consultation modal
function openConsultationModal() {
    document.getElementById('consultationModal').style.display = 'flex';
}

// Open question modal
function openQuestionModal() {
    document.getElementById('questionModal').style.display = 'flex';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Request document review
function requestReview() {
    showToast('Document review request feature coming soon!', 'info');
}

// Order prior art search
function orderPriorArt() {
    showToast('Prior art search ordering feature coming soon!', 'info');
}

// View attorney profile
function viewAttorney(id) {
    showToast('Attorney profile viewing feature coming soon!', 'info');
}

// Submit consultation request
function submitConsultation(e) {
    e.preventDefault();
    showToast('Consultation request submitted! We\'ll contact you within 24 hours.', 'success');
    closeModal('consultationModal');
    e.target.reset();
}

// Submit question
function submitQuestion(e) {
    e.preventDefault();
    showToast('Question submitted! You\'ll receive a response within 24 hours.', 'success');
    closeModal('questionModal');
    e.target.reset();
}

// Toggle FAQ
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('.faq-icon');
    
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '−';
    } else {
        answer.style.maxHeight = '0';
        icon.textContent = '+';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
