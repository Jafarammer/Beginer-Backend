const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET
router.get("/", (req, res) => {
  db.query("SELECT * FROM comment ORDER BY comment_id ASC", (err, result) => {
    if (err) {
      res.status(500).send("Internal server error");
    } else {
      res.send({
        data: result.rows,
        totalData: result.rowCount,
      });
    }
  });
});

// POST
router.post("/add", (req, res) => {
  const { username, comment_text } = req.body;
  db.query(
    "INSERT INTO comment(username,comment_text) VALUES ($1,$2)",
    [username, comment_text],
    (err, result) => {
      if (err) {
        res.status(500).send("Internal server error");
      } else {
        res.send("Data added successfully");
      }
    }
  );
});

// Edit
router.patch("/edit", (req, res) => {
  const { username, comment_text, comment_id } = req.body;
  db.query(
    "SELECT * FROM comment WHERE comment_id = $1",
    [comment_id],
    (err, result) => {
      if (err) {
        res.status(500).send("Internal server error");
      } else {
        if (result.rowCount > 0) {
          let userInput = username || result?.rows[0].username;
          let commentInput = comment_text || result?.rows[0].comment_text;
          db.query(
            "UPDATE comment SET username = $1, comment_text = $2 WHERE comment_id = $3",
            [userInput, commentInput, comment_id],
            (err, result) => {
              if (err) {
                res.status(400).send("Invalid Input");
              } else {
                res.send("Data changed succesfully");
              }
            }
          );
        } else {
          res.send("Data not found!!!");
        }
      }
    }
  );
});

// DELETE
router.delete("/delete", (req, res) => {
  const { comment_id } = req.body;
  db.query(
    "DELETE FROM comment WHERE comment_id = $1",
    [comment_id],
    (err, result) => {
      if (err) {
        return res.status(500).send("Internal server error");
      } else {
        return res.status(200).send("Data deleted successfully");
      }
    }
  );
});

module.exports = router;
