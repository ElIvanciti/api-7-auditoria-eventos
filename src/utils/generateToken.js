const jwt = require("jsonwebtoken");

const generateToken = () => {
  return jwt.sign(
    {
      application: "API7-Auditoria-Eventos",
    },
    process.env.JWT_SECRET
  );
};

module.exports = generateToken;