
// const { Valuefile } = require("../models/almModel");
// const Newfile = require("../models/newfileModel");

// // Save a new mapping and store it in another collection
// exports.newfiledata = async (req, res) => {
//   try {
//     const { almName ,  qtestId , qtestName } = req.body;

//     // Find the entry where entities.Fields.Name matches almName
//     const Newdatafile = await Valuefile.findOne(
//       { "entities.Fields.Name": almName },
//       { "entities.Fields.Name": 1, "entities.Fields.values": 1, _id: 0 } // Select Name and values field correctly
//     );

//     if (!Newdatafile) {
//       return res.status(404).json({ almName: null, message: "No matching record found" });
//     }

//     // Extract the exact matched Name and values
//     let matchedField = null;
//     Newdatafile.entities.forEach(entity => {
//       const field = entity.Fields.find(f => f.Name === almName);
//       if (field) {
//         matchedField = field; // Store the entire field (Name & values)
//       }
//     });

//     if (!matchedField) {
//       return res.status(404).json({ almName: null, message: "No matching field found" });
//     }

//     // Extract first value (if exists)
//     const valueToStore = matchedField.values.length > 0 ? matchedField.values[0].value : null;

//     if (!valueToStore) {
//       return res.status(400).json({ message: "No value found for the specified field" });
//     }

//     // Save the matched field to Newfile collection
//     const newEntry = new Newfile({
//       qtestName:qtestName, 
//       qtestId: qtestId,
//       value: valueToStore, // Store a single value as per schema
//     });

//     await newEntry.save();

//     res.status(200).json({ qtestName: qtestName, value: valueToStore,qtestId: qtestId, message: "Mapping saved successfully in Newfile" });

//   } catch (error) {
//     res.status(500).json({ message: "Error processing mapping", error });
//   }
// };

// exports.getMappedData = async (req, res) => {
//   try {
//     const mappedData = await Newfile.find(); // Fetch all records

//     if (!mappedData || mappedData.length === 0) {
//       return res.status(404).json({ message: "No mapped data found" });
//     }

//     res.status(200).json(mappedData);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving mapped data", error });
//   }
// };

// exports.getMappedDataByQtestId = async (req, res) => {
//   try {
//     const { qtestId } = req.params;
//     const mappedData = await Newfile.findOne({ qtestId });

//     if (!mappedData) {
//       return res.status(404).json({ message: "No record found for the given qtestId" });
//     }

//     res.status(200).json(mappedData);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving data", error });
//   }
// };









// const Newfile = require("../models/newfileModel");
// const { Valuefile } = require("../models/almModel");

// // Create/Update mapped data
// exports.newfiledata = async (req, res) => {
//   try {
//     const { almName, qtestId, qtestName } = req.body;

//     // Find the entry in Valuefile
//     const Newdatafile = await Valuefile.findOne(
//       { "entities.Fields.Name": almName },
//       { "entities.Fields.Name": 1, "entities.Fields.values": 1, _id: 0 }
//     );

//     if (!Newdatafile) {
//       return res.status(404).json({ almName: null, message: "No matching record found" });
//     }

//     // Find matching field and its values
//     let matchedField = null;
//     Newdatafile.entities.forEach(entity => {
//       const field = entity.Fields.find(f => f.Name === almName);
//       if (field) {
//         matchedField = field;
//       }
//     });

//     if (!matchedField) {
//       return res.status(404).json({ almName: null, message: "No matching field found" });
//     }

//     // Get value to store
//     const valueToStore = matchedField.values?.[0]?.value;
//     if (!valueToStore) {
//       return res.status(400).json({ message: "No value found for the specified field" });
//     }

//     // Find or create the single array document
//     let mappingDocument = await Newfile.findOne({ name: "masterArray" });

//     if (!mappingDocument) {
//       // Create new document with first mapping
//       mappingDocument = new Newfile({
//         name: "masterArray",
//         properties: [{
//           almName,
//           qtestName,
//           qtestId,
//           value: valueToStore
//         }]
//       });
//     } else {
//       // Add to existing array
//       mappingDocument.properties.push({
//         almName,
//         qtestName,
//         qtestId,
//         value: valueToStore
//       });
//     }

