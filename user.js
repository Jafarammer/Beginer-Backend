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

// Edit
app.patch("/users/edit", (req, res) => {
  const { name, email, password, id } = req.body;
  db.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      res.status(400).send("There is an error");
    } else {
      if (results.rowCount > 0) {
        let nameInput = name || results?.rows[0].name;
        let emailInput = email || results?.rows[0].email;
        let passInput = password || results?.rows[0].password;
        const hash = crypto
          .createHmac("sha256", passInput)
          .update("very very important")
          .digest("hex");
        db.query(
          `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`,
          [nameInput, emailInput, hash, id],
          (error, result) => {
            if (error) {
              res.status(400).send("Invalid input");
            } else {
              res.send("Data added successfully");
            }
          }
        );
      } else {
        res.send("Data not found!!!");
      }
    }
  });
});

// DELETE
app.delete("/users/delete", (req, res) => {
  const { id } = req.body;
  db.query("DELETE FROM users WHERE id = $1", [id], (err, result) => {
    if (err) {
      return res.status(500).send("Internal server error");
    } else {
      return res.status(200).send("Data deleted successfully!");
    }
  });
});

// Bottom
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
