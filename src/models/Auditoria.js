const mongoose = require("mongoose");

const auditoriaSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: String,
      required: true,
      trim: true,
      default: "anonymous",
    },

    accion: {
      type: String,
      required: true,
      trim: true,
    },

    endpoint: {
      type: String,
      required: true,
      trim: true,
    },

    metodo: {
      type: String,
      required: true,
      enum: ["POST", "PUT", "DELETE"],
    },

    ip: {
      type: String,
      required: true,
    },

    codigoEstado: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auditoria", auditoriaSchema);