const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  description: String,
  quantity: Number,
  price: Number,
});

const invoiceSchema = new mongoose.Schema({
  clientName: String,
  items: [itemSchema],
  total: Number,
  status: {
    type: String,
    enum: ["Paid", "Unpaid"],
    default: "Unpaid"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
