const express = require("express");
const router = express.Router();
const almController = require("../controllers/almController");

router.post("/", almController.createALM);
router.get("/", almController.getAllALM);
router.get("/:id", almController.getALMById);
router.put("/:id", almController.updateALM);
router.delete("/:id", almController.deleteALM);

module.exports = router;
