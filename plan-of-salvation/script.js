let currentLang = 'en';
let currentSection = 0;
let data = {};

// ========== LOAD LANGUAGE ==========
function loadLanguage(lang) {
    fetch(`lang/${lang}.json`)
        .then(res => res.json())
        .then(json => {
            data = json;
            currentLang = lang;
            renderSections();
            renderIndicators();
            document.getElementById('main-title').innerText = data.title;

            // 🔄 Update bilingual banner text dynamically
            const updateText = document.getElementById('update-text');
            const refreshBtn = document.getElementById('refresh-btn');
            if (updateText && refreshBtn) {
                updateText.textContent = `🔄 ${data.updateMessage}`;
                refreshBtn.textContent = data.refreshButton;
            }
        });
}

// ========== RENDER SECTIONS ==========
function renderSections() {
    const container = document.getElementById('scroll-container');
    container.innerHTML = '';
    data.sections.forEach((sec, i) => {
        const div = document.createElement('section');
        div.classList.add('section');
        div.innerHTML = `
      <img src="images/${sec.image}" alt="${sec.title}">
      <h2>${sec.title}</h2>
      <p>${sec.text}</p>
      <p class="scripture">"${sec.scripture}"</p>
      <button class="scripture-btn" onclick="openModal('${sec.title}','${sec.modalText}')">
        ${data.readMore}
      </button>
    `;
        container.appendChild(div);
    });
}

// ========== RENDER INDICATORS ==========
function renderIndicators() {
    const indicatorContainer = document.getElementById('slide-indicators');
    indicatorContainer.innerHTML = '';
    data.sections.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('indicator');
        if (i === currentSection) dot.classList.add('active');
        dot.addEventListener('click', () => goToSection(i));
        indicatorContainer.appendChild(dot);
    });
}

// ========== NAVIGATION ==========
function goToSection(index) {
    const sections = document.querySelectorAll('.section');
    currentSection = index;
    sections[currentSection].scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest'
    });
    updateIndicators();
}

function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSection);
    });
}

// ========== MODAL ==========
function openModal(title, text) {
    const modal = document.getElementById('modal');
    modal.classList.add('active');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerText = text;
}

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('modal').classList.remove('active');
});

// NEW: click outside the box to close
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        document.getElementById('modal').classList.remove('active');
    }
});

// ========== FLAG SWITCH ==========
document.querySelectorAll('.flag').forEach(flag => {
    flag.addEventListener('click', () => loadLanguage(flag.dataset.lang));
});

// ========== ARROWS ==========
document.getElementById('next-btn').addEventListener('click', () => {
    const sections = document.querySelectorAll('.section');
    if (currentSection < sections.length - 1) {
        currentSection++;
        sections[currentSection].scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
            block: 'nearest'
        });
        updateIndicators();
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    const sections = document.querySelectorAll('.section');
    if (currentSection > 0) {
        currentSection--;
        sections[currentSection].scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
            block: 'nearest'
        });
        updateIndicators();
    }
});

// ========== SERVICE WORKER ==========
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then((reg) => {
        console.log("✅ Service Worker registered");

        if (reg.waiting) showUpdateBanner(reg);

        reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    showUpdateBanner(reg);
                }
            });
        });

        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                window.location.reload();
                refreshing = true;
            }
        });
    });
}

function showUpdateBanner(reg) {
    const banner = document.getElementById('update-banner');
    banner.classList.add('show');
    document.getElementById('refresh-btn').addEventListener('click', () => {
        reg.waiting.postMessage('skipWaiting');
    });
}

// ========== INITIALIZE ==========
window.addEventListener('DOMContentLoaded', () => {
    loadLanguage(currentLang);
});
