const express = require("express");
const { newfiledata } = require("../controllers/newfileController");
const router = express.Router();

router.post("/newdata", newfiledata);

module.exports = router;
