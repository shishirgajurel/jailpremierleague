let allArrests = [];

async function loadData() {
    const res = await fetch('arrests.json');
    allArrests = await res.json();
    render('all');
}

function filterTeam(team, btn) {
    // UI Update
    document.querySelectorAll('.team-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Logic Update
    render(team);
}

function render(filter) {
    const grid = document.getElementById('arrestGrid');
    const filteredData = filter === 'all' ? allArrests : allArrests.filter(item => item.party === filter);

    grid.innerHTML = filteredData.map(item => {
        const isUML = item.party.includes('UML');
        const badgeClass = isUML ? 'badge-uml' : 'badge-congress';

        return `
        <div class="jpl-card group overflow-hidden">
            <div class="h-1 w-full bg-gradient-to-r from-pink-500 via-green-400 to-cyan-500"></div>
            
            <div class="p-6">
                <div class="flex justify-between items-start mb-6">
                    <span class="${badgeClass} text-[10px] font-black px-3 py-1 rounded-sm shadow-lg tracking-wider">
                        ${item.party}
                    </span>
                    <span class="text-purple-300 text-[10px] font-bold uppercase tracking-tighter">
                        Matchday: ${item.date}
                    </span>
                </div>

                <h3 class="text-2xl mb-1 group-hover:text-[#00FF85] transition-colors leading-none italic">
                    ${item.name}
                </h3>
                <p class="text-purple-300 text-[10px] font-bold mb-6 tracking-widest uppercase opacity-70">
                    Position: ${item.role}
                </p>

                <div class="space-y-3 mb-8">
                    <div class="flex items-center gap-3 text-sm">
                        <i data-lucide="map-pin" class="w-4 h-4 text-[#00FF85]"></i>
                        <span class="font-bold text-gray-200">${item.location}</span>
                    </div>
                    <div class="flex items-center gap-3 text-sm p-3 bg-black/20 rounded-lg">
                        <i data-lucide="gavel" class="w-4 h-4 text-pink-500"></i>
                        <span class="font-black text-pink-400 uppercase italic leading-none">${item.status}</span>
                    </div>
                </div>

                <div class="mb-6 h-12 overflow-hidden">
                    <p class="text-[11px] text-gray-400 italic leading-relaxed line-clamp-2">
                        "${item.reason}"
                    </p>
                </div>

                <a href="${item.source}" target="_blank" class="flex items-center justify-center gap-2 w-full py-3 bg-[#00FF85] text-[#3D195B] font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all rounded-sm">
                    View Match Report <i data-lucide="external-link" class="w-3 h-3"></i>
                </a>
            </div>
        </div>
    `;}).join('');
    lucide.createIcons();
}

// Google Translate Setup
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