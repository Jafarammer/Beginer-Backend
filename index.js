const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/user/userRoutes");
const searchUserRoutes = require("./routes/user/searchUserRoutes");

app.use(cors());
app.use(helmet());
//import body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//users
app.use("/users", userRoutes);
app.use("/users", searchUserRoutes);

// PORT take in bottom
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
