import jwt from "jsonwebtoken"
import Usuario from "../models/usuario.js"

// Clave secreta para firmar los tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_temporal"

// Controlador para la autenticación
const authController = {
  /**
   * Iniciar sesión
   */
  login: async (req, res) => {
    try {
      const { username, password } = req.body

      if (!username || !password) {
        return res.status(400).json({
          STATUS: "ERROR",
          ERROR: "Por favor, proporciona nombre de usuario y contraseña.",
        })
      }

      const usuario = await Usuario.verificarCredenciales(username, password)

      if (!usuario) {
        return res.status(401).json({
          STATUS: "ERROR",
          ERROR: "Credenciales inválidas.",
        })
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: usuario.id, username: usuario.username, rol: usuario.rol },
        JWT_SECRET,
        { expiresIn: "8h" }, // El token expira en 8 horas
      )

      res.json({
        STATUS: "OK",
        DATA: {
          token,
          usuario: {
            id: usuario.id,
            username: usuario.username,
            nombre: usuario.nombre,
            rol: usuario.rol,
          },
        },
      })
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
      })
    }
  },

  /**
   * Registrar un nuevo usuario
   */
  register: async (req, res) => {
    try {
      const { username, password, nombre, rol } = req.body

      if (!username || !password || !nombre) {
        return res.status(400).json({
          STATUS: "ERROR",
          ERROR: "Por favor, completa todos los campos requeridos.",
        })
      }

      // Verificar si el usuario ya existe
      const usuarioExistente = await Usuario.getByUsername(username)
      if (usuarioExistente.STATUS === "OK" && usuarioExistente.DATA.length > 0) {
        return res.status(400).json({
          STATUS: "ERROR",
          ERROR: "El nombre de usuario ya está en uso.",
        })
      }

      // Crear el nuevo usuario
      const result = await Usuario.create({
        username,
        password,
        nombre,
        rol,
      })

      if (result.STATUS !== "OK") {
        return res.status(500).json({
          STATUS: "ERROR",
          ERROR: result.ERROR || "Error al crear el usuario.",
        })
      }

      res.status(201).json({
        STATUS: "OK",
        MESSAGE: "Usuario creado correctamente.",
      })
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
      })
    }
  },

  /**
   * Verificar el token JWT
   */
  verificarToken: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]

      if (!token) {
        return res.status(401).json({
          STATUS: "ERROR",
          ERROR: "No se proporcionó token de autenticación.",
        })
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET)
        res.json({
          STATUS: "OK",
          DATA: {
            usuario: decoded,
          },
        })
      } catch (error) {
        return res.status(401).json({
          STATUS: "ERROR",
          ERROR: "Token inválido o expirado.",
        })
      }
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
      })
    }
  },
}

export default authController
