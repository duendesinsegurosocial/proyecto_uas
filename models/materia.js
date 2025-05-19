import Database from "../config/database.js"

class Materia {
  /**
   * Obtener todas las materias
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getAll() {
    const db = Database.getInstance()
    const sql = "SELECT * FROM materias"
    return await db.get_data(sql)
  }

  /**
   * Obtener una materia por su ID
   * @param {string} id_materia - ID de la materia
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getById(id_materia) {
    const db = Database.getInstance()
    const sql = "SELECT * FROM materias WHERE id_materia = ?"
    return await db.get_data(sql, [id_materia])
  }

  /**
   * Crear una nueva materia
   * @param {Object} materia - Datos de la materia
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async create(materia) {
    const db = Database.getInstance()
    const sql = "INSERT INTO materias (id_materia, nombre_materia) VALUES (?, ?)"
    return await db.exec(sql, [materia.id_materia, materia.nombre_materia])
  }

  /**
   * Actualizar una materia existente
   * @param {Object} materia - Datos de la materia
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async update(materia) {
    const db = Database.getInstance()
    // Corregido el nombre de la tabla de "mateias" a "materias"
    const sql = "UPDATE materias SET nombre_materia = ? WHERE id_materia = ?"
    return await db.exec(sql, [materia.nombre_materia, materia.id_materia])
  }

  /**
   * Eliminar una materia
   * @param {string} id_materia - ID de la materia
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_materia) {
    const db = Database.getInstance()
    const sql = "DELETE FROM materias WHERE id_materia = ?"
    return await db.exec(sql, [id_materia])
  }
}

export default Materia
