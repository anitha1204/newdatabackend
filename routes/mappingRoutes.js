const express = require("express");
const { getStoredMappings, saveMapping } = require("../controllers/mappingController");

const router = express.Router();

router.get("/get-stored-mappings", getStoredMappings);
router.post("/saveMapping", saveMapping);

module.exports = router;
