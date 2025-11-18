// Manage Patents Page JavaScript
checkAuth();

// Load user name
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    document.getElementById('userName').textContent = user.name;
}

// Patent data
let allPatents = [];

// Load patents from localStorage
async function loadPatents() {
    try {
        // Load from localStorage (demo mode)
        allPatents = JSON.parse(localStorage.getItem('demoPatents') || '[]');
        updateStats();
        renderPatents(allPatents);
        
        // Also try to fetch from backend if available
        const token = localStorage.getItem('token');
        if (token && token !== 'demo-token-12345') {
            fetch('/api/filing/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.filings) {
                    // Merge with demo data
                    allPatents = [...allPatents, ...data.filings];
                    updateStats();
                    renderPatents(allPatents);
                }
            })
            .catch(err => console.log('Backend not available, using demo mode'));
        }
    } catch (error) {
        console.error('Load error:', error);
        document.getElementById('patentsList').innerHTML = '<p class="empty-state">Error loading patents</p>';
    }
}

// Update stats
function updateStats() {
    const total = allPatents.length;
    const draft = allPatents.filter(p => p.status === 'draft').length;
    const submitted = allPatents.filter(p => p.status === 'submitted').length;
    const reviewing = allPatents.filter(p => p.status === 'reviewing').length;
    const approved = allPatents.filter(p => p.status === 'approved').length;
    
    document.getElementById('totalPatents').textContent = total;
    document.getElementById('draftPatents').textContent = draft;
    document.getElementById('pendingPatents').textContent = submitted + reviewing;
    document.getElementById('approvedPatents').textContent = approved;
}

// Render patents list
function renderPatents(patents) {
    const container = document.getElementById('patentsList');
    
    if (patents.length === 0) {
        container.innerHTML = '<p class="empty-state">No patents found. <a href="file-patent.html">File your first patent</a></p>';
        return;
    }
    
    container.innerHTML = patents.map(patent => `
        <div class="patent-card" onclick="viewPatent('${patent.id || patent._id}')">
            <div class="patent-header">
                <h3>${patent.title}</h3>
                <span class="patent-status status-${patent.status}">${patent.status}</span>
            </div>
            <p class="patent-abstract">${patent.abstract.substring(0, 150)}...</p>
            <div class="patent-meta">
                <span class="meta-item">📅 ${new Date(patent.filedDate || patent.createdAt).toLocaleDateString()}</span>
                <span class="meta-item">📋 ${patent.patentType || 'Utility'}</span>
                <span class="meta-item">🏷️ ${patent.category || 'General'}</span>
            </div>
            <div class="patent-actions">
                <button class="btn-sm btn-secondary" onclick="editPatent('${patent.id || patent._id}', event)">Edit</button>
                <button class="btn-sm btn-secondary" onclick="downloadPatent('${patent.id || patent._id}', event)">Download</button>
                <button class="btn-sm btn-danger" onclick="deletePatent('${patent.id || patent._id}', event)">Delete</button>
            </div>
        </div>
    `).join('');
}

// Filter patents
function filterPatents() {
    const status = document.getElementById('statusFilter').value;
    let filtered = allPatents;
    
    if (status !== 'all') {
        filtered = allPatents.filter(p => p.status === status);
    }
    
    renderPatents(filtered);
}

// Sort patents
function sortPatents() {
    const sortBy = document.getElementById('sortFilter').value;
    let sorted = [...allPatents];
    
    switch(sortBy) {
        case 'newest':
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'oldest':
            sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case 'title':
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'status':
            sorted.sort((a, b) => a.status.localeCompare(b.status));
            break;
    }
    
    renderPatents(sorted);
}

// Search patents
function searchPatents() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const filtered = allPatents.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.abstract.toLowerCase().includes(query)
    );
    renderPatents(filtered);
}

// View patent details
async function viewPatent(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/filing/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            const patent = data.filing;
            document.getElementById('patentDetail').innerHTML = `
                <h2>${patent.title}</h2>
                <div class="patent-detail-meta">
                    <span class="patent-status status-${patent.status}">${patent.status}</span>
                    <span>Filed: ${new Date(patent.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="detail-section">
                    <h3>Abstract</h3>
                    <p>${patent.abstract}</p>
                </div>
                <div class="detail-section">
                    <h3>Problem Statement</h3>
                    <p>${patent.problem}</p>
                </div>
                <div class="detail-section">
                    <h3>Target Audience</h3>
                    <p>${patent.audience}</p>
                </div>
                <div class="detail-section">
                    <h3>Technical Description</h3>
                    <p>${patent.description}</p>
                </div>
                <div class="detail-section">
                    <h3>Claims</h3>
                    <pre>${patent.claims}</pre>
                </div>
            `;
            document.getElementById('patentModal').style.display = 'flex';
        }
    } catch (error) {
        console.error('View error:', error);
        showToast('Error loading patent details', 'error');
    }
}

// Edit patent
function editPatent(id, event) {
    event.stopPropagation();
    showToast('Edit feature coming soon!', 'info');
}

// Download patent
function downloadPatent(id, event) {
    event.stopPropagation();
    showToast('PDF download feature coming soon!', 'info');
}

// Delete patent
async function deletePatent(id, event) {
    event.stopPropagation();
    if (!confirm('Are you sure you want to delete this patent?')) return;
    
    showToast('Delete feature coming soon!', 'info');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Initialize
loadPatents();
