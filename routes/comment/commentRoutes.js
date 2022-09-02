const Router = require("express").Router();
const controller = require("../../controllers/comment/commentController");

Router.post("/add", controller.addComment);

module.exports = Router;
