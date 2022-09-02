const Router = require("express").Router();
const controller = require("../../controllers/comment/searchCommentController");

Router.get("/", controller.findAllComment);

module.exports = Router;
