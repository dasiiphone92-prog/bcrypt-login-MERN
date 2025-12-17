const express = require("express");
const router = express.Router();
const controller = require("../controllers/teamController");

router.get("/", controller.getTeam);
router.get("/:id", controller.getTeamById);
router.post("/", controller.addTeamMember);
router.put("/:id", controller.updateTeamMember);
router.delete("/:id", controller.deleteTeamMember);

module.exports = router;
