
const Shop = require("../models/shopModel");

// קבלת כל הרשימות
async function getShops(req, res) {
  try {
    // אם יש פרמטר week, נסנן לפי שבוע
    const query = {};
    if (req.query.week) {
      query.week = req.query.week;
    }
    
    const lists = await Shop.find(query).populate("familyId");
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// קבלת רשימה לפי ID של הרשימה עצמה (לעריכה)
async function getShopById(req, res) {
  try {
    const list = await Shop.findById(req.params.id).populate("familyId");
    if (!list) return res.status(404).json({ message: "Shop list not found" });

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// קבלת רשימה לפי משפחה
async function getShopByFamily(req, res) {
  try {
    const list = await Shop.findOne({ familyId: req.params.id }).populate("familyId");
    if (!list) return res.status(404).json({ message: "No list found" });

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// יצירת רשימה חדשה
async function createShop(req, res) {
  try {
    const newList = await Shop.create(req.body);
    res.status(201).json(newList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// עדכון רשימה
async function updateShop(req, res) {
  try {
    const updated = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("familyId");

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// מחיקה
async function deleteShop(req, res) {
  try {
    const deleted = await Shop.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted", deleted });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getShops,
  getShopById,
  getShopByFamily,
  createShop,
  updateShop,
  deleteShop,
};
