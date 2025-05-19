import express from "express"
import authController from "../controllers/authController.js"
import { verificarToken } from "../middleware/auth.js"

const router = express.Router()

// Rutas para la autenticación
router.post("/login", authController.login)
router.post("/register", authController.register)
router.get("/verificar", verificarToken, authController.verificarToken)

export default router
