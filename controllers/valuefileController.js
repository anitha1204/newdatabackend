const Valuefile = require("../models/almModel");

const getValuefiles = async (req, res) => {
  try {
    const valuefiles = await Valuefile.find();
    if (!valuefiles || valuefiles.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.status(200).json(valuefiles);
  } catch (error) {
    console.error("Database fetch error:", error);
    res.status(500).json({ message: "Error fetching valuefiles", error: error.message });
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




module.exports = {
  getValuefiles,
  getValuefileById,
  
};
