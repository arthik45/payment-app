const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a product
router.post("/", async (req, res) => {
  console.log("Received data:", req.body);

  const product = new Product({
    devicename: req.body.devicename,
    deviceid: Number(req.body.deviceid),
    userid: req.body.userid,
    version: req.body.version,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(400).json({ message: err.message, error: err });
  }
});

// PUT (update) a product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { devicename, deviceid, userid, version } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { devicename, deviceid, userid, version },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(400).json({ message: err.message });
  }
});
// DELETE a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
