// const Status = require("../models/statusModel");

// // POST: Add multiple status entries
// exports.createStatus = async (req, res) => {
//   try {
//     const newStatus = await Status.insertMany(req.body);
//     res.status(201).json({ message: "Data added successfully", data: newStatus });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // GET: Fetch all Success status
// exports.getSuccessStatus = async (req, res) => {
//   try {
//     const successData = await Status.find({ Status: "Success" });
//     res.status(200).json(successData);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // GET: Fetch all Skipped status
// exports.getSkippedStatus = async (req, res) => {
//   try {
//     const skippedData = await Status.find({ Status: "Skipped" });
//     res.status(200).json(skippedData);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // PUT: Update an ALM Release-Id status
// exports.updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedStatus = await Status.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updatedStatus) return res.status(404).json({ message: "Record not found" });

//     res.status(200).json(updatedStatus);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // DELETE: Remove an ALM Release-Id entry
// exports.deleteStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedStatus = await Status.findByIdAndDelete(id);
//     if (!deletedStatus) return res.status(404).json({ message: "Record not found" });

//     res.status(200).json({ message: "Record deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };





const { almFields } = require("../models/statusModel");

exports.getALM = async (req, res) => {
  try {
    const alm = await almFields.find();
    res.status(200).json(alm);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ALM fields", error });
  }
};