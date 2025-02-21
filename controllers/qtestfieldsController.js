const { qTestFields  } = require("../models/statusModel");

exports.getQTest = async (req, res) => {
  try {
    const qTest= await qTestFields .find();
    res.status(200).json(qTest);
  } catch (error) {
    res.status(500).json({ message: "Error fetching qTest fields", error });
  }
};
