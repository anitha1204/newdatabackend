const Valuefile = require("../models/almModel");

// Get all valuefiles
const getValuefiles = async (req, res) => {
  try {
    const valuefiles = await Valuefile.find();
    res.status(200).json(valuefiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching valuefiles", error });
  }
};

// Get a single valuefile by ID
const getValuefileById = async (req, res) => {
  try {
    const valuefile = await Valuefile.findById(req.params.id);
    if (!valuefile) {
      return res.status(404).json({ message: "Valuefile not found" });
    }
    res.status(200).json(valuefile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching valuefile", error });
  }
};

// Create a new valuefile
const createValuefile = async (req, res) => {
  try {
    const newValuefile = new Valuefile(req.body);
    const savedValuefile = await newValuefile.save();
    res.status(201).json(savedValuefile);
  } catch (error) {
    res.status(500).json({ message: "Error creating valuefile", error });
  }
};

// Update a valuefile
const updateValuefile = async (req, res) => {
  try {
    const updatedValuefile = await Valuefile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedValuefile) {
      return res.status(404).json({ message: "Valuefile not found" });
    }
    res.status(200).json(updatedValuefile);
  } catch (error) {
    res.status(500).json({ message: "Error updating valuefile", error });
  }
};

// Delete a valuefile
const deleteValuefile = async (req, res) => {
  try {
    const deletedValuefile = await Valuefile.findByIdAndDelete(req.params.id);
    if (!deletedValuefile) {
      return res.status(404).json({ message: "Valuefile not found" });
    }
    res.status(200).json({ message: "Valuefile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting valuefile", error });
  }
};

module.exports = {
  getValuefiles,
  getValuefileById,
  createValuefile,
  updateValuefile,
  deleteValuefile
};
