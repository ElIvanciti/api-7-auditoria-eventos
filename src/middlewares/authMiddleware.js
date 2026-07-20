const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      mensaje: "Token requerido",
    });
  }

  const [tipo, token] = authorization.split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({
      mensaje: "Formato de token inválido",
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