//     await mappingDocument.save();

//     res.status(200).json({
//       message: "Mapping saved successfully",
//       data: mappingDocument
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error processing mapping", error });
//   }
// };

// // Get all mapped data
// exports.getMappedData = async (req, res) => {
//   try {
//     const mappingDocument = await Newfile.findOne({ name: "masterArray" });

//     if (!mappingDocument || mappingDocument.properties.length === 0) {
//       return res.status(404).json({ message: "No mapped data found" });
//     }

//     res.status(200).json(mappingDocument.properties);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving mapped data", error });
//   }
// };

// // Get mapped data by qtestId
// exports.getMappedDataByQtestId = async (req, res) => {
//   try {
//     const { qtestId } = req.params;
//     const mappingDocument = await Newfile.findOne({ 
//       name: "masterArray",
//       "properties.qtestId": qtestId 
//     });

//     if (!mappingDocument) {
//       return res.status(404).json({ message: "No record found for the given qtestId" });
//     }

//     const matchedProperty = mappingDocument.properties.find(
//       prop => prop.qtestId === qtestId
//     );

//     res.status(200).json(matchedProperty);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving data", error });
//   }
// };




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
//           {  qtestName, qtestId, value: valueToStore }
//         ]
//       });
//     } else {
//       // **Check if the qtestId already exists**
//       const exists = mappingDocument.properties.some(prop => prop.qtestId === qtestId);

//       if (exists) {
//         return res.status(400).json({ message: "Duplicate entry: qtestId already exists" });
//       }

//       // Add new property
//       mappingDocument.properties.push({ qtestName, qtestId, value: valueToStore });
//     }

//     // Save document
//     await mappingDocument.save();

//     res.status(200).json({ message: "Mapping saved successfully", data: mappingDocument.properties });

//   } catch (error) {
//     res.status(500).json({ message: "Error processing mapping", error });
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
    const { almName, qtestId, newKeyName } = req.body; // Change qtestName to newKeyName

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

    // Extract values
    const field_name = matchedField.Name;
    const field_id = qtestId;
    const field_value = matchedField.values?.[0]?.value;
    
    if (!field_value) {
      return res.status(400).json({ message: "No value found for the specified field" });
    }

    // Find or create the masterArray document
    let mappingDocument = await Newfile.findOne({ name: "masterArray" });

    if (!mappingDocument) {
      // Create a new document if it doesn't exist
      mappingDocument = new Newfile({
        name: "masterArray",
        properties: [
          { [newKeyName]: field_name, qtestId: field_id, value: field_value }
        ]
      });
    } else {
      // Check if qtestId already exists
      const exists = mappingDocument.properties.some(prop => prop.qtestId === field_id);
      if (exists) {
        return res.status(400).json({ message: "Duplicate entry: qtestId already exists" });
      }
      // Add new property
      mappingDocument.properties.push({ [newKeyName]: field_name, qtestId: field_id, value: field_value });
    }

    // Save document
    await mappingDocument.save();

    res.status(200).json({ message: "Mapping saved successfully", data: mappingDocument.properties });
  } catch (error) {
    res.status(500).json({ message: "Error processing mapping", error });
  }
};;

// Get all mapped data
exports.getMappedData = async (req, res) => {
  try {
    const mappingDocument = await Newfile.findOne({ name: "masterArray" }).lean();

    if (!mappingDocument || mappingDocument.properties.length === 0) {
      return res.status(404).json({ message: "No mapped data found" });
    }

    delete mappingDocument._id;
    res.status(200).json(mappingDocument);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving mapped data", error });
  }
};

// Get mapped data by qtestId
exports.getMappedDataByQtestId = async (req, res) => {
  try {
    const { qtestId } = req.params;
    const mappingDocument = await Newfile.findOne(
      { name: "masterArray", "properties.qtestId": qtestId },
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
