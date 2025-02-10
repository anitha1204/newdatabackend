// const mongoose = require("mongoose");

// const newfileSchema = new mongoose.Schema({
 
//   qtestId: String,
//   qtestName: String,
//   value: String
// });

// module.exports = mongoose.model("Newfile", newfileSchema);


const mongoose = require("mongoose");

const NewfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  properties: [
    {
      qtestName: String,
      qtestId: String,
      value: String,
    },
  ],
});

module.exports = mongoose.model("Newfile", NewfileSchema);





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
