// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// // Valuefile Schema
// const valuefileSchema = new Schema({
//     entities: [{
//         Fields: [{
//             Name: { type: String, required: true },
//             values: [{
//                 value: { type: String, default: "" }
//             }]
//         }],
//         Type: { type: String, required: true },
//         "children-count": { type: Number, default: 0 }
//     }],
//     TotalResults: { type: Number, required: true }
// });

// // ALM schema definition
// const almSchema = new Schema({
//     _ids: { type: Number, required: true },
//     label: { type: String, required: true },
//     name: { type: String, required: true },
//     physicalName: { type: String, required: true }
//   })

// // Qtest Schema
// const qtestSchema = new Schema({
//     id: { type: Number, required: true },
//     label: { type: String, required: true },

// });

// const ALM = mongoose.model("ALM", almSchema);
// const Qtest = mongoose.model("Qtest", qtestSchema);
// const Valuefile = mongoose.model("Valuefile", valuefileSchema);

// module.exports = { ALM, Qtest, Valuefile };




const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define Valuefile Schema
const valuefileSchema = new Schema({
    entities: [
      {
        Fields: [
          {
            Name: { type: String, required: true },
            values: [{ value: { type: String, default: null } }],
          },
        ],
        Type: { type: String, required: true },
        "children-count": { type: Number, default: 0 },
      },
    ],
    TotalResults: { type: Number, default: 0 },
  });


const almSchema = new Schema({
    fieldname: { type: String, required: true }
})

// Qtest Schema
const qtestSchema = new Schema({
 fieldname: { type: String, required: true },
});

const ALM = mongoose.model("ALM", almSchema);
const Qtest = mongoose.model("Qtest", qtestSchema);
const Valuefile = mongoose.model("Valuefile", valuefileSchema);

module.exports = { ALM, Qtest, Valuefile };