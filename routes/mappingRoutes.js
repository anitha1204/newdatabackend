// routes/mappingRoutes.js
const express = require("express");
const { saveMapping, getMappings } = require("../controllers/mappingController");
const router = express.Router();

router.post("/save", saveMapping);
router.get("/", getMappings);

module.exports = router;