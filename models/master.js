import Database from "../config/database.js"

class Master {
  /**
   * Obtener todos los maestros (para el select)
   * @returns {Promise<Array>} Lista de maestros
   */
  static async getMaestros() {
    const db = Database.getInstance()
    const sql = "SELECT id_maestro, nombres, apellidos FROM maestros"
    const result = await db.get_data(sql)
    return result.DATA
  }

  /**
   * Obtener todas las materias (para el select)
   * @returns {Promise<Array>} Lista de materias
   */
  static async getMaterias() {
    const db = Database.getInstance()
    const sql = "SELECT id_materia, nombre_materia FROM materias"
    const result = await db.get_data(sql)
    return result.DATA
  }

  /**
   * Obtener todos los asesores (para el select)
   * @returns {Promise<Array>} Lista de asesores
   */
  static async getAsesores() {
    const db = Database.getInstance()
    const sql = "SELECT id_alumno, nombre FROM alumnos WHERE nombre IS NOT NULL"
    const result = await db.get_data(sql)

    // Transformar los datos para mantener la misma estructura que en PHP
    return result.DATA.map((asesor) => ({
      id_alumno: asesor.id_alumno,
      nombre_asesor: asesor.nombre,
    }))
  }

  /**
   * Obtener todas las solicitudes (para el select)
   * @returns {Promise<Array>} Lista de solicitudes
   */
  static async getSolicitudes() {
    const db = Database.getInstance()
    const sql = "SELECT id_alumno, nombres, apellidos FROM solicitud"
    const result = await db.get_data(sql)
    return result.DATA
  }

  /**
   * Buscar información según diferentes criterios
   * @param {Object} criterios - Criterios de búsqueda
   * @returns {Promise<Object>} Resultado de la búsqueda
   */
  static async buscar(criterios) {
    const db = Database.getInstance()
    let sql = ""
    let params = []

    // Construir la consulta según los parámetros proporcionados
    if (criterios.materia && criterios.materia !== "") {
      sql = `
        SELECT 
          alumnos.nombre, 
          maestros.nombres AS maestro, 
          materias.nombre_materia
        FROM alumnos
        INNER JOIN maestros ON alumnos.materia = maestros.materia
        INNER JOIN materias ON alumnos.materia = materias.id_materia
        WHERE materias.id_materia = ?
      `
      params = [criterios.materia]
    } else if (criterios.maestro && criterios.maestro !== "") {
      sql = `
        SELECT 
          alumnos.nombre, 
          maestros.nombres AS maestro, 
          materias.nombre_materia
        FROM alumnos
        INNER JOIN maestros ON alumnos.materia = maestros.materia
        INNER JOIN materias ON alumnos.materia = materias.id_materia
        WHERE maestros.id_maestro = ?
      `
      params = [criterios.maestro]
    } else if (criterios.asesor && criterios.asesor !== "") {
      sql = `
        SELECT 
          alumnos.nombre, 
          maestros.nombres AS maestro, 
          materias.nombre_materia
        FROM alumnos
        INNER JOIN maestros ON alumnos.materia = maestros.materia
        INNER JOIN materias ON alumnos.materia = materias.id_materia
        WHERE alumnos.id_alumno = ?
      `
      params = [criterios.asesor]
    } else {
      return {
        STATUS: "ERROR",
        ERROR: "No se proporcionaron parámetros de búsqueda válidos.",
        DATA: [],
      }
    }

    try {
      const conn = db.getConnection()
      const [rows] = await conn.execute(sql, params)

      return {
        STATUS: "OK",
        ERROR: "",
        DATA: rows,
      }
    } catch (error) {
      return {
        STATUS: "ERROR",
        ERROR: error.message,
        DATA: [],
      }
    }
  }
}

export default Master
