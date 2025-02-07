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
const ValueFile = require("../models/almModel");

// Save new mapping
const saveMapping = async (req, res) => {
  try {
    const newMapping = new Mapping(req.body);
    await newMapping.save();
    res.status(201).json({ message: "Mapping saved successfully", data: newMapping });
  } catch (error) {
    res.status(500).json({ message: "Error saving mapping", error: error.message });
  }
};

// Get all mappings
const getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.find();
    res.status(200).json(mappings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mappings", error: error.message });
  }
};

// Map ALM values and store in MongoDB
const mapAndStoreValues = async (req, res) => {
  try {
    const mappings = await Mapping.find();
    const valuefiles = await ValueFile.find();

    let mappedResults = [];

    mappings.forEach(mapping => {
      valuefiles.forEach(valuefile => {
        if (valuefile.entities) {
          valuefile.entities.forEach(entity => {
            if (entity.Fields) {
              entity.Fields.forEach(field => {
                if (mapping.almName === field.Name) {
                  field.values.forEach(val => {
                    mappedResults.push({
                      almName: mapping.almName,
                      value: val.value
                    });
                  });
                }
              });
            }
          });
        }
      });
    });

    res.status(200).json({ message: "Mapping and values retrieved", data: mappedResults });
  } catch (error) {
    res.status(500).json({ message: "Error mapping values", error: error.message });
  }
};

module.exports = { saveMapping, getMappings, mapAndStoreValues };
