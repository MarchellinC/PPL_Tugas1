const express = require("express");
const router = express.Router();
const db = require("../database");

// CREATE
router.post("/", (req, res) => {
  const { brand, type, transmission, plate, price, status } = req.body;

  db.run(
    "INSERT INTO items (brand, type, transmission, plate, price, status) VALUES (?, ?, ?, ?, ?, ?)",
    [brand, type, transmission, plate, price, status],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        id: this.lastID,
        brand,
        type,
        transmission,
        plate,
        price,
        status
      });
    }
  );
});

// READ
router.get("/", (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  const { brand, type, transmission, plate, price, status } = req.body;

  db.run(
    "UPDATE items SET brand=?, type=?, transmission=?, plate=?, price=?, status=? WHERE id=?",
    [brand, type, transmission, plate, price, status, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM items WHERE id=?", req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;