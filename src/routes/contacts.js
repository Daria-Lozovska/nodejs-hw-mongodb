import express from "express";
import {
  getContacts,
  getContact,
  addContact,
  patchContact,
  removeContact,
} from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactValidation.js";

const router = express.Router();

router.get("/", ctrlWrapper(getContacts));
router.get("/:contactId", isValidId, ctrlWrapper(getContact));
router.post("/", validateBody(createContactSchema), ctrlWrapper(addContact));
router.patch(
  "/:contactId",
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContact)
);
router.delete("/:contactId", isValidId, ctrlWrapper(removeContact));

export default router;
