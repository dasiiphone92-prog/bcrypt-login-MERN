const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const auth = require("./middleware/auth");
const connectDB = require("./db/connect");

const donorRoutes = require("./routes/donorRoutes");
const familyRoutes = require("./routes/familyRoutes");
const teamRoutes = require("./routes/teamRoutes");
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");



app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/donors", auth, donorRoutes);
app.use("/families", familyRoutes);
app.use("/team", teamRoutes);
app.use("/api/shop", shopRoutes);


app.get("/", (req, res) => {
  res.send("GMACH API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
