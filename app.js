// ===== YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== TABS =====
const tabs = document.querySelectorAll('.prod-tab');
const panels = document.querySelectorAll('.prod-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.panel).classList.add('active');
  });
});

// ===== SWATCHES =====
document.querySelectorAll('.swatches').forEach(group => {
  const panelId = group.id.replace('swatches-', '');
  const label = document.getElementById('label-' + panelId);
  group.querySelectorAll('.swatch').forEach(s => {
    s.addEventListener('click', () => {
      group.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
      s.classList.add('active');
      if (label) label.textContent = s.dataset.name;
    });
  });
});

// ===== SIZES & TOTALS =====
const panelPrices = { maryam: 39, nurmaryam: 59, zaraa: 39, sofea: 53 };

document.querySelectorAll('.size-grid').forEach(grid => {
  const panelId = grid.id.replace('sizes-', '');
  grid.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.size-btn').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      panelPrices[panelId] = Number(btn.dataset.price);
      document.getElementById('price-' + panelId).textContent = 'RM ' + Number(btn.dataset.price).toFixed(2);
      recalc(panelId);
    });
  });
});

document.querySelectorAll('.qty-input').forEach(inp => {
  inp.addEventListener('input', () => recalc(inp.dataset.for));
});

function recalc(panelId) {
  const panel = document.getElementById('panel-' + panelId);
  const qty = Math.max(1, Number(panel.querySelector('.qty-input').value) || 1);
  const price = panelPrices[panelId] || 0;
  document.getElementById('total-' + panelId).textContent = 'RM ' + (price * qty).toFixed(2);
}

// ===== BUY BUTTON =====
document.querySelectorAll('.btn-proceed').forEach(btn => {
  btn.addEventListener('click', () => {
    const panelId = btn.dataset.panel;
    const panel = document.getElementById('panel-' + panelId);
    const qty = Math.max(1, Number(panel.querySelector('.qty-input').value) || 1);
    const price = panelPrices[panelId];
    const total = price * qty;

    const namaEl = panel.querySelector('.nama-input');
    const nama = namaEl ? namaEl.value.trim() || 'Pelanggan' : 'Pelanggan';

    const tabNames = { maryam: 'Maryam Dhuha', nurmaryam: 'NurMaryam', zaraa: 'Zaraa', sofea: 'Basic Sofea' };
    const prodName = tabNames[panelId];

    // Colour/size info
    const swatchLabel = document.getElementById('label-' + panelId);
    const warna = swatchLabel ? swatchLabel.textContent : '—';
    const activeSize = panel.querySelector('.size-btn.active');
    const saiz = activeSize ? activeSize.firstChild.textContent.trim() : 'Dewasa';

    document.getElementById('bclRingkasan').innerHTML = `
      <strong>Pembeli:</strong> ${nama}<br>
      <strong>Produk:</strong> ${prodName}<br>
      <strong>Warna:</strong> ${warna}<br>
      <strong>Saiz:</strong> ${saiz}<br>
      <strong>Kuantiti:</strong> ${qty} pasang<br>
      <span class="bcl-total">Jumlah: RM ${total.toFixed(2)}</span>
    `;

    document.getElementById('productSelectionView').style.display = 'none';
    document.getElementById('bclPaymentView').style.display = 'block';

    if (window.BclEmbedForm) window.BclEmbedForm.init();
  });
});

// ===== BACK BUTTON =====
document.getElementById('btnKembali').addEventListener('click', () => {
  document.getElementById('bclPaymentView').style.display = 'none';
  document.getElementById('productSelectionView').style.display = 'block';
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

