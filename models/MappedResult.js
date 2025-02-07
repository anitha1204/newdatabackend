const mongoose = require("mongoose");

const mappedResultSchema = new mongoose.Schema({
  almName: { type: String, required: true },
  matchedValue: { type: String, required: true },
});

module.exports = mongoose.model("MappedResult", mappedResultSchema);
