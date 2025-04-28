const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  devicename: {
    type: String,
    required: true,
  },
  deviceid: {
    type: Number,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
