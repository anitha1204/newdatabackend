
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
//       name: almName,
//       properties:[{
//         qtestName:qtestName, 
//         qtestId: qtestId,
//         value: valueToStore
//       }]
       
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

const Newfile = require("../models/newfileModel");
const { Valuefile } = require("../models/almModel");

// Create or update mapping
exports.newfiledata = async (req, res) => {
  try {
    const { mappingName, almName, qtestId, qtestName } = req.body;

    // Validate required fields
    if (!mappingName || !almName || !qtestId || !qtestName) {
      return res.status(400).json({
        message: "Missing required fields: mappingName, almName, qtestId, and qtestName are required"
      });
    }

    // Find the entry in Valuefile
    const valuefileData = await Valuefile.findOne(
      { "entities.Fields.Name": almName },
      { "entities.Fields.Name": 1, "entities.Fields.values": 1, _id: 0 }
    );

    if (!valuefileData) {
      return res.status(404).json({
        almName: null,
        message: "No matching record found in Valuefile"
      });
    }

    // Find matching field and its value
    let matchedField = null;
    valuefileData.entities.forEach(entity => {
      const field = entity.Fields.find(f => f.Name === almName);
      if (field) {
        matchedField = field;
      }
    });

    if (!matchedField) {
      return res.status(404).json({
        almName: null,
        message: "No matching field found in Valuefile"
      });
    }

    // Get value to store
    const valueToStore = matchedField.values?.[0]?.value || null;

    if (!valueToStore) {
      return res.status(400).json({
        message: "No value found for the specified field"
      });
    }

    // Find or create mapping document
    let mapping = await Newfile.findOne({ name: mappingName });

    if (mapping) {
      // Check if mapping with same qtestId already exists
      const existingPropertyIndex = mapping.properties.findIndex(
        prop => prop.qtestId === qtestId
      );

      if (existingPropertyIndex !== -1) {
        // Update existing property
        mapping.properties[existingPropertyIndex] = {
          qtestName,
          qtestId,
          value: valueToStore
        };
      } else {
        // Add new property
        mapping.properties.push({
          qtestName,
          qtestId,
          value: valueToStore
        });
      }
    } else {
      // Create new mapping document
      mapping = new Newfile({
        name: mappingName,
        properties: [{
          qtestName,
          qtestId,
          value: valueToStore
        }]
      });
    }

    await mapping.save();

    res.status(200).json({
      message: "Mapping saved successfully",
      data: mapping
    });

  } catch (error) {
    console.error("Error in newfiledata:", error);
    res.status(500).json({
      message: "Error processing mapping",
      error: error.message
    });
  }
};

// Get all mapped data
exports.getMappedData = async (req, res) => {
  try {
    const mappedData = await Newfile.find().sort({ name: 1 });

    if (!mappedData || mappedData.length === 0) {
      return res.status(404).json({ 
        message: "No mapped data found" 
      });
    }

    res.status(200).json({
      message: "Data retrieved successfully",
      data: mappedData
    });

  } catch (error) {
    console.error("Error in getMappedData:", error);
    res.status(500).json({
      message: "Error retrieving mapped data",
      error: error.message
    });
  }
};

// Get mapped data by qtestId
exports.getMappedDataByQtestId = async (req, res) => {
  try {
    const { qtestId } = req.params;

    if (!qtestId) {
      return res.status(400).json({
        message: "qtestId parameter is required"
      });
    }

    const mappedData = await Newfile.findOne({ 
      "properties.qtestId": qtestId 
    });

    if (!mappedData) {
      return res.status(404).json({
        message: `No record found for qtestId: ${qtestId}`
      });
    }

    res.status(200).json({
      message: "Data retrieved successfully",
      data: mappedData
    });

  } catch (error) {
    console.error("Error in getMappedDataByQtestId:", error);
    res.status(500).json({
      message: "Error retrieving data",
      error: error.message
    });
  }
};

// Delete mapping by qtestId
exports.deleteMappingByQtestId = async (req, res) => {
  try {
    const { qtestId } = req.params;

    if (!qtestId) {
      return res.status(400).json({
        message: "qtestId parameter is required"
      });
    }

    const mapping = await Newfile.findOne({ "properties.qtestId": qtestId });

    if (!mapping) {
      return res.status(404).json({
        message: `No mapping found for qtestId: ${qtestId}`
      });
    }

    // Remove the property with matching qtestId
    mapping.properties = mapping.properties.filter(prop => prop.qtestId !== qtestId);

    // If no properties left, delete the entire document
    if (mapping.properties.length === 0) {
      await Newfile.findByIdAndDelete(mapping._id);
      return res.status(200).json({
        message: "Mapping document deleted successfully"
      });
    }

    // Save updated mapping
    await mapping.save();

    res.status(200).json({
      message: "Mapping deleted successfully",
      data: mapping
    });

  } catch (error) {
    console.error("Error in deleteMappingByQtestId:", error);
    res.status(500).json({
      message: "Error deleting mapping",
      error: error.message
    });
  }
};
