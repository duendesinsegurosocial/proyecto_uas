import Materia from "../models/materia.js"

// Controlador para el módulo de materias
const materiasController = {
  /**
   * Obtener todas las materias
   */
  getAll: async (req, res) => {
    try {
      const result = await Materia.getAll()
      res.json(result)
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
        DATA: [],
      })
    }
  },

  /**
   * Obtener una materia por su ID
   */
  getById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await Materia.getById(id)
      res.json(result)
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
        DATA: [],
      })
    }
  },

  /**
   * Crear una nueva materia
   */
  create: async (req, res) => {
    try {
      const { id_materia, nombre_materia } = req.body

      if (!id_materia || !nombre_materia) {
        return res.status(400).send("Por favor, completa todos los campos.")
      }

      const result = await Materia.create({ id_materia, nombre_materia })

      if (result.STATUS === "OK") {
        res.send("Registro guardado correctamente.")
      } else {
        res.status(400).send(`Error al guardar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
    }
  },

  /**
   * Actualizar una materia existente
   */
  update: async (req, res) => {
    try {
      const { id_materia, nombre_materia } = req.body

      if (!id_materia || !nombre_materia) {
        return res.status(400).send("Por favor, completa todos los campos.")
      }

      const result = await Materia.update({ id_materia, nombre_materia })

      if (result.STATUS === "OK") {
        res.send("Registro actualizado correctamente.")
      } else {
        res.status(400).send(`Error al actualizar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
    }
  },

  /**
   * Eliminar una materia
   */
  delete: async (req, res) => {
    try {
      const { id_materia } = req.body

      if (!id_materia) {
        return res.status(400).send("Por favor, proporciona el ID de la materia.")
      }

      const result = await Materia.delete(id_materia)

      if (result.STATUS === "OK") {
        res.send("Registro eliminado correctamente.")
      } else {
        res.status(400).send(`Error al eliminar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
    }
  },
}

export default materiasController
