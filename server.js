import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import routes from "./routes/index.js"

// Configuración para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")))

// Configurar rutas de la API
app.use("/api", routes)

// Rutas para las páginas de autenticación
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"))
})

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"))
})

// Rutas para las páginas protegidas
// Estas rutas ahora requieren autenticación en el frontend
app.get("/materias", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "materias.html"))
})

app.get("/maestros", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "maestros.html"))
})

app.get("/asesores", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "asesores.html"))
})

app.get("/solicitudes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "solicitudes.html"))
})

app.get("/masters", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "masters.html"))
})

// Ruta para la página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send("Página no encontrada")
})

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Error interno del servidor")
})

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
