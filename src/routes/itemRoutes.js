const express = require("express");
const router = express.Router();
const db = require("../database");

// CREATE
router.post("/", (req, res) => {
  const { brand, type, transmission, plate, price, status } = req.body;

  const stmt = db.prepare(`
    INSERT INTO items (brand, type, transmission, plate, price, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(brand, type, transmission, plate, price, status);

  res.json({
    id: result.lastInsertRowid,
    brand,
    type,
    transmission,
    plate,
    price,
    status
  });
});

// READ
router.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM items").all();
  res.json(rows);
});

// UPDATE
router.put("/:id", (req, res) => {
  const old = db.prepare("SELECT * FROM items WHERE id=?").get(req.params.id);

  console.log("BODY:", req.body);
  console.log("OLD:", old);

  if (!old) {
    return res.status(404).json({ error: "Data not found" });
  }

  const brand = req.body.brand != null ? req.body.brand : old.brand;
  const type = req.body.type != null ? req.body.type : old.type;
  const transmission = req.body.transmission != null ? req.body.transmission : old.transmission;
  const plate = req.body.plate != null ? req.body.plate : old.plate;
  const price = req.body.price != null ? req.body.price : old.price;
  const status = req.body.status != null ? req.body.status : old.status;

  const stmt = db.prepare(`
    UPDATE items 
    SET brand=?, type=?, transmission=?, plate=?, price=?, status=?
    WHERE id=?
  `);

  const result = stmt.run(
    brand,
    type,
    transmission,
    plate,
    price,
    status,
    req.params.id
  );

  res.json({ updated: result.changes });
});

// DELETE
router.delete("/:id", (req, res) => {
  const stmt = db.prepare("DELETE FROM items WHERE id=?");
  const result = stmt.run(req.params.id);

  res.json({ deleted: result.changes });
});

module.exports = router;