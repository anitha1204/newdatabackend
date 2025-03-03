const express = require("express");
const { getValuefiles } = require("../controllers/valuefileController");

const router = express.Router();

// Route to get all valuefiles
router.get("/valuefiles", getValuefiles);

module.exports = router;


