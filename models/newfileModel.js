

// const mongoose = require("mongoose");

// const newfileSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     default: "masterArray"
//   },
//   properties: [{
//     almName: { type: String, required: true },
//     qtestName: { type: String, required: true },
//     qtestId: { type: String, required: true },
//     value: { type: String, required: true }
//   }]
// });

// module.exports = mongoose.model("Newfile", newfileSchema);



const mongoose = require("mongoose");

const newfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  properties: [
    new mongoose.Schema(
      {
        almName: String,
        qtestName: String,
        qtestId: String,
        value: String
      },
      { _id: false } // This disables the automatic creation of _id for array items
    )
  ]
});

const Newfile = mongoose.model("Newfile", newfileSchema);

module.exports = Newfile;


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
