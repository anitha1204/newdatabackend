
const mongoose = require("mongoose");

const newfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  properties: [
    new mongoose.Schema(
      {
        almName: String,
        field_name: String, 
        field_id: String, 
        field_value: String 
      },
      { _id: false } 
    )
  ]
});

const Newfile = mongoose.model("Newfile", newfileSchema);

module.exports = Newfile;




