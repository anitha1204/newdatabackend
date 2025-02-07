const express = require("express");
const { saveMappedResult } = require("../controllers/mappedResultController");

const router = express.Router();

router.post("/save-mapped-result", saveMappedResult);

module.exports = router;
