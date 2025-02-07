const Mapping = require("../models/Mapping");

// Save a new mapping
exports.saveMapping = async (req, res) => {
  try {
    const { almId, almName, qtestId, qtestName, color } = req.body;
    const newMapping = new Mapping({ almId, almName, qtestId, qtestName, color });
    await newMapping.save();
    res.status(201).json({ message: "Mapping saved successfully" });
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

