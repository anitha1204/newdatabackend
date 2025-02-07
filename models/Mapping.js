// models/Mapping.js
const mongoose = require("mongoose");

const mappingSchema = new mongoose.Schema({
  almId: { type: String, required: true },
  almName: { type: String, required: true },
  qtestId: { type: String, required: true },
  qtestName: { type: String, required: true },
  color: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Mapping", mappingSchema);