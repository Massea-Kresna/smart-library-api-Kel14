import { pool } from '../config/db.js';

export const ReportModel = {
  async getStats() {
    const queries = {
      total_books: 'SELECT COUNT(*) FROM books',
      total_authors: 'SELECT COUNT(*) FROM authors',
      total_categories: 'SELECT COUNT(*) FROM categories',
      active_loans: "SELECT COUNT(*) FROM loans WHERE status = 'BORROWED'"
    };

    const results = {};
    
    // Menjalankan semua kueri secara bersamaan untuk efisiensi
    for (const [key, sql] of Object.entries(queries)) {
      const res = await pool.query(sql);
      results[key] = parseInt(res.rows[0].count);
    }

    return results;
  }
};