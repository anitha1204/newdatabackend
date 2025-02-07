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

// Save a new mapping with almName and its corresponding value from Valuefile
exports.saveMapping = async (req, res) => {
  try {
    const { almId, almName, qtestId, qtestName, color } = req.body;

    // Find the corresponding value for almName from Valuefile
    const valuefileEntry = await Valuefile.findOne({ name: almName });

    if (!valuefileEntry) {
      return res.status(404).json({ message: "No matching value found for almName" });
    }

    // Create new mapping with almName and its corresponding value
    const newMapping = new Mapping({
      almId,
      almName,
      qtestId,
      qtestName,
      color,
      value: valuefileEntry.value, // Store the corresponding value
    });

    await newMapping.save();
    res.status(201).json({ message: "Mapping saved successfully", newMapping });
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
