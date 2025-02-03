const { ALM } = require("../models/almModel");

exports.createALM = async (req, res) => {
    try {
        const newALM = new ALM(req.body);
        await newALM.save();
        res.status(201).json({ message: "ALM record created successfully", data: newALM });
    } catch (err) {
        res.status(500).json({ message: "Error creating ALM record", error: err.message });
    }
};

exports.getAllALM = async (req, res) => {
    try {
        const almData = await ALM.find();
        res.status(200).json(almData);
    } catch (err) {
        res.status(500).json({ message: "Error fetching ALM records", error: err.message });
    }
};

exports.getALMById = async (req, res) => {
    try {
        const alm = await ALM.findById(req.params.id);
        if (!alm) {
            return res.status(404).json({ message: "ALM record not found" });
        }
        res.status(200).json(alm);
    } catch (err) {
        res.status(500).json({ message: "Error fetching ALM record", error: err.message });
    }
};

exports.updateALM = async (req, res) => {
    try {
        const updatedALM = await ALM.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedALM) {
            return res.status(404).json({ message: "ALM record not found" });
        }
        res.status(200).json({ message: "ALM record updated successfully", data: updatedALM });
    } catch (err) {
        res.status(500).json({ message: "Error updating ALM record", error: err.message });
    }
};

exports.deleteALM = async (req, res) => {
    try {
        const deletedALM = await ALM.findByIdAndDelete(req.params.id);
        if (!deletedALM) {
            return res.status(404).json({ message: "ALM record not found" });
        }
        res.status(200).json({ message: "ALM record deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting ALM record", error: err.message });
    }
};
