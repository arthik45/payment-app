const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  deviceid: {
    type: String,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  paymentid: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now, // sets current time automatically
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
