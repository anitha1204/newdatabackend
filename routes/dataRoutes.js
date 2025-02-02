const express = require("express");
const { getData } = require("../controllers/dataControllers");

const router = express.Router();

router.get("/data", getData);

module.exports = router;
