const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const customerRoutes = require("./router/customerRoutes"); 
const stockRoutes = require("./router/stockRoutes");
const paymentRoutes = require("./router/paymentRoutes");



const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Use the customer routes
app.use("/customers", customerRoutes); 
const productRoutes = require("./router/productRoutes");
app.use("/products", productRoutes); 
//connect stock routes
app.use("/stocks", stockRoutes);
app.use("/payments", paymentRoutes); 


// Connect to MongoDB (replace with your actual MongoDB URI)
mongoose.connect("mongodb://localhost:27017/amopaproducts", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
