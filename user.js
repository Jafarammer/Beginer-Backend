const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const db = require("./db");
const crypto = require("crypto");

app.use(bodyParser.json());
// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// GET
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users ORDER BY id ASC", (err, result) => {
    if (err) {
      console.log(`Error disini ${err}`);
      res.status(400).send("There is an error");
    } else {
      res.send({
        data: result.rows,
        totalData: result.rowCount,
      });
    }
  });
});

// POST
app.post("/users/add", (req, res) => {
  const { name, email, password } = req.body;
  const hash = crypto
    .createHmac("sha256", password)
    .update("very very important")
    .digest("hex");
  db.query(
    "INSERT INTO users(name,email,password) VALUES ($1,$2,$3)",
    [name, email, hash],
    (err, result) => {
      if (err) {
        res.status(400).send("Error");
      } else {
        res.send("Data added successfully");
      }
    }
  );
});

// Bottom
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
