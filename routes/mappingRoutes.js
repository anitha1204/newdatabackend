// const express = require("express");
// const { saveMapping, getMappings } = require("../controllers/mappingController");

// const router = express.Router();

// router.post("/save-mapping", saveMapping);
// router.get("/get-mappings", getMappings);

// module.exports = router;


const express = require("express");
const { saveMapping, getMappings, mapAndStoreValues } = require("../controllers/mappingController");

const router = express.Router();

router.post("/save-mapping", saveMapping);
router.get("/get-mappings", getMappings);
router.get("/map-values", mapAndStoreValues);

module.exports = router;
