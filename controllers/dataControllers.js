const ALM = require("../models/almModel");
const QTest = require("../models/qtestModel");

// Fetch ALM and qTest data
const getData = async (req, res) => {
  try {
    const almData = await ALM.find();
    const qtestData = await QTest.find();

    res.json({ almData, qtestData });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getData };
