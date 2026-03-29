let allArrests = [];

async function loadData() {
    const res = await fetch('arrests.json');
    allArrests = await res.json();
    updateDashboard();
    render('all');
}

function updateDashboard() {
    const uml = allArrests.filter(a => a.party === 'CPN-UML').length;
    const nc = allArrests.filter(a => a.party === 'Nepali Congress').length;
    const others = allArrests.length - (uml + nc);
    
    document.getElementById('umlScore').innerText = uml;
    document.getElementById('ncScore').innerText = nc;
    document.getElementById('otherScore').innerText = others;
    document.getElementById('totalScore').innerText = allArrests.length;
}

function filterTeam(team, btn) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    render(team);
}

function render(filter) {
    const grid = document.getElementById('arrestGrid');
    const data = filter === 'all' ? allArrests : allArrests.filter(a => a.party === filter);

    grid.innerHTML = data.map(item => `
        <div class="ok-card">
            <div class="ok-card-header">
                <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded border 
                    ${item.party === 'CPN-UML' ? 'border-red-600 text-red-600' : 'border-green-600 text-green-600'}">
                    ${item.party}
                </span>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">
                    Updated: ${item.date}
                </span>
            </div>
            <div class="ok-card-body">
                <h3 class="text-xl font-bold text-slate-800 mb-1 leading-tight">${item.name}</h3>
                <p class="text-xs text-slate-500 font-medium mb-4">${item.role}</p>

                <div class="bg-slate-50 p-4 rounded mb-6 space-y-2">
                    <div class="flex items-center gap-3">
                        <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
                        <span class="text-xs font-bold text-slate-700">${item.location}</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <i data-lucide="shield" class="w-3 h-3 text-slate-400"></i>
                        <span class="text-xs font-black text-slate-900 uppercase">${item.status}</span>
                    </div>
                </div>

                <p class="text-[11px] text-slate-500 italic mb-6 line-clamp-2 hover:line-clamp-none cursor-pointer">
                    "${item.reason}"
                </p>

                <a href="${item.source}" target="_blank" class="block w-full text-center py-2 text-[10px] font-bold uppercase tracking-widest text-blue-600 border border-blue-100 bg-blue-50 rounded hover:bg-blue-600 hover:text-white transition-all">
                    Full News Report
                </a>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,ne'}, 'google_translate_element');
}
document.getElementById('langToggle').addEventListener('click', () => {
    const label = document.getElementById('langLabel');
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
        combo.value = (label.innerText === 'नेपाली') ? 'ne' : 'en';
        label.innerText = (label.innerText === 'नेपाली') ? 'English' : 'नेपाली';
        combo.dispatchEvent(new Event('change'));
    }
});

loadData();