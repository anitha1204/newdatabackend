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

// Save a new mapping and store the value from Valuefile if almName matches
exports.saveMapping = async (req, res) => {
  try {
    const { almId, almName, qtestId, qtestName, color } = req.body;

    // Find the corresponding value in Valuefile where Name matches almName
    const valuefileEntry = await Valuefile.findOne({ "entities.Fields.Name": almName });

    let storedValue = "";
    if (valuefileEntry) {
      // Extract the matching field
      const matchedField = valuefileEntry.entities.flatMap(entity => entity.Fields)
        .find(field => field.Name === almName);

      if (matchedField && matchedField.values.length > 0) {
        storedValue = matchedField.values[0].value; // Assuming you need the first value
      }
    }

    // Save the mapping with the extracted value
    const newMapping = new Mapping({ 
      almId, 
      almName, 
      qtestId, 
      qtestName, 
      color, 
      value: storedValue // Store the extracted value
    });

    await newMapping.save();
    res.status(201).json({ message: "Mapping saved successfully", storedValue });
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

