const express = require("express");
const { getMappedResults } = require("../controllers/mappingController");

const router = express.Router();

router.get("/mapped-results", getMappedResults);

module.exports = router;
