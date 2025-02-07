const Mapping = require("../models/Mapping");

// Save Mapping Data
exports.saveMapping = async (req, res) => {
  try {
    const { mappings } = req.body;
    const savedMappings = await Mapping.insertMany(mappings);
    res.status(201).json(savedMappings);
  } catch (error) {
    res.status(500).json({ error: "Error saving mappings" });
  }
};

// Get All Mappings
exports.getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.find();
    res.status(200).json(mappings);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving mappings" });
  }
};
