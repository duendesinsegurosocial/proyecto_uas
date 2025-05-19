// Configuración global de la aplicación
const config = {
  // Configuración del servidor
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
  },

  // Configuración de la base de datos
  database: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "practicas_pruebas",
  },

  // Configuración de seguridad
  security: {
    cors: {
      origin: "*", // En producción, limitar a dominios específicos
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  },
}

export default config
