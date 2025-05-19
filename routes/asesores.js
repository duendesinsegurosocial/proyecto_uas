import express from "express"
import asesoresController from "../controllers/asesoresController.js"

const router = express.Router()

// Rutas para el módulo de asesores
router.get("/", asesoresController.getAll)
router.get("/materias", asesoresController.getMaterias)
router.get("/maestros", asesoresController.getMaestros)
router.get("/:id", asesoresController.getById)
router.post("/guardar", asesoresController.create)
router.post("/editar", asesoresController.update)
router.post("/eliminar", asesoresController.delete)

export default router
