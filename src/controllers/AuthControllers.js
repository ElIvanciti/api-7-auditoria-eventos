const generateToken = require("../utils/generateToken");

const obtenerToken = (req, res) => {
  try {
    const token = generateToken();

    res.status(200).json({
      mensaje: "Token generado correctamente",
      token,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al generar el token",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerToken,
};