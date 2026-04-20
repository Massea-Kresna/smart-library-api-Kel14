import { AuthorModel } from '../models/authorModel.js';

export const AuthorController = {
  async getAuthors(req, res) {//GET /api/authors
    try {
      const authors = await AuthorModel.getAll();
      res.json(authors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getAuthorById(req, res) {// GET /api/authors/:id
    try {
      const author = await AuthorModel.getById(req.params.id);
      if (!author) return res.status(404).json({ error: 'Penulis tidak ditemukan.' });
      res.json(author);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async addAuthor(req, res) {//POST /api/authors
    try {
      const { name, nationality } = req.body;
      const author = await AuthorModel.create(name, nationality);
      res.status(201).json(author);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateAuthor(req, res) {//PUT /api/authors/:id
    try {
      const { name, nationality } = req.body;
      const updated = await AuthorModel.update(req.params.id, name, nationality);
      if (!updated) return res.status(404).json({ error: 'Penulis tidak ditemukan.' });
      res.json({ message: 'Data penulis berhasil diperbarui.', data: updated });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteAuthor(req, res) {//DELETE /api/authors/:id
    try {
      const existing = await AuthorModel.getById(req.params.id);
      if (!existing) return res.status(404).json({ error: 'Penulis tidak ditemukan.' });
      const result = await AuthorModel.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }  
};