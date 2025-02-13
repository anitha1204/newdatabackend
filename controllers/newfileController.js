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
    const { almName, qtestId, qtestName, category } = req.body;

    // Find the entry in Valuefile
    const Newdatafile = await Valuefile.findOne(
      { "entities.Fields.Name": almName },
      { "entities.Fields.Name": 1, "entities.Fields.values": 1, _id: 0 }
    );

    if (!Newdatafile) {
      return res.status(404).json({ message: "No matching record found" });
    }

    // Find the field in the document
    let matchedField = null;
    Newdatafile.entities.forEach(entity => {
      const field = entity.Fields.find(f => f.Name === almName);
      if (field) {
        matchedField = field;
      }
    });

    if (!matchedField) {
      return res.status(404).json({ message: "No matching field found" });
    }

    // Get value to store
    const valueToStore = matchedField.values?.[0]?.value;
    if (!valueToStore) {
      return res.status(400).json({ message: "No value found for the specified field" });
    }

    // Find or create the masterArray document
    let mappingDocument = await Newfile.findOne({ name: "masterArray" });

    if (!mappingDocument) {
      mappingDocument = new Newfile({ name: "masterArray", categories: {} });
    }

    // Ensure category exists
    if (!mappingDocument.categories[category]) {
      mappingDocument.categories[category] = [];
    }

    // Check if the field_id already exists within the category
    const exists = mappingDocument.categories[category].some(prop => prop.field_id === qtestId);
    if (exists) {
      return res.status(400).json({ message: "Duplicate entry: qtestId already exists in this category" });
    }

    // Add new property to the specific category
    mappingDocument.categories[category].push({
      field_name: qtestName,
      field_id: qtestId,
      field_value: valueToStore,
    });

    // Save document
    await mappingDocument.save();

    res.status(200).json({ message: "Mapping saved successfully", data: mappingDocument.categories });
  } catch (error) {
    console.error("Error processing mapping:", error);
    res.status(500).json({ message: "Error processing mapping", error: error.message });
  }
};

// Get all mapped data
exports.getMappedData = async (req, res) => {
  try {
    const mappingDocument = await Newfile.findOne({ name: "masterArray" }).lean();

    if (!mappingDocument || Object.keys(mappingDocument.categories).length === 0) {
      return res.status(404).json({ message: "No mapped data found" });
    }

    delete mappingDocument._id;

    res.status(200).json(mappingDocument.categories);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving mapped data", error });
  }
};

// Get mapped data by qtestId within a category
exports.getMappedDataByQtestId = async (req, res) => {
  try {
    const { category, qtestId } = req.params;
    const mappingDocument = await Newfile.findOne({ name: "masterArray" }).lean();

    if (!mappingDocument || !mappingDocument.categories[category]) {
      return res.status(404).json({ message: "Category not found" });
    }

    const matchedProperty = mappingDocument.categories[category].find(prop => prop.field_id === qtestId);
    if (!matchedProperty) {
      return res.status(404).json({ message: "No record found for the given qtestId in this category" });
    }

    res.status(200).json(matchedProperty);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};