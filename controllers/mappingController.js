const Mapping = require("../models/Mapping");

// Save Mapping Data
exports.saveMapping = async (req, res) => {
    try {
        const { almId, almName, qtestId, qtestName } = req.body;
    
        // Validate that all required fields are present
        if (!almId || !almName || !qtestId || !qtestName) {
          return res.status(400).json({ error: "All fields are required" });
        }
    
        const newMapping = new Mapping({ almId, almName, qtestId, qtestName });
        await newMapping.save();
    
        res.status(201).json({ message: "Mapping saved successfully" });
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
