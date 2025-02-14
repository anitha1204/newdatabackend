// const Mapping = require("../models/Mapping");
// const Valuefile = require("../models/almModel");

// // Save a new mapping
// exports.saveMapping = async (req, res) => {
//   try {
//     const { almName, qtestName, color } = req.body;
//     // Save new mapping
//     const newMapping = new Mapping({

//       almName,
//       qtestName,
//       color,
//     });

//     await newMapping.save();
//     res.status(201).json({ message: "Mapping saved successfully", newMapping });

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






