const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  area: { type: String }, 
  role: { type: String }, 
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
