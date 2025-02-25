// const express = require("express");
// const router = express.Router();
// const qtestController = require("../controllers/qtestController");

// router.post("/", qtestController.createQtest);
// router.get("/", qtestController.getAllQtest);
// router.get("/:id", qtestController.getQtestById);
// router.put("/:id", qtestController.updateQtest);
// router.delete("/:id", qtestController.deleteQtest);

// module.exports = router;



const express = require("express");
const { getQTestFields } = require("../controllers/qtestController");

const router = express.Router();

router.get("/qtest-fields", getQTestFields);

module.exports = router;
