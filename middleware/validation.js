/**
 * Middleware para validar datos de entrada
 */

// Validar campos requeridos
export const validateRequired = (fields) => {
  return (req, res, next) => {
    for (const field of fields) {
      if (!req.body[field]) {
        return res.status(400).send(`El campo ${field} es requerido.`)
      }
    }
    next()
  }
}

// Validar que un campo sea numérico
export const validateNumeric = (fields) => {
  return (req, res, next) => {
    for (const field of fields) {
      if (req.body[field] && isNaN(req.body[field])) {
        return res.status(400).send(`El campo ${field} debe ser numérico.`)
      }
    }
    next()
  }
}

// Validar longitud máxima de un campo
export const validateMaxLength = (field, maxLength) => {
  return (req, res, next) => {
    if (req.body[field] && req.body[field].length > maxLength) {
      return res.status(400).send(`El campo ${field} no debe exceder ${maxLength} caracteres.`)
    }
    next()
  }
}
