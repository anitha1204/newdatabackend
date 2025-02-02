const mongoose = require("mongoose");

const qtestSchema = new mongoose.Schema({
  id: String,
  lastModifiedDate: String,
  description: String,
  startDate: String,
  endDate: String,
});

module.exports = mongoose.model("QTest", qtestSchema);
