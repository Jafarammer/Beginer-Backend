const Router = require("express").Router();
// const db = require("../../config/db");
const crypto = require("crypto");
const controllerUser = require("../../constroller/user/userController");

Router.get("/users", controllerUser.getAllUsers);
Router.get("/users/find", controllerUser.findUser);

Router.post("/users/add", controllerUser.addUser);

Router.patch("/users/edit", controllerUser.editUser);

Router.delete("/users/delete", controllerUser.deleteUser);

module.exports = Router;
