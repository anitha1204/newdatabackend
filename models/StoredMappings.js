const mongoose = require("mongoose");

const StoredMappingSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  value: { type: String, required: true },
  qtestId: { type: String, required: true }
});

module.exports = mongoose.model("StoredMapping", StoredMappingSchema);
