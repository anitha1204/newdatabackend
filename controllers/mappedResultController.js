const MappedResult = require("../models/MappedResult");
const ValueFile = require("../models/almModel");

exports.saveMappedResult = async (req, res) => {
  const { almName, value } = req.body;

  try {
    // Check if almName exists in ValueFile
    const valueFileEntry = await ValueFile.findOne({
      "entities.Fields.Name": almName
    });

    if (!valueFileEntry) {
      return res.status(400).json({ message: "almName not found in ValueFile" });
    }

    // Save the mapped result
    const newMappedResult = new MappedResult({ almName, value });
    await newMappedResult.save();

    res.status(201).json({ message: "Mapped result saved successfully", data: newMappedResult });
  } catch (error) {
    res.status(500).json({ error: "Error saving mapped result" });
  }
};
