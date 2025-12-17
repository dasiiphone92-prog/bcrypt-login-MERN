const Family = require("../models/familyModel");

exports.getFamilies = async (req, res) => {
  try {
    const families = await Family.find();
    res.json(families);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addFamily = async (req, res) => {
  try {
    const family = await Family.create(req.body);
    res.status(201).json(family);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFamily = async (req, res) => {
  try {
    const family = await Family.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(family);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFamily = async (req, res) => {
  try {
    await Family.findByIdAndDelete(req.params.id);
    res.json({ message: "Family deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFamilyById = async (req, res) => {
  try {
    const family = await Family.findById(req.params.id);
    
    if (!family) {
      return res.status(404).json({ message: "Family not found" });
    }

    res.json(family);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
