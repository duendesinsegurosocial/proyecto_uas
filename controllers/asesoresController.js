import Asesor from "../models/asesor.js"

// Controlador para el módulo de asesores
const asesoresController = {
  /**
   * Obtener todos los asesores
   */
  getAll: async (req, res) => {
    try {
      const result = await Asesor.getAll()
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
   * Obtener un asesor por su ID
   */
  getById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await Asesor.getById(id)
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
   * Crear un nuevo asesor
   */
  create: async (req, res) => {
    try {
      const { id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia } = req.body

      if (!id_alumno || !nombre || !apellido || !telefono || !correo || !maestro || !carrera || !materia) {
        return res.status(400).send("Por favor, completa todos los campos.")
      }

      const result = await Asesor.create({
        id_alumno,
        nombre,
        apellido,
        telefono,
        correo,
        maestro,
        carrera,
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
   * Actualizar un asesor existente
   */
  update: async (req, res) => {
    try {
      const { id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia } = req.body

      if (!id_alumno) {
        return res.status(400).send("Por favor, ingresa un ID de alumno válido.")
      }

      const result = await Asesor.update({
        id_alumno,
        nombre,
        apellido,
        telefono,
        correo,
        maestro,
        carrera,
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
   * Eliminar un asesor
   */
  delete: async (req, res) => {
    try {
      const { id_alumno } = req.body

      if (!id_alumno) {
        return res.status(400).send("Por favor, ingresa un ID de alumno válido.")
      }

      const result = await Asesor.delete(id_alumno)

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
      const materias = await Asesor.getMaterias()
      res.json({ DATA: materias })
    } catch (error) {
      res.status(500).json({ ERROR: "Error en la consulta" })
    }
  },

  /**
   * Obtener todos los maestros (para el select)
   */
  getMaestros: async (req, res) => {
    try {
      const maestros = await Asesor.getMaestros()
      res.json({ DATA: maestros })
    } catch (error) {
      res.status(500).json({ ERROR: "Error en la consulta" })
    }
  },
}

export default asesoresController
