import express from "express"
import maestrosController from "../controllers/maestrosController.js"

const router = express.Router()

// Rutas para el módulo de maestros
router.get("/", maestrosController.getAll)
router.get("/materias", maestrosController.getMaterias)
router.get("/:id", maestrosController.getById)
router.post("/guardar", maestrosController.create)
router.post("/editar", maestrosController.update)
router.post("/eliminar", maestrosController.delete)

export default router
