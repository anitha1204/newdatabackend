// const { Qtest } = require("../models/almModel");

// exports.createQtest = async (req, res) => {
//     try {
//         const newQtest = new Qtest(req.body);
//         await newQtest.save();
//         res.status(201).json({ message: "Qtest record created successfully", data: newQtest });
//     } catch (err) {
//         res.status(500).json({ message: "Error creating Qtest record", error: err.message });
//     }
// };

// exports.getAllQtest = async (req, res) => {
//     try {
//         const qtestData = await Qtest.find();
//         res.status(200).json(qtestData);
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching Qtest records", error: err.message });
//     }
// };

// exports.getQtestById = async (req, res) => {
//     try {
//         const qtest = await Qtest.findById(req.params.id);
//         if (!qtest) {
//             return res.status(404).json({ message: "Qtest record not found" });
//         }
//         res.status(200).json(qtest);
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching Qtest record", error: err.message });
//     }
// };

// exports.updateQtest = async (req, res) => {
//     try {
//         const updatedQtest = await Qtest.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedQtest) {
//             return res.status(404).json({ message: "Qtest record not found" });
//         }
//         res.status(200).json({ message: "Qtest record updated successfully", data: updatedQtest });
//     } catch (err) {
//         res.status(500).json({ message: "Error updating Qtest record", error: err.message });
//     }
// };

// exports.deleteQtest = async (req, res) => {
//     try {
//         const deletedQtest = await Qtest.findByIdAndDelete(req.params.id);
//         if (!deletedQtest) {
//             return res.status(404).json({ message: "Qtest record not found" });
//         }
//         res.status(200).json({ message: "Qtest record deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ message: "Error deleting Qtest record", error: err.message });
//     }
// };



//  const { Qtest } = require("../models/almModel");

// exports.getQTestFields = async (req, res) => {
//   try {
//     const qTestFields = await Qtest.find().populate("mappedTo");
//     res.status(200).json(qTestFields);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching qTest fields", error });
//   }
// };
const { Qtest } = require("../models/almModel");

exports.getQTestFields = async (req, res) => {
  try {
    // Ensure database connection is established before querying
    if (!Qtest) {
      return res.status(500).json({ message: "Qtest model is not initialized." });
    }

    // Fetch all qTest fields and populate ALM mappings
    const qTestFields = await Qtest.find().populate("mappedTo");

    // If no data is found, return an empty array instead of an error
    if (!qTestFields || qTestFields.length === 0) {
      return res.status(200).json({ message: "No qTest fields found", data: [] });
    }

    res.status(200).json(qTestFields);
  } catch (error) {
    console.error("Error fetching qTest fields:", error); // Log for debugging
    res.status(500).json({ message: "Error fetching qTest fields", error: error.message });
  }
};
