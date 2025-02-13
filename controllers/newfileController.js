// const Newfile = require("../models/newfileModel");
// const { Valuefile } = require("../models/almModel");

// exports.newfiledata = async (req, res) => {
//   try {
//     const { almName, qtestId, qtestName } = req.body;

//     // Find the entry in Valuefile
//     const Newdatafile = await Valuefile.findOne(
//       { "entities.Fields.Name": almName },
//       { "entities.Fields.Name": 1, "entities.Fields.values": 1, _id: 0 }
//     );

//     if (!Newdatafile) {
//       return res.status(404).json({ message: "No matching record found" });
//     }

//     // Find the field in the document
//     let matchedField = null;
//     Newdatafile.entities.forEach(entity => {
//       const field = entity.Fields.find(f => f.Name === almName);
//       if (field) {
//         matchedField = field;
//       }
//     });

//     if (!matchedField) {
//       return res.status(404).json({ message: "No matching field found" });
//     }

//     // Get value to store
//     const valueToStore = matchedField.values?.[0]?.value;
//     if (!valueToStore) {
//       return res.status(400).json({ message: "No value found for the specified field" });
//     }

//     // Find or create the masterArray document
//     let mappingDocument = await Newfile.findOne({ name: "masterArray" });

//     if (!mappingDocument) {
//       // Create a new document if it doesn't exist
//       mappingDocument = new Newfile({
//         name: "masterArray",
//         properties: [
//           { field_name: qtestName, field_id: qtestId, field_value: valueToStore }
//         ]
//       });
//     } else {
//       // Check if the field_id already exists
//       const exists = mappingDocument.properties.some(prop => prop.field_id === qtestId);

//       if (exists) {
//         return res.status(400).json({ message: "Duplicate entry: qtestId already exists" });
//       }

//       // Add new property
//       mappingDocument.properties.push({ field_name: qtestName, field_id: qtestId, field_value: valueToStore });
//     }

//     // Save document
//     await mappingDocument.save();

//     res.status(200).json({ message: "Mapping saved successfully", data: mappingDocument.properties });

//   } catch (error) {
//     console.error("Error processing mapping:", error);
//     res.status(500).json({ message: "Error processing mapping", error: error.message });
//   }
// };


// // Get all mapped data (remove `_id`)
// exports.getMappedData = async (req, res) => {
//   try {
//     const mappingDocument = await Newfile.findOne({ name: "masterArray" }).lean();

//     if (!mappingDocument || mappingDocument.properties.length === 0) {
//       return res.status(404).json({ message: "No mapped data found" });
//     }

//     delete mappingDocument._id; // 🚨 Remove `_id` before sending response

//     res.status(200).json(mappingDocument);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving mapped data", error });
//   }
// };


// // Get mapped data by qtestId (remove `_id`)
// exports.getMappedDataByQtestId = async (req, res) => {
//   try {
//     const { qtestId } = req.params;
//     const mappingDocument = await Newfile.findOne(
//       { name: "masterArray", "properties.qtestId": qtestId },
//       { "properties.$": 1 }
//     );

//     if (!mappingDocument) {
//       return res.status(404).json({ message: "No record found for the given qtestId" });
//     }

//     const matchedProperty = mappingDocument.properties[0].toObject();
//     delete matchedProperty._id;

//     res.status(200).json(matchedProperty);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving data", error });
//   }
// };


const Newfile = require("../models/newfileModel");
const { Valuefile } = require("../models/almModel");

exports.newfiledata = async (req, res) => {
  try {
    const { almName, qtestId, qtestName } = req.body;

    // Find the entry in Valuefile
    const Newdatafile = await Valuefile.findOne(
      { "entities.Fields.Name": almName },
      { "entities.Fields.Name": 1, "entities.Fields.values": 1, _id: 0 }
    );

    if (!Newdatafile || !Newdatafile.entities) {
      return res.status(404).json({ message: "No matching record found" });
    }

    // Find the field in the document
    let matchedField = null;
    Newdatafile.entities.forEach(entity => {
      if (entity.Fields) {
        const field = entity.Fields.find(f => f.Name === almName);
        if (field) {
          matchedField = field;
        }
      }
    });

    if (!matchedField) {
      return res.status(404).json({ message: "No matching field found" });
    }

    // Get values to store (remove empty objects)
    const valuesToStore = matchedField.values
      .map(v => v.value)
      .filter(value => value !== undefined && value !== null && value !== "");

    if (!valuesToStore.length) {
      return res.status(400).json({ message: "No valid values found for the specified field" });
    }

    // Find or create the masterArray document
    let mappingDocument = await Newfile.findOne({ name: "masterArray" });

    if (!mappingDocument) {
      // Create new document if it doesn't exist
      mappingDocument = new Newfile({
        name: "masterArray",
        properties: [{ field_name: qtestName, field_id: qtestId, field_values: valuesToStore }]
      });
    } else {
      // Check if the field_id already exists
      const existingProperty = mappingDocument.properties.find(prop => prop.field_id === qtestId);

      if (existingProperty) {
        // If field_id exists, merge unique values
        existingProperty.field_values = [...new Set([...existingProperty.field_values, ...valuesToStore])];
      } else {
        // Add new property
        mappingDocument.properties.push({ field_name: qtestName, field_id: qtestId, field_values: valuesToStore });
      }
    }

    // Save document
    await mappingDocument.save();

    res.status(200).json({ message: "Mapping saved successfully", data: mappingDocument.properties });

  } catch (error) {
    console.error("Error processing mapping:", error);
    res.status(500).json({ message: "Error processing mapping", error: error.message });
  }
};



// Get all mapped data (remove `_id`)
exports.getMappedData = async (req, res) => {
  try {
    const mappingDocument = await Newfile.findOne({ name: "masterArray" }).lean();

    if (!mappingDocument || mappingDocument.properties.length === 0) {
      return res.status(404).json({ message: "No mapped data found" });
    }

    delete mappingDocument._id; // 🚨 Remove `_id` before sending response

    res.status(200).json(mappingDocument);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving mapped data", error });
  }
};


// Get mapped data by qtestId (remove `_id`)
exports.getMappedDataByQtestId = async (req, res) => {
  try {
    const { qtestId } = req.params;
    const mappingDocument = await Newfile.findOne(
      { name: "masterArray", "properties.field_id": qtestId },
      { "properties.$": 1 }
    );

    if (!mappingDocument) {
      return res.status(404).json({ message: "No record found for the given qtestId" });
    }

    const matchedProperty = mappingDocument.properties[0].toObject();
    delete matchedProperty._id;

    res.status(200).json(matchedProperty);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};
