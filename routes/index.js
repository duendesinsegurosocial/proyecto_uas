import express from "express"
import materiasRoutes from "./materias.js"
import maestrosRoutes from "./maestros.js"
import asesoresRoutes from "./asesores.js"
import solicitudesRoutes from "./solicitudes.js"
import mastersRoutes from "./masters.js"
import authRoutes from "./auth.js"

const router = express.Router()

// Configurar rutas
router.use("/auth", authRoutes)
router.use("/materias", materiasRoutes)
router.use("/maestros", maestrosRoutes)
router.use("/asesores", asesoresRoutes)
router.use("/solicitudes", solicitudesRoutes)
router.use("/masters", mastersRoutes)

export default router
