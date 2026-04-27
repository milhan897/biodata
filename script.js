const LAPORAN_DATA = [
  { id:'LPR-2026-001', judul:'Jalan berlubang di depan SDN 3 Sigli', kat:'Jalan & Jembatan', lok:'Jl. Diponegoro, Kec. Kota Sigli', tgl:'10 Jan 2026', status:'Selesai', nama:'Ahmad R.', uraian:'Terdapat lubang besar di tengah jalan dengan diameter ±50cm, sangat membahayakan pengendara terutama pagi hari. Sudah terjadi 2 kecelakaan kecil.' },
  { id:'LPR-2026-002', judul:'Tumpukan sampah tidak diangkut 2 minggu', kat:'Sampah & Kebersihan', lok:'Jl. Banda Aceh - Medan, Kec. Peukan Baro', tgl:'12 Jan 2026', status:'Selesai', nama:'Siti M.', uraian:'Sampah di TPS Jl. Banda Aceh - Medan tidak diangkut selama 2 minggu menyebabkan bau busuk dan mengganggu warga sekitar.' },
  { id:'LPR-2026-003', judul:'Lampu jalan padam sejak sebulan lalu', kat:'Lampu Jalan', lok:'Jl. Cot Trieng, Kec. Glumpang Tiga', tgl:'15 Jan 2026', status:'Diproses', nama:'Roni H.', uraian:'Lampu jalan di sepanjang Jl. Hamzah (500m) telah padam >1 bulan, sangat gelap dan berbahaya di malam hari.' },
  { id:'LPR-2026-004', judul:'Drainase tersumbat menyebabkan banjir', kat:'Air & Drainase', lok:'Gampong Kota Sigli, Kec. Peukan Baro', tgl:'18 Jan 2026', status:'Menunggu', nama:'Faisal A.', uraian:'Saluran drainase tersumbat sampah dan lumpur. Setiap hujan deras rumah warga sekitar terendam air setinggi 20-30cm.' },
  { id:'LPR-2026-005', judul:'Pelayanan BPJS lambat di Puskesmas', kat:'Pelayanan Publik', lok:'Puskesmas Kec. Kota Sigli', tgl:'20 Jan 2026', status:'Diproses', nama:'Nurul F.', uraian:'Antrian pelayanan BPJS sangat panjang, pasien menunggu 4-6 jam. Staf kurang responsif dan sistem nomor antrian sering error.' },
  { id:'LPR-2026-006', judul:'PKL berjualan di badan jalan tanpa izin', kat:'Ketertiban Umum', lok:'Pasar Inpres, Kec. Kota Sigli', tgl:'22 Jan 2026', status:'Selesai', nama:'Zulham P.', uraian:'PKL memenuhi badan jalan di depan pasar menyebabkan kemacetan setiap pagi hari. Akses jalan menyempit hingga 1 jalur.' },
  { id:'LPR-2026-007', judul:'Taman kota kotor dan fasilitas rusak', kat:'Fasilitas Umum', lok:'Taman Kota Pidie, Kec. Kota Sigli', tgl:'25 Jan 2026', status:'Menunggu', nama:'Marlina S.', uraian:'Bangku taman banyak yang rusak, lampu taman padam, dan fasilitas olahraga tidak terawat. Taman jadi tidak nyaman.' },
  { id:'LPR-2026-008', judul:'Gorong-gorong patah di depan masjid', kat:'Air & Drainase', lok:'Mesjid gogo, Kec. Padang Tiji', tgl:'27 Jan 2026', status:'Diproses', nama:'Goat Messi', uraian:'Gorong-gorong patah dan berlubang membahayakan warga, terutama anak-anak yang lewat. Sudah ada motor yang jatuh.' },
];

