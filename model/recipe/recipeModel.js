const db = require("../../config/db");

// ADD
const addRecipeModel = (props) => {
  return new Promise((resolve, rejects) => {
    db.query(
      "INSERT INTO recipe(title_recipe,ingredients,photo,user_id) VALUES ($1,$2,$3,$4)",
      [props.title_recipe, props.ingredients, props.photo, props.user_id],
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

const editRecipeModel = (props) => {
  return new Promise((resolve, rejects) => {
    db.query(
      "UPDATE recipe SET title_recipe = $1, ingredients = $2, photo = $3, user_id = $4 WHERE id = $5",
      [
        props.title_recipe,
        props.ingredients,
        props.photo,
        props.user_id,
        props.id,
      ],
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

const deleteRecipeModel = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM recipe WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  addRecipeModel,
  editRecipeModel,
  deleteRecipeModel,
};
