const express = require("express");
const { mapAndStoreValues } = require("../controllers/mappedResultController");

const router = express.Router();

router.post("/map-values", mapAndStoreValues);

module.exports = router;