const TIKET_DB = {
  'LPR-2026-001': { status:'Selesai', title:'Jalan berlubang di depan SDN 3 Sigli', kat:'Jalan & Jembatan', t1:'10 Jan 2026 09:14', t2:'11 Jan 2026 10:00', t3:'14 Jan 2026 08:30', t4:'20 Jan 2026 16:00' },
  'LPR-2026-003': { status:'Diproses', title:'Lampu jalan padam sejak sebulan lalu', kat:'Lampu Jalan', t1:'15 Jan 2026 14:22', t2:'16 Jan 2026 09:00', t3:'18 Jan 2026 11:00', t4:null },
  'LPR-2026-004': { status:'Menunggu', title:'Drainase tersumbat menyebabkan banjir', kat:'Air & Drainase', t1:'18 Jan 2026 07:45', t2:null, t3:null, t4:null },
};

let allLaporan = [...LAPORAN_DATA];
let laporanCounter = 248;

/* ── NAVIGASI ── */
function showPage(p) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + p).classList.add('active');
  const navEl = document.getElementById('nav-' + p);
  if (navEl) navEl.classList.add('active');
  window.scrollTo(0, 0);
  if (p === 'home') renderHomeLaporan();
  if (p === 'daftar') renderDaftar();
}

function showPageWithKat(p, kat) {
  showPage(p);
  const sel = document.getElementById('f-kategori');
  if (sel) sel.value = kat;
}

/* ── RENDER LAPORAN ── */
function renderHomeLaporan() {
  const el = document.getElementById('home-laporan-list');
  const recent = allLaporan.slice(0, 4);
  el.innerHTML = recent.map(l => laporanCardHTML(l)).join('');
}

function renderDaftar() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const fs = document.getElementById('filter-status').value;
  const fk = document.getElementById('filter-kat').value;

  const filtered = allLaporan.filter(l =>
    (!q || l.judul.toLowerCase().includes(q) || l.lok.toLowerCase().includes(q)) &&
    (!fs || l.status === fs) &&
    (!fk || l.kat === fk)
  );

  document.getElementById('daftar-list').innerHTML = filtered.length
    ? filtered.map(l => laporanCardHTML(l)).join('')
    : '<div style="text-align:center;padding:40px;color:var(--gray-400)">Tidak ada laporan ditemukan</div>';

  document.getElementById('d-menunggu').textContent = allLaporan.filter(l => l.status === 'Menunggu').length;
  document.getElementById('d-proses').textContent   = allLaporan.filter(l => l.status === 'Diproses').length;
  document.getElementById('d-selesai').textContent  = allLaporan.filter(l => l.status === 'Selesai').length;
}

function laporanCardHTML(l) {
  const badgeClass = {
    Menunggu: 'badge-menunggu',
    Diproses: 'badge-proses',
    Selesai:  'badge-selesai',
    Ditolak:  'badge-ditolak'
  }[l.status] || 'badge-menunggu';

  return `<div class="laporan-card" onclick="openModal('${l.id}')">
    <span class="laporan-no">${l.id}</span>
    <div>
      <div class="laporan-title">${l.judul}</div>
      <div class="laporan-meta">
        <span>📍 ${l.lok}</span>
        <span>🏷️ ${l.kat}</span>
        <span>📅 ${l.tgl}</span>
      </div>
    </div>
    <span class="badge ${badgeClass}">${l.status}</span>
  </div>`;
}

/* ── MODAL DETAIL ── */
function openModal(id) {
  const l = allLaporan.find(x => x.id === id);
  if (!l) return;

  document.getElementById('modal-judul').textContent = l.judul;
  document.getElementById('modal-id').textContent    = l.id;
  document.getElementById('modal-kat').textContent   = l.kat;
  document.getElementById('modal-lok').textContent   = l.lok;
  document.getElementById('modal-tgl').textContent   = l.tgl;
  document.getElementById('modal-nama').textContent  = l.nama;
  document.getElementById('modal-uraian').textContent = l.uraian;

  const badgeClass = {
    Menunggu: 'badge-menunggu',
    Diproses: 'badge-proses',
    Selesai:  'badge-selesai',
    Ditolak:  'badge-ditolak'
  }[l.status] || '';
  document.getElementById('modal-status').innerHTML = `<span class="badge ${badgeClass}">${l.status}</span>`;

  document.getElementById('modal-overlay').classList.add('show');
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modal-overlay')) {
    document.getElementById('modal-overlay').classList.remove('show');
  }
}

