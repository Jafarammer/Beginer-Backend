const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const helmet = require("helmet");
// const dotenv = require("dotenv");
// dotenv.config();
const userRoutes = require("./routes/user/userRoutes");
const searchUserRoutes = require("./routes/user/searchUserRoutes");
const recipeRoutes = require("./routes/recipe/recipeRoutes");
const searchRecipeRoutes = require("./routes/recipe/searchRecipeRoutes");
const commentRoutes = require("./routes/comment/commentRoutes");
const searchCommentRoutes = require("./routes/comment/searchCommentRoutes");

app.use(cors());
app.use(helmet());
//import body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//users
app.use("/users", userRoutes);
app.use("/users", searchUserRoutes);
// recipe
app.use("/recipe", recipeRoutes);
app.use("/recipe", searchRecipeRoutes);
// comment
app.use("/comment", commentRoutes);
app.use("/comment", searchCommentRoutes);

// PORT take in bottom
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
