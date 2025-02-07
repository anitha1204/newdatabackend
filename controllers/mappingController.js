// const Mapping = require("../models/Mapping");

// // Save a new mapping
// exports.saveMapping = async (req, res) => {
//   try {
//     const { almId, almName, qtestId, qtestName, color } = req.body;
//     const newMapping = new Mapping({ almId, almName, qtestId, qtestName, color });
//     await newMapping.save();
//     res.status(201).json({ message: "Mapping saved successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error saving mapping", error });
//   }
// };

// // Get all mappings
// exports.getMappings = async (req, res) => {
//   try {
//     const mappings = await Mapping.find();
//     res.status(200).json(mappings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching mappings", error });
//   }
// };



const Mapping = require("../models/Mapping");
const Valuefile = require("../models/almModel");

// Save a new mapping with value from Valuefile
exports.saveMapping = async (req, res) => {
  try {
    const { almId, almName, qtestId, qtestName, color } = req.body;

    // Check if almName exists in Valuefile
    const valuefileData = await Valuefile.findOne({ "entities.Fields.Name": almName });

    let matchedValue = "";
    if (valuefileData) {
      const field = valuefileData.entities
        .flatMap(entity => entity.Fields)
        .find(field => field.Name === almName);
      
      if (field && field.values.length > 0) {
        matchedValue = field.values[0].value;
      }
    }

    // Save mapping with matched value
    const newMapping = new Mapping({ almId, almName, qtestId, qtestName, color, value: matchedValue });
    await newMapping.save();

    res.status(201).json({ message: "Mapping saved successfully", mapping: newMapping });
  } catch (error) {
    res.status(500).json({ message: "Error saving mapping", error });
  }
};

// Get all mappings
exports.getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.find();
    res.status(200).json(mappings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mappings", error });
  }
};

