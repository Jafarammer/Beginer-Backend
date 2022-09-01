const Router = require("express").Router();
const controller = require("../../controllers/user/userController");

Router.post("/add", controller.addUser);

module.exports = Router;
