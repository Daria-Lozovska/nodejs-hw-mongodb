import express from 'express';
import { registerController, loginController, refreshController, logoutController } from '../controllers/auth.js';
import {validateBody} from "../utils/validateBody.js";
import {authLoginSchema, authRegistrationSchema} from "../schemas/authValidation.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const router = express.Router();

router.post('/register',validateBody(authRegistrationSchema), ctrlWrapper(registerController));
router.post('/login',validateBody(authLoginSchema), ctrlWrapper(loginController));
router.post('/refresh', ctrlWrapper(refreshController));
router.post('/logout', ctrlWrapper(logoutController));

export default router;
