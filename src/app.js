const express = require("express");
const db = require("./db");
const app = express();
const port = process.env.PORT || 3000;

app.get("/users", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM users");
    res.send(rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
