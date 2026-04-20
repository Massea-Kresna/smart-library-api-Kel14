import express from 'express';
import { MemberController } from '../controllers/memberController.js';

const router = express.Router();

router.get('/', MemberController.getAllMembers); //GET semua member
router.get('/:id', MemberController.getMemberById); //GET member by Id
router.post('/', MemberController.registerMember); //POST daftar member
router.put('/:id', MemberController.updateMember); //PUT update member
router.delete('/:id', MemberController.deleteMember); //DELETE hapus member

export default router;