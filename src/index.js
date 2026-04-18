import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import memberRoutes from './routes/memberRoutes.js'; 
import authorRoutes from './routes/authorRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import reportRoutes from './routes/reportRoutes.js'; // Import rute statistik

dotenv.config();

const app = express(); // VARIABEL APP DIBUAT DI SINI
app.use(express.json());

// Grouping API Routes (Harus di bawah pembuatan variabel app)
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reports', reportRoutes);

// Tampilan Frontend Utama
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Smart Library Dashboard</title>
            <style>
                :root { --primary: #2c3e50; --success: #27ae60; --danger: #e74c3c; --bg: #f4f7f6; }
                body { font-family: 'Segoe UI', sans-serif; background: var(--bg); margin: 0; padding: 20px; }
                .container { max-width: 1000px; margin: auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                h1, h2 { color: var(--primary); border-bottom: 2px solid #eee; padding-bottom: 10px; }
                
                .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
                .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center; border: 1px solid #eee; }
                .card h3 { margin: 0; color: #7f8c8d; font-size: 0.9rem; }
                .card p { margin: 10px 0 0; font-size: 2rem; font-weight: bold; color: var(--primary); }

                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { text-align: left; padding: 12px; border-bottom: 1px solid #eee; }
                th { background: var(--primary); color: white; }
                
                .form-group { margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr auto; gap: 10px; align-items: end; }
                input { padding: 12px; border: 1px solid #ddd; border-radius: 6px; }
                button { padding: 12px 25px; background: var(--success); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
                button:hover { background: #219150; }

                #status { margin-top: 20px; padding: 15px; border-radius: 6px; display: none; font-weight: bold; }
                .msg-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; display: block !important; }
                .msg-error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; display: block !important; }
                .stock-out { color: var(--danger); font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📊 Smart Library Dashboard</h1>
                
                <div class="grid">
                    <div class="card"><h3>Total Buku</h3><p id="stat-books">-</p></div>
                    <div class="card"><h3>Total Penulis</h3><p id="stat-authors">-</p></div>
                    <div class="card"><h3>Total Kategori</h3><p id="stat-categories">-</p></div>
                    <div class="card"><h3>Pinjaman Aktif</h3><p id="stat-loans">-</p></div>
                </div>

                <h2>Daftar Koleksi Buku</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Judul Buku</th>
                            <th>Penulis</th>
                            <th>Kategori</th>
                            <th>Stok</th>
                        </tr>
                    </thead>
                    <tbody id="bookList">
                        <tr><td colspan="4">Memuat data buku...</td></tr>
                    </tbody>
                </table>

                <h2>Pinjam Buku Baru</h2>
                <div class="form-group">
                    <div>
                        <label>ID Buku (UUID)</label><br>
                        <input type="text" id="bookId" placeholder="Contoh: 9aec077c...">
                    </div>
                    <div>
                        <label>ID Member (UUID)</label><br>
                        <input type="text" id="memberId" placeholder="Contoh: d8264cba...">
                    </div>
                    <button onclick="prosesPinjam()">Pinjam Sekarang</button>
                </div>
                <div id="status"></div>
            </div>

            <script>
                async function loadStats() {
                    try {
                        const res = await fetch('/api/reports/stats');
                        const data = await res.json();
                        document.getElementById('stat-books').innerText = data.total_books || 0;
                        document.getElementById('stat-authors').innerText = data.total_authors || 0;
                        document.getElementById('stat-categories').innerText = data.total_categories || 0;
                        document.getElementById('stat-loans').innerText = data.active_loans || 0;
                    } catch (e) {
                        console.error("Gagal memuat statistik", e);
                    }
                }

                async function loadBooks() {
                    try {
                        const res = await fetch('/api/books');
                        const books = await res.json();
                        const tbody = document.getElementById('bookList');
                        tbody.innerHTML = books.map(b => \`
                            <tr>
                                <td>\${b.title}</td>
                                <td>\${b.author_name || 'Tidak ada'}</td>
                                <td>\${b.category_name || 'Umum'}</td>
                                <td class="\${b.available_copies === 0 ? 'stock-out' : ''}">\${b.available_copies}</td>
                            </tr>
                        \`).join('');
                    } catch (e) {
                        console.error("Gagal memuat buku", e);
                    }
                }

                async function prosesPinjam() {
                    const status = document.getElementById('status');
                    const bId = document.getElementById('bookId').value;
                    const mId = document.getElementById('memberId').value;

                    try {
                        const res = await fetch('/api/loans', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                book_id: bId,
                                member_id: mId,
                                due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                            })
                        });

                        const data = await res.json();
                        if (res.ok) {
                            status.className = 'msg-success';
                            status.innerText = '✅ Buku berhasil dipinjam!';
                            loadBooks(); // Refresh tabel buku
                            loadStats(); // Refresh angka statistik
                        } else {
                            status.className = 'msg-error';
                            status.innerText = '❌ Gagal: ' + data.error;
                        }
                    } catch (e) {
                        status.className = 'msg-error';
                        status.innerText = '❌ Kesalahan koneksi ke server.';
                    }
                }

                loadStats();
                loadBooks(); 
            </script>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});