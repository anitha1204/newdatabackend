const mongoose = require("mongoose");
const { Schema } = mongoose;

const MappedResultSchema = new Schema({
  almName: { type: String, required: true },
  value: { type: String, required: true }
});

module.exports = mongoose.model("MappedResult", MappedResultSchema);
