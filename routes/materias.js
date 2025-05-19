import express from "express"
import materiasController from "../controllers/materiasController.js"

const router = express.Router()

// Rutas para el módulo de materias
router.get("/", materiasController.getAll)
router.get("/:id", materiasController.getById)
router.post("/guardar", materiasController.create)
router.post("/editar", materiasController.update)
router.post("/eliminar", materiasController.delete)

export default router
