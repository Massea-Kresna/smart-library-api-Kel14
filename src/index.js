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

// Route Utama dengan Tampilan HTML 
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Smart Library API</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; background: #f4f7f6; color: #333; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .container { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; max-width: 500px; }
                h1 { color: #2c3e50; }
                p { line-height: 1.6; color: #7f8c8d; }
                .badge { background: #27ae60; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
                .endpoints { text-align: left; background: #2c3e50; color: #ecf0f1; padding: 1rem; border-radius: 8px; margin-top: 1rem; font-family: monospace; }
                .footer { margin-top: 1.5rem; font-size: 0.8rem; color: #bdc3c7; }
            </style>
        </head>
        <body>
            <div class="container">
                <span class="badge">ONLINE</span>
                <h1>📚 Smart Library API</h1>
                <p>Selamat datang! Backend Sistem Informasi Perpustakaan berbasis Node.js dan PostgreSQL Anda telah berhasil dijalankan dan siap digunakan.</p>
                <div class="endpoints">
                    GET  /api/books <br>
                    POST /api/loans <br>
                    GET  /api/authors
                </div>
                <div class="footer">Dibuat untuk Praktikum SBD 2026</div>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` 🚀 Server running on http://localhost:${PORT}`);
});