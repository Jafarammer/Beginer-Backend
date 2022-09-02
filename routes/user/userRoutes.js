const Router = require("express").Router();
const controller = require("../../controllers/user/userController");

Router.post("/add", controller.addUser);
Router.patch("/edit/:id", controller.editUser);
Router.delete("/delete/:id", controller.deleteUser);

module.exports = Router;
