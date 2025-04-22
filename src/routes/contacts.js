import express from "express";
import getContacts from "../controllers/contacts.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", authenticate, getContacts);

export default router;
