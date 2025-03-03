const express = require("express");
const router = express.Router();
const { getValuefiles } = require("../controllers/valuefileController");

router.get("/valuefiles", getValuefiles);

module.exports = router;
