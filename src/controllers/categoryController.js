import { CategoryModel } from '../models/categoryModel.js';

export const CategoryController = {
  async getCategories(req, res) {//GET /api/categories
    try {
      const categories = await CategoryModel.getAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getCategoryById(req, res) {//GET /api/categories/:id
    try {
      const category = await CategoryModel.getById(req.params.id);
      if (!category) return res.status(404).json({ error: 'Kategori tidak ditemukan.' });
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async addCategory(req, res) {//POST /api/categories
    try {
      const category = await CategoryModel.create(req.body.name);
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateCategory(req, res) {//PUT /api/categories/:id
    try {
      const updated = await CategoryModel.update(req.params.id, req.body.name);
      if (!updated) return res.status(404).json({ error: 'Kategori tidak ditemukan.' });
      res.json({ message: 'Kategori berhasil diperbarui.', data: updated });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteCategory(req, res) {//DELETE /api/categories/:id
    try {
      const existing = await CategoryModel.getById(req.params.id);
      if (!existing) return res.status(404).json({ error: 'Kategori tidak ditemukan.' });
      const result = await CategoryModel.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};