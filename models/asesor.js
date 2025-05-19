import Database from "../config/database.js"

class Asesor {
  /**
   * Obtener todos los asesores (alumnos)
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getAll() {
    const db = Database.getInstance()
    const sql = "SELECT * FROM alumnos"
    return await db.get_data(sql)
  }

  /**
   * Obtener un asesor por su ID
   * @param {string} id_alumno - ID del alumno
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getById(id_alumno) {
    const db = Database.getInstance()
    const sql = "SELECT * FROM alumnos WHERE id_alumno = ?"
    return await db.get_data(sql, [id_alumno])
  }

  /**
   * Crear un nuevo asesor
   * @param {Object} asesor - Datos del asesor
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async create(asesor) {
    const db = Database.getInstance()
    const sql =
      "INSERT INTO alumnos (id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    return await db.exec(sql, [
      asesor.id_alumno,
      asesor.nombre,
      asesor.apellido,
      asesor.telefono,
      asesor.correo,
      asesor.maestro,
      asesor.carrera,
      asesor.materia,
    ])
  }

  /**
   * Actualizar un asesor existente
   * @param {Object} asesor - Datos del asesor
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async update(asesor) {
    const db = Database.getInstance()
    const sql =
      "UPDATE alumnos SET nombre = ?, apellido = ?, telefono = ?, correo = ?, maestro = ?, carrera = ?, materia = ? WHERE id_alumno = ?"
    return await db.exec(sql, [
      asesor.nombre,
      asesor.apellido,
      asesor.telefono,
      asesor.correo,
      asesor.maestro,
      asesor.carrera,
      asesor.materia,
      asesor.id_alumno,
    ])
  }

  /**
   * Eliminar un asesor
   * @param {string} id_alumno - ID del alumno
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_alumno) {
    const db = Database.getInstance()
    const sql = "DELETE FROM alumnos WHERE id_alumno = ?"
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
   * Obtener todos los maestros (para el select)
   * @returns {Promise<Array>} Lista de maestros
   */
  static async getMaestros() {
    const db = Database.getInstance()
    const sql = "SELECT id_maestro, nombres, apellidos FROM maestros"
    const result = await db.get_data(sql)
    return result.DATA
  }
}

export default Asesor
