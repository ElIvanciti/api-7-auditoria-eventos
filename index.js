const express = require("express");
const connectDB = require("./src/models/db");
const dotenv = require("dotenv");
const helmet = require("helmet");
const winston = require("winston");

const authRoutes = require("./src/routes/AuthRoutes");
const verificarToken = require("./src/middlewares/authMiddleware");
const auditoriaRoutes = require("./src/routes/AuditoriaRoutes");
const auditoriaMiddleware = require("./src/middlewares/auditoriaMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(helmet());

// Ruta pública para generar el JWT
app.use("/auth", authRoutes);

// Desde aquí, todas las rutas requieren app-token
app.use(verificarToken);

// Middleware de auditoría
app.use(auditoriaMiddleware);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: "audit.log",
    }),
    new winston.transports.Console(),
  ],
});

// Registro adicional para POST, PUT y DELETE
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
      const log = {
        timestamp: new Date().toISOString(),
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        userId: req.headers["user-id"] || "anonymous",
        duration: `${Date.now() - start}ms`,
      };

      logger.info(log);
    }
  });

  next();
});

// Rutas protegidas
app.use("/api/auditoria", auditoriaRoutes);

app.get("/", (req, res) => {
  res.send("API 7 - Auditoría de Eventos Críticos");
});

app.post("/api/prueba", (req, res) => {
  res.status(201).json({
    message: "Petición POST registrada en auditoría",
  });
});

const PORT = process.env.PORT || 5100;

// Ejecutar servidor localmente, pero no dentro de Vercel
if (!process.env.VERCEL && process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`API 7 ejecutándose en el puerto ${PORT}`);
  });
}

module.exports = app;