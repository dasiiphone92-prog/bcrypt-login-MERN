
const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
  name: { type: String, required: true },       // 
  lastName:{ type: String },
  phone: { type: String },                      // נייד
  people: { type: Number, required: true },     // מספר נפשות
  kids: { type: Number, required: true },       // ילדים עד 18
  team: { type: String },                       // מי מחלק / קבוצה
});

const Family = mongoose.model("Family", familySchema);
module.exports = Family;
