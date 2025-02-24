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



 const { Qtest } = require("../models/almModel");

exports.getQTestFields = async (req, res) => {
  try {
    const qTestFields = await Qtest.find();
    res.status(200).json(qTestFields);
  } catch (error) {
    res.status(500).json({ message: "Error fetching qTest fields", error });
  }
};
