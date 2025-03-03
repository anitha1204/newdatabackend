const { almFields } = require("../models/statusModel");

exports.getALM = async (req, res) => {
  try {
    const alm = await almFields.find();
    res.status(200).json(alm);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ALM fields", error });
  }
};