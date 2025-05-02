import express from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getContacts);
router.post('/', authenticate, createContact);
router.patch('/:id', authenticate, updateContact);
router.delete('/:id', authenticate, deleteContact);

export default router;
