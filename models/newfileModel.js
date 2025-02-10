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
  name: { type: String, required: true }, 
  properties: [
    {
      qtestName: { type: String },
      qtestId: { type: String },
      value: { type: String }
    }
  ]
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
