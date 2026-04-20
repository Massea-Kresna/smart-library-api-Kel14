import { MemberModel } from '../models/memberModel.js';

export const MemberController = {
  async getAllMembers(req, res) {//GET /api/members
    try {
      const members = await MemberModel.getAll();
      res.json(members);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getMemberById(req, res) {//GET /api/members/:id
    try {
      const member = await MemberModel.getById(req.params.id);
      if (!member) return res.status(404).json({ error: 'Anggota tidak ditemukan.' });
      res.json(member);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async registerMember(req, res) {//POST /api/members
    try {
      const newMember = await MemberModel.create(req.body);
      res.status(201).json({
        message: "Anggota berhasil didaftarkan!",
        data: newMember
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateMember(req, res) {//PUT /api/members/:id
    try {
      const updated = await MemberModel.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Anggota tidak ditemukan.' });
      res.json({ message: 'Data anggota berhasil diperbarui.', data: updated });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteMember(req, res) {//DELETE /api/members/:id
    try {
      const existing = await MemberModel.getById(req.params.id);
      if (!existing) return res.status(404).json({ error: 'Anggota tidak ditemukan.' });
      const result = await MemberModel.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};