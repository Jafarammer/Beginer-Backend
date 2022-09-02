const searchModel = require("../../model/comment/searchCommentModel");

const findAllComment = async (req, res) => {
  try {
    const getData = await searchModel.getAllComment();
    res.status(200).send({ data: getData?.rows, totalData: getData?.rowCount });
  } catch (error) {
    res.status(400).send("Any error!!!");
  }
};

module.exports = { findAllComment };
