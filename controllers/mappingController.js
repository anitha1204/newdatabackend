
// controllers/mappingController.js
const Mapping = require("../models/Mapping");

exports.saveMapping = async (req, res) => {
    try {
        const mappings = req.body; // Expecting an array of mappings

        if (!Array.isArray(mappings) || mappings.length === 0) {
            return res.status(400).json({ error: "Mappings array is required" });
        }

        // Validate each mapping
        for (const mapping of mappings) {
            if (!mapping.almId || !mapping.almName || !mapping.qtestId || !mapping.qtestName) {
                return res.status(400).json({ error: "All fields are required in each mapping" });
            }
        }

        // Insert all mappings in one operation
        await Mapping.insertMany(mappings);

        res.status(201).json({ message: "Mappings saved successfully" });
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
