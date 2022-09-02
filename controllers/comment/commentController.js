const model = require("../../model/comment/commentModel");

const addComment = async (req, res) => {
  try {
    const { username, message, user_id } = req.body;
    const getData = await model.addCommentModel({
      username,
      message,
      user_id,
    });
    if (getData) {
      res.status(200).send("Add comment success");
    } else {
      res.status(400).send("Failed comment!!!");
    }
  } catch (error) {
    res.status(400).send("Any error!!!");
  }
};

module.exports = { addComment };
