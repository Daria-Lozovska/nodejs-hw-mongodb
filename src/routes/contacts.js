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
import {validateBody} from "../utils/validateBody.js";
import {createContactSchema, updateContactSchema} from "../schemas/contactValidation.js";

const router = express.Router();

router.use(authenticate); 

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:id', ctrlWrapper(getContactById));
router.post('/', validateBody(createContactSchema), ctrlWrapper(addContact));
router.delete('/:id', ctrlWrapper(deleteContact));
router.patch('/:id',validateBody(updateContactSchema), ctrlWrapper(updateContact));

export default router;
