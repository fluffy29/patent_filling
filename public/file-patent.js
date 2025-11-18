// File Patent Page JavaScript
checkAuth();

let currentStep = 1;
const totalSteps = 4;

// Update progress bar
function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Update step indicators
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        if (index < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index === currentStep - 1) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Navigate to next step
function nextStep() {
    const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = currentStepEl.querySelectorAll('input[required], textarea[required], select[required]');
    
    // Validate current step
    let valid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            valid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (!valid) {
        alert('Please fill in all required fields before proceeding.');
        return;
    }
    
    if (currentStep < totalSteps) {
        currentStepEl.classList.remove('active');
        currentStep++;
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        updateProgress();
        updateNavigationButtons();
        
        if (currentStep === totalSteps) {
            updateReview();
        }
        
        window.scrollTo(0, 0);
    }
}

// Navigate to previous step
function prevStep() {
    if (currentStep > 1) {
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
        currentStep--;
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        updateProgress();
        updateNavigationButtons();
        window.scrollTo(0, 0);
    }
}

// Update navigation buttons visibility
function updateNavigationButtons() {
    document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = currentStep === totalSteps ? 'none' : 'inline-block';
    document.getElementById('submitBtn').style.display = currentStep === totalSteps ? 'inline-block' : 'none';
}

// Update review section
function updateReview() {
    const form = document.getElementById('filingForm');
    document.getElementById('reviewPatentType').textContent = form.patentType.options[form.patentType.selectedIndex].text;
    document.getElementById('reviewTitle').textContent = form.title.value;
    document.getElementById('reviewCategory').textContent = form.category.options[form.category.selectedIndex].text;
    document.getElementById('reviewAbstract').textContent = form.abstract.value;
    document.getElementById('reviewProblem').textContent = form.problem.value;
    document.getElementById('reviewAudience').textContent = form.audience.value;
    document.getElementById('reviewDescription').textContent = form.description.value;
    document.getElementById('reviewAdvantages').textContent = form.advantages.value;
    document.getElementById('reviewClaims').textContent = form.claims.value;
}

// Mock AI claim generation
function generateClaims() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    
    if (!title || !description) {
        alert('Please fill in the title and technical description first.');
        return;
    }
    
    const claims = `1. A ${title.toLowerCase()} comprising:
   - A primary component configured to perform the core function;
   - A secondary component operatively connected to the primary component;
   - A control mechanism for managing the operation of said primary and secondary components;
   
2. The apparatus of claim 1, wherein the primary component includes sensors configured to collect data.

3. The apparatus of claim 1, further comprising a user interface for interaction and control.

4. A method for operating ${title.toLowerCase()}, the method comprising:
   - Activating the primary component;
   - Processing data from the sensors;
   - Providing output to the user via the interface;
   
5. The method of claim 4, wherein the processing includes real-time analysis and feedback.

6. The apparatus of claim 1, wherein the control mechanism includes:
   - A processor configured to execute instructions;
   - Memory for storing data and configuration;
   - Communication interface for external connectivity.`;
    
    document.getElementById('claims').value = claims;
    showToast('Claims generated successfully! Review and edit as needed.', 'success');
}

// Mock AI description improvement
function improveDescription() {
    const description = document.getElementById('description').value;
    if (!description) {
        alert('Please enter a technical description first.');
        return;
    }
    showToast('AI enhancement coming soon! This feature will improve your description.', 'info');
}

// Update cost summary
document.querySelectorAll('input[type="checkbox"][name^="legal"], input[type="checkbox"][name^="prior"], input[type="checkbox"][name^="expedited"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateCostSummary);
});

function updateCostSummary() {
    let total = 500;
    
    const legalReview = document.getElementById('legalReview');
    const priorArt = document.getElementById('priorArtSearch');
    const expedited = document.getElementById('expeditedFiling');
    
    if (legalReview && legalReview.checked) {
        document.getElementById('legalReviewCost').style.display = 'flex';
        total += 200;
    } else if (document.getElementById('legalReviewCost')) {
        document.getElementById('legalReviewCost').style.display = 'none';
    }
    
    if (priorArt && priorArt.checked) {
        document.getElementById('priorArtCost').style.display = 'flex';
        total += 150;
    } else if (document.getElementById('priorArtCost')) {
        document.getElementById('priorArtCost').style.display = 'none';
    }
    
    if (expedited && expedited.checked) {
        document.getElementById('expeditedCost').style.display = 'flex';
        total += 100;
    } else if (document.getElementById('expeditedCost')) {
        document.getElementById('expeditedCost').style.display = 'none';
    }
    
    document.getElementById('totalCost').textContent = '$' + total;
}

// Form submission
document.getElementById('filingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        id: 'patent-' + Date.now(),
        title: formData.get('title'),
        abstract: formData.get('abstract'),
        problem: formData.get('problem'),
        audience: formData.get('audience'),
        description: formData.get('description'),
        claims: formData.get('claims'),
        patentType: formData.get('patentType'),
        category: formData.get('category'),
        advantages: formData.get('advantages'),
        status: 'draft',
        filedDate: new Date().toISOString().split('T')[0],
        user: JSON.parse(localStorage.getItem('user') || '{}').email || 'demo'
    };
    
    try {
        // Save to localStorage (demo mode)
        const patents = JSON.parse(localStorage.getItem('demoPatents') || '[]');
        patents.push(data);
        localStorage.setItem('demoPatents', JSON.stringify(patents));
        
        showToast('✅ Patent application submitted successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'manage-patents.html';
        }, 1500);
        
        // Also try to save to backend if available
        const token = localStorage.getItem('token');
        if (token && token !== 'demo-token-12345') {
            fetch('/api/filing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }).catch(err => console.log('Backend not available, using demo mode'));
        }
    } catch (error) {
        console.error('Submission error:', error);
        document.getElementById('submitError').textContent = 'Error saving patent. Please try again.';
    }
});

// Load user name
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    document.getElementById('userName').textContent = user.name;
}

// Initialize
updateProgress();
updateNavigationButtons();
