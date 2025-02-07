const MappedResult = require("../models/MappedResult");
const ValueFile = require("../models/ValueFile");

exports.saveMappedResult = async (req, res) => {
  const { almName, value } = req.body;

  try {
    console.log("Received Data:", req.body); // Debugging Log

    // Check if almName exists in ValueFile
    const valueFileEntry = await ValueFile.findOne({
      "entities.Fields.Name": almName
    });

    console.log("ValueFile Entry:", valueFileEntry); // Debugging Log

    if (!valueFileEntry) {
      return res.status(400).json({ message: "almName not found in ValueFile" });
    }

    // Save the mapped result
    const newMappedResult = new MappedResult({ almName, value });
    await newMappedResult.save();

    console.log("Mapped Result Saved:", newMappedResult); // Debugging Log

    res.status(201).json({ message: "Mapped result saved successfully", data: newMappedResult });
  } catch (error) {
    console.error("Error saving mapped result:", error);
    res.status(500).json({ error: "Error saving mapped result" });
  }
};