/* ── FORM LAPORAN ── */
function showFileName(input) {
  const fn = document.getElementById('file-name');
  fn.textContent = input.files[0] ? '✓ ' + input.files[0].name : '';
}

function resetForm() {
  ['f-nama', 'f-hp', 'f-email', 'f-nik', 'f-lokasi', 'f-judul', 'f-uraian']
    .forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-kategori').value = '';
  document.getElementById('f-foto').value = '';
  document.getElementById('file-name').textContent = '';
}

function submitLaporan() {
  const nama  = document.getElementById('f-nama').value.trim();
  const hp    = document.getElementById('f-hp').value.trim();
  const kat   = document.getElementById('f-kategori').value;
  const lok   = document.getElementById('f-lokasi').value.trim();
  const judul = document.getElementById('f-judul').value.trim();
  const uraian = document.getElementById('f-uraian').value.trim();

  if (!nama || !hp || !kat || !lok || !judul || !uraian) {
    alert('⚠️ Harap lengkapi semua field yang wajib diisi (*)');
    return;
  }

  laporanCounter++;
  const newId = 'LPR-2026-' + String(laporanCounter - 240).padStart(3, '0');
  const today = new Date();
  const bulan = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des'];
  const tgl = today.getDate() + ' ' + bulan[today.getMonth()] + ' ' + today.getFullYear();

  const newL = { id: newId, judul, kat, lok, tgl, status: 'Menunggu', nama: nama.split(' ')[0] + '.', uraian };
  allLaporan.unshift(newL);

  document.getElementById('total-stat').textContent = laporanCounter;
  document.getElementById('proses-stat').textContent = allLaporan.filter(l => l.status === 'Diproses').length;

  resetForm();
  showToast('✓ Laporan berhasil dikirim! No. tiket: ' + newId);
  setTimeout(() => showPage('daftar'), 1500);
}

/* ── CEK STATUS ── */
function cekStatus() {
  const tiket = document.getElementById('input-tiket').value.trim().toUpperCase();
  const tl    = document.getElementById('timeline-result');
  const found = allLaporan.find(l => l.id === tiket);
  const db    = TIKET_DB[tiket];

  if (!found) {
    alert('Nomor tiket tidak ditemukan. Pastikan nomor yang Anda masukkan benar.');
    tl.classList.remove('show');
    return;
  }

  document.getElementById('tl-title').textContent    = found.judul;
  document.getElementById('tl-id').textContent       = found.id;
  document.getElementById('tl-kategori').textContent = '🏷️ ' + found.kat;

  const badgeClass = {
    Menunggu: 'badge-menunggu',
    Diproses: 'badge-proses',
    Selesai:  'badge-selesai'
  }[found.status] || 'badge-menunggu';
  document.getElementById('tl-badge').className   = 'badge ' + badgeClass;
  document.getElementById('tl-badge').textContent = found.status;

  if (db) {
    setStep('dot-1', 't-1', db.t1, 'done');
    setStep('dot-2', 't-2', db.t2, db.t2 ? (db.t3 ? 'done' : 'active') : '');
    setStep('dot-3', 't-3', db.t3, db.t3 ? (db.t4 ? 'done' : 'active') : '');
    setStep('dot-4', 't-4', db.t4, db.t4 ? 'done' : '');
  } else {
    setStep('dot-1', 't-1', found.tgl, 'done');
    setStep('dot-2', 't-2', null, '');
    setStep('dot-3', 't-3', null, '');
    setStep('dot-4', 't-4', null, '');
  }

  tl.classList.add('show');
}

function setStep(dotId, timeId, time, cls) {
  const dot = document.getElementById(dotId);
  dot.className = 'step-dot' + (cls ? ' ' + cls : '');
  document.getElementById(timeId).textContent = time || 'Menunggu';
}

/* ── TOAST ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

/* ── INIT ── */
renderHomeLaporan();