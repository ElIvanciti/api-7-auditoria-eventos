const express = require("express");
const router = express.Router();

const { obtenerToken } = require("../controllers/AuthControllers");

router.post("/token", obtenerToken);

module.exports = router;