import express from 'express';
import { BookController } from '../controllers/bookController.js';

const router = express.Router();

router.get('/', BookController.getAllBooks); //GET semua buku
router.get('/:id', BookController.getBookById); //GET buku by Id
router.post('/', BookController.createBook); //POST tambah buku
router.put('/:id', BookController.updateBook); //PUT update buku
router.delete('/:id', BookController.deleteBook); //DELETE hapus buku

export default router;