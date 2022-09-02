const Router = require("express").Router();
const controller = require("../../controllers/recipe/searchRecipeController");

Router.get("/", controller.findAllRecipe);
Router.get("/title", controller.findTitleRecipe);
Router.get("/id/:id", controller.findIdRecipe);

module.exports = Router;
