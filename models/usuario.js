import Database from "../config/database.js"
import bcrypt from "bcryptjs"

class Usuario {
  /**
   * Obtener un usuario por su nombre de usuario
   * @param {string} username - Nombre de usuario
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getByUsername(username) {
    const db = Database.getInstance()
    const sql = "SELECT * FROM usuarios WHERE username = ?"
    return await db.get_data(sql, [username])
  }

  /**
   * Crear un nuevo usuario
   * @param {Object} usuario - Datos del usuario
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async create(usuario) {
    const db = Database.getInstance()

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(usuario.password, salt)

    const sql = "INSERT INTO usuarios (username, password, nombre, rol) VALUES (?, ?, ?, ?)"
    return await db.exec(sql, [
      usuario.username,
      hashedPassword,
      usuario.nombre,
      usuario.rol || "usuario", // Por defecto, rol de usuario
    ])
  }

  /**
   * Verificar si las credenciales son válidas
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise<Object|null>} Usuario si las credenciales son válidas, null en caso contrario
   */
  static async verificarCredenciales(username, password) {
    const result = await this.getByUsername(username)

    if (result.STATUS !== "OK" || result.DATA.length === 0) {
      return null
    }

    const usuario = result.DATA[0]
    const passwordValida = await bcrypt.compare(password, usuario.password)

    if (!passwordValida) {
      return null
    }

    // No devolver la contraseña
    delete usuario.password
    return usuario
  }
}

export default Usuario
