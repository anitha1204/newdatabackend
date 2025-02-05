const mongoose = require("mongoose");
const { Schema } = mongoose;

// ALM schema definition
const almSchema = new Schema({
  _ids: { type: Number, required: true },
  label: { type: String, required: true },
  name: { type: String, required: true },
  physicalName: { type: String, required: true }
});

// Qtest schema definition
const qtestSchema = new Schema({
  id: { type: Number, required: true },
  label: { type: String, required: true },
  name: { type: String, required: true }
});

// Models
const ALM = mongoose.model("ALM", almSchema);
const Qtest = mongoose.model("Qtest", qtestSchema);

module.exports = { ALM, Qtest };  // Corrected export
