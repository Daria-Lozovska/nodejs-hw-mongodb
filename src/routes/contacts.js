import express from "express";
import {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact
} from "../controllers/contacts.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.use(authenticate);
router.get("/", getContacts);
router.get("/:id", getContact);
router.post("/", addContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
