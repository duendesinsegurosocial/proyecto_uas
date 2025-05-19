import express from "express"
import solicitudesController from "../controllers/solicitudesController.js"

const router = express.Router()

// Rutas para el módulo de solicitudes
router.get("/", solicitudesController.getAll)
router.get("/materias", solicitudesController.getMaterias)
router.get("/asesores", solicitudesController.getAsesores)
router.get("/:id", solicitudesController.getById)
router.post("/guardar", solicitudesController.create)
router.post("/editar", solicitudesController.update)
router.post("/eliminar", solicitudesController.delete)

export default router
