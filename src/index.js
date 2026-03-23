const express = require("express");
const app = express();

const itemRoutes = require("./routes/itemRoutes");

app.use(express.json());

app.use("/items", itemRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app; 