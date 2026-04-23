import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import memberRoutes from './routes/memberRoutes.js'; 
import authorRoutes from './routes/authorRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Grouping Routes
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reports', reportRoutes);

// Landing Page: Interactive Library Dashboard
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Library - Dashboard Utama</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; }
    .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); border: 1px solid rgba(226, 232, 240, 0.8); }
  </style>
</head>
<body class="p-6 md:p-12">
  <div class="max-w-6xl mx-auto">
    <header class="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <span class="text-4xl">📖</span> Smart Library
        </h1>
        <p class="text-slate-500 mt-1">Sistem Manajemen Perpustakaan Terintegrasi v1.0.0</p>
      </div>
      <div class="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span class="text-sm font-semibold text-slate-700">Server Status: Online</span>
      </div>
    </header>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div class="glass p-5 rounded-2xl shadow-sm">
        <p class="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Total Koleksi</p>
        <h2 class="text-2xl font-bold text-slate-800" id="stat-books">...</h2>
      </div>
      <div class="glass p-5 rounded-2xl shadow-sm">
        <p class="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Penulis</p>
        <h2 class="text-2xl font-bold text-slate-800" id="stat-authors">...</h2>
      </div>
      <div class="glass p-5 rounded-2xl shadow-sm">
        <p class="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Kategori</p>
        <h2 class="text-2xl font-bold text-slate-800" id="stat-categories">...</h2>
      </div>
      <div class="glass p-5 rounded-2xl shadow-sm">
        <p class="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Dipinjam</p>
        <h2 class="text-2xl font-bold text-slate-800" id="stat-loans">...</h2>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            🔍 Cari Buku & Referensi
          </h3>
          <div class="relative">
            <input type="text" id="search-input" placeholder="Masukkan judul buku atau nama penulis..." 
              class="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all">
            <span class="absolute left-4 top-3.5 opacity-40">🔎</span>
          </div>
          <div id="search-results" class="mt-6 space-y-3">
            <p class="text-sm text-slate-400 italic">Gunakan bar pencarian di atas untuk mulai menjelajahi koleksi...</p>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">🏆 Top Peminjam</h3>
          <div id="top-borrowers" class="space-y-4">
            <p class="text-slate-400 text-sm">Memuat data...</p>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 class="text-sm font-bold text-slate-800 mb-3 uppercase tracking-widest">Akses API</h3>
          <p class="text-xs text-slate-500 mb-4">Akses teknis untuk pengembang sistem perpustakaan.</p>
          <a href="/api/reports/stats" class="block w-full text-center py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">
            Lihat Dokumentasi JSON
          </a>
        </div>
      </div>
    </div>

    <footer class="mt-12 py-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-sm text-slate-400">© 2026 Smart Library Team · Diponegoro University</p>
      <div class="flex gap-2">
        <span class="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md">PostgreSQL</span>
        <span class="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-md">Express.js</span>
      </div>
    </footer>
  </div>

  <script>
    // Fungsi untuk mengambil statistik awal
    async function loadStats() {
      try {
        const res = await fetch('/api/reports/stats');
        const data = await res.json();
        document.getElementById('stat-books').innerText = data.total_books || 0;
        document.getElementById('stat-authors').innerText = data.total_authors || 0;
        document.getElementById('stat-categories').innerText = data.total_categories || 0;
        document.getElementById('stat-loans').innerText = data.active_loans || 0;
      } catch (e) { console.error("Gagal memuat statistik"); }
    }

    // Fungsi pencarian buku
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', async (e) => {
      const q = e.target.value;
      if(q.length < 2) return;
      
      try {
        const res = await fetch(\`/api/books?title=\${q}\`);
        const books = await res.json();
        const container = document.getElementById('search-results');
        container.innerHTML = books.length ? '' : '<p class="text-sm text-red-400">Buku tidak ditemukan.</p>';
        
        books.forEach(b => {
          container.innerHTML += \`
            <div class="p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow flex justify-between items-center">
              <div>
                <h4 class="font-bold text-slate-800 uppercase text-sm">\${b.title}</h4>
                <p class="text-xs text-slate-500 italic">\${b.author_name} · \${b.category_name}</p>
              </div>
              <span class="text-xs font-bold \${b.available_copies > 0 ? 'text-green-600' : 'text-red-500'}">
                \${b.available_copies > 0 ? 'Tersedia' : 'Kosong'}
              </span>
            </div>
          \`;
        });
      } catch (e) { }
    });

    loadStats();
  </script>
</body>
</html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});