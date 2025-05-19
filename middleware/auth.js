import jwt from "jsonwebtoken"

// Clave secreta para verificar los tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_temporal"

/**
 * Middleware para verificar el token JWT
 */
export const verificarToken = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      STATUS: "ERROR",
      ERROR: "Acceso denegado. No se proporcionó token de autenticación.",
    })
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET)
    req.usuario = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      STATUS: "ERROR",
      ERROR: "Token inválido o expirado.",
    })
  }
}

/**
 * Middleware para verificar roles
 * @param {string[]} roles - Roles permitidos
 */
export const verificarRol = (roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        STATUS: "ERROR",
        ERROR: "Acceso denegado. Usuario no autenticado.",
      })
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        STATUS: "ERROR",
        ERROR: "Acceso denegado. No tienes permisos suficientes.",
      })
    }

    next()
  }
}
