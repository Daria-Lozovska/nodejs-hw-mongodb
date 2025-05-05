import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} from '../controllers/contacts.js';

const router = express.Router();

router.use(authenticate); 

router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.post('/', addContact);
router.delete('/:id', deleteContact);
router.patch('/:id', updateContact);

export default router;
