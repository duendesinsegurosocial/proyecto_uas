import Solicitud from "../models/solicitud.js"

// Controlador para el módulo de solicitudes
const solicitudesController = {
  /**
   * Obtener todas las solicitudes
   */
  getAll: async (req, res) => {
    try {
      const result = await Solicitud.getAll()
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
   * Obtener una solicitud por su ID
   */
  getById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await Solicitud.getById(id)
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
   * Crear una nueva solicitud
   */
  create: async (req, res) => {
    try {
      const { id_alumno, nombres, apellidos, carrera, asesor, materia } = req.body

      if (!id_alumno || !nombres || !apellidos || !carrera || !asesor || !materia) {
        return res.status(400).send("Por favor, completa todos los campos.")
      }

      const result = await Solicitud.create({
        id_alumno,
        nombres,
        apellidos,
        carrera,
        asesor,
        materia,
      })

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
   * Actualizar una solicitud existente
   */
  update: async (req, res) => {
    try {
      const { id_alumno, nombres, apellidos, carrera, asesor, materia } = req.body

      if (!id_alumno) {
        return res.status(400).send("Por favor, ingresa un ID de alumno válido.")
      }

      const result = await Solicitud.update({
        id_alumno,
        nombres,
        apellidos,
        carrera,
        asesor,
        materia,
      })

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
   * Eliminar una solicitud
   */
  delete: async (req, res) => {
    try {
      const { id_alumno } = req.body

      if (!id_alumno) {
        return res.status(400).send("Por favor, ingresa un ID de alumno válido.")
      }

      const result = await Solicitud.delete(id_alumno)

      if (result.STATUS === "OK") {
        res.send("Registro eliminado correctamente.")
      } else {
        res.status(400).send(`Error al eliminar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
    }
  },

  /**
   * Obtener todas las materias (para el select)
   */
  getMaterias: async (req, res) => {
    try {
      const materias = await Solicitud.getMaterias()
      res.json(materias)
    } catch (error) {
      res.status(500).json([])
    }
  },

  /**
   * Obtener todos los asesores (para el select)
   */
  getAsesores: async (req, res) => {
    try {
      const asesores = await Solicitud.getAsesores()
      res.json(asesores)
    } catch (error) {
      res.status(500).json([])
    }
  },
}

export default solicitudesController
