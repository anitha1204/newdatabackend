const Mapping = require("../models/Mapping");
const Valuefile = require("../models/almModel");

// Save a new mapping
exports.saveMapping = async (req, res) => {
  try {
    const { almId, almName, qtestId, qtestName, color } = req.body;

    // // Check if ALM Name exists in Valuefile collection
    // const valuefileData = await Valuefile.findOne({
    //     "entities.Fields.Name": almName,
    // });

    // if (!valuefileData) {
    //     return res.status(400).json({ message: "ALM Name not found in Valuefile" });
    // }

    // // Check if the mapping already exists
    // const existingMapping = await Mapping.findOne({ almId, qtestId });
    // if (existingMapping) {
    //     return res.status(400).json({ message: "Mapping already exists" });
    // }

    // Save new mapping
    const newMapping = new Mapping({
        almId,
        almName,
        qtestId,
        qtestName,
        color,
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


  



