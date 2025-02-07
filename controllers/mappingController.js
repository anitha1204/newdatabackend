const Mapping = require("../models/Mapping");
const Valuefile = require("../models/almModel");
const StoredMapping = require("../models/StoredMappings");

exports.saveMapping = async (req, res) => {
  try {
    const { almId, almName, qtestId, qtestName, color } = req.body;

    // Find the ALM Name in Valuefile collection
    const valuefileData = await Valuefile.findOne({ "entities.Fields.Name": almName });

    if (!valuefileData) {
      return res.status(400).json({ message: "ALM Name not found in Valuefile" });
    }

    // Check if the mapping already exists
    const existingMapping = await Mapping.findOne({ almId, qtestId });
    if (existingMapping) {
      return res.status(400).json({ message: "Mapping already exists" });
    }

    // Save new mapping
    const newMapping = new Mapping({
      almId,
      almName,
      qtestId,
      qtestName,
      color,
    });

    await newMapping.save();

    // Store Name, Value, and qtestId in StoredMapping collection
    const storedMapping = new StoredMapping({
      Name: valuefileData.entities.Fields.Name,
      value: valuefileData.entities.Fields.Value,
      qtestId
    });

    await storedMapping.save();

    res.status(201).json({ message: "Mapping and value stored successfully", newMapping, storedMapping });

  } catch (error) {
    res.status(500).json({ message: "Error saving mapping", error });
  }
};

// // Get all mappings
// exports.getMappings = async (req, res) => {
//   try {
//     const mappings = await Mapping.find();
//     res.status(200).json(mappings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching mappings", error });
//   }
// };



exports.getStoredMappings = async (req, res) => {
  try {
    const storedMappings = await StoredMapping.find();
    res.status(200).json(storedMappings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stored mappings", error });
  }
};