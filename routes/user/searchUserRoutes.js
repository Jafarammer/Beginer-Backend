const Router = require("express").Router();
const controller = require("../../controllers/user/searchUserController");

Router.get("/", controller.allUser);
Router.get("/name", controller.findUserName);
Router.get("/id/:id", controller.findUserId);
Router.get("/email", controller.findUserEmail);
Router.get("/pagination", controller.findPage);
// masih tidak paham
// Router.get("/sort", controller.findSort);

module.exports = Router;
