const express = require("express");
const router = express.Router();

const {
  getShops,
  getShopById,
  getShopByFamily,
  createShop,
  updateShop,
  deleteShop,
} = require("../controllers/shopController");

// כל הרשימות
router.get("/", getShops);

// רשימה לפי ID של הרשימה (לעריכה/מחיקה)
router.get("/list/:id", getShopById);

// רשימה לפי משפחה
router.get("/family/:id", getShopByFamily);

// יצירת רשימה
router.post("/", createShop);

// עדכון
router.put("/:id", updateShop);

// מחיקה
router.delete("/:id", deleteShop);

module.exports = router;
