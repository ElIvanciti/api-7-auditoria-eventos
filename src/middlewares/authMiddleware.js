const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.headers["app-token"];

  if (!token) {
    return res.status(401).json({
      mensaje: "Token requerido",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.application = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido",
    });
  }
};

module.exports = verificarToken;