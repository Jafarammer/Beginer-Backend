const db = require("../../config/db");

// GET ALL
const getAllRecipe = () => {
  return new Promise((resolve, rejects) => {
    db.query("SELECT * FROM recipe ORDER BY id ASC", (error, result) => {
      if (error) {
        rejects(error);
      } else {
        resolve(result);
      }
    });
  });
};
// FIND Name
const getRecipeName = (title_recipe) => {
  return new Promise((resolve, rejects) => {
    db.query(
      `SELECT * FROM recipe WHERE title_recipe LIKE $1`,
      [`%${title_recipe}%`],
      (error, result) => {
        if (error) {
          rejects(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
//   Find Id
const getRecipeId = (id) => {
  return new Promise((resolve, rejects) => {
    db.query("SELECT * FROM recipe WHERE id = $1", [id], (error, result) => {
      if (error) {
        rejects(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { getAllRecipe, getRecipeName, getRecipeId };
