const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
    required: true,
  },
  week: {
    type: String,
    required: true,
  },
  items: {
    type: [String],   // <--- זה החלק הקריטי
    required: true,
  },
});

module.exports = mongoose.model("Shop", shopSchema);

