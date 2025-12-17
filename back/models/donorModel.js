const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  city: { type: String },
  amount: { type: Number, required: true },
  date: { type: String },
});

const Donor = mongoose.model("Donor", donorSchema);
module.exports = Donor;
