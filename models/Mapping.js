const mongoose = require("mongoose");

const mappingSchema = new mongoose.Schema({
  almId: String,
  almName: String,
  qtestId: String,
  qtestName: String,
  qtestLabel: String,
  color: String,
});

module.exports = mongoose.model("Mapping", mappingSchema);
