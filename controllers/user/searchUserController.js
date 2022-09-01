const searchModel = require("../../model/users/searchUserModel");

// all data
const allUser = async (req, res) => {
  try {
    const getData = await searchModel.getAllUsers();
    res.send({ data: getData.rows, totalData: getData.rowCount });
  } catch (error) {
    res.status(400).send("Any error");
  }
};

const findUserName = async (req, res) => {
  try {
    const { name } = req.query;
    const getData = await searchModel.getUsersName(name);
    // console.log(getData);
    if (getData?.rowCount) {
      res.status(200).send({
        data: getData.rows,
        totalData: getData.rowCount,
      });
    } else {
      res.status(400).send("Data not found!!!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Any error!!!");
  }
};

module.exports = { allUser, findUserName };
