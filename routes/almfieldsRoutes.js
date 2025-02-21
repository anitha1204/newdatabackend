const express = require("express");
const { getALM} = require("../controllers/almfieldsController");

const router = express.Router();

router.get("/alm", getALM);

module.exports = router;