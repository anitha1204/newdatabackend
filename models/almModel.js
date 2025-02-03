// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const almSchema = new Schema({
//   _id: {type: String, required: true},
//   lastModifiedDate: {type: String, required: true},
//   description: {type: String, required: true},
//   start_Date: {type: String, required: true},
//   end_Date:{type: String, required: true},
// });

// const qtestSchema = new Schema({
//   _id:{type: String, required: true},
//   last_Modified_Date: {type: String, required: true},
//   description: {type: String, required: true},
//   startDate: {type: String, required: true},
//   endDate:{type: String, required: true},

// })

// const ALM = mongoose.model("ALM", almSchema);
// const Qtest = mongoose.model("Qtest", qtestSchema);

// module.exports = {ALM, Qtest};


const mongoose = require("mongoose");
const { Schema } = mongoose;

const almSchema = new Schema({
  _id: { type: String, required: true },
  lastModifiedDate: { type: String, required: true },  // Consistent camelCase
  description: { type: String, required: true },
  startDate: { type: String, required: true },  // Standardized naming
  endDate: { type: String, required: true }
});

const qtestSchema = new Schema({
  _id: { type: String, required: true },
  lastModifiedDate: { type: String, required: true },  // Standardized to match ALM schema
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true }
});

const ALM = mongoose.model("ALM", almSchema);
const Qtest = mongoose.model("Qtest", qtestSchema);

module.exports = { ALM, Qtest };  // Correct export format
