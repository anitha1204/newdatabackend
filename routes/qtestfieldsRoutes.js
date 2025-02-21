const express = require("express");
const { getQTest } = require("../controllers/qtestfieldsController");

const router = express.Router();

router.get("/qtest", getQTest);

module.exports = router;