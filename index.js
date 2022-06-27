const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const helmet = require("helmet");

app.use(cors());
app.use(helmet());

//import body parser
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// const userRoutes = require("./routes/user/userRoutes");
// app.use("/", userRoutes);

// import routes users
const userFindRoutes = require("./routes/user/searchUser");
app.use("/", userFindRoutes);

// Import routes recipe
const recipeRoutes = require("./routes/recipe");
app.use("/", recipeRoutes);

// PORT take in bottom
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
