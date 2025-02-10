// const mongoose = require("mongoose");

// const newfileSchema = new mongoose.Schema({
 
//   qtestId: String,
//   qtestName: String,
//   value: String
// });

// module.exports = mongoose.model("Newfile", newfileSchema);


const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  qtestId: String,
  qtestName: String,
  value: String
});

const newfileSchema = new mongoose.Schema({
  name: String,
  properties: [propertySchema] // Array of property objects
});

module.exports = mongoose.model("Newfile", newfileSchema);





// const mongoose = require("mongoose");

// const newfileSchema = new mongoose.Schema({
 
//   // almName: String,
//   // qtestId: mongoose.Schema.Types.ObjectId,
//   Name: String,
//   // values: [{
//   //   type: String
//   // }]
//   value: String
// });

// module.exports = mongoose.model("Newfile", newfileSchema);
