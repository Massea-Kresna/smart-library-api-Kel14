import { pool } from '../config/db.js';

export const MemberModel = {
  async getAll() {//mengambil semua member
    const result = await pool.query('SELECT * FROM members ORDER BY joined_at DESC');
    return result.rows;
  },

  async getById(id) { //mengambil satu member berdasarkan id
    const result = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(data) {
    const { full_name, email, member_type } = data;
    const query = `
      INSERT INTO members (full_name, email, member_type) 
      VALUES ($1, $2, $3) RETURNING *
    `;
    const result = await pool.query(query, [full_name, email, member_type]);
    return result.rows[0];
  },

  async update(id, data) { //memperbarui member
    const { full_name, email, member_type } = data;
    const query = `
      UPDATE members 
      SET full_name = $1, email = $2, member_type = $3
      WHERE id = $4
      RETURNING *
    `;
    const result = await pool.query(query, [full_name, email, member_type, id]);
    return result.rows[0];
  },

  async delete(id) {//menghapus member
    const query = 'DELETE FROM members WHERE id = $1';
    await pool.query(query, [id]);
    return { message: "Member berhasil dihapus dari sistem." };
  }
};