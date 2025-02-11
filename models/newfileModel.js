// const mongoose = require("mongoose");

// const newfileSchema = new mongoose.Schema({

//   almName: String,
//   qtestId: String,
//   qtestName: String,
//   value: String

// });

// module.exports = mongoose.model("Newfile", newfileSchema);


const mongoose = require("mongoose");

const newfileSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    default: "name" 
  },
  properties: [[{  // Note the double array brackets for nested arrays
    qtestName: { type: String, required: true },
    qtestId: { type: String, required: true },
    value: { type: String, required: true }
  }]]
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
