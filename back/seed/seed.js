// GMACH – מילוי בסיס נתונים – seed.js

const mongoose = require("mongoose");
require("dotenv").config();

const Donor = require("../models/donorModel");
const Family = require("../models/familyModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");

const donorsData = require("./donors");
const familiesData = require("./families");
const teamsData = require("./team");
const getUsersData = require("./users");

async function seed() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected!");

    // מחיקת נתונים ישנים
    await Donor.deleteMany();
    await Family.deleteMany();
    await Team.deleteMany();
    await User.deleteMany();
    console.log("🧹 Cleared old data.");

    // הכנסת משתמשים
    const usersData = await getUsersData();
    await User.insertMany(usersData);
    console.log("👤 Test user created.");

    // הכנסת תרומות
    await Donor.insertMany(donorsData);
    console.log("🎁 Donors uploaded.");

    // הכנסת משפחות
    await Family.insertMany(familiesData);
    console.log("🏠 Families uploaded.");

    // הכנסת צוותים
    await Team.insertMany(teamsData);
    console.log("🧑‍🤝‍🧑 Teams uploaded.");

    console.log("🌱 SEED COMPLETED SUCCESSFULLY!");
    process.exit(0);
  } catch (err) {
    console.error("❌ ERROR SEEDING:", err);
    process.exit(1);
  }
}

seed();
