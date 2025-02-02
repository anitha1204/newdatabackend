const mongoose = require("mongoose");

const almSchema = new mongoose.Schema({
  id: String,
  lastModifiedDate: String,
  description: String,
  startDate: String,
  endDate: String,
});

module.exports = mongoose.model("ALM", almSchema);
