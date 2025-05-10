import express from "express";
import {
  getContacts,
  getContact,
  addContact,
  patchContact,
  removeContact,
} from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const router = express.Router();

router.get("/", ctrlWrapper(getContacts));
router.get("/:contactId", ctrlWrapper(getContact));
router.post("/", ctrlWrapper(addContact));
router.patch("/:contactId", ctrlWrapper(patchContact));
router.delete("/:contactId", ctrlWrapper(removeContact));

export default router;
