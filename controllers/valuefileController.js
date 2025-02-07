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

module.exports = { getValuefiles };
