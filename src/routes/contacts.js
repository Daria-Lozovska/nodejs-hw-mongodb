import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.use(authenticate); 

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:id', getContactById);
router.post('/', addContact);
router.delete('/:id', deleteContact);
router.patch('/:id', updateContact);

export default router;
