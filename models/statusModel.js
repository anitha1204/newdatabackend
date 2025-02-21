// const mongoose = require("mongoose");

// const statusSchema = new mongoose.Schema({
//   Status: { type: String, required: true, enum: ["Success", "Skipped"] },
//   ALM_Release_Id: { type: String, required: true, unique: true },
// });

// module.exports = mongoose.model("Status", statusSchema);


const mongoose = require("mongoose");
const { Schema } = mongoose;

// ALM schema definition
const almfieldsSchema = new Schema({
  fieldname: { type: String, required: true }
})

// Qtest Schema
const qtestfieldsSchema = new Schema({
fieldname: { type: String, required: true },
});

const almFields = mongoose.model("almFields", almfieldsSchema);
const qTestFields = mongoose.model("qTestFields", qtestfieldsSchema );

module.exports = { almFields, qTestFields };
