let role = 'worker';
const ALL = ['landing', 'worker', 'workerOrder', 'workerMsg', 'workerMine', 'boss', 'bossOrder', 'bossMsg', 'bossMine'];

function updateRoleButtons() {
  const worker = document.getElementById('cardWorker');
  const boss = document.getElementById('cardBoss');
  const btn = document.getElementById('enterBtn');
  worker?.classList.toggle('active', role === 'worker');
  boss?.classList.toggle('active', role === 'boss');
  if (btn) btn.textContent = role === 'worker' ? '我是零工，去找活' : '我是老板，去招工';
}

function selectRole(r) {
  role = r;
  updateRoleButtons();
}

function setActiveTabForPage(pageId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  const groups = {
    worker: 0, workerOrder: 1, workerMsg: 2, workerMine: 3,
    boss: 0, bossOrder: 1, bossMsg: 2, bossMine: 3
  };
  const idx = groups[pageId];
  if (idx === undefined) return;
  const page = document.getElementById(pageId);
  const tabs = page?.querySelectorAll('.tabs-inner .tab');
  tabs?.[idx]?.classList.add('active');
}

function show(id) {
  ALL.forEach(p => document.getElementById(p)?.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
  setActiveTabForPage(id);
  window.scrollTo(0, 0);
  location.hash = id;
}

function enterRole() { show(role); }

function bindChips() {
  document.querySelectorAll('.chips').forEach(group => {
    group.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  });
}

function iconForLabel(label) {
  if (label.includes('首页')) return '🏠';
  if (label.includes('订单')) return '📄';
  if (label.includes('消息')) return '💬';
  if (label.includes('我的')) return '😊';
  return '•';
}

function enhanceTabsWithIcons() {
  document.querySelectorAll('.tabs-inner').forEach(inner => {
    const page = inner.closest('.page');
    const isWorker = page?.id?.startsWith('worker');

    inner.querySelectorAll('.tab').forEach((tab, idx) => {
      if (tab.dataset.enhanced === '1') return;
      const label = tab.textContent.trim();

      if (isWorker && idx === 0 && label.includes('首页')) {
        tab.innerHTML = `<span class="tab-special"><span>抢</span><small>日结</small></span><span class="tab-label">${label}</span>`;
      } else {
        const icon = iconForLabel(label);
        tab.innerHTML = `<span class="tab-icon">${icon}</span><span class="tab-label">${label}</span>`;
      }

      tab.dataset.enhanced = '1';
    });
  });
}

window.addEventListener('hashchange', () => {
  const hash = location.hash.replace('#', '');
  if (ALL.includes(hash)) show(hash);
});

updateRoleButtons();
bindChips();
enhanceTabsWithIcons();

const hash = location.hash.replace('#', '');
if (ALL.includes(hash)) {
  show(hash);
}
