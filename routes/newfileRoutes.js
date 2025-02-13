const express = require("express");
const { splitArrayData , getMappedData , getMappedDataByQtestId} = require("../controllers/newfileController");
const router = express.Router();

router.post("/newdata", splitArrayData);
router.get("/mapped-data", getMappedData);  
router.get("/mapped-data/:qtestId", getMappedDataByQtestId);

module.exports = router;
