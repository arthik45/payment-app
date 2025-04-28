const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");

// GET /stocks
router.get("/", async (req, res) => {
    try {
      const stocks = await Stock.find();
      res.json(stocks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST /stocks
  router.post("/", async (req, res) => {
    try {
      const { stockname, price } = req.body;
      const stock = new Stock({ stockname, price });
      const saved = await stock.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// PUT (update) a stock by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a stock by ID
router.delete("/:id", async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.json({ message: "Stock deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
