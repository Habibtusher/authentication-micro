import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post("/register",validateRequest(AuthValidation.registration),AuthController.registerUser)
router.post("/login",validateRequest(AuthValidation.login),AuthController.loginUser)

export const AuthRoutes = router;
