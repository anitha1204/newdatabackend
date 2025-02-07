const express = require("express");
const { saveMapping, getMappings } = require("../controllers/mappingController");

const router = express.Router();

router.post("/save-mapping", saveMapping);
router.get("/get-mappings", getMappings);

module.exports = router;
