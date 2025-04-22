import express from "express";
import {
  getContacts,
  getContact,
  addContact,
  updateContactById,
  deleteContactById,
} from "../controllers/contacts.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.use(authenticate); // захист усіх маршрутів

router.get("/", getContacts);              // GET /contacts
router.get("/:id", getContact);            // GET /contacts/:id
router.post("/", addContact);              // POST /contacts
router.put("/:id", updateContactById);     // PUT /contacts/:id
router.delete("/:id", deleteContactById);  // DELETE /contacts/:id

export default router;
