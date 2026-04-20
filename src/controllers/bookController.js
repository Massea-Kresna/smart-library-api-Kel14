import { BookModel } from '../models/bookModel.js';

export const BookController = {
  async getAllBooks(req, res) {//GET /api/books
    try {
      const books = await BookModel.getAll();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getBookById(req, res) {//GET /api/books/:id
    try {
      const book = await BookModel.getById(req.params.id);
      if (!book) return res.status(404).json({ error: 'Buku tidak ditemukan.' });
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async createBook(req, res) {//POST /api/books
    try {
      const newBook = await BookModel.create(req.body);
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateBook(req, res) {//PUT /api/books/:id
    try {
      const updated = await BookModel.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Buku tidak ditemukan.' });
      res.json({ message: 'Data buku berhasil diperbarui.', data: updated });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteBook(req, res) {//DELETE /api/books/:id
    try {
      const existing = await BookModel.getById(req.params.id);
      if (!existing) return res.status(404).json({ error: 'Buku tidak ditemukan.' });
      const result = await BookModel.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};