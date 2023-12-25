import { Router } from "express";
import { loginController } from "./controller.js";


const router = Router()

router.get('/login', loginController)

export default router