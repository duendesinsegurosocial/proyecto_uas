import Maestro from "../models/maestro.js"

// Controlador para el módulo de maestros
const maestrosController = {
  /**
   * Obtener todos los maestros
   */
  getAll: async (req, res) => {
    try {
      const result = await Maestro.getAll()
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
   * Obtener un maestro por su ID
   */
  getById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await Maestro.getById(id)
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
   * Crear un nuevo maestro
   */
  create: async (req, res) => {
    try {
      const { id_maestro, nombres, apellidos, materia, carrera, telefono, correo } = req.body

      if (!id_maestro || !nombres || !apellidos || !materia || !carrera || !telefono || !correo) {
        return res.status(400).send("Por favor, completa todos los campos.")
      }

      const result = await Maestro.create({
        id_maestro,
        nombres,
        apellidos,
        materia,
        carrera,
        telefono,
        correo,
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
   * Actualizar un maestro existente
   */
  update: async (req, res) => {
    try {
      const { id_maestro, nombres, apellidos, materia, carrera, telefono, correo } = req.body

      if (!id_maestro) {
        return res.status(400).send("Por favor, ingresa un ID de maestro válido.")
      }

      const result = await Maestro.update({
        id_maestro,
        nombres,
        apellidos,
        materia,
        carrera,
        telefono,
        correo,
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
   * Eliminar un maestro
   */
  delete: async (req, res) => {
    try {
      const { id_maestro } = req.body

      if (!id_maestro) {
        return res.status(400).send("Por favor, ingresa un ID de maestro válido.")
      }

      const result = await Maestro.delete(id_maestro)

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
      const materias = await Maestro.getMaterias()
      res.json(materias)
    } catch (error) {
      res.status(500).json([])
    }
  },
}

export default maestrosController
