// No-Gas-Labs Ecosystem Map Application

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderDomains();
    renderGaps();
    setupFilterButtons();
    updateStats();
}

function renderDomains() {
    const container = document.getElementById('domains');
    container.innerHTML = '';
    
    ecosystemData.domains.forEach(domain => {
        const card = createDomainCard(domain);
        container.appendChild(card);
    });
}

function createDomainCard(domain) {
    const card = document.createElement('div');
    card.className = 'domain-card';
    card.dataset.domainId = domain.id;
    
    const repoCount = domain.repositories.length;
    
    card.innerHTML = `
        <div class="domain-header">
            <div class="domain-title">
                <div class="domain-icon ${domain.colorClass}">${domain.icon}</div>
                <span class="domain-name">${domain.name}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <span class="domain-count">${repoCount} repos</span>
                <span class="domain-chevron">▼</span>
            </div>
        </div>
        <div class="domain-description">${domain.description}</div>
        <div class="repo-list">
            ${domain.repositories.map(repo => createRepoItem(repo)).join('')}
        </div>
    `;
    
    // Add click handler for expand/collapse
    const header = card.querySelector('.domain-header');
    header.addEventListener('click', () => {
        card.classList.toggle('expanded');
    });
    
    return card;
}

function createRepoItem(repo) {
    const statusClass = repo.status.toLowerCase();
    const androidFlag = repo.android === 'HIGH' ? '<span class="flag android-high">Android-Ready</span>' : '';
    const privateFlag = repo.isPrivate ? '<span class="flag private">Private</span>' : '';
    const duplicateFlag = repo.duplicate ? `<span class="flag">Similar: ${repo.duplicate}</span>` : '';
    const deploymentFlag = repo.deployment ? `<span class="flag">${repo.deployment}</span>` : '';
    
    return `
        <div class="repo-item">
            <div class="repo-header">
                <span class="repo-name">${repo.name}</span>
                <span class="repo-status ${statusClass}">${repo.status}</span>
            </div>
            <div class="repo-meta">
                <span class="repo-meta-item">📝 ${repo.language}</span>
                ${repo.deployment ? `<span class="repo-meta-item">🚀 ${repo.deployment}</span>` : ''}
            </div>
            <div class="repo-purpose">${repo.purpose}</div>
            <div class="repo-flags">
                ${androidFlag}
                ${privateFlag}
                ${deploymentFlag}
                ${duplicateFlag}
            </div>
        </div>
    `;
}

function renderGaps() {
    const container = document.getElementById('gaps');
    container.innerHTML = '';
    
    ecosystemData.gaps.forEach(gap => {
        const gapEl = document.createElement('div');
        gapEl.className = `gap-item ${gap.severity.toLowerCase()}`;
        gapEl.innerHTML = `
            <div class="gap-id">${gap.id}</div>
            <div class="gap-description">${gap.description}</div>
            <span class="gap-severity ${gap.severity.toLowerCase()}">${gap.severity}</span>
        `;
        container.appendChild(gapEl);
    });
}

function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterDomains(filter);
        });
    });
}

function filterDomains(filter) {
    const cards = document.querySelectorAll('.domain-card');
    
    cards.forEach(card => {
        const domainId = card.dataset.domainId;
        
        if (filter === 'all') {
            card.style.display = 'block';
        } else {
            // Map filter to domain IDs
            const filterMap = {
                'arena': ['arena'],
                'ninja': ['ninja'],
                'agp': ['agp'],
                'defi': ['defi'],
                'def4us': ['def4us'],
                'ngl': ['ngl', 'infra']
            };
            
            const matchingIds = filterMap[filter] || [];
            card.style.display = matchingIds.includes(domainId) ? 'block' : 'none';
        }
    });
}

function updateStats() {
    // Calculate stats from data
    let totalRepos = 0;
    let privateRepos = 0;
    let publicRepos = 0;
    let androidHigh = 0;
    
    ecosystemData.domains.forEach(domain => {
        domain.repositories.forEach(repo => {
            totalRepos++;
            if (repo.isPrivate) privateRepos++;
            else publicRepos++;
            if (repo.android === 'HIGH') androidHigh++;
        });
    });
    
    document.getElementById('total-repos').textContent = totalRepos;
    document.getElementById('private-repos').textContent = privateRepos;
    document.getElementById('public-repos').textContent = publicRepos;
    document.getElementById('android-high').textContent = androidHigh;
}