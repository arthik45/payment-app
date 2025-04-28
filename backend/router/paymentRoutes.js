const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// GET all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// UPDATE a payment
router.put("/:id", async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Payment not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update payment" });
  }
});

// DELETE a payment
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Payment not found" });
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete payment" });
  }
});

module.exports = router;
