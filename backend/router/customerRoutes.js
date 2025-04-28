const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel"); 

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ regtimestamp: -1 });  
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch customers." });
  }
});

// Add new customer
router.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body); 
    const savedCustomer = await customer.save();
    res.json(savedCustomer); 
  } catch (err) {
    res.status(500).json({ error: "Error saving customer" });
  }
});
//Edit the customer
router.put("/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updatedCustomer);
  } catch (err) {
    console.error("Error updating customer:", err);
    res.status(500).json({ error: "Failed to update customer" });
  }
});

// DELETE customer by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
});


module.exports = router;
