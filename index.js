const express = require("express");
//const connectDB = require("./src/models/db");
const dotenv = require("dotenv");
const helmet = require("helmet");
//const auditoriaRoutes = require("./src/routes/AuditoriaRoutes");
//const auditoriaMiddleware = require("./src/middlewares/auditoriaMiddleware");

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());

//connectDB();

app.get("/", (req, res) => {
  res.send("API 7 - Auditoría de Eventos Críticos");
});

//app.use(auditoriaMiddleware);
//app.use("/api/auditoria", auditoriaRoutes);

app.post("/api/prueba", (req, res) => {
  res.status(201).json({
    message: "Petición POST registrada en auditoría",
  });
});

const PORT = process.env.PORT || 5100;

if (process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`API 7 ejecutándose en el puerto ${PORT}`);
  });
}

module.exports = app;