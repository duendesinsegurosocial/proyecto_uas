import Database from "../config/database.js"

class Maestro {
  /**
   * Obtener todos los maestros
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getAll() {
    const db = Database.getInstance()
    const sql = "SELECT * FROM maestros"
    return await db.get_data(sql)
  }

  /**
   * Obtener un maestro por su ID
   * @param {string} id_maestro - ID del maestro
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getById(id_maestro) {
    const db = Database.getInstance()
    const sql = "SELECT * FROM maestros WHERE id_maestro = ?"
    return await db.get_data(sql, [id_maestro])
  }

  /**
   * Crear un nuevo maestro
   * @param {Object} maestro - Datos del maestro
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async create(maestro) {
    const db = Database.getInstance()
    const sql =
      "INSERT INTO maestros (id_maestro, nombres, apellidos, materia, carrera, telefono, correo) VALUES (?, ?, ?, ?, ?, ?, ?)"
    return await db.exec(sql, [
      maestro.id_maestro,
      maestro.nombres,
      maestro.apellidos,
      maestro.materia,
      maestro.carrera,
      maestro.telefono,
      maestro.correo,
    ])
  }

  /**
   * Actualizar un maestro existente
   * @param {Object} maestro - Datos del maestro
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async update(maestro) {
    const db = Database.getInstance()
    const sql =
      "UPDATE maestros SET nombres = ?, apellidos = ?, materia = ?, carrera = ?, telefono = ?, correo = ? WHERE id_maestro = ?"
    return await db.exec(sql, [
      maestro.nombres,
      maestro.apellidos,
      maestro.materia,
      maestro.carrera,
      maestro.telefono,
      maestro.correo,
      maestro.id_maestro,
    ])
  }

  /**
   * Eliminar un maestro
   * @param {string} id_maestro - ID del maestro
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_maestro) {
    const db = Database.getInstance()
    const sql = "DELETE FROM maestros WHERE id_maestro = ?"
    return await db.exec(sql, [id_maestro])
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
}

export default Maestro
