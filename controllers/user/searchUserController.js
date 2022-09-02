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
// Find by name with query params
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
// Find by id with params
const findUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const getData = await searchModel.getUserId(id);
    if (getData?.rowCount > 0) {
      res.status(200).send({
        data: getData.rows,
        totalData: getData.rowCount,
      });
    } else {
      res.status(400).send("Data not found!!!");
    }
  } catch (error) {
    res.status(400).send("Any error!!!");
  }
};
// find by email
const findUserEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const getData = await searchModel.getUsersEmail(email);
    if (getData?.rowCount > 0) {
      res.status(200).send({
        data: getData.rows,
        totalData: getData.rowCount,
      });
    } else {
      res.status(400).send("Email not found!!!");
    }
  } catch (error) {
    res.status(400).send("Any error!!!");
  }
};
// find page
const findPage = async (req, res) => {
  try {
    const { page, size } = req.query;
    const getData = await searchModel.getModelPage(page, size);
    res.send({
      data: getData.rows,
      total: getData.rowCount,
    });
  } catch (error) {
    res.status(400).send("Internal server error");
  }
};

// masih tidak paham
// const findSort = async (req, res) => {
//   try {
//     const sortType = req.query;
//     if ((sortType = desc)) {
//       const getDataDesc = await searchModel.getSort(sortType);
//       res.send({
//         data: getDataDesc.rows,
//         total: getDataDesc.rowCount,
//       });
//     } else {
//       const getData = await searchModel.getAllUsers();
//       res.send({
//         data: getData.rows,
//         total: getData.rowCount,
//       });

//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Any error");
//   }
// };

module.exports = {
  allUser,
  findUserName,
  findUserId,
  findUserEmail,
  findPage,
  // findSort,
};
