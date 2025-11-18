// Search Patents Page JavaScript
checkAuth();

// Load user name
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    document.getElementById('userName').textContent = user.name;
}

let currentPage = 1;
let totalPages = 10;
let searchResults = [];

// Handle search enter key
function handleSearchEnter(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

// Perform basic search
function performSearch() {
    const query = document.getElementById('mainSearch').value.trim();
    
    if (!query) {
        alert('Please enter a search term');
        return;
    }
    
    // Save to recent searches
    saveRecentSearch(query);
    
    // Mock search results
    generateMockResults(query);
    
    // Show results
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
}

// Perform advanced search
function performAdvancedSearch() {
    const query = document.getElementById('mainSearch').value.trim();
    const patentType = document.getElementById('patentType').value;
    const techField = document.getElementById('techField').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const inventor = document.getElementById('inventor').value;
    const assignee = document.getElementById('assignee').value;
    const status = document.getElementById('patentStatus').value;
    
    // Build search query
    let searchQuery = query || 'all patents';
    if (patentType) searchQuery += ` (${patentType})`;
    if (techField) searchQuery += ` in ${techField}`;
    
    generateMockResults(searchQuery);
    
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    showToast('Advanced search performed', 'success');
}

// Quick search
function quickSearch(query) {
    document.getElementById('mainSearch').value = query;
    performSearch();
}

// Generate mock results
function generateMockResults(query) {
    // Get patents from localStorage to include user's own patents
    const userPatents = JSON.parse(localStorage.getItem('demoPatents') || '[]');
    
    const mockPatents = [
        {
            id: 'US10123456',
            title: 'Smart Water Bottle with Hydration Tracking System',
            abstract: 'A water bottle device comprising sensors for monitoring water consumption and providing real-time hydration feedback to users via a mobile application.',
            inventor: 'John Smith',
            assignee: 'HydroTech Inc.',
            date: '2020-11-10',
            status: 'Active',
            field: 'Consumer Electronics'
        },
        {
            id: 'US10234567',
            title: 'Method and Apparatus for Real-Time Health Monitoring',
            abstract: 'A wearable device system for continuously monitoring vital signs including heart rate, blood pressure, and temperature with cloud-based analytics.',
            inventor: 'Sarah Johnson',
            assignee: 'HealthTrack LLC',
            date: '2021-03-15',
            status: 'Active',
            field: 'Medical Devices'
        },
        {
            id: 'US10345678',
            title: 'Artificial Intelligence System for Predictive Maintenance',
            abstract: 'Machine learning algorithms for predicting equipment failures in industrial settings by analyzing sensor data patterns and historical maintenance records.',
            inventor: 'Michael Chen',
            assignee: 'IndustriAI Corp',
            date: '2019-08-22',
            status: 'Active',
            field: 'Industrial Automation'
        },
        {
            id: 'US10456789',
            title: 'Biodegradable Packaging Material from Agricultural Waste',
            abstract: 'Novel composition of biodegradable packaging materials derived from agricultural waste products, providing eco-friendly alternative to plastic packaging.',
            inventor: 'Maria Rodriguez',
            assignee: 'EcoPackage Solutions',
            date: '2022-01-30',
            status: 'Pending',
            field: 'Materials Science'
        },
        {
            id: 'US10567890',
            title: 'Drone-Based Delivery System with Autonomous Navigation',
            abstract: 'Unmanned aerial vehicle system for package delivery with advanced obstacle avoidance and route optimization capabilities.',
            inventor: 'David Park',
            assignee: 'AirDeliver Technologies',
            date: '2021-06-18',
            status: 'Active',
            field: 'Transportation'
        }
    ];
    
    searchResults = mockPatents;
    renderResults();
    document.getElementById('resultCount').textContent = `${searchResults.length} results found`;
}

// Render search results
function renderResults() {
    const container = document.getElementById('resultsList');
    
    container.innerHTML = searchResults.map(patent => `
        <div class="result-card" onclick="viewPatentDetail('${patent.id}')">
            <div class="result-header">
                <h3>${patent.title}</h3>
                <span class="patent-number">${patent.id}</span>
            </div>
            <p class="result-abstract">${patent.abstract}</p>
            <div class="result-meta">
                <span class="meta-tag">👤 ${patent.inventor}</span>
                <span class="meta-tag">🏢 ${patent.assignee}</span>
                <span class="meta-tag">📅 ${patent.date}</span>
                <span class="meta-tag status-${patent.status.toLowerCase()}">${patent.status}</span>
            </div>
            <div class="result-actions">
                <button class="btn-sm btn-secondary" onclick="savePatent('${patent.id}', event)">Save</button>
                <button class="btn-sm btn-secondary" onclick="comparePatent('${patent.id}', event)">Compare</button>
                <button class="btn-sm btn-primary" onclick="viewPatentDetail('${patent.id}')">View Details</button>
            </div>
        </div>
    `).join('');
}

// View patent detail
function viewPatentDetail(patentId) {
    const patent = searchResults.find(p => p.id === patentId);
    if (!patent) return;
    
    document.getElementById('patentDetailContent').innerHTML = `
        <h2>${patent.title}</h2>
        <div class="patent-detail-header">
            <span class="patent-number-large">${patent.id}</span>
            <span class="patent-status status-${patent.status.toLowerCase()}">${patent.status}</span>
        </div>
        <div class="detail-grid">
            <div class="detail-item">
                <strong>Inventor:</strong>
                <p>${patent.inventor}</p>
            </div>
            <div class="detail-item">
                <strong>Assignee:</strong>
                <p>${patent.assignee}</p>
            </div>
            <div class="detail-item">
                <strong>Filing Date:</strong>
                <p>${patent.date}</p>
            </div>
            <div class="detail-item">
                <strong>Technology Field:</strong>
                <p>${patent.field}</p>
            </div>
        </div>
        <div class="detail-section">
            <h3>Abstract</h3>
            <p>${patent.abstract}</p>
        </div>
        <div class="detail-section">
            <h3>Claims</h3>
            <p>Detailed patent claims would appear here in a real implementation.</p>
        </div>
        <div class="detail-actions">
            <button class="btn-primary" onclick="downloadPatentPDF('${patent.id}')">Download PDF</button>
            <button class="btn-secondary" onclick="savePatent('${patent.id}')">Save to My Library</button>
        </div>
    `;
    
    document.getElementById('patentDetailModal').style.display = 'flex';
}

// Save patent
function savePatent(id, event) {
    if (event) event.stopPropagation();
    showToast('Patent saved to your library!', 'success');
}

// Compare patent
function comparePatent(id, event) {
    if (event) event.stopPropagation();
    showToast('Compare feature coming soon!', 'info');
}

// Download patent PDF
function downloadPatentPDF(id) {
    showToast('PDF download feature coming soon!', 'info');
}

// Toggle advanced search
function toggleAdvanced() {
    const panel = document.getElementById('advancedSearch');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// Reset filters
function resetFilters() {
    document.getElementById('patentType').value = '';
    document.getElementById('techField').value = '';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    document.getElementById('inventor').value = '';
    document.getElementById('assignee').value = '';
    document.getElementById('patentStatus').value = '';
}

// Change view
function setView(view) {
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const container = document.getElementById('resultsList');
    if (view === 'grid') {
        container.classList.add('results-grid');
    } else {
        container.classList.remove('results-grid');
    }
}

// Pagination
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updatePageInfo();
        window.scrollTo(0, 0);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePageInfo();
        window.scrollTo(0, 0);
    }
}

function updatePageInfo() {
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
}

// Save recent search
function saveRecentSearch(query) {
    let recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    recent = [query, ...recent.filter(q => q !== query)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(recent));
    loadRecentSearches();
}

// Load recent searches
function loadRecentSearches() {
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const container = document.getElementById('recentSearchesList');
    
    if (recent.length === 0) {
        container.innerHTML = '<p class="empty-state">No recent searches</p>';
        return;
    }
    
    container.innerHTML = recent.map(query => `
        <div class="recent-item" onclick="quickSearch('${query}')">
            <span>🔍 ${query}</span>
        </div>
    `).join('');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Initialize
loadRecentSearches();
