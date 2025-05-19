import Database from "../config/database.js"

class Solicitud {
  /**
   * Obtener todas las solicitudes
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getAll() {
    const db = Database.getInstance()
    const sql = "SELECT * FROM solicitud"
    return await db.get_data(sql)
  }

  /**
   * Obtener una solicitud por su ID
   * @param {string} id_alumno - ID del alumno
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getById(id_alumno) {
    const db = Database.getInstance()
    const sql = "SELECT * FROM solicitud WHERE id_alumno = ?"
    return await db.get_data(sql, [id_alumno])
  }

  /**
   * Crear una nueva solicitud
   * @param {Object} solicitud - Datos de la solicitud
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async create(solicitud) {
    const db = Database.getInstance()
    const sql =
      "INSERT INTO solicitud (id_alumno, nombres, apellidos, carrera, asesor, materia) VALUES (?, ?, ?, ?, ?, ?)"
    return await db.exec(sql, [
      solicitud.id_alumno,
      solicitud.nombres,
      solicitud.apellidos,
      solicitud.carrera,
      solicitud.asesor,
      solicitud.materia,
    ])
  }

  /**
   * Actualizar una solicitud existente
   * @param {Object} solicitud - Datos de la solicitud
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async update(solicitud) {
    const db = Database.getInstance()
    const sql =
      "UPDATE solicitud SET nombres = ?, apellidos = ?, carrera = ?, asesor = ?, materia = ? WHERE id_alumno = ?"
    return await db.exec(sql, [
      solicitud.nombres,
      solicitud.apellidos,
      solicitud.carrera,
      solicitud.asesor,
      solicitud.materia,
      solicitud.id_alumno,
    ])
  }

  /**
   * Eliminar una solicitud
   * @param {string} id_alumno - ID del alumno
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_alumno) {
    const db = Database.getInstance()
    const sql = "DELETE FROM solicitud WHERE id_alumno = ?"
    return await db.exec(sql, [id_alumno])
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
}

export default Solicitud
