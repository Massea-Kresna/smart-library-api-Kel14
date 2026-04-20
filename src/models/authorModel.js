import { pool } from '../config/db.js';

export const AuthorModel = { //mengambil semua author
  async getAll() {
    const result = await pool.query('SELECT * FROM authors ORDER BY name ASC');
    return result.rows;
  },

  async getById(id) { //mengambil satu author berdasarkan id
    const result = await pool.query('SELECT * FROM author WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(name, nationality) { //menambah author baru
    const query = 'INSERT INTO authors (name, nationality) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [name, nationality]);
    return result.rows[0];
  },

  async update(id, name, nationality) { //memperbarui data author
    const query = `
      UPDATE author
      SET name = $1, nationality = $2
      WHERE id = $3
      RETURNING *
    `;
    const result = await pool.query(query, [name, nationality, id]);
    return result.rows[0];
  },

  async delete(id) { //menghapus data author
    const query = 'DELETE FROM author WHERE id = $1';
    await pool.query(query, [id]);
    return { message: "Penulis berhasil dihapus dari sistem." };
  }
};