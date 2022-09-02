const searchModel = require("../../model/recipe/searchRecipeModel");

//Find all
const findAllRecipe = async (req, res) => {
  try {
    const getData = await searchModel.getAllRecipe();
    res.send({
      data: getData.rows,
      totalData: getData.rowCount,
    });
  } catch (error) {
    res.status(400).send("Any error");
  }
};

// Find title
const findTitleRecipe = async (req, res) => {
  try {
    const { title_recipe } = req.query;
    const getData = await searchModel.getRecipeName(title_recipe);
    res.send({
      data: getData.rows,
      totalData: getData.rowCount,
    });
  } catch (error) {
    res.status(400).send("Any error!!!");
  }
};

// Find id
const findIdRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const getData = await searchModel.getRecipeId(id);
    res.send({
      data: getData.rows,
      totalData: getData.rowCount,
    });
  } catch (error) {
    res.status(400).send("Any error!!!");
  }
};

module.exports = { findAllRecipe, findTitleRecipe, findIdRecipe };
