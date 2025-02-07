const express = require("express");
const { getMappings, saveMapping } = require("../controllers/mappingController");

const router = express.Router();

router.get("/get-mappings", getMappings);
router.post("/save-mapping", saveMapping);

module.exports = router;
