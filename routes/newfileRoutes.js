const express = require("express");
const { newfiledata , getMappedData , getMappedDataByQtestId} = require("../controllers/newfileController");
const router = express.Router();

router.post("/newdata", newfiledata);
router.get("/mapped-data", getMappedData);  
router.get("/mapped-data/:qtestId", getMappedDataByQtestId);

module.exports = router;
