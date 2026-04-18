import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import memberRoutes from './routes/memberRoutes.js'; 
import authorRoutes from './routes/authorRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Grouping Routes
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/categories', categoryRoutes);

// Route Utama dengan Dashboard Interaktif
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Smart Library Dashboard</title>
            <style>
                :root { --primary: #2c3e50; --secondary: #34495e; --accent: #3498db; --success: #27ae60; --bg: #f8f9fa; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: var(--bg); margin: 0; display: flex; }
                
                /* Sidebar */
                .sidebar { width: 250px; background: var(--primary); color: white; height: 100vh; position: fixed; padding: 20px; box-sizing: border-box; }
                .sidebar h2 { font-size: 1.2rem; margin-bottom: 30px; border-bottom: 1px solid var(--secondary); padding-bottom: 10px; }
                .nav-item { padding: 12px; margin: 8px 0; cursor: pointer; border-radius: 6px; transition: 0.3s; list-style: none; }
                .nav-item:hover { background: var(--secondary); }
                .nav-item.active { background: var(--accent); }

                /* Main Content */
                .main-content { margin-left: 250px; flex-grow: 1; padding: 30px; }
                .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
                .stat-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
                .stat-card h3 { margin: 0; font-size: 0.9rem; color: #7f8c8d; }
                .stat-card p { margin: 10px 0 0; font-size: 1.8rem; font-weight: bold; color: var(--primary); }

                /* Data Table/Cards */
                .card-container { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th { text-align: left; padding: 12px; border-bottom: 2px solid var(--bg); color: var(--secondary); }
                td { padding: 12px; border-bottom: 1px solid var(--bg); }
                .badge { padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; }
                .badge-success { background: #e9f7ef; color: #27ae60; }
            </style>
        </head>
        <body>
            <div class="sidebar">
                <h2>📚 Smart Library</h2>
                <li class="nav-item active">Dashboard Overview</li>
                <li class="nav-item">Koleksi Buku</li>
                <li class="nav-item">Data Anggota</li>
                <li class="nav-item">Laporan Pinjaman</li>
            </div>
            
            <div class="main-content">
                <div class="header">
                    <h1>Sistem Informasi Perpustakaan</h1>
                    <span class="badge badge-success">API Status: Connected</span>
                </div>

                <div class="stats-grid">
                    <div class="stat-card"><h3>Total Buku</h3><p>124</p></div>
                    <div class="stat-card"><h3>Buku Tersedia</h3><p>89</p></div>
                    <div class="stat-card"><h3>Anggota Aktif</h3><p>56</p></div>
                    <div class="stat-card"><h3>Peminjaman Hari Ini</h3><p>12</p></div>
                </div>

                <div class="card-container">
                    <h3>Aktivitas Peminjaman Terbaru</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID Pinjam</th>
                                <th>Judul Buku</th>
                                <th>Nama Peminjam</th>
                                <th>Tgl Kembali</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#L-9921</td>
                                <td>Bumi - Tere Liye</td>
                                <td>Celino Matande</td>
                                <td>2026-04-30</td>
                                <td><span class="badge badge-success">Borrowed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});