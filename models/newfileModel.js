const mongoose = require("mongoose");

const newfileSchema = new mongoose.Schema({
 
  qtestId: String,
  Name: String,
  value: String
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
