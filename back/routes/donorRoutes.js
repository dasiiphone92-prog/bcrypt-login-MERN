const express = require("express");
const router = express.Router();
const controller = require("../controllers/donorController");

router.get("/", controller.getDonors);
router.get("/:id", controller.getDonorById);
router.post("/", controller.addDonor);
router.put("/:id", controller.updateDonor);
router.delete("/:id", controller.deleteDonor);

module.exports = router;
