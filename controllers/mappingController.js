
// controllers/mappingController.js
const Mapping = require("../models/Mapping");

// Save Mapping Data
exports.saveMapping = async (req, res) => {
  try {
    const { mappings } = req.body;
    
    if (!Array.isArray(mappings) || mappings.length === 0) {
      return res.status(400).json({ error: "Mappings array is required" });
    }

    const savedMappings = await Mapping.insertMany(mappings);
    res.status(201).json({ message: "Mappings saved successfully", data: savedMappings });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
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
