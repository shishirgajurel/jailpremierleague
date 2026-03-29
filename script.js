let allArrests = [];

async function init() {
    const res = await fetch('arrests.json');
    allArrests = await res.json();
    updateStats();
    render('all');
}

function updateStats() {
    const uml = allArrests.filter(a => a.party === 'CPN-UML').length;
    const nc = allArrests.filter(a => a.party === 'Nepali Congress').length;
    document.getElementById('umlScore').innerText = uml;
    document.getElementById('ncScore').innerText = nc;
    document.getElementById('totalScore').innerText = allArrests.length;
}

function filterTeam(team, btn) {
    document.querySelectorAll('.jpl-tab').forEach(t => t.classList.remove('active', 'active-team'));
    if (team === 'all') btn.classList.add('active');
    else btn.classList.add('active-team');
    render(team);
}

function render(filter) {
    const grid = document.getElementById('arrestGrid');
    const data = filter === 'all' ? allArrests : allArrests.filter(a => a.party === filter);

    grid.innerHTML = data.map(item => `
        <div class="ok-card">
            <div class="flex justify-between items-start mb-6">
                <span class="text-[9px] font-black px-2 py-1 rounded bg-slate-100 ${item.party === 'CPN-UML' ? 'text-red-600' : 'text-green-600'} uppercase">
                    ${item.party}
                </span>
                <span class="text-slate-400 text-[10px] font-bold uppercase">${item.date}</span>
            </div>

            <h3 class="text-2xl font-black text-slate-900 mb-1 italic uppercase tracking-tighter">${item.name}</h3>
            <p class="text-slate-500 text-[10px] mb-6 font-bold uppercase opacity-60 tracking-widest">${item.role}</p>

            <div class="space-y-3 mb-8 flex-grow">
                <div class="flex gap-4 items-center bg-[#F8FAFC] p-4 rounded-xl border border-slate-100">
                    <i data-lucide="map-pin" class="text-slate-400 w-4 h-4"></i>
                    <span class="text-xs font-semibold text-slate-700">${item.location}</span>
                </div>
                <div class="flex gap-4 items-center bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                    <i data-lucide="gavel" class="text-slate-400 w-4 h-4"></i>
                    <span class="text-xs font-bold text-slate-900 uppercase">${item.status}</span>
                </div>
            </div>

            <div class="pt-4 border-t border-slate-100 mt-auto">
                <p class="text-[10px] text-slate-400 leading-relaxed italic mb-6">"${item.reason}"</p>
                <a href="${item.source}" target="_blank" class="block w-full text-center py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all">
                    Official Report
                </a>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

init();