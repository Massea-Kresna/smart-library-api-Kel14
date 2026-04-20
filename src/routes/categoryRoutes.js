import express from 'express';
import { CategoryController } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', CategoryController.getCategories); //GET semua category
router.get('/:id', CategoryController.getCategoryById); //GET category by Id
router.post('/', CategoryController.addCategory); //POST tambah category
router.put('/:id', CategoryController.updateCategory); //PUT update category
router.delete('/:id', CategoryController.deleteCategory); //DELETE hapus category

export default router;