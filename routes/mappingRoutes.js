const express = require("express");
const { getMappings, saveMapping, validateAndSaveMappings } = require("../controllers/mappingController");

const router = express.Router();

router.get("/get-mappings", getMappings);
router.post("/save-mapping", saveMapping);
router.post("/validate-and-save", validateAndSaveMappings);


module.exports = router;
