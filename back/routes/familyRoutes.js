const express = require("express");
const router = express.Router();
const controller = require("../controllers/familyController");

router.get("/", controller.getFamilies);
router.get("/:id", controller.getFamilyById);
router.post("/", controller.addFamily);
router.put("/:id", controller.updateFamily);
router.delete("/:id", controller.deleteFamily);

module.exports = router;
