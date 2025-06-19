const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");

// CREATE
router.post("/", async (req, res) => {
  try {
    const { clientName, items, status } = req.body;
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const newInvoice = new Invoice({ clientName, items, status, total });
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
router.get("/", async (req, res) => {
  const invoices = await Invoice.find().sort({ createdAt: -1 });
  res.json(invoices);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ message: "Invoice deleted" });
});

module.exports = router;
