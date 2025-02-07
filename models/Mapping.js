// const mongoose = require("mongoose");

// const mappingSchema = new mongoose.Schema({
//   almId: String,
//   almName: String,
//   qtestId: String,
//   qtestName: String,
//   color: String,
// });

// module.exports = mongoose.model("Mapping", mappingSchema);


const mongoose = require("mongoose");

const mappingSchema = new mongoose.Schema({
  almId: String,
  almName: String,
  qtestId: String,
  qtestName: String,
  color: String,
  value: String, // Store the value from Valuefile
});

module.exports = mongoose.model("Mapping", mappingSchema);
