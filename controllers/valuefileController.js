const Valuefile = require("../models/almModel");

// Get all valuefiles
const getValuefiles = async (req, res) => {
  try {
    const valuefiles = await Valuefile.find();
    if (!valuefiles || valuefiles.length === 0) {
      return res.status(404).json({ message: "No valuefiles found" });
    }
    res.status(200).json(valuefiles);
  } catch (error) {
    console.error("Error fetching valuefiles:", error);
    res.status(500).json({ message: "Error fetching valuefiles", error: error.message });
  }
};

module.exports = { getValuefiles };
