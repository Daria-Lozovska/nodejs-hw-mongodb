import express from "express";
import { register, login, logout, refresh } from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.post("/refresh", refresh);

export default router;
