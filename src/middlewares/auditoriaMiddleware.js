const Auditoria = require("../models/Auditoria");
const connectDB = require("../models/db");

const auditoriaMiddleware = (req, res, next) => {
  const metodosAuditables = ["POST", "PUT", "DELETE"];

  if (!metodosAuditables.includes(req.method)) {
    return next();
  }

  res.on("finish", async () => {
    try {
      await connectDB();

      await Auditoria.create({
        usuarioId: req.body.usuarioId || "anonymous",
        accion: `${req.method} ${req.originalUrl}`,
        endpoint: req.originalUrl,
        metodo: req.method,
        ip: req.ip,
        codigoEstado: res.statusCode,
      });
    } catch (error) {
      console.error("Error al guardar auditoría:", error.message);
    }
  });

  next();
};

module.exports = auditoriaMiddleware;