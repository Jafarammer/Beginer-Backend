const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const db = require("./db");

app.use(bodyParser.json());
// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// GET
app.get("/recipe", (req, res) => {
  db.query("SELECT * FROM recipe ORDER BY id_recipe ASC", (err, result) => {
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
app.post("/recipe/add", (req, res) => {
  const { title_recipe, ingredients } = req.body;
  db.query(
    "INSERT INTO recipe(title_recipe,ingredients) VALUES ($1,$2)",
    [title_recipe, ingredients],
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
app.patch("/recipe/edit", (req, res) => {
  const { title_recipe, ingredients, id_recipe } = req.body;
  db.query(
    "SELECT * FROM recipe WHERE id_recipe = $1",
    [id_recipe],
    (err, result) => {
      if (err) {
        res.status(500).send("Internal server error");
      } else {
        if (result.rowCount > 0) {
          let titleInput = title_recipe || result?.rows[0].title_recipe;
          let ingredientsInput = ingredients || result?.rows[0].ingredients;
          db.query(
            "UPDATE recipe SET title_recipe = $1, ingredients = $2 WHERE id_recipe = $3",
            [titleInput, ingredientsInput, id_recipe],
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
app.delete("/recipe/delete", (req, res) => {
  const { id_recipe } = req.body;
  db.query(
    "DELETE FROM recipe WHERE id_recipe = $1",
    [id_recipe],
    (err, result) => {
      if (err) {
        return res.status(500).send("Internal server error");
      } else {
        return res.status(200).send("Data deleted successfully");
      }
    }
  );
});

// FIND NAME
app.get("/recipe/find", (req, res) => {
  const { title_recipe } = req.body;
  db.query(
    "SELECT * FROM recipe WHERE title_recipe = $1",
    [title_recipe],
    (err, result) => {
      if (err) {
        res.status(500).send("Internal server error");
      } else {
        res.send({
          data: result.rows,
          totalData: result.rowCount,
        });
      }
    }
  );
});

// SHOW 5 NEW DATA RECIPE
// app.get("/recipe", (req, res) => {
//   db.query(
//     "SELECT * FROM recipe ORDER BY id_recipe DESC LIMIT 5",
//     (err, result) => {
//       if (err) {
//         res.status(500).send("Internal server error");
//       } else {
//         res.send({
//           data: result.rows,
//           totalData: result.rowCount,
//         });
//       }
//     }
//   );
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
