import Master from "../models/master.js"

// Controlador para el módulo de masters
const mastersController = {
  /**
   * Obtener todos los maestros (para el select)
   */
  getMaestros: async (req, res) => {
    try {
      const maestros = await Master.getMaestros()
      res.json({ DATA: maestros })
    } catch (error) {
      res.status(500).json({ ERROR: "Error en la consulta a la base de datos" })
    }
  },

  /**
   * Obtener todas las materias (para el select)
   */
  getMaterias: async (req, res) => {
    try {
      const materias = await Master.getMaterias()
      res.json({ DATA: materias })
    } catch (error) {
      res.status(500).json({ ERROR: "Error en la consulta a la base de datos" })
    }
  },

  /**
   * Obtener todos los asesores (para el select)
   */
  getAsesores: async (req, res) => {
    try {
      const asesores = await Master.getAsesores()
      res.json({ DATA: asesores })
    } catch (error) {
      res.status(500).json({ ERROR: "Error en la consulta a la base de datos" })
    }
  },

  /**
   * Obtener todas las solicitudes (para el select)
   */
  getSolicitudes: async (req, res) => {
    try {
      const solicitudes = await Master.getSolicitudes()
      res.json({ DATA: solicitudes })
    } catch (error) {
      res.status(500).json({ ERROR: "Error en la consulta a la base de datos" })
    }
  },

  /**
   * Buscar información según diferentes criterios
   */
  buscar: async (req, res) => {
    try {
      const { maestro, materia, asesor } = req.body

      // Verificar que al menos un criterio de búsqueda esté presente
      if ((!maestro || maestro === "") && (!materia || materia === "") && (!asesor || asesor === "")) {
        return res.status(400).json({
          STATUS: "ERROR",
          ERROR: "No se proporcionaron parámetros de búsqueda válidos.",
          DATA: [],
        })
      }

      const result = await Master.buscar({ maestro, materia, asesor })
      res.json(result)
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
        DATA: [],
      })
    }
  },
}

export default mastersController
