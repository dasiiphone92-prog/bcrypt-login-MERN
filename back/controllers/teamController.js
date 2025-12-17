const Team = require("../models/teamModel");

exports.getTeam = async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addTeamMember = async (req, res) => {
  try {
    const member = await Team.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const member = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Team member deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
