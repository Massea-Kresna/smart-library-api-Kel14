import express from 'express';
import { AuthorController } from '../controllers/authorController.js';

const router = express.Router();

router.get('/', AuthorController.getAuthors); // GET semua penulis
router.get('/:id', AuthorController.getAuthorById); // GET penulis by Id
router.post('/', AuthorController.addAuthor); // POST tambah penulis
router.put('/:id', AuthorController.updateAuthor); // PUT update penulis
router.delete('/:id', AuthorController.deleteAuthor); // DELETE hapus penulis

export default router;