const express = require("express");
const router = express.Router();

const {
  obtenerLogs,
  obtenerLogPorId,
} = require("../controllers/AuditoriaController");

router.get("/", obtenerLogs);
router.get("/:id", obtenerLogPorId);

module.exports = router;