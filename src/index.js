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

// Landing Page Route (Halaman Dokumentasi API)
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Library API</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0 }
    body { font-family: monospace; background: #f5f5f4; padding: 2rem 1.5rem; min-height: 100vh }
    .header { display: flex; align-items: center; gap: 12px; margin-bottom: 2rem }
    .logo { width: 36px; height: 36px; border-radius: 8px; background: white; border: 1px solid #e5e5e5; display: flex; align-items: center; justify-content: center; font-size: 18px }
    .app-name { font-size: 15px; font-weight: 600; color: #1a1a1a }
    .app-sub { font-size: 12px; color: #888; margin-top: 2px }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; margin-left: auto }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px }
    .card { background: white; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden }
    .card-head { padding: 12px 14px 10px; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; gap: 8px }
    .icon { width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px }
    .card-title { font-size: 12px; font-weight: 600; color: #1a1a1a; letter-spacing: .5px }
    .card-base { font-size: 11px; color: #aaa; margin-left: auto }
    .routes { padding: 8px 0 }
    .route { display: flex; align-items: center; gap: 8px; padding: 5px 14px }
    .route:hover { background: #fafafa }
    .badge { font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; min-width: 52px; text-align: center }
    .get    { background: #e0f2fe; color: #0369a1 }
    .post   { background: #dcfce7; color: #15803d }
    .put    { background: #fef9c3; color: #a16207 }
    .patch  { background: #f3e8ff; color: #7e22ce }
    .delete { background: #fee2e2; color: #b91c1c }
    .path   { font-size: 12px; color: #555 }
    .path span { color: #1a1a1a }
    .desc   { font-size: 11px; color: #bbb; margin-left: auto }
    .footer { margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between }
    .info   { font-size: 11px; color: #bbb }
    .tags   { display: flex; gap: 6px }
    .tag    { font-size: 11px; padding: 3px 8px; border: 1px solid #e5e5e5; border-radius: 4px; color: #888 }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">📖</div>
    <div><div class="app-name">Smart Library API</div><div class="app-sub">v1.0.0 · Neon PostgreSQL</div></div>
    <div class="dot"></div>
  </div>
  <div class="grid">
    <div class="card">
      <div class="card-head"><div class="icon" style="background:#e0f2fe">📝</div><div class="card-title">AUTHORS</div><div class="card-base">/api/authors</div></div>
      <div class="routes">
        <div class="route"><span class="badge get">GET</span><span class="path">/</span><span class="desc">semua penulis</span></div>
        <div class="route"><span class="badge get">GET</span><span class="path">/?<span>name=</span></span><span class="desc">cari nama</span></div>
        <div class="route"><span class="badge get">GET</span><span class="path">/<span>:id</span></span><span class="desc">detail</span></div>
        <div class="route"><span class="badge post">POST</span><span class="path">/</span><span class="desc">tambah</span></div>
        <div class="route"><span class="badge put">PUT</span><span class="path">/<span>:id</span></span><span class="desc">update</span></div>
        <div class="route"><span class="badge delete">DELETE</span><span class="path">/<span>:id</span></span><span class="desc">hapus</span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="icon" style="background:#dcfce7">🏷️</div><div class="card-title">CATEGORIES</div><div class="card-base">/api/categories</div></div>
      <div class="routes">
        <div class="route"><span class="badge get">GET</span><span class="path">/</span><span class="desc">semua kategori</span></div>
        <div class="route"><span class="badge get">GET</span><span class="path">/?<span>name=</span></span><span class="desc">cari nama</span></div>
        <div class="route"><span class="badge get">GET</span><span class="path">/<span>:id</span></span><span class="desc">detail</span></div>
        <div class="route"><span class="badge post">POST</span><span class="path">/</span><span class="desc">tambah</span></div>
        <div class="route"><span class="badge put">PUT</span><span class="path">/<span>:id</span></span><span class="desc">update</span></div>
        <div class="route"><span class="badge delete">DELETE</span><span class="path">/<span>:id</span></span><span class="desc">hapus</span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="icon" style="background:#fef9c3">📚</div><div class="card-title">BOOKS</div><div class="card-base">/api/books</div></div>
      <div class="routes">
        <div class="route"><span class="badge get">GET</span><span class="path">/</span><span class="desc">semua buku</span></div>
        <div class="route"><span class="badge get">GET</span><span class="path">/?<span>title=</span></span><span class="desc">cari judul</span></div>
        <div class="route"><span class="badge get">GET</span><span class="path">/<span>:id</span></span><span class="desc">detail</span></div>
        <div class="route"><span class="badge post">POST</span><span class="path">/</span><span class="desc">tambah</span></div>
        <div class="route"><span class="badge put">PUT</span><span class="path">/<span>:id</span></span><span class="desc">update</span></div>
        <div class="route"><span class="badge delete">DELETE</span><span class="path">/<span>:id</span></span><span class="desc">hapus</span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="icon" style="background:#f3e8ff">👤</div><div class="card-title">MEMBERS</div><div class="card-base">/api/members</div></div>
      <div class="routes">
        <div class="route"><span class="badge get">GET</span><span class="path">/</span><span class="desc">semua anggota</span></div>
        <div class="route"><span class="badge get">GET</span><span class="path">/<span>:id</span></span><span class="desc">detail</span></div>
        <div class="route"><span class="badge post">POST</span><span class="path">/</span><span class="desc">daftar</span></div>
        <div class="route"><span class="badge put">PUT</span><span class="path">/<span>:id</span></span><span class="desc">update</span></div>
        <div class="route"><span class="badge delete">DELETE</span><span class="path">/<span>:id</span></span><span class="desc">hapus</span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="icon" style="background:#fee2e2">🔄</div><div class="card-title">LOANS</div><div class="card-base">/api/loans</div></div>
      <div class="routes">
        <div class="route"><span class="badge get">GET</span><span class="path">/</span><span class="desc">semua peminjaman</span></div>
        <div class="route"><span class="badge get">GET</span><span class="path">/<span>:id</span></span><span class="desc">detail</span></div>
        <div class="route"><span class="badge get">GET</span><span class="path">/<span>top-borrowers</span></span><span class="desc">top 3</span></div>
        <div class="route"><span class="badge post">POST</span><span class="path">/</span><span class="desc">pinjam buku</span></div>
        <div class="route"><span class="badge patch">PATCH</span><span class="path">/<span>:id/return</span></span><span class="desc">kembalikan</span></div>
        <div class="route"><span class="badge delete">DELETE</span><span class="path">/<span>:id</span></span><span class="desc">hapus</span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="icon" style="background:#e0f2fe">📊</div><div class="card-title">REPORTS</div><div class="card-base">/api/reports</div></div>
      <div class="routes">
        <div class="route"><span class="badge get">GET</span><span class="path">/<span>stats</span></span><span class="desc">statistik</span></div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="info">28 endpoints tersedia</div>
    <div class="tags"><span class="tag">Express.js</span><span class="tag">PostgreSQL</span><span class="tag">Vercel</span></div>
  </div>
</body>
</html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});