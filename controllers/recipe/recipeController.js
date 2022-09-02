const model = require("../../model/recipe/recipeModel");
const searchModel = require("../../model/recipe/searchRecipeModel");

// Add
const addRecipe = async (req, res) => {
  try {
    const { title_recipe, ingredients, user_id } = req.body;
    const addUser = await model.addRecipeModel({
      title_recipe,
      ingredients,
      user_id,
      photo: req.file?.path,
    });

    if (addUser) {
      res.status(200).send("Data added successfully");
    } else {
      res.status(400).send("Data failed to add!!!");
    }
  } catch (error) {
    res.status(400).send("Any error!!!");
  }
};
// Edit
const editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title_recipe, ingredients, user_id } = req.body;
    const searchId = await searchModel.getRecipeId(id);
    if (searchId?.rowCount > 0) {
      let inputTitle = title_recipe || searchId?.rows[0]?.title_recipe;
      let inputIngredients = ingredients || searchId?.rows[0]?.ingredients;
      let inputUserId = user_id || searchId?.rows[0]?.user_id;

      const editData = await model.editRecipeModel({
        title_recipe: inputTitle,
        ingredients: inputIngredients,
        photo: req.file?.path,
        user_id: inputUserId,
        id,
      });
      if (editData) {
        res.send("Data changed successfully");
      } else {
        res.send("Data failed to change!!!");
      }
    } else {
      res.status(404).send("Data not found!!!");
    }
  } catch (error) {
    res.status(500).send("Any error");
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const searchId = await searchModel.getRecipeId(id);

    if (searchId?.rowCount > 0) {
      const delRecipe = await model.deleteRecipeModel(id);

      if (delRecipe) {
        res.send("Data deleted successfully");
      } else {
        res.status(400).send("Data failed to delete!!!");
      }
    } else {
      res.status(404).send("Data not found!!!");
    }
  } catch (error) {
    res.status(500).send("Any error");
  }
};

module.exports = {
  addRecipe,
  editRecipe,
  deleteRecipe,
};
