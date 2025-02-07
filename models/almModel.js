// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// // ALM schema definition
// const almSchema = new Schema({
//   _ids: { type: Number, required: true },
//   label: { type: String, required: true },
//   name: { type: String, required: true },
//   physicalName: { type: String, required: true }
// });

// // Qtest schema definition
// const qtestSchema = new Schema({
//   id: { type: Number, required: true },
//   label: { type: String, required: true },
//   name: { type: String, required: true }
// });

// // Models
// const ALM = mongoose.model("ALM", almSchema);
// const Qtest = mongoose.model("Qtest", qtestSchema);

// module.exports = { ALM, Qtest };  // Corrected export



const mongoose = require("mongoose");
const { Schema } = mongoose;

// Valuefile Schema
const valuefileSchema = new Schema({
    entities: [{
        Fields: [{
            Name: { type: String, required: true },
            values: [{
                value: { type: String, default: "" }
            }]
        }],
        Type: { type: String, required: true },
        "children-count": { type: Number, default: 0 }
    }],
    TotalResults: { type: Number, required: true }
});

// ALM schema definition
const almSchema = new Schema({
    _ids: { type: Number, required: true },
    label: { type: String, required: true },
    name: { type: String, required: true },
    physicalName: { type: String, required: true }
  })

// Qtest Schema
const qtestSchema = new Schema({
    id: { type: Number, required: true },
    label: { type: String, required: true },
    name: { type: String, required: true }
});

const ALM = mongoose.model("ALM", almSchema);
const Qtest = mongoose.model("Qtest", qtestSchema);
const Valuefile = mongoose.model("Valuefile", valuefileSchema);

module.exports = { ALM, Qtest, Valuefile };