const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phonenumber: Number,
  email: String,
  regtimestamp: { type: Date, default: Date.now }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;


