const Router = require("express").Router();
const controller = require("../../controllers/recipe/recipeController");

Router.post("/add", controller.addRecipe);
Router.patch("/edit/:id", controller.editRecipe);
Router.delete("/delete/:id", controller.deleteRecipe);

module.exports = Router;
