const Auditoria = require("../models/Auditoria");
const connectDB = require("../models/db");

const obtenerLogs = async (req, res) => {
  try {
    await connectDB();

    const logs = await Auditoria.find().sort({ createdAt: -1 });

    res.json({
      total: logs.length,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los logs de auditoría",
      error: error.message,
    });
  }
};

const obtenerLogPorId = async (req, res) => {
  try {
    await connectDB();

    const log = await Auditoria.findById(req.params.id);

    if (!log) {
      return res.status(404).json({
        mensaje: "Log de auditoría no encontrado",
      });
    }

    res.json(log);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el log de auditoría",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerLogs,
  obtenerLogPorId,
};