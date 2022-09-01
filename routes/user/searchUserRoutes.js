const Router = require("express").Router();
const controller = require("../../controllers/user/searchUserController");

Router.get("/", controller.allUser);
Router.get("/name", controller.findUserName);

module.exports = Router;
