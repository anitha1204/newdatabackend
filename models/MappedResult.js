const mongoose = require("mongoose");
const { Schema } = mongoose;

const MappedResultSchema = new Schema({
  almName: { type: String},
  value: { type: String }
});

module.exports = mongoose.model("MappedResult", MappedResultSchema);
