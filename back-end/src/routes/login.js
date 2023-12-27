import { Router } from "express";
import { loginController } from "../controllers/login.js";


const router = Router()

router.post('/login', loginController)

export default router